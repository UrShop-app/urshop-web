import Link from "next/link";

import { legalDocuments } from "@/config/legal";

import { SupportEmailLink, type LegalSection } from "./legal-page";

// Legal copy: change the wording only with legal review, and update `lastUpdated` in config/legal.ts.
export const termsSections: ReadonlyArray<LegalSection> = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          UrShop (urshop.app) provides ecommerce software that helps merchants create and manage
          online storefronts, products, customer accounts, checkout, orders, and related ecommerce
          operations. These Terms of Service explain the basic rules for using the UrShop platform.
        </p>
        <p>
          By accessing or using UrShop, including the admin dashboard, merchant tools, customer
          account features, or a UrShop-powered storefront, you agree to these terms. If you are
          using UrShop on behalf of a business or merchant, you confirm that you have authority to
          accept these terms for that business.
        </p>
      </>
    ),
  },
  {
    id: "platform-role",
    title: "Platform Role",
    content: (
      <>
        <p>
          UrShop provides the software infrastructure used by merchants to operate ecommerce
          storefronts. Merchants are independent businesses and are responsible for the products,
          pricing, store content, fulfillment, customer service, refunds, taxes, legal compliance,
          and business decisions related to their own stores.
        </p>
        <p>
          Customers who purchase from a UrShop-powered storefront are buying from the relevant
          merchant, not directly from UrShop, unless clearly stated otherwise.
        </p>
      </>
    ),
  },
  {
    id: "account-registration-and-security",
    title: "Account Registration and Security",
    content: (
      <>
        <p>
          You are responsible for keeping your account credentials secure and for all activity that
          occurs under your account. You must provide accurate account information and notify us
          promptly if you believe your account has been accessed without authorization.
        </p>
        <p>
          We may suspend or restrict access to accounts where we reasonably believe there is
          unauthorized access, security risk, fraud, abuse, violation of these terms, or activity
          that may harm the platform, merchants, customers, or others.
        </p>
      </>
    ),
  },
  {
    id: "merchant-responsibilities",
    title: "Merchant Responsibilities",
    content: (
      <>
        <p>Merchants using UrShop are responsible for:</p>
        <ul>
          <li>
            Store content, product descriptions, images, prices, promotions, and other materials
            displayed on their storefront.
          </li>
          <li>
            Product quality, availability, fulfillment, delivery, returns, refunds, warranties, and
            customer support.
          </li>
          <li>
            Setting accurate pricing, tax, shipping, payment, cancellation, and refund policies.
          </li>
          <li>
            Complying with laws, regulations, licenses, permits, and industry rules that apply to
            their business, products, customers, and locations.
          </li>
          <li>
            Maintaining appropriate privacy practices, customer notices, and legal policies for
            their own store operations.
          </li>
          <li>
            Ensuring that their use of UrShop does not infringe the rights of others or violate
            applicable platform rules.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "customer-responsibilities",
    title: "Customer Responsibilities",
    content: (
      <>
        <p>Customers using UrShop-powered storefronts or customer account features agree to:</p>
        <ul>
          <li>
            Provide accurate and complete information during checkout, account registration,
            delivery, and support interactions.
          </li>
          <li>Use storefronts and customer accounts only for lawful purposes.</li>
          <li>Avoid fraudulent, abusive, misleading, or harmful activity.</li>
          <li>
            Keep login credentials secure and notify the relevant merchant or UrShop if they believe
            their account has been compromised.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payments-orders-and-fulfillment",
    title: "Payments, Orders, and Fulfillment",
    content: (
      <>
        <p>
          Merchants are responsible for configuring and managing the payment, shipping, delivery,
          refund, and fulfillment options offered through their storefronts. Payment processors,
          delivery providers, and other third-party services may have their own terms and policies.
        </p>
        <p>
          UrShop may provide tools to help merchants manage orders, invoices, payments, fulfillment,
          and customer communications, but the merchant remains responsible for the accuracy and
          handling of their store operations.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    content: (
      <>
        <p>You may not use the UrShop platform to:</p>
        <ul>
          <li>Violate any applicable law, regulation, or third-party right.</li>
          <li>
            Sell, promote, or distribute products or services that are illegal, unsafe, deceptive,
            or otherwise prohibited by applicable rules.
          </li>
          <li>
            Upload or distribute malware, phishing content, harmful code, spam, or abusive content.
          </li>
          <li>
            Infringe intellectual property, privacy, publicity, or other legal rights of others.
          </li>
          <li>
            Interfere with, disrupt, overload, reverse engineer, or attempt to gain unauthorized
            access to the platform, systems, data, or accounts.
          </li>
          <li>Use the platform for fraudulent, misleading, harmful, or abusive activity.</li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          UrShop may integrate with or rely on third-party services such as hosting providers,
          storage providers, payment processors, email services, analytics tools, security tools,
          delivery providers, and authentication providers. These services may be subject to their
          own terms, privacy policies, fees, limitations, and availability.
        </p>
        <p>
          We are not responsible for third-party services that are not controlled by UrShop, but we
          may limit or change integrations where necessary to protect the platform or comply with
          applicable requirements.
        </p>
      </>
    ),
  },
  {
    id: "privacy-and-data",
    title: "Privacy and Data",
    content: (
      <p>
        Our handling of personal data is described in our{" "}
        <Link href={legalDocuments.privacyPolicy.path}>Privacy Policy</Link>. If you used Facebook
        Login or another customer login method and want to request deletion of eligible customer
        account data, please review our{" "}
        <Link href={legalDocuments.dataDeletion.path}>Data Deletion Instructions</Link>.
      </p>
    ),
  },
  {
    id: "service-availability-and-changes",
    title: "Service Availability and Changes",
    content: (
      <>
        <p>
          We work to keep UrShop available and reliable, but we do not guarantee that the platform
          will always be uninterrupted, error-free, or available in every location. The platform may
          be unavailable because of maintenance, updates, outages, security issues, third-party
          service failures, or events outside our reasonable control.
        </p>
        <p>
          We may update, modify, suspend, or discontinue parts of the platform from time to time.
          Where practical, we will try to avoid unnecessary disruption to active merchants and
          customers.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          UrShop, including its software, platform design, branding, logos, and related materials,
          is owned by UrShop or its licensors. Merchants and customers may not copy, modify,
          distribute, or create derivative works from the platform except as allowed by these terms
          or with written permission.
        </p>
        <p>
          Merchants retain responsibility for the content, product data, images, trademarks, and
          materials they upload to their own storefronts. By using the platform, merchants grant
          UrShop the limited rights needed to host, display, process, and transmit that content to
          provide the service.
        </p>
      </>
    ),
  },
  {
    id: "suspension-and-termination",
    title: "Suspension and Termination",
    content: (
      <>
        <p>
          We may suspend or terminate access to UrShop if we reasonably believe that an account or
          store violates these terms, creates security or legal risk, harms the platform or other
          users, or is used for fraudulent or abusive activity.
        </p>
        <p>
          Merchants remain responsible for their own legal, financial, tax, customer, and
          fulfillment obligations even if their access to the platform is suspended or terminated.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <>
        <p>
          The platform is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
          To the extent permitted by law, UrShop disclaims warranties of any kind, whether express,
          implied, or statutory, including warranties of merchantability, fitness for a particular
          purpose, non-infringement, availability, and error-free operation.
        </p>
        <p>
          UrShop does not provide legal, tax, accounting, or financial advice. Merchants are
          responsible for obtaining their own professional advice where needed.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by law, UrShop and its affiliates will not be liable for
          indirect, incidental, special, consequential, exemplary, or punitive damages, including
          lost profits, lost revenue, lost data, business interruption, or loss of goodwill arising
          from or related to use of the platform.
        </p>
        <p>
          To the maximum extent permitted by law, our total liability for claims related to the
          platform will not exceed the amount paid to UrShop by the relevant merchant for the
          platform service during the twelve months before the event giving rise to the claim. Some
          laws do not allow certain limitations, so parts of this section may not apply in all
          cases.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    content: (
      <p>
        We may update these Terms of Service from time to time. Changes will be posted on this page
        with an updated &ldquo;Last updated&rdquo; date. Continued use of the platform after changes
        become effective means you accept the updated terms.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have questions about these Terms of Service, contact us at <SupportEmailLink />.
      </p>
    ),
  },
];
