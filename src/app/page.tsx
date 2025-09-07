"use client";

import { Hero } from '@/components/hero';
import { JsonLd } from '@/components/jsonld';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  CheckCircle,
  Star,
  Quote
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '@/components/section';
import { CTAButton } from '@/components/cta-button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { fadeInUp } from '@/lib/animations';

import { SectionHeader } from '@/components/section-header';
import { features, stats, services, testimonials } from '@/data/home';

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
    <>
      <JsonLd data={org} />
      <JsonLd data={service} />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <Section>
          <motion.div {...fadeInUp}>
            <SectionHeader
              badge="Возможности"
              title="Полный контроль над автоматизацией"
              description="n8n — это мощная платформа для создания workflow любой сложности"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
<feature.icon className="h-10 w-10 mb-3 text-primary" aria-hidden="true" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
      </Section>

      {/* Stats Section */}
      <Section className="bg-muted/50">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
<div className="mt-2 text-muted-foreground text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
      </Section>

      {/* Services Section */}
      <Section>
          <motion.div {...fadeInUp} className="text-center mb-12">
            <SectionHeader
              badge="Услуги"
              title="Выберите подходящий формат работы"
              description="От консультации до полного внедрения под ключ"
            />
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`h-full ${service.highlighted ? 'border-primary shadow-lg' : ''}`}>
                  {service.highlighted && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Популярный выбор
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-3xl font-bold">{service.price}</div>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <CTAButton className="w-full" variant={service.highlighted ? 'default' : 'outline'} href={`/contact?service=${encodeURIComponent(service.title)}`} label="Узнать подробнее" />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
      </Section>

      {/* FAQ Section */}
      <Section>
        <motion.div {...fadeInUp}>
          <SectionHeader badge="FAQ" title="Частые вопросы" description="Коротко отвечаем на вопросы, которые чаще всего задают клиенты." />
        </motion.div>
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="q1">
              <AccordionTrigger>Сколько времени занимает внедрение?</AccordionTrigger>
              <AccordionContent>Первые автоматизации запускаем за 2–4 недели. Срок зависит от количества интеграций и сложности сценариев.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>Нужны ли программисты для поддержки?</AccordionTrigger>
              <AccordionContent>Базовые сценарии можно поддерживать без программистов. Мы обучаем вашу команду и передаём документацию.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>Как считаете ROI от автоматизации?</AccordionTrigger>
              <AccordionContent>Считаем экономию времени × стоимость часа сотрудников + снижение ошибок и ускорение SLA. В кейсах — примеры расчётов.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Можно развернуть на своих серверах?</AccordionTrigger>
              <AccordionContent>Да, поддерживаем self‑hosted. Настроим мониторинг, бэкапы и доступы по требованиям вашей безопасности.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section className="bg-muted/50">
          <motion.div {...fadeInUp}>
            <SectionHeader
              badge="Отзывы"
              title="Что говорят клиенты"
              description="Реальные результаты от реальных компаний"
            />
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-1 mb-2" role="img" aria-label={`Рейтинг ${testimonial.rating} из 5`}>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                      ))}
                    </div>
                    <Quote className="h-8 w-8 text-muted-foreground/20" aria-hidden="true" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground italic">«{testimonial.content}»</p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
      </Section>

      {/* CTA Section */}
      <Section>
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 sm:p-12 text-center text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Готовы автоматизировать ваш бизнес?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Получите бесплатную консультацию и узнайте, как n8n поможет сэкономить время и ресурсы
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CTAButton variant="secondary" href="/contact" label="Начать проект" />
              <CTAButton variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20" href="/courses" label="Пройти обучение" />
            </div>
          </motion.div>
      </Section>
    </>
  );
}
