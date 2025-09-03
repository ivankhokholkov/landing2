"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="container mx-auto px-4 pt-16">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
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
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl border bg-card p-6"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            {/* Три карточки преимуществ остаются как есть, рендерятся на главной */}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
