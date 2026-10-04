import Link from "next/link";

import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

import { PublishFlowDemo } from "./publish-flow-demo";
import { VersionsDemo } from "./versions-demo";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

const SAFETY: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "visibility",
    title: "Try themes privately",
    text: "Your live store doesn't change until you publish.",
  },
  {
    icon: "inventory_2",
    title: "Your content stays",
    text: "Products, pages and homepage choices carry over. Nothing is deleted.",
  },
  {
    icon: "history",
    title: "Roll back anytime",
    text: "Restore any of your last 20 published versions.",
  },
];

/** Draft → preview → share → save → publish. */
export function PreviewSection() {
  return (
    <section
      id="preview"
      aria-labelledby="preview-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="preview-heading"
          eyebrow="Preview & publish"
          title="Preview first. Publish when ready."
          intro="Changes stay private until you hit Publish."
          align="center"
          className="reveal"
        />
        <div className="mt-12">
          <PublishFlowDemo />
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          <Link href="/faq#preview-publish" className={linkClass}>
            How previews and publishing work →
          </Link>
        </p>
      </div>
    </section>
  );
}

/** Trying themes safely and restoring published versions. */
export function SafetySection() {
  return (
    <section
      id="change-your-mind"
      aria-labelledby="change-your-mind-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <SectionHeading
            id="change-your-mind-heading"
            eyebrow="Safe changes"
            title="Change your mind anytime"
            className="reveal"
          />
          <ul className="mt-8 space-y-6">
            {SAFETY.map((item) => (
              <li key={item.title} className="reveal flex gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                  <Icon name={item.icon} />
                </span>
                <span>
                  <span className="block font-bold text-slate-900">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600 sm:text-base">
                    {item.text}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <VersionsDemo />
      </div>
    </section>
  );
}
