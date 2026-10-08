import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { learningPath } from "@/data/resources";
import { cn } from "@/lib/utils";

/**
 * Launch → Customize → Connect → Sell → Measure → Grow, each stage linking to the strongest page
 * for it. The rail fills as the section scrolls into view (`.learning-rail` in globals.css).
 */
export function LearningPath() {
  return (
    <section
      aria-labelledby="learning-path-heading"
      className="relative px-6 py-14 sm:py-20 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="learning-path-heading"
          eyebrow="Learning path"
          title="Six steps to a growing store"
          align="center"
          className="reveal"
        />

        <div className="relative mt-14">
          <span className="learning-rail" aria-hidden="true">
            <span className="learning-rail-fill" />
          </span>
          <ol className="relative grid gap-3 lg:grid-cols-6">
            {learningPath.map((step, index) => (
              <li
                key={step.label}
                className={cn(
                  "reveal relative pl-16 lg:pt-16 lg:pl-0",
                  index % 3 === 1 && "reveal-delay-1",
                  index % 3 === 2 && "reveal-delay-2",
                )}
              >
                <span
                  className="absolute top-0 left-0 z-10 grid size-12 place-items-center rounded-full border border-white bg-white font-stat text-base font-bold text-brand-dark shadow-glass lg:left-1/2 lg:-translate-x-1/2"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <Link
                  href={step.href}
                  className="liquid-glass-card glass-lift group flex h-full items-center gap-3 rounded-3xl p-4 transition-[box-shadow,translate] duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark motion-reduce:transition-none motion-reduce:hover:translate-y-0 lg:flex-col lg:gap-3 lg:p-5 lg:text-center"
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-brand-light text-brand-dark transition-[background-color,color,scale] duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white">
                    <Icon name={step.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-bold tracking-[0.18em] text-brand-dark uppercase">
                      {step.label}
                    </span>
                    <span className="mt-1 block leading-snug font-bold text-slate-900">
                      {step.title}
                    </span>
                  </span>
                  <Icon
                    name="arrow_forward"
                    className="shrink-0 text-slate-300 transition-[color,translate] duration-300 group-hover:translate-x-0.5 group-hover:text-brand lg:hidden"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
