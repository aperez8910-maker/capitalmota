import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Package, TrendingUp } from 'lucide-react';

export default function AdminOverview() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, products: 0, lowStock: 0 });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*'),
        supabase.from('products').select('*'),
      ]);

      const orders = ordersRes.data || [];
      const products = productsRes.data || [];
      const paid = orders.filter(o => o.status === 'paid');

      setStats({
        revenue: paid.reduce((sum, o) => sum + Number(o.total), 0),
        orders: orders.length,
        products: products.filter(p => p.active).length,
        lowStock: products.filter(p => (p.stock ?? 0) < 10).length,
      });

      setRecentOrders(orders.slice(0, 10));
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, icon: DollarSign },
    { title: 'Total Orders', value: stats.orders, icon: ShoppingCart },
    { title: 'Active Products', value: stats.products, icon: Package },
    { title: 'Low Stock Items', value: stats.lowStock, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl tracking-wider">DASHBOARD</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{c.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {recentOrders.length === 0 ? (
            <p className="text-muted-foreground text-sm">No orders yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-muted-foreground font-medium">Order ID</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Email</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">Status</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Total</th>
                    <th className="text-right py-2 text-muted-foreground font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(o => (
                    <tr key={o.id} className="border-b border-border/50">
                      <td className="py-2 font-mono text-xs">{o.id.slice(0, 8)}...</td>
                      <td className="py-2">{o.email}</td>
                      <td className="py-2">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          o.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                          o.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-2 text-right">${Number(o.total).toFixed(2)}</td>
                      <td className="py-2 text-right text-muted-foreground">
                        {new Date(o.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
