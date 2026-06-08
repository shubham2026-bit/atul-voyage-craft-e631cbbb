import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SITE } from "@/lib/site";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atul Tour & Travels, New Delhi" },
      { name: "description", content: "Call 9810325525 or WhatsApp 9310209227. Office at Sector-6 RK Puram, New Delhi." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const cards = [
    { icon: Phone, title: "Call Us", value: SITE.phone1, href: `tel:${SITE.phone1}`, sub: `Alt: ${SITE.phone2}` },
    { icon: MessageCircle, title: "WhatsApp", value: SITE.phone2, href: SITE.whatsappUrl, sub: "24/7 chat support" },
    { icon: MapPin, title: "Visit Office", value: "Sector-6, RK Puram", href: "#map", sub: "New Delhi – 110022" },
  ];
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Get in Touch</h1>
          <p className="mt-4 text-white/80">We're here 24/7 — call, chat or drop by our office in RK Puram.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map(c => (
              <a key={c.title} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="group rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-xl bg-gradient-gold text-navy shadow-gold">
                  <c.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-navy">{c.title}</h3>
                <div className="mt-1 text-lg font-medium text-foreground">{c.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{c.sub}</div>
              </a>
            ))}
          </div>

          <div id="map" className="mt-12 overflow-hidden rounded-2xl border shadow-elegant">
            <iframe
              title="Atul Tour & Travels location"
              src="https://www.google.com/maps?q=Sector+6+RK+Puram+New+Delhi+110022&output=embed"
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-8 rounded-2xl border bg-card p-6 text-center sm:p-8">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-gold-dark" /> Always open — 24/7</div>
              <span className="hidden h-1 w-1 rounded-full bg-border sm:block" />
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold-dark" /> {SITE.address}</div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
