import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ChevronDown, ChevronUp, Download, Search } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [items, setItems] = useState<Record<string, any[]>>({});
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setOrders(data || []);
  };

  useEffect(() => { fetchOrders(); }, [filter]);

  const loadItems = async (orderId: string) => {
    if (items[orderId]) return;
    const { data } = await supabase.from('order_items').select('*').eq('order_id', orderId);
    setItems(prev => ({ ...prev, [orderId]: data || [] }));
  };

  const toggleExpand = (id: string) => {
    if (expanded === id) { setExpanded(null); return; }
    setExpanded(id);
    loadItems(id);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else { toast({ title: 'Updated', description: `Order set to ${status}` }); fetchOrders(); }
  };

  const exportCSV = () => {
    const rows = [['Order ID', 'Email', 'Status', 'Total', 'Date']];
    filtered.forEach(o => rows.push([o.id, o.email, o.status, o.total, o.created_at]));
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `orders-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = orders.filter(o =>
    !search ||
    o.email?.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = filtered
    .filter(o => ['paid', 'shipped', 'delivered'].includes(o.status))
    .reduce((s, o) => s + Number(o.total), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-3xl tracking-wider">ORDERS</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCSV}>
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search by email or order ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
            <SelectItem value="canceled">Canceled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card><CardContent className="py-4"><p className="text-xs text-muted-foreground">Showing</p><p className="text-2xl font-bold">{filtered.length}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-xs text-muted-foreground">Revenue</p><p className="text-2xl font-bold">${totalRevenue.toFixed(2)}</p></CardContent></Card>
        <Card><CardContent className="py-4"><p className="text-xs text-muted-foreground">Pending</p><p className="text-2xl font-bold">{orders.filter(o => o.status === 'pending').length}</p></CardContent></Card>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="py-8 text-center text-muted-foreground">No orders found.</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {filtered.map(order => (
            <Card key={order.id}>
              <CardHeader className="pb-3 cursor-pointer" onClick={() => toggleExpand(order.id)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {expanded === order.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    <CardTitle className="text-sm font-mono">{order.id.slice(0, 8)}…</CardTitle>
                  </div>
                  <Badge variant={order.status === 'paid' ? 'default' : 'secondary'}>{order.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><p className="text-muted-foreground text-xs">Email</p><p className="truncate">{order.email}</p></div>
                  <div><p className="text-muted-foreground text-xs">Total</p><p className="font-bold">${Number(order.total).toFixed(2)}</p></div>
                  <div><p className="text-muted-foreground text-xs">Date</p><p>{new Date(order.created_at).toLocaleString()}</p></div>
                  <div className="flex flex-wrap items-end gap-2">
                    <Select value={order.status} onValueChange={(v) => updateStatus(order.id, v)}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="paid">Paid</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="refunded">Refunded</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {expanded === order.id && (
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Line Items</p>
                      {!items[order.id] ? (
                        <p className="text-sm text-muted-foreground">Loading…</p>
                      ) : items[order.id].length === 0 ? (
                        <p className="text-sm text-muted-foreground">No items recorded.</p>
                      ) : (
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-border/50">
                              <th className="text-left py-1 text-xs text-muted-foreground font-medium">Product ID</th>
                              <th className="text-left py-1 text-xs text-muted-foreground font-medium">Size</th>
                              <th className="text-right py-1 text-xs text-muted-foreground font-medium">Qty</th>
                              <th className="text-right py-1 text-xs text-muted-foreground font-medium">Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {items[order.id].map(it => (
                              <tr key={it.id}>
                                <td className="py-1 font-mono text-xs">{it.product_id?.slice(0, 8)}…</td>
                                <td className="py-1">{it.size}</td>
                                <td className="py-1 text-right">{it.quantity}</td>
                                <td className="py-1 text-right">${Number(it.price).toFixed(2)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
                    {order.shipping_address && (
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Shipping Address</p>
                        <pre className="text-xs bg-secondary/50 p-2 rounded overflow-x-auto">
                          {JSON.stringify(order.shipping_address, null, 2)}
                        </pre>
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground space-y-0.5">
                      <p>Full Order ID: <span className="font-mono">{order.id}</span></p>
                      {order.stripe_session_id && <p>Stripe Session: <span className="font-mono">{order.stripe_session_id}</span></p>}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
