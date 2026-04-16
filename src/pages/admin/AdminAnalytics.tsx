import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminAnalytics() {
  const [dailyRevenue, setDailyRevenue] = useState<{ date: string; total: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; count: number; revenue: number }[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'paid')
        .order('created_at', { ascending: true });

      const { data: items } = await supabase
        .from('order_items')
        .select('*');

      // Daily revenue
      const byDay: Record<string, number> = {};
      (orders || []).forEach(o => {
        const day = new Date(o.created_at).toLocaleDateString();
        byDay[day] = (byDay[day] || 0) + Number(o.total);
      });
      setDailyRevenue(Object.entries(byDay).map(([date, total]) => ({ date, total })));

      // Top products
      const byProduct: Record<string, { count: number; revenue: number }> = {};
      (items || []).forEach(i => {
        const name = i.product_id;
        if (!byProduct[name]) byProduct[name] = { count: 0, revenue: 0 };
        byProduct[name].count += i.quantity;
        byProduct[name].revenue += Number(i.price) * i.quantity;
      });
      setTopProducts(
        Object.entries(byProduct)
          .map(([name, d]) => ({ name, ...d }))
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 10)
      );
    };
    fetchAnalytics();
  }, []);

  const maxRevenue = Math.max(...dailyRevenue.map(d => d.total), 1);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl tracking-wider">ANALYTICS</h1>

      <Card>
        <CardHeader><CardTitle>Daily Revenue</CardTitle></CardHeader>
        <CardContent>
          {dailyRevenue.length === 0 ? (
            <p className="text-muted-foreground text-sm">No revenue data yet.</p>
          ) : (
            <div className="space-y-2">
              {dailyRevenue.map(d => (
                <div key={d.date} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-24 shrink-0">{d.date}</span>
                  <div className="flex-1 bg-secondary rounded h-6 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded transition-all"
                      style={{ width: `${(d.total / maxRevenue) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium w-20 text-right">${d.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Top Products by Revenue</CardTitle></CardHeader>
        <CardContent>
          {topProducts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No sales data yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Product ID</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Units Sold</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map(p => (
                  <tr key={p.name} className="border-b border-border/50">
                    <td className="py-2 font-mono text-xs">{p.name.slice(0, 12)}...</td>
                    <td className="py-2 text-right">{p.count}</td>
                    <td className="py-2 text-right font-medium">${p.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
