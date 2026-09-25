import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { featureAreas, getExplorerItems, getShowcaseItems } from "@/components/features/areas";
import { FeaturesClosingCta } from "@/components/features/closing-cta";
import { FeatureExplorer } from "@/components/features/feature-explorer";
import { FeatureShowcase } from "@/components/features/feature-showcase";
import { FeaturesDock } from "@/components/features/features-dock";
import { FeaturesHero, FeaturesHeroBackdrop } from "@/components/features/hero";
import { LocalFacts } from "@/components/features/local-facts";
import { featureScenes } from "@/components/features/scenes/scene-map";
import { FEATURES_LAST_VERIFIED_AT } from "@/data/features";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/features",
  title: "Features | UrShop",
  description:
    "Everything UrShop gives Bangladeshi merchants: Bangla and English storefronts, themes and a page builder, guest checkout with cash on delivery and bKash, Pathao, RedX and Steadfast courier booking, coupons, analytics and more.",
});

const lastUpdated = {
  iso: FEATURES_LAST_VERIFIED_AT,
  text: new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" }).format(
    new Date(`${FEATURES_LAST_VERIFIED_AT}T00:00:00Z`),
  ),
};

const areaOptions = featureAreas.map((area) => ({
  id: area.id,
  label: area.navLabel,
  icon: area.icon,
}));

export default function FeaturesPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <FeaturesHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <FeaturesHero />
        <LocalFacts />
        {featureAreas.map((area, index) => {
          const items = getShowcaseItems(area);
          return (
            <FeatureShowcase
              key={area.id}
              areaId={area.id}
              eyebrow={area.eyebrow}
              title={area.title}
              intro={area.intro}
              items={items}
              scenes={Object.fromEntries(items.map((item) => [item.id, featureScenes[item.id]]))}
              visualSide={index % 2 === 0 ? "end" : "start"}
            />
          );
        })}
        <FeatureExplorer items={getExplorerItems()} areas={areaOptions} lastUpdated={lastUpdated} />
        <FeaturesClosingCta />
      </main>

      <FeaturesDock areas={areaOptions} />
      <SiteFooter />
    </div>
  );
}
