import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
              The Brand
            </p>
            <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-8">
              ROOTED IN
              <br />
              <span className="text-gradient-gold">AUSTIN</span>
            </h2>
            <div className="space-y-6 font-body text-muted-foreground font-light leading-relaxed">
              <p>
                Capital Mota Clothing is more than apparel — it's a movement. Born in
                Austin, Texas, our heavyweight crew necks are built for those who live
                the culture unapologetically.
              </p>
              <p>
                Every piece features custom labels, bespoke detailing, and the kind
                of quality that turns heads on 6th Street and beyond. We don't follow
                trends — we set them.
              </p>
              <p>
                This is streetwear for the discerning cannabis enthusiast. Crafted
                with intention, worn with pride.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-muted p-8 flex flex-col items-center justify-center aspect-square">
                  <span className="font-display text-5xl text-gradient-gold">420</span>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Culture</span>
                </div>
                <div className="bg-muted p-8 flex flex-col items-center justify-center">
                  <span className="font-display text-5xl text-primary">ATX</span>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Austin, TX</span>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-muted p-8 flex flex-col items-center justify-center">
                  <span className="font-display text-5xl text-foreground">HW</span>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Heavyweight</span>
                </div>
                <div className="bg-muted p-8 flex flex-col items-center justify-center aspect-square">
                  <span className="font-display text-5xl text-accent">CM</span>
                  <span className="font-body text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">Capital Mota</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
