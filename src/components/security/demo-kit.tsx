import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Building blocks for the Security page demos. A demo is a calm marketing sketch of verified
 * behaviour (src/data/features.ts, src/data/faq.ts): it may simplify the dashboard, but it never
 * shows a control, permission name, status or automation the product doesn't have, and never
 * shows implementation details (tokens, internal URLs, permission identifiers, infrastructure).
 * People and stores in the demos are clearly example content.
 */

export const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Starts a global `demo-*` animation (globals.css, "Features page") `seconds` after mount. */
export function at(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

export type Tone = "neutral" | "pending" | "success" | "brand" | "locked" | "danger";

const TONES: Record<Tone, string> = {
  neutral: "bg-slate-100 text-slate-600",
  pending: "bg-amber-50 text-amber-800",
  success: "bg-emerald-50 text-emerald-700",
  brand: "bg-brand-light text-brand-dark",
  locked: "bg-slate-100 text-slate-400",
  danger: "bg-rose-50 text-rose-700",
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
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold whitespace-nowrap transition-colors duration-300",
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

/** Outer frame of an interactive demo: white glass card with a title row. */
export function DemoFrame({
  title,
  icon,
  actions,
  children,
  className,
}: {
  title: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white bg-white/90 p-4 shadow-glass sm:p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-sm font-bold text-slate-900">
          {icon}
          {title}
        </p>
        {actions}
      </div>
      {children}
    </div>
  );
}

/** Example initials avatar. */
export function Avatar({ initials, color }: { initials: string; color: string }) {
  return (
    <span
      className="grid size-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold text-white"
      style={{ background: color }}
    >
      {initials}
    </span>
  );
}

function Spinner() {
  return (
    <span className="size-3 animate-spin rounded-full border-2 border-amber-300 border-t-transparent motion-reduce:animate-none" />
  );
}

/** Amber "in progress" pill with a spinner. */
export function PendingPill({ children }: { children: ReactNode }) {
  return (
    <Pill tone="pending">
      <Spinner />
      {children}
    </Pill>
  );
}
