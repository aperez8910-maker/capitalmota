import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MusicPlayer from "@/components/MusicPlayer";
import CultureBanner from "@/components/CultureBanner";
import Culture from "@/components/Culture";
import About from "@/components/About";
import VideoLookbook from "@/components/VideoLookbook";
import ShippingInfo from "@/components/ShippingInfo";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import originalLogo from "@/assets/logo.jpeg";
import brandLogo from "@/assets/brand-logo.png";
import seal from "@/assets/brand-seal.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <CultureBanner />

      {/* Shop CTA Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-5 mb-8">
              <img src={originalLogo} alt="Capital Mota" className="h-14 md:h-20 object-contain" />
              <img src={brandLogo} alt="Capital Mota Austin" className="h-14 md:h-20 object-contain" />
              <img src={seal} alt="United Mota Mob" className="h-14 md:h-20 w-14 md:w-20 object-cover rounded-full" />
            </div>
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Heavyweight Collection
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-6">
              THE DROP
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto mb-10 font-light">
              Explore our full catalog — tees, hoodies, crewnecks, and seasonal exclusives. All built on heavyweight blanks.
            </p>
            <Link
              to="/shop"
              className="inline-block font-display text-xl tracking-wider px-12 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-glow"
            >
              SHOP NOW
            </Link>
          </motion.div>
        </div>
      </section>

      <VideoLookbook />
      <Culture />
      <About />
      <ShippingInfo />
      <FAQ />
      <CultureBanner />
      <Footer />
      <MusicPlayer />
    </div>
  );
};

export default Index;
