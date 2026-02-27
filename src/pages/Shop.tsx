import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

import teeWhite from "@/assets/tee-white-vertical.png";
import teeNavy from "@/assets/tee-navy-box.png";
import teeGold from "@/assets/tee-gold-banner.png";
import teeArch from "@/assets/tee-arch-design.png";
import teeRed from "@/assets/tee-red-capital.png";
import teePink from "@/assets/tee-pink-kids.png";
import cwWhite from "@/assets/colorway-white.jpg";
import cwGreen from "@/assets/colorway-green.jpg";
import cwBlack from "@/assets/colorway-black.jpg";
import cwGray from "@/assets/colorway-gray.jpg";
import cwBurgundy from "@/assets/colorway-burgundy2.jpg";
import cwTan from "@/assets/colorway-tan.jpg";
import cwWhiteBack from "@/assets/colorway-white-back.jpg";
import cwGreenBack from "@/assets/colorway-green-back.jpg";
import cwBlackBack from "@/assets/colorway-black-back.jpg";
import cwGrayBack from "@/assets/colorway-gray-back.jpg";
import cwBurgundyBack from "@/assets/colorway-burgundy-back.jpg";
import cwTanBack from "@/assets/colorway-tan-back.jpg";
import fwA47Hoodie from "@/assets/fw-a47-hoodie-crewneck.jpeg";
import fwNavyTee from "@/assets/fw-navy-box-logo-tee.jpeg";
import fwBlackTeal from "@/assets/fw-black-teal-tee.png";
import fwRoyalBlue from "@/assets/fw-royal-blue-collection.png";
import fwBlueBox from "@/assets/fw-blue-box-logo-tee.png";
import fwBlueLifestyle from "@/assets/fw-blue-lifestyle.png";
import fwGrayMinimal from "@/assets/fw-gray-minimal-set.png";
import fwLuxuryCrewneck from "@/assets/fw-luxury-crewneck.jpeg";

const categories = [
  { id: "all", label: "ALL" },
  { id: "the-drop", label: "THE DROP" },
  { id: "colorways", label: "COLORWAYS" },
  { id: "back-details", label: "BACK DETAILS" },
  { id: "fw-collection", label: "F/W COLLECTION" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const products = [
  { image: teeWhite, name: "WHITE VERTICAL BOX LOGO", price: "$55.00", tag: "CLASSIC", category: "the-drop" },
  { image: teeNavy, name: "NAVY BOX LOGO CREW", price: "$55.00", tag: "OG", category: "the-drop" },
  { image: teeGold, name: "GOLD BANNER EDITION", price: "$60.00", tag: "420", category: "the-drop" },
  { image: teeArch, name: "AUSTIN ARCH TEE", price: "$55.00", category: "the-drop" },
  { image: teeRed, name: "RED CAPITAL TEE", price: "$55.00", tag: "NEW", category: "the-drop" },
  { image: teePink, name: "PINK KIDS EDITION", price: "$35.00", category: "the-drop" },

  { image: cwWhite, name: "WHITE BOX LOGO", price: "$55.00", tag: "COLORWAY", category: "colorways" },
  { image: cwGreen, name: "FOREST GREEN", price: "$55.00", tag: "COLORWAY", category: "colorways" },
  { image: cwBlack, name: "BLACK BOX LOGO", price: "$55.00", tag: "COLORWAY", category: "colorways" },
  { image: cwGray, name: "HEATHER GRAY", price: "$55.00", tag: "COLORWAY", category: "colorways" },
  { image: cwBurgundy, name: "BURGUNDY", price: "$55.00", tag: "COLORWAY", category: "colorways" },
  { image: cwTan, name: "SAND / TAN", price: "$55.00", tag: "COLORWAY", category: "colorways" },

  { image: cwWhiteBack, name: "WHITE — BACK", price: "$55.00", tag: "BACK", category: "back-details" },
  { image: cwGreenBack, name: "FOREST GREEN — BACK", price: "$55.00", tag: "BACK", category: "back-details" },
  { image: cwBlackBack, name: "BLACK — BACK", price: "$55.00", tag: "BACK", category: "back-details" },
  { image: cwGrayBack, name: "HEATHER GRAY — BACK", price: "$55.00", tag: "BACK", category: "back-details" },
  { image: cwBurgundyBack, name: "BURGUNDY — BACK", price: "$55.00", tag: "BACK", category: "back-details" },
  { image: cwTanBack, name: "SAND / TAN — BACK", price: "$55.00", tag: "BACK", category: "back-details" },

  { image: fwA47Hoodie, name: "A47 HOODIE + CREWNECK", price: "$85.00", tag: "HOODIE", category: "fw-collection" },
  { image: fwNavyTee, name: "NAVY BOX LOGO TEE", price: "$55.00", tag: "OG", category: "fw-collection" },
  { image: fwBlackTeal, name: "BLACK TEAL BOX LOGO TEE", price: "$55.00", tag: "NEW", category: "fw-collection" },
  { image: fwRoyalBlue, name: "ROYAL BLUE COLLECTION", price: "$55.00", tag: "S/S", category: "fw-collection" },
  { image: fwBlueBox, name: "BLUE BOX LOGO TEE", price: "$55.00", tag: "CLASSIC", category: "fw-collection" },
  { image: fwBlueLifestyle, name: "BLUE LIFESTYLE SET", price: "$55.00", tag: "UNISEX", category: "fw-collection" },
  { image: fwGrayMinimal, name: "GRAY MINIMAL SET", price: "$75.00", tag: "F/W", category: "fw-collection" },
  { image: fwLuxuryCrewneck, name: "LUXURY STREET CREWNECK", price: "$75.00", tag: "F/W", category: "fw-collection" },
];

const Shop = () => {
  const [active, setActive] = useState<CategoryId>("all");

  const filtered = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero banner */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3"
          >
            Heavyweight Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-6xl md:text-8xl tracking-wider text-foreground"
          >
            SHOP
          </motion.h1>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </div>
      </section>

      {/* Category filters */}
      <section className="sticky top-[61px] z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`font-display text-sm md:text-base tracking-wider px-5 py-2.5 whitespace-nowrap transition-all duration-300 border ${
                  active === cat.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-6">
          <motion.p
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-body text-sm text-muted-foreground mb-8"
          >
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6"
            >
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.name}
                  image={product.image}
                  name={product.name}
                  price={product.price}
                  tag={product.tag}
                  index={i}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
