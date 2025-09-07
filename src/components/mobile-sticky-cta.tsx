"use client";

import { ContactSheet } from "@/components/contact-sheet";
import { usePathname } from "next/navigation";

export function MobileStickyCta() {
  const pathname = usePathname();
  if (pathname === "/contact") return null; // не показываем на странице контактов, чтобы не дублировать
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/80 backdrop-blur-md p-2 md:hidden shadow-[0_-8px_24px_rgba(0,0,0,0.12)]"
         style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
      <div className="wrapper">
        <ContactSheet triggerLabel="Связаться" />
      </div>
    </div>
  );
}

