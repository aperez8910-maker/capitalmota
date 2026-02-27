import { motion } from "framer-motion";
import { Package, Clock, MapPin, ShieldCheck } from "lucide-react";

const shippingZones = [
  { region: "Texas (Local)", transit: "2–4 days", total: "7–11 days" },
  { region: "Continental US", transit: "4–7 days", total: "9–14 days" },
  { region: "Alaska / Hawaii", transit: "7–12 days", total: "12–19 days" },
  { region: "Canada / Mexico", transit: "8–14 days", total: "13–21 days" },
  { region: "Europe / UK", transit: "10–18 days", total: "15–25 days" },
  { region: "Asia / Pacific", transit: "12–21 days", total: "17–28 days" },
  { region: "Rest of World", transit: "14–28 days", total: "19–35 days" },
];

const processSteps = [
  {
    icon: Package,
    title: "CUSTOM CREATION",
    time: "2–3 business days",
    desc: "Each piece is printed to order on Pro Club heavyweight blanks.",
  },
  {
    icon: ShieldCheck,
    title: "QUALITY CONTROL",
    time: "1–2 business days",
    desc: "Every tee is inspected for print accuracy, fabric integrity, and finishing.",
  },
  {
    icon: MapPin,
    title: "SHIPS FROM AUSTIN, TX",
    time: "Varies by destination",
    desc: "Packaged and shipped from our Austin headquarters via USPS / UPS.",
  },
];

const ShippingInfo = () => {
  return (
    <section className="py-24 md:py-32 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm uppercase tracking-[0.3em] text-primary mb-3">
            Made to Order
          </p>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground">
            SHIPPING
          </h2>
          <div className="w-16 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Custom notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded px-4 py-2 mb-6">
            <Clock className="w-4 h-4 text-accent" />
            <span className="font-body text-sm text-accent tracking-wider uppercase">
              Please allow 5–7 business days before shipment
            </span>
          </div>
          <p className="font-body text-muted-foreground leading-relaxed">
            Every Capital Mota piece is custom-made to order. We don't mass-produce — each tee is
            printed, inspected, and shipped from Austin, Texas. Shipping times below include
            production + transit.
          </p>
        </motion.div>

        {/* Process steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {processSteps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="text-center p-8 border border-border bg-background"
            >
              <step.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg tracking-wider text-foreground mb-1">
                {step.title}
              </h3>
              <p className="font-display text-sm tracking-wider text-accent mb-3">{step.time}</p>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Shipping zones table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-display text-2xl tracking-wider text-foreground text-center mb-8">
            ESTIMATED DELIVERY TIMES
          </h3>
          <div className="border border-border overflow-hidden">
            <div className="grid grid-cols-3 bg-primary/10 border-b border-border px-4 py-3">
              <span className="font-display text-xs tracking-wider text-primary">DESTINATION</span>
              <span className="font-display text-xs tracking-wider text-primary text-center">TRANSIT</span>
              <span className="font-display text-xs tracking-wider text-primary text-right">TOTAL EST.</span>
            </div>
            {shippingZones.map((zone, i) => (
              <div
                key={zone.region}
                className={`grid grid-cols-3 px-4 py-3 ${
                  i < shippingZones.length - 1 ? "border-b border-border" : ""
                } ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
              >
                <span className="font-body text-sm text-foreground">{zone.region}</span>
                <span className="font-body text-sm text-muted-foreground text-center">
                  {zone.transit}
                </span>
                <span className="font-display text-sm tracking-wider text-accent text-right">
                  {zone.total}
                </span>
              </div>
            ))}
          </div>
          <p className="font-body text-xs text-muted-foreground mt-4 text-center">
            * Total estimated time = production (5–7 days) + shipping transit. International orders
            may be subject to customs delays.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ShippingInfo;
