import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
import { createClient } from "npm:@supabase/supabase-js@2.57.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const MAX_QUANTITY_PER_ITEM = 10;
const MAX_CART_ITEMS = 20;

const ALLOWED_ORIGINS = new Set([
  "https://capitalmota.com",
  "https://www.capitalmota.com",
  "https://capitalmota.lovable.app",
]);
const DEFAULT_ORIGIN = "https://capitalmota.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("No items provided");
    }

    if (items.length > MAX_CART_ITEMS) {
      throw new Error(`Maximum ${MAX_CART_ITEMS} items per order`);
    }

    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2025-08-27.basil",
    });

    // Validate items against the database
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Fetch all active products with their stripe_price_ids
    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, name, stripe_price_id, active, stock")
      .eq("active", true);

    if (productsError) {
      throw new Error("Failed to validate products");
    }

    const validPriceIds = new Set((products || []).map(p => p.stripe_price_id).filter(Boolean));

    const lineItems = items.map((item: { stripePriceId: string; quantity: number; name: string; size: string }) => {
      // Validate price ID exists in our database
      if (!item.stripePriceId || !validPriceIds.has(item.stripePriceId)) {
        throw new Error(`Invalid product: ${item.name || 'unknown'}`);
      }

      // Validate quantity
      const qty = Math.max(1, Math.min(item.quantity || 1, MAX_QUANTITY_PER_ITEM));

      // Check stock
      const product = (products || []).find(p => p.stripe_price_id === item.stripePriceId);
      if (product && product.stock !== null && product.stock < qty) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }

      return {
        price: item.stripePriceId,
        quantity: qty,
      };
    });

    // Store item details as metadata for the webhook to use
    const metadata: Record<string, string> = {};
    items.forEach((item: { name: string; size: string; quantity: number }, index: number) => {
      metadata[`item_${index}_name`] = item.name;
      metadata[`item_${index}_size`] = item.size;
      metadata[`item_${index}_qty`] = String(Math.max(1, Math.min(item.quantity || 1, MAX_QUANTITY_PER_ITEM)));
    });
    metadata["item_count"] = String(items.length);

    const requestOrigin = req.headers.get("origin") || "";
    const origin = ALLOWED_ORIGINS.has(requestOrigin) ? requestOrigin : DEFAULT_ORIGIN;

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/payment-success`,
      cancel_url: `${origin}/payment-canceled`,
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
    console.error("Checkout error:", error);
    const msg = (error as Error)?.message || "";
    const isUserError =
      msg.includes("Invalid product") ||
      msg.includes("Insufficient stock") ||
      msg.includes("No items provided") ||
      msg.startsWith("Maximum");
    const status = isUserError ? 400 : 500;
    const safeMessage = isUserError ? msg : "Checkout processing failed";
    return new Response(JSON.stringify({ error: safeMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status,
    });
  }
});
