import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";

interface OrderItem {
  id: string;
  size: string;
  quantity: number;
  price: number;
  products: { name: string; image_url: string | null } | null;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total: number;
  email: string;
  items: OrderItem[];
}

const statusClass = (status: string) => {
  switch (status) {
    case "paid":
      return "bg-primary/15 text-primary border-primary/30";
    case "shipped":
      return "bg-accent/15 text-accent border-accent/30";
    case "refunded":
    case "canceled":
      return "bg-destructive/15 text-destructive border-destructive/30";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const Orders = () => {
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOrders(null);
    try {
      const { data, error: fnErr } = await supabase.functions.invoke("lookup-order", {
        body: { email, orderId },
      });
      if (fnErr) throw fnErr;
      if (data?.error) throw new Error(data.error);
      setOrders(data?.orders || []);
    } catch (err: any) {
      setError(err?.message || "Unable to look up order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-5xl md:text-6xl tracking-wider text-foreground mb-3">
              YOUR ORDERS
            </h1>
            <p className="font-body text-muted-foreground mb-10 max-w-xl">
              Enter the email used at checkout and your order number (found in your
              confirmation email) to view status and details.
            </p>
          </motion.div>

          <form
            onSubmit={handleLookup}
            className="grid gap-4 md:grid-cols-[1fr_1fr_auto] items-end border border-border bg-card/40 p-6 mb-10"
          >
            <div className="space-y-2">
              <Label htmlFor="email" className="font-body uppercase tracking-widest text-xs">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="orderId" className="font-body uppercase tracking-widest text-xs">
                Order #
              </Label>
              <Input
                id="orderId"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="e.g. 3f9a1b2c"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="font-display tracking-wider py-6 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Search className="mr-2 h-4 w-4" />
              {loading ? "SEARCHING..." : "LOOK UP"}
            </Button>
          </form>

          {error && (
            <p className="font-body text-sm text-destructive mb-6">{error}</p>
          )}

          {orders && orders.length === 0 && (
            <div className="border border-border p-10 text-center">
              <Package className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-muted-foreground">
                No orders found for that email + order number combination.
              </p>
            </div>
          )}

          <div className="space-y-6">
            {(orders || []).map((order) => (
              <motion.article
                key={order.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-border bg-card/40"
              >
                <header className="flex flex-wrap items-center justify-between gap-3 p-5 border-b border-border">
                  <div>
                    <p className="font-body text-xs uppercase tracking-widest text-muted-foreground">
                      Order #{order.id.slice(0, 8)}
                    </p>
                    <p className="font-display text-lg tracking-wider text-foreground mt-1">
                      {new Date(order.created_at).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 text-xs font-body uppercase tracking-widest border ${statusClass(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </header>

                <ul className="divide-y divide-border">
                  {order.items.map((it) => (
                    <li key={it.id} className="flex gap-4 p-5">
                      {it.products?.image_url ? (
                        <img
                          src={it.products.image_url}
                          alt={it.products?.name || "Product"}
                          className="w-16 h-20 object-cover bg-muted"
                        />
                      ) : (
                        <div className="w-16 h-20 bg-muted" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-display tracking-wider text-foreground">
                          {it.products?.name || "Item"}
                        </p>
                        <p className="font-body text-sm text-muted-foreground">
                          Size {it.size} · Qty {it.quantity}
                        </p>
                      </div>
                      <p className="font-body text-sm text-foreground">
                        ${it.price.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>

                <footer className="flex justify-between items-center p-5 border-t border-border">
                  <span className="font-display tracking-wider text-foreground">TOTAL</span>
                  <span className="font-display text-lg text-primary">
                    ${Number(order.total).toFixed(2)}
                  </span>
                </footer>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Orders;