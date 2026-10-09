"use client";

import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import { useRef, useState, type ReactNode } from "react";

import { AutoplayButton } from "@/components/ui/demo-controls";
import { Icon } from "@/components/ui/icon";
import { PersonAvatar } from "@/components/ui/person-avatar";
import { cn } from "@/lib/utils";

import { EXAMPLE_PRODUCTS, Line, ProductArt, ScaledMock, Stars } from "./demo-kit";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

type SectionId = "hero" | "trust" | "categories" | "bestsellers" | "testimonials" | "cta";

const LABELS: Record<SectionId, string> = {
  hero: "Hero",
  trust: "Trust bar",
  categories: "Category grid",
  bestsellers: "Best sellers",
  testimonials: "Testimonials",
  cta: "Call to action",
};

const HERO_COPY = ["Made by hand", "Gifts for Eid"] as const;

type HomepageState = {
  order: ReadonlyArray<SectionId>;
  hidden: ReadonlyArray<SectionId>;
  hero: 0 | 1;
  /** Row to highlight while autoplaying. */
  focus: SectionId | null;
};

const DEFAULT_ORDER: ReadonlyArray<SectionId> = [
  "hero",
  "trust",
  "categories",
  "bestsellers",
  "testimonials",
  "cta",
];

const FRAMES: ReadonlyArray<HomepageState> = [
  { order: DEFAULT_ORDER, hidden: [], hero: 0, focus: null },
  { order: DEFAULT_ORDER, hidden: ["trust"], hero: 0, focus: "trust" },
  {
    order: ["hero", "trust", "categories", "testimonials", "bestsellers", "cta"],
    hidden: ["trust"],
    hero: 0,
    focus: "testimonials",
  },
  {
    order: ["hero", "trust", "testimonials", "categories", "bestsellers", "cta"],
    hidden: ["trust"],
    hero: 0,
    focus: "testimonials",
  },
  {
    order: ["hero", "trust", "testimonials", "categories", "bestsellers", "cta"],
    hidden: ["trust"],
    hero: 1,
    focus: "hero",
  },
  {
    order: ["hero", "trust", "testimonials", "categories", "bestsellers", "cta"],
    hidden: [],
    hero: 1,
    focus: "trust",
  },
];

const ACCENT = "#0f766e";

function SectionPreview({ id, hero }: { id: SectionId; hero: 0 | 1 }) {
  switch (id) {
    case "hero":
      return (
        <div
          className="flex h-[8.5em] flex-col justify-center rounded-[0.6em] px-[1.4em] text-white"
          style={{ background: `linear-gradient(125deg, ${ACCENT} 0%, #5eead4 120%)` }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={hero}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="block text-[1.7em] leading-tight font-bold"
            >
              {HERO_COPY[hero]}
            </motion.span>
          </AnimatePresence>
          <span className="mt-[0.7em] block w-fit rounded-full bg-white px-[1em] py-[0.4em] text-[0.8em] font-bold text-teal-800">
            Shop now
          </span>
        </div>
      );
    case "trust":
      return (
        <div className="grid grid-cols-3 gap-[0.6em] rounded-[0.6em] bg-slate-50 p-[0.9em]">
          {[0, 1, 2].map((item) => (
            <span key={item} className="flex items-center gap-[0.5em] text-slate-400">
              <span className="size-[1.4em] shrink-0 rounded-full bg-teal-100" />
              <Line className="flex-1" />
            </span>
          ))}
        </div>
      );
    case "categories":
      return (
        <div className="grid grid-cols-4 gap-[0.7em]">
          {EXAMPLE_PRODUCTS.slice(0, 4).map((product) => (
            <span key={product.name} className="text-center">
              <ProductArt product={product} className="aspect-square rounded-full" />
              <Line className="mx-auto mt-[0.5em] w-3/4 text-slate-500" />
            </span>
          ))}
        </div>
      );
    case "bestsellers":
      return (
        <div>
          <p className="mb-[0.6em] text-[0.95em] font-bold">Best sellers</p>
          <div className="grid grid-cols-3 gap-[0.7em]">
            {EXAMPLE_PRODUCTS.slice(2, 5).map((product) => (
              <span key={product.name}>
                <ProductArt product={product} className="aspect-square rounded-[0.5em]" />
                <span className="mt-[0.4em] block truncate text-[0.75em] font-semibold">
                  {product.name}
                </span>
              </span>
            ))}
          </div>
        </div>
      );
    case "testimonials":
      return (
        <div className="grid grid-cols-2 gap-[0.7em]">
          {[0, 1].map((quote) => (
            <span
              key={quote}
              className="space-y-[0.5em] rounded-[0.6em] border border-slate-100 bg-white p-[0.9em] text-slate-400 shadow-sm"
            >
              <Stars className="text-[0.75em]" />
              <PersonAvatar
                portrait={quote === 0 ? "hijab" : "panjabi"}
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
        <div className="flex items-center justify-between rounded-[0.6em] bg-slate-900 px-[1.2em] py-[1em] text-white">
          <span className="text-[0.95em] font-bold">Ready for the new season?</span>
          <span
            className="rounded-full px-[0.9em] py-[0.35em] text-[0.75em] font-bold"
            style={{ background: ACCENT }}
          >
            Shop now
          </span>
        </div>
      );
  }
}

function RowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}

/**
 * Homepage section editor sketch: show/hide sections and move them up or down (the real
 * control; homepage sections are not drag-and-drop), plus a hero content edit.
 */
export function HomepageDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, {
    durations: [2200, 2000, 1800, 2000, 2200, 2600],
    reducedMotionStep: 4,
  });
  const [custom, setCustom] = useState<HomepageState | null>(null);
  const frame = FRAMES[demo.step] ?? FRAMES[0]!;
  const state = demo.isAutoplayOn || !custom ? frame : custom;
  const focus = demo.isAutoplayOn ? state.focus : null;

  const apply = (next: Partial<HomepageState>) => {
    setCustom({ ...state, ...next, focus: null });
    demo.stop();
  };

  const move = (id: SectionId, by: -1 | 1) => {
    const order = [...state.order];
    const from = order.indexOf(id);
    const to = from + by;
    if (to < 0 || to >= order.length) return;
    [order[from], order[to]] = [order[to]!, order[from]!];
    apply({ order });
  };

  const toggle = (id: SectionId) =>
    apply({
      hidden: state.hidden.includes(id)
        ? state.hidden.filter((hiddenId) => hiddenId !== id)
        : [...state.hidden, id],
    });

  const visible = state.order.filter((id) => !state.hidden.includes(id));

  return (
    <MotionConfig reducedMotion="user" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}>
      <div
        ref={demoRef}
        className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-6"
      >
        <div className="flex flex-col rounded-3xl border border-white bg-white/90 p-2 shadow-glass">
          <div className="flex items-center justify-between gap-2 px-3 pt-2 pb-2">
            <p className="text-sm font-bold text-slate-900">Homepage sections</p>
            <AutoplayButton demo={demo} />
          </div>
          <LayoutGroup id="homepage-rows">
            <ol className="space-y-1">
              {state.order.map((id, index) => {
                const isHidden = state.hidden.includes(id);
                return (
                  <motion.li
                    key={id}
                    layout
                    className={cn(
                      "flex items-center gap-1 rounded-2xl py-1 pr-1 pl-1.5 transition-[background-color,box-shadow] duration-500",
                      focus === id
                        ? "bg-brand-light/70 shadow-[inset_0_0_0_1.5px_rgba(8,192,216,0.45)]"
                        : "bg-slate-50/80",
                    )}
                  >
                    <RowButton
                      label={`${isHidden ? "Show" : "Hide"} ${LABELS[id]}`}
                      onClick={() => toggle(id)}
                    >
                      <Icon name={isHidden ? "visibility_off" : "visibility"} />
                    </RowButton>
                    <span
                      className={cn(
                        "min-w-0 flex-1 truncate text-sm font-semibold transition-colors",
                        isHidden ? "text-slate-400 line-through" : "text-slate-800",
                      )}
                    >
                      {LABELS[id]}
                    </span>
                    <RowButton
                      label={`Move ${LABELS[id]} up`}
                      disabled={index === 0}
                      onClick={() => move(id, -1)}
                    >
                      <Icon name="arrow_upward" />
                    </RowButton>
                    <RowButton
                      label={`Move ${LABELS[id]} down`}
                      disabled={index === state.order.length - 1}
                      onClick={() => move(id, 1)}
                    >
                      <Icon name="arrow_downward" />
                    </RowButton>
                  </motion.li>
                );
              })}
            </ol>
          </LayoutGroup>
          <div className="mt-auto flex flex-wrap items-center gap-2 border-t border-slate-100 px-3 pt-3 pb-2">
            <span className="text-xs font-semibold text-slate-500">Hero text:</span>
            {HERO_COPY.map((copy, index) => (
              <button
                key={copy}
                type="button"
                aria-pressed={state.hero === index}
                onClick={() => apply({ hero: index as 0 | 1 })}
                className={cn(
                  "cursor-pointer rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                  state.hero === index
                    ? "border-brand/40 bg-brand-light text-brand-dark"
                    : "border-slate-200 bg-white text-slate-600 hover:text-slate-900",
                )}
              >
                {copy}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white bg-white shadow-[0_32px_64px_-24px_rgba(2,132,199,0.28)]">
          <ScaledMock className="h-[26rem] sm:h-[28rem]" scale={1.9}>
            <LayoutGroup id="homepage-preview">
              <div className="flex flex-col gap-[0.9em] p-[1.2em] text-slate-900">
                <AnimatePresence mode="popLayout" initial={false}>
                  {visible.map((id) => (
                    <motion.div
                      key={id}
                      layout
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                    >
                      <SectionPreview id={id} hero={state.hero} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </LayoutGroup>
          </ScaledMock>
        </div>
      </div>
    </MotionConfig>
  );
}
