import { Link } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Home" },
  { to: "/enquiry", label: "Book Now" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-gold text-navy font-bold shadow-gold">A</div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold text-navy">{SITE.name}</div>
            <div className="text-[10px] uppercase tracking-widest text-gold-dark">Since 2014</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-foreground/80 transition-colors hover:text-navy [&.active]:text-navy">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button asChild className="bg-gradient-gold text-navy hover:opacity-90 shadow-gold font-semibold">
            <a href={`tel:${SITE.phone1}`}><Phone className="mr-2 h-4 w-4" />Call {SITE.phone1}</a>
          </Button>
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background md:hidden">
          <nav className="flex flex-col px-4 py-3">
            {links.map(l => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">{l.label}</Link>
            ))}
            <a href={`tel:${SITE.phone1}`} className="mt-2 rounded-md bg-gradient-gold py-2 text-center text-sm font-semibold text-navy">
              Call {SITE.phone1}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
