import { motion } from "framer-motion";
import { Flame, Leaf, MapPin, Music, Users, Zap } from "lucide-react";
import lookbookGray from "@/assets/lookbook-gray.png";
import mockupBlackBox from "@/assets/mockup-black-box.jpg";
import mockupGreenGold from "@/assets/mockup-green-gold.jpg";

const timeline = [
  {
    year: "2021",
    title: "THE SEED",
    desc: "Born out of Austin's underground scene — a crew of creatives who wanted streetwear that spoke to the 420 lifestyle without compromise.",
  },
  {
    year: "2022",
    title: "FIRST DROP",
    desc: "Debuted the box logo on Pro Club heavyweight blanks. Sold out locally through pop-ups at South Congress and East 6th street shops.",
  },
  {
    year: "2023",
    title: "THE MOVEMENT",
    desc: "Expanded to six colorways, launched custom labels and sticker packs. Capital Mota became a fixture at Austin smoke sessions and car meets.",
  },
  {
    year: "2024",
    title: "GOING GLOBAL",
    desc: "Shipping worldwide. New designs, kids editions, and collaborations with local Austin artists pushing the brand further.",
  },
];

const pillars = [
  {
    icon: Leaf,
    title: "420 CULTURE",
    desc: "We celebrate cannabis culture openly and unapologetically. Every piece is designed for the session.",
  },
  {
    icon: MapPin,
    title: "AUSTIN ROOTS",
    desc: "South Congress to East Riverside — our designs are stamped with the energy of Austin's creative underground.",
  },
  {
    icon: Users,
    title: "COMMUNITY FIRST",
    desc: "Pop-ups, smoke sessions, and car meets. We build in person, not just online.",
  },
  {
    icon: Zap,
    title: "HEAVYWEIGHT QUALITY",
    desc: "Pro Club blanks, California-made. Boxy, oversized, and built to last through every wash.",
  },
];

const lifestyleImages = [
  { src: mockupBlackBox, alt: "Capital Mota black box tee", caption: "THE ESSENTIALS" },
  { src: lookbookGray, alt: "Capital Mota lifestyle", caption: "EVERYDAY HEAVYWEIGHT" },
  { src: mockupGreenGold, alt: "Capital Mota green gold tee", caption: "FOR THE CULTURE" },
];

const Culture = () => {
  return (
    <section id="culture" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            More Than Clothing
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            THE CULTURE
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Culture Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 border border-border bg-card hover:border-primary/40 transition-colors duration-500"
            >
              <pillar.icon className="w-8 h-8 text-primary mb-5 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-lg tracking-wider text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* History Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            Our Journey
          </p>
          <h3 className="font-display text-4xl md:text-5xl tracking-wider text-foreground">
            HISTORY
          </h3>
        </motion.div>

        <div className="max-w-3xl mx-auto mb-32">
          <div className="relative border-l-2 border-primary/30 ml-4 md:ml-0 md:mx-auto">
            {timeline.map((event, i) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="relative pl-10 pb-12 last:pb-0"
              >
                <div className="absolute left-[-9px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                <span className="font-display text-sm tracking-wider text-primary">{event.year}</span>
                <h4 className="font-display text-2xl tracking-wider text-foreground mt-1 mb-2">
                  {event.title}
                </h4>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {event.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Lifestyle Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            How We Live
          </p>
          <h3 className="font-display text-4xl md:text-5xl tracking-wider text-foreground">
            LIFESTYLE
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lifestyleImages.map((img, i) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative overflow-hidden aspect-[3/4]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-lg tracking-wider text-foreground drop-shadow-lg">
                  {img.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Icons / Influences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 text-center"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-accent mb-3">
            What Inspires Us
          </p>
          <h3 className="font-display text-4xl md:text-5xl tracking-wider text-foreground mb-12">
            ICONS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Leaf, label: "CANNABIS CULTURE" },
              { icon: Music, label: "HIP-HOP & FUNK" },
              { icon: Flame, label: "LOWRIDER SCENE" },
              { icon: MapPin, label: "SOUTH CONGRESS" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center gap-3 p-6 border border-border bg-card"
              >
                <item.icon className="w-10 h-10 text-accent" />
                <span className="font-display text-xs tracking-wider text-muted-foreground">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Culture;
