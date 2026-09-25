import { AboutClosingCta } from "@/components/about/closing-cta";
import { Company } from "@/components/about/company";
import { Growth } from "@/components/about/growth";
import { AboutHero, AboutHeroBackdrop } from "@/components/about/hero";
import { LocalCommerce } from "@/components/about/local-commerce";
import { Principles } from "@/components/about/principles";
import { WhyUrShop } from "@/components/about/why-urshop";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/about",
  title: "About | UrShop",
  description:
    "UrShop is an ecommerce platform that makes running an online shop in Bangladesh simpler: your own branded storefront, cash on delivery and bKash, local couriers and every order in one dashboard.",
});

export default function AboutPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <AboutHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <AboutHero />
        <WhyUrShop />
        <Principles />
        <LocalCommerce />
        <Growth />
        <Company />
        <AboutClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
