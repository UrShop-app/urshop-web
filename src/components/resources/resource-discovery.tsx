"use client";

import Link from "next/link";
import {
  createContext,
  Fragment,
  use,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { Icon, type IconName } from "@/components/ui/icon";
import { normalizeSearchText } from "@/lib/search-text";
import { cn } from "@/lib/utils";

/** One resource as the search and filters see it (plain data from the server). */
export type ResourceEntry = {
  id: string;
  goal: string;
  type: string;
  title: string;
  href: string;
  /** e.g. "Overview · Design". */
  label: string;
  /** Normalised searchable text with a leading space (see lib/search-text.ts). */
  text: string;
};

/** An FAQ question the hero search can suggest. */
export type AnswerEntry = {
  id: string;
  question: string;
  href: string;
  text: string;
};

export type FilterOption = { id: string; label: string; icon?: IconName; count: number };

type DiscoveryState = {
  query: string;
  setQuery: (query: string) => void;
  terms: ReadonlyArray<string>;
  goal: string | null;
  setGoal: (goal: string | null) => void;
  type: string | null;
  setType: (type: string | null) => void;
  /** Resources passing every filter, or null when nothing is filtered (everything shows). */
  visibleIds: ReadonlySet<string> | null;
  /** Resources matching the search alone, in library order. */
  searchMatches: ReadonlyArray<ResourceEntry>;
  answerMatches: ReadonlyArray<AnswerEntry>;
  total: number;
};

const DiscoveryContext = createContext<DiscoveryState | null>(null);

function useDiscovery() {
  const state = use(DiscoveryContext);
  if (!state) throw new Error("Resource components must be inside <ResourceDiscoveryProvider>.");
  return state;
}

/** Words match from their start ("cour" finds "courier"), as on the Features and FAQ pages. */
function matches(text: string, terms: ReadonlyArray<string>) {
  return terms.every((term) => text.includes(` ${term}`));
}

/**
 * Search and filter state for the Resources page. The library is server-rendered children; this
 * only decides what is hidden, so every resource stays in the HTML and works without JavaScript.
 */
export function ResourceDiscoveryProvider({
  entries,
  answers,
  children,
}: {
  entries: ReadonlyArray<ResourceEntry>;
  answers: ReadonlyArray<AnswerEntry>;
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [goal, setGoal] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  const normalizedQuery = normalizeSearchText(query);

  const value = useMemo<DiscoveryState>(() => {
    const terms = normalizedQuery.split(" ").filter(Boolean);
    const searchMatches = terms.length ? entries.filter((entry) => matches(entry.text, terms)) : [];
    const filtered = terms.length || goal || type;
    const visible = filtered
      ? (terms.length ? searchMatches : entries).filter(
          (entry) => (!goal || entry.goal === goal) && (!type || entry.type === type),
        )
      : null;
    return {
      query,
      setQuery,
      terms,
      goal,
      setGoal,
      type,
      setType,
      visibleIds: visible && new Set(visible.map((entry) => entry.id)),
      searchMatches,
      answerMatches: terms.length ? answers.filter((answer) => matches(answer.text, terms)) : [],
      total: entries.length,
    };
  }, [entries, answers, normalizedQuery, query, goal, type]);

  return <DiscoveryContext value={value}>{children}</DiscoveryContext>;
}

/** Marks the start of each word the search matched, so visitors see why a result is there. */
export function Highlight({ text }: { text: string }) {
  const { terms } = useDiscovery();
  if (terms.length === 0) return text;
  return text.split(/(\s+)/).map((token, index) => {
    const lead = /^[^\p{L}\p{N}]*/u.exec(token)?.[0].length ?? 0;
    const word = token.slice(lead).toLowerCase();
    const term = terms
      .filter((candidate) => word.startsWith(candidate))
      .reduce(
        (longest, candidate) => (candidate.length > longest.length ? candidate : longest),
        "",
      );
    if (!term) return <Fragment key={index}>{token}</Fragment>;
    return (
      <Fragment key={index}>
        {token.slice(0, lead)}
        <mark className="resource-mark">{token.slice(lead, lead + term.length)}</mark>
        {token.slice(lead + term.length)}
      </Fragment>
    );
  });
}

const SUGGESTED_TOPICS = ["bKash", "Courier", "Theme", "SEO"];
const MAX_RESOURCE_SUGGESTIONS = 5;
const MAX_ANSWER_SUGGESTIONS = 4;

const suggestionClass =
  "group flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-brand-light/50 focus-visible:bg-brand-light/50 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-dark";

/**
 * Hero search: filters the library below and suggests matching resources and FAQ answers in a
 * panel under the field. Not a chatbot; it only matches words in what's on this site.
 */
export function ResourceSearchField({ className }: { className?: string }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { query, setQuery, terms, searchMatches, answerMatches, setGoal, setType } = useDiscovery();
  const hasQuery = terms.length > 0;
  const showPanel = isOpen && hasQuery;
  const resultCount = searchMatches.length + answerMatches.length;

  const search = (value: string) => {
    setQuery(value);
    // A new search looks across the whole library.
    setGoal(null);
    setType(null);
  };

  return (
    <div
      className={cn("relative", className)}
      onFocus={() => setIsOpen(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          if (showPanel) setIsOpen(false);
          else setQuery("");
          inputRef.current?.focus();
        }
      }}
    >
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          setIsOpen(false);
          if (hasQuery) window.location.hash = "library";
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          What do you want to learn?
        </label>
        <div className="liquid-glass flex h-14 items-center gap-3 rounded-full pr-2 pl-5 transition-shadow focus-within:ring-2 focus-within:ring-brand/40 sm:h-16">
          <Icon name="search" className="text-slate-400" />
          <input
            ref={inputRef}
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => {
              search(event.target.value);
              setIsOpen(true);
            }}
            placeholder="What do you want to learn?"
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

      <p aria-live="polite" className="sr-only">
        {hasQuery ? `${resultCount} ${resultCount === 1 ? "result" : "results"}` : ""}
      </p>

      {hasQuery ? null : (
        <p className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-500">
          <span>Popular topics:</span>
          {SUGGESTED_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => {
                search(topic);
                inputRef.current?.focus();
              }}
              className="glass-btn cursor-pointer rounded-full px-3.5 py-1 font-semibold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              {topic}
            </button>
          ))}
        </p>
      )}

      <div
        hidden={!showPanel}
        className="resource-panel absolute inset-x-0 top-full z-30 mt-3 max-h-[min(70vh,34rem)] overflow-y-auto rounded-3xl border border-white bg-white/95 p-2 text-left shadow-[0_28px_56px_-16px_rgba(2,132,199,0.28)] backdrop-blur-xl"
      >
        {resultCount === 0 ? (
          <div className="px-4 py-6 text-center">
            <p className="font-bold text-slate-800">Nothing matches “{query.trim()}” yet.</p>
            <p className="mt-1.5 text-sm text-slate-500">
              Try a shorter word, or{" "}
              <Link href="/contact" className="font-semibold text-brand-dark underline">
                ask our team
              </Link>
              .
            </p>
          </div>
        ) : null}

        {searchMatches.length > 0 ? (
          <div>
            <p className="px-3 pt-2 pb-1 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
              Resources
            </p>
            <ul>
              {searchMatches.slice(0, MAX_RESOURCE_SUGGESTIONS).map((entry) => (
                <li key={entry.id}>
                  <Link href={entry.href} className={suggestionClass}>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-slate-800 sm:text-base">
                        <Highlight text={entry.title} />
                      </span>
                      <span className="mt-0.5 block text-xs text-slate-500">{entry.label}</span>
                    </span>
                    <Icon
                      name="arrow_forward"
                      className="shrink-0 text-slate-300 transition-[color,translate] group-hover:translate-x-0.5 group-hover:text-brand"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {answerMatches.length > 0 ? (
          <div className={cn(searchMatches.length > 0 && "mt-1 border-t border-slate-100 pt-1")}>
            <p className="px-3 pt-2 pb-1 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
              Answers from the FAQ
            </p>
            <ul>
              {answerMatches.slice(0, MAX_ANSWER_SUGGESTIONS).map((answer) => (
                <li key={answer.id}>
                  <Link href={answer.href} className={suggestionClass}>
                    <Icon name="contact_support" className="shrink-0 text-brand" />
                    <span className="min-w-0 flex-1 text-sm font-semibold text-slate-700">
                      <Highlight text={answer.question} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {searchMatches.length > 0 ? (
          <a
            href="#library"
            onClick={() => setIsOpen(false)}
            className="mt-1 flex items-center justify-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-brand-dark transition-colors hover:bg-brand-light/60 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand-dark"
          >
            Show {searchMatches.length} {searchMatches.length === 1 ? "resource" : "resources"} in
            the library
            <Icon name="arrow_downward" />
          </a>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Link to a goal's section in the library that also filters the library to that goal. Without
 * JavaScript it is a plain jump to the section.
 */
export function GoalFilterLink({
  goalId,
  resetSearch = false,
  className,
  activeClassName,
  children,
}: {
  goalId: string;
  /** Also clear the search and type filter, so the whole goal shows (the "Browse by goal" tiles). */
  resetSearch?: boolean;
  className?: string;
  activeClassName?: string;
  children: ReactNode;
}) {
  const { goal, setGoal, setQuery, setType } = useDiscovery();
  const isActive = goal === goalId;
  return (
    <a
      href={`#goal-${goalId}`}
      aria-current={isActive ? "true" : undefined}
      onClick={() => {
        // Synchronously, so the section is the only one shown before the browser scrolls to it.
        flushSync(() => {
          setGoal(goalId);
          if (resetSearch) {
            setQuery("");
            setType(null);
          }
        });
      }}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </a>
  );
}

const chipClass =
  "inline-flex cursor-pointer items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold whitespace-nowrap transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";
const chipIdleClass = "glass-btn text-slate-600 hover:text-slate-900";
const chipActiveClass =
  "bg-slate-900 text-white shadow-[0_10px_24px_-10px_rgba(15,23,42,0.5)] [&_.material-symbols-outlined]:text-brand";

/** Goal and type filters for the library, with a live summary of what's shown. */
export function LibraryFilters({
  goals,
  types,
}: {
  goals: ReadonlyArray<FilterOption>;
  types: ReadonlyArray<FilterOption>;
}) {
  const { query, terms, goal, setGoal, type, setType, visibleIds, total, setQuery } =
    useDiscovery();
  const shown = visibleIds?.size ?? total;
  const goalLabel = goals.find((option) => option.id === goal)?.label;
  const typeLabel = types.find((option) => option.id === type)?.label;

  return (
    <div className="space-y-4">
      <nav aria-label="Filter resources by goal" className="-mx-6 overflow-x-auto px-6 py-1">
        <ul className="flex w-max gap-2 lg:w-auto lg:flex-wrap">
          <li>
            <a
              href="#library"
              aria-current={goal === null ? "true" : undefined}
              onClick={() => setGoal(null)}
              className={cn(chipClass, goal === null ? chipActiveClass : chipIdleClass)}
            >
              <Icon name="apps" className="text-brand" />
              All goals
            </a>
          </li>
          {goals.map((option) => (
            <li key={option.id}>
              <GoalFilterLink
                goalId={option.id}
                className={cn(chipClass, chipIdleClass)}
                activeClassName={chipActiveClass}
              >
                {option.icon ? <Icon name={option.icon} className="text-brand" /> : null}
                {option.label}
              </GoalFilterLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label="Filter resources by type" className="flex flex-wrap gap-1.5">
          {[{ id: "", label: "All types", count: total }, ...types].map((option) => {
            const isActive = (type ?? "") === option.id;
            return (
              <button
                key={option.id || "all"}
                type="button"
                aria-pressed={isActive}
                onClick={() => setType(option.id || null)}
                className={cn(
                  "cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-bold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                  isActive
                    ? "bg-brand-light text-brand-dark ring-1 ring-brand/30 ring-inset"
                    : "text-slate-500 hover:bg-white/70 hover:text-slate-800",
                )}
              >
                {option.label}
                <span className="ml-1.5 font-semibold text-slate-400 tabular-nums">
                  {option.count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="flex items-center gap-3 text-sm text-slate-500">
          <span>
            <span className="font-bold text-slate-800 tabular-nums">{shown}</span> of {total}{" "}
            resources
            {terms.length ? <> for “{query.trim()}”</> : null}
            {goalLabel ? <> in {goalLabel}</> : null}
            {typeLabel ? <> · {typeLabel}</> : null}
          </span>
          {visibleIds ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setGoal(null);
                setType(null);
              }}
              className="cursor-pointer font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              Clear
            </button>
          ) : null}
        </p>
      </div>
    </div>
  );
}

/** One goal's section of the library; hidden when the filters leave nothing in it. */
export function ResourceGroup({
  goalId,
  headingId,
  itemIds,
  children,
}: {
  goalId: string;
  headingId: string;
  itemIds: ReadonlyArray<string>;
  children: ReactNode;
}) {
  const { visibleIds } = useDiscovery();
  return (
    <section
      id={`goal-${goalId}`}
      aria-labelledby={headingId}
      hidden={visibleIds !== null && !itemIds.some((id) => visibleIds.has(id))}
      className="scroll-mt-28 md:scroll-mt-36"
    >
      {children}
    </section>
  );
}

/** A resource in a goal's grid; hidden while the filters exclude it. */
export function ResourceItem({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const { visibleIds } = useDiscovery();
  return (
    <li
      hidden={visibleIds !== null && !visibleIds.has(id)}
      className={cn("resource-enter", className)}
    >
      {children}
    </li>
  );
}

/** Shown in place of the library when the filters leave nothing. */
export function LibraryEmpty({ children }: { children: ReactNode }) {
  const { visibleIds, setQuery, setGoal, setType } = useDiscovery();
  if (visibleIds === null || visibleIds.size > 0) return null;
  return (
    <div className="rounded-3xl border border-white bg-white/85 px-6 py-12 text-center shadow-glass">
      <Icon name="travel_explore" className="text-brand" />
      <div className="mt-3">{children}</div>
      <button
        type="button"
        onClick={() => {
          setQuery("");
          setGoal(null);
          setType(null);
        }}
        className="mt-5 cursor-pointer text-sm font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        Show every resource
      </button>
    </div>
  );
}
