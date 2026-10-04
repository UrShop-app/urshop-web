import Link from "next/link";
import type { ReactNode } from "react";

import { BRAND_GRADIENT, PartnersSection, textLinkClass } from "./kit";

// Answers never state rates, margins, payout terms, timelines or exclusivity: those are agreed
// per partnership.
const PARTNER_FAQS: ReadonlyArray<{ id: string; question: string; answer: ReactNode }> = [
  {
    id: "agency-client-stores",
    question: "Can an agency use UrShop for client stores?",
    answer:
      "Yes. Build and run client stores on UrShop and charge for your own services. Each client has their own store and adds your team as staff.",
  },
  {
    id: "refer-merchants",
    question: "Can I refer merchants to UrShop?",
    answer: "Yes. Introduce them to our team. Referral terms are agreed with us.",
  },
  {
    id: "new-market",
    question: "Can we launch UrShop in another market?",
    answer:
      "We're open to it. UrShop is built for Bangladesh today, so a new market is adapted together and agreed case by case.",
  },
  {
    id: "fixed-rates",
    question: "Do you offer fixed reseller or affiliate rates?",
    answer:
      "No. There's no public affiliate program or fixed margin. Terms depend on the partnership.",
  },
  {
    id: "integrate-product",
    question: "Can my product integrate with UrShop?",
    answer: (
      <>
        Tell us what it does. Each integration depends on fit and scope. See{" "}
        <Link href="/integrations" className={textLinkClass}>
          current integrations
        </Link>
        .
      </>
    ),
  },
  {
    id: "custom-software",
    question: "Can UrShop build custom software for us or our clients?",
    answer: "Yes, depending on scope: web apps, dashboards, APIs, integrations and automation.",
  },
  {
    id: "agency-size",
    question: "Do I need to be a large company?",
    answer: "No. What matters is a credible opportunity, not your size.",
  },
  {
    id: "exclusive",
    question: "Are partnerships exclusive?",
    answer: "Not by default. Any exclusivity is part of a specific agreement.",
  },
];

/** Round +/- indicator in the FAQ page style, driven by the parent `<details>` (`group`). */
function FaqToggle() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand transition-[border-color,box-shadow,color] duration-300 group-open:border-transparent group-open:text-white group-open:shadow-[0_8px_18px_-6px_rgba(8,192,216,0.6)] group-hover:border-brand/40 motion-reduce:transition-none"
    >
      <span
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-open:opacity-100 motion-reduce:transition-none"
        style={{ background: BRAND_GRADIENT }}
      />
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-90 motion-reduce:transition-none" />
    </span>
  );
}

/** Partnership questions as native disclosures, so they work without JavaScript. */
export function PartnersFaq() {
  return (
    <PartnersSection id="faq" eyebrow="FAQ" title="Questions partners ask">
      <div className="mx-auto max-w-4xl">
        <ul
          className="liquid-glass-card reveal reveal-delay-1 space-y-1 rounded-3xl p-2 sm:p-3"
          style={{ borderRadius: "28px" }}
        >
          {PARTNER_FAQS.map((faq) => (
            <li key={faq.id} id={faq.id} className="scroll-mt-24 md:scroll-mt-32">
              <details className="faq-item group rounded-2xl border border-transparent transition-[background-color,border-color,box-shadow] duration-300 open:border-white open:bg-white/90 open:shadow-[0_12px_32px_-14px_rgba(2,132,199,0.22)] not-open:hover:bg-white/55">
                <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                  <span className="flex-1 text-base font-semibold text-slate-800 transition-colors duration-300 group-open:text-slate-900 group-hover:text-brand sm:text-lg">
                    {faq.question}
                  </span>
                  <FaqToggle />
                </summary>
                <div className="faq-answer px-4 pb-6 text-sm leading-relaxed text-slate-600 sm:pr-20 sm:pl-6 sm:text-base">
                  <p>{faq.answer}</p>
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </PartnersSection>
  );
}
