"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// Minimal, dependency-free reCAPTCHA v3 integration (optional)
declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

function useRecaptcha(siteKey?: string) {
  const loaded = useRef(false);
  const loadScript = useCallback(async () => {
    if (!siteKey) return false;
    if (loaded.current) return true;
    if (typeof window === "undefined") return false;
    if (window.grecaptcha) {
      loaded.current = true;
      return true;
    }
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement("script");
      s.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      s.async = true;
      s.defer = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error("reCAPTCHA failed to load"));
      document.head.appendChild(s);
    });
    loaded.current = true;
    return true;
  }, [siteKey]);

  const execute = useCallback(async () => {
    if (!siteKey) return null;
    const ok = await loadScript();
    if (!ok || !window.grecaptcha) return null;
    await new Promise<void>((r) => window.grecaptcha!.ready(() => r()));
    try {
      const token = await window.grecaptcha!.execute(siteKey, { action: "lead" });
      return token || null;
    } catch {
      return null;
    }
  }, [siteKey, loadScript]);

  return { execute } as const;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; error?: string }>(null);
  const hpRef = useRef<HTMLInputElement | null>(null);

  const recaptchaSiteKey = useMemo(() => process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || undefined, []);
  const { execute } = useRecaptcha(recaptchaSiteKey);

  const onSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setResult(null);
    try {
      const website = hpRef.current?.value || ""; // honeypot
      let captcha: string | null = null;
      if (recaptchaSiteKey) {
        captcha = await execute();
      }
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, service: service || undefined, captcha, website }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        setResult({ ok: false, error: json?.error || `HTTP ${res.status}` });
      } else {
        setResult({ ok: true });
        setName("");
        setEmail("");
        setMessage("");
        setService("");
        if (hpRef.current) hpRef.current.value = "";
      }
    } catch {
      setResult({ ok: false, error: "network_error" });
    } finally {
      setSubmitting(false);
    }
  }, [name, email, message, service, submitting, execute, recaptchaSiteKey]);

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input ref={hpRef} name="website" type="text" tabIndex={-1} aria-hidden="true" className="hidden" autoComplete="off" />

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Имя</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" />
        </div>
        <div>
          <label className="mb-1 block text-sm">Email</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required autoComplete="email" />
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm">Сообщение</label>
        <Textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} />
      </div>
      <div>
        <label className="mb-1 block text-sm">Услуга (необязательно)</label>
        <Input value={service} onChange={(e) => setService(e.target.value)} placeholder="Например: Разработка workflow" />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Отправка…" : "Отправить заявку"}
        </Button>
        {result?.ok === true ? (
          <span className="text-sm text-green-600">Заявка отправлена!</span>
        ) : result?.ok === false ? (
          <span className="text-sm text-red-600">Ошибка: {result.error}</span>
        ) : null}
      </div>
      {recaptchaSiteKey ? (
        <p className="text-xs text-muted-foreground">Защищено reCAPTCHA v3: действует Политика конфиденциальности и Условия использования Google.</p>
      ) : null}
    </form>
  );
}
