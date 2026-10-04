import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

import icon from "@/assets/icon.png";
import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { Icon, type IconName } from "@/components/ui/icon";
import { MetallicButton } from "@/components/ui/metallic-button";
import { ShopGrid, type ShopGridBeam, type ShopGridTile } from "@/components/ui/shop-grid";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const heroTiles: ReadonlyArray<ShopGridTile> = [
  { x: -13, y: 2, delay: -3 },
  { x: -9, y: 6, delay: -6.5 },
  { x: -5, y: 1, delay: -1.5 },
  { x: 5, y: 2, delay: -5 },
  { x: 10, y: 5, delay: -2 },
  { x: 13, y: 9, delay: -7 },
  { x: -3, y: 12, delay: -4, className: "sm:hidden" },
  { x: 4, y: 0, delay: -8, className: "sm:hidden" },
];

const heroBeams: ReadonlyArray<ShopGridBeam> = [
  { axis: "x", at: 4, delay: -2, duration: 10 },
  { axis: "y", at: -11, delay: -5, duration: 9 },
  { axis: "y", at: 12, delay: -1, duration: 11 },
];

/** Shop-grid backdrop behind the hero and header, rendered by the page (see home `HeroBackdrop`). */
export function IntegrationsHeroBackdrop() {
  return (
    <ShopGrid
      tiles={heroTiles}
      beams={heroBeams}
      className="shop-grid-hero inset-x-0 top-0 z-0 h-[760px] md:h-[880px]"
    />
  );
}

// Hub geometry in the SVG's 1000 × 560 viewBox; nodes are positioned over it in percent.
const HUB = { x: 500, y: 330 };

type HubNode = {
  id: string;
  x: number;
  y: number;
  title: string;
  icon: IconName;
  content: ReactNode;
  /** Seconds after load when this connection lights up. */
  delay: number;
  /** "in": signals travel into the store (payments); "out": from the store to the service. */
  direction: "in" | "out";
};

const logo = "h-6 w-auto";

const NODES: ReadonlyArray<HubNode> = [
  {
    id: "payments",
    x: 165,
    y: 120,
    title: "Payments",
    icon: "account_balance_wallet",
    content: <Image src={bkash} alt="bKash" sizes="96px" className={logo} />,
    delay: 0.5,
    direction: "in",
  },
  {
    id: "delivery",
    x: 165,
    y: 470,
    title: "Delivery",
    icon: "local_shipping",
    content: (
      <span className="flex flex-wrap items-center gap-2">
        <Image src={pathao} alt="Pathao" sizes="80px" className="h-5 w-auto" />
        <Image src={redx} alt="RedX" sizes="80px" className="h-5 w-auto rounded" />
        <Image src={steadfast} alt="Steadfast" sizes="96px" className="h-4 w-auto" />
      </span>
    ),
    delay: 0.9,
    direction: "out",
  },
  {
    id: "messaging",
    x: 835,
    y: 470,
    title: "SMS",
    icon: "forum",
    content: <span className="text-sm font-extrabold text-slate-800">BulkSMSBD</span>,
    delay: 1.3,
    direction: "out",
  },
  {
    id: "measurement",
    x: 835,
    y: 120,
    title: "Measurement",
    icon: "ads_click",
    content: (
      <span className="text-sm font-extrabold text-balance text-slate-800">
        Meta · TikTok · GTM
      </span>
    ),
    delay: 1.7,
    direction: "out",
  },
  {
    id: "domain",
    x: 500,
    y: 62,
    title: "Domain",
    icon: "language",
    content: <span className="text-sm font-extrabold text-slate-800">Your own domain</span>,
    delay: 2.1,
    direction: "in",
  },
];

function at(seconds: number): CSSProperties {
  return { "--d": `${seconds}s` } as CSSProperties;
}

/** "Connect" flips to "Connected" when the node's connection lights up. */
function StatusPill({ delay }: { delay: number }) {
  return (
    <span className="grid text-[11px] font-bold *:[grid-area:1/1]">
      <span
        className="demo-out rounded-full bg-slate-100 px-2 py-0.5 text-slate-500"
        style={at(delay)}
      >
        Connect
      </span>
      <span
        className="demo-pop flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-emerald-700"
        style={at(delay)}
      >
        <span className="size-1.5 rounded-full bg-emerald-500" />
        Connected
      </span>
    </span>
  );
}

function NodeCard({ node, className }: { node: HubNode; className?: string }) {
  return (
    <div
      className={cn("liquid-glass-card demo-in flex flex-col gap-2.5 rounded-2xl p-3.5", className)}
      style={{ ...at(node.delay - 0.35), borderRadius: "20px" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-1.5">
        <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-slate-500 uppercase">
          <Icon name={node.icon} className="scale-75 text-brand" />
          {node.title}
        </span>
        <StatusPill delay={node.delay} />
      </div>
      <div className="flex min-h-7 min-w-0 items-center">{node.content}</div>
    </div>
  );
}

function Hub({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div className={cn("relative mx-auto w-fit", className)} style={style}>
      <div className="integration-hub liquid-glass relative flex size-24 items-center justify-center rounded-full lg:size-28">
        <Image src={icon} alt="" sizes="64px" className="h-11 w-auto lg:h-13" />
      </div>
      <span className="absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-xs font-bold whitespace-nowrap text-slate-700 shadow-sm">
        Your store
      </span>
    </div>
  );
}

function signalPath(node: HubNode) {
  return node.direction === "in"
    ? `M${node.x} ${node.y} L${HUB.x} ${HUB.y}`
    : `M${HUB.x} ${HUB.y} L${node.x} ${node.y}`;
}

/** The store at the centre, each service connecting in turn, then signals flowing. CSS + SVG only. */
function ConnectedHub() {
  return (
    <div aria-hidden="true" className="select-none">
      {/* Tablet and up: hub with spokes. */}
      <div className="relative mx-auto hidden aspect-[1000/560] max-w-5xl md:block">
        <svg viewBox="0 0 1000 560" className="absolute inset-0 size-full overflow-visible">
          <defs>
            <linearGradient id="spoke" x1="0" x2="1">
              <stop offset="0%" stopColor="#08c0d8" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#08c0d8" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
            </linearGradient>
          </defs>
          {NODES.map((node) => (
            <g key={node.id}>
              <path
                d={`M${node.x} ${node.y} L${HUB.x} ${HUB.y}`}
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d={`M${node.x} ${node.y} L${HUB.x} ${HUB.y}`}
                pathLength={1}
                className="demo-draw"
                style={at(node.delay)}
                stroke="url(#spoke)"
                strokeWidth="2.5"
                fill="none"
              />
              {[0, 1.3].map((offset) => (
                <circle key={offset} className="hub-signal" r="5" fill="#08c0d8" opacity="0">
                  <animateMotion
                    path={signalPath(node)}
                    dur="2.6s"
                    begin={`${node.delay + 0.8 + offset}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;1;0"
                    keyTimes="0;0.15;0.8;1"
                    dur="2.6s"
                    begin={`${node.delay + 0.8 + offset}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </g>
          ))}
        </svg>

        <Hub
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${HUB.x / 10}%`, top: `${(HUB.y / 560) * 100}%` }}
        />
        {NODES.map((node) => (
          <div
            key={node.id}
            className="absolute w-[11.5rem] -translate-x-1/2 -translate-y-1/2 lg:w-[13rem]"
            style={{ left: `${node.x / 10}%`, top: `${(node.y / 560) * 100}%` }}
          >
            <NodeCard node={node} />
          </div>
        ))}
      </div>

      {/* Phones: hub above a grid of the same connections. */}
      <div className="md:hidden">
        <Hub />
        <div className="flow-line flow-line-y mx-auto mt-9 h-8 w-4">
          <span className="flow-packet" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {NODES.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              className={node.id === "domain" ? "col-span-2" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function IntegrationsHero() {
  return (
    <section
      aria-labelledby="integrations-hero-heading"
      className="relative px-6 pt-14 pb-14 sm:pt-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <span className="liquid-pill mb-8 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
          Integrations
        </span>
        <h1
          id="integrations-hero-heading"
          className="mb-6 text-4xl leading-[1.15] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl lg:text-6xl"
        >
          Your commerce tools, <span className="cyan-underline px-1">connected</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
          Payments, couriers, SMS and ad tracking, working together around every order. Connect the
          accounts you already use.
        </p>
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
          <MetallicButton label="Start Free Trial" href={siteConfig.adminSignUpUrl} />
          <a
            href="#order-journey"
            className="glass-btn inline-flex h-11.5 items-center gap-2 rounded-full pr-6 pl-4 text-sm font-bold text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            <Icon name="route" className="text-brand" />
            Follow an order
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-5xl sm:mt-14">
        <ConnectedHub />
        <p className="sr-only">
          Your store at the centre, connected to bKash for payments, Pathao, RedX and Steadfast for
          delivery, BulkSMSBD for SMS, Meta, TikTok and Google Tag Manager for measurement, and your
          own domain.
        </p>
      </div>
    </section>
  );
}
