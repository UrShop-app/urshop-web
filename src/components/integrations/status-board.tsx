import Image, { type StaticImageData } from "next/image";

import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  integrationGroupLabels,
  integrations,
  integrationsByStatus,
  integrationStatusLabels,
  type Integration,
  type IntegrationGroup,
} from "@/data/integrations";
import { cn } from "@/lib/utils";

const GROUPS: ReadonlyArray<{ id: IntegrationGroup; icon: IconName }> = [
  { id: "payments", icon: "account_balance_wallet" },
  { id: "delivery", icon: "local_shipping" },
  { id: "messaging", icon: "forum" },
  { id: "measurement", icon: "ads_click" },
  { id: "store", icon: "storefront" },
];

// Partner logos in the repo; everything else gets an icon.
const LOGOS: Readonly<Record<string, StaticImageData>> = { bkash, pathao, redx, steadfast };

const ICONS: Readonly<Record<string, IconName>> = {
  bulksmsbd: "forum",
  "email-sender": "mail",
  "meta-pixel": "ads_click",
  "tiktok-pixel": "ads_click",
  gtm: "tune",
  "meta-feed": "inventory_2",
  "custom-domain": "language",
  "secure-cod": "lock",
  "website-chat": "contact_support",
  "abandoned-sms": "shopping_cart_checkout",
};

function Tile({ integration }: { integration: Integration }) {
  const logo = LOGOS[integration.id];
  const isPerStore = integration.status === "per-store";
  return (
    <li
      title={integration.description}
      className="group flex h-14 items-center gap-3 rounded-2xl border border-slate-200/70 bg-white/90 pr-3.5 pl-2 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_12px_24px_-12px_rgba(2,132,199,0.35)]"
    >
      <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-slate-50">
        {logo ? (
          <Image src={logo} alt="" sizes="40px" className="max-h-6 w-auto max-w-8 object-contain" />
        ) : (
          <Icon name={ICONS[integration.id] ?? "apps"} className="scale-90 text-brand-dark" />
        )}
      </span>
      <span className="text-sm font-bold whitespace-nowrap text-slate-900">{integration.name}</span>
      <span
        className={cn(
          "ml-1 size-2 shrink-0 rounded-full",
          isPerStore ? "bg-amber-400" : "bg-emerald-500",
        )}
        aria-hidden="true"
      />
      <span className="sr-only">
        ({integrationStatusLabels[integration.status].title.toLowerCase()})
      </span>
    </li>
  );
}

function LegendItem({ dot, label }: { dot: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
      <span className={cn("size-2 rounded-full", dot)} aria-hidden="true" />
      {label}
    </span>
  );
}

/**
 * Every integration by area, with its availability. Coming-later items sit in their own muted
 * strip below the panel, never next to live ones.
 */
export function StatusBoard() {
  const available = integrations.filter((integration) => integration.status !== "coming-later");
  const comingLater = integrationsByStatus("coming-later");

  return (
    <section
      id="status"
      aria-labelledby="status-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="status-heading"
          eyebrow="At a glance"
          title="What connects today"
          align="center"
          className="reveal"
        />

        <div
          className="liquid-glass-card mt-10 rounded-3xl p-2 sm:p-3"
          style={{ borderRadius: "28px" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-3 pb-4 sm:px-5">
            <p className="text-sm font-bold text-slate-900">Integrations</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <LegendItem dot="bg-emerald-500" label={integrationStatusLabels.connect.title} />
              <LegendItem dot="bg-amber-400" label={integrationStatusLabels["per-store"].title} />
            </div>
          </div>

          <div className="divide-y divide-slate-200/70 rounded-[22px] bg-white/55">
            {GROUPS.map((group) => {
              const items = available.filter((integration) => integration.group === group.id);
              if (items.length === 0) return null;
              return (
                <div
                  key={group.id}
                  className="reveal grid gap-3 px-4 py-4 sm:px-5 md:grid-cols-[11rem_minmax(0,1fr)] md:items-center md:gap-6"
                >
                  <h3 className="flex items-center gap-2.5 text-sm font-bold text-slate-700">
                    <span className="grid size-8 place-items-center rounded-xl bg-brand-light text-brand-dark">
                      <Icon name={group.icon} className="scale-75" />
                    </span>
                    {integrationGroupLabels[group.id]}
                  </h3>
                  <ul className="flex flex-wrap gap-2.5">
                    {items.map((integration) => (
                      <Tile key={integration.id} integration={integration} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div className="reveal mt-5 flex flex-col gap-3 rounded-3xl border border-dashed border-slate-300 bg-slate-50/50 px-5 py-4 sm:flex-row sm:items-center sm:gap-5">
          <p className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-500">
            <Icon name="schedule" className="scale-75 text-slate-400" />
            {integrationStatusLabels["coming-later"].title}
          </p>
          <ul className="flex flex-wrap gap-2">
            {comingLater.map((integration) => (
              <li
                key={integration.id}
                className="rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-500"
              >
                {integration.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
