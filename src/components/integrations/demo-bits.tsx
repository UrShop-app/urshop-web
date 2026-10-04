import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Building blocks for the Integrations page demos. A demo is a marketing sketch of verified
 * behaviour (src/data/features.ts): it never shows a service, status or automation the product
 * doesn't have. Mount animations are the global `demo-*` classes (globals.css, "Features page"),
 * timed with `at()`; a demo replays them by remounting. Under reduced motion they show the end
 * state, so every element's resting style is its final look.
 */

export const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Example order used across the demos. */
export const EXAMPLE_ORDER = { number: "#1042", total: "৳2,340" } as const;

/** Starts a `demo-*` animation `seconds` after mount. */
export function at(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

type Tone = "neutral" | "pending" | "success" | "brand";

const TONES: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  pending: "bg-amber-50 text-amber-800",
  success: "bg-emerald-50 text-emerald-700",
  brand: "bg-brand-light text-brand-dark",
};

export function Pill({
  tone,
  children,
  className,
  style,
}: {
  tone: Tone;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap",
        TONES[tone],
        className,
      )}
      style={style}
    >
      {tone === "success" ? <span className="size-1.5 rounded-full bg-emerald-500" /> : null}
      {children}
    </span>
  );
}

/** One status replaced by another at `seconds` (e.g. Pending → Paid). */
export function StatusSwap({
  from,
  to,
  seconds,
}: {
  from: { tone: Tone; label: string };
  to: { tone: Tone; label: string };
  seconds: number;
}) {
  return (
    <span className="grid justify-items-end *:[grid-area:1/1]">
      <Pill tone={from.tone} className="demo-out" style={at(seconds)}>
        {from.label}
      </Pill>
      <Pill tone={to.tone} className="demo-pop" style={at(seconds)}>
        {to.label}
      </Pill>
    </span>
  );
}

/** White inner card. */
export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Pill button pressed at `pressAt`, then showing `doneLabel`. */
export function PressButton({
  label,
  doneLabel,
  pressAt,
  className,
}: {
  label: string;
  doneLabel: string;
  pressAt: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "demo-press relative grid h-9 place-items-center rounded-full px-4 text-xs font-bold text-white *:[grid-area:1/1]",
        className,
      )}
      style={at(pressAt)}
    >
      <span className="absolute inset-0 rounded-full" style={{ background: BRAND_GRADIENT }} />
      <span className="demo-out relative" style={at(pressAt + 0.2)}>
        {label}
      </span>
      <span className="demo-in relative" style={at(pressAt + 0.25)}>
        ✓ {doneLabel}
      </span>
    </span>
  );
}

/** Phone outline holding a message thread. */
export function PhoneFrame({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[15rem] rounded-[2rem] bg-slate-900 p-2 shadow-[0_24px_48px_-20px_rgba(15,23,42,0.45)]",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.6rem] bg-slate-50">
        <div className="flex items-center justify-center border-b border-slate-200/70 bg-white py-2.5 text-xs font-bold text-slate-700">
          {title}
        </div>
        <div className="flex min-h-[12rem] flex-col justify-end gap-2 p-3">{children}</div>
      </div>
    </div>
  );
}

/** Incoming SMS bubble. */
export function MessageBubble({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <p
      className={cn(
        "max-w-[92%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-[12px] leading-snug text-slate-700 shadow-sm",
        className,
      )}
      style={style}
    >
      {children}
    </p>
  );
}
