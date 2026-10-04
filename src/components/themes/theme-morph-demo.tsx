"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useRef, type CSSProperties } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import {
  AutoplayButton,
  BRAND_GRADIENT,
  BrowserFrame,
  EXAMPLE_PRODUCTS,
  Glyph,
  ProductArt,
  ScaledMock,
  Segmented,
  Stars,
  THEME_LOOKS,
} from "./demo-kit";
import { useDemoAutoplay } from "./use-demo-autoplay";

type ThemeId = keyof typeof THEME_LOOKS;

const CATEGORIES = ["All", "Sarees", "Panjabi", "Home", "Bags"];
const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };

/** The example homepage, laid out by theme. Shared elements morph between the two layouts. */
function MorphStore({ theme }: { theme: ThemeId }) {
  const isAura = theme === "aura";
  const look = THEME_LOOKS[theme];
  // Classic shows a denser catalogue (two rows); Aura shows a few products, larger.
  const products = [...EXAMPLE_PRODUCTS, ...EXAMPLE_PRODUCTS].slice(0, isAura ? 3 : 8);

  return (
    <div
      className="flex h-full flex-col overflow-hidden transition-colors duration-700"
      style={{ background: look.background, color: look.ink }}
    >
      {/* Header */}
      <motion.div
        layout
        className={cn(
          "flex items-center gap-[1em] px-[1.6em]",
          isAura ? "py-[1.3em]" : "border-b py-[0.9em]",
        )}
        style={{ borderColor: look.soft }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isAura ? (
            <motion.span
              key="aura-links"
              layout="position"
              {...fade}
              className="flex flex-1 gap-[1.4em] text-[0.85em] tracking-[0.14em] uppercase"
              style={{ color: look.muted }}
            >
              <span>Shop</span>
              <span>Journal</span>
            </motion.span>
          ) : null}
        </AnimatePresence>
        <motion.span
          layout="position"
          className={cn(
            "flex items-center gap-[0.5em] whitespace-nowrap",
            isAura ? "font-serif text-[1.7em] tracking-[0.06em]" : "text-[1.15em] font-extrabold",
          )}
        >
          {isAura ? null : (
            <span className="size-[1.35em] rounded-[0.35em]" style={{ background: look.accent }} />
          )}
          Your brand
        </motion.span>
        <AnimatePresence mode="popLayout" initial={false}>
          {isAura ? null : (
            <motion.span
              key="classic-search"
              layout="position"
              {...fade}
              className="ml-[1em] flex h-[2.3em] flex-1 items-center gap-[0.6em] rounded-full px-[1em] text-[0.9em]"
              style={{ background: look.soft, color: look.muted }}
            >
              <Glyph name="search" />
              Search products
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span
          layout="position"
          className={cn("flex gap-[1em] text-[1.25em]", isAura && "flex-1 justify-end")}
        >
          <Glyph name="heart" />
          <Glyph name="bag" />
        </motion.span>
      </motion.div>

      {/* Category chips (Classic browses by category first) */}
      <AnimatePresence mode="popLayout" initial={false}>
        {isAura ? null : (
          <motion.div
            key="chips"
            layout
            {...fade}
            className="flex gap-[0.5em] px-[1.6em] pt-[0.9em]"
          >
            {CATEGORIES.map((category, index) => (
              <span
                key={category}
                className="rounded-full px-[0.9em] py-[0.35em] text-[0.8em] font-semibold"
                style={
                  index === 0
                    ? { background: look.accent, color: "#fff" }
                    : { background: look.soft, color: look.muted }
                }
              >
                {category}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banner (Classic) / editorial hero (Aura) */}
      <motion.div
        layout
        className={cn(
          "relative mx-[1.6em] mt-[0.9em] flex shrink-0 overflow-hidden",
          isAura ? "h-[11em] items-end p-[1.6em]" : "h-[5.5em] items-center px-[1.6em]",
        )}
        style={{
          borderRadius: look.radius,
          background: isAura
            ? "linear-gradient(120deg, #e7d3c1 0%, #c79b7c 55%, #8e5a3c 100%)"
            : `linear-gradient(120deg, ${look.accent} 0%, #14b8a6 100%)`,
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {isAura ? (
            <motion.span key="aura-hero" layout="position" {...fade} className="text-white">
              <span className="block text-[0.75em] tracking-[0.2em] uppercase opacity-80">
                New season
              </span>
              <span className="mt-[0.2em] block font-serif text-[2.3em] leading-[1.05]">
                Made by hand
              </span>
              <span className="mt-[0.6em] inline-block border-b border-white/80 pb-[0.1em] text-[0.85em]">
                Explore the collection
              </span>
            </motion.span>
          ) : (
            <motion.span
              key="classic-banner"
              layout="position"
              {...fade}
              className="flex w-full items-center justify-between gap-[1em] text-white"
            >
              <span>
                <span className="block text-[1.3em] font-extrabold">New arrivals</span>
                <span className="block text-[0.85em] opacity-80">Fresh picks every week</span>
              </span>
              <span
                className="rounded-[0.4em] bg-white px-[1em] py-[0.5em] text-[0.85em] font-bold"
                style={{ color: look.accent }}
              >
                Shop now
              </span>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Products */}
      <motion.div
        layout
        className={cn(
          "grid px-[1.6em] pt-[1.2em]",
          isAura ? "grid-cols-3 gap-[1.6em]" : "grid-cols-4 gap-[0.9em]",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {products.map((product, index) => (
            <motion.div key={`${product.name}-${index}`} layout {...fade} className="min-w-0">
              <motion.div
                layout
                className={cn("overflow-hidden", isAura ? "aspect-[3/4]" : "aspect-square")}
                style={{ borderRadius: look.radius }}
              >
                <ProductArt product={product} className="size-full" />
              </motion.div>
              <motion.div layout="position" className="mt-[0.6em] min-w-0">
                <span
                  className={cn(
                    "block truncate",
                    isAura ? "font-serif text-[1.15em]" : "text-[0.9em] font-semibold",
                  )}
                >
                  {product.name}
                </span>
                <span className="mt-[0.15em] flex items-center justify-between gap-[0.4em]">
                  <span
                    className={cn("text-[0.85em]", isAura ? "" : "font-bold")}
                    style={{ color: isAura ? look.muted : look.ink }}
                  >
                    {product.price}
                  </span>
                  {isAura ? null : <Stars className="text-[0.65em]" />}
                </span>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/**
 * Hero demo: the same example store in Classic, then tried in Aura. The address bar and status
 * make clear that trying a theme is a private preview; the live store changes only on Publish.
 */
export function ThemeMorphDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: [4200, 5200] });
  const theme: ThemeId = demo.step === 1 ? "aura" : "classic";

  return (
    <div ref={demoRef}>
      <div className="mb-4 flex flex-wrap items-center justify-center gap-3 sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <Segmented
            label="Try a theme"
            value={theme}
            onChange={(value) => demo.goTo(value === "aura" ? 1 : 0)}
            options={[
              { value: "classic", label: "Classic" },
              { value: "aura", label: "Aura" },
            ]}
          />
          {/* Autoplay timer; restarts with each step. */}
          <span
            aria-hidden="true"
            className="mx-3 block h-0.5 overflow-hidden rounded-full bg-brand/10"
          >
            {demo.isPlaying ? (
              <span
                key={demo.step}
                className="showcase-progress block h-full"
                style={
                  {
                    "--showcase-duration": `${demo.stepDuration}ms`,
                    background: BRAND_GRADIENT,
                  } as CSSProperties
                }
              />
            ) : null}
          </span>
        </div>
        <p
          aria-live="polite"
          className="order-last w-full text-center text-sm text-slate-600 sm:order-none sm:w-auto sm:flex-1 sm:text-left"
        >
          {theme === "aura" ? (
            <>
              <span className="font-bold text-slate-900">Previewing Aura.</span> Private until you
              publish.
            </>
          ) : (
            <>
              <span className="font-bold text-slate-900">Live store.</span> What shoppers see today.
            </>
          )}
        </p>
        <AutoplayButton demo={demo} />
      </div>

      <BrowserFrame
        address={
          theme === "aura" ? (
            <>
              <Icon name="visibility" className="text-amber-600" />
              Private preview · Aura
            </>
          ) : (
            <>
              <span className="size-2 rounded-full bg-emerald-500" />
              Live store · Classic
            </>
          )
        }
      >
        <ScaledMock className="aspect-[4/3] sm:aspect-[16/10]" scale={1.45}>
          <MotionConfig
            reducedMotion="user"
            transition={{ type: "spring", bounce: 0.12, duration: 0.9 }}
          >
            <LayoutGroup>
              <MorphStore theme={theme} />
            </LayoutGroup>
          </MotionConfig>
        </ScaledMock>
      </BrowserFrame>
      <p className="sr-only">
        An example storefront shown in the Classic theme, with a search bar, category chips, a
        banner and a four-column grid of square product photos, then in the Aura theme, with a
        centred serif logo, a large editorial hero and three tall portrait product photos.
      </p>
    </div>
  );
}
