"use client";

import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Report error to Sentry (safe even if DSN is not set)
  try {
    Sentry.captureException(error);
  } catch {}

  return (
    <html>
      <body className="wrapper py-16">
        <h2 className="text-2xl font-semibold mb-4">Что-то пошло не так</h2>
        <p className="text-muted-foreground mb-6">
          Мы уже получили отчёт об ошибке. Попробуйте обновить страницу или вернуться на главную.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex items-center rounded-md border px-4 py-2 text-sm"
          >
            Попробовать снова
          </button>
          <a href="/" className="inline-flex items-center rounded-md border px-4 py-2 text-sm">
            На главную
          </a>
        </div>
      </body>
    </html>
  );
}

