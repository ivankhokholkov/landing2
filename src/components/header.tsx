"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ContactSheet } from "@/components/contact-sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Услуги", href: "/services" },
  { name: "Курсы", href: "/courses" },
  { name: "Кейсы", href: "/cases" },
  { name: "Блог", href: "/blog" },
  { name: "Контакты", href: "/contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="wrapper">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 font-semibold text-lg"
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              n8n
            </span>
            <span>Автоматизация</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
className={cn(
                  "px-3 py-2 text-[15px] font-medium transition-colors hover:text-foreground/80",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <ContactSheet asChild>
              <Button size="sm">Начать проект</Button>
            </ContactSheet>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-3 py-2 text-lg font-medium transition-colors hover:text-foreground/80",
                        pathname === item.href
                          ? "text-foreground bg-muted rounded-md"
                          : "text-foreground/60"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/contact" onClick={() => setIsOpen(false)}>
                        Начать проект
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
