export const metadata = { title: "Обо мне — Иван" };

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Обо мне</h1>
      <p className="text-muted-foreground max-w-2xl">
        Привет! Я Иван. Помогаю бизнесу внедрять n8n и ИИ‑агентов, чтобы ускорять процессы и
        расти без лишней рутины. Провожу обучение и делюсь практикой на курсах.
      </p>
    </div>
  );
}
