export function JsonLd({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data);
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD injection by design
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
