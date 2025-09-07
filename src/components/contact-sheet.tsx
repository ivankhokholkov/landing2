"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ContactQuickActions } from "@/components/contact-quick-actions";

export function ContactSheet({ triggerLabel = "Связаться", asChild = false, children }: { triggerLabel?: string; asChild?: boolean; children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* Всегда используем asChild у триггера, чтобы не вкладывать <button> в <button> */}
      <SheetTrigger asChild>
        {asChild ? children : <Button>{triggerLabel}</Button>}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Оставить заявку</SheetTitle>
        </SheetHeader>
        <div className="p-4 space-y-4">
          <ContactQuickActions />
        </div>
      </SheetContent>
    </Sheet>
  );
}

