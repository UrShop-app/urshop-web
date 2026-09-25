import { MetallicButton } from "@/components/ui/metallic-button";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { siteConfig } from "@/config/site";

const ctaTiles: ReadonlyArray<ShopGridTile> = [
  { x: -10, y: 2, delay: -3 },
  { x: -7, y: 7, delay: -8 },
  { x: -3, y: 0, delay: -5 },
  { x: 4, y: 7, delay: -1.5 },
  { x: 8, y: 1, delay: -6 },
  { x: 2, y: 0, delay: -4, className: "sm:hidden" },
];

const ctaBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 2, delay: -3, duration: 10 },
  { axis: "y", at: -8, delay: -5, duration: 9 },
  { axis: "y", at: 7, delay: -1, duration: 11 },
];

/** Closing prompt for the Features page, in the home page's closing-CTA style. */
export function FeaturesClosingCta() {
  return (
    <section className="relative overflow-clip px-6 pt-12 pb-24 lg:px-12">
      <div
        className="reveal relative mx-auto max-w-5xl overflow-clip p-10 text-center sm:p-16"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(240, 249, 255, 0.75) 50%, rgba(224, 242, 254, 0.8) 100%)",
          backdropFilter: "blur(28px) saturate(190%)",
          border: "1.5px solid rgba(255, 255, 255, 0.95)",
          boxShadow:
            "0 28px 56px -12px rgba(2, 132, 199, 0.18), inset 0 2px 3px rgba(255, 255, 255, 1)",
          borderRadius: "32px",
        }}
      >
        <ShopGrid tiles={ctaTiles} beams={ctaBeams} className="shop-grid-cta inset-0" />
        <div className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-brand-cyan/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 size-80 rounded-full bg-brand/20 blur-3xl" />
        <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center">
          <h2 className="mb-4 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl">
            Ready to open your shop?
          </h2>
          <p className="mb-10 max-w-lg text-sm leading-relaxed text-slate-600 sm:text-base">
            Create your store, add your products and start taking orders. Questions about a feature
            or whether it fits your shop? Our team is happy to help.
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <MetallicButton label="Start Free Trial" href="/pricing" />
            <a
              href={`mailto:${siteConfig.supportEmail}`}
              className="inline-flex h-11.5 items-center justify-center rounded-full px-7 text-sm font-bold text-slate-800 transition-all duration-300 hover:bg-white/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95"
              style={{
                background: "rgba(255, 255, 255, 0.75)",
                backdropFilter: "blur(16px)",
                border: "1.5px solid rgba(255, 255, 255, 0.95)",
                boxShadow:
                  "0 4px 16px rgba(15, 23, 42, 0.06), inset 0 1.5px 2px rgba(255, 255, 255, 1)",
              }}
            >
              Email our team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
