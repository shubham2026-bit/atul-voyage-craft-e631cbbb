import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { SITE } from "@/lib/site";
import { Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/enquiry")({
  head: () => ({
    meta: [
      { title: "Book a Ride — Atul Tour & Travels" },
      { name: "description", content: "Send a quick enquiry for taxi, airport transfer, outstation or tour packages. We respond within 30 minutes." },
    ],
  }),
  component: EnquiryPage,
});

function EnquiryPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Send Us Your Enquiry</h1>
          <p className="mt-4 text-white/80">Share your trip details and we'll get back in 30 minutes with the best quote.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-sm">
            <a href={`tel:${SITE.phone1}`} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2"><Phone className="h-4 w-4 text-gold" />{SITE.phone1}</a>
            <a href={SITE.whatsappUrl} className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2"><MessageCircle className="h-4 w-4 text-gold" />WhatsApp</a>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <EnquiryForm />
        </div>
      </section>
    </SiteLayout>
  );
}
