import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { SectionHeading } from "./section-heading";

// Stages a shop moves through. Only name what every store can use today (see src/data/features.ts).
const STAGES: ReadonlyArray<{ label: string; title: string; text: string }> = [
  {
    label: "Opening",
    title: "Start without technical setup",
    text: "A guided setup, a ready-made theme and cash on delivery let you take your first orders without configuring everything up front.",
  },
  {
    label: "Getting busier",
    title: "Keep more orders moving",
    text: "Bulk courier bookings, printable invoices and staff accounts with their own permissions help a growing team share the work.",
  },
  {
    label: "Growing the brand",
    title: "Reach and understand customers",
    text: "Your own domain, campaign pages, coupons, sales analytics and ad pixels help you bring shoppers in and see what works.",
  },
];

const revealDelays = ["", "reveal-delay-1", "reveal-delay-2"];

/** How the same platform keeps fitting as a shop grows, plus where merchants get help. */
export function Growth() {
  return (
    <section aria-labelledby="growth-heading" className="relative px-6 py-16 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="growth-heading"
          eyebrow="Growing with you"
          title="The same platform from first order to busy season"
          intro="You shouldn't have to move platforms as your shop grows. The tools are there when you need them, and out of the way until then."
          align="center"
          className="reveal"
        />

        <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STAGES.map((stage, index) => (
            <li key={stage.label} className={cn("reveal", revealDelays[index])}>
              <div className="flex items-center gap-3" aria-hidden="true">
                <span className="size-2.5 shrink-0 rounded-full bg-brand ring-4 ring-brand-light" />
                <span className="h-px flex-1 bg-linear-to-r from-brand/40 to-transparent" />
              </div>
              <p className="mt-5 text-[12px] font-bold tracking-[0.18em] text-brand-dark uppercase">
                {stage.label}
              </p>
              <h3 className="mt-2 text-lg font-bold text-slate-900">{stage.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{stage.text}</p>
            </li>
          ))}
        </ol>

        <div
          className="liquid-glass-subtle reveal mt-14 flex flex-col gap-4 rounded-3xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7"
          style={{ borderRadius: "24px" }}
        >
          <div className="flex gap-4">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
              <Icon name="contact_support" />
            </span>
            <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
              <span className="block font-bold text-slate-900">Help where you work</span>
              Step-by-step guides in Bangla and English sit inside the dashboard, and you can open a
              support ticket without leaving it.
            </p>
          </div>
          <Link
            href="/features"
            className="glass-btn inline-flex h-11 shrink-0 items-center gap-2 self-start rounded-full pr-4 pl-5 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:self-center"
          >
            See all features
            <Icon name="arrow_forward" className="text-brand" />
          </Link>
        </div>
      </div>
    </section>
  );
}
