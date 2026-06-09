import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import lifestyleColorways from "@/assets/lifestyle-ak47-colorways.png";
import lifestyleGlobe from "@/assets/lifestyle-globe-collection.png";
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
import fwBlackTeal from "@/assets/fw-black-teal-tee.png";
import fwRoyalBlue from "@/assets/fw-royal-blue-collection.png";
import fwBlueBox from "@/assets/fw-blue-box-logo-tee.png";
import fwBlueLifestyle from "@/assets/fw-blue-lifestyle.png";
import fwGrayMinimal from "@/assets/fw-gray-minimal-set.png";
import fwLuxuryCrewneck from "@/assets/fw-luxury-crewneck.jpeg";
import teeAk47TanMockup from "@/assets/tee-ak47-tan-mockup.png";
import teeCapitalHazeTrio from "@/assets/tee-capital-haze-trio.png";
import teeUnitedMobBlack from "@/assets/tee-united-mota-mob-black.png";
import teeUnitedMobColorways from "@/assets/tee-united-mota-mob-colorways.png";

// New drops — tracksuits, cropped sets, AK47 hoodie sets, caps
import tracksuitTrioCaps from "@/assets/tracksuit-trio-caps.jpg";
import tracksuitBlueOrangeWhite from "@/assets/tracksuit-blue-orange-white.jpg";
import croppedTracksuitTrio from "@/assets/cropped-tracksuit-trio.jpg";
import croppedTracksuitFull from "@/assets/cropped-tracksuit-full.jpg";
import ak47HoodieYellowCamo from "@/assets/ak47-hoodie-yellow-camo.jpg";
import ak47HoodieGrid from "@/assets/ak47-hoodie-grid.jpg";

const categories = [
  { id: "all", label: "ALL" },
  { id: "new", label: "NEW DROPS" },
  { id: "tracksuits", label: "TRACKSUITS" },
  { id: "cropped", label: "HER" },
  { id: "caps", label: "CAPS" },
  { id: "tees", label: "TEES" },
  { id: "kids", label: "KIDS" },
  { id: "colorways", label: "COLORWAYS" },
  { id: "hoodies", label: "HOODIES & CREWS" },
  { id: "sets", label: "SETS" },
] as const;

type CategoryId = (typeof categories)[number]["id"];

const COLORWAY_PRICE_ID = "price_1T5wpeJgBXUAVj38znl6YNHq";

const products = [
  // NEW: Capital Mota Tracksuit (full set) — colorway selector
  {
    image: tracksuitTrioCaps,
    name: "Capital Mota Tracksuit",
    price: "$145.00",
    tag: "NEW",
    category: "tracksuits",
    stripePriceId: "price_1TSVqrJgBXUAVj38N8CfPrAh",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colorways: [
      { label: "SAGE", image: tracksuitTrioCaps, stripePriceId: "price_1TSVqrJgBXUAVj38N8CfPrAh", name: "Capital Mota Tracksuit — Sage" },
      { label: "PINK", image: tracksuitTrioCaps, stripePriceId: "price_1TSVqrJgBXUAVj38YywP4rGk", name: "Capital Mota Tracksuit — Pink" },
      { label: "AK47 LAVENDER", image: tracksuitTrioCaps, stripePriceId: "price_1TSVqtJgBXUAVj38ssI93woa", name: "Capital Mota Tracksuit — AK47 Lavender" },
      { label: "ROYAL BLUE", image: tracksuitBlueOrangeWhite, stripePriceId: "price_1TSVquJgBXUAVj3855kXgjZ5", name: "Capital Mota Tracksuit — Royal Blue" },
      { label: "ORANGE", image: tracksuitBlueOrangeWhite, stripePriceId: "price_1TSVqvJgBXUAVj38s1tMdu27", name: "Capital Mota Tracksuit — Orange" },
      { label: "WHITE AK47", image: tracksuitBlueOrangeWhite, stripePriceId: "price_1TSVqwJgBXUAVj38gGHtVjOw", name: "Capital Mota Tracksuit — White AK47" },
    ],
  },

  // NEW: Cropped Tracksuit — HER collection
  {
    image: croppedTracksuitFull,
    name: "Cropped Tracksuit — HER",
    price: "$135.00",
    tag: "HER",
    category: "cropped",
    stripePriceId: "price_1TSVqxJgBXUAVj38X9dVTvUM",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colorways: [
      { label: "SAGE", image: croppedTracksuitFull, stripePriceId: "price_1TSVqxJgBXUAVj38X9dVTvUM", name: "Cropped Tracksuit — Sage" },
      { label: "PINK", image: croppedTracksuitTrio, stripePriceId: "price_1TSVqyJgBXUAVj38GeyiFCRQ", name: "Cropped Tracksuit — Pink" },
      { label: "AK47", image: croppedTracksuitTrio, stripePriceId: "price_1TSVqzJgBXUAVj38LI7NE0Fc", name: "Cropped Tracksuit — AK47 Black/Yellow" },
    ],
  },

  // NEW: AK47 Hoodie Set
  {
    image: ak47HoodieYellowCamo,
    name: "AK47 Hoodie Set",
    price: "$95.00",
    tag: "AK47",
    category: "sets",
    stripePriceId: "price_1TSVr1JgBXUAVj38JQwUaVRF",
    sizes: ["XS", "S", "M", "L", "XL", "2XL"],
    colorways: [
      { label: "YELLOW CAMO", image: ak47HoodieYellowCamo, stripePriceId: "price_1TSVr1JgBXUAVj38JQwUaVRF", name: "AK47 Hoodie Set — Black/Yellow Camo" },
      { label: "YELLOW STRIPE", image: ak47HoodieGrid, stripePriceId: "price_1TSVr2JgBXUAVj38bFLPRMuu", name: "AK47 Hoodie Set — Black/Yellow Stripe" },
      { label: "BLACK STRIPE", image: ak47HoodieGrid, stripePriceId: "price_1TSVr3JgBXUAVj38vyOBETDh", name: "AK47 Hoodie Set — Black/White Stripe" },
      { label: "WHITE STRIPE", image: ak47HoodieGrid, stripePriceId: "price_1TSVr4JgBXUAVj38oP85H82J", name: "AK47 Hoodie Set — White/Black Stripe" },
      { label: "BLACK", image: ak47HoodieGrid, stripePriceId: "price_1TSVr5JgBXUAVj38Zj1jX5ke", name: "AK47 Hoodie Set — Black" },
      { label: "WHITE", image: ak47HoodieGrid, stripePriceId: "price_1TSVr6JgBXUAVj38Zw2d5EKE", name: "AK47 Hoodie Set — White" },
    ],
  },

  // NEW: Austin TX MOTA Cap
  {
    image: tracksuitTrioCaps,
    name: "Austin TX MOTA Cap",
    price: "$45.00",
    tag: "CAP",
    category: "caps",
    stripePriceId: "price_1TSVr8JgBXUAVj38X4h9maxt",
    sizes: ["One Size"],
    colorways: [
      { label: "BLACK / WHITE", image: tracksuitTrioCaps, stripePriceId: "price_1TSVr8JgBXUAVj38X4h9maxt", name: "Austin TX MOTA Cap — Black/White" },
      { label: "BLACK / RED", image: tracksuitTrioCaps, stripePriceId: "price_1TSVrAJgBXUAVj38ARQsG8OD", name: "Austin TX MOTA Cap — Black/Red" },
      { label: "LAVENDER", image: tracksuitTrioCaps, stripePriceId: "price_1TSVrAJgBXUAVj38q0UCAyxD", name: "Austin TX MOTA Cap — Lavender" },
      { label: "BLACK / YELLOW", image: croppedTracksuitTrio, stripePriceId: "price_1TSVrCJgBXUAVj38qmKXDWWq", name: "Austin TX MOTA Cap — Black/Yellow" },
      { label: "WHITE", image: tracksuitBlueOrangeWhite, stripePriceId: "price_1TSVrCJgBXUAVj38BORJIkn2", name: "Austin TX MOTA Cap — White" },
    ],
  },

  // NEW DROPS — featured first
  { image: teeAk47TanMockup, name: "AK47 Tee — Black", price: "$55.00", tag: "NEW", category: "new", stripePriceId: "price_1T628KJgBXUAVj38EK7xKvsq" },
  { image: teeCapitalHazeTrio, name: "Capital Haze Tee — Red", price: "$55.00", tag: "NEW", category: "new", stripePriceId: "price_1T628XJgBXUAVj38OMLcoRW5" },
  { image: teeUnitedMobBlack, name: "United Mota Mob Tee — Black", price: "$55.00", tag: "NEW", category: "new", stripePriceId: "price_1T628YJgBXUAVj38I7f2SUKz" },
  { image: teeUnitedMobColorways, name: "United Mota Mob Tee — Olive", price: "$55.00", tag: "NEW", category: "new", stripePriceId: "price_1T628ZJgBXUAVj385H8Kmuxg" },

  // Tees
  { image: teeWhite, name: "Box Logo Tee — White", price: "$55.00", tag: "CLASSIC", category: "tees", stripePriceId: "price_1T5wnHJgBXUAVj38OrWhwvJC" },
  { image: teeNavy, name: "Box Logo Tee — Navy", price: "$55.00", tag: "OG", category: "tees", stripePriceId: "price_1T5wnVJgBXUAVj38Zyr6qyjq" },
  { image: teeGold, name: "Banner Tee — Gold", price: "$60.00", tag: "420", category: "tees", stripePriceId: "price_1T5woSJgBXUAVj380pZv5qxm" },
  { image: teeArch, name: "Arch Tee — Austin", price: "$55.00", category: "tees", stripePriceId: "price_1T5wonJgBXUAVj38ic8qRjN0" },
  { image: teeRed, name: "Capital Tee — Red", price: "$55.00", category: "tees", stripePriceId: "price_1T5wp9JgBXUAVj38PCUwnC8v" },
  { image: fwBlackTeal, name: "Box Logo Tee — Black/Teal", price: "$55.00", category: "tees", stripePriceId: "price_1T5wnHJgBXUAVj38OrWhwvJC" },
  { image: fwBlueBox, name: "Box Logo Tee — Blue", price: "$55.00", category: "tees", stripePriceId: "price_1T5wnHJgBXUAVj38OrWhwvJC" },

  // Kids
  { image: teePink, name: "Capital Tee — Pink (Kids)", price: "$35.00", tag: "YOUTH", category: "kids", stripePriceId: "price_1T5wpOJgBXUAVj381rkrUkty", sizes: ["YS", "YM", "YL"] },

  // Colorways
  { image: cwWhite, name: "Colorway Tee — White (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwWhiteBack, name: "Colorway Tee — White (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwGreen, name: "Colorway Tee — Forest Green (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwGreenBack, name: "Colorway Tee — Forest Green (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwBlack, name: "Colorway Tee — Black (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwBlackBack, name: "Colorway Tee — Black (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwGray, name: "Colorway Tee — Heather Gray (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwGrayBack, name: "Colorway Tee — Heather Gray (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwBurgundy, name: "Colorway Tee — Burgundy (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwBurgundyBack, name: "Colorway Tee — Burgundy (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwTan, name: "Colorway Tee — Sand (Front)", price: "$55.00", tag: "FRONT", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },
  { image: cwTanBack, name: "Colorway Tee — Sand (Back)", price: "$55.00", tag: "BACK", category: "colorways", stripePriceId: COLORWAY_PRICE_ID },

  // Hoodies & Crews
  { image: fwA47Hoodie, name: "A47 Hoodie — Black", price: "$85.00", tag: "HOODIE", category: "hoodies", stripePriceId: "price_1T5wprJgBXUAVj38AxKpn3n4", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },
  { image: fwLuxuryCrewneck, name: "Luxury Crewneck — Gray", price: "$75.00", tag: "CREW", category: "hoodies", stripePriceId: "price_1T5wqNJgBXUAVj38zF0nvADB", sizes: ["S", "M", "L", "XL", "2XL", "3XL"] },

  // Sets
  { image: fwRoyalBlue, name: "Royal Blue Set", price: "$55.00", tag: "S/S", category: "sets", stripePriceId: "price_1T5ztcJgBXUAVj38WaMeRhmZ" },
  { image: fwBlueLifestyle, name: "Blue Lifestyle Set", price: "$55.00", tag: "UNISEX", category: "sets", stripePriceId: "price_1T5zuSJgBXUAVj38pTzxN27F" },
  { image: fwGrayMinimal, name: "Gray Minimal Set", price: "$75.00", tag: "F/W", category: "sets", stripePriceId: "price_1T5zuZJgBXUAVj3877Fueo46" },
];

const Shop = () => {
  const [active, setActive] = useState<CategoryId>("new");
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = active === "all"
    ? products
    : active === "new"
      ? products.filter((p) => p.category === "new" || p.tag === "NEW" || p.category === "tracksuits" || p.category === "cropped" || p.category === "caps")
      : products.filter((p) => p.category === active);

  const handleCategory = (id: CategoryId) => {
    setActive(id);
    // Smooth scroll to grid on filter change
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with lifestyle imagery */}
      <section className="pt-24 pb-6 md:pt-32 md:pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="aspect-square overflow-hidden rounded-sm"
            >
              <img src={lifestyleColorways} alt="Capital Mota AK47 Collection" className="w-full h-full object-cover" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="aspect-square overflow-hidden rounded-sm"
            >
              <img src={lifestyleGlobe} alt="Capital Mota Globe Collection" className="w-full h-full object-cover" />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center"
          >
            <h1 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
              SHOP
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2 tracking-widest uppercase">
              Heavyweight Premium Streetwear
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category pills — sticky */}
      <section className="sticky top-[61px] z-40 bg-background/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto py-3 scrollbar-none md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.id)}
                className={`font-display text-xs md:text-sm tracking-wider px-4 py-2 whitespace-nowrap transition-all duration-300 rounded-sm ${
                  active === cat.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section ref={gridRef} className="py-10 md:py-16">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Count */}
              <p className="font-body text-xs text-muted-foreground mb-6 tracking-wider uppercase">
                {filtered.length} {filtered.length === 1 ? "item" : "items"}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filtered.map((product, i) => (
                  <ProductCard
                    key={`${active}-${product.name}`}
                    image={product.image}
                    name={product.name}
                    price={product.price}
                    tag={product.tag}
                    index={i}
                    stripePriceId={product.stripePriceId}
                    sizes={(product as any).sizes}
                    colorways={(product as any).colorways}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;
