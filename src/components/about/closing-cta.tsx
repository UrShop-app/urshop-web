import { CtaPanel, CtaSecondaryLink } from "@/components/ui/cta-panel";
import { MetallicButton } from "@/components/ui/metallic-button";
import { siteConfig } from "@/config/site";

/** Closing prompt for the About page. */
export function AboutClosingCta() {
  return (
    <section
      aria-labelledby="about-cta-heading"
      className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12"
    >
      <CtaPanel>
        <h2
          id="about-cta-heading"
          className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
        >
          Build your shop on UrShop
        </h2>
        <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
          Set up your store, make it look like your brand and start taking orders. Want to talk it
          through first? Our team is happy to help.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <MetallicButton label="Start Free Trial" href="/pricing" />
          <CtaSecondaryLink href={`mailto:${siteConfig.supportEmail}`}>
            Email our team
          </CtaSecondaryLink>
        </div>
      </CtaPanel>
    </section>
  );
}
