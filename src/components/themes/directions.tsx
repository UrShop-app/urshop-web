import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";

import { CompareDemo } from "./compare-demo";

// Example themes shown in the demos. Copy stays count-free so new themes need no rewrite.
const EXAMPLE_THEMES = [
  {
    name: "Classic",
    tag: "Catalogue-first",
    text: "Search, categories and dense product grids up front.",
    swatch: "linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)",
    fontClass: "font-extrabold",
  },
  {
    name: "Aura",
    tag: "Editorial",
    text: "Big imagery, portrait products and room to breathe.",
    swatch: "linear-gradient(135deg, #e7d3c1 0%, #9a4b2f 100%)",
    fontClass: "font-serif font-normal",
  },
] as const;

// Commerce behaviour every theme shares (see src/data/features.ts).
const SHARED: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "inventory_2", label: "Products" },
  { icon: "shopping_cart_checkout", label: "Cart & checkout" },
  { icon: "favorite", label: "Wishlist" },
  { icon: "stars", label: "Reviews" },
  { icon: "local_shipping", label: "Order tracking" },
  { icon: "translate", label: "Bangla & English" },
];

/** The same product in different themes, and what never changes between them. */
export function Directions() {
  return (
    <section
      id="same-store"
      aria-labelledby="same-store-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="same-store-heading"
          eyebrow="Themes"
          title="New look. Same store."
          intro="Every theme runs on the same products, cart and checkout. Only the design changes."
          align="center"
          className="reveal"
        />

        <div className="mx-auto mt-12 max-w-5xl">
          <CompareDemo />
        </div>

        <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">
          {EXAMPLE_THEMES.map((theme) => (
            <div
              key={theme.name}
              className="liquid-glass-card glass-lift reveal flex items-center gap-4 rounded-3xl p-5 transition-shadow duration-300"
              style={{ borderRadius: "24px" }}
            >
              <span
                className="size-12 shrink-0 rounded-2xl shadow-sm"
                style={{ background: theme.swatch }}
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className={`text-xl text-slate-900 ${theme.fontClass}`}>{theme.name}</span>
                  <span className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">
                    {theme.tag}
                  </span>
                </p>
                <p className="mt-0.5 text-sm text-slate-600">{theme.text}</p>
              </div>
            </div>
          ))}

          <div className="reveal rounded-3xl border border-dashed border-brand/30 bg-white/50 px-5 py-4 md:col-span-2">
            <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-6">
              <p className="shrink-0 text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase">
                Same in every theme
              </p>
              <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 lg:flex-1 lg:justify-end">
                {SHARED.map((item) => (
                  <li
                    key={item.label}
                    className="flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap text-slate-700"
                  >
                    <Icon name={item.icon} className="text-brand" />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
