import { Plane } from "lucide-react";
import { Reveal } from "./Reveal";

export function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal>
      <div className="text-center">
        <p
          className="text-3xl text-gold-dark sm:text-4xl"
          style={{ fontFamily: "'Great Vibes', 'Playfair Display', cursive" }}
        >
          {eyebrow}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-wide text-navy sm:text-4xl">
          {title}
        </h2>
        <div className="mx-auto mt-5 flex items-center justify-center gap-3">
          <span className="h-px w-20 bg-navy/30" />
          <Plane className="h-5 w-5 text-navy" />
          <span className="h-px w-20 bg-navy/30" />
        </div>
      </div>
    </Reveal>
  );
}
