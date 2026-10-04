import Link from "next/link";

import { Icon } from "@/components/ui/icon";
import { siteConfig } from "@/config/site";
import {
  faqById,
  faqCategories,
  popularFaqIds,
  type FaqCategory,
  type FaqLink,
  type FaqQuestion,
} from "@/data/faq";

import {
  FaqCategoryGate,
  FaqHiddenWhileSearching,
  FaqJumpLink,
  FaqNoResults,
  FaqQuestionItem,
} from "./faq-search";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

function AnswerLink({ link }: { link: FaqLink }) {
  const label = (
    <>
      {link.label}
      <span aria-hidden="true"> →</span>
    </>
  );
  if (link.href.startsWith("#")) {
    return (
      <FaqJumpLink id={link.href.slice(1)} className={linkClass}>
        {label}
      </FaqJumpLink>
    );
  }
  if (link.href.startsWith("/")) {
    return (
      <Link href={link.href} className={linkClass}>
        {label}
      </Link>
    );
  }
  return (
    <a href={link.href} className={linkClass}>
      {label}
    </a>
  );
}

function Answer({ question }: { question: FaqQuestion }) {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base">
      {question.answer.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {question.link ? (
        <p>
          <AnswerLink link={question.link} />
        </p>
      ) : null}
    </div>
  );
}

/** Category links: a sticky side list on large screens, a sideways-scrolling chip row below. */
function CategoryNav({ variant }: { variant: "aside" | "chips" }) {
  if (variant === "chips") {
    return (
      <nav aria-label="FAQ categories" className="-mx-6 mb-10 overflow-x-auto px-6 py-2 lg:hidden">
        <ul className="flex w-max gap-2">
          {faqCategories.map((category) => (
            <FaqCategoryGate key={category.id} categoryId={category.id} as="li">
              <a
                href={`#${category.id}`}
                className="glass-btn inline-flex items-center gap-2 rounded-full py-2 pr-4 pl-3 text-sm font-bold whitespace-nowrap text-slate-700 transition-all duration-300 hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <Icon name={category.icon} className="text-brand" />
                {category.navLabel}
              </a>
            </FaqCategoryGate>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav aria-label="FAQ categories" className="liquid-glass sticky top-32 rounded-3xl p-2">
      <p className="px-3 pt-2 pb-1 text-[11px] font-bold tracking-[0.16em] text-slate-500 uppercase">
        Categories
      </p>
      <ul>
        {faqCategories.map((category) => (
          <FaqCategoryGate key={category.id} categoryId={category.id} as="li">
            <a
              href={`#${category.id}`}
              className="flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
            >
              <Icon name={category.icon} className="text-brand" />
              <span className="min-w-0 flex-1">{category.navLabel}</span>
              <span className="text-xs text-slate-400 tabular-nums">
                {category.questions.length}
              </span>
            </a>
          </FaqCategoryGate>
        ))}
      </ul>
    </nav>
  );
}

/** Shortcuts to the most-asked questions, wherever they live on the page. */
function PopularQuestions() {
  return (
    <FaqHiddenWhileSearching>
      <section
        aria-labelledby="popular-questions-heading"
        className="liquid-glass-card reveal mb-14 rounded-3xl p-5 sm:mb-16 sm:p-7"
        style={{ borderRadius: "28px" }}
      >
        <h2
          id="popular-questions-heading"
          className="text-[12px] font-bold tracking-[0.18em] text-slate-500 uppercase"
        >
          Popular questions
        </h2>
        <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
          {popularFaqIds.map((id) => (
            <li key={id}>
              <FaqJumpLink
                id={id}
                className="group -mx-3 flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
              >
                <span className="min-w-0 flex-1 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900 sm:text-base">
                  {faqById(id).question}
                </span>
                <Icon
                  name="arrow_forward"
                  className="shrink-0 text-slate-300 transition-colors group-hover:text-brand"
                />
              </FaqJumpLink>
            </li>
          ))}
        </ul>
      </section>
    </FaqHiddenWhileSearching>
  );
}

function CategorySection({ category }: { category: FaqCategory }) {
  const headingId = `${category.id}-heading`;
  return (
    <FaqCategoryGate categoryId={category.id}>
      <section
        id={category.id}
        aria-labelledby={headingId}
        className="scroll-mt-24 md:scroll-mt-32"
      >
        <header className="reveal mb-5 flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
            <Icon name={category.icon} />
          </span>
          <div>
            <h2
              id={headingId}
              className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl"
            >
              {category.title}
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 sm:text-base">
              {category.description}
            </p>
          </div>
        </header>
        <div className="liquid-glass-card rounded-3xl p-2 sm:p-3" style={{ borderRadius: "28px" }}>
          <ul className="space-y-1">
            {category.questions.map((question) => (
              <FaqQuestionItem key={question.id} id={question.id} question={question.question}>
                <Answer question={question} />
              </FaqQuestionItem>
            ))}
          </ul>
        </div>
      </section>
    </FaqCategoryGate>
  );
}

/** Category navigation, popular shortcuts and every category's questions. */
export function FaqBrowser() {
  return (
    <div className="relative px-6 pb-8 lg:px-12">
      <div className="mx-auto max-w-6xl lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
        <aside className="hidden lg:block">
          <CategoryNav variant="aside" />
        </aside>

        <div className="min-w-0">
          <CategoryNav variant="chips" />
          <PopularQuestions />
          <div className="space-y-14 sm:space-y-16">
            {faqCategories.map((category) => (
              <CategorySection key={category.id} category={category} />
            ))}
          </div>
          <FaqNoResults>
            <p className="font-bold text-slate-800">We couldn&apos;t find a matching question.</p>
            <p className="mt-2 text-sm text-slate-500">
              Try a shorter word, or{" "}
              <Link href="/contact" className={linkClass}>
                ask our team
              </Link>{" "}
              at {siteConfig.supportEmail}.
            </p>
          </FaqNoResults>
        </div>
      </div>
    </div>
  );
}
