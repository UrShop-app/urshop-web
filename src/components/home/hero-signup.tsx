"use client";

import { MetallicButton } from "@/components/ui/metallic-button";

/** The approved address selector remains intentionally inactive until onboarding is available. */
export function HeroSignup() {
  return (
    <div
      className="hero-signup-capsule mt-8 mb-10 w-full max-w-md rounded-full border p-2 transition-all duration-300 hover:shadow-2xl sm:mt-12"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.88) 0%, rgba(240, 249, 255, 0.75) 50%, rgba(224, 242, 254, 0.55) 100%)",
        backdropFilter: "blur(24px) saturate(190%)",
        border: "1.5px solid rgba(255, 255, 255, 0.95)",
        boxShadow:
          "0 16px 36px -8px rgba(2, 132, 199, 0.15), 0 2px 6px 0 rgba(0, 0, 0, 0.04), inset 0 1.5px 2px rgba(255, 255, 255, 1), inset 0 -2px 6px rgba(8, 192, 216, 0.08)",
      }}
    >
      <form
        className="hero-signup-form flex flex-col items-center justify-between gap-2 pr-1 pl-4 sm:flex-row"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full min-w-0 items-center rounded-full bg-transparent px-2 py-2.5 sm:w-auto">
          <label
            className="flex min-w-0 items-center justify-start gap-1 font-sans text-sm"
            aria-label="Choose your UrShop address"
          >
            <input
              className="brand-name-input w-32 min-w-0 bg-transparent font-medium text-slate-700 outline-none placeholder:text-slate-400 sm:w-36"
              type="text"
              name="brand-name"
              placeholder="your brand name"
              autoComplete="organization"
              aria-label="Brand name"
            />
            <span className="font-bold tracking-tight text-brand">.urshop.app</span>
          </label>
        </div>
        <MetallicButton label="Start my Shop" href="/pricing" className="w-full sm:w-auto" />
      </form>
    </div>
  );
}
