"use client";

import { MotionConfig, motion } from "motion/react";
import { useId, useState, type MouseEvent } from "react";

import { Icon } from "@/components/ui/icon";
import type { PartnershipPath } from "@/data/partners";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, CardLabel, Flow, PillLink, at, partnershipContactHref } from "./kit";

function BringsList({
  items,
  tone,
  delay,
}: {
  items: ReadonlyArray<string>;
  tone: "partner" | "urshop";
  delay: number;
}) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((item, index) => (
        <li
          key={item}
          className="demo-in flex items-center gap-2 text-sm font-semibold text-slate-700"
          style={at(delay + index * 0.1)}
        >
          <Icon
            name="check_circle"
            className={cn(
              "-my-1 shrink-0 scale-75",
              tone === "urshop" ? "text-brand" : "text-slate-400",
            )}
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

/** One path's business model: what each side brings and what it creates. Replays on change. */
function ModelDiagram({ path }: { path: PartnershipPath }) {
  return (
    <div className="grid items-stretch md:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)_2rem_minmax(0,1fr)]">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-4 sm:p-5">
        <CardLabel>You bring</CardLabel>
        <BringsList items={path.partnerBrings} tone="partner" delay={0.1} />
      </div>

      <Flow axis="y" className="mx-auto h-6 w-4 md:hidden" delay={0.4} />
      <Flow className="hidden h-4 w-full self-center md:block" delay={0.4} />

      <div className="rounded-2xl border border-brand/25 bg-brand-light/50 p-4 sm:p-5">
        <CardLabel className="text-brand-dark">UrShop brings</CardLabel>
        <BringsList items={path.urshopBrings} tone="urshop" delay={0.4} />
      </div>

      <Flow axis="y" className="mx-auto h-6 w-4 md:hidden" delay={0.9} />
      <Flow className="hidden h-4 w-full self-center md:block" delay={0.9} />

      <div
        className="demo-pop flex flex-col items-center justify-center gap-2 rounded-2xl p-5 text-center text-white shadow-[0_18px_36px_-16px_rgba(2,132,199,0.55)]"
        style={{ ...at(0.9), background: BRAND_GRADIENT }}
      >
        <span className="grid size-10 place-items-center rounded-full bg-white/20">
          <Icon name="handshake" />
        </span>
        <span className="text-[11px] font-bold tracking-[0.16em] text-white/80 uppercase">
          Together
        </span>
        <span className="text-lg leading-snug font-extrabold">{path.outcome}</span>
      </div>
    </div>
  );
}

/** Path picker (left) and the business model of the picked path (right). */
export function PathExplorer({ paths }: { paths: ReadonlyArray<PartnershipPath> }) {
  const idPrefix = useId();
  const [activeId, setActiveId] = useState(paths[0]?.id);
  const path = paths.find((item) => item.id === activeId) ?? paths[0];
  if (!path) return null;

  const select = (id: PartnershipPath["id"], event: MouseEvent<HTMLButtonElement>) => {
    setActiveId(id);
    // On phones the picker scrolls sideways; bring the picked option into view.
    event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-8">
      <MotionConfig reducedMotion="user">
        {/* Vertical padding keeps the glass shadows from being clipped where the row scrolls. */}
        <div
          role="group"
          aria-label="Ways to partner"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 py-2 lg:mx-0 lg:flex-col lg:justify-between lg:overflow-visible lg:p-0"
        >
          {paths.map((item) => {
            const isActive = item.id === path.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                aria-controls={`${idPrefix}-panel`}
                onClick={(event) => select(item.id, event)}
                className={cn(
                  "group relative flex shrink-0 cursor-pointer items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark lg:flex-1 lg:px-4",
                  isActive
                    ? "border-transparent text-white"
                    : "border-white/90 bg-white/60 text-slate-700 hover:bg-white/90 hover:text-slate-900",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId={`${idPrefix}-active`}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-2xl border border-white/30 shadow-[0_12px_28px_-10px_rgba(8,192,216,0.55)]"
                    style={{ background: BRAND_GRADIENT }}
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                ) : null}
                <span
                  className={cn(
                    "relative grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-300",
                    isActive ? "bg-white/20 text-white" : "bg-brand-light text-brand-dark",
                  )}
                >
                  <Icon name={item.icon} className="scale-90" />
                </span>
                <span className="relative text-sm font-bold whitespace-nowrap lg:text-base">
                  {item.action}
                </span>
                <Icon
                  name="arrow_forward"
                  className={cn(
                    "relative ml-auto hidden scale-75 transition-[opacity,translate] duration-300 lg:block",
                    isActive ? "opacity-100" : "-translate-x-1 opacity-0 group-hover:opacity-60",
                  )}
                />
              </button>
            );
          })}
        </div>
      </MotionConfig>

      <div
        id={`${idPrefix}-panel`}
        aria-live="polite"
        className="liquid-glass-card rounded-3xl p-5 sm:p-7"
        style={{ borderRadius: "28px" }}
      >
        <div key={path.id} className="flex h-full flex-col">
          <div className="demo-in" style={at(0)}>
            <CardLabel className="text-brand-dark">{path.partnerType}</CardLabel>
            <h3 className="mt-2 text-xl leading-snug font-extrabold tracking-tight text-balance text-slate-900 sm:text-2xl">
              {path.headline}
            </h3>
          </div>

          <div className="mt-6 flex-1">
            <ModelDiagram path={path} />
          </div>

          <div
            className="demo-in mt-6 flex flex-col gap-4 border-t border-slate-200/80 pt-5 sm:flex-row sm:items-center sm:justify-between"
            style={at(0.3)}
          >
            <p className="flex items-center gap-2 text-sm text-slate-500">
              <Icon name="info" className="shrink-0 scale-75 text-brand" />
              {path.terms}
            </p>
            <div className="flex shrink-0 items-center gap-4">
              <a
                href={`#${path.sectionId}`}
                className="text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                How it works
              </a>
              <PillLink href={partnershipContactHref(path.contactSubject)}>
                Let&apos;s talk
              </PillLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
