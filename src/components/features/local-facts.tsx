import { Icon, type IconName } from "@/components/ui/icon";

const LOCAL_FACTS: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  {
    icon: "translate",
    title: "Bangla & English",
    text: "Both languages on every storefront, prices in Taka.",
  },
  {
    icon: "location_on",
    title: "Local addresses",
    text: "Division, District and Upazila at checkout.",
  },
  {
    icon: "payments",
    title: "Cash on delivery",
    text: "Works from day one; add bKash when ready.",
  },
  {
    icon: "local_shipping",
    title: "Local couriers",
    text: "Pathao, RedX and Steadfast, booked from orders.",
  },
];

/** The four things that make UrShop fit how Bangladeshi shops sell. */
export function LocalFacts() {
  return (
    <section aria-labelledby="local-facts-heading" className="relative px-6 pb-8 lg:px-12">
      <div
        className="liquid-glass reveal mx-auto max-w-6xl rounded-3xl p-6 sm:p-8"
        style={{ borderRadius: "28px" }}
      >
        <h2
          id="local-facts-heading"
          className="text-center text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase"
        >
          Made for selling in Bangladesh
        </h2>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {LOCAL_FACTS.map((fact) => (
            <li key={fact.title} className="flex gap-3.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                <Icon name={fact.icon} />
              </span>
              <span>
                <span className="block font-bold text-slate-900">{fact.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                  {fact.text}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
