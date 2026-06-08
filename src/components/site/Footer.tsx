import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, MapPin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-gradient-hero text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="grid h-10 w-10 place-items-center rounded-md bg-gradient-gold text-navy font-bold">A</div>
            <div className="font-display text-lg font-bold">{SITE.name}</div>
          </div>
          <p className="mt-4 text-sm text-white/70">{SITE.tagline}. Trusted travel partner from New Delhi for over a decade.</p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link to="/" className="hover:text-gold">Home</Link></li>
            <li><Link to="/enquiry" className="hover:text-gold">Book a Ride</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link to="/auth" className="hover:text-gold">Admin Login</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Services</h4>
          <ul className="space-y-2 text-sm text-white/80">
            <li>Taxi Services</li>
            <li>Airport Transfers</li>
            <li>Outstation Trips</li>
            <li>Tour Packages</li>
            <li>Corporate Travel</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gold">Contact</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${SITE.phone1}`}>{SITE.phone1}</a></li>
            <li className="flex gap-2"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${SITE.phone2}`}>{SITE.phone2}</a></li>
            <li className="flex gap-2"><MessageCircle className="h-4 w-4 text-gold" /><a href={SITE.whatsappUrl} target="_blank" rel="noreferrer">WhatsApp Chat</a></li>
            <li className="flex gap-2"><MapPin className="h-4 w-4 text-gold shrink-0" /><span>{SITE.address}</span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
