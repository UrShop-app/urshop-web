import Link from "next/link";

import { legalDocuments } from "@/config/legal";

import { SupportEmailLink, type LegalSection } from "./legal-page";

// Legal copy: change the wording only with legal review, and update `lastUpdated` in config/legal.ts.
// This page is the data-deletion URL registered for Facebook Login, so keep its path stable.
export const dataDeletionSections: ReadonlyArray<LegalSection> = [
  {
    id: "overview",
    title: "Overview",
    content: (
      <>
        <p>
          If you used Facebook Login to sign in to a storefront powered by UrShop, you can request
          deletion of your customer account data by following the instructions below. These
          instructions also apply if you want to request deletion of customer account data connected
          to another login method supported by a UrShop-powered storefront.
        </p>
        <p>
          UrShop is a multi-tenant ecommerce platform. Customer account and order data is scoped to
          the store or merchant where you interacted, so deletion requests should include the
          specific storefront or domain where you logged in.
        </p>
      </>
    ),
  },
  {
    id: "requesting-deletion-by-email",
    title: "Requesting Deletion by Email",
    content: (
      <>
        <p>
          Send an email to <SupportEmailLink /> with the following information:
        </p>
        <ul>
          <li>The email address you used to log in.</li>
          <li>
            The store or domain where you logged in, such as <strong>mystore.urshop.app</strong> or
            the merchant&apos;s custom domain.
          </li>
          <li>
            A request that includes language such as: &ldquo;Please delete my UrShop customer
            account data connected to Facebook Login.&rdquo;
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "identity-verification",
    title: "Identity Verification",
    content: (
      <p>
        Before processing a deletion request, we may need to verify that you are the person
        associated with the customer account. We may ask for additional information if the request
        does not contain enough details to identify the correct store, account, or login method.
      </p>
    ),
  },
  {
    id: "what-happens-next",
    title: "What Happens Next",
    content: (
      <>
        <p>
          After we receive and verify your request, we will delete or anonymize eligible customer
          account data from our systems where appropriate. We will confirm once the request has been
          reviewed and completed, or explain if certain information cannot be deleted immediately
          because of legal, security, or operational requirements.
        </p>
        <p>
          Some records may need to be retained where permitted or required by law or for legitimate
          business and security purposes, including:
        </p>
        <ul>
          <li>
            Completed orders, invoices, and transaction records needed for tax, accounting, or
            record-keeping obligations.
          </li>
          <li>Fraud prevention, abuse prevention, and security records.</li>
          <li>
            Records needed to resolve disputes, enforce agreements, or comply with legal or
            regulatory obligations.
          </li>
          <li>Backup, archive, or log records that are deleted on a normal retention schedule.</li>
        </ul>
      </>
    ),
  },
  {
    id: "removing-facebook-access",
    title: "Removing UrShop Access from Facebook",
    content: (
      <>
        <p>
          To prevent future login through Facebook, you can remove the UrShop app from your Facebook
          account:
        </p>
        <ol>
          <li>
            Go to <strong>Facebook Settings &amp; privacy</strong> → <strong>Settings</strong>.
          </li>
          <li>
            Click <strong>Apps and Websites</strong>.
          </li>
          <li>
            Find <strong>UrShop</strong> in the list.
          </li>
          <li>
            Click <strong>Remove</strong>.
          </li>
        </ol>
        <p>
          Removing app access from Facebook does not automatically delete data that may already
          exist in a UrShop-powered storefront. To request deletion from UrShop, please send the
          email request described above.
        </p>
      </>
    ),
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    content: (
      <p>
        For more information about how UrShop handles customer, merchant, authentication, order, and
        platform data, please review our{" "}
        <Link href={legalDocuments.privacyPolicy.path}>Privacy Policy</Link>.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    content: (
      <p>
        If you have any questions about data deletion, contact us at <SupportEmailLink />.
      </p>
    ),
  },
];
