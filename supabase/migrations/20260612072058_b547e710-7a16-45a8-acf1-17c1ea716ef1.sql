
-- Hide stripe_price_id from public/anon/authenticated reads via column-level grants
REVOKE SELECT ON public.products FROM anon, authenticated;
GRANT SELECT (id, name, description, price, image_url, category, tag, sizes, active, created_at, updated_at, stock) ON public.products TO anon, authenticated;

-- Restrict SECURITY DEFINER helper functions so they cannot be called directly via the Data API.
-- decrement_stock is only invoked by edge functions running as service_role.
REVOKE EXECUTE ON FUNCTION public.decrement_stock(text, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.decrement_stock(text, integer) TO service_role;

-- handle_new_user and update_updated_at_column are trigger functions; nothing should call them directly.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
