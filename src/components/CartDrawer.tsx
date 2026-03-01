import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, total, isOpen, setIsOpen, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: {
          items: items.map((i) => ({
            stripePriceId: i.stripePriceId,
            quantity: i.quantity,
            name: i.name,
            size: i.size,
          })),
        },
      });
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="bg-card border-border flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-display text-2xl tracking-wider text-foreground">
            YOUR CART
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4">
            <ShoppingBag className="w-16 h-16 text-muted-foreground" />
            <p className="font-body text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4 mt-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-border pb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-lg tracking-wider text-foreground truncate">
                      {item.name}
                    </h4>
                    <p className="font-body text-sm text-muted-foreground">
                      Size: {item.size}
                    </p>
                    <p className="font-body text-sm text-primary mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border text-foreground hover:border-primary transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-body text-sm text-foreground w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 flex items-center justify-center border border-border text-foreground hover:border-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="font-display text-xl tracking-wider text-foreground">
                  TOTAL
                </span>
                <span className="font-display text-xl text-primary">
                  ${total.toFixed(2)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full font-display text-lg tracking-wider py-6 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? "PROCESSING..." : "CHECKOUT"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
