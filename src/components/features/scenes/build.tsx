import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

import { BRAND_GRADIENT, Bar, Label, Panel, PressButton, SceneFrame, Stack, at } from "./scene-kit";

/** Miniature storefront used by the theme scenes. */
function MiniStore({
  accent,
  rounded,
  className,
  cardClassName,
  cardStyle,
}: {
  accent: string;
  rounded: boolean;
  className?: string;
  cardClassName?: string;
  cardStyle?: CSSProperties;
}) {
  return (
    <div className={cn("flex h-full flex-col gap-2.5 bg-white p-3", className)}>
      <div className="flex items-center gap-2">
        <span
          className={cn("size-5", rounded ? "rounded-full" : "rounded-sm")}
          style={{ background: accent }}
        />
        <Bar className="w-12" />
        <span className="ml-auto flex gap-1.5">
          <Bar className="w-6" />
          <Bar className="w-6" />
          <Bar className="w-6" />
        </span>
      </div>
      <div
        className={cn(
          "flex flex-1 flex-col justify-center p-3",
          rounded ? "rounded-xl" : "rounded-sm",
        )}
        style={{ background: accent }}
      >
        <span className="block h-2.5 w-2/3 rounded-full bg-white/90" />
        <span className="mt-2 block h-2 w-1/2 rounded-full bg-white/60" />
        <span
          className={cn("mt-3 block h-5 w-16 bg-white", rounded ? "rounded-full" : "rounded-sm")}
        />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((product) => (
          <div key={product} className="space-y-1.5">
            <span
              className={cn(
                "block aspect-[4/3] bg-slate-100",
                rounded ? "rounded-xl" : "rounded-sm",
                cardClassName,
              )}
              style={cardStyle}
            />
            <Bar className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Switching from Classic to Aura, then publishing. */
export function ThemesScene() {
  const switchAt = 1.3;
  return (
    <SceneFrame>
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <Label>Theme</Label>
          {(["Classic", "Aura"] as const).map((theme) => (
            <Stack key={theme} className="text-xs font-bold">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-slate-500">
                {theme}
              </span>
              <span
                className={cn(
                  "rounded-full border border-brand/40 bg-brand-light px-3 py-1 text-brand-dark",
                  theme === "Classic" ? "demo-out" : "demo-pop",
                )}
                style={at(switchAt)}
              >
                {theme}
              </span>
            </Stack>
          ))}
        </span>
        <PressButton label="Publish" doneLabel="Published" pressAt={2.6} className="w-28" />
      </div>
      <Stack className="min-h-0 flex-1 overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm">
        <MiniStore accent="#334155" rounded={false} className="demo-out" />
        <span className="demo-in" style={at(switchAt)}>
          <MiniStore accent={BRAND_GRADIENT} rounded />
        </span>
      </Stack>
      <p className="flex items-center gap-2 px-1 text-[11px] font-semibold text-slate-500">
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Homepage sections kept when switching
      </p>
    </SceneFrame>
  );
}

const SWATCHES = ["#08c0d8", "#7c3aed", "#f59e0b", "#10b981"];
const DEVICES: ReadonlyArray<IconName> = ["desktop_windows", "tablet_mac", "smartphone"];

/** Picking a brand color and corner radius, previewed live. */
export function CustomizerScene() {
  const colorAt = 1.1;
  const radiusAt = 2.2;
  return (
    <SceneFrame>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1 rounded-full bg-white/80 p-1 shadow-sm">
          {DEVICES.map((device, index) => (
            <span
              key={device}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-slate-400",
                index === 0 && "bg-brand-light text-brand-dark",
              )}
            >
              <Icon name={device} />
            </span>
          ))}
        </span>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-800">
          Draft
        </span>
      </div>
      <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <Panel className="space-y-4">
          <div>
            <Label>Brand color</Label>
            <div className="mt-2 flex gap-2">
              {SWATCHES.map((color, index) => (
                <Stack key={color} className="size-6">
                  <span className="rounded-full" style={{ background: color }} />
                  {index === 0 ? (
                    <span
                      className="demo-out rounded-full ring-2 ring-slate-900 ring-offset-2"
                      style={at(colorAt)}
                    />
                  ) : null}
                  {index === 1 ? (
                    <span
                      className="demo-pop rounded-full ring-2 ring-slate-900 ring-offset-2"
                      style={at(colorAt)}
                    />
                  ) : null}
                </Stack>
              ))}
            </div>
          </div>
          <div>
            <Label>Corner radius</Label>
            <span className="relative mt-3 block h-1.5 rounded-full bg-slate-200">
              <span
                className="demo-slide absolute -top-1.5 left-0 size-4.5 translate-x-16 rounded-full border-2 border-brand bg-white shadow"
                style={at(radiusAt)}
              />
            </span>
          </div>
          <div className="hidden sm:block">
            <Label>Font</Label>
            <p className="mt-1.5 text-sm font-bold text-slate-700">Aa</p>
          </div>
        </Panel>
        <Stack className="min-h-0 overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm">
          <MiniStore accent={SWATCHES[0] ?? ""} rounded={false} className="demo-out" />
          <span className="demo-in" style={at(colorAt)}>
            <MiniStore
              accent={SWATCHES[1] ?? ""}
              rounded
              cardClassName="demo-round"
              cardStyle={at(radiusAt)}
            />
          </span>
        </Stack>
      </div>
    </SceneFrame>
  );
}

const BLOCKS: ReadonlyArray<{ name: string; icon: IconName }> = [
  { name: "Hero", icon: "dashboard_customize" },
  { name: "Products", icon: "shopping_bag" },
  { name: "Countdown", icon: "schedule" },
  { name: "FAQ", icon: "contact_support" },
];

/** Blocks dropped onto a new page, which is then published. */
export function PageBuilderScene() {
  const dropAt = (index: number) => 0.5 + index * 0.7;
  return (
    <SceneFrame>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-bold text-slate-800">Eid campaign page</span>
        <PressButton label="Publish" doneLabel="Published" pressAt={3.4} className="w-28" />
      </div>
      <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[9rem_minmax(0,1fr)]">
        <Panel className="hidden space-y-1 sm:block">
          <Label className="mb-2">Blocks</Label>
          {BLOCKS.map((block, index) => (
            <span
              key={block.name}
              className="demo-flash flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-600"
              style={at(dropAt(index) - 0.3)}
            >
              <Icon name={block.icon} className="text-slate-400" />
              {block.name}
            </span>
          ))}
        </Panel>
        <Panel className="flex min-h-0 flex-col gap-2.5 bg-slate-50/80">
          <div
            className="demo-in flex h-16 shrink-0 flex-col justify-center rounded-xl px-3"
            style={{ ...at(dropAt(0)), background: BRAND_GRADIENT }}
          >
            <span className="block h-2.5 w-1/2 rounded-full bg-white/90" />
            <span className="mt-2 block h-4 w-14 rounded-full bg-white" />
          </div>
          <div className="demo-in grid shrink-0 grid-cols-4 gap-1.5" style={at(dropAt(1))}>
            {[0, 1, 2, 3].map((product) => (
              <span key={product} className="aspect-square rounded-lg bg-white shadow-sm" />
            ))}
          </div>
          <div
            className="demo-in flex shrink-0 items-center justify-between rounded-xl bg-slate-900 px-3 py-2"
            style={at(dropAt(2))}
          >
            <span className="text-[10px] font-bold tracking-wider text-white/70 uppercase">
              Offer ends in
            </span>
            <span className="flex gap-1">
              {[0, 1, 2].map((unit) => (
                <span key={unit} className="h-5 w-6 rounded bg-white/15" />
              ))}
            </span>
          </div>
          <div className="demo-in shrink-0 space-y-1.5" style={at(dropAt(3))}>
            {[0, 1].map((row) => (
              <span
                key={row}
                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm"
              >
                <Bar className="w-2/3" />
                <span className="text-sm leading-none font-bold text-brand">+</span>
              </span>
            ))}
          </div>
        </Panel>
      </div>
    </SceneFrame>
  );
}
