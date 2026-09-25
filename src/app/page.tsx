import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingCta } from "@/components/home/closing-cta";
import { Faq } from "@/components/home/faq";
import { Hero, HeroBackdrop } from "@/components/home/hero";
import { HowItWorks } from "@/components/home/how-it-works";
import { Integrations } from "@/components/home/integrations";
import { ShopSetupGuide } from "@/components/home/shop-setup-guide";
import { Testimonials } from "@/components/home/testimonials";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/",
  title: "UrShop — Launch your online shop in under 5 minutes",
  description:
    "The simplest way for Bangladeshi shops and creators to sell products online: bKash & Nagad payouts, automated Pathao, Steadfast and RedX delivery, and a clean checkout page.",
});

export default function HomePage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <HeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <Hero />
        <HowItWorks />
        <ShopSetupGuide />
        <Integrations />
        <Testimonials />
        <Faq />
        <ClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
