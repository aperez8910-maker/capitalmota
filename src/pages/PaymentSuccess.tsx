import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "@/hooks/use-cart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
  const { clearCart, setIsOpen } = useCart();

  useEffect(() => {
    // Cart is fulfilled — clear it and make sure the drawer isn't open.
    clearCart();
    setIsOpen(false);
  }, [clearCart, setIsOpen]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-40 pb-32 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-6"
        >
          <CheckCircle className="w-20 h-20 text-primary mx-auto mb-6" />
          <h1 className="font-display text-5xl tracking-wider text-foreground mb-4">
            ORDER CONFIRMED
          </h1>
          <p className="font-body text-muted-foreground mb-8">
            Thank you for your purchase. You'll receive a confirmation email shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-block font-display text-lg tracking-wider px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              CONTINUE SHOPPING
            </Link>
            <Link
              to="/orders"
              className="inline-block font-display text-lg tracking-wider px-8 py-3 border border-border text-foreground hover:border-primary transition-colors"
            >
              VIEW ORDERS
            </Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
