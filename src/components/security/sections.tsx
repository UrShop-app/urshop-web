import Link from "next/link";
import type { CSSProperties } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";
import { legalDocuments } from "@/config/legal";
import { cn } from "@/lib/utils";

import { DomainDemo } from "./domain-demo";
import { DraftLiveDemo } from "./draft-live-demo";
import { OrderReviewDemo } from "./order-review-demo";
import { PauseOffscreen } from "@/components/ui/pause-offscreen";
import { PermissionMatrixDemo } from "./permission-matrix-demo";
import { TeamAccessDemo } from "./team-access-demo";

/*
 * Every claim on this page is checked against public sources in this repo:
 * - src/data/features.ts: staff-permissions, theme-customizer, theme-preview, preset-themes,
 *   page-builder, custom-domains, bkash-payments, cod-payment, guest-checkout, coupons,
 *   courier-integrations, ad-pixels, customer-crm, customer-accounts, fraud-checker,
 *   product-reviews, sms-marketing, cancellation-requests, order-tracking.
 * - src/data/faq.ts: staff-security, custom-domain, https, dns-management, payment-methods,
 *   bkash, secure-cod, fraud-checker, block-customers, moderate-reviews, sms-unsubscribe,
 *   preview-publish, restore-theme.
 * - About page (company, principles) and the platform legal pages for store scoping and the
 *   security statement.
 * Don't add certifications, encryption specifics, uptime, backups, audits or infrastructure
 * detail unless a public source here says so.
 */

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

type Chip = { icon: IconName; label: string };

/** Short facts as a centred row of glass pills. */
function ChipRow({ items, className }: { items: ReadonlyArray<Chip>; className?: string }) {
  return (
    <ul className={cn("flex flex-wrap justify-center gap-2.5", className)}>
      {items.map((item) => (
        <li
          key={item.label}
          className="liquid-pill reveal inline-flex items-center gap-1.5 rounded-full py-2 pr-4 pl-3 text-sm font-bold text-slate-700"
        >
          <Icon name={item.icon} className="scale-75 text-brand" />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

// ------------------------------------------------------------------------------------ access

export function AccessSection() {
  return (
    <SplitSection
      id="access"
      eyebrow="Accounts"
      title="Access starts with the right person"
      intro="Everyone signs in as themselves. No shared passwords."
      points={[
        { icon: "person_add", text: "Invite staff by email, each with their own login" },
        { icon: "verified_user", text: "Two-factor sign-in with recovery codes" },
        { icon: "person_off", text: "Suspend or disable staff anytime" },
      ]}
      demo={<TeamAccessDemo />}
      demoSide="end"
    />
  );
}

// ------------------------------------------------------------------------------- permissions

export function PermissionsSection() {
  return (
    <section
      id="permissions"
      aria-labelledby="permissions-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="permissions-heading"
          eyebrow="Staff permissions"
          title="Give staff only the access they need"
          intro="Choose what each person can see and change."
          align="center"
          className="reveal"
        />
        <div className="mt-12">
          <PermissionMatrixDemo />
        </div>
        <ChipRow
          className="mt-8"
          items={[
            { icon: "tune", label: "Role presets" },
            { icon: "visibility", label: "View or manage, per area" },
            { icon: "history", label: "Staff activity log" },
          ]}
        />
      </div>
    </section>
  );
}

// -------------------------------------------------------------------------------- publishing

export function PublishingSection() {
  return (
    <SplitSection
      id="publishing"
      eyebrow="Storefront changes"
      title="Edits stay private until you publish"
      intro="Shoppers keep seeing your live store while you work on a draft."
      points={[
        { icon: "visibility", text: "Preview on desktop, tablet and phone" },
        { icon: "publish", text: "Publishing can be limited to staff you choose" },
        { icon: "history", text: "Restore any of your last 20 published versions" },
      ]}
      demo={<DraftLiveDemo />}
      demoSide="start"
    />
  );
}

// ----------------------------------------------------------------------------------- domains

export function DomainsSection() {
  return (
    <SplitSection
      id="domains"
      eyebrow="Domains & HTTPS"
      title="Your domain, verified and on HTTPS"
      intro="Connect a domain you own whenever you're ready."
      points={[
        { icon: "domain_verification", text: "Verify it in a few guided steps" },
        { icon: "https", text: "HTTPS set up once it's verified" },
        { icon: "storefront", text: "Your UrShop address keeps working" },
      ]}
      demo={<DomainDemo />}
      demoSide="end"
    />
  );
}

// ---------------------------------------------------------------------------------- payments

const PAYMENT_FLOW: ReadonlyArray<{ icon: IconName; title: string; text: string }> = [
  { icon: "account_balance_wallet", title: "Your bKash account", text: "Connected by you" },
  { icon: "shopping_cart_checkout", title: "Checkout", text: "bKash appears once enabled" },
  { icon: "receipt_long", title: "Order", text: "Updates when bKash confirms" },
];

function PaymentFlow() {
  return (
    <PauseOffscreen>
      <ol
        aria-label="How a bKash payment connection works"
        className="grid items-stretch gap-0 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)_3rem_minmax(0,1fr)]"
      >
        {PAYMENT_FLOW.map((node, index) => (
          <li key={node.title} className="contents">
            {index > 0 ? (
              <span
                aria-hidden="true"
                className="flow-line flow-line-y-sm mx-auto h-8 w-4 md:h-auto md:w-full"
              >
                <span
                  className="flow-packet"
                  style={{ "--flow-delay": `${index * 0.6}s` } as CSSProperties}
                />
              </span>
            ) : null}
            <div
              className="liquid-glass-card reveal flex flex-col items-center gap-2 rounded-3xl p-5 text-center"
              style={{ borderRadius: "24px" }}
            >
              <span className="grid size-11 place-items-center rounded-2xl bg-brand-light text-brand-dark">
                <Icon name={node.icon} />
              </span>
              <span className="font-bold text-slate-900">{node.title}</span>
              <span className="text-sm text-slate-500">{node.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </PauseOffscreen>
  );
}

export function PaymentsSection() {
  return (
    <section
      id="payments"
      aria-labelledby="payments-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          id="payments-heading"
          eyebrow="Payments"
          title="Payments go to your own account"
          intro="Connect your bKash merchant account. Cash on delivery always works."
          align="center"
          className="reveal"
        />
        <div className="mx-auto mt-12 max-w-5xl">
          <PaymentFlow />
        </div>
        <ChipRow
          className="mt-8"
          items={[
            { icon: "receipt_long", label: "Totals priced on our servers" },
            { icon: "lock", label: "Secure COD, enabled per store" },
            { icon: "local_shipping", label: "Courier credentials stored encrypted" },
          ]}
        />
      </div>
    </section>
  );
}

// --------------------------------------------------------------------------------- customers

export function CustomersSection() {
  return (
    <SplitSection
      id="customers"
      eyebrow="Customers & orders"
      title="Better information. Your decision."
      intro="Checks and controls for problem orders. You decide what happens."
      points={[
        {
          icon: "fact_check",
          text: "Fraud Checker shows courier history. It never cancels orders",
        },
        { icon: "block", text: "Block customers by phone, email or IP" },
        { icon: "rate_review", text: "Approve, hide or delete reviews" },
      ]}
      demo={<OrderReviewDemo />}
      demoSide="start"
    >
      <ChipRow
        className="mt-10"
        items={[
          { icon: "unsubscribe", label: "Promotional SMS opt-out" },
          { icon: "shopping_cart_checkout", label: "Guest checkout always available" },
          { icon: "search", label: "Tracking needs the order's phone number" },
        ]}
      />
    </SplitSection>
  );
}

// ------------------------------------------------------------------------------- store scope

const SCOPE_TILES: ReadonlyArray<{ icon: IconName; label: string }> = [
  { icon: "group", label: "Customers" },
  { icon: "receipt_long", label: "Orders" },
  { icon: "badge", label: "Staff" },
  { icon: "settings", label: "Settings" },
];

function ScopeTile({ icon, label }: { icon: IconName; label: string }) {
  return (
    <span className="flex items-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-3 py-2.5 text-sm font-bold text-slate-700 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <Icon name={icon} className="scale-75 text-brand" />
      {label}
    </span>
  );
}

function OtherStore({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-3xl border border-dashed border-slate-300 bg-white/50 p-3 opacity-70",
        className,
      )}
    >
      <span className="flex items-center gap-1.5 text-[11px] font-bold tracking-[0.12em] text-slate-400 uppercase">
        <Icon name="storefront" className="scale-[0.6]" />
        Another store
      </span>
      <span className="grid grid-cols-2 gap-1.5">
        {[0, 1, 2, 3].map((tile) => (
          <span key={tile} className="h-6 rounded-lg bg-slate-200/70" />
        ))}
      </span>
    </div>
  );
}

/** Your store's own boundary, with activity staying inside it. Conceptual, not architecture. */
function StoreScopeVisual() {
  return (
    <PauseOffscreen>
      <div
        aria-hidden="true"
        className="grid gap-3 select-none sm:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      >
        <div className="security-scope rounded-[28px] border-2 border-brand/40 bg-white/80 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-2">
            <span className="flex items-center gap-2 text-sm font-extrabold text-slate-900">
              <Icon name="storefront" className="text-brand" />
              Your store
            </span>
            <span className="rounded-full bg-brand-light px-2.5 py-1 text-[11px] font-bold text-brand-dark">
              Your team
            </span>
          </div>
          <div className="grid grid-cols-[minmax(0,1fr)_2rem_minmax(0,1fr)] items-center gap-y-3">
            {[0, 2].map((first) => (
              <div key={first} className="contents">
                <ScopeTile {...SCOPE_TILES[first]!} />
                <span className="flow-line h-4">
                  <span
                    className="flow-packet"
                    style={{ "--flow-delay": `${first * 0.5}s` } as CSSProperties}
                  />
                </span>
                <ScopeTile {...SCOPE_TILES[first + 1]!} />
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
          <OtherStore />
          <OtherStore />
        </div>
      </div>
    </PauseOffscreen>
  );
}

export function StoreScopeSection() {
  return (
    <section
      id="store-scope"
      aria-labelledby="store-scope-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div className="reveal">
          <SectionHeading
            id="store-scope-heading"
            eyebrow="Your store's space"
            title="Your data stays with your store"
            intro="Customer and order information is scoped to the store where a shopper gives it, and isn't meant to be shared with unrelated stores."
          />
          <p className="mt-5 text-sm text-slate-600">
            <Link href={legalDocuments.privacyPolicy.path} className={linkClass}>
              Read our {legalDocuments.privacyPolicy.navLabel} →
            </Link>
          </p>
        </div>
        <StoreScopeVisual />
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------- responsibility

const PRACTICES: ReadonlyArray<Chip> = [
  { icon: "badge", label: "One login per person" },
  { icon: "verified_user", label: "Turn on two-factor" },
  { icon: "tune", label: "Grant only what's needed" },
  { icon: "person_off", label: "Remove access when people leave" },
  { icon: "visibility", label: "Preview before you publish" },
  { icon: "key", label: "Keep account details private" },
];

export function ResponsibilitySection() {
  return (
    <section
      id="your-part"
      aria-labelledby="your-part-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          id="your-part-heading"
          eyebrow="Your part"
          title="Security works best when it's shared"
          intro="A few habits that keep your store safe."
          align="center"
          className="reveal"
        />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((practice) => (
            <li
              key={practice.label}
              className="liquid-glass-card glass-lift reveal flex items-center gap-3 rounded-2xl p-4 transition-shadow duration-300"
              style={{ borderRadius: "20px" }}
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-light text-brand-dark">
                <Icon name={practice.icon} />
              </span>
              <span className="font-bold text-slate-900">{practice.label}</span>
            </li>
          ))}
        </ul>

        {/* Paraphrases the Privacy Policy's "Security" section; that page stays authoritative. */}
        <p className="reveal mt-10 text-center text-sm text-slate-600">
          No online service can guarantee absolute security. Think your account is compromised?{" "}
          <Link href="/contact" className={linkClass}>
            Contact us
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
