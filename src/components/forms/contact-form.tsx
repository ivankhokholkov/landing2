"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const LeadSchema = z.object({
  name: z.string().min(1, "Введите имя"),
  email: z.string().email("Некорректный email"),
  message: z.string().min(1, "Введите сообщение").max(5000),
});

type LeadValues = z.infer<typeof LeadSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, formState: { errors }, reset } = useForm<LeadValues>({
    resolver: zodResolver(LeadSchema),
  });

  const onSubmit = async (values: LeadValues) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "contact-page" }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      // Plausible event (if enabled)
      try {
        // @ts-expect-error plausible may be injected globally
        window?.plausible?.("Lead Submitted", { props: { source: "contact-page" } });
      } catch {}
      reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">Имя</label>
        <input id="name" className="h-10 rounded-md border bg-background px-3" {...register("name")} />
        {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">Email</label>
        <input id="email" type="email" className="h-10 rounded-md border bg-background px-3" {...register("email")} />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">Сообщение</label>
        <textarea id="message" className="min-h-28 rounded-md border bg-background px-3 py-2" {...register("message")} />
        {errors.message && <p className="text-sm text-red-600">{errors.message.message}</p>}
      </div>
      <button disabled={status === "loading"} className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-60">
        {status === "loading" ? "Отправка..." : "Отправить"}
      </button>
      {status === "success" && <p className="text-sm text-green-600">Заявка отправлена!</p>}
      {status === "error" && <p className="text-sm text-red-600">Ошибка отправки. Попробуйте ещё раз.</p>}
    </form>
  );
}
