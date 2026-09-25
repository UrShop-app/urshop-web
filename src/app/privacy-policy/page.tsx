import { privacyPolicySections } from "@/components/legal/privacy-policy";
import { LegalPage } from "@/components/legal/legal-page";
import { legalDocuments } from "@/config/legal";
import { pageMetadata } from "@/lib/metadata";

const legalDocument = legalDocuments.privacyPolicy;

export const metadata = pageMetadata({
  path: legalDocument.path,
  title: `${legalDocument.title} | UrShop`,
  description: legalDocument.description,
});

export default function PrivacyPolicyPage() {
  return <LegalPage legalDocument={legalDocument} sections={privacyPolicySections} />;
}
