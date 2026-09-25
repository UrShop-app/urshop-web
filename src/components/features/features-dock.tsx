"use client";

import { useEffect, useState } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { SearchLink } from "./search-link";

const EXPLORER_ID = "all-features";

/**
 * Floating bottom navigation between the feature areas. Appears once the hero has scrolled away,
 * hides again over the footer, and highlights the area in the middle of the viewport.
 * Expects `#features-hero`, one section per area id, `#all-features` and `#site-footer`.
 */
export function FeaturesDock({
  areas,
}: {
  areas: ReadonlyArray<{ id: string; label: string; icon: IconName }>;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const sectionIds = [...areas.map((area) => area.id), EXPLORER_ID].join(" ");

  useEffect(() => {
    const hero = document.getElementById("features-hero");
    const footer = document.getElementById("site-footer");
    const sections = sectionIds
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry) setIsPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const footerObserver = new IntersectionObserver(([entry]) =>
      setIsOverFooter(entry?.isIntersecting ?? false),
    );
    // A section is "current" while it crosses the middle band of the viewport.
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    if (hero) heroObserver.observe(hero);
    if (footer) footerObserver.observe(footer);
    sections.forEach((section) => sectionObserver.observe(section));
    return () => {
      heroObserver.disconnect();
      footerObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [sectionIds]);

  const isVisible = isPastHero && !isOverFooter;
  const itemClass = (isActive: boolean) =>
    cn(
      "flex h-11 min-w-11 items-center justify-center gap-2 rounded-full px-3 text-sm font-bold whitespace-nowrap transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
      isActive ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-white hover:text-slate-900",
    );

  return (
    <nav
      aria-label="Feature areas"
      inert={!isVisible}
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-4 z-40 flex justify-center px-3 transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] print:hidden",
        !isVisible && "translate-y-[150%] opacity-0",
      )}
    >
      <ul className="liquid-glass pointer-events-auto flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1.5">
        {areas.map((area) => {
          const isActive = activeId === area.id;
          return (
            <li key={area.id}>
              <a
                href={`#${area.id}`}
                aria-current={isActive ? "location" : undefined}
                className={itemClass(isActive)}
              >
                <Icon name={area.icon} className={isActive ? "text-brand" : undefined} />
                <span className="sr-only md:not-sr-only">{area.label}</span>
              </a>
            </li>
          );
        })}
        <li aria-hidden="true" className="mx-1 h-6 w-px bg-slate-200" />
        <li>
          <SearchLink className={itemClass(activeId === EXPLORER_ID)}>
            <Icon name="search" className={activeId === EXPLORER_ID ? "text-brand" : undefined} />
            <span className="sr-only md:not-sr-only">Search</span>
          </SearchLink>
        </li>
      </ul>
    </nav>
  );
}
