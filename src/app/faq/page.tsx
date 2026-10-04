import { FaqBrowser } from "@/components/faq/faq-browser";
import { FaqClosingCta } from "@/components/faq/closing-cta";
import { FaqSearchProvider, type FaqSearchEntry } from "@/components/faq/faq-search";
import { FaqHero, FaqHeroBackdrop } from "@/components/faq/hero";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { faqCategories } from "@/data/faq";
import { pageMetadata } from "@/lib/metadata";
import { normalizeSearchText } from "@/lib/search-text";

export const metadata = pageMetadata({
  path: "/faq",
  title: "FAQ | UrShop",
  description:
    "Answers to common questions about UrShop: creating your store, cash on delivery, bKash and Secure COD, Pathao, RedX and Steadfast couriers, custom domains, themes, staff access and what shoppers see.",
});

const searchEntries: ReadonlyArray<FaqSearchEntry> = faqCategories.flatMap((category) =>
  category.questions.map((question) => ({
    id: question.id,
    categoryId: category.id,
    text: ` ${normalizeSearchText(
      [question.question, ...question.answer, ...(question.keywords ?? [])].join(" "),
    )}`,
  })),
);

export default function FaqPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <FaqHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <FaqSearchProvider entries={searchEntries}>
          <FaqHero />
          <FaqBrowser />
        </FaqSearchProvider>
        <FaqClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
