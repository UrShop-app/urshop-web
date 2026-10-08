/**
 * Field contract for the public /report and /feature-request forms, shared by the form (UX
 * validation) and the Route Handlers (field allowlist).
 *
 * The UrShop backend owns the real rules (`urshop-backend/src/modules/support/publicDto.ts`); the
 * limits here mirror them so visitors see problems before submitting. Keep the two in step. This
 * module stays dependency-free (relative imports only) so it runs anywhere.
 */

export type IntakeKind = "report" | "feature-request";

export const INTAKE_LIMITS = {
  nameMax: 100,
  emailMax: 254,
  phoneMax: 32,
  phoneDigitsMin: 7,
  phoneDigitsMax: 15,
  titleMin: 3,
  titleMax: 150,
  descriptionMin: 20,
  descriptionMax: 12000,
  pageUrlMax: 2000,
} as const;

/** Every UrShop support category except Feature request, which has its own page. */
export const REPORT_CATEGORIES = [
  { id: "BUG", label: "Bug", icon: "bug_report", hint: "Something's broken" },
  { id: "ORDER_ISSUE", label: "Order issue", icon: "receipt_long", hint: "Orders & checkout" },
  { id: "PRODUCT_ISSUE", label: "Product issue", icon: "inventory_2", hint: "Products & stock" },
  {
    id: "COURIER_ISSUE",
    label: "Courier issue",
    icon: "local_shipping",
    hint: "Delivery & tracking",
  },
  { id: "BILLING", label: "Billing", icon: "payments", hint: "Plan & payments" },
  { id: "OTHER", label: "Other", icon: "help", hint: "Anything else" },
] as const;

export type ReportCategoryId = (typeof REPORT_CATEGORIES)[number]["id"];

const REPORT_CATEGORY_IDS: ReadonlySet<string> = new Set(REPORT_CATEGORIES.map((c) => c.id));

/** Fields each endpoint forwards to the backend, in form order. Anything else is dropped. */
export const INTAKE_FIELDS = {
  report: ["name", "email", "phone", "category", "title", "description", "pageUrl"],
  "feature-request": ["name", "email", "phone", "title", "description", "pageUrl"],
} as const satisfies Record<IntakeKind, readonly string[]>;

export type IntakeField = (typeof INTAKE_FIELDS)["report"][number];
export type IntakeValues = Partial<Record<IntakeField, string>>;
export type IntakeErrors = Partial<Record<IntakeField, string>>;

/**
 * Keeps only this kind's allowlisted fields, and only string values. Server-owned fields
 * (store, status, priority, origin, attachments...) and the anti-spam fields never get through.
 */
export function pickAllowedFields(kind: IntakeKind, body: unknown): IntakeValues {
  if (!body || typeof body !== "object" || Array.isArray(body)) return {};
  const source = body as Record<string, unknown>;
  const picked: IntakeValues = {};
  for (const field of INTAKE_FIELDS[kind]) {
    const value = source[field];
    if (typeof value === "string") picked[field] = value;
  }
  return picked;
}

const CONTROL_CHARS = /[\u0000-\u001F\u007F]/;
const PHONE_ALLOWED = /^\+?[0-9\s\-()]+$/;

function isHttpUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/** The phone check, without any country-specific rules. */
export function phoneError(raw: string): string | undefined {
  const value = raw.trim();
  if (!value) return "Enter your mobile number.";
  if (value.length > INTAKE_LIMITS.phoneMax) return "This phone number is too long.";
  if (!PHONE_ALLOWED.test(value)) {
    return "Use digits, spaces, dashes, brackets and an optional leading +.";
  }
  const digits = value.replace(/\D/g, "").length;
  if (digits < INTAKE_LIMITS.phoneDigitsMin || digits > INTAKE_LIMITS.phoneDigitsMax) {
    return "Enter a valid mobile number, including the country code if you are outside Bangladesh.";
  }
  return undefined;
}

function textError(
  value: string,
  { label, min, max }: { label: string; min: number; max: number },
): string | undefined {
  if (!value) return `Enter ${label}.`;
  if (value.length < min) return `Use at least ${min} characters.`;
  if (value.length > max) return `Keep this under ${max} characters.`;
  if (CONTROL_CHARS.test(value)) return "Remove unsupported characters.";
  return undefined;
}

/** Client-side mirror of the backend rules. Returns an error per invalid field. */
export function validateIntake(kind: IntakeKind, values: IntakeValues): IntakeErrors {
  const errors: IntakeErrors = {};
  const v = (field: IntakeField) => (values[field] ?? "").trim();

  const name = textError(v("name"), { label: "your name", min: 1, max: INTAKE_LIMITS.nameMax });
  if (name) errors.name = name;

  const email = v("email");
  if (!email) errors.email = "Enter your email address.";
  else if (email.length > INTAKE_LIMITS.emailMax) errors.email = "This email address is too long.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter an email address like name@example.com.";
  }

  const phone = phoneError(v("phone"));
  if (phone) errors.phone = phone;

  if (kind === "report" && !REPORT_CATEGORY_IDS.has(v("category"))) {
    errors.category = "Choose what your report is about.";
  }

  const title = textError(v("title"), {
    label: kind === "report" ? "a subject" : "a feature title",
    min: INTAKE_LIMITS.titleMin,
    max: INTAKE_LIMITS.titleMax,
  });
  if (title) errors.title = title;

  const description = v("description");
  if (!description) errors.description = "Add a description.";
  else if (description.length < INTAKE_LIMITS.descriptionMin) {
    errors.description = `Add a little more detail (at least ${INTAKE_LIMITS.descriptionMin} characters).`;
  } else if (description.length > INTAKE_LIMITS.descriptionMax) {
    errors.description = `Keep this under ${INTAKE_LIMITS.descriptionMax} characters.`;
  }

  const pageUrl = v("pageUrl");
  if (pageUrl && (pageUrl.length > INTAKE_LIMITS.pageUrlMax || !isHttpUrl(pageUrl))) {
    errors.pageUrl = "Enter a link starting with https://.";
  }

  return errors;
}

/** Ticket references look like `UR-AB12CD34`. */
export const REFERENCE_PATTERN = /^UR-[A-Z0-9]{8}$/;

/** What the Route Handlers return to the form. Never backend bodies. */
export type IntakeResponse =
  | { ok: true; reference: string | null }
  | {
      ok: false;
      code: "VALIDATION_FAILED" | "RATE_LIMITED" | "UNAVAILABLE" | "REQUEST_FAILED";
      fieldErrors?: IntakeErrors;
      retryAfterSeconds?: number;
    };

/** Anti-spam fields the form sends and the Route Handler consumes; never forwarded. */
export const HONEYPOT_FIELD = "website";
export const STARTED_AT_FIELD = "startedAt";
