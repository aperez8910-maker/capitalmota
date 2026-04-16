import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [editingStock, setEditingStock] = useState<Record<string, string>>({});
  const [addOpen, setAddOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: 'tees', image_url: '', description: '' });
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('name');
    setProducts(data || []);
  };

  useEffect(() => { fetchProducts(); }, []);

  const updateStock = async (id: string) => {
    const stock = parseInt(editingStock[id]);
    if (isNaN(stock)) return;
    const { error } = await supabase.from('products').update({ stock }).eq('id', id);
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Stock updated' });
      setEditingStock(prev => { const n = { ...prev }; delete n[id]; return n; });
      fetchProducts();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('products').update({ active: !active }).eq('id', id);
    fetchProducts();
  };

  const addProduct = async () => {
    const { error } = await supabase.from('products').insert({
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image_url: newProduct.image_url || null,
      description: newProduct.description || null,
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Product added' });
      setAddOpen(false);
      setNewProduct({ name: '', price: '', category: 'tees', image_url: '', description: '' });
      fetchProducts();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl tracking-wider">PRODUCTS & INVENTORY</h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Add New Product</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Name</Label><Input value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} /></div>
              <div><Label>Price</Label><Input type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} /></div>
              <div><Label>Category</Label><Input value={newProduct.category} onChange={e => setNewProduct(p => ({ ...p, category: e.target.value }))} /></div>
              <div><Label>Image URL</Label><Input value={newProduct.image_url} onChange={e => setNewProduct(p => ({ ...p, image_url: e.target.value }))} /></div>
              <div><Label>Description</Label><Input value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} /></div>
              <Button onClick={addProduct} className="w-full">Create Product</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {products.map(p => (
          <Card key={p.id}>
            <CardContent className="flex items-center gap-4 py-4">
              {p.image_url && (
                <img src={p.image_url} alt={p.name} className="h-16 w-16 rounded object-cover" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold truncate">{p.name}</h3>
                  <Badge variant={p.active ? 'default' : 'secondary'}>
                    {p.active ? 'Active' : 'Inactive'}
                  </Badge>
                  {(p.stock ?? 0) < 10 && (
                    <Badge variant="destructive">Low Stock</Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">${Number(p.price).toFixed(2)} · {p.category}</p>
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
