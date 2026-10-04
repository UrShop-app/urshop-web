import type { CSSProperties, ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { partnershipPath } from "@/data/partners";
import { cn } from "@/lib/utils";

import {
  BRAND_GRADIENT,
  CardLabel,
  FinePrint,
  PartnersSection,
  PillLink,
  partnershipContactHref,
} from "./kit";

type Item = { icon: IconName; label: string };

const YOU: ReadonlyArray<Item> = [
  { icon: "travel_explore", label: "Market knowledge" },
  { icon: "handshake", label: "Sales" },
  { icon: "campaign", label: "Marketing" },
  { icon: "groups", label: "Merchant network" },
];

const URSHOP: ReadonlyArray<Item> = [
  { icon: "storefront", label: "Commerce platform" },
  { icon: "code", label: "Engineering" },
  { icon: "construction", label: "Local adaptations" },
  { icon: "rocket_launch", label: "Technical delivery" },
];

// What UrShop runs on today (features.ts: localization, guided-setup, bkash-payments,
// cod-payment, courier-integrations). A new market adapts these with the partner.
const TODAY: ReadonlyArray<{ icon: IconName; topic: string; today: string }> = [
  { icon: "translate", topic: "Language", today: "Bangla & English" },
  { icon: "payments", topic: "Payments", today: "bKash & cash on delivery" },
  { icon: "local_shipping", topic: "Delivery", today: "Pathao, RedX, Steadfast" },
  { icon: "location_on", topic: "Region", today: "Bangladesh" },
];

// Example market: a field of storefront tiles, some lighting up. Not a map of anywhere.
const MARKET_TILES = Array.from({ length: 21 }, (_, index) => ({
  id: index,
  delay: -((index * 37) % 90) / 10,
  lit: index % 3 !== 1,
}));

function SideCard({
  label,
  items,
  tone,
}: {
  label: string;
  items: ReadonlyArray<Item>;
  tone: "partner" | "urshop";
}) {
  return (
    <div
      className="liquid-glass-card h-full rounded-3xl p-5 sm:p-6"
      style={{ borderRadius: "28px" }}
    >
      <CardLabel className={tone === "urshop" ? "text-brand-dark" : undefined}>{label}</CardLabel>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li
            key={item.label}
            className={cn(
              "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold",
              tone === "urshop" ? "bg-brand-light/70 text-slate-800" : "bg-white/80 text-slate-700",
            )}
          >
            <Icon
              name={item.icon}
              className={cn(
                "-my-1 shrink-0 scale-75",
                tone === "urshop" ? "text-brand" : "text-slate-400",
              )}
            />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Operator({ children }: { children: ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="liquid-glass mx-auto grid size-12 shrink-0 place-items-center self-center rounded-full text-2xl font-extrabold text-brand-dark pb-2"
    >
      {children}
    </span>
  );
}

function OpportunityCard() {
  return (
    <div
      className="flex h-full flex-col rounded-3xl p-5 text-white sm:p-6"
      style={{
        background: BRAND_GRADIENT,
        borderRadius: "28px",
        boxShadow: "0 24px 48px -20px rgba(2, 132, 199, 0.55)",
      }}
    >
      <span className="block text-[11px] font-bold tracking-[0.16em] text-white/80 uppercase">
        Together
      </span>
      <p className="mt-1.5 text-xl font-extrabold tracking-tight">A joint market</p>
      <PauseOffscreen className="mt-4 flex flex-1 items-center">
        <div
          aria-hidden="true"
          className="grid w-full grid-cols-7 gap-1.5 rounded-2xl bg-white/10 p-3"
        >
          {MARKET_TILES.map((tile) => (
            <span
              key={tile.id}
              className="relative aspect-square rounded-[5px] bg-white/10 ring-1 ring-white/15 ring-inset"
            >
              {tile.lit ? (
                <span
                  className="partners-market-tile absolute inset-0 rounded-[5px] bg-white/70"
                  style={{ "--delay": `${tile.delay}s` } as CSSProperties}
                />
              ) : null}
            </span>
          ))}
        </div>
      </PauseOffscreen>
    </div>
  );
}

/** Regional / strategic partners: taking the UrShop model into a new market. */
export function RegionalSection() {
  const path = partnershipPath("regional");
  return (
    <PartnersSection
      id="regional"
      eyebrow="Regional partners"
      title="Bring UrShop to your market"
      intro="You bring the market. We bring the software and the engineering."
    >
      <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-5">
        <div className="partners-join-start">
          <SideCard label="You" items={YOU} tone="partner" />
        </div>
        <Operator>+</Operator>
        <div className="partners-join-end">
          <SideCard label="UrShop" items={URSHOP} tone="urshop" />
        </div>
        <Operator>=</Operator>
        <div className="reveal reveal-delay-2">
          <OpportunityCard />
        </div>
      </div>

      <div className="reveal mt-12">
        <p className="text-center text-sm font-bold text-slate-900">
          Built for Bangladesh today. Adapted for your market, together.
        </p>
        <ul className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {TODAY.map((item) => (
            <li
              key={item.topic}
              className="flex flex-col items-center gap-2 rounded-2xl border border-white bg-white/70 p-4 text-center"
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-light text-brand-dark">
                <Icon name={item.icon} className="scale-90" />
              </span>
              <span className="text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">
                {item.topic}
              </span>
              <span className="text-sm font-semibold text-slate-800">{item.today}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="reveal mt-10 flex flex-col items-center gap-4">
        <FinePrint>{path.terms} No franchise or exclusivity is assumed.</FinePrint>
        <PillLink href={partnershipContactHref(path.contactSubject)}>
          Talk about your market
        </PillLink>
      </div>
    </PartnersSection>
  );
}
