import { termsSections } from "@/components/legal/terms";
import { LegalPage } from "@/components/legal/legal-page";
import { legalDocuments } from "@/config/legal";
import { pageMetadata } from "@/lib/metadata";

const legalDocument = legalDocuments.terms;

export const metadata = pageMetadata({
  path: legalDocument.path,
  title: `${legalDocument.title} | UrShop`,
  description: legalDocument.description,
});

export default function TermsPage() {
  return <LegalPage legalDocument={legalDocument} sections={termsSections} />;
}
