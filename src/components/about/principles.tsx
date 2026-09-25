import Link from "next/link";
import type { ReactNode } from "react";

import { SectionHeading } from "./section-heading";

// Every "in practice" line must stay true for every store today (see src/data/features.ts).
const PRINCIPLES: ReadonlyArray<{ title: string; text: string; inPractice: ReactNode }> = [
  {
    title: "Your brand, not ours",
    text: "Shoppers are buying from you, so the shop should look and feel like yours rather than like a platform.",
    inPractice:
      "Your logo and brand colors appear across the storefront and on invoices, and your shop can live on your own domain.",
  },
  {
    title: "Everyday changes without a developer",
    text: "Updating a banner or launching a campaign page is part of running a shop. It shouldn't need a technical person.",
    inPractice:
      "Pick a theme, restyle it in an editor that shows your real storefront, and build pages from blocks. Drafts stay private until you publish, and earlier versions can be restored.",
  },
  {
    title: "Practical over impressive",
    text: "We focus on the jobs a shop does every day and on making them dependable, instead of adding complexity for its own sake.",
    inPractice: (
      <>
        Our{" "}
        <Link
          href="/features"
          className="font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark"
        >
          Features page
        </Link>{" "}
        marks plainly what is available only on request and what is still coming.
      </>
    ),
  },
  {
    title: "Careful with your business",
    text: "Merchants trust us with their orders, customers and accounts. Safety is part of how the product behaves by default.",
    inPractice:
      "Order totals are priced on our servers, not taken from the browser. Courier and payment credentials are stored encrypted, staff get only the access you give them, and sign-in can use two-factor authentication.",
  },
];

/** The ideas that decide what UrShop builds, each backed by how the product behaves today. */
export function Principles() {
  return (
    <section aria-labelledby="principles-heading" className="relative px-6 py-16 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-16">
        <div className="reveal lg:sticky lg:top-40 lg:self-start">
          <SectionHeading
            id="principles-heading"
            eyebrow="What guides us"
            title="The principles behind the product"
            intro="A few ideas shape what we build and how it behaves. Each one shows up somewhere you can use today."
          />
        </div>

        <ol className="divide-y divide-slate-200/80 border-y border-slate-200/80">
          {PRINCIPLES.map((principle, index) => (
            <li
              key={principle.title}
              className="reveal grid gap-3 py-8 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6 sm:py-10"
            >
              <span
                aria-hidden="true"
                className="font-stat text-3xl leading-none font-bold text-brand sm:text-4xl"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                  {principle.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">{principle.text}</p>
                <p className="mt-4 rounded-2xl bg-brand-light/60 px-4 py-3 text-sm leading-relaxed text-slate-700">
                  <span className="font-bold text-brand-dark">In practice: </span>
                  {principle.inPractice}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
