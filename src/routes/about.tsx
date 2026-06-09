import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/SectionHead";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock, BadgeCheck, Sparkles, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Atul Tour & Travels" },
      { name: "description", content: "Atul Tour & Travels — a decade of safe, comfortable & reliable travel from New Delhi. Trained drivers, modern fleet and 5000+ happy travellers." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const values = [
    { icon: Shield, t: "Safety First", d: "GPS-tracked cars, verified drivers, regular service." },
    { icon: Clock, t: "Punctuality", d: "On-time pickup and drop — every single trip." },
    { icon: Award, t: "10+ Years", d: "A decade of trust serving families & corporates." },
    { icon: Users, t: "Trained Chauffeurs", d: "Polite, professional, route-savvy drivers." },
    { icon: BadgeCheck, t: "Trusted Service", d: "Clear, honest dealings with every customer." },
    { icon: Sparkles, t: "Premium Care", d: "Personal attention from booking to drop-off." },
  ];

  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">About {SITE.name}</h1>
          <p className="mt-4 text-white/80">{SITE.tagline} — based in New Delhi since 2014.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Our Story" title="ABOUT THE COMPANY" />
          <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-80 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-200 via-orange-300 to-rose-300 text-9xl shadow-elegant">
                🛺
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  {SITE.name} began in 2014 with a single car and a simple promise — to make travel
                  across India safer, more comfortable, and easier to book. A decade later, that promise
                  still drives every ride we operate from our base in RK Puram, New Delhi.
                </p>
                <p>
                  From local Delhi NCR runs and IGI airport transfers to multi-day Golden Triangle,
                  Himalayan, Rajasthan and Char Dham tours — our fleet of sedans, SUVs, Innovas and
                  tempo travellers is ready for groups of any size.
                </p>
                <p>
                  What sets us apart is not just the cars, but the people behind the wheel —
                  experienced chauffeurs who know the roads, respect your time, and treat every guest
                  like family.
                </p>
                <div className="flex flex-wrap gap-3 pt-3">
                  <Button asChild className="bg-gradient-gold text-navy font-semibold shadow-gold">
                    <Link to="/enquiry">Book a Ride</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={`tel:${SITE.phone1}`}><Phone className="mr-2 h-4 w-4" />{SITE.phone1}</a>
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="What We Stand For" title="OUR VALUES" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 60}>
                <div className="rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-navy shadow-gold">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-5 font-display text-lg font-semibold text-navy">{v.t}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-hero py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">Ready to plan your next trip?</h2>
          <p className="mt-3 text-white/80">Talk to us today — we respond within 30 minutes.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="bg-gradient-gold text-navy font-semibold shadow-gold">
              <Link to="/enquiry">Send Enquiry</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
              <a href={SITE.whatsappUrl}><MessageCircle className="mr-2 h-4 w-4" />WhatsApp</a>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
