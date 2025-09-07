import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Страница не найдена</h1>
      <p className="text-muted-foreground mb-8">Похоже, такой страницы нет или она была перемещена.</p>
      <Link
        href="/"
        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
      >
        На главную
      </Link>
    </div>
  );
}

