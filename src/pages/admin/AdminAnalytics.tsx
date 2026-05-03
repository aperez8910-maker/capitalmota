import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminAnalytics() {
  const [range, setRange] = useState('30');
  const [dailyRevenue, setDailyRevenue] = useState<{ date: string; total: number; orders: number }[]>([]);
  const [topProducts, setTopProducts] = useState<{ name: string; count: number; revenue: number }[]>([]);
  const [byCategory, setByCategory] = useState<{ category: string; revenue: number }[]>([]);
  const [kpis, setKpis] = useState({ revenue: 0, orders: 0, aov: 0, units: 0, pendingRevenue: 0 });

  useEffect(() => {
    (async () => {
      const days = range === 'all' ? 3650 : parseInt(range);
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

      const [{ data: orders }, { data: items }, { data: products }] = await Promise.all([
        supabase.from('orders').select('*').gte('created_at', since).order('created_at'),
        supabase.from('order_items').select('*'),
        supabase.from('products').select('id,name,category'),
      ]);

      const productMap = new Map((products || []).map(p => [p.id, p]));
      const paid = (orders || []).filter(o => ['paid', 'shipped', 'delivered'].includes(o.status));
      const pending = (orders || []).filter(o => o.status === 'pending');
      const paidIds = new Set(paid.map(o => o.id));
      const paidItems = (items || []).filter(i => paidIds.has(i.order_id));

      const revenue = paid.reduce((s, o) => s + Number(o.total), 0);
      const units = paidItems.reduce((s, i) => s + i.quantity, 0);
      setKpis({
        revenue,
        orders: paid.length,
        aov: paid.length ? revenue / paid.length : 0,
        units,
        pendingRevenue: pending.reduce((s, o) => s + Number(o.total), 0),
      });

      // Daily
      const byDay: Record<string, { total: number; orders: number }> = {};
      paid.forEach(o => {
        const day = new Date(o.created_at).toLocaleDateString();
        if (!byDay[day]) byDay[day] = { total: 0, orders: 0 };
        byDay[day].total += Number(o.total);
        byDay[day].orders += 1;
      });
      setDailyRevenue(Object.entries(byDay).map(([date, d]) => ({ date, ...d })));

      // Top products
      const byProduct: Record<string, { name: string; count: number; revenue: number }> = {};
      paidItems.forEach(i => {
        const p = productMap.get(i.product_id);
        const key = i.product_id;
        if (!byProduct[key]) byProduct[key] = { name: p?.name || `${i.product_id?.slice(0, 8)}…`, count: 0, revenue: 0 };
        byProduct[key].count += i.quantity;
        byProduct[key].revenue += Number(i.price) * i.quantity;
      });
      setTopProducts(Object.values(byProduct).sort((a, b) => b.revenue - a.revenue).slice(0, 10));

      // By category
      const cats: Record<string, number> = {};
      paidItems.forEach(i => {
        const cat = productMap.get(i.product_id)?.category || 'unknown';
        cats[cat] = (cats[cat] || 0) + Number(i.price) * i.quantity;
      });
      setByCategory(Object.entries(cats).map(([category, revenue]) => ({ category, revenue })).sort((a, b) => b.revenue - a.revenue));
    })();
  }, [range]);

  const maxRevenue = Math.max(...dailyRevenue.map(d => d.total), 1);
  const maxCat = Math.max(...byCategory.map(c => c.revenue), 1);

  const kpiCards = [
    { label: 'Revenue', value: `$${kpis.revenue.toFixed(2)}` },
    { label: 'Paid Orders', value: kpis.orders },
    { label: 'AOV', value: `$${kpis.aov.toFixed(2)}` },
    { label: 'Units Sold', value: kpis.units },
    { label: 'Pending Revenue', value: `$${kpis.pendingRevenue.toFixed(2)}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wider">ANALYTICS</h1>
        <Select value={range} onValueChange={setRange}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last 12 months</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {kpiCards.map(k => (
          <Card key={k.label}>
            <CardContent className="py-4">
              <p className="text-xs text-muted-foreground">{k.label}</p>
              <p className="text-xl font-bold">{k.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader><CardTitle>Daily Revenue</CardTitle></CardHeader>
        <CardContent>
          {dailyRevenue.length === 0 ? (
            <p className="text-muted-foreground text-sm">No revenue in this range.</p>
          ) : (
            <div className="space-y-2">
              {dailyRevenue.map(d => (
                <div key={d.date} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-24 shrink-0">{d.date}</span>
                  <div className="flex-1 bg-secondary rounded h-6 overflow-hidden">
                    <div className="bg-primary h-full transition-all" style={{ width: `${(d.total / maxRevenue) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{d.orders}</span>
                  <span className="text-sm font-medium w-20 text-right">${d.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Top Products</CardTitle></CardHeader>
          <CardContent>
            {topProducts.length === 0 ? (
              <p className="text-muted-foreground text-sm">No sales yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-xs text-muted-foreground font-medium">Product</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">Units</th>
                    <th className="text-right py-2 text-xs text-muted-foreground font-medium">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map(p => (
                    <tr key={p.name} className="border-b border-border/50">
                      <td className="py-2 truncate max-w-[200px]">{p.name}</td>
                      <td className="py-2 text-right">{p.count}</td>
                      <td className="py-2 text-right font-medium">${p.revenue.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Revenue by Category</CardTitle></CardHeader>
          <CardContent>
            {byCategory.length === 0 ? (
              <p className="text-muted-foreground text-sm">No data.</p>
            ) : (
              <div className="space-y-2">
                {byCategory.map(c => (
                  <div key={c.category} className="flex items-center gap-3">
                    <span className="text-sm w-24 shrink-0 capitalize">{c.category}</span>
                    <div className="flex-1 bg-secondary rounded h-6 overflow-hidden">
                      <div className="bg-primary h-full" style={{ width: `${(c.revenue / maxCat) * 100}%` }} />
                    </div>
                    <span className="text-sm font-medium w-20 text-right">${c.revenue.toFixed(2)}</span>
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
