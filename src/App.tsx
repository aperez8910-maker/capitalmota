import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/hooks/use-cart";
import { AdminAuthProvider } from "@/hooks/use-admin-auth";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCanceled from "./pages/PaymentCanceled";
import NotFound from "./pages/NotFound";
import CartDrawer from "./components/CartDrawer";
import AdminLogin from "./pages/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AdminAuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <CartDrawer />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/payment-success" element={<PaymentSuccess />} />
              <Route path="/payment-canceled" element={<PaymentCanceled />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminOverview />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="analytics" element={<AdminAnalytics />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminAuthProvider>
      </CartProvider>
    </TooltipProvider>
<div className="fixed bottom-3 right-3 z-50 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/60 backdrop-blur">
  Built by Alexander Emilio Perez
</div>
  </QueryClientProvider>
);

export default App;
