import { ContactClosingCta } from "@/components/contact/closing-cta";
import { ContactSection } from "@/components/contact/contact-section";
import { ContactHero, ContactHeroBackdrop } from "@/components/contact/hero";
import { MoreHelp } from "@/components/contact/more-help";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact | UrShop",
  description: `Contact the UrShop team about getting started, merchant support, partnerships or anything else. Email ${siteConfig.supportEmail} or send us a message.`,
});

export default function ContactPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <ContactHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <ContactHero />
        <ContactSection />
        <MoreHelp />
        <ContactClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
