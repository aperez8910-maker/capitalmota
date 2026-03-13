import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
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
import fwA47Hoodie from "@/assets/fw-a47-hoodie-crewneck.jpeg";
import fwNavyTee from "@/assets/fw-navy-box-logo-tee.jpeg";
import fwBlackTeal from "@/assets/fw-black-teal-tee.png";
import fwRoyalBlue from "@/assets/fw-royal-blue-collection.png";
import fwBlueBox from "@/assets/fw-blue-box-logo-tee.png";
import fwBlueLifestyle from "@/assets/fw-blue-lifestyle.png";
import fwGrayMinimal from "@/assets/fw-gray-minimal-set.png";
import fwLuxuryCrewneck from "@/assets/fw-luxury-crewneck.jpeg";
import ak47HoodieTrio from "@/assets/ak47-hoodie-trio.png";
import ak47GoldHoodie from "@/assets/ak47-gold-hoodie.png";
import womensPastel from "@/assets/womens-pastel-collection.png";
import windbreakerGPG from "@/assets/windbreaker-trio-green-pink-gold.png";
import windbreakerBOW from "@/assets/windbreaker-trio-blue-orange-white.png";
import windbreakerPPT from "@/assets/windbreaker-trio-purple-pink-teal.png";
import windbreakerNight from "@/assets/windbreaker-night-blue-orange-white.jpeg";
import cwWhiteBack from "@/assets/colorway-white-back.jpg";
import cwGreenBack from "@/assets/colorway-green-back.jpg";
import cwBlackBack from "@/assets/colorway-black-back.jpg";
import cwGrayBack from "@/assets/colorway-gray-back.jpg";
import cwBurgundyBack from "@/assets/colorway-burgundy-back.jpg";
import cwTanBack from "@/assets/colorway-tan-back.jpg";

const currentProducts = [
  { image: teeWhite, name: "WHITE VERTICAL BOX LOGO", price: "$55.00", tag: "CLASSIC" },
  { image: teeNavy, name: "NAVY BOX LOGO CREW", price: "$55.00", tag: "OG" },
  { image: teeGold, name: "GOLD BANNER EDITION", price: "$60.00", tag: "420" },
  { image: teeArch, name: "AUSTIN ARCH TEE", price: "$55.00" },
  { image: teeRed, name: "RED CAPITAL TEE", price: "$55.00", tag: "NEW" },
  { image: teePink, name: "PINK KIDS EDITION", price: "$35.00" },
];

const colorways = [
  { image: cwWhite, name: "WHITE BOX LOGO", price: "$55.00", tag: "COLORWAY" },
  { image: cwGreen, name: "FOREST GREEN", price: "$55.00", tag: "COLORWAY" },
  { image: cwBlack, name: "BLACK BOX LOGO", price: "$55.00", tag: "COLORWAY" },
  { image: cwGray, name: "HEATHER GRAY", price: "$55.00", tag: "COLORWAY" },
  { image: cwBurgundy, name: "BURGUNDY", price: "$55.00", tag: "COLORWAY" },
  { image: cwTan, name: "SAND / TAN", price: "$55.00", tag: "COLORWAY" },
];

const Collection = () => {
  return (
    <section id="collection" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Heavyweight Collection
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            THE DROP
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 mb-32">
          {currentProducts.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>

        {/* Promo video banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="my-20 relative overflow-hidden aspect-[21/9]"
        >
          <video autoPlay muted loop playsInline className="w-full h-full object-cover">
            <source src="/videos/promo-clip.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/30" />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="font-display text-4xl md:text-6xl tracking-wider text-foreground drop-shadow-lg">
              WEAR THE CULTURE
            </p>
          </div>
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            New Colorways
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            COMING SOON
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {colorways.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-32"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Back View
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            THE DETAILS
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {[
            { image: cwWhiteBack, name: "WHITE — BACK", price: "$55.00", tag: "BACK" },
            { image: cwGreenBack, name: "FOREST GREEN — BACK", price: "$55.00", tag: "BACK" },
            { image: cwBlackBack, name: "BLACK — BACK", price: "$55.00", tag: "BACK" },
            { image: cwGrayBack, name: "HEATHER GRAY — BACK", price: "$55.00", tag: "BACK" },
            { image: cwBurgundyBack, name: "BURGUNDY — BACK", price: "$55.00", tag: "BACK" },
            { image: cwTanBack, name: "SAND / TAN — BACK", price: "$55.00", tag: "BACK" },
          ].map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>

        {/* F/W Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-32"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Fall / Winter
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            F/W COLLECTION
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {[
            { image: fwA47Hoodie, name: "A47 HOODIE + CREWNECK", price: "$85.00", tag: "HOODIE" },
            { image: fwNavyTee, name: "NAVY BOX LOGO TEE", price: "$55.00", tag: "OG" },
            { image: fwBlackTeal, name: "BLACK TEAL BOX LOGO TEE", price: "$55.00", tag: "NEW" },
            { image: fwRoyalBlue, name: "ROYAL BLUE COLLECTION", price: "$55.00", tag: "S/S" },
            { image: fwBlueBox, name: "BLUE BOX LOGO TEE", price: "$55.00", tag: "CLASSIC" },
            { image: fwBlueLifestyle, name: "BLUE LIFESTYLE SET", price: "$55.00", tag: "UNISEX" },
            { image: fwGrayMinimal, name: "GRAY MINIMAL SET", price: "$75.00", tag: "F/W" },
            { image: fwLuxuryCrewneck, name: "LUXURY STREET CREWNECK", price: "$75.00", tag: "F/W" },
          ].map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>

        {/* Women's Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-32"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Women's Line
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            HER COLLECTION
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {[
            { image: womensPastel, name: "PASTEL ESSENTIALS SET", price: "$75.00", tag: "WOMEN'S" },
            { image: windbreakerGPG, name: "WINDBREAKER SET — GREEN / PINK / GOLD", price: "$95.00", tag: "WOMEN'S" },
            { image: windbreakerBOW, name: "WINDBREAKER SET — BLUE / ORANGE / WHITE", price: "$95.00", tag: "WOMEN'S" },
            { image: windbreakerPPT, name: "WINDBREAKER SET — PURPLE / PINK / TEAL", price: "$95.00", tag: "WOMEN'S" },
            { image: windbreakerNight, name: "NIGHT CITY WINDBREAKER SET", price: "$95.00", tag: "WOMEN'S" },
          ].map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>

        {/* AK47 Hoodie Collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 mt-32"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Heavyweight Hoodies
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            AK47 HOODIE SETS
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {[
            { image: ak47HoodieTrio, name: "AK47 HOODIE SET — ALL COLORWAYS", price: "$85.00", tag: "HOODIE" },
            { image: ak47GoldHoodie, name: "AK47 BLACK & GOLD HOODIE", price: "$85.00", tag: "HOODIE" },
          ].map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
