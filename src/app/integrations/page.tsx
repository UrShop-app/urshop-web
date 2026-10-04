import { IntegrationsClosingCta } from "@/components/integrations/closing-cta";
import { IntegrationsHero, IntegrationsHeroBackdrop } from "@/components/integrations/hero";
import {
  DeliverySection,
  MeasurementSection,
  MessagingSection,
  OrderJourneySection,
  PaymentsSection,
} from "@/components/integrations/sections";
import { StatusBoard } from "@/components/integrations/status-board";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/integrations",
  title: "Integrations | UrShop",
  description:
    "Connect your UrShop store to bKash, Pathao, RedX and Steadfast, BulkSMSBD, Meta Pixel, TikTok Pixel and Google Tag Manager, and follow every order from checkout to delivery.",
});

export default function IntegrationsPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <IntegrationsHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <IntegrationsHero />
        <OrderJourneySection />
        <PaymentsSection />
        <DeliverySection />
        <MeasurementSection />
        <MessagingSection />
        <StatusBoard />
        <IntegrationsClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
