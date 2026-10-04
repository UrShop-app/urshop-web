import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemesClosingCta } from "@/components/themes/closing-cta";
import { Directions } from "@/components/themes/directions";
import { PreviewSection, SafetySection } from "@/components/themes/go-live";
import { ThemesHero, ThemesHeroBackdrop } from "@/components/themes/hero";
import { MakeItYours } from "@/components/themes/make-it-yours";
import { PageBuilderSection } from "@/components/themes/page-builder";
import { ResponsiveSection } from "@/components/themes/responsive";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/themes",
  title: "Themes | UrShop",
  description:
    "Pick a theme and make your UrShop storefront yours: brand colors, fonts, spacing, homepage sections, Page Builder pages, mobile-first layouts, private previews and version restore.",
});

export default function ThemesPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <ThemesHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <ThemesHero />
        <Directions />
        <MakeItYours />
        <PageBuilderSection />
        <ResponsiveSection />
        <PreviewSection />
        <SafetySection />
        <ThemesClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
