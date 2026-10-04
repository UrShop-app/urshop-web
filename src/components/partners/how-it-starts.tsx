import { Icon, type IconName } from "@/components/ui/icon";

import { BRAND_GRADIENT, PartnersSection } from "./kit";

// No turnaround times: each step takes as long as the opportunity needs.
const STEPS: ReadonlyArray<{ icon: IconName; title: string }> = [
  { icon: "forum", title: "Tell us what you bring" },
  { icon: "fact_check", title: "We evaluate it together" },
  { icon: "handshake", title: "Agree the model" },
  { icon: "rocket_launch", title: "Build and launch" },
  { icon: "trending_up", title: "Grow the partnership" },
];

/** Five steps on one shared line that fills as the section scrolls in. */
export function HowItStarts() {
  return (
    <PartnersSection
      id="how-it-starts"
      eyebrow="Getting started"
      title="How a partnership starts"
      intro="With a conversation, not an application form."
      className="partners-growth"
    >
      <ol className="relative mx-auto grid max-w-5xl gap-6 lg:grid-cols-5 lg:gap-4">
        {/* The shared line: down the steps on phones, across them from `lg`. */}
        <span
          aria-hidden="true"
          className="absolute top-6 bottom-6 left-6 w-0.5 overflow-hidden bg-slate-200 lg:top-6 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-0.5 lg:w-auto"
        >
          <span
            className="partners-growth-fill-y absolute inset-0 lg:hidden"
            style={{ background: BRAND_GRADIENT }}
          />
          <span
            className="partners-growth-fill absolute inset-0 max-lg:hidden"
            style={{ background: BRAND_GRADIENT }}
          />
        </span>
        {STEPS.map((step, index) => (
          <li
            key={step.title}
            className="relative flex items-center gap-4 lg:flex-col lg:gap-4 lg:text-center"
          >
            <span
              className="grid size-12 shrink-0 place-items-center rounded-full border-4 border-[#FAFBFD] text-white shadow-[0_8px_20px_-6px_rgba(8,192,216,0.6)]"
              style={{ background: BRAND_GRADIENT }}
            >
              <Icon name={step.icon} className="scale-90" />
            </span>
            <span>
              <span className="block text-[11px] font-bold tracking-[0.16em] text-slate-400 uppercase">
                Step {index + 1}
              </span>
              <span className="mt-0.5 block text-base font-extrabold text-slate-900">
                {step.title}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </PartnersSection>
  );
}
