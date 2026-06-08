import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Login — Atul Tour & Travels" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Check your email to confirm, then sign in.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/admin" });
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero p-4">
      <div className="w-full max-w-md rounded-2xl border bg-card p-8 shadow-elegant">
        <Link to="/" className="text-xs text-muted-foreground hover:underline">← Back to site</Link>
        <div className="mt-4 flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-gold text-navy shadow-gold">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy">Admin {mode === "signin" ? "Login" : "Signup"}</h1>
            <p className="text-xs text-muted-foreground">Atul Tour & Travels dashboard</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1.5">
            <Label>Email</Label>
            <Input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-1.5">
            <Label>Password</Label>
            <Input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <Button type="submit" disabled={loading} className="h-11 bg-navy text-white hover:bg-navy-light">
            {loading ? "Please wait..." : (mode === "signin" ? "Sign in" : "Create account")}
          </Button>
        </form>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-navy">
          {mode === "signin" ? "Need an admin account? Sign up" : "Already have an account? Sign in"}
        </button>

        <div className="mt-6 rounded-md border border-gold/30 bg-gold/10 p-3 text-xs text-foreground/80">
          <strong>First-time setup:</strong> sign up, then grant admin via SQL:<br />
          <code className="text-[10px]">INSERT INTO user_roles(user_id, role) VALUES ('YOUR_AUTH_UID', 'admin');</code>
        </div>
      </div>
    </div>
  );
}
