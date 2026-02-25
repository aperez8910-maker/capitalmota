import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import tee1 from "@/assets/product-tee-1.jpg";
import tee2 from "@/assets/product-tee-2.jpg";
import tee3 from "@/assets/product-tee-3.jpg";

const products = [
  { image: tee1, name: "MIDNIGHT HEAVYWEIGHT TEE", price: "$55.00", tag: "NEW" },
  { image: tee2, name: "OLIVE LEAF CREW NECK", price: "$55.00", tag: "420" },
  { image: tee3, name: "WHITE GOLD EDITION", price: "$60.00" },
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.name} {...product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
