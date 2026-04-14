
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS stock integer DEFAULT 100;

CREATE OR REPLACE FUNCTION public.decrement_stock(p_product_name text, p_quantity integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.products
  SET stock = stock - p_quantity
  WHERE name = p_product_name AND stock >= p_quantity;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Insufficient stock for product: %', p_product_name;
  END IF;
END;
$$;
