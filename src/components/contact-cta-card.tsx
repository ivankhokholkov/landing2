"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function ContactCtaCard({
  href,
  label,
  subtitle,
  icon,
  className,
  external = true,
}: {
  href: string;
  label: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external && href.startsWith("http") ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={cn(
        "group block rounded-2xl border bg-card px-5 py-5 shadow-sm transition-colors hover:border-foreground/30 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border bg-background/70 group-hover:bg-background">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-base font-medium leading-tight">{label}</div>
          {subtitle ? (
            <div className="text-sm text-muted-foreground line-clamp-2">{subtitle}</div>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

