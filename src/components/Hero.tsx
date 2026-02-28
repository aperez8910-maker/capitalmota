import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background video with image fallback */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroBg}
          className="w-full h-full object-cover"
        >
          <source src="/videos/brand-video-3.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 bg-gradient-smoke" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-4"
        >
          Austin, Texas · Est. 420
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-7xl md:text-9xl lg:text-[10rem] leading-none tracking-wider text-foreground"
        >
          CAPITAL
          <br />
          <span className="text-gradient-gold">MOTA</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mt-6 mb-10 font-light"
        >
          Heavyweight streetwear for the culture. Crafted with intention,
          worn with pride.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/shop"
            className="font-display text-xl tracking-wider px-10 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-glow"
          >
            EXPLORE COLLECTION
          </Link>
          <a
            href="#about"
            className="font-display text-xl tracking-wider px-10 py-4 border border-foreground/30 text-foreground hover:border-primary hover:text-primary transition-all"
          >
            OUR STORY
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-primary/0 via-primary to-primary/0" />
      </motion.div>
    </section>
  );
};

export default Hero;
