"use client";

import {
  createContext,
  use,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";

import { DisclosureToggle } from "@/components/ui/disclosure-toggle";
import { Icon } from "@/components/ui/icon";
import { normalizeSearchText } from "@/lib/search-text";
import { cn } from "@/lib/utils";

/** One question as the search sees it (plain data from the server). */
export type FaqSearchEntry = {
  id: string;
  categoryId: string;
  /** Normalised question, answer and keywords, with a leading space (see lib/search-text.ts). */
  text: string;
};

type FaqSearchState = {
  query: string;
  setQuery: (query: string) => void;
  /** Ids of the matching questions, or null while there's no search. */
  matchIds: ReadonlySet<string> | null;
  matchCategoryIds: ReadonlySet<string> | null;
  /** The URL fragment, e.g. "#secure-cod". Opens the question it points at. */
  hash: string;
  /** Last explicit request to open a question; `count` makes repeat requests trigger. */
  revealRequest: { id: string | null; count: number };
  /** Clears the search and opens a question (before the link scrolls to it). */
  reveal: (id: string) => void;
};

const FaqSearchContext = createContext<FaqSearchState | null>(null);

function useFaqSearch() {
  const state = use(FaqSearchContext);
  if (!state) throw new Error("FAQ search components must be inside <FaqSearchProvider>.");
  return state;
}

function subscribeToHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

/**
 * Search state for the FAQ page. The questions themselves are server-rendered children; this
 * only decides which of them are hidden, so every answer stays in the HTML. Words match from
 * the start (e.g. "cour" finds "courier"), the same as the Features search.
 */
export function FaqSearchProvider({
  entries,
  children,
}: {
  entries: ReadonlyArray<FaqSearchEntry>;
  children: ReactNode;
}) {
  const [query, setQuery] = useState("");
  const [revealRequest, setRevealRequest] = useState<FaqSearchState["revealRequest"]>({
    id: null,
    count: 0,
  });
  const hash = useSyncExternalStore(
    subscribeToHash,
    () => window.location.hash,
    () => "",
  );

  const normalizedQuery = normalizeSearchText(query);
  const value = useMemo<FaqSearchState>(() => {
    const terms = normalizedQuery.split(" ").filter(Boolean);
    const matches =
      terms.length === 0
        ? null
        : entries.filter((entry) => terms.every((term) => entry.text.includes(` ${term}`)));
    return {
      query,
      setQuery,
      matchIds: matches && new Set(matches.map((entry) => entry.id)),
      matchCategoryIds: matches && new Set(matches.map((entry) => entry.categoryId)),
      hash,
      revealRequest,
      reveal: (id) => {
        // Synchronously, so the target is visible before the browser follows the link.
        flushSync(() => {
          setQuery("");
          setRevealRequest((request) => ({ id, count: request.count + 1 }));
        });
      },
    };
  }, [entries, normalizedQuery, query, hash, revealRequest]);

  return <FaqSearchContext value={value}>{children}</FaqSearchContext>;
}

/** Search box with a live result count. */
export function FaqSearchField({ className }: { className?: string }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const { query, setQuery, matchIds } = useFaqSearch();
  const count = matchIds?.size ?? 0;

  return (
    <div className={className}>
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label htmlFor={inputId} className="sr-only">
          Search the FAQ
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
              if (event.key === "Escape") setQuery("");
            }}
            placeholder="Try “bKash”, “domain” or “stock”"
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
      <p aria-live="polite" className="mt-3 min-h-5 text-sm text-slate-600">
        {matchIds === null ? null : count > 0 ? (
          <>
            <span className="font-bold text-slate-800">
              {count} {count === 1 ? "question" : "questions"}
            </span>{" "}
            match “{query.trim()}”
          </>
        ) : (
          <>No questions match “{query.trim()}”.</>
        )}
      </p>
    </div>
  );
}

/** Shown in place of the questions when a search finds nothing. */
export function FaqNoResults({ children }: { children: ReactNode }) {
  const { matchIds, setQuery } = useFaqSearch();
  if (matchIds === null || matchIds.size > 0) return null;
  return (
    <div className="rounded-3xl border border-white bg-white/85 px-6 py-12 text-center shadow-glass">
      <Icon name="contact_support" className="text-brand" />
      <div className="mt-3">{children}</div>
      <button
        type="button"
        onClick={() => setQuery("")}
        className="mt-5 cursor-pointer text-sm font-bold text-brand-dark underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
      >
        Clear search
      </button>
    </div>
  );
}

/** Hides its children while a search is active (e.g. the popular-questions shortcuts). */
export function FaqHiddenWhileSearching({ children }: { children: ReactNode }) {
  const { matchIds } = useFaqSearch();
  return <div hidden={matchIds !== null}>{children}</div>;
}

/** Hides a category's section or nav link when a search has no matches in it. */
export function FaqCategoryGate({
  categoryId,
  as: Element = "div",
  children,
}: {
  categoryId: string;
  as?: "div" | "li";
  children: ReactNode;
}) {
  const { matchCategoryIds } = useFaqSearch();
  return (
    <Element hidden={matchCategoryIds !== null && !matchCategoryIds.has(categoryId)}>
      {children}
    </Element>
  );
}

/** Link to a question on this page that also opens it, even when the URL already points there. */
export function FaqJumpLink({
  id,
  className,
  children,
}: {
  id: string;
  className?: string;
  children: ReactNode;
}) {
  const { reveal } = useFaqSearch();
  return (
    <a href={`#${id}`} onClick={() => reveal(id)} className={className}>
      {children}
    </a>
  );
}

/**
 * One question as a native disclosure (`<details>`), so it works without JavaScript and the
 * answer is always in the page. Opens itself when the URL fragment or a jump link points at it,
 * and hides while a search doesn't match it.
 */
export function FaqQuestionItem({
  id,
  question,
  children,
}: {
  id: string;
  question: string;
  /** The answer (server-rendered). */
  children: ReactNode;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const { matchIds, hash, revealRequest } = useFaqSearch();

  useEffect(() => {
    if (hash === `#${id}` && detailsRef.current) detailsRef.current.open = true;
  }, [hash, id]);

  useEffect(() => {
    if (revealRequest.id === id && detailsRef.current) detailsRef.current.open = true;
  }, [revealRequest, id]);

  return (
    <li
      id={id}
      hidden={matchIds !== null && !matchIds.has(id)}
      className="scroll-mt-24 md:scroll-mt-32"
    >
      <details
        ref={detailsRef}
        className={cn(
          "faq-item group rounded-2xl border border-transparent transition-[background-color,border-color,box-shadow] duration-300",
          "open:border-white open:bg-white/90 open:shadow-[0_12px_32px_-14px_rgba(2,132,199,0.22)] not-open:hover:bg-white/55",
        )}
      >
        <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
          <span className="flex-1 text-base font-semibold text-slate-800 transition-colors duration-300 group-open:text-slate-900 group-hover:text-brand sm:text-lg">
            {question}
          </span>
          <DisclosureToggle />
        </summary>
        <div className="faq-answer px-4 pb-6 sm:pr-20 sm:pl-6">{children}</div>
      </details>
    </li>
  );
}
