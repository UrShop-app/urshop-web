import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { legalDocumentList, type LegalDocument } from "@/config/legal";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export type LegalSection = {
  /** Fragment id for deep links and the table of contents. Keep stable once published. */
  id: string;
  title: string;
  content: ReactNode;
};

const lastUpdatedFormat = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeZone: "UTC",
});

/** Mailto link to the support address, used inside legal copy. */
export function SupportEmailLink() {
  return <a href={`mailto:${siteConfig.supportEmail}`}>{siteConfig.supportEmail}</a>;
}

/**
 * Shared shell for the platform legal documents: site chrome, title with the "Last updated"
 * date, a switcher between the documents, an "On this page" index and the document body.
 * Optimised for reading and printing: solid surface, ~70ch measure, no motion.
 */
export function LegalPage({
  legalDocument,
  sections,
}: {
  legalDocument: LegalDocument;
  sections: ReadonlyArray<LegalSection>;
}) {
  const lastUpdated = lastUpdatedFormat.format(new Date(`${legalDocument.lastUpdated}T00:00:00Z`));

  return (
    <div className="relative min-h-screen bg-[#FAFBFD] text-slate-900 selection:bg-brand-light selection:text-brand-dark">
      <div className="print:hidden">
        <SiteHeader />
      </div>

      <main className="relative z-10 w-full px-4 pt-[104px] pb-20 sm:px-6 md:pt-[128px] lg:px-12 print:p-0">
        <div className="mx-auto max-w-5xl">
          <header className="border-b border-slate-200 pb-8 sm:pb-10">
            <p className="text-xs font-bold tracking-[0.18em] text-brand-dark uppercase">Legal</p>
            <h1 className="mt-3 text-3xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {legalDocument.title}
            </h1>
            <p className="mt-4 text-sm text-slate-600">
              Last updated: <time dateTime={legalDocument.lastUpdated}>{lastUpdated}</time>
            </p>

            <nav aria-label="Legal documents" className="mt-8 print:hidden">
              <ul className="flex flex-wrap gap-2">
                {legalDocumentList.map((item) => {
                  const isCurrent = item.path === legalDocument.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark",
                          isCurrent
                            ? "border-slate-900 bg-slate-900 text-white"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:text-slate-900",
                        )}
                      >
                        {item.navLabel}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </header>

          <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
            <aside className="print:hidden">
              <TableOfContents sections={sections} />
            </aside>

            <article className="legal-prose max-w-[70ch] rounded-card border border-slate-200 bg-white px-5 py-8 shadow-sm sm:px-10 sm:py-10 print:border-0 print:p-0 print:shadow-none">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-heading`}
                  className="scroll-mt-28 md:scroll-mt-36"
                >
                  <h2 id={`${section.id}-heading`}>{section.title}</h2>
                  {section.content}
                </section>
              ))}
            </article>
          </div>
        </div>
      </main>

      <div className="print:hidden">
        <SiteFooter />
      </div>
    </div>
  );
}

/** Collapsible on small screens (native <details>, no JS), always open and sticky on desktop. */
function TableOfContents({ sections }: { sections: ReadonlyArray<LegalSection> }) {
  const links = (
    <ol className="space-y-1 border-l border-slate-200">
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm leading-snug text-slate-600 transition-colors hover:border-brand-dark hover:text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <details className="group rounded-2xl border border-slate-200 bg-white lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-bold text-slate-900 [&::-webkit-details-marker]:hidden">
          On this page
          <svg
            className="h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <nav aria-label="On this page" className="px-5 pb-5">
          {links}
        </nav>
      </details>

      <nav aria-label="On this page" className="sticky top-36 hidden lg:block">
        <p className="mb-3 text-xs font-bold tracking-[0.18em] text-slate-500 uppercase">
          On this page
        </p>
        {links}
      </nav>
    </>
  );
}
