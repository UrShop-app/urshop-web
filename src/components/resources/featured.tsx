import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import bkash from "@/assets/partners/bkash.png";
import pathao from "@/assets/partners/pathao.png";
import redx from "@/assets/partners/redx.png";
import steadfast from "@/assets/partners/steadfast.png";
import { CtaSecondaryLink } from "@/components/ui/cta-panel";
import { Icon, type IconName } from "@/components/ui/icon";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { featuredResource, resourceGoals, resourceTypes } from "@/data/resources";

// Every step is checked against src/data/features.ts (guest-checkout, cod-payment,
// bkash-payments, courier-integrations, order-tracking, sms-marketing).
type JourneyStep = {
  icon: IconName;
  title: string;
  text?: string;
  logos?: ReadonlyArray<StaticImageData>;
  chip?: string;
};

const journey: ReadonlyArray<JourneyStep> = [
  { icon: "shopping_cart_checkout", title: "Checkout", text: "One page, no account" },
  { icon: "payments", title: "Payment", logos: [bkash], chip: "COD" },
  { icon: "local_shipping", title: "Courier", logos: [pathao, redx, steadfast] },
  { icon: "forum", title: "Updates", text: "SMS + tracking page" },
  { icon: "check_circle", title: "Delivered", text: "Synced to the order" },
];

/**
 * The order's path as a rail of steps with a parcel travelling down it. Illustration only (real
 * partner logos, no fake screenshot); the loop pauses off screen and under reduced motion.
 */
function JourneyIllustration() {
  return (
    <PauseOffscreen className="featured-journey relative">
      <span className="featured-rail" aria-hidden="true">
        <span className="featured-packet">
          <Icon name="inventory_2" />
        </span>
      </span>
      <ol className="space-y-2.5">
        {journey.map((step, index) => (
          <li
            key={step.title}
            className="featured-step relative flex items-center gap-3.5 rounded-2xl border border-white/90 bg-white/85 py-2.5 pr-4 pl-2.5 shadow-[0_10px_24px_-14px_rgba(2,132,199,0.35)] backdrop-blur-md"
            style={{ "--step": index } as CSSProperties}
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand to-brand-dark text-white shadow-[0_8px_18px_-8px_rgba(2,132,199,0.7)]">
              <Icon name={step.icon} />
            </span>
            <span className="text-sm font-bold text-slate-900">{step.title}</span>
            <span className="ml-auto flex items-center gap-2 text-xs font-medium text-slate-500">
              {step.text}
              {step.logos?.map((logo) => (
                <Image key={logo.src} src={logo} alt="" sizes="56px" className="h-3.5 w-auto" />
              ))}
              {step.chip ? (
                <span className="rounded-md bg-slate-900 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {step.chip}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ol>
    </PauseOffscreen>
  );
}

/** The hub's lead resource, as a large editorial feature. */
export function FeaturedResource() {
  const resource = featuredResource;
  const goal = resourceGoals.find((item) => item.id === resource.goal);

  return (
    <section aria-labelledby="featured-resource-heading" className="relative px-6 pb-16 lg:px-12">
      <div
        className="liquid-glass-card reveal relative mx-auto grid max-w-6xl gap-10 overflow-clip p-7 sm:p-10 lg:grid-cols-2 lg:items-center lg:gap-14 lg:p-14"
        style={{ borderRadius: "32px" }}
      >
        <div
          className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-brand-cyan/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative">
          <p className="flex flex-wrap items-center gap-2 text-[12px] font-bold tracking-[0.16em] text-slate-500 uppercase">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-white">Featured</span>
            <span>{resourceTypes[resource.type].label}</span>
            {goal ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{goal.title}</span>
              </>
            ) : null}
          </p>
          <h2
            id="featured-resource-heading"
            className="mt-5 text-4xl leading-[1.1] font-extrabold tracking-tight text-balance text-slate-900 sm:text-5xl"
          >
            {resource.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-600 sm:text-lg">
            {resource.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href={resource.href}
              className="group inline-flex h-11.5 items-center justify-center gap-2 rounded-full bg-slate-900 px-7 text-sm font-bold text-white shadow-[0_12px_28px_-12px_rgba(15,23,42,0.6)] transition-all duration-300 hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark active:scale-95"
            >
              See the journey
              <Icon
                name="arrow_forward"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </Link>
            <CtaSecondaryLink href="/faq#payments-delivery">Quick answers</CtaSecondaryLink>
          </div>
        </div>
        <div className="relative">
          <JourneyIllustration />
        </div>
      </div>
    </section>
  );
}
