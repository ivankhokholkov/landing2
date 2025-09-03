import { Button } from "@/components/ui/button";

export const metadata = { title: "Курсы по n8n" };

export default function CoursesPage() {
  const url = process.env.NEXT_PUBLIC_COURSES_URL;
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
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
