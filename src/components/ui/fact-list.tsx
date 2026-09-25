import type { ReactNode } from "react";

/** Label/value list with hairline dividers, e.g. company details. Children are `Fact`s. */
export function FactList({ children }: { children: ReactNode }) {
  return <dl className="divide-y divide-slate-200/80">{children}</dl>;
}

export function Fact({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-4">
      <dt className="text-[12px] font-bold tracking-[0.14em] text-slate-500 uppercase sm:pt-0.5">
        {term}
      </dt>
      <dd className="text-sm leading-relaxed text-slate-800 sm:text-base">{children}</dd>
    </div>
  );
}
