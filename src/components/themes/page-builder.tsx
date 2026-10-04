import Link from "next/link";

import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

import { PageBuilderDemo } from "./page-builder-demo";

const POINTS: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "drag_indicator",
    title: "Drag & drop",
    text: "Or move blocks with the keyboard.",
  },
  {
    icon: "visibility_off",
    title: "Hide, don't delete",
    text: "Switch a block off and back on.",
  },
  {
    icon: "palette",
    title: "Always on brand",
    text: "Pages follow your store's theme.",
  },
  {
    icon: "menu_book",
    title: "Part of your store",
    text: "Add to your menu, or use as your homepage.",
  },
];

/** Page Builder: assembling a page from reusable blocks. */
export function PageBuilderSection() {
  return (
    <section
      id="page-builder"
      aria-labelledby="page-builder-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="page-builder-heading"
          eyebrow="Page Builder"
          title="Build any page from blocks"
          intro="Campaigns, landing pages and brand stories from 34 ready-made blocks."
          align="center"
          className="reveal"
        />

        <div className="mt-12">
          <PageBuilderDemo />
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <li key={point.title} className="reveal flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                <Icon name={point.icon} />
              </span>
              <span>
                <span className="block font-bold text-slate-900">{point.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {point.text}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-slate-600">
          <Link
            href="/faq#page-builder"
            className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark"
          >
            Page Builder questions →
          </Link>
        </p>
      </div>
    </section>
  );
}
