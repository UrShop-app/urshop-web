import { faqById } from "@/data/faq";

import { FaqAccordion, type HomeFaqItem, type HomeFaqTab } from "./faq-accordion";

const tabs: ReadonlyArray<HomeFaqTab> = [
  { id: "common", label: "Common" },
  { id: "payments", label: "Payments & Delivery" },
  { id: "store", label: "Your Store" },
  { id: "marketing", label: "Marketing" },
];

// A short selection of the FAQ page's questions (src/data/faq.ts), so the answers stay in one
// place. The full list lives at /faq.
const homeFaqs: ReadonlyArray<{ id: string; tabs: ReadonlyArray<string> }> = [
  { id: "technical-skills", tabs: ["common", "store"] },
  { id: "payment-methods", tabs: ["common", "payments"] },
  { id: "couriers", tabs: ["common", "payments"] },
  { id: "need-domain", tabs: ["common", "store"] },
  { id: "tracking-pixels", tabs: ["common", "marketing"] },
  { id: "page-builder", tabs: ["common", "store"] },
  { id: "secure-cod", tabs: ["payments"] },
  { id: "bkash", tabs: ["payments"] },
  { id: "delivery-charges", tabs: ["payments"] },
  { id: "customize-storefront", tabs: ["store"] },
  { id: "bangla-english", tabs: ["store"] },
  { id: "coupons", tabs: ["marketing"] },
  { id: "seo", tabs: ["marketing"] },
  { id: "sms", tabs: ["marketing"] },
  { id: "ai-automatic-changes", tabs: ["marketing"] },
];

const faqs: ReadonlyArray<HomeFaqItem> = homeFaqs.map(({ id, tabs: itemTabs }) => {
  const { question, answer } = faqById(id);
  return { id, tabs: itemTabs, question, answer };
});

/** Home page FAQ: a few common questions by topic, with a link to the full FAQ page. */
export function Faq() {
  return <FaqAccordion tabs={tabs} faqs={faqs} />;
}
