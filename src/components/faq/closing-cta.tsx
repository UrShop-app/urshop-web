import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

/** Closing prompt for the FAQ page. */
export function FaqClosingCta() {
  return (
    <section
      aria-labelledby="faq-cta-heading"
      className="relative overflow-clip px-6 pt-16 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="faq-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Still have a question?
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Our team is happy to help with anything this page doesn&apos;t cover, from what to set up
          first to whether UrShop fits the way your shop sells.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <CtaSecondaryLink href="/contact">Contact our team</CtaSecondaryLink>
        </div>
      </CtaPanel>
    </section>
  );
}
