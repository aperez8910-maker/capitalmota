import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, Pencil } from 'lucide-react';

const empty = { name: '', price: '', category: 'tees', image_url: '', description: '', tag: '', stripe_price_id: '', sizes: 'XS,S,M,L,XL,2XL', stock: '100', active: true };

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingStock, setEditingStock] = useState<Record<string, string>>({});
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [form, setForm] = useState<any>(empty);
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('category').order('name');
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => { setEditing(null); setForm(empty); setDialogOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({
      name: p.name || '', price: String(p.price ?? ''), category: p.category || 'tees',
      image_url: p.image_url || '', description: p.description || '', tag: p.tag || '',
      stripe_price_id: p.stripe_price_id || '',
      sizes: (p.sizes || []).join(','), stock: String(p.stock ?? 0), active: p.active,
    });
    setDialogOpen(true);
  };

  const save = async () => {
    const payload: any = {
      name: form.name,
      price: parseFloat(form.price),
      category: form.category,
      image_url: form.image_url || null,
      description: form.description || null,
      tag: form.tag || null,
      stripe_price_id: form.stripe_price_id || null,
      sizes: form.sizes.split(',').map((s: string) => s.trim()).filter(Boolean),
      stock: parseInt(form.stock) || 0,
      active: form.active,
    };
    const { error } = editing
      ? await supabase.from('products').update(payload).eq('id', editing.id)
      : await supabase.from('products').insert(payload);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else { toast({ title: editing ? 'Product updated' : 'Product created' }); setDialogOpen(false); fetchProducts(); }
  };

  const updateStock = async (id: string) => {
    const stock = parseInt(editingStock[id]);
    if (isNaN(stock)) return;
    const { error } = await supabase.from('products').update({ stock }).eq('id', id);
    if (error) toast({ title: 'Error', description: error.message, variant: 'destructive' });
    else {
      toast({ title: 'Stock updated' });
      setEditingStock(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchProducts();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('products').update({ active: !active }).eq('id', id);
    fetchProducts();
  };

  const categories = Array.from(new Set(products.map(p => p.category))).sort();

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter !== 'all' && p.category !== catFilter) return false;
    if (stockFilter === 'low' && (p.stock ?? 0) >= 10) return false;
    if (stockFilter === 'out' && (p.stock ?? 0) > 0) return false;
    if (stockFilter === 'inactive' && p.active) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wider">PRODUCTS & INVENTORY</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader><DialogTitle>{editing ? 'Edit Product' : 'New Product'}</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Price ($)</Label><Input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></div>
                <div><Label>Stock</Label><Input type="number" value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Category</Label><Input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} /></div>
                <div><Label>Tag (e.g. NEW)</Label><Input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} /></div>
              </div>
              <div><Label>Sizes (comma-separated)</Label><Input value={form.sizes} onChange={e => setForm({ ...form, sizes: e.target.value })} /></div>
              <div><Label>Image URL</Label><Input value={form.image_url} onChange={e => setForm({ ...form, image_url: e.target.value })} /></div>
              <div><Label>Stripe Price ID</Label><Input value={form.stripe_price_id} onChange={e => setForm({ ...form, stripe_price_id: e.target.value })} placeholder="price_..." /></div>
              <div><Label>Description</Label><Textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} />
                Active (visible in shop)
              </label>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={save}>{editing ? 'Save Changes' : 'Create'}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <Select value={catFilter} onValueChange={setCatFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={stockFilter} onValueChange={setStockFilter}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Stock</SelectItem>
            <SelectItem value="low">Low (&lt; 10)</SelectItem>
            <SelectItem value="out">Out of Stock</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} of {products.length} products</p>

      <div className="grid gap-3">
        {filtered.map(p => (
          <Card key={p.id}>
            <CardContent className="flex items-center gap-4 py-3">
              {p.image_url ? (
                <img src={p.image_url} alt={p.name} className="h-16 w-16 rounded object-cover bg-secondary" />
              ) : (
                <div className="h-16 w-16 rounded bg-secondary" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <Badge variant={p.active ? 'default' : 'secondary'}>{p.active ? 'Active' : 'Inactive'}</Badge>
                  {(p.stock ?? 0) === 0 && <Badge variant="destructive">Out</Badge>}
                  {(p.stock ?? 0) > 0 && (p.stock ?? 0) < 10 && <Badge variant="destructive">Low</Badge>}
                  {!p.stripe_price_id && <Badge variant="outline" className="text-yellow-500 border-yellow-500/50">No Stripe ID</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">${Number(p.price).toFixed(2)} · {p.category} · {(p.sizes || []).join('/')}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Stock</p>
                  <Input
                    className="w-20 h-8 text-center"
                    value={editingStock[p.id] ?? p.stock ?? 0}
                    onChange={e => setEditingStock(prev => ({ ...prev, [p.id]: e.target.value }))}
                    onBlur={() => editingStock[p.id] !== undefined && updateStock(p.id)}
                    onKeyDown={e => e.key === 'Enter' && updateStock(p.id)}
                  />
                </div>
                <Button size="sm" variant="ghost" onClick={() => openEdit(p)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={() => toggleActive(p.id, p.active)}>
                  {p.active ? 'Disable' : 'Enable'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
