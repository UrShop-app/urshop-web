import type { ReactNode } from "react";

import { Icon, type IconName } from "@/components/ui/icon";
import { SectionHeading } from "@/components/ui/section-heading";
import { SplitSection } from "@/components/ui/split-section";

import { BkashDemo } from "./bkash-demo";
import { CourierDemo } from "./courier-demo";
import { EventsDemo } from "./events-demo";
import { OrderJourneyDemo } from "./order-journey-demo";
import { SmsDemo } from "./sms-demo";

// Every claim here is checked against src/data/features.ts (bkash-payments, cod-payment,
// courier-integrations, fraud-checker, ad-pixels, seo-foundation, sms-marketing, merchant-email,
// store-chat, abandoned-checkout).

const linkClass =
  "font-semibold text-brand-dark underline decoration-brand/40 underline-offset-4 transition-colors hover:decoration-brand-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-dark";

function MiniCard({
  icon,
  title,
  badge,
  children,
}: {
  icon: IconName;
  title: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div
      className="liquid-glass-card glass-lift reveal flex gap-4 rounded-3xl p-5 transition-shadow duration-300"
      style={{ borderRadius: "24px" }}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-light text-brand-dark">
        <Icon name={icon} />
      </span>
      <div className="min-w-0">
        <p className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-900">{title}</span>
          {badge ? (
            <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-bold text-amber-800 ring-1 ring-amber-200 ring-inset">
              {badge}
            </span>
          ) : null}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-slate-600">{children}</div>
      </div>
    </div>
  );
}

export function OrderJourneySection() {
  return (
    <section
      id="order-journey"
      aria-labelledby="order-journey-heading"
      className="relative scroll-mt-24 px-6 py-14 sm:py-20 md:scroll-mt-32 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          id="order-journey-heading"
          eyebrow="One order"
          title="One order. Every system in step."
          intro="From checkout to doorstep, each connection picks up where the last one left off."
          align="center"
          className="reveal"
        />
        <div className="mt-12">
          <OrderJourneyDemo />
        </div>
      </div>
    </section>
  );
}

export function PaymentsSection() {
  return (
    <SplitSection
      id="payments"
      eyebrow="Payments"
      title="Get paid with bKash"
      intro="Connect your own bKash merchant account. Shoppers pay at checkout, and the order updates when bKash confirms."
      points={[
        { icon: "account_balance_wallet", text: "Payments go to your bKash merchant account" },
        { icon: "restore", text: "Refund bKash payments from your dashboard" },
        { icon: "payments", text: "Cash on delivery is always available" },
      ]}
      demo={<BkashDemo />}
      demoSide="end"
    >
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <MiniCard icon="payments" title="Cash on delivery">
          Works on every store from day one.
        </MiniCard>
        <MiniCard icon="lock" title="Secure COD" badge="Enabled per store">
          The shopper pays the delivery charge with bKash, and the rest in cash on delivery.
        </MiniCard>
      </div>
    </SplitSection>
  );
}

export function DeliverySection() {
  return (
    <SplitSection
      id="delivery"
      eyebrow="Delivery"
      title="Book couriers from your orders"
      intro="Connect your Pathao, RedX or Steadfast account and ship without switching portals."
      points={[
        { icon: "handshake", text: "Uses your own courier accounts" },
        { icon: "local_shipping", text: "Book one order or many at once" },
        { icon: "route", text: "Statuses sync back to the order and the shopper's tracking page" },
        { icon: "receipt_long", text: "Rates and delivery times follow your courier agreement" },
      ]}
      demo={<CourierDemo />}
      demoSide="start"
    >
      <p className="mt-8 text-center text-sm text-slate-600">
        Where it&apos;s connected, Fraud Checker shows a customer&apos;s courier delivery history
        before you dispatch.
      </p>
    </SplitSection>
  );
}

export function MeasurementSection() {
  return (
    <SplitSection
      id="measurement"
      eyebrow="Measurement"
      title="Send store events to your ad tools"
      intro="Add Meta Pixel, TikTok Pixel and Google Tag Manager with your own IDs."
      points={[
        {
          icon: "ads_click",
          text: "Meta Conversions API and TikTok Events API next to the pixels",
        },
        { icon: "check_circle", text: "Send test events to check your setup" },
        { icon: "inventory_2", text: "A product feed to keep your Meta catalog in sync" },
      ]}
      demo={<EventsDemo />}
      demoSide="end"
    />
  );
}

export function MessagingSection() {
  return (
    <SplitSection
      id="messaging"
      eyebrow="Messaging"
      title="Keep customers in the loop"
      intro="Order SMS in Bangla or English, sent through your own BulkSMSBD account."
      points={[
        { icon: "forum", text: "SMS when an order is placed, confirmed, delivered or cancelled" },
        { icon: "edit", text: "Edit your message templates" },
        {
          icon: "group",
          text: "Promotional campaigns, where available, only to customers who agreed, with an unsubscribe link",
        },
        { icon: "shopping_cart_checkout", text: "Abandoned-checkout SMS, where enabled" },
      ]}
      demo={<SmsDemo />}
      demoSide="start"
    >
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <MiniCard icon="mail" title="Order emails">
          Sent at each order step, from your own email service if you like.
        </MiniCard>
        <MiniCard icon="contact_support" title="Website chat" badge="Enabled per store">
          <span className="block">
            Answer shoppers from a dashboard inbox, with AI, your team, or both.
          </span>
          <span
            aria-hidden="true"
            className="mt-3 inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2 shadow-sm"
          >
            <span className="typing-dot size-1.5 rounded-full bg-slate-400" />
            <span className="typing-dot size-1.5 rounded-full bg-slate-400" />
            <span className="typing-dot size-1.5 rounded-full bg-slate-400" />
          </span>
        </MiniCard>
      </div>
      <p className="mt-6 text-center text-sm text-slate-600">
        Facebook, Instagram and WhatsApp messaging is{" "}
        <a href="#status" className={linkClass}>
          coming later
        </a>
        .
      </p>
    </SplitSection>
  );
}
