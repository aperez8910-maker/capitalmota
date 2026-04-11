import { motion } from "framer-motion";
import catalogLifestyle from "@/assets/catalog-mota-lifestyle.png";
import catalogFullLineup from "@/assets/catalog-full-lineup.png";
import catalogAk47 from "@/assets/catalog-ak47-collection.png";
import catalogTactical from "@/assets/catalog-tactical-luxury.png";
import catalogPremium from "@/assets/catalog-premium-streetwear.png";
import catalogRacing from "@/assets/catalog-racing-athletic.png";
import catalogWindbreakerOutdoor from "@/assets/catalog-windbreaker-outdoor.png";
import catalogWindbreakerStudio from "@/assets/catalog-windbreaker-studio.png";
import catalogWindbreakerPastel from "@/assets/catalog-windbreaker-pastel.png";
import catalogWindbreakerPastel2 from "@/assets/catalog-windbreaker-pastel-2.png";
import catalogWindbreakerTrio from "@/assets/catalog-windbreaker-trio.png";

const catalogProducts = [
  { src: catalogLifestyle, alt: "Hoodie Set — Black Gold Collection", label: "HOODIE SET — BLACK GOLD", price: "$85" },
  { src: catalogFullLineup, alt: "Full Catalog — Hoodies, Crews & Windbreakers", label: "FULL CATALOG — ALL CATEGORIES", price: "FROM $55" },
  { src: catalogAk47, alt: "AK47 Set — Hoodie & Tee Colorways", label: "AK47 SET — ALL COLORWAYS", price: "FROM $55" },
  { src: catalogTactical, alt: "Racing Jacket — Tactical & Luxury", label: "RACING JACKET — TACTICAL × LUXURY", price: "$85" },
  { src: catalogPremium, alt: "Premium Set — Streetwear Collection", label: "PREMIUM SET — STREETWEAR", price: "$75" },
  { src: catalogRacing, alt: "Varsity Jacket — Racing & Athletic", label: "VARSITY JACKET — RACING × ATHLETIC", price: "$85" },
  { src: catalogWindbreakerOutdoor, alt: "Windbreaker Set — Blue Orange White", label: "WINDBREAKER SET — BLUE × ORANGE × WHITE", price: "$85" },
  { src: catalogWindbreakerStudio, alt: "Windbreaker Set — Sage Pink Gold", label: "WINDBREAKER SET — SAGE × PINK × GOLD", price: "$85" },
  { src: catalogWindbreakerPastel, alt: "Windbreaker Set — Pastel Collection", label: "WINDBREAKER SET — PASTEL", price: "$85" },
  { src: catalogWindbreakerPastel2, alt: "Windbreaker Set — Pastel Colorways", label: "WINDBREAKER SET — PASTEL COLORWAYS", price: "$85" },
  { src: catalogWindbreakerTrio, alt: "Windbreaker Set — Sage Pink Gold Studio", label: "WINDBREAKER SET — STUDIO TRIO", price: "$85" },
];

const LookbookGallery = () => {
  return (
    <section id="lookbook-gallery" className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Built in Austin • Worn Worldwide
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            THE CATALOG
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {catalogProducts.map((img, i) => (
            <motion.div
              key={img.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                <div className="flex items-end justify-between">
                  <p className="font-display text-lg md:text-xl tracking-wider text-foreground">
                    {img.label}
                  </p>
                  <span className="font-display text-lg tracking-wider text-primary">
                    {img.price}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookbookGallery;
