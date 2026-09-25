import Link from "next/link";

import { legalDocuments } from "@/config/legal";

import { SupportEmailLink, type LegalSection } from "./legal-page";

// Legal copy: change the wording only with legal review, and update `lastUpdated` in config/legal.ts.
export const privacyPolicySections: ReadonlyArray<LegalSection> = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          UrShop (urshop.app) is a multi-tenant ecommerce SaaS platform that helps merchants operate
          online storefronts, manage products, process customer orders, and provide related
          ecommerce services. This Privacy Policy explains how UrShop handles personal data when
          merchants use the platform and when customers interact with UrShop-powered storefronts.
        </p>
        <p>
          Each merchant operates an independent storefront on the UrShop platform. Customer
          information is scoped to the specific store or merchant where the customer interacts, and
          customer account data from one store is not intended to be shared with unrelated stores.
        </p>
      </>
    ),
  },
  {
    id: "privacy-responsibilities",
    title: "Privacy Responsibilities",
    content: (
      <>
        <p>
          For most storefront operations, the merchant determines how customer data is used for
          their store, including order fulfillment, customer service, store communications, product
          sales, and related business operations. UrShop processes data to provide, secure,
          maintain, and improve the platform.
        </p>
        <p>
          Depending on the context and applicable law, the merchant and UrShop may have different
          privacy responsibilities. For questions about how a specific merchant uses your data for
          their own store operations, please contact that merchant directly. For questions about how
          UrShop handles platform data, contact us using the email address listed below.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          When you use UrShop or interact with a UrShop-powered storefront, we may collect the
          following types of information:
        </p>
        <ul>
          <li>
            <strong>Account and profile data</strong> — such as your name, email address, phone
            number, and profile details you provide when creating or updating an account.
          </li>
          <li>
            <strong>Authentication data</strong> — such as login method, authentication provider
            IDs, verification status, session data, and security-related account activity.
          </li>
          <li>
            <strong>Third-party login provider data</strong> — identifiers and basic account
            information received from providers such as Google or Facebook when you choose to use
            those login methods.
          </li>
          <li>
            <strong>Checkout and contact details</strong> — such as shipping address, billing
            details, phone number, delivery instructions, and other information entered during
            checkout.
          </li>
          <li>
            <strong>Order, invoice, and support data</strong> — such as purchased items, order
            history, invoices, returns, customer service messages, and related store interactions.
          </li>
          <li>
            <strong>Device, log, and security data</strong> — such as IP address, browser type,
            device information, timestamps, usage logs, and security events used to operate and
            protect the platform.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "login-providers",
    title: "Login Providers and Facebook Login",
    content: (
      <>
        <p>
          Merchants may enable customer account login methods such as email/password login,
          passwordless email login, Google Login, and Facebook Login. Available login methods may
          vary by storefront.
        </p>
        <p>
          When you use Facebook Login, we only request the permissions needed for login, such as{" "}
          <strong>public_profile</strong> and <strong>email</strong>. Facebook may provide your
          name, Facebook user ID, and email address if available. We do not receive your Facebook
          password.
        </p>
        <p>
          You can remove UrShop&apos;s access from your Facebook account at any time through
          Facebook Settings &amp; privacy → Settings → Apps and Websites.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    content: (
      <>
        <p>We use personal data for the following purposes:</p>
        <ul>
          <li>
            <strong>Authentication</strong> — verifying your identity, maintaining sessions, and
            helping protect accounts from unauthorized access.
          </li>
          <li>
            <strong>Customer account features</strong> — managing customer profiles, order history,
            saved addresses, preferences, and related account functionality.
          </li>
          <li>
            <strong>Checkout and order fulfillment</strong> — supporting order placement, payment
            processing, shipping, delivery, returns, and merchant order management.
          </li>
          <li>
            <strong>Security and fraud prevention</strong> — detecting, preventing, and
            investigating unauthorized activity, abuse, fraud, and platform misuse.
          </li>
          <li>
            <strong>Customer support</strong> — responding to questions, troubleshooting issues, and
            resolving disputes or technical problems.
          </li>
          <li>
            <strong>Service maintenance and improvement</strong> — monitoring platform performance,
            fixing bugs, improving features, and maintaining platform reliability.
          </li>
          <li>
            <strong>Legal and compliance purposes</strong> — meeting applicable legal, tax,
            accounting, security, and regulatory obligations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-share-information",
    title: "How We Share Information",
    content: (
      <>
        <p>
          We do not sell personal information. We may share information in the following limited
          circumstances:
        </p>
        <ul>
          <li>
            <strong>With the relevant merchant</strong> — the merchant whose storefront you use can
            access customer and order data for their own store operations, fulfillment, customer
            service, and legal compliance.
          </li>
          <li>
            <strong>With service providers</strong> — providers that help us operate the platform,
            including hosting, storage, email delivery, analytics, security, payment processing,
            content delivery, monitoring, and support tools. These providers are expected to process
            data only for the services they provide to us, subject to applicable contractual,
            confidentiality, and security obligations.
          </li>
          <li>
            <strong>For legal compliance and protection</strong> — when required by law, regulation,
            court order, legal process, or when reasonably necessary to protect the rights, safety,
            property, or security of UrShop, merchants, customers, or others.
          </li>
          <li>
            <strong>Business transfers</strong> — if UrShop is involved in a merger, acquisition,
            financing, reorganization, or sale of assets, information may be transferred as part of
            that transaction, subject to appropriate protections.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention-and-deletion",
    title: "Data Retention and Deletion",
    content: (
      <>
        <p>
          We retain personal data only as long as reasonably necessary to provide the platform,
          support merchant storefront operations, maintain security, resolve disputes, enforce
          agreements, and meet legal, tax, accounting, or regulatory obligations.
        </p>
        <p>
          When personal data is no longer needed, we delete or anonymize it where appropriate. Some
          records, such as completed orders, invoices, fraud prevention records, tax records,
          security logs, or legal compliance records, may need to be retained for a longer period
          where permitted or required by law.
        </p>
        <p>
          To request deletion of customer account data connected to Facebook Login or another login
          method, please follow the instructions on our{" "}
          <Link href={legalDocuments.dataDeletion.path}>Data Deletion Instructions</Link> page.
        </p>
      </>
    ),
  },
  {
    id: "your-choices-and-rights",
    title: "Your Choices and Rights",
    content: (
      <>
        <p>
          Depending on your location and applicable law, you may have the right to request access
          to, correction of, deletion of, or restriction of certain personal data. You may also have
          the right to object to certain processing or request a copy of certain information.
        </p>
        <p>
          To make a privacy request, contact us at <SupportEmailLink />. Please include enough
          information for us to identify your account and the storefront or merchant domain where
          you interacted with UrShop. We may need to verify your identity before processing a
          request.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "Security",
    content: (
      <p>
        We use technical and organizational measures designed to protect personal data against
        unauthorized access, loss, misuse, alteration, and disclosure. However, no online service
        can guarantee absolute security. You are responsible for keeping your account credentials
        secure and for notifying us or the relevant merchant if you believe your account has been
        compromised.
      </p>
    ),
  },
  {
    id: "international-processing",
    title: "International Processing",
    content: (
      <p>
        UrShop may process and store information in countries where we, our infrastructure
        providers, or our service providers operate. Data protection laws in those countries may
        differ from the laws in your location. Where required, we use appropriate safeguards for
        such processing.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        UrShop is not intended for use by children who are not old enough to use online services
        under applicable law. Merchants are responsible for ensuring that their storefronts,
        products, and customer interactions comply with laws that apply to their business and
        audience.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. Changes will be posted on this page
        with an updated &ldquo;Last updated&rdquo; date. We encourage you to review this policy
        periodically.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have questions about this Privacy Policy or how UrShop handles platform data, contact
        us at <SupportEmailLink />.
      </p>
    ),
  },
];
