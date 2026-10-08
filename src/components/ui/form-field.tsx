import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Text input / textarea styling shared by the site's forms. Pair textareas with `min-h-* resize-y`. */
export const inputClass =
  "block w-full rounded-2xl border border-slate-200 bg-white/90 px-4 py-3 text-base text-slate-900 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow] duration-200 placeholder:text-slate-400 focus:border-brand focus:ring-4 focus:ring-brand/15 focus:outline-none aria-invalid:border-rose-400 aria-invalid:focus:ring-rose-100";

/** Label, optional tag, hint and error around one control. */
export function Field({
  id,
  label,
  optional = false,
  hint,
  error,
  children,
}: {
  /** The control's id; the hint and error use `${id}-hint` and `${id}-error`. */
  id: string;
  label: string;
  optional?: boolean;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-baseline justify-between gap-2">
        <span className="text-sm font-bold text-slate-900">{label}</span>
        {optional ? <span className="text-xs font-medium text-slate-400">Optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint ? (
        <p id={`${id}-hint`} className="mt-2 text-xs leading-relaxed text-slate-500">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null;
  return (
    <p id={id} className="mt-2 text-sm font-medium text-rose-600">
      {error}
    </p>
  );
}

/** The gradient pill used to submit a form. */
export function SubmitButton({
  className,
  children,
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "style">) {
  return (
    <button
      {...props}
      type="submit"
      className={cn(
        "inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full border px-7 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:active:scale-100",
        className,
      )}
      style={{
        background: "linear-gradient(135deg, rgba(8, 192, 216, 0.96), rgba(2, 132, 199, 0.96))",
        borderColor: "rgba(255, 255, 255, 0.65)",
        boxShadow:
          "0 8px 24px -4px rgba(2, 132, 199, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.75)",
      }}
    >
      {children}
    </button>
  );
}
