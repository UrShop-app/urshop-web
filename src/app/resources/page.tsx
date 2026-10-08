import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BrowseByGoal } from "@/components/resources/browse-by-goal";
import { ResourcesClosingCta } from "@/components/resources/closing-cta";
import { FeaturedResource } from "@/components/resources/featured";
import { ResourcesHero, ResourcesHeroBackdrop } from "@/components/resources/hero";
import { LearningPath } from "@/components/resources/learning-path";
import { ResourceLibrary } from "@/components/resources/library";
import { QuickAnswers } from "@/components/resources/quick-answers";
import {
  ResourceDiscoveryProvider,
  type AnswerEntry,
  type ResourceEntry,
} from "@/components/resources/resource-discovery";
import { WorkWithUs } from "@/components/resources/work-with-us";
import { faqCategories } from "@/data/faq";
import { resourceGoals, resources, resourceTypes } from "@/data/resources";
import { pageMetadata } from "@/lib/metadata";
import { normalizeSearchText } from "@/lib/search-text";

export const metadata = pageMetadata({
  path: "/resources",
  title: "Resources: Launch, Run and Grow Your Online Store | UrShop",
  description:
    "Learn to sell online in Bangladesh with UrShop: open your store, design your storefront, take cash on delivery and bKash, ship with Pathao, RedX and Steadfast, and grow with SEO, ad tracking and analytics.",
});

const goalsById = new Map(resourceGoals.map((goal) => [goal.id, goal]));

// Padded with a space so a term matches from the start of any word: includes(" " + term).
const resourceEntries: ReadonlyArray<ResourceEntry> = resources.map((resource) => {
  const goal = goalsById.get(resource.goal);
  const typeLabel = resourceTypes[resource.type].label;
  return {
    id: resource.id,
    goal: resource.goal,
    type: resource.type,
    title: resource.title,
    href: resource.href,
    label: [typeLabel, goal?.navLabel].filter(Boolean).join(" · "),
    text: ` ${normalizeSearchText(
      [
        resource.title,
        resource.description,
        typeLabel,
        goal?.title,
        goal?.navLabel,
        ...(resource.keywords ?? []),
        resource.searchText,
      ]
        .filter(Boolean)
        .join(" "),
    )}`,
  };
});

const answerEntries: ReadonlyArray<AnswerEntry> = faqCategories.flatMap((category) =>
  category.questions.map((question) => ({
    id: question.id,
    question: question.question,
    href: `/faq#${question.id}`,
    text: ` ${normalizeSearchText(
      [question.question, category.title, ...(question.keywords ?? [])].join(" "),
    )}`,
  })),
);

export default function ResourcesPage() {
  return (
    // `overflow-x-clip` (not hidden) keeps the root the scroll container for `.reveal`.
    <div className="relative overflow-x-clip bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <AmbientBackdrop />
      <ResourcesHeroBackdrop />

      <SiteHeader />

      <main className="relative z-10 w-full pt-[116px]">
        <ResourceDiscoveryProvider entries={resourceEntries} answers={answerEntries}>
          <ResourcesHero />
          <FeaturedResource />
          <BrowseByGoal />
          <ResourceLibrary />
        </ResourceDiscoveryProvider>
        <QuickAnswers />
        <LearningPath />
        <WorkWithUs />
        <ResourcesClosingCta />
      </main>

      <SiteFooter />
    </div>
  );
}
