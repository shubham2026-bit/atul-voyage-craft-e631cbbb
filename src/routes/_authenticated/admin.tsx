import { createFileRoute, Link, useNavigate, Outlet, useLocation } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { listEnquiries, checkIsAdmin } from "@/lib/enquiries.functions";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, ListChecks } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const check = useServerFn(checkIsAdmin);

  const { data: adminCheck, isLoading: checking } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => check(),
  });

  useEffect(() => {
    if (adminCheck && !adminCheck.isAdmin) {
      toast.error("You don't have admin access.");
      navigate({ to: "/" });
    }
  }, [adminCheck, navigate]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (checking || !adminCheck?.isAdmin) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Checking access…</div>;
  }

  const isList = location.pathname.includes("/enquiries");

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-md bg-gradient-gold text-navy font-bold">A</div>
            <div className="font-display text-lg font-bold text-navy">Admin Panel</div>
          </Link>
          <nav className="hidden gap-2 md:flex">
            <Link to="/admin" className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${!isList ? "bg-navy text-white" : "text-foreground/70 hover:bg-secondary"}`}>
              <LayoutDashboard className="h-4 w-4" /> Dashboard
            </Link>
            <Link to="/admin/enquiries" className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium ${isList ? "bg-navy text-white" : "text-foreground/70 hover:bg-secondary"}`}>
              <ListChecks className="h-4 w-4" /> Enquiries
            </Link>
          </nav>
          <Button variant="outline" size="sm" onClick={signOut}><LogOut className="mr-2 h-4 w-4" />Sign out</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {location.pathname === "/admin" ? <Dashboard /> : <Outlet />}
      </main>
    </div>
  );
}

function Dashboard() {
  const fetchAll = useServerFn(listEnquiries);
  const { data } = useQuery({
    queryKey: ["enquiries"],
    queryFn: () => fetchAll(),
  });

  const all = data?.enquiries ?? [];
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = all.filter(e => e.created_at.slice(0, 10) === today).length;
  const by = (s: string) => all.filter(e => e.status === s).length;

  const stats = [
    { label: "Total Enquiries", value: all.length, color: "from-navy to-navy-light" },
    { label: "Today", value: todayCount, color: "from-gold to-gold-dark" },
    { label: "Pending", value: by("pending"), color: "from-amber-500 to-orange-500" },
    { label: "Confirmed", value: by("confirmed"), color: "from-emerald-500 to-green-600" },
    { label: "Completed", value: by("completed"), color: "from-blue-500 to-indigo-600" },
    { label: "Cancelled", value: by("cancelled"), color: "from-rose-500 to-red-600" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Overview of all enquiries received.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map(s => (
          <div key={s.label} className={`rounded-2xl bg-gradient-to-br ${s.color} p-6 text-white shadow-elegant`}>
            <div className="text-sm font-medium uppercase tracking-wider text-white/80">{s.label}</div>
            <div className="mt-2 font-display text-4xl font-bold">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-navy">Recent Enquiries</h2>
          <Link to="/admin/enquiries" className="text-sm font-medium text-gold-dark hover:underline">View all →</Link>
        </div>
        <div className="mt-4 divide-y">
          {all.slice(0, 5).map(e => (
            <div key={e.id} className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm">
              <div>
                <div className="font-medium text-navy">{e.name} <span className="text-muted-foreground">· {e.phone}</span></div>
                <div className="text-xs text-muted-foreground">{e.service_type} · {e.pickup} → {e.drop_location || "—"}</div>
              </div>
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium capitalize">{e.status}</span>
            </div>
          ))}
          {all.length === 0 && <div className="py-6 text-center text-sm text-muted-foreground">No enquiries yet.</div>}
        </div>
      </div>
    </div>
  );
}
