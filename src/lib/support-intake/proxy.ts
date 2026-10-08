import { isIP } from "node:net";

import { siteConfig } from "../../config/site";
import {
  HONEYPOT_FIELD,
  INTAKE_FIELDS,
  pickAllowedFields,
  REFERENCE_PATTERN,
  STARTED_AT_FIELD,
  type IntakeErrors,
  type IntakeField,
  type IntakeKind,
  type IntakeResponse,
} from "./fields";

/**
 * Same-origin proxy behind /api/public/report and /api/public/feature-request.
 *
 * This is NOT a security boundary. The UrShop backend's public intake endpoints own validation,
 * rate limiting, category rules and persistence, and accept direct callers too. This layer only:
 *   - keeps the backend URL server-side and avoids browser CORS,
 *   - drops obvious bots (honeypot, impossibly fast submissions) before they cost a backend call,
 *   - forwards only allowlisted fields,
 *   - attests the visitor IP (with PUBLIC_INTAKE_PROXY_SECRET) so the backend can rate-limit per
 *     visitor rather than per Vercel egress address,
 *   - turns backend replies into a small, stable shape for the form.
 *
 * Server-only by usage: only the Route Handlers import it.
 */

const BACKEND_PATHS: Record<IntakeKind, string> = {
  report: "/v1/public/reports",
  "feature-request": "/v1/public/feature-requests",
};

/** Text-only forms; matches the backend's route body limit. */
export const MAX_BODY_BYTES = 64 * 1024;
const UPSTREAM_TIMEOUT_MS = 8000;
/** Faster than any person can fill in these forms. */
const MIN_FILL_MS = 3000;
const MIN_SECRET_LENGTH = 32;
const MAX_IP_LENGTH = 45;

type ProxyEnv = {
  baseUrl: string | null;
  secret: string | null;
  isProduction: boolean;
};

function readEnv(): ProxyEnv {
  const baseUrl = (process.env.URSHOP_API_BASE_URL ?? "").trim().replace(/\/+$/, "");
  const secret = (process.env.PUBLIC_INTAKE_PROXY_SECRET ?? "").trim();
  return {
    baseUrl: baseUrl || null,
    secret: secret.length >= MIN_SECRET_LENGTH ? secret : null,
    isProduction: process.env.NODE_ENV === "production",
  };
}

function json(body: IntakeResponse, status: number, headers?: Record<string, string>) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...headers },
  });
}

const failed = (status: number) => json({ ok: false, code: "REQUEST_FAILED" }, status);
const unavailable = () => json({ ok: false, code: "UNAVAILABLE" }, 503);

function validIp(value: string | null | undefined) {
  const candidate = value?.trim();
  if (!candidate || candidate.length > MAX_IP_LENGTH) return null;
  return isIP(candidate) === 0 ? null : candidate;
}

/**
 * The visitor's IP. On Vercel `x-vercel-forwarded-for` is set by the platform and is the
 * authoritative source; the other headers are fallbacks for when it is absent or invalid
 * (e.g. local development). Every candidate must be a real IP. If none is, the header is
 * omitted and the backend falls back to the shared, stricter bucket.
 */
export function visitorIp(headers: Headers) {
  return (
    validIp(headers.get("x-vercel-forwarded-for")?.split(",")[0]) ??
    validIp(headers.get("x-real-ip")) ??
    validIp(headers.get("x-forwarded-for")?.split(",")[0])
  );
}

/** Supplemental only: a browser form post always carries a same-origin Origin header. */
function isCrossOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const originHost = new URL(origin).host;
    const allowed = new Set([new URL(request.url).host, new URL(siteConfig.url).host]);
    const forwardedHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
    if (forwardedHost) allowed.add(forwardedHost);
    return !allowed.has(originHost);
  } catch {
    return true;
  }
}

/** Honeypot filled, timer missing, or the form "completed" faster than a person could. */
function looksAutomated(body: Record<string, unknown>, now: number) {
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") return true;
  const startedAt = body[STARTED_AT_FIELD];
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) return true;
  const elapsed = now - startedAt;
  return elapsed < MIN_FILL_MS;
}

function filterFieldErrors(kind: IntakeKind, raw: unknown): IntakeErrors | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const allowed = new Set<string>(INTAKE_FIELDS[kind]);
  const errors: IntakeErrors = {};
  for (const [field, messages] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowed.has(field) || !Array.isArray(messages)) continue;
    const first = messages.find((message): message is string => typeof message === "string");
    if (first) errors[field as IntakeField] = first.slice(0, 200);
  }
  return Object.keys(errors).length ? errors : undefined;
}

async function readUpstream(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function retryAfter(response: Response) {
  const seconds = Number(response.headers.get("retry-after"));
  return Number.isFinite(seconds) && seconds > 0
    ? Math.min(Math.trunc(seconds), 86_400)
    : undefined;
}

export async function handleIntakeRequest(
  kind: IntakeKind,
  request: Request,
  deps: { fetch?: typeof fetch; now?: () => number } = {},
): Promise<Response> {
  const fetchImpl = deps.fetch ?? fetch;
  const now = deps.now?.() ?? Date.now();

  const contentType = (request.headers.get("content-type") ?? "").split(";")[0]!.trim();
  if (contentType.toLowerCase() !== "application/json") return failed(415);

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return failed(413);

  if (isCrossOrigin(request)) return failed(403);

  let text: string;
  try {
    text = await request.text();
  } catch {
    return failed(400);
  }
  if (new TextEncoder().encode(text).byteLength > MAX_BODY_BYTES) return failed(413);

  let body: unknown;
  try {
    body = JSON.parse(text);
  } catch {
    return failed(400);
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) return failed(400);

  // Bots get a convincing success and nothing is forwarded.
  if (looksAutomated(body as Record<string, unknown>, now)) {
    return json({ ok: true, reference: null }, 201);
  }

  // Fail closed: without the secret the backend would see every visitor as Vercel's address.
  const env = readEnv();
  if (!env.baseUrl || (env.isProduction && !env.secret)) return unavailable();

  const headers: Record<string, string> = {
    "content-type": "application/json",
    accept: "application/json",
  };
  if (env.secret) {
    headers["x-urshop-intake-secret"] = env.secret;
    const ip = visitorIp(request.headers);
    if (ip) headers["x-urshop-client-ip"] = ip;
  }

  let upstream: Response;
  try {
    upstream = await fetchImpl(`${env.baseUrl}${BACKEND_PATHS[kind]}`, {
      method: "POST",
      headers,
      body: JSON.stringify(pickAllowedFields(kind, body)),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    });
  } catch {
    return failed(502);
  }

  const payload = await readUpstream(upstream);

  if (upstream.status === 201 || upstream.status === 200) {
    const reference = (payload as { reference?: unknown } | null)?.reference;
    return json(
      {
        ok: true,
        reference:
          typeof reference === "string" && REFERENCE_PATTERN.test(reference) ? reference : null,
      },
      201,
    );
  }

  if (upstream.status === 429) {
    const seconds = retryAfter(upstream);
    return json(
      { ok: false, code: "RATE_LIMITED", ...(seconds ? { retryAfterSeconds: seconds } : {}) },
      429,
      seconds ? { "Retry-After": String(seconds) } : undefined,
    );
  }

  if (upstream.status === 400) {
    const error = (payload as { error?: { code?: unknown; fieldErrors?: unknown } } | null)?.error;
    return json(
      {
        ok: false,
        code: "VALIDATION_FAILED",
        fieldErrors: filterFieldErrors(kind, error?.fieldErrors),
      },
      400,
    );
  }

  return failed(502);
}
