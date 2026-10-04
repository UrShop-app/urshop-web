import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

import icon from "@/assets/icon.png";
import { contactHref } from "@/components/contact/topics";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

/*
 * Building blocks for the Partners page diagrams. They sketch commercial relationships, never
 * product screens: no partner dashboards, tracking, payouts, revenue figures or logos of
 * companies we don't work with. Clients and stores in them are clearly example content.
 */

export const BRAND_GRADIENT = "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)";

/** Starts a global `demo-*` / `partners-*` entrance `seconds` after mount. */
export function at(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

/** Contact form link with the partnership topic (and this path's subject) filled in. */
export function partnershipContactHref(subject?: string) {
  return contactHref({ topic: "partnership", subject });
}

export const textLinkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/**
 * Connector with signals travelling along it (`.flow-line`, globals.css section 11). `reverse`
 * runs them right-to-left (or bottom-to-top).
 */
export function Flow({
  axis = "x",
  reverse = false,
  delay = 0,
  className,
}: {
  axis?: "x" | "y";
  reverse?: boolean;
  delay?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flow-line block",
        axis === "y" && "flow-line-y",
        reverse && (axis === "x" ? "-scale-x-100" : "-scale-y-100"),
        className,
      )}
    >
      <span className="flow-packet" style={{ "--flow-delay": `${delay}s` } as CSSProperties} />
      <span
        className="flow-packet"
        style={{ "--flow-delay": `${delay - 1.2}s` } as CSSProperties}
      />
    </span>
  );
}

/** The UrShop mark in a glass circle with pulsing rings (`.integration-hub`). */
export function Hub({
  label,
  size = "md",
  className,
  style,
}: {
  label?: string;
  size?: "sm" | "md";
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={cn("relative w-fit shrink-0", className)} style={style}>
      <div
        className={cn(
          "integration-hub liquid-glass relative flex items-center justify-center rounded-full",
          size === "md" ? "size-24 lg:size-28" : "size-16",
        )}
      >
        <Image
          src={icon}
          alt=""
          sizes="64px"
          className={size === "md" ? "h-11 w-auto lg:h-13" : "h-8 w-auto"}
        />
      </div>
      {label ? (
        <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-xs font-bold whitespace-nowrap text-slate-700 shadow-sm">
          {label}
        </span>
      ) : null}
    </div>
  );
}

/** Eyebrow-sized label inside a diagram card. */
export function CardLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "block text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** One quiet line about how terms are set (no invented numbers), centred under a section. */
export function FinePrint({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "mx-auto flex w-fit max-w-full items-center justify-center gap-2 text-center text-sm text-slate-500",
        className,
      )}
    >
      <Icon name="info" className="shrink-0 scale-75 text-brand" />
      <span>{children}</span>
    </p>
  );
}

/** Small brand pill link, e.g. "Talk about this". */
export function PillLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-10 items-center gap-1.5 rounded-full border px-5 text-sm font-bold whitespace-nowrap text-white transition-all duration-300 hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95"
      style={{
        background: "linear-gradient(135deg, rgba(8, 192, 216, 0.96), rgba(2, 132, 199, 0.96))",
        borderColor: "rgba(255, 255, 255, 0.65)",
        boxShadow:
          "0 8px 24px -4px rgba(2, 132, 199, 0.4), inset 0 1.5px 2px rgba(255, 255, 255, 0.75)",
      }}
    >
      {children}
      <Icon name="arrow_forward" className="-mr-1 scale-75" />
    </Link>
  );
}

/** A Partners page section: centred heading, then its content. */
export function PartnersSection({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={cn(
        "relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id={`${id}-heading`}
          eyebrow={eyebrow}
          title={title}
          intro={intro}
          align="center"
          className="reveal"
        />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}
