import type { AvailabilityStatus } from "@/data/features";
import { cn } from "@/lib/utils";

import type { ExplorerItem } from "./areas";

/** Label shown next to features that aren't available to every store today. */
const STATUS_BADGES: Readonly<
  Partial<Record<AvailabilityStatus, { label: string; className: string }>>
> = {
  gated: { label: "On request", className: "bg-amber-50 text-amber-800 ring-amber-200" },
  "coming-soon": { label: "Coming soon", className: "bg-slate-100 text-slate-600 ring-slate-200" },
};

/** "On request" / "Coming soon" pill; renders nothing for features every store can use. */
export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  const badge = STATUS_BADGES[status];
  if (!badge) return null;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] leading-4 font-bold whitespace-nowrap ring-1 ring-inset",
        badge.className,
      )}
    >
      {badge.label}
    </span>
  );
}

/** Round +/- indicator, matching the home page FAQ toggle. */
function DisclosureIndicator() {
  return (
    <span
      aria-hidden="true"
      className="relative mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-brand transition-colors duration-300 group-open:border-brand/40 group-hover:border-brand/40"
    >
      <span className="absolute h-0.5 w-3 rounded-full bg-current" />
      <span className="absolute h-3 w-0.5 rounded-full bg-current transition-transform duration-300 group-open:rotate-90" />
    </span>
  );
}

/** One search result. Expands (native <details>) to what's included and any caveat. */
export function FeatureRow({ item }: { item: ExplorerItem }) {
  const heading = (
    <span className="min-w-0 flex-1">
      <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-bold text-slate-900">{item.name}</span>
        <StatusBadge status={item.status} />
      </span>
      <span className="mt-1 block text-sm leading-relaxed text-slate-600">{item.blurb}</span>
    </span>
  );

  if (!item.details && !item.note) {
    return <li className="py-4">{heading}</li>;
  }

  return (
    <li>
      <details className="group">
        <summary className="-mx-2 flex cursor-pointer list-none items-start gap-3 rounded-2xl px-2 py-4 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark [&::-webkit-details-marker]:hidden">
          {heading}
          <DisclosureIndicator />
        </summary>
        <div className="features-row-body space-y-3 pr-10 pb-5">
          {item.details ? (
            <ul className="space-y-2">
              {item.details.map((detail) => (
                <li key={detail} className="flex gap-2.5 text-sm leading-snug text-slate-600">
                  <span
                    className="mt-[0.45rem] size-1.5 shrink-0 rounded-full bg-brand"
                    aria-hidden="true"
                  />
                  {detail}
                </li>
              ))}
            </ul>
          ) : null}
          {item.note ? (
            <p className="text-xs leading-relaxed text-slate-500">
              <span className="font-semibold text-slate-700">Good to know: </span>
              {item.note}
            </p>
          ) : null}
        </div>
      </details>
    </li>
  );
}
