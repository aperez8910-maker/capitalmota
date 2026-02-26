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
      </div>
    </section>
  );
};

export default Collection;
