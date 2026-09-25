"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

import type { ExplorerItem } from "./areas";
import { useExplorerRequest } from "./explorer-store";
import { FeatureRow, StatusBadge } from "./feature-row";
import { normalizeSearchText } from "./search-text";

const SUGGESTIONS = [
  "bKash",
  "Courier",
  "Invoice",
  "Coupon",
  "Bangla",
  "SMS",
  "SEO",
  "Staff",
  "Wholesale",
];

type AreaOption = { id: string; label: string; icon: IconName };

/**
 * Search and browse every feature. The list stays hidden until the visitor searches, picks a
 * suggestion or chooses an area, so the page leads with the demos. Words match from the start
 * (e.g. "ship" finds "shipment", "ai" doesn't match "email").
 */
export function FeatureExplorer({
  items,
  areas,
  lastUpdated,
}: {
  items: ReadonlyArray<ExplorerItem>;
  areas: ReadonlyArray<AreaOption>;
  /** ISO date and its display text. */
  lastUpdated: { iso: string; text: string };
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [area, setArea] = useState<string | null>(null);

  // Links elsewhere on the page ask to open a given area (see explorer-store.ts).
  const request = useExplorerRequest();
  const [handledRequestId, setHandledRequestId] = useState(request.id);
  if (request.id !== handledRequestId) {
    setHandledRequestId(request.id);
    if (request.area) {
      setArea(request.area);
      setQuery("");
    }
  }

  useEffect(() => {
    // Only with a mouse/trackpad: on phones focusing would pop the keyboard mid-scroll.
    if (request.focusSearch && window.matchMedia("(pointer: fine)").matches) {
      inputRef.current?.focus({ preventScroll: true });
    }
  }, [request]);

  const terms = normalizeSearchText(query).split(" ").filter(Boolean);
  const isOpen = terms.length > 0 || area !== null;
  const results = items.filter(
    (item) =>
      (area === null || area === "all" || item.areaId === area) &&
      terms.every((term) => item.searchText.includes(` ${term}`)),
  );

  const groups: Array<{ title: string; items: ExplorerItem[] }> = [];
  for (const item of results) {
    const group = groups.at(-1);
    if (group?.title === item.categoryTitle) group.items.push(item);
    else groups.push({ title: item.categoryTitle, items: [item] });
  }

  const reset = () => {
    setQuery("");
    setArea(null);
  };

  return (
    <section
      id="all-features"
      aria-labelledby="all-features-heading"
      className="relative scroll-mt-24 px-6 py-16 sm:py-24 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-4xl">
        <div className="reveal text-center">
          <span className="liquid-pill inline-flex items-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            All features
          </span>
          <h2
            id="all-features-heading"
            className="mt-5 text-3xl leading-tight font-extrabold tracking-tight text-balance text-slate-900 sm:text-4xl"
          >
            Looking for something specific?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Search every UrShop feature, including the smaller ones, or browse by area.
          </p>
        </div>

        <form role="search" className="mt-10" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor={inputId} className="sr-only">
            Search features
          </label>
          <div className="liquid-glass flex h-14 items-center gap-3 rounded-full pr-2 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-brand/40 sm:h-16">
            <Icon name="search" className="text-slate-400" />
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") reset();
              }}
              placeholder="Try “bKash”, “invoice” or “courier”"
              autoComplete="off"
              spellCheck={false}
              className="h-full min-w-0 flex-1 bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 [&::-webkit-search-cancel-button]:appearance-none"
            />
            {query ? (
              <button
                type="button"
                aria-label="Clear search"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex size-10 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-white hover:text-slate-900"
              >
                <Icon name="close" />
              </button>
            ) : null}
          </div>
        </form>

        <div
          role="group"
          aria-label="Browse by area"
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {[{ id: "all", label: "All features", icon: "apps" as IconName }, ...areas].map(
            (option) => {
              const isActive = area === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setArea(isActive ? null : option.id)}
                  className={cn(
                    "inline-flex cursor-pointer items-center gap-2 rounded-full border py-1.5 pr-4 pl-2.5 text-sm font-bold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                    isActive
                      ? "border-transparent bg-slate-900 text-white"
                      : "border-slate-200 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-900",
                  )}
                >
                  <Icon name={option.icon} className={isActive ? "text-brand" : "text-slate-400"} />
                  {option.label}
                </button>
              );
            },
          )}
        </div>

        {isOpen ? (
          <div className="features-results mt-8 rounded-3xl border border-white bg-white/85 p-5 shadow-glass sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p aria-live="polite" className="text-sm font-bold text-slate-800">
                {results.length} {results.length === 1 ? "feature" : "features"}
                {query.trim() ? (
                  <span className="font-normal text-slate-500"> for “{query.trim()}”</span>
                ) : null}
              </p>
              <button
                type="button"
                onClick={reset}
                className="cursor-pointer text-sm font-bold text-brand-dark underline-offset-4 hover:underline"
              >
                Hide list
              </button>
            </div>

            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-slate-200/70 pb-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <StatusBadge status="gated" /> switched on per store by the UrShop team
              </span>
              <span className="flex items-center gap-1.5">
                <StatusBadge status="coming-soon" /> not available yet
              </span>
              <span>
                Everything else is included for every store. Updated{" "}
                <time dateTime={lastUpdated.iso}>{lastUpdated.text}</time>.
              </span>
            </p>

            {groups.length > 0 ? (
              <div className="mt-2 space-y-6">
                {groups.map((group) => (
                  <section key={group.title} aria-label={group.title} className="pt-4">
                    <h3 className="text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
                      {group.title}
                    </h3>
                    <ul className="mt-1 divide-y divide-slate-200/70">
                      {group.items.map((item) => (
                        <FeatureRow key={item.id} item={item} />
                      ))}
                    </ul>
                  </section>
                ))}
              </div>
            ) : (
              <div className="py-10 text-center">
                <p className="font-bold text-slate-800">No features match “{query.trim()}”.</p>
                <p className="mt-2 text-sm text-slate-500">
                  Try a shorter word, or{" "}
                  <a
                    href={`mailto:${siteConfig.supportEmail}`}
                    className="font-semibold text-brand-dark underline underline-offset-4"
                  >
                    ask our team
                  </a>
                  .
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-8 text-center">
            <p className="text-xs font-bold tracking-[0.16em] text-slate-400 uppercase">
              Popular searches
            </p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="glass-btn cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold text-slate-600 transition-all hover:text-slate-900"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
