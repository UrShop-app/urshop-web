"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type PointerEvent,
  type ReactNode,
} from "react";

import { Icon } from "@/components/ui/icon";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { cn } from "@/lib/utils";

import type { ShowcaseItem } from "./areas";
import { requestExplorer } from "./explorer-store";

/** How long each demo plays before the next one starts (while autoplaying). */
const DEMO_SECONDS = 7;

/** A pointer must rest on a tab this long before it opens, so sweeping across tabs doesn't. */
const HOVER_INTENT_MS = 140;

const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/**
 * One feature area: a short intro, a tab per headline feature, and the selected feature's demo
 * scene. Tabs open on hover (mouse) or click.
 *
 * Autoplay: while the section is on screen the demos loop 1 → 2 → 3 → 1… The active tab's progress
 * bar is the timer (its `animationend` opens the next tab), so pausing it pauses autoplay:
 * - hovering the tabs or the demo, or keyboard focus inside them, pauses; leaving resumes;
 * - clicking or keyboard-selecting a tab stops it (the visitor took over); "Play demos" restarts;
 * - under reduced motion it never runs and the control is hidden.
 */
export function FeatureShowcase({
  areaId,
  eyebrow,
  title,
  intro,
  items,
  scenes,
  visualSide,
}: {
  areaId: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: ReadonlyArray<ShowcaseItem>;
  /** Demo scene per item id. */
  scenes: Readonly<Record<string, ReactNode>>;
  visualSide: "start" | "end";
}) {
  const idPrefix = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplayOn, setIsAutoplayOn] = useState(true);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [hasKeyboardFocus, setHasKeyboardFocus] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const hoverIntent = useRef<{ index: number; timer: number } | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry?.isIntersecting ?? false),
      { threshold: 0.25 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const cancelHoverIntent = () => {
    if (!hoverIntent.current) return;
    window.clearTimeout(hoverIntent.current.timer);
    hoverIntent.current = null;
  };

  useEffect(() => cancelHoverIntent, []);

  const showTimer = isAutoplayOn && !reducedMotion;
  const timerRunning = showTimer && isInView && !isPointerInside && !hasKeyboardFocus;
  const active = items[activeIndex];
  const tabId = (index: number) => `${idPrefix}-tab-${index}`;
  const panelId = `${idPrefix}-panel`;

  const selectTab = (index: number, moveFocus: boolean) => {
    cancelHoverIntent();
    setActiveIndex(index);
    setIsAutoplayOn(false);
    if (moveFocus) tabRefs.current[index]?.focus();
  };

  const onTabPointerMove = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (event.pointerType !== "mouse") return;
    // Tabs expanding can slide another tab under a still pointer; only real movement counts.
    if (event.movementX === 0 && event.movementY === 0) return;
    if (index === activeIndex) {
      cancelHoverIntent();
      return;
    }
    if (hoverIntent.current?.index === index) return;
    cancelHoverIntent();
    hoverIntent.current = {
      index,
      timer: window.setTimeout(() => {
        hoverIntent.current = null;
        setActiveIndex(index);
      }, HOVER_INTENT_MS),
    };
  };

  // Hover and keyboard focus pause autoplay only over the tabs and the demo, not the controls,
  // so pressing "Play demos" starts playback straight away.
  const pauseZone = {
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType === "mouse") setIsPointerInside(true);
    },
    onPointerLeave: () => {
      setIsPointerInside(false);
      cancelHoverIntent();
    },
    onFocus: (event: FocusEvent) => {
      if (event.target.matches(":focus-visible")) setHasKeyboardFocus(true);
    },
    onBlur: (event: FocusEvent) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setHasKeyboardFocus(false);
    },
  };

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = items.length - 1;
    const next: Record<string, number> = {
      ArrowDown: index === last ? 0 : index + 1,
      ArrowRight: index === last ? 0 : index + 1,
      ArrowUp: index === 0 ? last : index - 1,
      ArrowLeft: index === 0 ? last : index - 1,
      Home: 0,
      End: last,
    };
    const target = next[event.key];
    if (target === undefined) return;
    event.preventDefault();
    selectTab(target, true);
  };

  return (
    <section
      ref={sectionRef}
      id={areaId}
      aria-labelledby={`${idPrefix}-heading`}
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-8">
        <header
          className={cn(
            "reveal max-w-xl lg:row-start-1",
            visualSide === "start" ? "lg:col-start-2" : "lg:col-start-1",
          )}
        >
          <span className="liquid-pill inline-flex items-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            {eyebrow}
          </span>
          <h2
            id={`${idPrefix}-heading`}
            className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{intro}</p>
        </header>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={tabId(activeIndex)}
          className={cn(
            "reveal reveal-delay-1 lg:row-span-2 lg:row-start-1 lg:self-center",
            visualSide === "start" ? "lg:col-start-1" : "lg:col-start-2",
          )}
          {...pauseZone}
        >
          <p className="sr-only">{active?.blurb}</p>
          {/* Keyed so the scene remounts, and its CSS animations replay, on every switch. */}
          <div key={active?.id}>{active ? scenes[active.id] : null}</div>
        </div>

        <div
          className={cn(
            "lg:row-start-2",
            visualSide === "start" ? "lg:col-start-2" : "lg:col-start-1",
          )}
        >
          <div
            role="tablist"
            aria-label={`${title}: features`}
            aria-orientation="vertical"
            className="space-y-2"
            {...pauseZone}
          >
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={tabId(index)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(index, false)}
                  onKeyDown={(event) => onTabKeyDown(event, index)}
                  onPointerMove={(event) => onTabPointerMove(event, index)}
                  onPointerLeave={cancelHoverIntent}
                  className={cn(
                    "relative flex w-full cursor-pointer items-start gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-[background-color,border-color,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                    isActive
                      ? "border-white bg-white shadow-[0_12px_32px_-12px_rgba(2,132,199,0.25)]"
                      : "border-transparent hover:bg-white/70",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300",
                      isActive ? "text-white" : "bg-slate-100 text-slate-500",
                    )}
                    style={isActive ? { background: BRAND_GRADIENT } : undefined}
                  >
                    {item.icon ? <Icon name={item.icon} /> : null}
                  </span>
                  <span className="min-w-0 flex-1 pt-2">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span
                        className={cn("font-bold", isActive ? "text-slate-900" : "text-slate-600")}
                      >
                        {item.name}
                      </span>
                      {item.tag ? (
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[11px] font-semibold transition-colors",
                            isActive
                              ? "bg-brand-light text-brand-dark"
                              : "bg-slate-100 text-slate-500",
                          )}
                        >
                          {item.tag}
                        </span>
                      ) : null}
                    </span>
                    {/* Visible summary; screen readers get it from the tab panel instead. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-1.5 text-sm leading-relaxed text-slate-600">
                          {item.blurb}
                        </span>
                      </span>
                    </span>
                  </span>
                  {isActive && showTimer ? (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[3px] bg-brand/10"
                    >
                      <span
                        key={activeIndex}
                        className="showcase-progress block h-full"
                        style={
                          {
                            "--showcase-duration": `${DEMO_SECONDS}s`,
                            background: BRAND_GRADIENT,
                            animationPlayState: timerRunning ? "running" : "paused",
                          } as CSSProperties
                        }
                        onAnimationEnd={() => setActiveIndex((index + 1) % items.length)}
                      />
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 px-1">
            {reducedMotion ? null : (
              <button
                type="button"
                onClick={() => setIsAutoplayOn((isOn) => !isOn)}
                className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-full border border-slate-200 bg-white/70 pr-3.5 pl-2 text-xs font-bold text-slate-600 transition-colors hover:border-slate-300 hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <Icon name={isAutoplayOn ? "pause" : "play_arrow"} className="text-brand" />
                {isAutoplayOn ? "Pause demos" : "Play demos"}
              </button>
            )}
            <a
              href="#all-features"
              onClick={() => requestExplorer(areaId, false)}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Browse every feature in this area
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
