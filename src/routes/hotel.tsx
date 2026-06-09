import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/SectionHead";
import { Star, Wifi, Coffee, Utensils, Car as CarIcon } from "lucide-react";

export const Route = createFileRoute("/hotel")({
  head: () => ({
    meta: [
      { title: "Hotel Bookings — Atul Tour & Travels" },
      { name: "description", content: "Curated hotel bookings across India — budget, business and luxury stays bundled with your travel." },
    ],
  }),
  component: HotelPage,
});

const hotels = [
  { name: "Heritage Haveli", city: "Jaipur", stars: 5, emoji: "🏰", gradient: "from-rose-300 to-pink-400", tag: "Luxury" },
  { name: "Taj View Resort", city: "Agra", stars: 5, emoji: "🕌", gradient: "from-amber-300 to-orange-400", tag: "Premium" },
  { name: "Hill Crown Inn", city: "Shimla", stars: 4, emoji: "🏔️", gradient: "from-sky-300 to-cyan-400", tag: "Mountain" },
  { name: "Ganga Retreat", city: "Rishikesh", stars: 4, emoji: "🛕", gradient: "from-orange-300 to-yellow-400", tag: "Spiritual" },
  { name: "Dal Lake Houseboat", city: "Srinagar", stars: 4, emoji: "🌸", gradient: "from-indigo-300 to-violet-400", tag: "Unique" },
  { name: "Backwater Villa", city: "Alleppey", stars: 4, emoji: "🌴", gradient: "from-emerald-300 to-teal-400", tag: "Nature" },
];

const amenities = [
  { icon: Wifi, t: "Free Wi-Fi" },
  { icon: Coffee, t: "Breakfast Included" },
  { icon: Utensils, t: "Restaurant" },
  { icon: CarIcon, t: "Free Parking" },
];

function HotelPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Hotel Bookings</h1>
          <p className="mt-4 text-white/80">Hand-picked stays — bundled with your tour or booked standalone.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Stay In Comfort" title="FEATURED HOTELS" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h, i) => (
              <Reveal key={h.name} delay={i * 60}>
                <div className="group overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-elegant">
                  <div className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${h.gradient}`}>
                    <div className="text-8xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">{h.emoji}</div>
                    <span className="absolute top-3 right-3 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                      {h.tag}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-display text-lg font-bold text-navy">{h.name}</div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground">{h.city}</div>
                      </div>
                      <div className="flex text-gold">
                        {Array.from({ length: h.stars }).map((_, x) => <Star key={x} className="h-3.5 w-3.5 fill-current" />)}
                      </div>
                    </div>
                    <div className="mt-4 flex items-end justify-end">
                      <Link to="/enquiry" className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-gold hover:bg-gold hover:text-navy transition-colors">
                        Enquire →
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border bg-secondary/40 p-8 sm:p-12">
            <h3 className="text-center font-display text-2xl font-bold text-navy">Standard Amenities</h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {amenities.map(a => (
                <div key={a.t} className="flex items-center gap-3 rounded-xl border bg-card p-4">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-gold text-navy">
                    <a.icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold text-navy">{a.t}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
