import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from '@/components/hero';

import { JsonLd } from '@/components/jsonld';

export default function Home() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Иван — Автоматизация и Курсы n8n",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  };
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Автоматизация процессов и ИИ‑агенты на n8n",
    provider: { "@type": "Person", name: "Иван" },
  };
  return (
    <div className="space-y-24">
      <JsonLd data={org} />
      <JsonLd data={service} />
      {/* Hero */}
      <Hero />
      {/* Advantages block */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Рост и время",
              desc: "Меньше рутины, меньше ошибок. Команда делает больше ценного.",
            },
            {
              title: "ИИ в процессах",
              desc: "LLM‑агенты принимают решения и подсказывают прямо в потоках.",
            },
            {
              title: "Кастомизация",
              desc: "Любые API и сервисы. Облако или self‑host — как удобно.",
            },
            {
              title: "Быстрый ROI",
              desc: "Эффект за недели. До 75% экономии времени.",
            },
          ].map((i) => (
            <Card key={i.title}>
              <CardHeader>
                <CardTitle className="text-base">{i.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {i.desc}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
