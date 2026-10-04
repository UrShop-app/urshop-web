import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { AgencySection } from "@/components/partners/agency";
import { Audiences } from "@/components/partners/audiences";
import { PartnersClosingCta } from "@/components/partners/closing-cta";
import { PartnersFaq } from "@/components/partners/faq";
import { PartnersHero, PartnersHeroBackdrop } from "@/components/partners/hero";
import { HowItStarts } from "@/components/partners/how-it-starts";
import { ReferralSection } from "@/components/partners/referral";
import { RegionalSection } from "@/components/partners/regional";
import { SoftwareSection } from "@/components/partners/software";
import { TechnologySection } from "@/components/partners/technology";
import { WaysToPartner } from "@/components/partners/ways";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/partners",
  title: "Partners: Agencies, Referrals, Technology & Strategic Partnerships | UrShop",
  description:
    "Partner with UrShop: build client stores as an agency, refer businesses, bring UrShop to a new market, integrate your technology or work with our team on custom software.",
});

export default function PartnersPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <PartnersHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <PartnersHero />
        <WaysToPartner />
        <AgencySection />
        <RegionalSection />
        <ReferralSection />
        <TechnologySection />
        <SoftwareSection />
        <Audiences />
        <HowItStarts />
        <PartnersFaq />
        <PartnersClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
