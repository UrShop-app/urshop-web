import { dataDeletionSections } from "@/components/legal/data-deletion";
import { LegalPage } from "@/components/legal/legal-page";
import { legalDocuments } from "@/config/legal";
import { pageMetadata } from "@/lib/metadata";

const legalDocument = legalDocuments.dataDeletion;

export const metadata = pageMetadata({
  path: legalDocument.path,
  title: `${legalDocument.title} | UrShop`,
  description: legalDocument.description,
});

export default function DataDeletionPage() {
  return <LegalPage legalDocument={legalDocument} sections={dataDeletionSections} />;
}
