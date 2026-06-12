import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";
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

  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
    apiVersion: "2025-08-27.basil",
  });

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
  );

  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    // Always require webhook secret and signature verification
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not configured");
      return new Response(JSON.stringify({ error: "Webhook secret not configured" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      });
    }

    if (!signature) {
      return new Response(JSON.stringify({ error: "Missing stripe-signature header" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get line items for the session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ["data.price.product"],
      });

      const email = session.customer_details?.email || session.customer_email || "";
      const shippingAddress = session.shipping_details?.address || null;
      const total = (session.amount_total || 0) / 100;

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          email,
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string" ? session.payment_intent : null,
          status: "paid",
          total,
          shipping_address: shippingAddress,
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }

      // Create order items and decrement stock
      for (const item of lineItems.data) {
        const productName = typeof item.price?.product === "object" 
          ? (item.price.product as any).name 
          : item.description || "Unknown";
        const quantity = item.quantity || 1;
        const price = (item.amount_total || 0) / 100;

        // Look up product in our DB
        const { data: product } = await supabase
          .from("products")
          .select("id, stock")
          .eq("stripe_price_id", item.price?.id)
          .single();

        if (product) {
          // Find size from session metadata
          let size = "N/A";
          const itemCount = parseInt(session.metadata?.item_count || "0");
          for (let i = 0; i < itemCount; i++) {
            if (session.metadata?.[`item_${i}_name`] === productName || 
                item.price?.id === item.price?.id) {
              size = session.metadata?.[`item_${i}_size`] || "N/A";
              break;
            }
          }

          // Insert order item
          await supabase.from("order_items").insert({
            order_id: order.id,
            product_id: product.id,
            size,
            quantity,
            price,
          });

          // Decrement stock (service_role has access)
          await supabase.rpc("decrement_stock", {
            p_product_name: productName,
            p_quantity: quantity,
          });
        }
      }

      console.log(`Order ${order.id} created for ${email}, total: $${total}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: "Webhook processing failed" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
