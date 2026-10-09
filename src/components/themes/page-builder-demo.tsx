"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useRef, useState } from "react";

import { AutoplayButton, Segmented } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { cn } from "@/lib/utils";

import {
  EXAMPLE_PRODUCTS,
  Glyph,
  Line,
  ProductArt,
  ScaledMock,
  Stars,
  THEME_LOOKS,
} from "./demo-kit";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

type ThemeId = keyof typeof THEME_LOOKS;
type BlockId = "hero" | "products" | "gallery" | "testimonials" | "cta";

/** A few of the 34 blocks, grouped into families. Every name is a real block type. */
const FAMILIES: ReadonlyArray<{
  name: string;
  icon: IconName;
  blocks: ReadonlyArray<{ label: string; id?: BlockId }>;
}> = [
  {
    name: "Heroes & intros",
    icon: "dashboard_customize",
    blocks: [{ label: "Hero", id: "hero" }, { label: "Rich text" }, { label: "Image & text" }],
  },
  {
    name: "Products & offers",
    icon: "shopping_bag",
    blocks: [
      { label: "Product grid", id: "products" },
      { label: "Featured products" },
      { label: "Bundles" },
      { label: "Countdown" },
    ],
  },
  {
    name: "Media",
    icon: "play_arrow",
    blocks: [{ label: "Gallery", id: "gallery" }, { label: "Video" }],
  },
  {
    name: "Trust & answers",
    icon: "forum",
    blocks: [{ label: "Testimonials", id: "testimonials" }, { label: "FAQ" }, { label: "Table" }],
  },
  {
    name: "Calls to action",
    icon: "ads_click",
    blocks: [{ label: "Call to action", id: "cta" }, { label: "Contact" }],
  },
];

const SEQUENCE: ReadonlyArray<BlockId> = ["hero", "products", "gallery", "testimonials", "cta"];

// Step 0 is an empty page (it also lets the previous loop's blocks fade out before anything
// flies again); 1–10 lift then drop each block in turn; 11–12 show the page in the other theme.
const DURATIONS = [900, ...SEQUENCE.flatMap(() => [700, 1000]), 2800, 2400];
const ASSEMBLED_STEP = SEQUENCE.length * 2;

function frameAt(step: number): { lifted: BlockId | null; placed: number; theme: ThemeId } {
  if (step > ASSEMBLED_STEP) return { lifted: null, placed: SEQUENCE.length, theme: "aura" };
  if (step === 0) return { lifted: null, placed: 0, theme: "classic" };
  const move = step - 1;
  return {
    lifted: move % 2 === 0 ? (SEQUENCE[move / 2] ?? null) : null,
    placed: Math.ceil(move / 2),
    theme: "classic",
  };
}

/** One placed block, drawn in the active theme. */
function CanvasBlock({ id, theme }: { id: BlockId; theme: ThemeId }) {
  const look = THEME_LOOKS[theme];
  const isAura = theme === "aura";
  const serif = isAura ? "font-serif" : "font-bold";

  switch (id) {
    case "hero":
      return (
        <div
          className="flex h-[8em] flex-col justify-center px-[1.6em] text-white transition-[border-radius] duration-500"
          style={{
            borderRadius: look.radius,
            background: isAura
              ? "linear-gradient(120deg, #e7d3c1 0%, #c79b7c 55%, #8e5a3c 100%)"
              : `linear-gradient(120deg, ${look.accent} 0%, #14b8a6 100%)`,
          }}
        >
          <span className={cn("block text-[1.8em] leading-tight", serif)}>Eid collection</span>
          <span className="mt-[0.3em] block text-[0.85em] opacity-85">
            Limited pieces, made by hand
          </span>
        </div>
      );
    case "products":
      return (
        <div className="grid grid-cols-4 gap-[0.8em]">
          {EXAMPLE_PRODUCTS.slice(0, 4).map((product) => (
            <span key={product.name} className="min-w-0">
              <ProductArt
                product={product}
                className={isAura ? "aspect-[3/4]" : "aspect-square"}
                style={{ borderRadius: look.radius }}
              />
              <span className={cn("mt-[0.4em] block truncate text-[0.8em]", serif)}>
                {product.name}
              </span>
            </span>
          ))}
        </div>
      );
    case "gallery":
      return (
        <div className="grid h-[7em] grid-cols-3 grid-rows-2 gap-[0.6em]">
          {EXAMPLE_PRODUCTS.slice(1, 6).map((product, index) => (
            <ProductArt
              key={product.name}
              product={product}
              className={cn(index === 0 && "row-span-2")}
              style={{ borderRadius: look.radius }}
            />
          ))}
        </div>
      );
    case "testimonials":
      return (
        <div className="grid grid-cols-2 gap-[0.8em]">
          {[0, 1].map((quote) => (
            <span
              key={quote}
              className="space-y-[0.5em] p-[1em]"
              style={{ background: look.soft, borderRadius: look.radius, color: look.muted }}
            >
              <Stars className="text-[0.8em]" />
              <PersonAvatar
                portrait={quote === 0 ? "founder" : "glasses"}
                size={24}
                className="size-[2em]"
              />
              <Line />
              <Line className="w-2/3" />
            </span>
          ))}
        </div>
      );
    case "cta":
      return (
        <div
          className="flex items-center justify-between px-[1.4em] py-[1.1em] text-white"
          style={{ background: look.ink, borderRadius: look.radius }}
        >
          <span className={cn("text-[1.05em]", serif)}>Shop the collection</span>
          <span
            className="px-[1em] py-[0.4em] text-[0.8em] font-bold"
            style={{ background: look.accent, borderRadius: isAura ? 0 : "999px" }}
          >
            Shop now
          </span>
        </div>
      );
  }
}

/**
 * Page Builder sketch: blocks are dragged from the library onto a page (drag and drop is the
 * real interaction here), then the finished page is shown in the store's other theme, since
 * pages inherit the active storefront theme.
 */
export function PageBuilderDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: DURATIONS,
    reducedMotionStep: ASSEMBLED_STEP,
  });
  const [customTheme, setCustomTheme] = useState<ThemeId | null>(null);
  const frame = frameAt(demo.step);
  const theme = !demo.isAutoplayOn && customTheme ? customTheme : frame.theme;
  const lifted = demo.isAutoplayOn ? frame.lifted : null;
  const placed = SEQUENCE.slice(0, frame.placed);
  const look = THEME_LOOKS[theme];

  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ type: "spring", bounce: 0.18, duration: 0.75 }}
    >
      <LayoutGroup id="page-builder">
        <div ref={demoRef}>
          <div className="grid gap-4 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-6">
            {/* Block library */}
            <div
              aria-hidden="true"
              className="rounded-3xl border border-white bg-white/90 p-4 shadow-glass select-none"
            >
              <p className="text-sm font-bold text-slate-900">Blocks</p>
              <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-1">
                {FAMILIES.map((family) => (
                  <div key={family.name}>
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] text-slate-500 uppercase">
                      <Icon name={family.icon} className="scale-75 text-brand" />
                      {family.name}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {family.blocks.map((block) => {
                        const isLifted = block.id !== undefined && block.id === lifted;
                        return (
                          <span
                            key={block.label}
                            // Phones list only the blocks the demo drags, so the page stays in view.
                            className={cn("relative", !block.id && "hidden md:inline-block")}
                          >
                            <span
                              className={cn(
                                "flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-semibold transition-colors duration-300",
                                block.id && placed.includes(block.id)
                                  ? "border-brand/30 bg-brand-light/60 text-brand-dark"
                                  : "border-slate-200 bg-white text-slate-600",
                              )}
                            >
                              <Glyph name="grip" className="text-slate-300" />
                              {block.label}
                            </span>
                            {isLifted ? (
                              <motion.span
                                layoutId={`block-${block.id}`}
                                initial={{ scale: 1, rotate: 0, y: 0 }}
                                animate={{ scale: 1.12, rotate: -4, y: -6 }}
                                className="absolute inset-0 z-10 flex items-center gap-1 rounded-lg border border-brand/50 bg-white px-2 py-1 text-xs font-semibold text-brand-dark shadow-[0_12px_24px_-8px_rgba(2,132,199,0.45)]"
                              >
                                <Glyph name="grip" className="text-brand" />
                                {block.label}
                                <svg
                                  viewBox="0 0 24 24"
                                  className="absolute -right-2.5 -bottom-3.5 size-5 drop-shadow"
                                >
                                  <path
                                    d="M5 3l14 7.5-6.2 1.6L10 18.5 5 3Z"
                                    fill="#0f172a"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </motion.span>
                            ) : null}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 border-t border-slate-200/70 pt-3 text-xs text-slate-500">
                A few of the <span className="font-bold text-slate-700">34 blocks</span>.
              </p>
            </div>

            {/* Page canvas */}
            <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_32px_64px_-24px_rgba(2,132,199,0.28)]">
              <div className="flex items-center justify-between gap-3 border-b border-slate-200/70 px-4 py-2.5">
                <p className="truncate text-sm font-bold text-slate-800">Eid campaign page</p>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
                  Draft
                </span>
              </div>
              <ScaledMock className="h-[25rem] sm:h-[30rem]" scale={1.45}>
                <div
                  className="flex h-full flex-col gap-[0.9em] p-[1.3em] transition-colors duration-500"
                  style={{ background: look.background, color: look.ink }}
                >
                  <AnimatePresence initial={false}>
                    {placed.map((id) => (
                      <motion.div
                        key={id}
                        layoutId={`block-${id}`}
                        exit={{ opacity: 0 }}
                        className="relative"
                      >
                        <CanvasBlock id={id} theme={theme} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {placed.length < SEQUENCE.length ? (
                    <motion.div
                      layout
                      className={cn(
                        "flex h-[5em] shrink-0 items-center justify-center rounded-[0.6em] border-2 border-dashed text-[1em] font-semibold transition-colors duration-300",
                        lifted
                          ? "border-brand bg-brand-light/50 text-brand-dark"
                          : "border-slate-200 text-slate-400",
                      )}
                    >
                      {lifted ? "Drop block here" : "Drag a block here"}
                    </motion.div>
                  ) : null}
                </div>
              </ScaledMock>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-slate-600">Show this page in the store theme:</span>
              <Segmented
                label="Store theme for this example page"
                size="sm"
                value={theme}
                onChange={(value) => {
                  setCustomTheme(value);
                  demo.goTo(ASSEMBLED_STEP);
                }}
                options={[
                  { value: "classic", label: "Classic" },
                  { value: "aura", label: "Aura" },
                ]}
              />
            </div>
            <AutoplayButton demo={demo} />
          </div>
          <p className="sr-only">
            Hero, product grid, gallery, testimonials and call-to-action blocks are dragged from the
            block library onto a draft page. The finished page then appears in the Aura theme,
            because pages use the store&apos;s active theme.
          </p>
        </div>
      </LayoutGroup>
    </MotionConfig>
  );
}
