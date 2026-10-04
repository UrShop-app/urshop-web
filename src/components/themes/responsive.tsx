import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

import { ResponsiveDemo } from "./responsive-demo";

// Behaviour of every storefront (src/data/features.ts, "responsive-storefront").
const BEHAVIOURS: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "smartphone",
    title: "On phones",
    text: "Slide-in menu and a bottom tab bar.",
  },
  {
    icon: "apps",
    title: "Product grids",
    text: "Two columns on phones, up to six on desktop.",
  },
  {
    icon: "tune",
    title: "Filters",
    text: "Sidebar on desktop, drawer on phones.",
  },
  {
    icon: "desktop_windows",
    title: "Preview every size",
    text: "Desktop, tablet and phone, before you publish.",
  },
];

/** The storefront adapting from desktop to tablet to phone. */
export function ResponsiveSection() {
  return (
    <section
      id="every-screen"
      aria-labelledby="every-screen-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="every-screen-heading"
          eyebrow="Every screen"
          title="Looks right on every screen"
          intro="Built mobile-first. Layouts adapt instead of just shrinking."
          align="center"
          className="reveal"
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <ResponsiveDemo />
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BEHAVIOURS.map((behaviour) => (
            <li key={behaviour.title} className="reveal flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                <Icon name={behaviour.icon} />
              </span>
              <span>
                <span className="block font-bold text-slate-900">{behaviour.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {behaviour.text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
