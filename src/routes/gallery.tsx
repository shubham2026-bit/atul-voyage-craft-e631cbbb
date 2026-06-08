import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead } from "@/components/site/SectionHead";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Atul Tour & Travels" },
      { name: "description", content: "Glimpses from our tours — destinations, fleet and happy travellers across India." },
    ],
  }),
  component: GalleryPage,
});

const tiles = [
  { emoji: "🕌", title: "Taj Mahal, Agra", gradient: "from-amber-300 via-orange-400 to-rose-400" },
  { emoji: "🏰", title: "Amber Fort, Jaipur", gradient: "from-rose-300 via-pink-400 to-fuchsia-400" },
  { emoji: "🏔️", title: "Manali Snow", gradient: "from-sky-300 via-cyan-400 to-emerald-400" },
  { emoji: "🛕", title: "Ganga Aarti, Haridwar", gradient: "from-orange-300 via-amber-400 to-yellow-400" },
  { emoji: "🌸", title: "Dal Lake, Srinagar", gradient: "from-indigo-300 via-violet-400 to-pink-400" },
  { emoji: "🏖️", title: "Goa Beaches", gradient: "from-cyan-300 via-teal-400 to-emerald-400" },
  { emoji: "🌴", title: "Kerala Backwaters", gradient: "from-emerald-300 via-green-400 to-teal-500" },
  { emoji: "🐪", title: "Jaisalmer Desert", gradient: "from-yellow-300 via-orange-400 to-red-400" },
  { emoji: "⛰️", title: "Darjeeling Hills", gradient: "from-violet-300 via-purple-400 to-indigo-400" },
  { emoji: "🙏", title: "Char Dham", gradient: "from-amber-300 via-yellow-400 to-orange-400" },
  { emoji: "🚐", title: "Our Innova Fleet", gradient: "from-slate-300 via-zinc-400 to-stone-500" },
  { emoji: "🚌", title: "Tempo Travellers", gradient: "from-blue-300 via-indigo-400 to-violet-500" },
];

function GalleryPage() {
  return (
    <SiteLayout>
      <section className="bg-gradient-hero py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Gallery</h1>
          <p className="mt-4 text-white/80">Snapshots from journeys we've crafted across India.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <SectionHead eyebrow="Captured Moments" title="OUR GALLERY" />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {tiles.map((t, i) => (
              <Reveal key={t.title} delay={i * 40}>
                <div className="group relative overflow-hidden rounded-2xl border shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant">
                  <div className={`flex h-56 items-center justify-center bg-gradient-to-br ${t.gradient}`}>
                    <div className="text-8xl drop-shadow-lg transition-transform duration-500 group-hover:scale-110">{t.emoji}</div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="font-display text-sm font-semibold uppercase tracking-wider text-white drop-shadow">{t.title}</div>
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
