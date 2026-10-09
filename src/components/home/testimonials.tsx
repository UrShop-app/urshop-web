import { PersonAvatar, type PersonPortrait } from "@/components/ui/person-avatar";

const testimonials = [
  {
    quote:
      "We used to spend four hours every evening manually pasting customer addresses into Pathao and checking bKash transaction IDs. UrShop automated everything. Orders ship the same hour.",
    name: "Tanzeela Chowdhury",
    role: "Founder, Clay & Loom",
    portrait: "jamdani",
  },
  {
    quote:
      "Selling digital presets across Bangladesh used to fail because global platforms do not take bKash. UrShop let me launch my digital shop in 10 minutes and receive funds directly.",
    name: "Sabbir Hossain",
    role: "Creator, PixelCraft Assets",
    portrait: "creator",
  },
  {
    quote:
      "Direct Steadfast & RedX synchronization cut our courier return rate by 30%. Buyers receive automatic SMS notifications. It is genuinely the Shopify built for Bangladesh.",
    name: "Farhan Akhtar",
    role: "Co-founder, ModestWear BD",
    portrait: "glasses",
  },
] satisfies ReadonlyArray<{ quote: string; name: string; role: string; portrait: PersonPortrait }>;

function TestimonialSet({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className="testimonial-set" aria-hidden={hidden || undefined}>
      {testimonials.map((testimonial) => (
        <article
          key={testimonial.name}
          className="liquid-glass-card glass-lift flex flex-col justify-between rounded-card p-7 transition-all duration-300 hover:-translate-y-1"
        >
          <p className="mb-6 text-sm leading-relaxed font-normal text-slate-700">
            &quot;{testimonial.quote}&quot;
          </p>
          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <PersonAvatar
                portrait={testimonial.portrait}
                size={40}
                className="size-10 rounded-full border border-slate-200 object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">{testimonial.name}</h3>
                <p className="text-xs text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/** Illustrative merchant stories repeat once to create the uninterrupted source marquee. */
export function Testimonials() {
  return (
    <section className="relative px-6 py-24 lg:px-12" id="testimonials">
      <div className="mx-auto max-w-5xl">
        <div className="reveal mb-16 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="liquid-pill mb-1 inline-flex items-center justify-center rounded-full px-5 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
              MERCHANT STORIES
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Made for local entrepreneurs
            </h2>
            <p className="mt-3 text-sm text-slate-500">
              Illustrative stories with fictional names and AI-generated portraits.
            </p>
          </div>
        </div>
        <div
          className="testimonial-marquee reveal reveal-delay-1"
          aria-label="Illustrative merchant stories"
        >
          <div className="testimonial-track">
            <TestimonialSet />
            <TestimonialSet hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
