import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listEnquiries, updateEnquiryStatus } from "@/lib/enquiries.functions";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Search, Phone, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { SERVICE_TYPES, SITE } from "@/lib/site";

export const Route = createFileRoute("/_authenticated/admin/enquiries")({
  component: EnquiriesPage,
});

const STATUSES = ["pending", "confirmed", "completed", "cancelled"] as const;

const statusBadge: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-emerald-100 text-emerald-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-rose-100 text-rose-800",
};

function EnquiriesPage() {
  const qc = useQueryClient();
  const fetchAll = useServerFn(listEnquiries);
  const updateStatus = useServerFn(updateEnquiryStatus);
  const { data, isLoading } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => fetchAll(),
  });

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [serviceFilter, setServiceFilter] = useState<string>("all");
  const [selected, setSelected] = useState<any | null>(null);

  const rows = useMemo(() => {
    const all = data?.enquiries ?? [];
    return all.filter(e => {
      if (statusFilter !== "all" && e.status !== statusFilter) return false;
      if (serviceFilter !== "all" && e.service_type !== serviceFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!`${e.name} ${e.phone} ${e.email} ${e.pickup} ${e.drop_location ?? ""}`.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [data, search, statusFilter, serviceFilter]);

  async function changeStatus(id: string, status: string) {
    try {
      await updateStatus({ data: { id, status: status as any } });
      toast.success("Status updated");
      qc.invalidateQueries({ queryKey: ["enquiries"] });
      if (selected && selected.id === id) setSelected({ ...selected, status });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    }
  }

  function exportCSV() {
    const headers = ["Date", "Name", "Phone", "Email", "Service", "Pickup", "Drop", "Travel Date", "Time", "Passengers", "Status", "Notes"];
    const escape = (v: any) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const csv = [headers.join(",")].concat(
      rows.map(r => [
        new Date(r.created_at).toLocaleString(), r.name, r.phone, r.email, r.service_type,
        r.pickup, r.drop_location ?? "", r.travel_date ?? "", r.travel_time ?? "",
        r.passengers ?? "", r.status, r.notes ?? "",
      ].map(escape).join(","))
    ).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `enquiries-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-navy">All Enquiries</h1>
          <p className="mt-1 text-sm text-muted-foreground">{rows.length} of {data?.enquiries.length ?? 0} shown</p>
        </div>
        <Button onClick={exportCSV} className="bg-gradient-gold text-navy font-semibold"><Download className="mr-2 h-4 w-4" /> Export CSV</Button>
      </div>

      <div className="mt-6 grid gap-3 rounded-xl border bg-card p-4 sm:grid-cols-4">
        <div className="relative sm:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, phone, email, location…" className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger><SelectValue placeholder="Service" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {SERVICE_TYPES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Pickup → Drop</th>
                <th className="px-4 py-3">Travel</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">Loading…</td></tr>}
              {!isLoading && rows.length === 0 && <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No enquiries match the filters.</td></tr>}
              {rows.map(r => (
                <tr key={r.id} className="border-t hover:bg-secondary/30">
                  <td className="px-4 py-3 text-xs">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="px-4 py-3 font-medium text-navy">{r.name}</td>
                  <td className="px-4 py-3">{r.phone}</td>
                  <td className="px-4 py-3">{r.service_type}</td>
                  <td className="px-4 py-3 text-xs">{r.pickup} → {r.drop_location || "—"}</td>
                  <td className="px-4 py-3 text-xs">{r.travel_date ?? "—"} {r.travel_time ?? ""}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusBadge[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="outline" onClick={() => setSelected(r)}>View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="font-display text-2xl text-navy">{selected.name}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-3 text-sm">
                <Row label="Submitted" value={new Date(selected.created_at).toLocaleString()} />
                <Row label="Phone" value={selected.phone} />
                <Row label="Email" value={selected.email} />
                <Row label="Service" value={selected.service_type} />
                <Row label="Pickup" value={selected.pickup} />
                <Row label="Drop" value={selected.drop_location || "—"} />
                <Row label="Travel" value={`${selected.travel_date ?? "—"} ${selected.travel_time ?? ""}`} />
                <Row label="Passengers" value={selected.passengers ?? "—"} />
                <Row label="Notes" value={selected.notes || "—"} />
                <div className="grid gap-1.5">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
                  <Select value={selected.status} onValueChange={v => changeStatus(selected.id, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(s => <SelectItem key={s} value={s} className="capitalize">{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button asChild variant="outline" className="flex-1"><a href={`tel:${selected.phone}`}><Phone className="mr-2 h-4 w-4" />Call</a></Button>
                  <Button asChild className="flex-1 bg-[#25D366] hover:opacity-90"><a href={`https://wa.me/91${selected.phone.replace(/\D/g, "").slice(-10)}`} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" />WhatsApp</a></Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between gap-4 border-b py-1.5">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <span className="text-right text-foreground">{value}</span>
    </div>
  );
}
