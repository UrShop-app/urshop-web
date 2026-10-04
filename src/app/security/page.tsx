import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SecurityClosingCta } from "@/components/security/closing-cta";
import { SecurityHero, SecurityHeroBackdrop } from "@/components/security/hero";
import {
  AccessSection,
  CustomersSection,
  DomainsSection,
  PaymentsSection,
  PermissionsSection,
  PublishingSection,
  ResponsibilitySection,
  StoreScopeSection,
} from "@/components/security/sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/security",
  title: "Security | UrShop",
  description:
    "How UrShop helps you run your store safely: your own login with two-factor sign-in, staff permissions by area, private drafts until you publish, verified domains with HTTPS, and payments into your own bKash account.",
});

export default function SecurityPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <SecurityHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <SecurityHero />
        <AccessSection />
        <PermissionsSection />
        <PublishingSection />
        <DomainsSection />
        <PaymentsSection />
        <CustomersSection />
        <StoreScopeSection />
        <ResponsibilitySection />
        <SecurityClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
