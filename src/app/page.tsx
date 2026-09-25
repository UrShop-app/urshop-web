import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/",
  title: "UrShop — Launch your online shop in under 5 minutes",
  description:
    "The simplest way for Bangladeshi shops and creators to sell products online: bKash & Nagad payouts, automated Pathao, Steadfast and RedX delivery, and a clean checkout page.",
});

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob-1" />
        <div className="aurora-blob-2" />
        <div className="aurora-blob-3" />
      </div>

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        {/* Sections to migrate, in order: Hero, How it works, Shop setup guide, Integrations,
            Testimonials, FAQ, Closing CTA. See docs/migration.md. */}
      </main>

      <SiteFooter />
    </div>
  );
}
