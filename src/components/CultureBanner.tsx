import { motion } from "framer-motion";
import originalLogo from "@/assets/logo.jpeg";
import brandLogo from "@/assets/brand-logo.png";
import seal from "@/assets/brand-seal.jpeg";

const CultureBanner = () => {
  return (
    <section id="culture" className="py-20 overflow-hidden border-y border-border">
      <motion.div
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        className="flex items-center gap-8 whitespace-nowrap"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={i} className="flex items-center gap-6 font-display text-6xl md:text-8xl tracking-wider text-muted-foreground/20">
            <img src={originalLogo} alt="" className="h-12 md:h-16 object-contain inline-block opacity-40" />
            CAPITAL MOTA <span className="text-primary/30">✦</span>
            <img src={seal} alt="" className="h-12 md:h-16 object-contain inline-block rounded-full opacity-40" />
            420 CULTURE <span className="text-accent/30">✦</span> AUSTIN TX <span className="text-primary/30">✦</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default CultureBanner;
