"use client";

import { Button } from "@/components/ui/button";

import { Section } from '@/components/section';
import { MotionInView } from '@/components/motion-in-view';

export function Hero() {
  return (
    <Section className="pt-12 sm:pt-16 bg-radial-fade">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <MotionInView className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Автоматизация и ИИ‑агенты на n8n: меньше рутины — больше роста
          </h1>
          <p className="text-lg text-muted-foreground">
            Внедряю n8n и LLM‑агентов, подключаю ваши сервисы и строю процессы,
            которые экономят до 75% времени команды.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href="/contact">Бесплатная консультация</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/courses">Курсы по n8n</a>
            </Button>
          </div>
        </MotionInView>
        <MotionInView className="rounded-xl border bg-card p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Три карточки преимуществ остаются как есть, рендерятся на главной */}
          </div>
        </MotionInView>
      </div>
    </Section>
  );
}
