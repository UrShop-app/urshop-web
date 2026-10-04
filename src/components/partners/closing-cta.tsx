import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";

import { partnershipContactHref } from "./kit";

/** Closing prompt for the Partners page. */
export function PartnersClosingCta() {
  return (
    <section
      aria-labelledby="partners-cta-heading"
      className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="partners-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Have clients, distribution, technology or an idea? Let&apos;s talk.
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Tell us what you bring. We&apos;ll take it from there.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Talk partnership" href={partnershipContactHref()} />
          <CtaSecondaryLink href="/contact">Contact UrShop</CtaSecondaryLink>
        </div>
      </CtaPanel>
    </section>
  );
}
