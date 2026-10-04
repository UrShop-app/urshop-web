import { Icon, type IconName } from "@/components/ui/icon";
import { partnershipPath } from "@/data/partners";
import { cn } from "@/lib/utils";

import {
  BRAND_GRADIENT,
  FinePrint,
  PartnersSection,
  PillLink,
  partnershipContactHref,
} from "./kit";

// Categories of work, not past projects: no client names, logos, figures or timelines.
const SURFACES: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "web", label: "Web apps" },
  { icon: "dashboard_customize", label: "Dashboards" },
  { icon: "api", label: "APIs & backends" },
  { icon: "hub", label: "Integrations" },
  { icon: "smart_toy", label: "AI automation" },
  { icon: "group", label: "Customer portals" },
  { icon: "apps", label: "Internal tools" },
  { icon: "storefront", label: "Commerce systems" },
];

const AUDIENCES: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  { icon: "work", title: "For agencies", text: "Your engineering team, for your clients." },
  { icon: "apps", title: "For businesses", text: "A system built around how you work." },
];

/** Software / engineering partners: custom software beyond the UrShop product. */
export function SoftwareSection() {
  const path = partnershipPath("software");
  return (
    <PartnersSection
      id="software"
      eyebrow="Software partners"
      title="Need more than a storefront?"
      intro="UrShop is proof of what we build. Our team can build your custom software too."
    >
      {/* Engineering blocks assembling on the UrShop foundation as the section scrolls in. */}
      <div
        aria-hidden="true"
        className="liquid-glass-card mx-auto max-w-4xl rounded-3xl p-5 select-none sm:p-7"
        style={{ borderRadius: "28px" }}
      >
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {SURFACES.map((surface, index) => (
            <div
              key={surface.label}
              className={cn(
                "reveal flex flex-col items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
                index % 4 === 1 && "reveal-delay-1",
                index % 4 >= 2 && "reveal-delay-2",
              )}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-brand-light text-brand-dark">
                <Icon name={surface.icon} className="scale-90" />
              </span>
              <span className="text-[13px] leading-snug font-bold text-slate-800">
                {surface.label}
              </span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {[0, 1, 2, 3].map((column) => (
            <span
              key={column}
              className={cn("mx-auto block h-5 w-px bg-brand/40", column > 1 && "max-sm:hidden")}
            />
          ))}
        </div>
        <div
          className="reveal flex items-center justify-center gap-2.5 rounded-2xl px-4 py-3.5 text-white shadow-[0_18px_36px_-16px_rgba(2,132,199,0.6)]"
          style={{ background: BRAND_GRADIENT }}
        >
          <Icon name="code" />
          <span className="text-sm font-extrabold">Built by the team behind UrShop</span>
        </div>
      </div>

      <ul className="reveal mx-auto mt-6 grid max-w-4xl gap-3 sm:grid-cols-2">
        {AUDIENCES.map((audience) => (
          <li
            key={audience.title}
            className="flex items-center gap-3 rounded-2xl border border-white bg-white/80 p-4"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand-dark">
              <Icon name={audience.icon} className="scale-90" />
            </span>
            <span>
              <span className="block text-sm font-extrabold text-slate-900">{audience.title}</span>
              <span className="block text-sm text-slate-600">{audience.text}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="reveal mt-10 flex flex-col items-center gap-4">
        <FinePrint>{path.terms}</FinePrint>
        <PillLink href={partnershipContactHref(path.contactSubject)}>Talk about a project</PillLink>
      </div>
    </PartnersSection>
  );
}
