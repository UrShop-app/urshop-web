"use client";

import { useRef } from "react";

import { AutoplayButton, Segmented } from "@/components/ui/demo-controls";
import { cn } from "@/lib/utils";

import { EXAMPLE_PRODUCTS, Glyph, Line, ProductArt, ScaledMock, THEME_LOOKS } from "./demo-kit";
import { useDemoAutoplay } from "@/lib/use-demo-autoplay";

type Device = "desktop" | "tablet" | "mobile";

const FRAME_WIDTH: Record<Device, string> = { desktop: "100%", tablet: "52%", mobile: "30%" };
const COLUMNS: Record<Device, string> = {
  desktop: "grid-cols-5",
  tablet: "grid-cols-3",
  mobile: "grid-cols-2",
};
const NAV_LINKS = ["Shop", "Sarees", "Home", "Sale"];
const PRODUCTS = [...EXAMPLE_PRODUCTS, ...EXAMPLE_PRODUCTS].slice(0, 10);
const look = THEME_LOOKS.classic;

// Desktop → tablet → phone → menu drawer → shopper scrolls the catalogue.
const STEPS: ReadonlyArray<{ device: Device; drawer: boolean; scrolled: boolean }> = [
  { device: "desktop", drawer: false, scrolled: false },
  { device: "tablet", drawer: false, scrolled: false },
  { device: "mobile", drawer: false, scrolled: false },
  { device: "mobile", drawer: true, scrolled: false },
  { device: "mobile", drawer: false, scrolled: true },
];
const STEP_FOR_DEVICE: Record<Device, number> = { desktop: 0, tablet: 1, mobile: 2 };

function Header({ device }: { device: Device }) {
  const isMobile = device === "mobile";
  return (
    <div
      className="flex items-center gap-[0.9em] border-b px-[1.1em] py-[0.8em]"
      style={{ borderColor: look.soft }}
    >
      {device === "desktop" ? null : <Glyph name="menu" className="text-[1.3em]" />}
      <span
        className={cn(
          "flex items-center gap-[0.4em] font-extrabold whitespace-nowrap",
          isMobile && "mx-auto",
        )}
      >
        <span className="size-[1.2em] rounded-[0.3em]" style={{ background: look.accent }} />
        Your brand
      </span>
      {device === "desktop" ? (
        <span className="flex gap-[1.2em] text-[0.9em]" style={{ color: look.muted }}>
          {NAV_LINKS.map((link) => (
            <span key={link}>{link}</span>
          ))}
        </span>
      ) : null}
      {isMobile ? null : (
        <span
          className="ml-auto flex h-[2.2em] min-w-0 flex-1 items-center gap-[0.5em] rounded-full px-[0.9em] text-[0.85em]"
          style={{ background: look.soft, color: look.muted, maxWidth: "22em" }}
        >
          <Glyph name="search" />
          Search products
        </span>
      )}
      <span className="flex gap-[0.8em] text-[1.25em]">
        {isMobile ? <Glyph name="search" /> : <Glyph name="heart" />}
        <Glyph name="bag" />
      </span>
    </div>
  );
}

function FilterSidebar() {
  return (
    <div className="w-[12em] shrink-0 space-y-[1.2em] pr-[0.5em]" style={{ color: look.muted }}>
      <p className="text-[0.95em] font-bold" style={{ color: look.ink }}>
        Filters
      </p>
      {["Category", "Price", "Availability"].map((group, groupIndex) => (
        <div key={group} className="space-y-[0.6em]">
          <p className="text-[0.8em] font-bold tracking-[0.08em] uppercase">{group}</p>
          {groupIndex === 1 ? (
            <span
              className="relative block h-[0.35em] rounded-full"
              style={{ background: look.soft }}
            >
              <span
                className="absolute inset-y-0 right-[30%] left-[15%] rounded-full"
                style={{ background: look.accent }}
              />
            </span>
          ) : (
            [0, 1, 2].map((option) => (
              <span key={option} className="flex items-center gap-[0.5em]">
                <span
                  className="size-[0.9em] rounded-[0.2em] border"
                  style={
                    option === 0
                      ? { background: look.accent, borderColor: look.accent }
                      : { borderColor: "#cbd5e1" }
                  }
                />
                <Line className="w-[6em]" />
              </span>
            ))
          )}
        </div>
      ))}
    </div>
  );
}

function Storefront({
  device,
  drawer,
  scrolled,
}: {
  device: Device;
  drawer: boolean;
  scrolled: boolean;
}) {
  const isMobile = device === "mobile";
  return (
    <div
      className="relative flex h-full flex-col overflow-hidden bg-white"
      style={{ color: look.ink }}
    >
      <Header device={device} />
      <div className="flex min-h-0 flex-1 gap-[1.2em] overflow-hidden p-[1.1em]">
        {device === "desktop" ? <FilterSidebar /> : null}
        <div
          className={cn(
            "min-w-0 flex-1 transition-transform duration-[1600ms] ease-[cubic-bezier(0.45,0,0.2,1)] motion-reduce:transition-none",
            isMobile && scrolled ? "-translate-y-[40%]" : "translate-y-0",
          )}
        >
          <div className="mb-[0.9em] flex items-center justify-between gap-[0.6em]">
            <p className="text-[1.1em] font-extrabold">Sarees & more</p>
            {device === "desktop" ? (
              <span className="text-[0.8em]" style={{ color: look.muted }}>
                Sort: Newest
              </span>
            ) : (
              <span
                className="flex items-center gap-[0.4em] rounded-full border px-[0.8em] py-[0.3em] text-[0.8em] font-semibold"
                style={{ borderColor: "#e2e8f0" }}
              >
                <Glyph name="filter" />
                Filters
              </span>
            )}
          </div>
          <div className={cn("grid gap-[0.8em]", COLUMNS[device])}>
            {PRODUCTS.map((product, index) => (
              <div key={`${product.name}-${index}`} className="min-w-0">
                <ProductArt product={product} className="aspect-square rounded-[0.45em]" />
                <p className="mt-[0.4em] truncate text-[0.8em] font-semibold">{product.name}</p>
                <p className="text-[0.8em] font-bold">{product.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone bottom tab bar */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 flex justify-around border-t bg-white/95 py-[0.8em] text-[1.3em] backdrop-blur transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMobile ? "translate-y-0" : "translate-y-full",
        )}
        style={{ borderColor: look.soft, color: look.muted }}
      >
        <Glyph name="home" style={{ color: look.accent }} />
        <Glyph name="grid" />
        <Glyph name="search" />
        <Glyph name="heart" />
        <Glyph name="bag" />
      </div>

      {/* Phone navigation drawer */}
      <div
        className={cn(
          "absolute inset-0 bg-slate-900/30 transition-opacity duration-500",
          isMobile && drawer ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />
      <div
        className={cn(
          "absolute inset-y-0 left-0 w-[75%] space-y-[1em] bg-white p-[1.2em] shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          isMobile && drawer ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <p className="font-extrabold">Menu</p>
        {NAV_LINKS.map((link) => (
          <p
            key={link}
            className="border-b pb-[0.6em] text-[0.95em]"
            style={{ borderColor: look.soft }}
          >
            {link}
          </p>
        ))}
      </div>
    </div>
  );
}

/**
 * The same example storefront in a desktop browser, a tablet and a phone. The layout changes
 * with the device: grid columns, filters (sidebar → button), header, the phone's bottom tab bar
 * and slide-in menu.
 */
export function ResponsiveDemo() {
  const demoRef = useRef<HTMLDivElement>(null);
  const demo = useDemoAutoplay(demoRef, { durations: [3000, 2800, 2000, 2000, 2600] });
  const { device, drawer, scrolled } = STEPS[demo.step] ?? STEPS[0]!;
  const isDesktop = device === "desktop";

  return (
    <div ref={demoRef}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Segmented
          label="Device"
          value={device}
          onChange={(value) => demo.goTo(STEP_FOR_DEVICE[value])}
          options={[
            { value: "desktop", label: "Desktop", icon: "desktop_windows" },
            { value: "tablet", label: "Tablet", icon: "tablet_mac" },
            { value: "mobile", label: "Phone", icon: "smartphone" },
          ]}
        />
        <AutoplayButton demo={demo} />
      </div>

      <ScaledMock className="aspect-[16/10]" scale={1.3}>
        <div className="flex h-full items-center justify-center">
          <div
            className={cn(
              "h-full overflow-hidden transition-[width,border-radius,padding,background-color] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none",
              isDesktop
                ? "rounded-[1.2em] border border-white bg-white p-0 shadow-[0_32px_64px_-24px_rgba(2,132,199,0.3)]"
                : "rounded-[2.4em] bg-slate-900 p-[0.6em] shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)]",
            )}
            style={{ width: FRAME_WIDTH[device] }}
          >
            <div
              className={cn(
                "flex h-full flex-col overflow-hidden bg-white transition-[border-radius] duration-700",
                isDesktop ? "rounded-none" : "rounded-[1.9em]",
              )}
            >
              {isDesktop ? (
                <div className="flex shrink-0 gap-[0.4em] border-b border-slate-100 bg-slate-50 px-[1em] py-[0.7em]">
                  <span className="size-[0.7em] rounded-full bg-slate-200" />
                  <span className="size-[0.7em] rounded-full bg-slate-200" />
                  <span className="size-[0.7em] rounded-full bg-slate-200" />
                </div>
              ) : null}
              <div className="min-h-0 flex-1">
                <Storefront device={device} drawer={drawer} scrolled={scrolled} />
              </div>
            </div>
          </div>
        </div>
      </ScaledMock>
      <p className="sr-only">
        The example storefront on desktop shows a filter sidebar and five product columns; on a
        tablet the filters move behind a button and the grid has three columns; on a phone the grid
        has two columns, a menu slides in from the side and a tab bar sits at the bottom.
      </p>
    </div>
  );
}
