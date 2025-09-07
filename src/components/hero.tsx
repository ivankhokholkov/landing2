"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from 'next/link';
import { heroBadges, trustIndicators } from "@/data/home";
import { enterUp } from "@/lib/animations";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-transparent to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-100/20 dark:from-purple-900/10 hidden sm:block" />
      </div>
      
      {/* Background shapes (static, lightweight for better LCP) */}
      <div className="hidden sm:block absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-purple-400/10 to-transparent blur-2xl" />
        <div className="absolute -bottom-1/2 -left-1/2 h-[700px] w-[700px] rounded-full bg-gradient-to-tr from-blue-400/10 to-transparent blur-2xl" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badges */}
          <motion.div
            {...enterUp(0)}
            className="flex flex-wrap justify-center gap-1 mb-4"
          >
            {heroBadges.map((item) => (
              <Badge key={item.label} variant="secondary" size="xxs">
                <item.icon className="mr-1" aria-hidden="true" />
                {item.label}
              </Badge>
            ))}
          </motion.div>

          {/* Main heading */}
          <motion.h1
            {...enterUp(0.1)}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Автоматизация процессов
            <span className="block mt-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              с ИИ-агентами на n8n
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            {...enterUp(0.2)}
            className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Внедряю умные workflow, которые экономят до 120 часов в месяц. 
            Интеграция с любыми API, LLM-агенты для принятия решений, 
            полная кастомизация под ваши задачи.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...enterUp(0.3)}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="group" asChild>
              <Link href="/contact">
                Получить консультацию
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/cases">
                Смотреть кейсы
              </Link>
            </Button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            {...enterUp(0.4)}
            className="mt-12 grid grid-cols-1 gap-4 text-base text-muted-foreground sm:grid-cols-3"
          >
            {trustIndicators.map((ti) => (
              <div key={ti.label} className="flex items-center justify-center gap-2">
                <ti.icon className="w-4 h-4" aria-hidden="true" />
                <span>{ti.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
