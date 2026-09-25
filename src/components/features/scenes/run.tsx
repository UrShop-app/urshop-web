import { Icon } from "@/components/ui/icon";

import {
  BRAND_GRADIENT,
  Bar,
  Check,
  Label,
  Panel,
  PressButton,
  SceneFrame,
  Stack,
  Toggle,
  TypedField,
  at,
  typed,
} from "./scene-kit";

const DOMAIN_STEPS = ["Nameservers verified", "DNS records managed", "CDN caching on"];

/** Connecting a custom domain: verification steps, then making it primary. */
export function DomainScene() {
  const domain = "yourbrand.com";
  return (
    <SceneFrame>
      <Panel>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2">
          <Icon name="language" className="text-slate-400" />
          <span
            className="demo-type min-w-0 flex-1 text-sm font-semibold whitespace-nowrap text-slate-700"
            style={typed(0.3, domain)}
          >
            {domain}
          </span>
          <span
            className="demo-pop rounded-full bg-brand-light px-2 py-0.5 text-[10px] font-bold text-brand-dark"
            style={at(3.2)}
          >
            Primary
          </span>
        </div>
      </Panel>
      <Panel className="space-y-3">
        <Label>Setup</Label>
        {DOMAIN_STEPS.map((step, index) => {
          const doneAt = 1.3 + index * 0.6;
          return (
            <div
              key={step}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700"
            >
              <Stack className="size-4 place-items-center">
                <span className="demo-out size-4" style={at(doneAt)}>
                  <span className="block size-4 animate-spin rounded-full border-2 border-slate-200 border-t-brand" />
                </span>
                <Check className="demo-pop" style={at(doneAt)} />
              </Stack>
              {step}
            </div>
          );
        })}
      </Panel>
      <Panel className="demo-in overflow-hidden p-0 sm:p-0" style={at(3.5)}>
        <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-3 py-2">
          <Icon name="lock" className="text-emerald-600" />
          <span className="text-[11px] font-semibold text-slate-600">{domain}</span>
        </div>
        <div className="flex items-center gap-3 p-3">
          <span className="h-12 flex-1 rounded-lg" style={{ background: BRAND_GRADIENT }} />
          <span className="flex-1 space-y-1.5">
            <Bar className="w-full" />
            <Bar className="w-2/3" />
          </span>
        </div>
      </Panel>
    </SceneFrame>
  );
}

const PERMISSIONS: ReadonlyArray<{ area: string; access: string; onAt?: number }> = [
  { area: "Orders", access: "Manage", onAt: 1.5 },
  { area: "Products", access: "View", onAt: 1.8 },
  { area: "Customers", access: "View", onAt: 2.1 },
  { area: "Revenue", access: "No access" },
];

/** Inviting a staff member with only the access they need. */
export function StaffScene() {
  return (
    <SceneFrame>
      <Panel className="space-y-3">
        <Label>Invite staff</Label>
        <TypedField placeholder="Email address" value="rafi@yourbrand.com" start={0.3} />
        <span
          className="demo-pop inline-flex rounded-full bg-violet-50 px-2.5 py-1 text-[10px] font-bold text-violet-700"
          style={at(1.2)}
        >
          Role preset: Order manager
        </span>
      </Panel>
      <Panel className="min-h-0 flex-1">
        <Label className="mb-1">Permissions</Label>
        <ul className="divide-y divide-slate-100">
          {PERMISSIONS.map((permission) => (
            <li key={permission.area} className="flex items-center gap-3 py-2 text-xs">
              <span className="flex-1 font-semibold text-slate-700">{permission.area}</span>
              <span className="text-[10px] font-semibold text-slate-400">{permission.access}</span>
              <Toggle onAt={permission.onAt} />
            </li>
          ))}
        </ul>
      </Panel>
      <PressButton label="Send invite" doneLabel="Invite sent" pressAt={2.8} />
    </SceneFrame>
  );
}
