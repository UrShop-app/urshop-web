import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type SplitPoint = { icon: IconName; text: ReactNode };

/**
 * One integration area: copy and short points on one side, its live demo on the other.
 * `demoSide` alternates down the page.
 */
export function SplitSection({
  id,
  eyebrow,
  title,
  intro,
  points,
  demo,
  demoSide,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  points: ReadonlyArray<SplitPoint>;
  demo: ReactNode;
  demoSide: "start" | "end";
  /** Extra content under the split, full width. */
  children?: ReactNode;
}) {
  const headingId = `${id}-heading`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          <div className={cn("reveal", demoSide === "start" && "lg:order-last")}>
            <span className="liquid-pill inline-flex items-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              {eyebrow}
            </span>
            <h2
              id={headingId}
              className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl"
            >
              {title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>
            <ul className="mt-7 space-y-3.5">
              {points.map((point, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm text-slate-700 sm:text-base"
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-brand-light text-brand-dark">
                    <Icon name={point.icon} className="scale-75" />
                  </span>
                  <span className="pt-1">{point.text}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0">{demo}</div>
        </div>
        {children}
      </div>
    </section>
  );
}
