import { motion } from "framer-motion";
import catalogLifestyle from "@/assets/catalog-mota-lifestyle.png";
import catalogFullLineup from "@/assets/catalog-full-lineup.png";
import catalogAk47 from "@/assets/catalog-ak47-collection.png";
import catalogTactical from "@/assets/catalog-tactical-luxury.png";
import catalogPremium from "@/assets/catalog-premium-streetwear.png";
import catalogRacing from "@/assets/catalog-racing-athletic.png";

const galleryImages = [
  { src: catalogFullLineup, alt: "Capital Mota — Full Lineup", label: "FULL LINEUP" },
  { src: catalogLifestyle, alt: "Capital Mota — Lifestyle", label: "LIFESTYLE" },
  { src: catalogAk47, alt: "Capital Mota — AK47 Collection", label: "AK47 COLLECTION" },
  { src: catalogTactical, alt: "Capital Mota — Tactical & Luxury", label: "TACTICAL × LUXURY" },
  { src: catalogPremium, alt: "Capital Mota — Premium Streetwear", label: "PREMIUM STREETWEAR" },
  { src: catalogRacing, alt: "Capital Mota — Racing & Athletic", label: "RACING × ATHLETIC" },
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
            THE LOOKBOOK
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {galleryImages.map((img, i) => (
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
                <p className="font-display text-lg md:text-xl tracking-wider text-foreground">
                  {img.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LookbookGallery;
