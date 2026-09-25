import { Icon, type IconName } from "@/components/ui/icon";

import { SectionHeading } from "./section-heading";

// One shopper's order, start to finish. Each step is how every store works today
// (see src/data/features.ts); bKash and couriers use the merchant's own accounts.
const ORDER_JOURNEY: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "translate",
    title: "Browses in Bangla",
    text: "Storefronts open in Bangla, with English a tap away and prices in Taka.",
  },
  {
    icon: "location_on",
    title: "Checks out as a guest",
    text: "No account needed. The address follows Division, District and Upazila, and the delivery charge shows before ordering.",
  },
  {
    icon: "payments",
    title: "Pays on delivery or with bKash",
    text: "Cash on delivery works from day one. bKash appears once you connect your merchant account.",
  },
  {
    icon: "local_shipping",
    title: "Ships with a local courier",
    text: "You book Pathao, RedX or Steadfast from the order, with your own courier account.",
  },
  {
    icon: "route",
    title: "Follows the parcel",
    text: "The shopper sees the courier status on the order tracking page.",
  },
];

/** UrShop's Bangladesh focus, shown through the path of a single order. */
export function LocalCommerce() {
  return (
    <section
      aria-labelledby="local-commerce-heading"
      className="relative px-6 py-16 sm:py-24 lg:px-12"
    >
      <div
        className="liquid-glass reveal mx-auto max-w-6xl rounded-3xl px-6 py-10 sm:px-10 sm:py-14 lg:px-14"
        style={{ borderRadius: "32px" }}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading
            id="local-commerce-heading"
            eyebrow="Built for Bangladesh"
            title="Made around how Bangladesh shops and buys"
          />
          <p className="max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            UrShop&apos;s defaults start here: the language shoppers read, the currency they pay in,
            the way addresses are written and how parcels reach the door. Follow one order to see
            it.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          {/* The line that joins the steps: vertical on phones, horizontal on desktop. */}
          <span
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-5 w-px bg-linear-to-b from-brand/60 via-brand/30 to-brand/10 lg:top-5 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto lg:bg-linear-to-r"
          />
          <ol className="relative grid gap-8 lg:grid-cols-5 lg:gap-6">
            {ORDER_JOURNEY.map((step, index) => (
              <li
                key={step.title}
                className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4 lg:grid-cols-1 lg:justify-items-center lg:gap-0 lg:text-center"
              >
                <span
                  className="relative flex size-10 items-center justify-center rounded-2xl text-white shadow-sm ring-4 ring-white/80"
                  style={{ background: "linear-gradient(135deg, #08c0d8 0%, #0284c7 100%)" }}
                >
                  <Icon name={step.icon} />
                </span>
                <div className="lg:mt-5">
                  <p
                    aria-hidden="true"
                    className="text-[11px] font-bold tracking-[0.18em] text-slate-400 uppercase"
                  >
                    Step {index + 1}
                  </p>
                  <h3 className="mt-1 font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
