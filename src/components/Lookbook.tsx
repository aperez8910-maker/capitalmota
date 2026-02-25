import { motion } from "framer-motion";
import lookbookGray from "@/assets/lookbook-gray.png";
import lookbookFamily from "@/assets/lookbook-family.png";
import lookbookConfetti from "@/assets/lookbook-confetti.png";

const images = [
  { src: lookbookGray, alt: "Capital Mota gray box logo tee", span: "md:col-span-2 md:row-span-2" },
  { src: lookbookFamily, alt: "Capital Mota family lifestyle", span: "" },
  { src: lookbookConfetti, alt: "Capital Mota confetti box logo", span: "" },
];

const Lookbook = () => {
  return (
    <section className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Worn By The Culture
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            LOOKBOOK
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.alt}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`overflow-hidden ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Lookbook;
