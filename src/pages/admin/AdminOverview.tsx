import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, Package, AlertTriangle, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function AdminOverview() {
  const [stats, setStats] = useState({
    revenue: 0, revenue7d: 0, orders: 0, orders7d: 0,
    pending: 0, products: 0, lowStock: 0, customers: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [lowStockItems, setLowStockItems] = useState<any[]>([]);
  const [chart, setChart] = useState<{ date: string; total: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*'),
      ]);
      const orders = ordersRes.data || [];
      const products = productsRes.data || [];
      const paid = orders.filter(o => o.status === 'paid' || o.status === 'shipped' || o.status === 'delivered');
      const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
      const recent = paid.filter(o => new Date(o.created_at).getTime() >= sevenDaysAgo);

      // Build 7-day chart
      const days: { date: string; total: number }[] = [];
      for (let i = 6; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const total = paid
          .filter(o => new Date(o.created_at).toDateString() === d.toDateString())
          .reduce((s, o) => s + Number(o.total), 0);
        days.push({ date: key, total });
      }

      setStats({
        revenue: paid.reduce((s, o) => s + Number(o.total), 0),
        revenue7d: recent.reduce((s, o) => s + Number(o.total), 0),
        orders: orders.length,
        orders7d: orders.filter(o => new Date(o.created_at).getTime() >= sevenDaysAgo).length,
        pending: orders.filter(o => o.status === 'pending').length,
        products: products.filter(p => p.active).length,
        lowStock: products.filter(p => (p.stock ?? 0) < 10).length,
        customers: new Set(orders.map(o => o.email)).size,
      });
      setRecentOrders(orders.slice(0, 8));
      setLowStockItems(products.filter(p => (p.stock ?? 0) < 10).slice(0, 6));
      setChart(days);
      setLoading(false);
    })();
  }, []);

  const cards = [
    { title: 'Total Revenue', value: `$${stats.revenue.toFixed(2)}`, sub: `$${stats.revenue7d.toFixed(2)} last 7d`, icon: DollarSign },
    { title: 'Total Orders', value: stats.orders, sub: `${stats.orders7d} last 7d`, icon: ShoppingCart },
    { title: 'Pending Orders', value: stats.pending, sub: 'Awaiting payment', icon: Clock },
    { title: 'Customers', value: stats.customers, sub: 'Unique emails', icon: Users },
    { title: 'Active Products', value: stats.products, sub: 'In catalog', icon: Package },
    { title: 'Low Stock', value: stats.lowStock, sub: '< 10 units', icon: AlertTriangle },
  ];

  const maxBar = Math.max(...chart.map(d => d.total), 1);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl tracking-wider">DASHBOARD</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(c => (
          <Card key={c.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{c.title}</CardTitle>
              <c.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{loading ? '…' : c.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle className="text-lg">Revenue · Last 7 Days</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-end gap-2 h-40">
            {chart.map(d => (
              <div key={d.date} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-secondary rounded-t flex items-end" style={{ height: '100%' }}>
                  <div
                    className="w-full bg-primary rounded-t transition-all"
                    style={{ height: `${(d.total / maxBar) * 100}%`, minHeight: d.total > 0 ? '4px' : '0' }}
                    title={`$${d.total.toFixed(2)}`}
                  />
                </div>
                <span className="text-[10px] text-muted-foreground">{d.date}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/admin/orders">View all</Link></Button>
          </CardHeader>
          <CardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">No orders yet.</p>
            ) : (
              <div className="space-y-2">
                {recentOrders.map(o => (
                  <div key={o.id} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                    <div className="min-w-0 flex-1">
                      <p className="truncate">{o.email}</p>
                      <p className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs mx-2 ${
                      o.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                      o.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                      o.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' :
                      o.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-muted text-muted-foreground'
                    }`}>{o.status}</span>
                    <span className="font-medium w-20 text-right">${Number(o.total).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-500" /> Low Stock Alerts
            </CardTitle>
            <Button asChild variant="ghost" size="sm"><Link to="/admin/products">Manage</Link></Button>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <p className="text-muted-foreground text-sm">All inventory healthy.</p>
            ) : (
              <div className="space-y-2">
                {lowStockItems.map(p => (
                  <div key={p.id} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                    <span className="truncate flex-1">{p.name}</span>
                    <span className={`text-xs font-bold ${(p.stock ?? 0) === 0 ? 'text-red-500' : 'text-yellow-500'}`}>
                      {p.stock ?? 0} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
