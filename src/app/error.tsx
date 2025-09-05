"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Optional: send to monitoring
    // console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">Произошла ошибка</h1>
      <p className="text-muted-foreground mb-8">Мы уже работаем над этим. Попробуйте обновить страницу.</p>
      <div className="flex justify-center">
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  );
}

