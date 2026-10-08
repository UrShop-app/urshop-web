import Link from "next/link";

import { DisclosureToggle } from "@/components/ui/disclosure-toggle";
import { Icon } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { faqById, faqCategories, type FaqLink } from "@/data/faq";
import { quickAnswerIds } from "@/data/resources";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

const totalAnswers = faqCategories.reduce((sum, category) => sum + category.questions.length, 0);

/** An answer's link; `#question` links point into the FAQ page from here. */
function AnswerLink({ link }: { link: FaqLink }) {
  const label = (
    <>
      {link.label}
      <span aria-hidden="true"> →</span>
    </>
  );
  if (link.href.startsWith("#")) {
    return (
      <Link href={`/faq${link.href}`} className={linkClass}>
        {label}
      </Link>
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

/**
 * A few common merchant questions, answered in place from `faq.ts`. Native `<details>`, so they
 * open without JavaScript.
 */
export function QuickAnswers() {
  return (
    <section
      aria-labelledby="quick-answers-heading"
      className="relative px-6 py-14 sm:py-20 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="reveal lg:sticky lg:top-36 lg:self-start">
          <SectionHeading
            id="quick-answers-heading"
            eyebrow="Quick answers"
            title="Questions merchants ask first"
          />
          <Link
            href="/faq"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-white/80 py-2.5 pr-4 pl-5 text-sm font-bold text-slate-800 shadow-glass transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            Browse all {totalAnswers} answers
            <Icon
              name="arrow_forward"
              className="text-brand transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div
          className="liquid-glass-card reveal reveal-delay-1 rounded-3xl p-2 sm:p-3"
          style={{ borderRadius: "28px" }}
        >
          <ul className="space-y-1">
            {quickAnswerIds.map((id) => {
              const question = faqById(id);
              return (
                <li key={id}>
                  <details className="faq-item group rounded-2xl border border-transparent transition-[background-color,border-color,box-shadow] duration-300 open:border-white open:bg-white/90 open:shadow-[0_12px_32px_-14px_rgba(2,132,199,0.22)] not-open:hover:bg-white/55">
                    <summary className="flex cursor-pointer list-none items-center gap-3 rounded-2xl px-4 py-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark sm:gap-5 sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
                      <h3 className="flex-1 text-base font-semibold text-slate-800 transition-colors duration-300 group-open:text-slate-900 group-hover:text-brand sm:text-lg">
                        {question.question}
                      </h3>
                      <DisclosureToggle />
                    </summary>
                    <div className="faq-answer space-y-3 px-4 pb-6 text-sm leading-relaxed text-slate-600 sm:pr-20 sm:pl-6 sm:text-base">
                      {question.answer.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      <p className="flex flex-wrap gap-x-5 gap-y-2">
                        {question.link ? <AnswerLink link={question.link} /> : null}
                        <Link href={`/faq#${id}`} className={linkClass}>
                          Open in the FAQ<span aria-hidden="true"> →</span>
                        </Link>
                      </p>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
