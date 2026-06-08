# Atul Tour & Travels — Build Plan

A premium navy + gold travel website inspired by vidhoopabharatjourney.com, with enquiry capture, email notifications, and a protected admin dashboard.

## 1. Backend (Lovable Cloud)

Enable Lovable Cloud for database + auth + email.

**Tables**
- `enquiries`: id, created_at, name, phone, email, service_type, pickup, drop_location, travel_date, travel_time, passengers, notes, status (`pending|confirmed|completed|cancelled`)
- `user_roles` + `app_role` enum (`admin`) with `has_role()` security-definer function (per platform rules — never store roles on profiles)

**RLS**
- `enquiries`: anyone (anon) can INSERT; only admins SELECT/UPDATE
- `user_roles`: admins read; service_role manages

**Email**: Use Lovable's built-in email infrastructure (check domain status; trigger setup dialog if missing). One app-email template `enquiry-received` sent to admin address on each submission.

## 2. Design System

Tailwind v4 tokens in `src/styles.css`:
- `--navy: #0b1d3a`, `--gold: #d4a843`, plus tints, gradient & shadow tokens
- Fonts loaded via `<link>` in `__root.tsx`: Playfair Display (headings), Poppins (body); registered as `--font-display` / `--font-body`

Components are shadcn-based with custom navy/gold variants. Smooth scroll-reveal animations using CSS + IntersectionObserver (no heavy libs).

## 3. Routes (TanStack file-based)

```
/                    Home (hero, trust bar, services, why us, destinations, fleet, testimonials, enquiry form, footer)
/enquiry             Standalone enquiry form page
/contact             Phone, WhatsApp, address, Google Maps embed
/auth                Admin sign-in (email + password)
/_authenticated/admin            Dashboard (stats cards)
/_authenticated/admin/enquiries  Table view with filters, status change, CSV export
```

Sticky navbar + footer in shared layout. Floating WhatsApp FAB on every public page → `https://wa.me/919310209227`.

## 4. Home Page Sections

1. **Sticky Navbar** — logo, links (Home / Services / Destinations / Fleet / Contact), gold "Call Now 9810325525" button
2. **Hero** — Playfair headline "Safe, Comfortable & Reliable Travel", subtext, two CTAs (Book Now / WhatsApp), navy gradient background with subtle gold accents
3. **Stats strip** — 10+ Years • 5000+ Trips • 50+ Cities • 24/7 Support
4. **Trust Bar** — gold strip, 5 trust points (Licensed, Trained Drivers, Sanitized Cars, Transparent Pricing, On-Time Pickup)
5. **Services** — 5 animated cards (Taxi, Local & Outstation, Airport Transfers, Tour Packages, Corporate Travel) with Lucide icons
6. **Why Choose Us** — 6 feature blocks
7. **Popular Destinations** — Agra 🕌, Jaipur 🏰, Haridwar 🛕, Shimla ⛰️, Mathura 🪷 (gradient cards with emojis — no stock images)
8. **Fleet** — Sedan, SUV, Innova Crysta, Tempo Traveller (capacity + features)
9. **Testimonials** — 3 cards
10. **Enquiry Form** — embedded
11. **Footer** — contact, quick links, services, address

## 5. Enquiry Form

Zod-validated fields: Full Name, Mobile (10-digit IN), Email, Service Type (select), Pickup (required), Drop, Travel Date (shadcn date picker), Travel Time, Passengers (number), Special Requirements (textarea), Submit "Send Enquiry".

**Submission flow** (server function):
1. Insert row into `enquiries` (status=`pending`)
2. Enqueue `enquiry-received` email to admin
3. Return success
4. Client shows success card: "Thank you! We'll contact you within 30 minutes." + green "Chat with us on WhatsApp" button → wa.me link

## 6. Admin Panel (`/_authenticated/admin`)

Gated by integration-managed `_authenticated` layout + an inner role check (`has_role(uid, 'admin')`) via server fn; non-admins redirected to `/`.

**Dashboard** — KPI cards: Total, Today, Pending, Confirmed, Cancelled.

**Enquiries Table** — columns: Date | Name | Phone | Service | Pickup → Drop | Travel Date | Status badge | Actions (View / Change Status). Filters: date range, service, status, search by name/phone. "Export CSV" button.

**Detail dialog** — full enquiry, status dropdown (Pending → Confirmed → Completed → Cancelled), Call & WhatsApp shortcuts.

Initial admin: after sign-up, manually grant the `admin` role via SQL (documented in a note shown to the user).

## 7. Contact Page

Two contact cards (Phone, WhatsApp), address block, Google Maps iframe for "Sector-6 RK Puram New Delhi 110022", embedded enquiry form.

## 8. Tech Details

- TanStack Start + React 19 + Tailwind v4 + shadcn
- TanStack Query for admin data; `createServerFn` for all DB writes/reads
- Public enquiry insert via server fn using `supabaseAdmin` (admin client, validated input) so anon submissions don't depend on broad RLS grants
- Mobile-first responsive; reduced-motion respected
- SEO: per-route `head()` with title/description/OG for `/`, `/contact`, `/enquiry`

## Open question

Admin sign-in: should I create one admin account during setup (you'd give me an email), or leave self-signup + you promote yourself via a one-time SQL snippet I'll provide? Default: self-signup + SQL snippet.
