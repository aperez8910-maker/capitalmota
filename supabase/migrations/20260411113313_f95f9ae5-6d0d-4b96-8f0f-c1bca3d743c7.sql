
-- Remove the still-permissive SELECT on orders - not needed client-side
DROP POLICY IF EXISTS "Orders viewable by stripe session" ON public.orders;
