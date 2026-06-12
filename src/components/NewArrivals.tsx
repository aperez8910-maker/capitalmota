import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import tracksuitTrioCaps from "@/assets/tracksuit-trio-caps.jpg";
import croppedTracksuitFull from "@/assets/cropped-tracksuit-full.jpg";
import ak47HoodieYellowCamo from "@/assets/ak47-hoodie-yellow-camo.jpg";
import teeAk47TanMockup from "@/assets/tee-ak47-tan-mockup.png";

const items = [
  { image: tracksuitTrioCaps,    name: "Capital Mota Tracksuit", price: "$145" },
  { image: croppedTracksuitFull, name: "Cropped Tracksuit — HER", price: "$135" },
  { image: ak47HoodieYellowCamo, name: "AK47 Hoodie Set",         price: "$95"  },
  { image: teeAk47TanMockup,     name: "AK47 Tee",                price: "$55"  },
];

const NewArrivals = () => {
  return (
    <section className="py-16 md:py-24 border-t border-border/40">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <p className="font-body text-xs uppercase tracking-[0.3em] text-primary mb-2">
              Just Landed
            </p>
            <h2 className="font-display text-3xl md:text-5xl tracking-wider text-foreground">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-block font-display text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            VIEW ALL →
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              <Link to="/shop" className="group block">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-display text-sm md:text-base tracking-wider text-foreground mt-3 leading-tight">
                  {item.name}
                </h3>
                <p className="font-body text-xs md:text-sm text-muted-foreground mt-0.5">
                  {item.price}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="md:hidden mt-8 text-center">
          <Link
            to="/shop"
            className="inline-block font-display text-sm tracking-wider text-muted-foreground hover:text-foreground"
          >
            VIEW ALL →
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;