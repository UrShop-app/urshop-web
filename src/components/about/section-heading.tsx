import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Eyebrow pill, h2 and optional intro, as used by the Features page section headers. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "start",
  className,
}: {
  /** Id of the h2, for the section's `aria-labelledby`. */
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <span className="liquid-pill inline-flex items-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
        {eyebrow}
      </span>
      <h2
        id={id}
        className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>
      ) : null}
    </header>
  );
}
