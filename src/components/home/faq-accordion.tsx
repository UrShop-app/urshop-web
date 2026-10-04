"use client";

import { MotionConfig, motion } from "motion/react";
import Link from "next/link";
import { useId, useState, type MouseEvent } from "react";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export type HomeFaqTab = { id: string; label: string };

export type HomeFaqItem = {
  id: string;
  /** Tab ids the question appears under; the first tab shows the common questions. */
  tabs: ReadonlyArray<string>;
  question: string;
  answer: ReadonlyArray<string>;
};

const BRAND_GRADIENT = "linear-gradient(135deg, rgb(2, 132, 199) 0%, rgb(8, 192, 216) 100%)";

function firstFaqIn(faqs: ReadonlyArray<HomeFaqItem>, tab: string) {
  return faqs.find((faq) => faq.tabs.includes(tab))?.id ?? null;
}

/** Round +/- button: the vertical bar turns flat to make the minus, and the brand fill fades in. */
function FaqToggle({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative flex size-9 shrink-0 items-center justify-center rounded-full border transition-[border-color,box-shadow,color] duration-300",
        open
          ? "border-transparent text-white shadow-[0_8px_18px_-6px_rgba(8,192,216,0.6)]"
          : "border-slate-200 bg-white text-brand group-hover:border-brand/40",
      )}
    >
      <span
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        style={{ background: BRAND_GRADIENT }}
      />
      <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
      <span
        className={cn(
          "absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open && "rotate-90",
        )}
      />
    </span>
  );
}

/** Category tabs with a sliding pill, and a one-open-at-a-time accordion. */
export function FaqAccordion({
  tabs,
  faqs,
}: {
  tabs: ReadonlyArray<HomeFaqTab>;
  faqs: ReadonlyArray<HomeFaqItem>;
}) {
  const idPrefix = useId();
  const firstTab = tabs[0]?.id ?? "";
  const [activeCategory, setActiveCategory] = useState(firstTab);
  const [openId, setOpenId] = useState<string | null>(firstFaqIn(faqs, firstTab));
  // The rise-in stagger plays only after the visitor switches category, not on page load.
  const [animateList, setAnimateList] = useState(false);

  const visibleFaqs = faqs.filter((faq) => faq.tabs.includes(activeCategory));

  const selectCategory = (category: string, event: MouseEvent<HTMLButtonElement>) => {
    if (category === activeCategory) return;
    setActiveCategory(category);
    setOpenId(firstFaqIn(faqs, category));
    setAnimateList(true);
    // On phones the tab row scrolls sideways; bring the picked tab into view.
    event.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  };

  return (
    <section className="relative px-6 py-24 lg:px-12" id="faqs">
      <div className="mx-auto max-w-4xl">
        <div className="reveal mb-16 text-center">
          <span className="liquid-pill mb-1 inline-flex items-center justify-center rounded-full px-6 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="mt-2 mb-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="text-base text-slate-600">
            Simple answers to get your business running immediately.
          </p>
        </div>

        {/* Vertical padding (offset by the negative top margin) keeps the scroll box from clipping
            the glass shadow into a hard edge; the row only needs to scroll below `md`. */}
        <div className="reveal -mt-6 mb-4 flex justify-center overflow-x-auto px-4 py-6 md:overflow-visible">
          <MotionConfig reducedMotion="user">
            <div
              className="liquid-glass inline-flex max-w-full items-center gap-1.5 rounded-full p-1.5"
              id="faq-tab-container"
            >
              {tabs.map((category) => {
                const active = category.id === activeCategory;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={active}
                    className={cn(
                      "faq-tab-btn relative cursor-pointer rounded-full px-7 py-2.5 text-sm font-semibold transition-colors duration-300",
                      active ? "text-white" : "text-slate-600 hover:text-slate-900",
                    )}
                    onClick={(event) => selectCategory(category.id, event)}
                  >
                    {active && (
                      <motion.span
                        layoutId={`${idPrefix}-faq-tab`}
                        className="absolute inset-0 border border-white/30"
                        style={{
                          borderRadius: 9999,
                          background: BRAND_GRADIENT,
                          boxShadow:
                            "rgba(8, 192, 216, 0.35) 0px 4px 14px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset",
                        }}
                        transition={{ type: "spring", bounce: 0.18, duration: 0.55 }}
                      />
                    )}
                    <span className="relative">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </MotionConfig>
        </div>

        <div
          className="liquid-glass-card reveal reveal-delay-1 rounded-3xl p-2 sm:p-3"
          style={{ borderRadius: "28px" }}
        >
          <ul key={activeCategory} className="space-y-1">
            {visibleFaqs.map((faq, index) => {
              const open = faq.id === openId;
              const questionId = `${idPrefix}-q-${faq.id}`;
              const answerId = `${idPrefix}-a-${faq.id}`;
              return (
                <li
                  key={faq.id}
                  className={cn(
                    "rounded-2xl border transition-[background-color,border-color,box-shadow] duration-300",
                    open
                      ? "border-white bg-white/90 shadow-[0_12px_32px_-14px_rgba(2,132,199,0.22)]"
                      : "border-transparent hover:bg-white/55",
                    animateList && "faq-enter",
                  )}
                  style={animateList ? { animationDelay: `${index * 60}ms` } : undefined}
                >
                  <h3>
                    <button
                      type="button"
                      id={questionId}
                      aria-expanded={open}
                      aria-controls={answerId}
                      className="group flex w-full cursor-pointer items-center gap-3 px-4 py-5 text-left sm:gap-5 sm:px-6"
                      onClick={() => setOpenId(open ? null : faq.id)}
                    >
                      <span
                        className={cn(
                          "hidden w-6 shrink-0 text-sm font-bold tabular-nums transition-colors duration-300 sm:block",
                          open ? "text-brand" : "text-slate-300",
                        )}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "flex-1 text-base font-semibold transition-colors duration-300 sm:text-lg",
                          open ? "text-slate-900" : "text-slate-800 group-hover:text-brand",
                        )}
                      >
                        {faq.question}
                      </span>
                      <FaqToggle open={open} />
                    </button>
                  </h3>
                  {/* 0fr -> 1fr animates to the content's real height in both directions. */}
                  <div
                    id={answerId}
                    role="region"
                    aria-labelledby={questionId}
                    inert={!open}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div
                        className={cn(
                          "space-y-3 px-4 pb-6 text-sm leading-relaxed font-normal text-slate-600 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none sm:pr-16 sm:pl-[4.25rem] sm:text-base",
                          open ? "translate-y-0" : "-translate-y-2",
                        )}
                      >
                        {faq.answer.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="reveal mt-10 flex justify-center">
          <div className="liquid-pill inline-flex items-center gap-3 rounded-full py-1.5 pr-1.5 pl-4 text-sm text-slate-600">
            <Icon name="contact_support" className="text-brand" />
            <span>Have more questions?</span>
            <Link
              className="rounded-full px-4 py-2 text-sm font-semibold text-white shadow-[0_6px_16px_-6px_rgba(8,192,216,0.6)] transition-transform duration-300 hover:-translate-y-px active:scale-95"
              href="/faq"
              style={{ background: BRAND_GRADIENT }}
            >
              See all FAQs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
