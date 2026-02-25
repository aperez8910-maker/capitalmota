import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import teeWhite from "@/assets/tee-white-vertical.png";
import teeNavy from "@/assets/tee-navy-box.png";
import teeGold from "@/assets/tee-gold-banner.png";
import teeArch from "@/assets/tee-arch-design.png";
import teeRed from "@/assets/tee-red-capital.png";
import teePink from "@/assets/tee-pink-kids.png";
import mockupBlack from "@/assets/mockup-black-box.jpg";
import mockupGreen from "@/assets/mockup-green-gold.jpg";
import mockupGray from "@/assets/mockup-gray-red.jpg";

const products = [
  { image: teeWhite, name: "WHITE VERTICAL BOX LOGO", price: "$55.00", tag: "CLASSIC" },
  { image: teeNavy, name: "NAVY BOX LOGO CREW", price: "$55.00", tag: "OG" },
  { image: teeGold, name: "GOLD BANNER EDITION", price: "$60.00", tag: "420" },
  { image: teeArch, name: "AUSTIN ARCH TEE", price: "$55.00" },
  { image: teeRed, name: "RED CAPITAL TEE", price: "$55.00", tag: "NEW" },
  { image: teePink, name: "PINK KIDS EDITION", price: "$35.00" },
  { image: mockupBlack, name: "CAPITOL DOME TEE — BLACK", price: "$55.00", tag: "CONCEPT" },
  { image: mockupGreen, name: "FOREST GREEN AUSTIN TEE", price: "$60.00", tag: "CONCEPT" },
  { image: mockupGray, name: "CHARCOAL SPLIT TEE", price: "$55.00", tag: "CONCEPT" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
