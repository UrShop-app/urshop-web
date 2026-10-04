/**
 * Public FAQ content for the /faq page (and the short list on the home page).
 *
 * Rules for editors:
 * - Capability and availability claims must match `src/data/features.ts`, the canonical source.
 *   When unsure, phrase conservatively ("where enabled for your store") or leave the question out.
 * - No pricing, plan names or limits, invented numbers, delivery times or guarantees.
 * - Don't market anything `features.ts` marks coming soon (e.g. Nagad, Rocket, cards, bank
 *   transfer, Meta messaging) as available.
 * - Keep answers short: one to three plain-language paragraphs, no internal names or routes.
 * - Question ids are public anchors (`/faq#secure-cod`); don't rename them once published.
 */

import { legalDocuments } from "@/config/legal";
import { siteConfig } from "@/config/site";
import type { IconName } from "@/components/ui/icon";

export type FaqLink = {
  label: string;
  /** Internal route, `#question-id` on the FAQ page, or an absolute/mailto URL. */
  href: string;
};

export type FaqQuestion = {
  /** Stable kebab-case anchor id, unique across all categories. */
  id: string;
  question: string;
  /** Paragraphs of plain text. */
  answer: ReadonlyArray<string>;
  /** Extra words people might search for that the copy doesn't use. Search only. */
  keywords?: ReadonlyArray<string>;
  link?: FaqLink;
};

export type FaqCategory = {
  /** Section anchor id, e.g. `/faq#payments-delivery`. */
  id: string;
  title: string;
  /** Short label for the category navigation. */
  navLabel: string;
  description: string;
  icon: IconName;
  questions: ReadonlyArray<FaqQuestion>;
};

export const faqCategories: ReadonlyArray<FaqCategory> = [
  {
    id: "getting-started",
    title: "Getting started",
    navLabel: "Getting started",
    description: "Opening your store, guided setup and where to find help.",
    icon: "storefront",
    questions: [
      {
        id: "create-store",
        question: "How do I create a store on UrShop?",
        answer: [
          "Sign up with your email address and choose a name for your store. Signing up creates both your merchant dashboard and your storefront.",
          "Verify your email to activate your account, then sign in to add products, set your delivery charges and make the store look like your brand.",
        ],
        keywords: ["sign up", "register", "open shop", "start"],
        link: { label: "Create your store", href: siteConfig.adminSignUpUrl },
      },
      {
        id: "need-domain",
        question: "Do I need my own domain to start?",
        answer: [
          "No. Every store gets its own UrShop store address that you can share with customers from day one.",
          "If you own a domain, you can connect it whenever you're ready, and your UrShop address keeps working.",
        ],
        keywords: ["website address", "url", "subdomain"],
        link: { label: "Connecting a custom domain", href: "#custom-domain" },
      },
      {
        id: "technical-skills",
        question: "Do I need technical skills to run a store?",
        answer: [
          "No coding is needed. You choose a theme, customize it in a visual editor, build pages from ready-made blocks and manage products and orders from your dashboard.",
          "UrShop hosts your storefront for you, so there's no server to set up or maintain.",
        ],
        keywords: ["coding", "developer", "hosting"],
      },
      {
        id: "after-verification",
        question: "What happens after I verify my email?",
        answer: [
          "Verification activates your account, and you can sign in to your dashboard. If you're setting up a new store, a short guided setup walks you through the basics the first time you sign in.",
        ],
        keywords: ["activate", "confirm email", "onboarding"],
      },
      {
        id: "guided-setup",
        question: "What does the guided setup cover?",
        answer: [
          "It helps you set your store's identity, how it looks, your contact details and the basics of delivery, so your shop is ready for its first order.",
          "Nothing is locked in. You can change any of these settings later from your dashboard.",
        ],
        keywords: ["onboarding", "setup checklist", "launch"],
      },
      {
        id: "made-for-bangladesh",
        question: "Is UrShop set up for selling in Bangladesh?",
        answer: [
          "Yes. Stores use Bangladesh defaults: prices in Taka, local phone number and address formats with Division, District and Upazila at checkout, cash on delivery, bKash, and Pathao, RedX and Steadfast for delivery.",
          "Bangladesh is currently the only region UrShop stores are set up for.",
        ],
        keywords: ["bd", "local", "taka", "international", "other countries"],
        link: { label: "Made for selling in Bangladesh", href: "/features" },
      },
      {
        id: "merchant-help",
        question: "Where can I get help as a merchant?",
        answer: [
          "Your dashboard has step-by-step guides for each feature in English and Bangla. If you're stuck, open a support ticket from the dashboard (you can attach screenshots) and our team will pick it up.",
          `You can also email ${siteConfig.supportEmail} or send us a message from the contact page.`,
        ],
        keywords: ["support", "ticket", "help center", "guide", "contact"],
        link: { label: "Contact the UrShop team", href: "/contact" },
      },
    ],
  },
  {
    id: "products-inventory",
    title: "Products & inventory",
    navLabel: "Products",
    description: "Listing products, options, stock, categories and coupons.",
    icon: "inventory_2",
    questions: [
      {
        id: "add-products",
        question: "How do I add products?",
        answer: [
          "Add products from the Products section of your dashboard: name, description, price (with an optional previous price to show a sale), images, category, brand, stock and SEO details.",
          "Products can also carry warranty information, weight and dimensions, and their own delivery charge if they cost more to ship.",
        ],
        keywords: ["new product", "listing", "sku", "sale price"],
      },
      {
        id: "draft-active",
        question: "What's the difference between Draft and Active products?",
        answer: [
          "A Draft product stays off your storefront while you work on it. When it's ready, set it to Active so shoppers can find and buy it.",
        ],
        keywords: ["publish product", "hide product", "status"],
      },
      {
        id: "duplicate-product",
        question: "Can I duplicate a product?",
        answer: [
          "Yes. Duplicating is a quick way to create a similar item, and you can choose whether to copy its images too.",
        ],
        keywords: ["copy", "clone"],
      },
      {
        id: "stock-management",
        question: "How does stock management work?",
        answer: [
          "Turn on stock tracking for a product and UrShop keeps count for the product and for each of its options, such as sizes or colors. Shoppers can't order more than you have in stock, and low-stock alerts tell you when it's time to restock.",
          "Tracking is optional, so items you make to order don't need a stock count.",
        ],
        keywords: ["inventory", "quantity", "low stock", "oversell"],
      },
      {
        id: "sold-out",
        question: "What happens when a product or option sells out?",
        answer: [
          "Shoppers see it as out of stock and can't add more than is available. If an option, such as one size, sells out, the other options stay on sale.",
          "If you expect a restock, you can choose to keep selling a tracked product while it's out of stock.",
        ],
        keywords: ["out of stock", "backorder", "continue selling", "unavailable"],
      },
      {
        id: "product-media",
        question: "Can products have images and video?",
        answer: [
          "Yes. Each product can have a gallery of images, and you can add a product video from YouTube or Vimeo. Images are optimized automatically so pages load quickly on phones.",
        ],
        keywords: ["photos", "pictures", "gallery", "youtube", "vimeo"],
      },
      {
        id: "product-options",
        question: "How do product options and variants work?",
        answer: [
          "Add options such as Size or Color to a product. Each option value can have its own price adjustment, stock and image.",
          "Shoppers pick the option they want on the product page, and the price and availability update for their choice.",
        ],
        keywords: ["variants", "size", "color", "colour", "swatches"],
      },
      {
        id: "import-export",
        question: "Can I import or export my catalog?",
        answer: [
          "Yes. You can import products from a CSV file using the provided template. The file is checked for problems as part of the import. You can also export selected, filtered or all products.",
          "CSV tools are available for categories as well.",
        ],
        keywords: ["csv", "spreadsheet", "bulk upload", "excel"],
      },
      {
        id: "categories-brands",
        question: "How do categories, subcategories and brands work?",
        answer: [
          "Categories have two levels: main categories, each with optional subcategories. Deeper nesting isn't supported. You can reorder them to control how they appear.",
          "Brands are optional. They're a single list, each with its own logo and brand page, and shoppers can filter products by category or brand.",
        ],
        keywords: ["collections", "subcategory", "organize", "brand"],
      },
      {
        id: "coupons",
        question: "How do coupons work?",
        answer: [
          "Create percentage or fixed-amount coupon codes. You can cap the maximum discount, limit a code to certain products or categories (with exclusions), set a minimum quantity, limit how many times it can be used, and schedule start and end dates.",
          "Shoppers enter the code in the cart or at checkout and can use one coupon per order. The discount is checked again when the order is placed, so it always follows your rules.",
        ],
        keywords: ["discount", "promo code", "voucher", "offer"],
      },
    ],
  },
  {
    id: "orders-checkout",
    title: "Orders & checkout",
    navLabel: "Orders",
    description: "Managing orders, invoices, cancellations and how checkout works.",
    icon: "receipt_long",
    questions: [
      {
        id: "manage-orders",
        question: "Where do I manage orders?",
        answer: [
          "Every order arrives in the Orders section of your dashboard. From there you can filter by status, see the customer's details and previous orders, update the order, book a courier and print an invoice.",
        ],
        keywords: ["order list", "fulfillment", "dashboard"],
      },
      {
        id: "order-statuses",
        question: "What order statuses are there?",
        answer: [
          "Orders move from pending through to delivered, and can also be cancelled or refunded. You update the status as the order progresses, and it's reflected on the customer's order tracking page.",
        ],
        keywords: ["pending", "confirmed", "delivered", "cancelled", "refunded"],
      },
      {
        id: "payment-status",
        question: "Is payment status separate from order status?",
        answer: [
          "Yes. An order's payment status is tracked separately from where the order is in delivery. A cash-on-delivery order, for example, can be on its way before it has been paid for.",
        ],
        keywords: ["paid", "unpaid", "due"],
      },
      {
        id: "manual-orders",
        question: "Can I create orders manually?",
        answer: [
          "Yes. You can create orders from your dashboard for sales that come in by phone, social media or in person, and edit orders when details change.",
        ],
        keywords: ["phone order", "facebook order", "offline order", "edit order"],
      },
      {
        id: "invoices",
        question: "Are invoices available?",
        answer: [
          "Yes. You can print an invoice or download it as a PDF from any order, and customers get a link to view and print their own invoice.",
        ],
        keywords: ["receipt", "pdf", "print"],
      },
      {
        id: "export-orders",
        question: "Can I export my orders?",
        answer: ["Yes. You can export orders to a CSV file for your records or accounting."],
        keywords: ["csv", "download", "spreadsheet", "accounting"],
      },
      {
        id: "order-notifications",
        question: "Do customers get order updates?",
        answer: [
          "Customers receive emails when an order is placed, confirmed, delivered or cancelled, and your dashboard shows whether each email was sent. If you connect an SMS account, order updates can go out by SMS as well.",
        ],
        keywords: ["email", "notification", "sms", "confirmation"],
        link: { label: "SMS on UrShop", href: "#sms" },
      },
      {
        id: "cancellations-refunds",
        question: "How are cancellations, refunds and returns handled?",
        answer: [
          "Customers can request a cancellation from their order, and you approve or decline it from a dedicated queue in your dashboard. Refunds for bKash payments can be issued from the dashboard, and returns are handled from your orders too.",
          "Updating an order records what happened. Some steps, such as collecting a returned parcel or giving back cash, still happen between you, your courier and your customer.",
        ],
        keywords: ["cancel", "refund", "return", "exchange"],
      },
      {
        id: "checkout-fields",
        question: "Can I customize the checkout form?",
        answer: [
          "Yes. You choose which optional fields the checkout shows and which are required. Name, mobile number and full address are always required so orders can be delivered.",
          "Addresses use Division, District and Upazila dropdowns, and mobile numbers are checked for the Bangladesh format.",
        ],
        keywords: ["checkout fields", "address", "form"],
      },
      {
        id: "fraud-checker",
        question: "Can I check whether a cash-on-delivery order is risky?",
        answer: [
          "Yes, where the Fraud Checker is connected for your store. It shows a customer's past delivery record with couriers, including how often their parcels were delivered or cancelled, for one order or many at once.",
          "It's there to help you decide. It doesn't block or cancel orders by itself, and it may not have history for every customer.",
        ],
        keywords: ["fraud", "fake order", "risk", "cod check", "return rate"],
      },
      {
        id: "abandoned-checkouts",
        question: "Can I recover abandoned checkouts?",
        answer: [
          "Where abandoned-checkout recovery is enabled for your store and an SMS account is connected, UrShop spots checkouts that were started but not finished and can send the shopper an SMS with a link that restores their checkout.",
          "Messages respect the shopper's consent, and a report shows how many checkouts were recovered.",
        ],
        keywords: ["abandoned cart", "cart recovery", "reminder"],
      },
    ],
  },
  {
    id: "payments-delivery",
    title: "Payments & delivery",
    navLabel: "Payments & delivery",
    description: "Cash on delivery, bKash, Secure COD, couriers and delivery charges.",
    icon: "payments",
    questions: [
      {
        id: "payment-methods",
        question: "Which payment methods can my customers use?",
        answer: [
          "Cash on delivery works on every store from day one. You can also accept bKash online payments by connecting your own bKash merchant account, and use Secure COD where it's enabled for your store.",
          "bKash is currently the only online payment method. Other methods such as Nagad, Rocket, cards and bank transfer aren't available yet.",
        ],
        keywords: ["cod", "cash", "nagad", "rocket", "card", "visa", "bank transfer", "mfs"],
      },
      {
        id: "bkash",
        question: "How does bKash payment work?",
        answer: [
          "Connect your own bKash merchant account in your dashboard and UrShop checks the details. Once it's enabled, shoppers see bKash at checkout and pay with their bKash account, and the order's payment status updates when bKash confirms the payment.",
          "Payments go to your bKash merchant account, and you can issue bKash refunds from your dashboard. If bKash isn't connected, checkout simply offers cash on delivery.",
        ],
        keywords: ["online payment", "mobile wallet", "mfs", "refund"],
      },
      {
        id: "secure-cod",
        question: "What is Secure COD?",
        answer: [
          "With Secure COD, the shopper pays the delivery charge online with bKash when ordering and pays the rest in cash when the parcel arrives. It's not a percentage deposit, and it isn't full prepayment.",
          "Because the delivery charge is paid up front, it helps protect you from losing delivery costs on orders that are refused. Secure COD is enabled per store, so contact us if you'd like to use it.",
        ],
        keywords: ["advance", "delivery charge", "partial payment", "fake order"],
        link: { label: "Ask about Secure COD", href: "/contact" },
      },
      {
        id: "couriers",
        question: "Which courier services can I connect?",
        answer: [
          "You can connect Pathao, RedX and Steadfast. Add the details of your own account with each courier you use, and UrShop checks them before you start booking.",
          "Then you can book shipments from your orders, one at a time or in bulk. Courier rates and pickups are agreed between you and the courier. Other couriers aren't supported yet.",
        ],
        keywords: ["pathao", "redx", "steadfast", "shipping", "delivery partner", "booking"],
      },
      {
        id: "shipment-tracking",
        question: "How does shipment tracking work?",
        answer: [
          "When you book a shipment through a connected courier, its status syncs back to the order automatically, and your customer sees the courier status on their order tracking page.",
          "For deliveries you arrange yourself, update the order status manually and customers see that instead.",
        ],
        keywords: ["track parcel", "consignment", "courier status"],
      },
      {
        id: "delivery-charges",
        question: "How are delivery charges set?",
        answer: [
          "You set them. Choose a default charge for inside Dhaka and one for outside Dhaka, and give individual products their own charge when they cost more to ship. Shoppers see the delivery charge at checkout once their address is complete.",
          "Delivery charges and delivery times depend on your settings and your courier, so they vary from store to store.",
        ],
        keywords: [
          "shipping cost",
          "delivery fee",
          "inside dhaka",
          "outside dhaka",
          "delivery time",
        ],
      },
    ],
  },
  {
    id: "storefront-domains",
    title: "Storefront, themes & domains",
    navLabel: "Storefront & domains",
    description: "How your store looks, safe publishing, pages, policies and your own domain.",
    icon: "palette",
    questions: [
      {
        id: "customize-storefront",
        question: "Can I customize how my store looks?",
        answer: [
          "Yes. Start from a ready-made theme, then set your logo, brand colors, fonts, spacing, header and footer styles and homepage sections in a visual editor that shows your real storefront.",
          "Themes are designed and maintained by UrShop. You can't upload your own code.",
        ],
        keywords: ["theme", "design", "logo", "colors", "fonts", "template"],
        link: { label: "Explore themes", href: "/themes" },
      },
      {
        id: "preview-publish",
        question: "Do theme changes go live immediately? Can I preview them first?",
        answer: [
          "No, they don't go live until you publish. Changes are saved as a private draft that you can preview at desktop, tablet and phone sizes, and you can share a view-only preview link with others before publishing.",
          "Cart and checkout are switched off in previews, so test visits never create orders.",
        ],
        keywords: ["draft", "preview link", "publish"],
      },
      {
        id: "restore-theme",
        question: "Can I restore an older version of my theme?",
        answer: [
          "Yes. Each published version is saved, so you can roll back to an earlier one if a change doesn't work out.",
        ],
        keywords: ["undo", "rollback", "history", "revert"],
      },
      {
        id: "page-builder",
        question: "Can I build landing or campaign pages without coding?",
        answer: [
          "Yes. The page builder lets you put together pages from blocks such as hero banners, text, product grids, countdowns, FAQs, videos, galleries and testimonials. Pages are saved as drafts until you publish, and earlier versions can be restored.",
          "You can add a page to your navigation or footer, or use one as your homepage.",
        ],
        keywords: ["landing page", "custom page", "campaign", "blocks"],
      },
      {
        id: "navigation-footer",
        question: "Can I change my store's menu and footer?",
        answer: [
          "Yes. You control the header menu, an announcement bar, footer columns and links, your social media and marketplace links, and the contact details shown to shoppers.",
        ],
        keywords: ["menu", "header", "announcement bar", "social links"],
      },
      {
        id: "store-policies",
        question: "What policy pages does my store have?",
        answer: [
          "Your store has Privacy Policy, Terms of Service, Shipping and Return & Refund pages, and you write their content from your dashboard.",
          "These are your store's own policies for your shoppers. They're separate from UrShop's own Privacy Policy and Terms of Service, which cover your use of UrShop.",
        ],
        keywords: ["terms", "privacy", "return policy", "refund policy", "shipping policy"],
        link: { label: "UrShop's Terms of Service", href: legalDocuments.terms.path },
      },
      {
        id: "bangla-english",
        question: "Does UrShop support Bangla and English?",
        answer: [
          "Yes. Every storefront is available in both Bangla and English, and shoppers can switch languages from the header. Your dashboard guides are in both languages too.",
        ],
        keywords: ["bengali", "bangla", "language", "translation"],
      },
      {
        id: "mobile-storefront",
        question: "Will my store work well on phones?",
        answer: [
          "Yes. Storefronts are designed for phones first, with touch-friendly navigation, search, filters and checkout, and they adapt to tablets and larger screens.",
        ],
        keywords: ["mobile", "responsive", "smartphone"],
      },
      {
        id: "custom-domain",
        question: "Can I connect my own domain?",
        answer: [
          "Yes. Add your domain in the dashboard and follow the steps to verify it. Once it's connected, your store is served on your domain, with or without www, and you choose which domain is your main one.",
          "Your UrShop store address keeps working alongside it.",
        ],
        keywords: ["domain name", "dns", "www", ".com", "website address"],
      },
      {
        id: "https",
        question: "Is HTTPS set up automatically?",
        answer: [
          "Yes. Once your domain is verified, HTTPS is set up for it, so shoppers see a secure connection.",
        ],
        keywords: ["ssl", "certificate", "secure", "padlock"],
      },
      {
        id: "dns-management",
        question: "Can I manage my domain's DNS in UrShop?",
        answer: [
          "Where available for your domain, you can view and manage its DNS records from your dashboard alongside the records your store needs.",
        ],
        keywords: ["dns records", "nameservers", "email records"],
      },
    ],
  },
  {
    id: "customers-reviews",
    title: "Customers & reviews",
    navLabel: "Customers & reviews",
    description: "Customer accounts, your customer list, blocking and product reviews.",
    icon: "group",
    questions: [
      {
        id: "accounts-required",
        question: "Do my customers need an account to buy?",
        answer: [
          "No. Guest checkout is always available, so shoppers can order with just their name, mobile number and address.",
        ],
        keywords: ["guest checkout", "sign up", "login"],
      },
      {
        id: "customer-accounts",
        question: "Can I offer customer accounts?",
        answer: [
          "Yes, where customer accounts are enabled for your store. Shoppers can then sign up with email and password, a sign-in link sent by email, or Google or Facebook, and see their order history, save addresses for faster checkout and keep their wishlist across devices.",
        ],
        keywords: ["login", "register", "my account", "google", "facebook", "address book"],
      },
      {
        id: "accounts-disabled",
        question: "What happens if customer accounts are turned off?",
        answer: [
          "Shoppers can still check out as guests and track their orders. Turning accounts off doesn't delete your customer records or order history.",
        ],
        keywords: ["disable accounts"],
      },
      {
        id: "customer-records",
        question: "Can I manage my customer list?",
        answer: [
          "Yes. UrShop builds a customer list from your orders, newsletter signups and imports. Each customer has their orders, total spend, addresses, tags and notes, along with whether they've agreed to receive marketing by email or SMS.",
        ],
        keywords: ["crm", "customer database", "consent", "tags"],
      },
      {
        id: "block-customers",
        question: "Can I block a problem customer?",
        answer: [
          "Yes. You can block customers, for example by phone number or email address, to stop repeat problem orders.",
        ],
        keywords: ["blacklist", "blocklist", "ban", "fake orders"],
      },
      {
        id: "product-reviews",
        question: "Can shoppers leave product reviews?",
        answer: [
          "Yes, when you turn reviews on. Shoppers rate and review products on the product page, and reviews can be tied to a real purchase by asking for the order ID.",
          "Ratings and reviews shown on your store come from your shoppers. UrShop doesn't create reviews.",
        ],
        keywords: ["ratings", "stars", "feedback", "testimonials"],
      },
      {
        id: "moderate-reviews",
        question: "Can I moderate reviews?",
        answer: [
          "Yes. You can approve, hide or delete reviews for each product, or turn reviews off for the whole store.",
        ],
        keywords: ["approve review", "hide review", "delete review"],
      },
      {
        id: "newsletter",
        question: "Can shoppers subscribe to my newsletter?",
        answer: [
          "Yes. Your storefront footer has a newsletter signup, and subscribers are added to your customer list with their email consent recorded.",
        ],
        keywords: ["email list", "subscribe", "subscribers"],
      },
    ],
  },
  {
    id: "marketing-analytics",
    title: "Marketing, SEO & analytics",
    navLabel: "Marketing & analytics",
    description: "Search visibility, ad tracking, promotions, reports and AI insights.",
    icon: "monitoring",
    questions: [
      {
        id: "seo",
        question: "Does UrShop help with SEO?",
        answer: [
          "Yes. Stores come with the foundations built in: page titles and descriptions in both languages, an automatic sitemap and robots file, Google site verification and structured data for products and articles. You can also publish blog articles.",
          "These help search engines understand your store, but no platform can guarantee rankings.",
        ],
        keywords: ["google", "search engine", "sitemap", "robots", "ranking"],
      },
      {
        id: "product-feed",
        question: "Is there a product feed for Meta catalog ads?",
        answer: [
          "Yes. Your store provides a product feed URL that you can use to keep a Meta catalog in sync with your products.",
        ],
        keywords: ["facebook catalog", "instagram shop", "feed", "catalog"],
      },
      {
        id: "tracking-pixels",
        question: "Can I add Meta Pixel, TikTok or Google Tag Manager?",
        answer: [
          "Yes. Add your Meta Pixel (with the Conversions API), TikTok pixel (with the Events API) and Google Tag Manager container using your own IDs, and send test events to check they're working.",
        ],
        keywords: ["facebook pixel", "capi", "conversions api", "gtm", "ads", "tracking"],
      },
      {
        id: "promotions",
        question: "What tools do I have for promotions?",
        answer: [
          "Alongside coupons, you can run a promotional popup (with an optional coupon code), scheduled promo banners, a site-wide announcement bar and customer testimonials.",
        ],
        keywords: ["popup", "banner", "sale", "announcement"],
        link: { label: "How coupons work", href: "#coupons" },
      },
      {
        id: "analytics",
        question: "What analytics are available?",
        answer: [
          "Your dashboard shows visitors, orders, revenue and payments over any date range, compared with the period before. You can see where traffic comes from, which pages and locations it reaches, your checkout funnel and sales for each product, and export the data as CSV.",
          "Wishlist analytics show which products shoppers are saving.",
        ],
        keywords: ["reports", "sales", "traffic", "conversion", "funnel", "statistics"],
      },
      {
        id: "store-ai-reports",
        question: "Does UrShop offer AI insights about my store?",
        answer: [
          "Where Store AI Reports are enabled for your store, you can generate a report for the last 7, 30 or 90 days. It summarizes sales, your checkout funnel, product demand and returning customers, points out unusual changes, and suggests a list of actions. Reports can be exported as PDF.",
          "Reports are suggestions to consider, not guarantees or forecasts.",
        ],
        keywords: ["ai", "artificial intelligence", "insights", "report"],
      },
      {
        id: "ai-automatic-changes",
        question: "Does AI change my store automatically?",
        answer: [
          "No. Store AI Reports only make suggestions. They never change your products, prices, discounts, stock, orders or settings. You decide what to act on.",
        ],
        keywords: ["ai", "automation", "autopilot"],
      },
    ],
  },
  {
    id: "messaging-integrations",
    title: "Integrations, SMS & messaging",
    navLabel: "SMS & messaging",
    description: "Connected services, SMS, website chat and social messaging.",
    icon: "forum",
    questions: [
      {
        id: "integrations",
        question: "Which services does UrShop connect with?",
        answer: [
          "bKash for payments, Pathao, RedX and Steadfast for delivery, BulkSMSBD for SMS, and Meta Pixel, TikTok and Google Tag Manager for ad tracking. You can also send order emails through your own email service.",
          "Each one uses your own account with that service, so you connect the ones you need.",
        ],
        keywords: ["integration", "apps", "connect", "third party"],
        link: { label: "See every integration", href: "/integrations" },
      },
      {
        id: "sms",
        question: "Does UrShop support SMS?",
        answer: [
          "Yes, through your own BulkSMSBD account. Customers can get order SMS when an order is placed, confirmed, delivered or cancelled, in Bangla or English, using templates you can edit.",
          "Where available, you can also send promotional SMS campaigns to customers who've agreed to receive them, and use SMS for abandoned-checkout recovery.",
        ],
        keywords: ["bulksmsbd", "text message", "campaign", "bulk sms"],
      },
      {
        id: "sms-delivery-status",
        question: "Does UrShop confirm that an SMS was delivered?",
        answer: [
          "UrShop shows the status of each message. A message marked as sent means the SMS provider accepted it; whether it reaches the phone depends on the provider and the mobile network.",
        ],
        keywords: ["delivery report", "sms status", "sent"],
      },
      {
        id: "sms-unsubscribe",
        question: "Can customers opt out of promotional SMS?",
        answer: [
          "Yes. Promotional messages include a way to unsubscribe, and campaigns skip customers who have opted out. Opting out of promotions doesn't stop service messages about orders they've placed.",
        ],
        keywords: ["unsubscribe", "stop sms", "opt out", "consent"],
      },
      {
        id: "website-chat",
        question: "Can shoppers chat with my store?",
        answer: [
          "Where store chat is enabled for your store, shoppers can open a chat on any page of your storefront and your team replies from an inbox in the dashboard. You choose whether chats are answered by AI, by your team, or both.",
          "Shoppers can also reach you through the contact form on your store, which arrives in your dashboard inbox.",
        ],
        keywords: ["live chat", "chat widget", "contact form", "inbox"],
      },
      {
        id: "meta-messaging",
        question: "Can I manage Facebook, Instagram or WhatsApp messages in UrShop?",
        answer: [
          "Not yet. Messaging for Facebook, Instagram and WhatsApp is coming soon. Until then, you can talk to shoppers through your store's website chat and contact form.",
        ],
        keywords: ["messenger", "instagram dm", "whatsapp", "meta", "social inbox"],
      },
    ],
  },
  {
    id: "staff-security",
    title: "Staff, account & security",
    navLabel: "Staff & security",
    description: "Team access, permissions, signing in and account security.",
    icon: "admin_panel_settings",
    questions: [
      {
        id: "invite-staff",
        question: "Can I invite staff without sharing my password?",
        answer: [
          "Yes. Invite team members by email and each one gets their own login. You can disable or suspend a staff account at any time.",
        ],
        keywords: ["team", "employee", "user", "sub account"],
      },
      {
        id: "staff-permissions",
        question: "Can I limit what staff can see and do?",
        answer: [
          "Yes. Start from a role preset or choose permissions area by area, deciding whether someone can view or manage it. Sensitive areas such as revenue, payments, couriers, domains and settings can be kept to the people who need them.",
          "An activity log records what staff do in the dashboard.",
        ],
        keywords: ["roles", "access", "permissions", "audit log"],
      },
      {
        id: "password-reset",
        question: "How do I reset my password?",
        answer: [
          "Use the forgot-password option on the sign-in page and follow the steps to set a new password.",
        ],
        keywords: ["forgot password", "login problem", "reset"],
        link: { label: "Go to sign in", href: siteConfig.adminSignInUrl },
      },
      {
        id: "google-sign-in",
        question: "Can I sign in with Google?",
        answer: [
          "When the Google option is shown on the sign-in page, you can use it to sign in to your merchant account.",
        ],
        keywords: ["google login", "social login"],
      },
      {
        id: "two-factor",
        question: "Does UrShop support two-factor authentication?",
        answer: [
          "Yes. You can turn on two-factor authentication with an authenticator app, keep recovery codes in case you lose your phone, and review where your account is signed in.",
        ],
        keywords: ["2fa", "mfa", "authenticator", "security"],
      },
      {
        id: "account-restricted",
        question: "What happens if my subscription or account is restricted?",
        answer: [
          "Parts of the dashboard can be restricted until the subscription is sorted out. Your account, help and subscription pages stay available so you can see what's needed and get it resolved.",
        ],
        keywords: ["subscription", "expired", "locked", "suspended", "billing"],
        link: { label: "Contact the UrShop team", href: "/contact" },
      },
    ],
  },
  {
    id: "advanced",
    title: "Wholesale, blog & advanced features",
    navLabel: "Wholesale & advanced",
    description: "Selling to businesses, publishing articles and features enabled per store.",
    icon: "handshake",
    questions: [
      {
        id: "wholesale",
        question: "Can I sell wholesale (B2B)?",
        answer: [
          "Yes, where wholesale is enabled for your store. Businesses apply to become wholesale buyers, you review their application, and approved members shop a separate wholesale catalog with its own cart and checkout.",
          "Wholesale access is tied to customer accounts, so buyers sign in to shop at wholesale prices.",
        ],
        keywords: ["b2b", "bulk", "reseller", "trade"],
      },
      {
        id: "wholesale-pricing",
        question: "Can wholesale prices differ from retail?",
        answer: [
          "Yes. Wholesale uses your existing products and stock, with its own pricing (a percentage or fixed amount) and minimum, maximum and step quantities, including per-option rules.",
          "Retail shoppers never see wholesale prices.",
        ],
        keywords: ["moq", "minimum order", "bulk price", "tier pricing"],
      },
      {
        id: "blog",
        question: "Can I publish blog articles?",
        answer: [
          "Yes. Write articles with categories, link them to the products they mention, schedule when they publish and set their search and social sharing details.",
        ],
        keywords: ["articles", "content", "posts", "news"],
      },
      {
        id: "feature-availability",
        question: "Are all features available on every store?",
        answer: [
          "Most features are included for every store. A few, such as customer accounts, Secure COD, abandoned-checkout recovery, store chat and Store AI Reports, are switched on per store. Others need your own account with a service, such as bKash, a courier or BulkSMSBD.",
          "If a feature isn't showing in your dashboard, contact us and we'll tell you whether it can be enabled for your store.",
        ],
        keywords: ["on request", "enable", "missing feature", "gated", "plan"],
        link: { label: "See every feature", href: "/features" },
      },
    ],
  },
  {
    id: "shopping",
    title: "Shopping on an UrShop store",
    navLabel: "For shoppers",
    description: "For customers buying from a store that runs on UrShop.",
    icon: "shopping_bag",
    questions: [
      {
        id: "shopper-contact-store",
        question: "Who do I contact about an order?",
        answer: [
          "Each store on UrShop is run by its own merchant, who handles products, delivery, returns and refunds. Contact the store directly using the details or contact form on its website.",
        ],
        keywords: ["seller", "merchant", "complaint", "help with order"],
      },
      {
        id: "shopper-guest",
        question: "Can I shop without creating an account?",
        answer: [
          "Yes. You can check out as a guest with your name, mobile number and address. Some stores also offer accounts if you'd like to save addresses and see your order history.",
        ],
        keywords: ["guest checkout", "no account"],
      },
      {
        id: "shopper-track-order",
        question: "Can I track my order without an account?",
        answer: [
          "Yes. Use the store's order tracking page with your order number and the mobile number you used at checkout, or open the tracking link from your order email.",
        ],
        keywords: ["where is my order", "order status", "tracking"],
      },
      {
        id: "shopper-invoice",
        question: "Can I get an invoice for my order?",
        answer: ["Yes. You can open your order's invoice from its link to view or print it."],
        keywords: ["receipt", "bill", "print"],
      },
      {
        id: "shopper-cancel",
        question: "Can I cancel an order?",
        answer: [
          "You can request a cancellation from your order. The store reviews the request and lets you know whether it's approved.",
        ],
        keywords: ["cancel order", "cancellation"],
      },
      {
        id: "shopper-cart",
        question: "Will my cart be saved?",
        answer: [
          "Yes. Your cart stays saved on the same device and browser, so it's there when you come back. Clearing your browser data removes it.",
        ],
        keywords: ["basket", "shopping bag", "saved cart"],
      },
      {
        id: "shopper-wishlist",
        question: "Is there a wishlist?",
        answer: [
          "Yes. Tap the heart on a product to save it. Your wishlist is kept on your device, and if the store offers accounts and you sign in, it syncs across your devices.",
        ],
        keywords: ["favorites", "saved items", "heart"],
      },
      {
        id: "shopper-currency",
        question: "Which currency are prices in?",
        answer: [
          "Prices are shown in Bangladeshi Taka (BDT). There's no option to switch to another currency.",
        ],
        keywords: ["taka", "bdt", "tk", "dollar", "currency converter"],
      },
    ],
  },
];

const questionsById = new Map(
  faqCategories.flatMap((category) =>
    category.questions.map((question) => [question.id, question] as const),
  ),
);

/** Looks up a question by id. Throws on an unknown id so a typo fails the build, not the page. */
export function faqById(id: string): FaqQuestion {
  const question = questionsById.get(id);
  if (!question) throw new Error(`FAQ: unknown question id "${id}".`);
  return question;
}

/** Shown first on the FAQ page as shortcuts, in this order. */
export const popularFaqIds: ReadonlyArray<string> = [
  "create-store",
  "need-domain",
  "payment-methods",
  "secure-cod",
  "couriers",
  "delivery-charges",
  "stock-management",
  "coupons",
  "accounts-required",
  "customize-storefront",
  "sms",
  "feature-availability",
];
