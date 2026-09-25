import { Icon } from "@/components/ui/icon";

import { SectionHeading } from "./section-heading";

// Each "after" is a capability every store has today (see src/data/features.ts).
const SHIFTS: ReadonlyArray<{ before: string; after: string }> = [
  {
    before: "Orders spread across chats and spreadsheets",
    after: "One order queue with statuses, invoices and exports",
  },
  {
    before: "A separate portal for every courier",
    after: "Pathao, RedX and Steadfast booked from the order",
  },
  {
    before: "Checking each payment by hand",
    after: "Cash on delivery by default; bKash confirmed at checkout",
  },
  {
    before: "Waiting on a developer for every website change",
    after: "Themes, a live editor and a page builder you control",
  },
];

/** The merchant problem UrShop exists to solve, told as before → after. */
export function WhyUrShop() {
  return (
    <section aria-labelledby="why-urshop-heading" className="relative px-6 py-16 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <div className="reveal">
          <SectionHeading
            id="why-urshop-heading"
            eyebrow="Why UrShop exists"
            title="Selling online shouldn't mean stitching tools together"
          />
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              For a lot of online sellers, one order lives in several places at once: a message
              thread, a spreadsheet, a courier portal and a payment app. Details get copied by hand
              at every step, and changing the website means waiting for someone technical.
            </p>
            <p>
              UrShop exists to bring that work into one place and put the merchant in control of it.
              Not by piling on features, but by doing the everyday jobs of selling well.
            </p>
          </div>
        </div>

        <div
          className="liquid-glass-card reveal reveal-delay-1 rounded-3xl p-2 sm:p-3"
          style={{ borderRadius: "28px" }}
        >
          <div className="hidden grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] gap-3 px-4 pt-3 pb-2 text-[11px] font-bold tracking-[0.18em] uppercase sm:grid">
            <span className="text-slate-400">Instead of</span>
            <span />
            <span className="text-brand-dark">With UrShop</span>
          </div>
          <ul className="space-y-2">
            {SHIFTS.map((shift) => (
              <li
                key={shift.before}
                className="grid gap-2 rounded-2xl border border-slate-200/70 bg-white/85 p-4 sm:grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] sm:items-center sm:gap-3"
              >
                <p className="text-sm leading-snug text-slate-500">
                  <span className="sr-only">Instead of: </span>
                  {shift.before}
                </p>
                {/* `.material-symbols-outlined` sets `display`, so the wrapper hides the icon. */}
                <span className="hidden justify-self-center sm:block">
                  <Icon name="arrow_forward" className="text-brand" />
                </span>
                <p className="flex gap-2 text-sm leading-snug font-semibold text-slate-900">
                  <Icon name="check_circle" className="shrink-0 text-brand" />
                  <span>
                    <span className="sr-only">With UrShop: </span>
                    {shift.after}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
