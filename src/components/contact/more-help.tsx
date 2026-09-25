import Link from "next/link";

import { Fact, FactList } from "@/components/ui/fact-list";
import { Icon, type IconName } from "@/components/ui/icon";
import { legalDocumentList, legalDocuments } from "@/config/legal";
import { siteConfig } from "@/config/site";

const HELP_LINKS: ReadonlyArray<{ icon: IconName; title: string; text: string; href: string }> = [
  {
    icon: "apps",
    title: "See what UrShop includes",
    text: "Every feature, with what's available now and what's still coming.",
    href: "/features",
  },
  {
    icon: "storefront",
    title: "Learn about UrShop",
    text: "What we're building, who it's for and the principles behind it.",
    href: "/about",
  },
  {
    icon: "privacy_tip",
    title: "Privacy or data deletion request",
    text: "How to ask us to delete account data, and what to include.",
    href: legalDocuments.dataDeletion.path,
  },
];

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

/** Self-serve pages worth checking first, and the company details already published on the site. */
export function MoreHelp() {
  return (
    <section aria-labelledby="more-help-heading" className="relative px-6 py-16 sm:py-20 lg:px-12">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <h2
            id="more-help-heading"
            className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
          >
            Other places to look
          </h2>
          <ul className="mt-6 divide-y divide-slate-200/80 border-y border-slate-200/80">
            {HELP_LINKS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group -mx-3 flex items-center gap-4 rounded-2xl px-3 py-4 transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-brand-light text-brand-dark">
                    <Icon name={item.icon} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold text-slate-900">{item.title}</span>
                    <span className="mt-0.5 block text-sm leading-relaxed text-slate-600">
                      {item.text}
                    </span>
                  </span>
                  <Icon
                    name="arrow_forward"
                    className="shrink-0 text-slate-400 transition-colors group-hover:text-brand"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal reveal-delay-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Company details
          </h2>
          <div
            className="liquid-glass-card mt-6 rounded-3xl p-6 sm:p-8"
            style={{ borderRadius: "28px" }}
          >
            <FactList>
              <Fact term="Company">
                {siteConfig.name} ·{" "}
                <span className="font-mono text-[0.95em]">{new URL(siteConfig.url).host}</span>
              </Fact>
              <Fact term="Email">
                <a href={`mailto:${siteConfig.supportEmail}`} className={linkClass}>
                  {siteConfig.supportEmail}
                </a>
              </Fact>
              <Fact term="Based in">Bangladesh</Fact>
              <Fact term="Govt. trade registration">
                <span className="font-mono text-[0.95em]">{siteConfig.tradeRegistration}</span>
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
      </div>
    </section>
  );
}
