import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "SIZING",
    items: [
      {
        q: "What fit do your tees have?",
        a: "All our tees are Pro Club heavyweight blanks — they run boxy and oversized. If you prefer a fitted look, we recommend sizing down one size.",
      },
      {
        q: "Do you have a size chart?",
        a: "Yes! Our Pro Club heavyweight tees are available in S–5XL. S: 18\"W × 28\"L | M: 20\" × 29\" | L: 22\" × 30\" | XL: 24\" × 31\" | 2XL: 26\" × 32\" | 3XL: 28\" × 33\" | 4XL: 30\" × 34\" | 5XL: 32\" × 35\". Measurements are approximate.",
      },
      {
        q: "Do the shirts shrink after washing?",
        a: "Pro Club heavyweight cotton may shrink slightly (about 3–5%) after the first wash. We recommend washing cold and hang drying to preserve the fit.",
      },
    ],
  },
  {
    category: "RETURNS & EXCHANGES",
    items: [
      {
        q: "What is your return policy?",
        a: "Because every piece is custom printed to order, we cannot accept returns or exchanges for change of mind. If your item arrives damaged or with a print defect, contact us within 7 days of delivery and we'll make it right.",
      },
      {
        q: "My order arrived damaged — what do I do?",
        a: "Email us at support@capitalmota.com with your order number and photos of the damage. We'll send a replacement at no extra cost.",
      },
      {
        q: "Can I cancel my order?",
        a: "Orders can be cancelled within 12 hours of placement. After that, production has likely begun and we cannot cancel. Reach out ASAP if you need to make changes.",
      },
    ],
  },
  {
    category: "CARE INSTRUCTIONS",
    items: [
      {
        q: "How should I wash my tee?",
        a: "Turn inside out before washing. Machine wash cold with like colors on a gentle cycle. Do not bleach. This protects the print and keeps colors vibrant.",
      },
      {
        q: "Can I put it in the dryer?",
        a: "We recommend hang drying or tumble dry on low heat. High heat can cause shrinkage and may crack the print over time.",
      },
      {
        q: "How do I keep the print looking fresh?",
        a: "Always wash inside out, avoid ironing directly on the print, and skip the fabric softener — it can break down the print adhesion over time.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Got Questions?
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            FAQ
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          {faqs.map((section, si) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: si * 0.1, duration: 0.6 }}
            >
              <h3 className="font-display text-xl tracking-wider text-accent mb-4 border-b border-border pb-3">
                {section.category}
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                {section.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${section.category}-${i}`}
                    className="border border-border bg-card px-5"
                  >
                    <AccordionTrigger className="font-display text-sm tracking-wider text-foreground hover:text-primary hover:no-underline py-4">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
