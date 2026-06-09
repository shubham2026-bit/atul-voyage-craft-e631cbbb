import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { SITE, SERVICE_TYPES } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Send } from "lucide-react";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { toast } from "sonner";

export function EnquiryForm() {
  const send = useServerFn(submitEnquiry);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    service_type: SERVICE_TYPES[0] as string,
    pickup: "", drop_location: "", travel_date: "", travel_time: "",
    passengers: "", notes: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.pickup) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      await send({
        data: {
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          service_type: form.service_type,
          pickup: form.pickup.trim(),
          drop_location: form.drop_location.trim() || null,
          travel_date: form.travel_date || null,
          travel_time: form.travel_time || null,
          passengers: form.passengers ? Number(form.passengers) : null,
          notes: form.notes.trim() || null,
        },
      });
      setDone(true);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send. Please try again or call us.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-elegant">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-navy">Thank You!</h3>
        <p className="mt-2 text-muted-foreground">We'll contact you within 30 minutes.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href={SITE.whatsappUrl} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-[#25D366] px-5 py-2.5 font-semibold text-white shadow-md hover:opacity-90">
            <WhatsAppIcon className="h-5 w-5" /> Continue on WhatsApp →
          </a>
          <Button variant="outline" onClick={() => { setDone(false); setForm({ ...form, notes: "", pickup: "", drop_location: "" }); }}>
            Send Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl border bg-card p-6 shadow-elegant sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full Name *"><Input value={form.name} onChange={e => update("name", e.target.value)} required maxLength={120} placeholder="Your name" /></Field>
        <Field label="Mobile Number *"><Input value={form.phone} onChange={e => update("phone", e.target.value)} required maxLength={15} placeholder="10-digit mobile" inputMode="tel" /></Field>
      </div>
      <Field label="Email Address *"><Input type="email" value={form.email} onChange={e => update("email", e.target.value)} required maxLength={255} placeholder="you@email.com" /></Field>

      <Field label="Service Type *">
        <Select value={form.service_type} onValueChange={v => update("service_type", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {SERVICE_TYPES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Pickup Location *"><Input value={form.pickup} onChange={e => update("pickup", e.target.value)} required maxLength={255} placeholder="e.g. RK Puram, Delhi" /></Field>
        <Field label="Drop Location"><Input value={form.drop_location} onChange={e => update("drop_location", e.target.value)} maxLength={255} placeholder="e.g. Agra" /></Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Travel Date"><Input type="date" value={form.travel_date} onChange={e => update("travel_date", e.target.value)} /></Field>
        <Field label="Travel Time"><Input type="time" value={form.travel_time} onChange={e => update("travel_time", e.target.value)} /></Field>
        <Field label="Passengers"><Input type="number" min={1} max={60} value={form.passengers} onChange={e => update("passengers", e.target.value)} placeholder="e.g. 4" /></Field>
      </div>

      <Field label="Special Requirements">
        <Textarea value={form.notes} onChange={e => update("notes", e.target.value)} maxLength={2000} rows={3} placeholder="Any preferences, stops, or extras..." />
      </Field>

      <Button type="submit" disabled={loading} className="mt-2 h-12 bg-gradient-gold text-navy font-semibold shadow-gold hover:opacity-90">
        {loading ? "Sending..." : (<><Send className="mr-2 h-4 w-4" /> Send Enquiry</>)}
      </Button>
      <p className="text-center text-xs text-muted-foreground">We'll respond within 30 minutes. Or call {SITE.phone1}.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label className="text-sm font-medium">{label}</Label>
      {children}
    </div>
  );
}
