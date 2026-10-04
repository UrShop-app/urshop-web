"use client";

import { useRef } from "react";

import { AutoplayButton, Segmented } from "@/components/ui/demo-controls";
import { Icon, type IconName } from "@/components/ui/icon";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, DemoFrame } from "./demo-kit";

type Level = "manage" | "view" | "none";

type Area = {
  id: string;
  label: string;
  icon: IconName;
  /** Flagged as sensitive in UrShop's permission presets (features.ts `staff-permissions`). */
  sensitive?: boolean;
};

// Plain-language areas, not the dashboard's internal permission names.
const AREAS: ReadonlyArray<Area> = [
  { id: "products", label: "Products", icon: "inventory_2" },
  { id: "orders", label: "Orders", icon: "receipt_long" },
  { id: "customers", label: "Customers", icon: "group" },
  { id: "revenue", label: "Revenue & analytics", icon: "monitoring", sensitive: true },
  { id: "storefront", label: "Storefront design", icon: "palette" },
  { id: "payments", label: "Payments", icon: "account_balance_wallet", sensitive: true },
  { id: "couriers", label: "Couriers", icon: "local_shipping", sensitive: true },
  { id: "domains", label: "Domains", icon: "language", sensitive: true },
  { id: "settings", label: "Settings", icon: "settings", sensitive: true },
  { id: "staff", label: "Staff", icon: "badge", sensitive: true },
];

type RoleId = "owner" | "operations" | "catalog" | "support";

// Example roles: merchants start from a role preset or choose view/manage per area themselves.
const ROLES: Record<RoleId, { label: string; summary: string; access: Record<string, Level> }> = {
  owner: {
    label: "Owner",
    summary: "Full access, including staff and settings.",
    access: Object.fromEntries(AREAS.map((area) => [area.id, "manage"])),
  },
  operations: {
    label: "Operations",
    summary: "Orders, customers and couriers.",
    access: { orders: "manage", customers: "manage", couriers: "manage", products: "view" },
  },
  catalog: {
    label: "Catalog",
    summary: "Products and storefront design.",
    access: { products: "manage", storefront: "manage", orders: "view" },
  },
  support: {
    label: "Support",
    summary: "Can view orders and customers.",
    access: { orders: "view", customers: "view" },
  },
};

const ROLE_ORDER: ReadonlyArray<RoleId> = ["owner", "operations", "catalog", "support"];
const DURATIONS = ROLE_ORDER.map(() => 3200);

const LEVEL_LABEL: Record<Level, string> = { manage: "Manage", view: "View", none: "No access" };

function AreaCell({ area, level }: { area: Area; level: Level }) {
  return (
    <li
      className={cn(
        "flex min-h-[4.25rem] flex-col justify-between gap-2 rounded-2xl border p-3 transition-[background-color,border-color,opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        level === "manage" && "border-brand/30 bg-brand-light/50",
        level === "view" && "border-slate-200 bg-white",
        level === "none" && "scale-[0.97] border-dashed border-slate-200 bg-slate-50/60 opacity-70",
      )}
    >
      <span className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "flex min-w-0 items-center gap-1.5 text-[13px] leading-tight font-bold transition-colors duration-500",
            level === "none" ? "text-slate-400" : "text-slate-800",
          )}
        >
          <Icon
            name={area.icon}
            className={cn("shrink-0 scale-75", level === "none" ? "text-slate-300" : "text-brand")}
          />
          <span className="min-w-0">{area.label}</span>
        </span>
        {area.sensitive ? (
          <span
            title="Sensitive area"
            className="mt-0.5 size-2 shrink-0 rounded-full bg-amber-400 ring-2 ring-amber-100"
          />
        ) : null}
      </span>
      <span
        className={cn(
          "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold transition-colors duration-500",
          level === "manage" && "text-white",
          level === "view" && "bg-slate-100 text-slate-600",
          level === "none" && "bg-transparent px-0 text-slate-400",
        )}
        style={level === "manage" ? { background: BRAND_GRADIENT } : undefined}
      >
        <Icon
          name={level === "manage" ? "edit" : level === "view" ? "visibility" : "lock"}
          className="scale-[0.6]"
        />
        {LEVEL_LABEL[level]}
      </span>
    </li>
  );
}

/** Pick an example role and watch the store areas it can view, manage or not open at all. */
export function PermissionMatrixDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: DURATIONS, reducedMotionStep: 1 });
  const roleId = ROLE_ORDER[demo.step] ?? "owner";
  const role = ROLES[roleId];

  return (
    <div ref={demoRef}>
      <DemoFrame
        title="Staff permissions"
        icon={<Icon name="admin_panel_settings" className="text-brand" />}
        actions={<AutoplayButton demo={demo} />}
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Segmented
            label="Example role"
            options={ROLE_ORDER.map((id) => ({ value: id, label: ROLES[id].label }))}
            value={roleId}
            onChange={(next) => demo.goTo(ROLE_ORDER.indexOf(next))}
            className="max-w-full overflow-x-auto"
            size="sm"
          />
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
            <span className="size-2 rounded-full bg-amber-400 ring-2 ring-amber-100" />
            Sensitive area
          </span>
        </div>

        <p aria-live="polite" className="mt-3 text-sm text-slate-600">
          <span className="font-bold text-slate-900">{role.label}: </span>
          {role.summary}
        </p>

        <ul
          aria-label={`${role.label} access by area`}
          className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
        >
          {AREAS.map((area) => {
            const level = role.access[area.id] ?? "none";
            return <AreaCell key={area.id} area={area} level={level} />;
          })}
        </ul>

        <p className="mt-4 flex items-center gap-2 border-t border-slate-200/70 pt-3 text-xs text-slate-500">
          <Icon name="tune" className="scale-75 text-brand" />
          Example roles. Adjust any area to view or manage.
        </p>
      </DemoFrame>
    </div>
  );
}
