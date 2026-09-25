import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/urshop-logo.png";
import { LocationMap } from "@/components/ui/location-map";
import { siteConfig } from "@/config/site";

// TODO: replace the "#" placeholders with real destinations as those pages/accounts exist.
const LINK_COLUMNS = {
  platform: [
    { label: "Start a Page", href: "#" },
    { label: "Login", href: "#" },
    { label: "Leaderboard", href: "#" },
    { label: "Help Center", href: "#" },
    { label: "Report", href: "#" },
    { label: "Feature Request", href: "#" },
    { label: "Contact", href: "#" },
  ],
  discover: [
    { label: "Explore Creators", href: "#" },
    { label: "Digital Products", href: "#" },
    { label: "Online Courses", href: "#" },
    { label: "Events & Workshops", href: "#" },
  ],
  legal: [
    { label: "About Us", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Security Policy", href: "#" },
    { label: "Withdrawal Policy", href: "#" },
    { label: "Pricing", href: "/pricing" },
    { label: "Refund Policy", href: "#" },
  ],
};

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "Instagram",
    href: "#",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "YouTube",
    href: "#",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Discord",
    href: "#",
    path: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z",
  },
];

const PAYMENT_BADGES = [
  { label: "AMEX", className: "px-1.5 bg-[#006FCF] text-[8px] font-extrabold" },
  { label: "bKash", className: "px-1.5 bg-[#E2136E] text-[9px] font-bold" },
  { label: "Nagad", className: "px-1.5 bg-[#F7941D] text-[9px] font-bold" },
  { label: "Rocket", className: "px-1.5 bg-[#8C3494] text-[8px] font-bold" },
  { label: "upay", className: "px-1.5 bg-[#005EAA] text-[8px] font-bold" },
  { label: "City Bank", className: "px-1.5 bg-[#D32F2F] text-[7px] font-bold uppercase" },
  { label: "BRAC", className: "px-1.5 bg-[#003865] text-[7px] font-bold uppercase" },
  { label: "EBL", className: "px-1.5 bg-[#E57200] text-[7px] font-bold uppercase" },
  { label: "DBBL", className: "px-1.5 bg-[#008248] text-[7px] font-bold uppercase" },
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
              <span className="font-medium text-slate-300">TRAD/NCC/0005482/2025</span>
            </div>

            <div className="mt-2">
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
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8 md:col-span-3">
            <FooterLinks title="Platform" links={LINK_COLUMNS.platform} />
            <FooterLinks title="Discover" links={LINK_COLUMNS.discover} />
          </div>

          <div className="md:col-span-2">
            <FooterLinks title="Legal" links={LINK_COLUMNS.legal} />
          </div>

          {/* Contact and socials */}
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

            <div className="pt-1">
              <span className="mb-3 block text-[11px] font-bold tracking-widest text-slate-400 uppercase">
                FOLLOW US
              </span>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={social.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 pb-4 text-left">
          <p className="font-mono text-[11px] font-bold tracking-[0.2em] text-slate-400 uppercase">
            PAYMENTS 100% SECURED BY SSLCOMMERZ &amp; EPS
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 pt-4 pb-4 lg:flex-row">
          <div className="order-1 flex max-w-full items-center justify-center gap-3 overflow-x-auto rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 shadow-inner lg:order-2">
            <span className="shrink-0 font-mono text-[9px] text-slate-500 uppercase">Pay With</span>
            <div className="flex shrink-0 items-center gap-1.5">
              <div className="flex h-5 items-center justify-center rounded bg-white px-1.5">
                <span className="text-[9px] font-extrabold tracking-tighter text-[#1A1F71]">
                  VISA
                </span>
              </div>
              <div className="flex h-5 items-center justify-center rounded bg-white px-1">
                <div className="flex items-center -space-x-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#EB001B]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#F79E1B] opacity-90" />
                </div>
              </div>
              {PAYMENT_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className={`flex h-5 items-center justify-center rounded text-white ${badge.className}`}
                >
                  {badge.label}
                </div>
              ))}
              <div className="flex h-5 items-center justify-center rounded border border-white/10 bg-slate-800 px-2 text-[8px] font-bold tracking-tight text-slate-300">
                SSLCOMMERZ
              </div>
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
