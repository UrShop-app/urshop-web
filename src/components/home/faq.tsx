"use client";

import { useState } from "react";

import { Icon } from "@/components/ui/icon";

type FaqCategory = "all" | "storefront" | "admin" | "meta";

const categories: ReadonlyArray<{ id: FaqCategory; label: string }> = [
  { id: "all", label: "Common" },
  { id: "storefront", label: "Storefront" },
  { id: "admin", label: "Admin Dashboard" },
  { id: "meta", label: "Meta Ads & Landing Pages" },
] as const;

const faqs: ReadonlyArray<{
  id: string;
  categories: ReadonlyArray<FaqCategory>;
  question: string;
  answer: string;
}> = [
  {
    id: "technical",
    categories: ["all", "storefront"],
    question: "Do I need technical skills or a registered company to start?",
    answer:
      "No. You don't need coding knowledge or prior server setup. You can start with your personal NID and personal or merchant bKash/Nagad number. We handle hosting, SSL certificates, payment processing, and courier bookings.",
  },
  {
    id: "payouts",
    categories: ["all", "admin"],
    question: "How do payouts work for bKash, Nagad, and Card transactions?",
    answer:
      "Payments collected via online MFS (bKash/Nagad) or Visa/Mastercard are automatically credited to your merchant ledger. Payouts are transferred directly to your bank account or MFS wallet on automated settlement cycles.",
  },
  {
    id: "courier",
    categories: ["all", "admin"],
    question: "How does automated courier dispatch function?",
    answer:
      "When a buyer places a physical order, you can approve it with one click. UrShop calls Pathao, Steadfast, or RedX APIs instantly, generates shipping labels, and assigns a rider to your pickup address while sending tracking SMS to your buyer.",
  },
  {
    id: "products",
    categories: ["all", "storefront"],
    question: "Can I sell digital downloads and physical products in the same store?",
    answer:
      "Yes! UrShop is unified commerce. You can have a physical hoodie and a downloadable Lightroom preset catalog running from the exact same storefront link with independent checkout flows.",
  },
  {
    id: "capi",
    categories: ["all", "meta"],
    question: "How does Meta Conversions API & Pixel tracking work with UrShop?",
    answer:
      "UrShop comes with native server-side Meta Conversions API (CAPI) and browser Pixel integration. Add your Pixel ID in one field to bypass iOS tracking drop-offs, deduplicate standard events (PageView, AddToCart, Purchase), and improve ad ROAS instantly.",
  },
  {
    id: "landing-pages",
    categories: ["all", "meta"],
    question: "Can I build standalone single-product landing pages for ads?",
    answer:
      "Yes! You can generate blazing-fast high-converting landing pages tailored specifically for Facebook and Instagram ad campaigns with frictionless 1-click checkout forms and automatic COD or MFS processing.",
  },
] as const;

/** Category filter is the homepage's only content interaction outside shared animated controls. */
export function Faq() {
  const [activeCategory, setActiveCategory] = useState<FaqCategory>("all");

  return (
    <section className="relative px-6 py-24 lg:px-12" id="faqs">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <span className="liquid-pill mb-1 inline-flex items-center justify-center rounded-full px-6 py-1.5 text-[12px] font-bold tracking-[0.18em] text-slate-600 uppercase select-none">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="mt-2 mb-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Everything you need to know
          </h2>
          <p className="text-base text-slate-600">
            Simple answers to get your business running immediately.
          </p>
        </div>

        <div className="mb-10 flex justify-center overflow-x-auto px-4">
          <div
            className="liquid-glass inline-flex max-w-full items-center gap-1.5 rounded-full p-1.5"
            id="faq-tab-container"
          >
            {categories.map((category) => {
              const active = category.id === activeCategory;
              return (
                <button
                  key={category.id}
                  type="button"
                  aria-pressed={active}
                  className={`faq-tab-btn cursor-pointer rounded-full px-7 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    active
                      ? "border border-white/30 text-white shadow-sm"
                      : "bg-transparent text-slate-600 hover:bg-white/50 hover:text-slate-900"
                  }`}
                  style={
                    active
                      ? {
                          background:
                            "linear-gradient(135deg, rgb(2, 132, 199) 0%, rgb(8, 192, 216) 100%)",
                          boxShadow:
                            "rgba(8, 192, 216, 0.35) 0px 4px 14px, rgba(255, 255, 255, 0.35) 0px 1px 1px inset",
                        }
                      : undefined
                  }
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="liquid-glass-card divide-y divide-slate-200/80 rounded-3xl px-6 py-2 sm:px-8"
          style={{ borderRadius: "24px" }}
        >
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              className="group py-6"
              open={index === 0}
              hidden={!faq.categories.includes(activeCategory)}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900 transition-colors group-hover:text-brand sm:text-lg">
                  {faq.question}
                </h3>
                <Icon
                  name="add"
                  className="shrink-0 text-brand transition-transform group-open:rotate-45"
                />
              </summary>
              <p className="mt-4 text-sm leading-relaxed font-normal text-slate-600 sm:text-base">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-12 text-center text-sm text-slate-600">
          Have more questions?{" "}
          <a className="font-semibold text-brand hover:underline" href="#">
            Chat with us
          </a>
          .
        </div>
      </div>
    </section>
  );
}
