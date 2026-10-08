import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/logo-white.png";
import { LocationMap } from "@/components/ui/location-map";
import { legalDocuments } from "@/config/legal";
import { siteConfig } from "@/config/site";

// Only link to pages that exist. No "#" placeholders.
const LINK_COLUMNS = {
  platform: [
    { label: "Features", href: "/features" },
    { label: "Themes", href: "/themes" },
    { label: "Integrations", href: "/integrations" },
    { label: "Security", href: "/security" },
    { label: "FAQ", href: "/faq" },
    { label: "Resources", href: "/resources" },
    { label: "Blog", href: "/blog" },
    { label: "Login", href: siteConfig.adminSignInUrl },
    { label: "Report", href: "/report" },
    { label: "Feature Request", href: "/feature-request" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "About Us", href: "/about" },
    { label: legalDocuments.privacyPolicy.navLabel, href: legalDocuments.privacyPolicy.path },
    { label: legalDocuments.terms.navLabel, href: legalDocuments.terms.path },
    { label: legalDocuments.dataDeletion.navLabel, href: legalDocuments.dataDeletion.path },
  ],
};

// Only payment methods shoppers can use today (src/data/features.ts: bkash-payments, cod-payment).
// Don't add gateways, cards, banks or wallets until they are live.
const PAYMENT_BADGES = [
  { label: "bKash", className: "px-1.5 bg-[#E2136E] text-[9px] font-bold text-white" },
  {
    label: "Cash on delivery",
    className: "px-2 border border-white/10 bg-slate-800 text-[8px] font-bold text-slate-300",
  },
];

const footerLinkClass = "text-sm text-slate-400 transition-colors hover:text-white";

function FooterLinks({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="mb-1 text-sm font-bold text-white">{title}</span>
      {links.map((link) => (
        <Link key={link.label} href={link.href} className={footerLinkClass}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

/** Dark site footer. Its `id` is observed by the floating header (see FloatingHeader). */
export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full border-t border-white/10 bg-[#070B12] text-slate-400"
    >
      {/* Brand glow along the top edge (negative z: under the content, above the background). */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-px -z-10 h-px bg-linear-to-r from-transparent via-brand/70 to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-48 w-full max-w-4xl -translate-x-1/2 bg-[radial-gradient(ellipse_50%_100%_at_50%_0%,rgba(8,192,216,0.14),transparent)]"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12">
        <div className="grid grid-cols-1 gap-10 pb-16 md:grid-cols-12 lg:gap-12">
          {/* Brand, registration and app badges */}
          <div className="flex flex-col items-start gap-5 md:col-span-4">
            <Link href="/" className="inline-block">
              <Image
                src={logo}
                alt="UrShop"
                sizes="120px"
                className="aspect-3/2 h-20 w-auto max-w-[280px] object-contain drop-shadow-sm"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Empowering businesses and creators in Bangladesh to scale with ease. We provide the
              secure tools you need to build, grow, and automate your store.
            </p>

            <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs">
              <span className="flex items-center gap-1.5 font-semibold tracking-wider text-emerald-400">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                GOVT. REG
              </span>
              <span className="text-slate-500">|</span>
              <span className="font-medium text-slate-300">{siteConfig.tradeRegistration}</span>
            </div>

            {/* <div className="mt-2">
              <span className="mb-3 block text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                GET THE APP
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="#"
                  className="inline-flex w-36 items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-left text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  <svg
                    className="h-6 w-6 fill-current text-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.99.6-2.61 1.34-.55.63-1.03 1.66-.9 2.68 1 .08 2.02-.51 2.58-1.17z" />
                  </svg>
                  <div className="leading-none">
                    <span className="block text-[9px] tracking-wider text-slate-400 uppercase">
                      Download on
                    </span>
                    <span className="mt-0.5 block text-xs font-bold text-white">App Store</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex w-36 items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3.5 py-2 text-left text-white transition-colors hover:border-white/40 hover:bg-white/10"
                >
                  <svg
                    className="h-6 w-6 fill-current text-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.124 2.124 0 0 1-.61-1.516V3.33c0-.58.225-1.127.609-1.516zm11.238 11.241l2.456 2.456-11.83 6.76 9.374-9.216zm2.456-4.055L14.847 11.45 5.473 2.234l11.83 6.766zm1.096 1.096l2.951 1.686c.92.525.92 1.383 0 1.908l-2.951 1.686-2.186-2.64 2.186-2.64z" />
                  </svg>
                  <div className="leading-none">
                    <span className="block text-[9px] tracking-wider text-slate-400 uppercase">
                      GET IT ON
                    </span>
                    <span className="mt-0.5 block text-xs font-bold text-white">Google Play</span>
                  </div>
                </a>
              </div>
            </div> */}
          </div>

          <div className="md:col-span-3">
            <FooterLinks title="Platform" links={LINK_COLUMNS.platform} />
          </div>

          <div className="md:col-span-2">
            <FooterLinks title="Legal" links={LINK_COLUMNS.legal} />
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-6 md:col-span-3">
            <div>
              <span className="mb-3 block text-sm font-bold text-white">Contact</span>
              <div
                className="min-h-[140px] w-full max-w-[280px]"
                aria-label="UrShop Bangladesh location map"
              >
                <LocationMap
                  location="Dhaka, Bangladesh"
                  coordinates="23.8103° N, 90.4125° E"
                  className="max-w-[280px]"
                />
              </div>
            </div>

            <div className="pt-1">
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="text-lg font-extrabold text-white underline decoration-brand-cyan decoration-2 underline-offset-4 transition-colors hover:text-brand-cyan"
              >
                {siteConfig.supportEmail}
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 pb-4 lg:flex-row">
          <div className="order-1 flex max-w-full items-center justify-center gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 shadow-inner lg:order-2">
            <span className="shrink-0 font-mono text-[9px] text-slate-500 uppercase">Pay With</span>
            <div className="flex shrink-0 items-center gap-1.5">
              {PAYMENT_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex h-5 items-center justify-center rounded ${badge.className}`}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>

          <div className="order-3 flex shrink-0 flex-col items-center gap-1 text-right lg:items-end">
            <p className="text-xs text-slate-400">© 2026 UrShop. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
