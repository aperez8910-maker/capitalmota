import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PaymentSuccess = () => {
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
          <Link
            to="/shop"
            className="inline-block font-display text-lg tracking-wider px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
