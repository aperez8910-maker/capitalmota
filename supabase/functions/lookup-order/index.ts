import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, orderId } = await req.json();

    const emailStr = typeof email === "string" ? email.trim().toLowerCase() : "";
    const orderStr = typeof orderId === "string" ? orderId.trim().toLowerCase() : "";

    // Require BOTH fields to prevent enumeration of orders by email alone.
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr) && emailStr.length <= 254;
    const orderValid = orderStr.length >= 6 && orderStr.length <= 36 && /^[0-9a-f-]+$/.test(orderStr);

    if (!emailValid || !orderValid) {
      return new Response(JSON.stringify({ error: "Email and order number are required." }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Match by email + order id (full UUID or prefix). Cap to recent 10.
    let query = supabase
      .from("orders")
      .select("id, created_at, status, total, email, stripe_session_id")
      .ilike("email", emailStr)
      .order("created_at", { ascending: false })
      .limit(10);

    if (orderStr.includes("-") && orderStr.length === 36) {
      query = query.eq("id", orderStr);
    } else {
      // prefix match on UUID
      query = query.ilike("id", `${orderStr}%`);
    }

    const { data: orders, error: ordersErr } = await query;
    if (ordersErr) throw ordersErr;

    if (!orders || orders.length === 0) {
      return new Response(JSON.stringify({ orders: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const orderIds = orders.map((o) => o.id);
    const { data: items } = await supabase
      .from("order_items")
      .select("id, order_id, size, quantity, price, product_id, products(name, image_url)")
      .in("order_id", orderIds);

    const enriched = orders.map((o) => ({
      ...o,
      items: (items || []).filter((it: any) => it.order_id === o.id),
    }));

    return new Response(JSON.stringify({ orders: enriched }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    console.error("lookup-order error:", err);
    return new Response(JSON.stringify({ error: "Lookup failed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});