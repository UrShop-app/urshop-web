import { serializeJsonLd } from "@/lib/structured-data";

/** Structured data for search engines. Server-rendered; describes only what the page shows. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
