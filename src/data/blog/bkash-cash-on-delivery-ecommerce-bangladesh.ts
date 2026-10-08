import type { BlogPost } from "./types";

export const bkashCashOnDeliveryEcommerceBangladesh: BlogPost = {
  slug: "bkash-cash-on-delivery-ecommerce-bangladesh",
  title: "bKash and Cash on Delivery for Ecommerce in Bangladesh: A Practical Guide",
  seoTitle: "bKash and COD for Online Stores in Bangladesh | UrShop",
  description:
    "How COD and bKash work for an online store in Bangladesh: COD risks, bKash setup, delivery charges in advance and keeping payment status straight.",
  excerpt:
    "How COD and bKash really work for an online store: the risks, the set-up, failed payments, and keeping payment status separate from delivery.",
  category: "payments",
  tags: ["bKash", "cash on delivery", "COD", "ecommerce payments"],
  keywords: [
    "ecommerce payment methods Bangladesh",
    "bKash ecommerce",
    "bKash payment gateway online store",
    "cash on delivery Bangladesh ecommerce",
    "online store payment options",
  ],
  publishedAt: "2026-10-09",
  updatedAt: "2026-10-09",
  heroAlt:
    "Illustration of a parcel being handed over at a doorstep, with cash on one side and a phone showing a payment confirmation on the other",
  takeaways: [
    "Offer cash on delivery, but confirm new and high-value orders before you ship.",
    "Take bKash through a merchant integration, so payments are confirmed automatically, not by screenshot.",
    "Asking for the delivery charge in advance filters out many orders that would be refused.",
    "Track payment status and delivery status separately, and match courier payouts to delivered orders.",
  ],
  intro: [
    "For most online stores in Bangladesh, payment comes down to two things: cash on delivery and mobile financial services such as bKash. Both work, and both create work for you after the order is placed.",
    "This guide covers how each one actually runs day to day, where money and time get lost, and how to set things up so you always know which orders are paid. It's general advice; fees, limits and terms come from your courier and payment provider, so confirm them with them directly.",
  ],
  body: [
    { type: "h2", id: "why-payment-choice-matters", text: "Why your payment options matter" },
    {
      type: "p",
      text: "Payment is the moment a shopper decides whether they trust you. The options you offer affect more than convenience:",
    },
    {
      type: "ul",
      items: [
        "**Trust.** A shopper buying from a new shop for the first time may only be willing to pay once the parcel is in their hands.",
        "**Friction.** Every extra step (leaving the site, entering a code, waiting for a confirmation) is a chance for the shopper to give up.",
        "**Cash flow.** Prepaid orders put money in your account before you ship. Cash-on-delivery money arrives later, through your courier.",
        "**Risk.** Cash-on-delivery orders can be refused at the door, and you still pay for the delivery attempt.",
      ],
    },
    {
      type: "p",
      text: "The goal isn't the most payment options; it's the right mix for your buyers that you can also reconcile reliably.",
    },

    { type: "h2", id: "how-cod-works", text: "How cash on delivery works for an online store" },
    {
      type: "ol",
      items: [
        "The shopper places an order and chooses cash on delivery.",
        "You confirm the order and hand the parcel to your courier with the amount to collect.",
        "The rider collects cash from the customer at the door.",
        "The courier pays the collected amount to you, minus their charges, according to the payout schedule in your agreement.",
        "You match the payout against your delivered orders.",
      ],
    },
    {
      type: "p",
      text: "Cash on delivery lowers the barrier to a first order, which is why many sellers offer it from day one. The cost is that the risk, and the waiting, moves to you.",
    },

    { type: "h2", id: "cod-risks", text: "The real risks of cash on delivery" },
    {
      type: "ul",
      items: [
        "**Refused and fake orders.** Some orders are placed on impulse, as a joke, or by someone who changes their mind. You pay delivery, and often return delivery, for nothing.",
        "**Cash tied up.** Money for delivered parcels sits with the courier until the next payout.",
        "**Stock tied up.** Products traveling to customers who refuse them can't be sold to anyone else.",
        "**Reconciliation errors.** Without a routine, it's easy to miss a parcel that was delivered but never paid out, or paid out at the wrong amount.",
      ],
    },
    { type: "h3", text: "How to reduce cash-on-delivery risk" },
    {
      type: "ul",
      items: [
        "**Confirm before you ship.** A quick call or message for new customers and high-value orders catches many orders that would be refused.",
        "**Check the customer's delivery history** where you have a tool for it, especially for large orders.",
        '**Be clear on product pages.** Accurate photos, sizes and delivery charges prevent "this isn\'t what I expected" at the door.',
        "**Set honest delivery expectations.** A parcel that arrives much later than the buyer expected is more likely to be refused.",
        "**Ask for the delivery charge in advance** on orders where the risk is higher (see below).",
        "**Track your refusal rate** by product, area and source, and act on what you find.",
      ],
    },
    {
      type: "urshop",
      text: "Where the Fraud Checker is connected for your UrShop store, you can see a customer's past delivery record with couriers, including how often their parcels were delivered or cancelled, for one order or many. It helps you decide; it never cancels orders by itself.",
      link: { label: "How UrShop helps you review orders", href: "/security#customers" },
    },

    { type: "h2", id: "how-bkash-works", text: "How bKash online payment works" },
    {
      type: "p",
      text: "There are two very different ways sellers take bKash, and the difference matters.",
    },
    { type: "h3", text: "Manual: send money and share the transaction ID" },
    {
      type: "p",
      text: "The buyer sends money to a number and messages a screenshot or transaction ID, and the seller checks it by hand. It needs no setup, but every payment has to be checked, screenshots can be edited, and it doesn't scale. It also mixes business money with your personal wallet.",
    },
    { type: "h3", text: "Integrated: a bKash merchant account at checkout" },
    {
      type: "p",
      text: "With a bKash merchant account connected to your store, the shopper picks bKash at checkout and is taken to bKash to approve the payment with their account. bKash then confirms the payment to your store, and the order is marked paid automatically. Nobody has to compare screenshots, and refunds can go back through the same channel.",
    },
    {
      type: "p",
      text: "Getting a merchant account, and the charges that apply, depend on bKash's current requirements and your agreement with them, so check with bKash directly.",
    },
    {
      type: "urshop",
      text: "On UrShop you connect your own bKash merchant account and the details are checked before bKash appears at checkout. Payments go to your bKash account, the order's payment status updates when bKash confirms, and you can issue bKash refunds from your dashboard. bKash is currently the only online payment method on UrShop; Nagad, Rocket, cards and bank transfer aren't available yet.",
      link: { label: "See payment integrations", href: "/integrations#payments" },
    },

    {
      type: "h2",
      id: "delivery-charge-in-advance",
      text: "Asking for the delivery charge in advance",
    },
    {
      type: "p",
      text: "A common middle ground is to ask the shopper to pay the delivery charge online when they order and the rest in cash on delivery. It filters out many orders that were never going to be accepted, and if a parcel is refused, the delivery cost is already covered.",
    },
    {
      type: "p",
      text: "The trade-off is a little more friction at checkout. Explain it clearly at checkout and in your shipping policy, so honest buyers understand why you ask.",
    },
    {
      type: "p",
      text: "UrShop calls this Secure COD: the shopper pays the delivery charge with bKash at checkout and the rest in cash on delivery. It isn't a percentage deposit or full prepayment. Secure COD is switched on per store, so [ask the UrShop team](/contact) if you'd like to use it, or read [how Secure COD works](/faq#secure-cod).",
    },

    {
      type: "h2",
      id: "payment-vs-order-status",
      text: "Keep payment status and order status separate",
    },
    {
      type: "p",
      text: "Whether an order has been **paid** and where it is in **delivery** are two different questions. Mixing them up is how sellers end up shipping unpaid bKash orders or forgetting to chase a courier payout. Track them separately:",
    },
    {
      type: "table",
      caption: "Order status and payment status in common situations",
      head: ["Situation", "Delivery status", "Payment status"],
      rows: [
        ["Cash-on-delivery order on its way", "Shipped", "Unpaid"],
        ["bKash payment confirmed, not yet packed", "Processing", "Paid"],
        [
          "Cash-on-delivery parcel delivered",
          "Delivered",
          "Cash collected by the courier; check it arrives in your payout",
        ],
        ["Parcel refused at the door", "Returned or cancelled", "Unpaid"],
        ["bKash order cancelled before shipping", "Cancelled", "Refund due, then refunded"],
        [
          "Shopper left the bKash page without paying",
          "Not ready to ship",
          "Unpaid: follow up or offer cash on delivery",
        ],
      ],
    },
    {
      type: "p",
      text: "On UrShop, an order's payment status is tracked separately from its order status, so a cash-on-delivery order can be on its way before it has been paid for.",
    },

    {
      type: "figure",
      image: "two-statuses",
      alt: "Illustration of an order card with two separate progress tracks, one for payment and one for delivery",
      caption: "Paid or unpaid, and where the parcel is: two questions, tracked separately.",
    },

    { type: "h2", id: "failed-payments", text: "Failed and abandoned online payments" },
    {
      type: "p",
      text: "Some online payments won't complete: the shopper closes the bKash page, enters the wrong code, doesn't have enough balance, or loses their connection. A few rules keep this from becoming a mess:",
    },
    {
      type: "ul",
      items: [
        "**Never ship a bKash order until the payment is confirmed** by the payment system, not by a screenshot.",
        "**Follow up quickly.** A short message offering to help, or to switch the order to cash on delivery, rescues many of these orders.",
        "**Look for patterns.** If many shoppers abandon at the payment step, check whether the step is clear on a phone and whether the delivery charge surprised them.",
        "**Recover unfinished checkouts.** Shoppers who left before ordering can be reminded, with their consent.",
      ],
    },
    {
      type: "p",
      text: "Where abandoned-checkout recovery is enabled for an UrShop store and an SMS account is connected, shoppers who started but didn't finish checkout can get an SMS with a link that restores it.",
    },

    { type: "h2", id: "common-mistakes", text: "Common payment mistakes" },
    {
      type: "ul",
      items: [
        "Collecting business payments into a personal mobile wallet",
        "Accepting payment screenshots as proof",
        "Shipping before an online payment is confirmed",
        "Not matching courier payouts against delivered cash-on-delivery orders",
        "Adding the delivery charge only at the last step of checkout",
        "Having no written refund policy, so every refund is negotiated",
        "Offering more payment methods than you can reconcile",
      ],
    },

    { type: "h2", id: "multiple-methods", text: "When to offer more than one method" },
    {
      type: "p",
      text: "A practical starting point for most stores is cash on delivery plus one online method. Add more when:",
    },
    {
      type: "ul",
      items: [
        "Customers regularly ask for a method you don't offer",
        "You can confirm and reconcile it as reliably as your existing methods",
        "Its charges still leave you a margin",
        "It's integrated with your store, so payment status updates without manual checking",
      ],
    },

    { type: "h2", id: "payment-checklist", text: "Payment setup checklist" },
    {
      type: "checklist",
      items: [
        "Cash on delivery is available, with a clear delivery charge shown before the order is placed",
        "bKash is connected through a merchant account, if you're offering it",
        "You've placed a test order with each method you offer",
        "Your refund and return policy says how refunds are paid",
        "You've decided when to confirm cash-on-delivery orders by phone",
        "You know your courier's payout schedule and statement format",
        "Someone matches payouts and payments against orders on a regular schedule",
      ],
    },
    {
      type: "p",
      text: "Payments are one part of the order journey. For the rest, see [how to start an online store in Bangladesh](/blog/how-to-start-online-store-bangladesh) and [how to choose a courier](/blog/pathao-vs-redx-vs-steadfast-ecommerce-courier), or see how [payments and delivery connect on UrShop](/integrations).",
    },
  ],
  relatedSlugs: [
    "how-to-start-online-store-bangladesh",
    "pathao-vs-redx-vs-steadfast-ecommerce-courier",
  ],
};
