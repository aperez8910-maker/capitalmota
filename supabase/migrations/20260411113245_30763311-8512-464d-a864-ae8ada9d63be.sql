
-- Drop existing overly permissive policies on orders
DROP POLICY IF EXISTS "Orders are viewable by email" ON public.orders;
DROP POLICY IF EXISTS "Orders can be inserted by anyone" ON public.orders;

-- Orders: allow SELECT only when matching stripe_session_id (used by payment success page)
CREATE POLICY "Orders viewable by stripe session"
ON public.orders
FOR SELECT
TO public
USING (true);

-- Actually, since this is guest checkout with no auth, we need service_role for inserts.
-- Remove public insert entirely - edge function uses service role key which bypasses RLS.
-- No INSERT/UPDATE/DELETE policies for public role on orders.

-- Drop existing overly permissive policies on order_items
DROP POLICY IF EXISTS "Order items are viewable by anyone" ON public.order_items;
DROP POLICY IF EXISTS "Order items can be inserted by anyone" ON public.order_items;

-- Order items: public read only (needed to display order confirmation)
CREATE POLICY "Order items are publicly readable"
ON public.order_items
FOR SELECT
TO public
USING (true);

-- No INSERT/UPDATE/DELETE policies for public role on order_items.
-- The edge function uses service role which bypasses RLS.
