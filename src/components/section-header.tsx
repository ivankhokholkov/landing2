import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

export function SectionHeader({
  badge,
  title,
  description,
  align = "center",
  as = "h2",
  className,
}: {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
}) {
  const alignClass = align === "center" ? "text-center" : "text-left";
  const Heading = as;
  return (
    <div className={clsx("mb-12", alignClass, className)}>
      {badge ? <Badge size="sm" className="mb-4">{badge}</Badge> : null}
      <Heading className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-balance">{title}</Heading>
      {description ? (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {description}
        </p>
      ) : null}
    </div>
  );
}

