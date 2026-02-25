import { motion } from "framer-motion";

const CultureBanner = () => {
  return (
    <section id="culture" className="py-20 overflow-hidden border-y border-border">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="font-display text-6xl md:text-8xl tracking-wider text-muted-foreground/20">
            CAPITAL MOTA <span className="text-primary/30">✦</span> 420 CULTURE <span className="text-accent/30">✦</span> AUSTIN TX <span className="text-primary/30">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default CultureBanner;
