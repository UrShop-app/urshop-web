import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

/** Closing prompt for the Features page, in the home page's closing-CTA style. */
export function FeaturesClosingCta() {
  return (
    <section className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12">
      <CtaPanel>
        <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl">
          Ready to open your shop?
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Create your store, add your products and start taking orders. Questions about a feature or
          whether it fits your shop? Our team is happy to help.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <CtaSecondaryLink href={`mailto:${siteConfig.supportEmail}`}>
            Email our team
          </CtaSecondaryLink>
        </div>
      </CtaPanel>
    </section>
  );
}
