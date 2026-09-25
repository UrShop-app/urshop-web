import { Icon } from "@/components/ui/icon";

import { ContactForm } from "./contact-form";
import { CONTACT_TOPICS } from "./topics";

/** Who to write to about what (left) and the message form (right). */
export function ContactSection() {
  return (
    <section
      aria-labelledby="contact-form-heading"
      className="relative px-6 py-12 sm:py-16 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="reveal lg:sticky lg:top-36 lg:self-start">
          <h2 className="text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase">
            What we can help with
          </h2>
          <ul className="mt-6 space-y-6">
            {CONTACT_TOPICS.map((topic) => (
              <li key={topic.id} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                  <Icon name={topic.icon} />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{topic.label}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{topic.guidance}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Platform role per the Terms of Service: shoppers buy from the merchant. */}
          <aside
            aria-label="Shopper orders"
            className="mt-8 flex gap-4 rounded-3xl border border-amber-200/80 bg-amber-50/80 p-5"
          >
            <Icon name="shopping_bag" className="shrink-0 text-amber-700" />
            <p className="text-sm leading-relaxed text-slate-700">
              <span className="block font-bold text-slate-900">
                Bought from a shop that uses UrShop?
              </span>
              Please contact that shop about your order, delivery or refund. Each shop runs its own
              orders, so it&apos;s best placed to help.
            </p>
          </aside>
        </div>

        <div
          id="contact-form"
          className="liquid-glass-card reveal reveal-delay-1 scroll-mt-28 rounded-3xl p-6 sm:p-8 md:scroll-mt-36 lg:p-10"
          style={{ borderRadius: "28px" }}
        >
          <h2
            id="contact-form-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            Send us a message
          </h2>
          <p className="mt-2 mb-8 text-sm leading-relaxed text-slate-600 sm:text-base">
            Tell us a little about yourself and what you need. Fields without &ldquo;Optional&rdquo;
            are required.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
