import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';
import './globals.css';

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
        <ThemeProvider>
          <div className="min-h-dvh">
            <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link href="/" className="font-semibold">
                  Иван — n8n Автоматизация
                </Link>
                <nav className="flex items-center gap-4 text-sm">
                  <Link href="/services" className="hover:underline">
                    Услуги
                  </Link>
                  <Link href="/courses" className="hover:underline">
                    Курсы
                  </Link>
                  <Link href="/cases" className="hover:underline">
                    Кейсы
                  </Link>
                  <Link href="/blog" className="hover:underline">
                    Блог
                  </Link>
                  <Link href="/contact" className="hover:underline">
                    Контакты
                  </Link>
                </nav>
<div className="flex items-center gap-3">
                  <Link href="/contact" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 text-xs font-medium text-primary-foreground shadow hover:bg-primary/90">
                    Консультация
                  </Link>
                  <ThemeToggle />
                </div>
              </div>
            </header>
            <main className="container mx-auto px-4 py-8">{children}</main>
            <footer className="border-t py-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Иван. Все права защищены. · <Link href="/privacy">Политика</Link> ·{' '}
              <Link href="/terms">Условия</Link>
            </footer>
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
