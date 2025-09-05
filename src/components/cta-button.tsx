import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTAButton({
  href,
  label,
  variant = "default",
  size = "lg",
  className,
}: {
  href: string;
  label: string;
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost" | "link";
  size?: "sm" | "default" | "lg" | "icon";
  className?: string;
}) {
  return (
    <Button asChild variant={variant} size={size} className={className}>
      <Link href={href}>{label}</Link>
    </Button>
  );
}

