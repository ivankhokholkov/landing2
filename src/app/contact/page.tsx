import { ContactForm } from "@/components/forms/contact-form";

export const metadata = { title: "Контакты и заявка" };

export default function ContactPage() {
  const calLink = process.env.NEXT_PUBLIC_CAL_LINK || "https://cal.com/";
  return (
    <div className="container mx-auto px-4 py-12 space-y-6">
      <h1 className="text-3xl font-bold">Контакты</h1>
      <p className="text-muted-foreground">Оставьте заявку или забронируйте слот в календаре.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <ContactForm />
        <div className="rounded-lg border overflow-hidden">
          <iframe
            title="Календарь"
            src={calLink}
            className="h-[540px] w-full"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}
