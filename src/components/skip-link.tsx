"use client";

export function SkipLink({ target = "#content" }: { target?: string }) {
  return (
    <a
      href={target}
      className="sr-only focus:not-sr-only fixed top-2 left-2 z-[100] rounded-md bg-primary px-3 py-2 text-primary-foreground shadow"
    >
      К содержанию
    </a>
  );
}

