import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/header';
import Link from 'next/link';
import './globals.css';
import { SkipLink } from '@/components/skip-link';
import { MobileStickyCta } from '@/components/mobile-sticky-cta';

export const viewport = {
  colorScheme: 'dark light',
};

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: {
    default: 'Иван — Автоматизация и Курсы n8n',
    template: '%s | Иван — Автоматизация и Курсы n8n',
  },
  description:
    'Автоматизация процессов и ИИ‑агенты на n8n. Курсы, консалтинг, внедрение и поддержка.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleUrl = process.env.NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL || "https://plausible.io/js/script.js";
  const crispId = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SkipLink />
        <ThemeProvider>
          <div className="min-h-dvh flex flex-col">
            <Header />
            <main id="content" className="flex-1 pb-28 md:pb-0">{children}</main>
            <footer className="border-t bg-background/50">
              <div className="wrapper py-12">
                <div className="grid gap-8 md:grid-cols-4">
                  <div>
                    <p className="font-semibold mb-3">n8n Автоматизация</p>
                    <p className="text-sm text-muted-foreground">
                      Автоматизация процессов и ИИ-агенты для вашего бизнеса
                    </p>
                  </div>
                  <div>
                    <p className="font-medium mb-3">Услуги</p>
<ul className="space-y-2 text-[15px] text-muted-foreground">
                      <li><Link href="/services" className="hover:text-foreground transition-colors">Внедрение</Link></li>
                      <li><Link href="/courses" className="hover:text-foreground transition-colors">Обучение</Link></li>
                      <li><Link href="/cases" className="hover:text-foreground transition-colors">Кейсы</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-3">Компания</p>
<ul className="space-y-2 text-[15px] text-muted-foreground">
                      <li><Link href="/blog" className="hover:text-foreground transition-colors">Блог</Link></li>
                      <li><Link href="/about" className="hover:text-foreground transition-colors">О нас</Link></li>
                      <li><Link href="/contact" className="hover:text-foreground transition-colors">Контакты</Link></li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium mb-3">Правовая информация</p>
<ul className="space-y-2 text-[15px] text-muted-foreground">
                      <li><Link href="/privacy" className="hover:text-foreground transition-colors">Политика конфиденциальности</Link></li>
                      <li><Link href="/terms" className="hover:text-foreground transition-colors">Условия использования</Link></li>
                    </ul>
                  </div>
                </div>
<div className="mt-8 pt-8 border-t text-center text-[15px] text-muted-foreground">
                  © {new Date().getFullYear()} Иван Хохолков. Все права защищены.
                </div>
              </div>
            </footer>
            <MobileStickyCta />
          </div>
        </ThemeProvider>
        <Analytics />
        {plausibleDomain ? (
          <Script strategy="afterInteractive" data-domain={plausibleDomain} src={plausibleUrl} />
        ) : null}
        {crispId ? (
          <Script id="crisp-widget" strategy="afterInteractive">
            {`
              window.$crisp=[];window.CRISP_WEBSITE_ID='${crispId}';
              (function(){
                var d=document,s=d.createElement('script');
                s.src='https://client.crisp.chat/l.js'; s.async=1;
                d.getElementsByTagName('head')[0].appendChild(s);
              })();
            `}
          </Script>
        ) : null}
      </body>
    </html>
  );
}
