import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

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
    const { items } = await req.json();

    if (!items || items.length === 0) {
      throw new Error("No items provided");
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    const lineItems = items.map((item: { stripePriceId: string; quantity: number; name: string; size: string }) => ({
      price: item.stripePriceId,
      quantity: item.quantity,
    }));

    // Store item details as metadata for the webhook to use
    const metadata: Record<string, string> = {};
    items.forEach((item: { name: string; size: string; quantity: number }, index: number) => {
      metadata[`item_${index}_name`] = item.name;
      metadata[`item_${index}_size`] = item.size;
      metadata[`item_${index}_qty`] = String(item.quantity);
    });
    metadata["item_count"] = String(items.length);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/payment-success`,
      cancel_url: `${req.headers.get("origin")}/payment-canceled`,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      metadata,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
