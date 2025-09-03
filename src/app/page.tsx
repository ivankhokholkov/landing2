import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hero } from '@/components/hero';
import { Section } from '@/components/section';
import { MotionInView } from '@/components/motion-in-view';

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
      <Section>
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
            <MotionInView key={i.title}>
              <Card className="transition-all hover:-translate-y-0.5 hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{i.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {i.desc}
              </CardContent>
              </Card>
            </MotionInView>
          ))}
        </div>
      </Section>
      {/* Stats section */}
      <Section className="bg-grid">
        <div className="grid gap-6 sm:grid-cols-3 text-center">
          {[{k:"часов в месяц",v:"120+"},{k:"ускорение процессов",v:"×3"},{k:"меньше ошибок",v:"−60%"}].map((s)=>(
            <MotionInView key={s.k} className="rounded-xl border p-6 bg-background/60">
              <div className="text-3xl font-bold tracking-tight">{s.v}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.k}</div>
            </MotionInView>
          ))}
        </div>
      </Section>
    </div>
  );
}
