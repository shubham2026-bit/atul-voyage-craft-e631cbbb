import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Phone, MessageCircle, Car, Plane, Mountain, Briefcase, MapPin,
  Shield, Clock, Award, BadgeCheck, Sparkles, Users, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atul Tour & Travels — Taxi, Airport & Outstation in Delhi NCR" },
      { name: "description", content: "Book safe taxi, airport transfers, outstation cabs and tour packages from New Delhi. 10+ years, 5000+ trips. Call 9810325525." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />
      <TrustBar />
      <Services />
      <WhyUs />
      <Destinations />
      <Fleet />
      <Testimonials />
      <EnquirySection />
    </SiteLayout>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_20%_20%,oklch(0.77_0.13_80/0.4),transparent_50%),radial-gradient(circle_at_80%_70%,oklch(0.77_0.13_80/0.25),transparent_50%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-white/5 px-3 py-1 text-xs font-medium text-gold backdrop-blur">
              <Sparkles className="h-3 w-3" /> Trusted since 2014
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="mt-5 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              {SITE.tagline.split("&").map((t, i) => (
                <span key={i}>{i > 0 && <span className="text-gold"> & </span>}{t.trim()}</span>
              ))}
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-5 max-w-lg text-base text-white/80 sm:text-lg">
              Premium taxi, airport transfers, outstation trips and curated tour packages across India — operated from New Delhi with experienced chauffeurs.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-gold text-navy font-semibold shadow-gold hover:opacity-90">
                <Link to="/enquiry">Book Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/10 text-white hover:bg-white/20">
                <a href={`tel:${SITE.phone1}`}><Phone className="mr-2 h-4 w-4" /> {SITE.phone1}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#25D366]/60 bg-[#25D366]/15 text-white hover:bg-[#25D366]/25">
                <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a>
              </Button>
            </div>
          </Reveal>
          <Reveal delay={400}>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { v: "10+", l: "Years" },
                { v: "5000+", l: "Trips" },
                { v: "50+", l: "Cities" },
                { v: "24/7", l: "Support" },
              ].map(s => (
                <div key={s.l} className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-center backdrop-blur">
                  <div className="font-display text-2xl font-bold text-gold">{s.v}</div>
                  <div className="text-xs uppercase tracking-wider text-white/70">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="hidden md:block">
          <div className="relative">
            <div className="rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur-xl shadow-elegant">
              <div className="font-display text-lg font-semibold text-gold">Quick Enquiry</div>
              <p className="mt-1 text-sm text-white/70">Tell us where, we'll arrange the ride.</p>
              <div className="mt-6 space-y-3 text-sm">
                {["✓ Licensed & insured cars", "✓ Trained, polite chauffeurs", "✓ Transparent pricing — no hidden charges", "✓ On-time pickup, every time", "✓ 24/7 customer support"].map(t => (
                  <div key={t} className="flex items-center gap-2 text-white/85">{t}</div>
                ))}
              </div>
              <Button asChild className="mt-6 w-full bg-gradient-gold text-navy font-semibold">
                <Link to="/enquiry">Get a Quote →</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: BadgeCheck, t: "Licensed Operator" },
    { icon: Users, t: "Trained Chauffeurs" },
    { icon: Shield, t: "Sanitized Cars" },
    { icon: Award, t: "Transparent Pricing" },
    { icon: Clock, t: "On-Time Pickup" },
  ];
  return (
    <div className="bg-gradient-gold">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-4 text-navy sm:px-6">
        {items.map(({ icon: Icon, t }) => (
          <div key={t} className="flex items-center gap-2 text-sm font-semibold">
            <Icon className="h-4 w-4" /> {t}
          </div>
        ))}
      </div>
    </div>
  );
}

const services = [
  { icon: Car, title: "Taxi Services", desc: "Local taxis across Delhi NCR — hourly and per-km packages." },
  { icon: MapPin, title: "Local & Outstation", desc: "One-way or round trips to nearby cities and beyond." },
  { icon: Plane, title: "Airport Transfers", desc: "Punctual pickup & drop for IGI Airport, 24/7." },
  { icon: Mountain, title: "Tour Packages", desc: "Curated holiday packages — Golden Triangle, hills & more." },
  { icon: Briefcase, title: "Corporate Travel", desc: "Monthly billing, dedicated cars for businesses." },
];

function Services() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Our Services" title="Travel solutions for every journey" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="group relative h-full rounded-2xl border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-navy shadow-gold">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: Shield, t: "Safety First", d: "Verified drivers, GPS-tracked cars, regular maintenance." },
    { icon: Clock, t: "Always On Time", d: "Punctual pickups and timely drops — guaranteed." },
    { icon: Award, t: "Decade of Trust", d: "10+ years serving families, corporates and tourists." },
    { icon: Users, t: "Experienced Drivers", d: "Polite, well-trained chauffeurs who know the routes." },
    { icon: BadgeCheck, t: "Clean, Comfortable Fleet", d: "Regularly sanitized sedans, SUVs & tempo travellers." },
    { icon: Sparkles, t: "Premium Experience", d: "Personal attention, transparent pricing, flexible plans." },
  ];
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Why Choose Us" title="Built on trust, driven by service" />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((i, idx) => (
            <Reveal key={i.t} delay={idx * 60}>
              <div className="flex gap-4 rounded-xl border bg-card p-5">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-navy text-gold">
                  <i.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-navy">{i.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{i.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const destinations = [
  { name: "Agra", emoji: "🕌", desc: "Taj Mahal & Mughal heritage", gradient: "from-amber-200 to-rose-300" },
  { name: "Jaipur", emoji: "🏰", desc: "Pink City forts & palaces", gradient: "from-pink-200 to-orange-300" },
  { name: "Haridwar", emoji: "🛕", desc: "Holy Ganga aarti & temples", gradient: "from-orange-200 to-yellow-300" },
  { name: "Shimla", emoji: "⛰️", desc: "Hills, pine forests, toy train", gradient: "from-emerald-200 to-cyan-300" },
  { name: "Mathura", emoji: "🪷", desc: "Krishna's birthplace & ghats", gradient: "from-violet-200 to-pink-300" },
];

function Destinations() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Popular Destinations" title="Discover India with us" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((d, i) => (
            <Reveal key={d.name} delay={i * 70}>
              <Link to="/enquiry" className="group block overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className={`flex h-44 items-center justify-center bg-gradient-to-br ${d.gradient} text-7xl`}>{d.emoji}</div>
                <div className="bg-card p-5">
                  <h3 className="font-display text-xl font-semibold text-navy">{d.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gold-dark group-hover:underline">
                    Book this trip →
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const fleet = [
  { name: "Sedan", capacity: "4 passengers", emoji: "🚗", features: ["Dzire / Etios", "AC", "Boot space"] },
  { name: "SUV", capacity: "6 passengers", emoji: "🚙", features: ["Ertiga / XL6", "Spacious", "Comfortable"] },
  { name: "Innova Crysta", capacity: "7 passengers", emoji: "🚐", features: ["Premium ride", "Captain seats", "Long trips"] },
  { name: "Tempo Traveller", capacity: "12–17 passengers", emoji: "🚌", features: ["Group travel", "Push-back seats", "AC"] },
];

function Fleet() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Our Fleet" title="Clean, modern cars for every group size" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {fleet.map((f, i) => (
            <Reveal key={f.name} delay={i * 70}>
              <div className="rounded-2xl border bg-card p-6 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                <div className="text-6xl">{f.emoji}</div>
                <h3 className="mt-3 font-display text-xl font-semibold text-navy">{f.name}</h3>
                <div className="text-sm text-gold-dark">{f.capacity}</div>
                <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
                  {f.features.map(x => <li key={x}>• {x}</li>)}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Rohit Sharma", role: "Corporate client", text: "Reliable service for our team's daily commute. On time, every time. Atul ji's drivers are very professional." },
  { name: "Priya Verma", role: "Family trip — Jaipur", text: "Booked an Innova for our Golden Triangle tour. Driver was courteous, car was spotless. Highly recommended!" },
  { name: "Amit Kumar", role: "Airport transfer", text: "3 AM IGI pickup, driver was waiting 15 minutes early. This is the kind of service that builds trust." },
];

function Testimonials() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader eyebrow="Testimonials" title="What our travellers say" />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 80}>
              <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                <div className="flex text-gold">{Array.from({ length: 5 }).map((_, x) => <Star key={x} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">"{t.text}"</p>
                <div className="mt-5 border-t pt-4">
                  <div className="font-semibold text-navy">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EnquirySection() {
  return (
    <section id="enquiry" className="bg-gradient-hero py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-gold">Get a quote</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Ready to plan your next trip?</h2>
          <p className="mt-3 text-white/75">Tell us a few details and we'll get back within 30 minutes with the best price and car for your journey.</p>
          <div className="mt-8 space-y-4 text-sm">
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /><a href={`tel:${SITE.phone1}`}>{SITE.phone1}</a></div>
            <div className="flex items-center gap-3"><Phone className="h-5 w-5 text-gold" /><a href={`tel:${SITE.phone2}`}>{SITE.phone2}</a></div>
            <div className="flex items-center gap-3"><MessageCircle className="h-5 w-5 text-gold" /><a href={SITE.whatsappUrl}>WhatsApp Business</a></div>
            <div className="flex items-start gap-3"><MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" /><span>{SITE.address}</span></div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <div className="text-foreground"><EnquiryForm /></div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-gold-dark">{eyebrow}</div>
        <h2 className="mt-2 font-display text-3xl font-bold text-navy sm:text-4xl">{title}</h2>
        <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-gold" />
      </div>
    </Reveal>
  );
}
