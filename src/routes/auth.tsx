import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck, Mail, KeyRound } from "lucide-react";

const ADMIN_EMAIL = "shubham03503@gmail.com";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Admin Access — Atul Tour & Travels" }] }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    const normalized = email.trim().toLowerCase();
    if (normalized !== ADMIN_EMAIL) {
      toast.error("This email is not authorized.");
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: normalized,
        options: { shouldCreateUser: true },
      });
      if (error) throw error;
      toast.success("A 6-digit code was sent to your email.");
      setStep("otp");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send code");
    } finally {
      setLoading(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        email: email.trim().toLowerCase(),
        token: code.trim(),
        type: "email",
      });
      if (error) throw error;
      toast.success("Verified. Welcome back!");
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Invalid or expired code");
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
            <h1 className="font-display text-2xl font-bold text-navy">Admin Access</h1>
            <p className="text-xs text-muted-foreground">Secure email OTP login</p>
          </div>
        </div>

        {step === "email" ? (
          <form onSubmit={sendCode} className="mt-6 grid gap-4">
            <div className="grid gap-1.5">
              <Label className="flex items-center gap-2"><Mail className="h-4 w-4" /> Authorized Email</Label>
              <Input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@example.com"
                autoComplete="email"
              />
            </div>
            <Button type="submit" disabled={loading} className="h-11 bg-navy text-white hover:bg-navy-light">
              {loading ? "Sending code..." : "Send OTP to Email"}
            </Button>
          </form>
        ) : (
          <form onSubmit={verifyCode} className="mt-6 grid gap-4">
            <div className="grid gap-1.5">
              <Label className="flex items-center gap-2"><KeyRound className="h-4 w-4" /> 6-digit Code</Label>
              <Input
                inputMode="numeric"
                pattern="[0-9]*"
                required
                maxLength={6}
                value={code}
                onChange={e => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                className="text-center tracking-[0.5em] text-lg font-semibold"
                autoFocus
              />
              <p className="text-xs text-muted-foreground">Check your inbox at <strong>{email}</strong>. Code expires in a few minutes.</p>
            </div>
            <Button type="submit" disabled={loading || code.length !== 6} className="h-11 bg-gradient-gold text-navy font-semibold">
              {loading ? "Verifying..." : "Verify & Sign In"}
            </Button>
            <button type="button" onClick={() => { setStep("email"); setCode(""); }}
              className="text-center text-xs text-muted-foreground hover:text-navy">
              ← Use a different email
            </button>
          </form>
        )}

        <div className="mt-6 rounded-md border border-gold/30 bg-gold/10 p-3 text-xs text-foreground/70">
          <ShieldCheck className="inline h-3.5 w-3.5 mr-1 text-gold-dark" />
          Access is restricted. Only the authorized owner email can sign in.
        </div>
      </div>
    </div>
  );
}
