import Link from "next/link";

import { Fact, FactList } from "@/components/ui/fact-list";
import { legalDocumentList, legalDocuments } from "@/config/legal";
import { siteConfig } from "@/config/site";

import { SectionHeading } from "./section-heading";

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/**
 * Who operates UrShop and how the platform relates to merchants and shoppers. Only publish
 * details that are already public elsewhere on the site (footer, legal pages); never guess.
 */
export function Company() {
  return (
    <section aria-labelledby="company-heading" className="relative px-6 py-16 sm:py-24 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
        <div className="reveal">
          <SectionHeading
            id="company-heading"
            eyebrow="The company"
            title="Clear about who does what"
          />
          {/* Summarises the Terms of Service and Privacy Policy; those pages stay authoritative. */}
          <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-slate-600">
            <p>
              UrShop provides the software. Each shop on it is an independent business, responsible
              for its own products, prices, fulfillment and customer service, and shoppers buy from
              that merchant.
            </p>
            <p>
              Customer information is scoped to the store where a shopper gives it and isn&apos;t
              intended to be shared with unrelated stores. Our{" "}
              <Link href={legalDocuments.privacyPolicy.path} className={linkClass}>
                {legalDocuments.privacyPolicy.navLabel}
              </Link>{" "}
              explains how we handle platform data.
            </p>
          </div>
        </div>

        <div
          className="liquid-glass-card reveal reveal-delay-1 rounded-3xl p-6 sm:p-8"
          style={{ borderRadius: "28px" }}
        >
          <FactList>
            <Fact term="Platform">
              {siteConfig.name} ·{" "}
              <span className="font-mono text-[0.95em]">{new URL(siteConfig.url).host}</span>
            </Fact>
            <Fact term="Based in">Bangladesh</Fact>
            <Fact term="Govt. trade registration">
              <span className="font-mono text-[0.95em]">{siteConfig.tradeRegistration}</span>
            </Fact>
            <Fact term="Contact">
              <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                {siteConfig.supportEmail}
              </a>
            </Fact>
            <Fact term="Policies">
              <ul className="flex flex-wrap gap-x-4 gap-y-1">
                {legalDocumentList.map((document) => (
                  <li key={document.path}>
                    <Link href={document.path} className={linkClass}>
                      {document.navLabel}
                    </Link>
                  </li>
                ))}
              </ul>
            </Fact>
          </FactList>
        </div>
      </div>
    </section>
  );
}
