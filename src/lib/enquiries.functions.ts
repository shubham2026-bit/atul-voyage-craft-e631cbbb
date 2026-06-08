import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const EnquiryInput = z.object({
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(5).max(30),
  email: z.string().trim().email().max(255),
  service_type: z.string().trim().min(1).max(60),
  pickup: z.string().trim().min(1).max(255),
  drop_location: z.string().trim().max(255).optional().nullable(),
  travel_date: z.string().trim().max(20).optional().nullable(),
  travel_time: z.string().trim().max(20).optional().nullable(),
  passengers: z.number().int().min(1).max(60).optional().nullable(),
  notes: z.string().trim().max(2000).optional().nullable(),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => EnquiryInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("enquiries").insert({
      name: data.name,
      phone: data.phone,
      email: data.email,
      service_type: data.service_type,
      pickup: data.pickup,
      drop_location: data.drop_location || null,
      travel_date: data.travel_date || null,
      travel_time: data.travel_time || null,
      passengers: data.passengers || null,
      notes: data.notes || null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
    if (error) throw new Error(error.message);
    return { enquiries: data ?? [] };
  });

export const updateEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) =>
    z.object({
      id: z.string().uuid(),
      status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const { supabase, userId } = context;
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });
