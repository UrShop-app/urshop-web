import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, Bar, Check, Label, Panel, SceneFrame, Stack, at } from "./scene-kit";

const SPARKLINES = [
  "M0 22 L12 18 L24 20 L36 12 L48 14 L60 6 L72 8",
  "M0 20 L12 21 L24 14 L36 16 L48 10 L60 12 L72 5",
  "M0 24 L12 16 L24 18 L36 13 L48 15 L60 9 L72 7",
];

// Relative bar heights for the chart; shapes only, not data.
const BARS = [38, 52, 44, 60, 48, 70, 58, 76, 64, 82, 72, 90];

/** Switching the date range; metrics, trend lines and the chart draw in. */
export function AnalyticsScene() {
  const rangeAt = 0.8;
  return (
    <SceneFrame>
      <div className="flex items-center gap-1 self-start rounded-full bg-white/80 p-1 text-[11px] font-bold shadow-sm">
        {["7 days", "30 days", "90 days"].map((range, index) => (
          <Stack key={range}>
            <span className="rounded-full px-3 py-1 text-slate-500">{range}</span>
            {index === 0 ? (
              <span
                className="demo-out rounded-full bg-brand-light px-3 py-1 text-brand-dark"
                style={at(rangeAt)}
              >
                {range}
              </span>
            ) : null}
            {index === 1 ? (
              <span
                className="demo-pop rounded-full bg-brand-light px-3 py-1 text-brand-dark"
                style={at(rangeAt)}
              >
                {range}
              </span>
            ) : null}
          </Stack>
        ))}
        <span className="hidden px-2 text-slate-400 sm:inline">vs previous period</span>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {["Visitors", "Orders", "Revenue"].map((metric, index) => (
          <Panel key={metric} className="p-2.5 sm:p-3">
            <p className="text-[10px] font-bold text-slate-500 sm:text-[11px]">{metric}</p>
            <span className="demo-grow mt-2 block" style={at(1 + index * 0.15)}>
              <Bar className="h-3 w-3/4 bg-slate-300/80" />
            </span>
            <svg
              viewBox="0 0 72 28"
              className="mt-2 h-7 w-full"
              fill="none"
              preserveAspectRatio="none"
            >
              <path
                d={SPARKLINES[index]}
                pathLength={1}
                className="demo-draw"
                style={at(1.2 + index * 0.2)}
                stroke="#08c0d8"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </Panel>
        ))}
      </div>

      <Panel className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <Label>Orders over time</Label>
          <span className="flex items-center gap-3 text-[10px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <span className="size-2 rounded-full bg-brand" />
              This period
            </span>
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-3 bg-slate-300" />
              Previous
            </span>
          </span>
        </div>
        <div className="relative mt-3 flex min-h-0 flex-1 items-end gap-1.5">
          {BARS.map((height, index) => (
            <span
              key={index}
              className="demo-rise flex-1 rounded-t-md"
              style={{
                ...at(1.6 + index * 0.06),
                height: `${height}%`,
                background: BRAND_GRADIENT,
              }}
            />
          ))}
          <svg
            viewBox="0 0 100 40"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 size-full"
            fill="none"
          >
            <path
              d="M0 30 L10 28 L20 29 L30 24 L40 26 L50 20 L60 22 L70 17 L80 19 L90 14 L100 15"
              pathLength={1}
              className="demo-draw"
              style={at(2.6)}
              stroke="#94a3b8"
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
      </Panel>
    </SceneFrame>
  );
}

const CONNECTIONS = [
  "Meta Pixel + Conversions API",
  "TikTok pixel + Events API",
  "Google Tag Manager",
];
const EVENTS = ["PageView", "AddToCart", "Purchase"];

/** Pixels connected, then test events arriving with their delivery status. */
export function PixelsScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-2.5">
        <Label className="mb-1">Connections</Label>
        {CONNECTIONS.map((connection, index) => (
          <div key={connection} className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700">{connection}</span>
            <Stack className="justify-items-end text-[10px] font-bold">
              <span
                className="demo-out rounded-full bg-slate-100 px-2 py-0.5 text-slate-500"
                style={at(0.5 + index * 0.35)}
              >
                Not set
              </span>
              <span
                className="demo-pop rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
                style={at(0.5 + index * 0.35)}
              >
                Set
              </span>
            </Stack>
          </div>
        ))}
      </Panel>
      <Panel className="min-h-0 flex-1 space-y-2">
        <Label className="mb-1">Test events</Label>
        {EVENTS.map((event, index) => {
          const arriveAt = 1.9 + index * 0.6;
          return (
            <div
              key={event}
              className="demo-in flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2"
              style={at(arriveAt)}
            >
              <span className="size-2 rounded-full bg-brand" />
              <span className="flex-1 font-mono text-[11px] font-semibold text-slate-700">
                {event}
              </span>
              <span
                className="demo-pop flex items-center gap-1.5 text-[10px] font-bold text-emerald-700"
                style={at(arriveAt + 0.3)}
              >
                <Check />
                Delivered
              </span>
            </div>
          );
        })}
      </Panel>
    </SceneFrame>
  );
}

const CUSTOMERS: ReadonlyArray<{ initials: string; tags: string[]; sms: boolean; email: boolean }> =
  [
    { initials: "NJ", tags: ["Repeat"], sms: true, email: true },
    { initials: "RA", tags: ["Newsletter"], sms: false, email: true },
    { initials: "TK", tags: [], sms: true, email: false },
    { initials: "MH", tags: ["Repeat"], sms: true, email: true },
  ];

function Consent({ label, granted }: { label: string; granted: boolean }) {
  return (
    <span
      className={cn(
        "rounded-full px-1.5 py-0.5 text-[9px] font-bold",
        granted ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-400 line-through",
      )}
    >
      {label}
    </span>
  );
}

/** The customer list filling in, with tags, consent and a blocked customer. */
export function CustomersScene() {
  return (
    <SceneFrame>
      <Panel className="min-h-0 flex-1 space-y-1">
        <div className="mb-2 flex items-center justify-between">
          <Label>Customers</Label>
          <span className="flex gap-1.5 text-[10px] font-semibold text-slate-500">
            {["Orders", "Signups", "Imports"].map((source) => (
              <span key={source} className="rounded-full border border-slate-200 px-2 py-0.5">
                {source}
              </span>
            ))}
          </span>
        </div>
        {CUSTOMERS.map((customer, index) => (
          <div
            key={customer.initials}
            className={cn(
              "demo-in flex items-center gap-2.5 rounded-xl px-2 py-2",
              index === 0 && "bg-brand-light/50",
              index === 3 && "hidden sm:flex",
            )}
            style={at(0.3 + index * 0.2)}
          >
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
              {customer.initials}
            </span>
            <span className="min-w-0 flex-1 space-y-1.5">
              <Bar className="w-2/3" />
              <span className="flex gap-1">
                {customer.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-violet-50 px-1.5 py-0.5 text-[9px] font-bold text-violet-700"
                  >
                    {tag}
                  </span>
                ))}
              </span>
            </span>
            {index === 2 ? (
              <Stack className="justify-items-end">
                <span className="demo-out flex gap-1" style={at(2.6)}>
                  <Consent label="SMS" granted={customer.sms} />
                  <Consent label="Email" granted={customer.email} />
                </span>
                <span
                  className="demo-pop rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700"
                  style={at(2.6)}
                >
                  Blocked
                </span>
              </Stack>
            ) : (
              <span className="flex gap-1">
                <Consent label="SMS" granted={customer.sms} />
                <Consent label="Email" granted={customer.email} />
              </span>
            )}
          </div>
        ))}
      </Panel>
      <Panel className="demo-in grid grid-cols-3 gap-3" style={at(1.6)}>
        {["Orders", "Spend", "Notes"].map((stat) => (
          <span key={stat}>
            <span className="block text-[10px] font-bold text-slate-500">{stat}</span>
            <Bar className="mt-2 h-2.5 w-3/4 bg-slate-300/80" />
          </span>
        ))}
      </Panel>
    </SceneFrame>
  );
}
