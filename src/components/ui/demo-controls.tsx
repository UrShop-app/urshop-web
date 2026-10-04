import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import type { DemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

/*
 * Controls shared by the animated product demos (Themes, Integrations pages). Plain components:
 * the client demos that use them supply the state.
 */

const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Pause/play for an autoplaying demo. Hidden under reduced motion, where demos don't play. */
export function AutoplayButton({ demo, className }: { demo: DemoAutoplay; className?: string }) {
  if (demo.reducedMotion) return null;
  return (
    <button
      type="button"
      onClick={demo.toggleAutoplay}
      className={cn(
        "inline-flex h-9 shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 pr-3.5 pl-2 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
        className,
      )}
    >
      <Icon name={demo.isAutoplayOn ? "pause" : "play_arrow"} className="text-brand" />
      {demo.isAutoplayOn ? "Pause demo" : "Play demo"}
    </button>
  );
}

/** Row of mutually exclusive options (a toolbar of toggle buttons). */
export function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
  size = "md",
}: {
  label: string;
  options: ReadonlyArray<{ value: T; label: ReactNode; icon?: IconName; ariaLabel?: string }>;
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-200/80 bg-white/80 p-1",
        className,
      )}
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={isActive}
            aria-label={option.ariaLabel}
            onClick={() => onChange(option.value)}
            className={cn(
              "inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-full font-bold whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
              size === "sm" ? "h-7 px-2.5 text-[11px]" : "h-8 px-3.5 text-xs",
              isActive ? "text-white" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
            )}
            style={isActive ? { background: BRAND_GRADIENT } : undefined}
          >
            {option.icon ? <Icon name={option.icon} /> : null}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
