import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/jsonld";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
export const metadata = { title: "Курсы по n8n", alternates: { canonical: `${base}/courses` } };

export default function CoursesPage() {
  const url = process.env.NEXT_PUBLIC_COURSES_URL;
  const jsonld = url
    ? {
        "@context": "https://schema.org",
        "@type": "Course",
        name: "Курс по n8n",
        provider: { "@type": "Person", name: "Иван" },
        url,
      }
    : null;
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      {jsonld ? <JsonLd data={jsonld} /> : null}
      <h1 className="text-3xl font-bold">Курсы</h1>
      <p className="text-muted-foreground max-w-2xl">
        Практические программы по n8n: от первых сценариев до продакшн‑потоков.
      </p>
      {url ? (
        <Button asChild size="lg">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Перейти на курс
          </a>
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">
          Ссылка на курсы пока не указана. Заполните NEXT_PUBLIC_COURSES_URL в .env.local
        </p>
      )}
    </div>
  );
}
