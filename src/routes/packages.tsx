import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/SectionHead";

export const Route = createFileRoute("/packages")({
  head: () => ({
    meta: [
      { title: "Tour Packages — Atul Tour & Travels" },
      { name: "description", content: "Curated tour packages — Golden Triangle, Himalayas, Rajasthan, Kashmir, Char Dham and more. Custom itineraries from New Delhi." },
    ],
  }),
  component: PackagesPage,
});

const packages = [
  { title: "Golden Triangle", subtitle: "Delhi · Agra · Jaipur", days: "5 Days / 4 Nights", emoji: "🕌", gradient: "from-amber-300 via-orange-400 to-rose-400", tag: "Bestseller" },
  { title: "Himalayan Escape", subtitle: "Shimla · Manali · Kasol", days: "6 Days / 5 Nights", emoji: "🏔️", gradient: "from-sky-300 via-cyan-400 to-emerald-400", tag: "Trending" },
  { title: "Spiritual Journey", subtitle: "Haridwar · Rishikesh · Mathura", days: "4 Days / 3 Nights", emoji: "🛕", gradient: "from-orange-300 via-amber-400 to-yellow-400", tag: "Sacred" },
  { title: "Royal Rajasthan", subtitle: "Udaipur · Jodhpur · Jaisalmer", days: "7 Days / 6 Nights", emoji: "🏰", gradient: "from-rose-300 via-pink-400 to-fuchsia-400", tag: "Luxury" },
  { title: "Kashmir Paradise", subtitle: "Srinagar · Gulmarg · Pahalgam", days: "6 Days / 5 Nights", emoji: "🌸", gradient: "from-indigo-300 via-violet-400 to-pink-400", tag: "Premium" },
  { title: "Char Dham Yatra", subtitle: "Yamunotri · Gangotri · Kedarnath · Badrinath", days: "10 Days / 9 Nights", emoji: "🙏", gradient: "from-yellow-300 via-orange-400 to-red-400", tag: "Pilgrimage" },
  { title: "Goa Beaches", subtitle: "North & South Goa", days: "4 Days / 3 Nights", emoji: "🏖️", gradient: "from-cyan-300 via-teal-400 to-emerald-400", tag: "Beach" },
  { title: "Kerala Backwaters", subtitle: "Munnar · Alleppey · Kochi", days: "6 Days / 5 Nights", emoji: "🌴", gradient: "from-emerald-300 via-green-400 to-teal-500", tag: "Nature" },
  { title: "Northeast Explorer", subtitle: "Gangtok · Darjeeling", days: "5 Days / 4 Nights", emoji: "⛰️", gradient: "from-violet-300 via-purple-400 to-indigo-400", tag: "Adventure" },
];

function PackagesPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Tour Packages</h1>
          <p className="mt-4 text-white/80">Hand-crafted itineraries with stay, transport and sightseeing included.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Wonderful Place For You" title="OUR PACKAGES" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-card shadow-sm transition-all hover:-translate-y-2 hover:shadow-elegant">
                  <div className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${p.gradient}`}>
                    <div className="text-8xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">{p.emoji}</div>
                    <span className="absolute top-3 right-3 rounded-full bg-navy/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gold backdrop-blur">
                      {p.tag}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                      <div className="text-center font-display text-xl font-bold text-white drop-shadow">{p.title}</div>
                      <div className="text-center text-xs font-medium uppercase tracking-wider text-white/90">{p.subtitle}</div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 text-center">
                    <div className="text-sm font-medium text-muted-foreground">{p.days}</div>
                    <Link
                      to="/enquiry"
                      className="mt-4 inline-flex items-center justify-center rounded-full bg-navy px-4 py-2 text-xs font-semibold text-gold transition-colors hover:bg-gold hover:text-navy"
                    >
                      Enquire Now →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
