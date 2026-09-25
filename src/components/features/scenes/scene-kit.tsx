import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

/*
 * Building blocks for the feature demo scenes. A scene is a small, CSS-animated sketch of the
 * product UI that plays once when it mounts (the showcase remounts it to replay). Rules:
 * - Labels come from the feature dataset; values are placeholders or clearly example input.
 * - Animations are the `demo-*` classes in globals.css ("Features page"), timed with `at()`.
 *   Every element's resting style is its final state, so reduced motion shows the finished scene.
 * - Decorative: the showcase provides the text alternative.
 */

export const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Starts a `demo-*` animation `seconds` after the scene mounts. */
export function at(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

/** For `demo-in-out`: visible from `start` until `end`. */
export function between(start: number, end: number): CSSProperties {
  return { "--d": `${start}s`, "--d2": `${end}s` } as CSSProperties;
}

/** For `demo-type`: reveals `text` character by character from `seconds`. */
export function typed(seconds: number, text: string): CSSProperties {
  return {
    "--d": `${seconds}s`,
    "--s": text.length,
    "--t": `${Math.max(0.3, text.length * 0.055)}s`,
  } as CSSProperties;
}

export function SceneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "liquid-glass-card relative flex h-[26rem] flex-col justify-center gap-3 overflow-hidden rounded-3xl p-3 select-none sm:h-[27rem] sm:p-5",
        className,
      )}
      style={{ borderRadius: "28px" }}
    >
      {children}
    </div>
  );
}

/** White inner card. */
export function Panel({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/70 bg-white p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-4",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function Label({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn("text-[10px] font-bold tracking-[0.16em] text-slate-400 uppercase", className)}
    >
      {children}
    </p>
  );
}

/** Placeholder text line. */
export function Bar({ className, style }: { className?: string; style?: CSSProperties }) {
  return <span className={cn("block h-2 rounded-full bg-slate-200/80", className)} style={style} />;
}

/** Children occupy the same cell, so states can cross-fade in place. */
export function Stack({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span className={cn("grid *:[grid-area:1/1]", className)} style={style}>
      {children}
    </span>
  );
}

export function Check({
  tone = "brand",
  className,
  style,
}: {
  tone?: "brand" | "light";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full",
        tone === "brand" ? "text-white" : "bg-white text-brand-dark",
        className,
      )}
      style={tone === "brand" ? { background: BRAND_GRADIENT, ...style } : style}
    >
      <svg
        viewBox="0 0 12 12"
        className="size-2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M2.5 6.2 5 8.5l4.5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export function Chevron() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 shrink-0 text-slate-400" fill="currentColor">
      <path d="M2.6 4.3a.6.6 0 0 1 .85 0L6 6.85 8.55 4.3a.6.6 0 1 1 .85.85l-3 3a.6.6 0 0 1-.85 0l-3-3a.6.6 0 0 1 0-.85z" />
    </svg>
  );
}

/** Text input with a placeholder that is replaced by typed text. */
export function TypedField({
  label,
  placeholder,
  value,
  start,
  className,
}: {
  label?: string;
  placeholder: string;
  value: string;
  start: number;
  className?: string;
}) {
  return (
    <div className={className}>
      {label ? <p className="mb-1 text-[11px] font-semibold text-slate-500">{label}</p> : null}
      <Stack className="h-8 items-center rounded-lg border border-slate-200 bg-slate-50 px-2.5 text-xs">
        <span className="demo-out text-slate-400" style={at(start)}>
          {placeholder}
        </span>
        <span
          className="demo-type font-semibold whitespace-nowrap text-slate-800"
          style={typed(start, value)}
        >
          {value}
        </span>
      </Stack>
    </div>
  );
}

/** Pill button that is pressed at `pressAt` and then shows `doneLabel` with a check. */
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
    <Stack
      className={cn(
        "demo-press relative h-9 place-items-center rounded-full px-4 text-xs font-bold text-white",
        className,
      )}
      style={at(pressAt)}
    >
      <span
        className="absolute inset-0 rounded-full"
        style={{ background: BRAND_GRADIENT }}
        aria-hidden="true"
      />
      <span className="demo-out relative" style={at(pressAt + 0.2)}>
        {label}
      </span>
      <span className="demo-in relative flex items-center gap-1.5" style={at(pressAt + 0.25)}>
        <Check tone="light" />
        {doneLabel}
      </span>
    </Stack>
  );
}

/** On/off switch that turns on at `onAt` (stays off when `onAt` is omitted). */
export function Toggle({ onAt }: { onAt?: number }) {
  if (onAt === undefined) {
    return (
      <span className="relative h-4.5 w-8 shrink-0 rounded-full bg-slate-200">
        <span className="absolute top-0.5 left-0.5 size-3.5 rounded-full bg-white shadow-sm" />
      </span>
    );
  }
  return (
    <span className="relative h-4.5 w-8 shrink-0 overflow-hidden rounded-full bg-slate-200">
      <span
        className="demo-in absolute inset-0"
        style={{ ...at(onAt), background: BRAND_GRADIENT }}
      />
      <span
        className="demo-slide absolute top-0.5 left-0.5 size-3.5 translate-x-3.5 rounded-full bg-white shadow-sm"
        style={at(onAt)}
      />
    </span>
  );
}
