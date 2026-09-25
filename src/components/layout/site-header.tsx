import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/urshop-logo.png";

import { FloatingHeader } from "./floating-header";

/** Floating glass navigation bar. Pair it with `SiteFooter` on the same page. */
export function SiteHeader() {
  return (
    <FloatingHeader>
      <div className="mx-auto max-w-5xl px-3 pt-2 pb-2 md:px-6 md:pt-3">
        <div
          className="liquid-glass flex h-16 items-center justify-between gap-2 rounded-full px-[0.55rem] md:h-[86px] md:gap-4 md:px-8"
          style={{
            border: "1.5px solid rgba(255, 255, 255, 0.85)",
            boxShadow:
              "0 10px 30px -10px rgba(2, 132, 199, 0.1), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center transition-transform hover:scale-[1.02] active:scale-95"
            >
              <Image
                src={logo}
                alt="UrShop"
                sizes="120px"
                loading="eager"
                className="aspect-3/2 h-[3.25rem] w-auto max-w-[38vw] object-contain drop-shadow-sm md:h-20 md:max-w-[300px]"
              />
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-[0.35rem] md:shrink md:gap-6">
            {/* TODO: point to the dashboard login once it exists. */}
            <Link
              href="#"
              className="rounded-full px-2 py-[0.65rem] text-xs/[1.428571] font-bold whitespace-nowrap text-slate-700 transition-colors hover:bg-white/50 hover:text-slate-900 sm:leading-normal md:px-3 md:py-1.5 md:text-base"
            >
              Log in
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border px-[0.55rem] py-[0.65rem] text-[0.8rem]/[1.428571] font-bold whitespace-nowrap text-white transition-all duration-300 active:scale-95 sm:leading-normal md:px-7 md:py-2.5 md:text-base"
              style={{
                background:
                  "linear-gradient(135deg, rgba(8, 192, 216, 0.96), rgba(2, 132, 199, 0.96))",
                backdropFilter: "blur(14px)",
                borderColor: "rgba(255, 255, 255, 0.65)",
                boxShadow:
                  "0 8px 24px -4px rgba(2, 132, 199, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.75)",
              }}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </FloatingHeader>
  );
}
