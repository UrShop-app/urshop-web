"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** One entry: the fragment id of a section and its heading. */
export type TocEntry = { id: string; title: string };

/** A section counts as current once its top passes this far below the viewport top (header). */
const ACTIVE_OFFSET = 160;

/** The id of the last section whose top has scrolled past the header, tracked while scrolling. */
function useActiveSection(entries: ReadonlyArray<TocEntry>) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const targets = entries.flatMap((entry) => {
      const element = document.getElementById(entry.id);
      return element ? [{ id: entry.id, element }] : [];
    });
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const target of targets) {
        if (target.element.getBoundingClientRect().top - ACTIVE_OFFSET <= 0) current = target.id;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [entries]);

  return activeId;
}

/**
 * "On this page" index for long documents (legal pages, blog articles). Collapsible on small
 * screens (native <details>), always open and sticky on desktop, where it marks the section being
 * read. The links are server-rendered and work without JavaScript.
 */
export function TableOfContents({ entries }: { entries: ReadonlyArray<TocEntry> }) {
  const activeId = useActiveSection(entries);

  const links = (
    <ol className="space-y-1 border-l border-slate-200">
      {entries.map((entry) => {
        const isActive = entry.id === activeId;
        return (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors hover:border-brand-dark hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                isActive
                  ? "border-brand font-semibold text-slate-900"
                  : "border-transparent text-slate-600",
              )}
            >
              {entry.title}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      <details className="group rounded-2xl border border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
          On this page
          <svg
            className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <nav aria-label="On this page" className="px-5 pb-5">
          {links}
        </nav>
      </details>

      <nav
        aria-label="On this page"
        className="sticky top-36 hidden max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain lg:block"
      >
        <p className="mb-3 text-xs font-bold tracking-[0.18em] text-slate-500 uppercase">
          On this page
        </p>
        {links}
      </nav>
    </>
  );
}
