import { motion } from "framer-motion";
import originalLogo from "@/assets/logo.jpeg";
import brandLogo from "@/assets/brand-logo.png";
import seal from "@/assets/brand-seal.jpeg";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const sections = [
  {
    numeral: "I",
    title: "The Origin",
    paragraphs: [
      "Capital Mota was not created in a boardroom.",
      "It was born in motion.",
      "Austin, 2023.\n12th and Leona.\nAn open-air market operating in a legal gray zone where culture moved faster than legislation.",
      "The operation already existed.\nThe product was already moving.\nThe discipline was already there.",
      "What didn't exist was a flag.",
      "Then the city itself spoke.",
      "A Capital Metro bus rolled past.\nInfrastructure. Movement. Authority.",
      "The name flipped.",
      "Capital Mota.",
      "Not manufactured.\nRecognized.",
    ],
  },
  {
    numeral: "II",
    title: "What It Stands For",
    paragraphs: [
      "Capital Mota represents:",
    ],
    list: [
      "Ownership of space",
      "Discipline under pressure",
      "Culture without apology",
      "Movement without permission",
    ],
    after: [
      '"Capital" is not about money alone.\nIt is about command. Headquarters energy. The seat of power.',
      '"Mota" is culture. It is coded. It signals tribe without explanation.',
      "Together, it means:",
      "Control your lane. Build your empire. Move in silence.",
    ],
  },
  {
    numeral: "III",
    title: "We Do Not Beg for Legitimacy",
    paragraphs: [
      "The brand was born in a gray market environment.\nThat matters.",
      "It was built where:",
    ],
    list: [
      "Risk required intelligence",
      "Presentation mattered",
      "Reputation was currency",
    ],
    after: [
      "Capital Mota understands something most brands never will:",
      "Legitimacy is not granted.\nIt is built through consistency.",
    ],
  },
  {
    numeral: "IV",
    title: "This Is Not Merch",
    paragraphs: [
      "Capital Mota is not graphic tees.",
      "It is a uniform.",
      "A uniform for:",
    ],
    list: [
      "The judged",
      "The underestimated",
      "The disciplined",
      "The ones who operate quietly",
    ],
    after: [
      "Every piece must feel structured. Intentional. Clean.\nNo sloppy execution. No cheap blanks. No random drops.",
      "Standards are not optional.",
    ],
  },
  {
    numeral: "V",
    title: "The Code",
    paragraphs: [
      "Move smart.\nStay consistent.\nProtect your name.\nBuild before you broadcast.\nNever confuse noise with power.",
      "Capital Mota does not chase trends.\nIt sets tone through restraint.",
    ],
  },
  {
    numeral: "VI",
    title: "Evolution",
    paragraphs: [
      "The cannabis roots are part of the story.\nThey are not the ceiling.",
      "Capital Mota evolves beyond product.",
      "It becomes:",
    ],
    list: [
      "A culture label",
      "A discipline-first identity",
      "A symbol for those who operate under pressure",
    ],
    after: [
      "The name came from infrastructure.\nThe brand must now become infrastructure.",
      "Stable. Recognizable. Trusted.",
    ],
  },
  {
    numeral: "VII",
    title: "The Standard",
    paragraphs: [
      "Every drop must answer three questions:",
    ],
    list: [
      "Is it clean?",
      "Is it intentional?",
      "Does it feel like authority?",
    ],
    after: [
      "If the answer is no, it does not release.",
      "Capital Mota does not flood the market.",
      "It establishes presence.",
    ],
  },
  {
    numeral: "VIII",
    title: "The Future",
    paragraphs: [
      "Capital Mota will not be loud.",
      "It will be consistent.",
      "It will build:",
    ],
    list: [
      "Limited runs",
      "Signature pieces",
      "Recognizable marks",
      "Structured releases",
    ],
    after: [
      "It will be worn by people who understand movement before recognition.",
    ],
  },
];

const BrandManifesto = () => {
  return (
    <section className="py-24 md:py-32 bg-card/50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center mb-20">
          <div className="flex items-center justify-center gap-5 mb-10">
            <img src={originalLogo} alt="Capital Mota" className="h-14 md:h-20 object-contain" />
            <img src={brandLogo} alt="Capital Mota Austin" className="h-14 md:h-20 object-contain" />
            <div className="h-14 md:h-20 w-14 md:w-20 rounded-full overflow-hidden border border-foreground/20 flex-shrink-0">
              <img src={seal} alt="United Mota Mob" className="h-full w-full object-contain" />
            </div>
          </div>
          <h2 className="font-display text-5xl md:text-7xl tracking-wider text-foreground mb-4">
            CAPITAL MOTA
          </h2>
          <div className="w-16 h-px bg-accent mx-auto my-6" />
          <p className="font-display text-2xl md:text-3xl tracking-[0.2em] text-primary uppercase">
            Brand Manifesto
          </p>
        </motion.div>

        {/* Manifesto Sections */}
        <div className="max-w-2xl mx-auto space-y-20">
          {sections.map((section, i) => (
            <motion.div
              key={section.numeral}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.7 }}
            >
              {/* Section Title */}
              <div className="mb-8">
                <span className="font-display text-sm tracking-[0.3em] text-primary">
                  {section.numeral}.
                </span>
                <h3 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mt-2">
                  {section.title}
                </h3>
                <div className="w-10 h-px bg-primary/40 mt-4" />
              </div>

              {/* Paragraphs */}
              <div className="space-y-5">
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line"
                  >
                    {p}
                  </p>
                ))}
              </div>

              {/* Bullet List */}
              {section.list && (
                <ul className="my-6 space-y-2 pl-6">
                  {section.list.map((item, k) => (
                    <li
                      key={k}
                      className="font-body text-base text-foreground/80 leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-primary mt-1.5 text-xs">◆</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* After paragraphs */}
              {section.after && (
                <div className="space-y-5 mt-5">
                  {section.after.map((p, j) => (
                    <p
                      key={j}
                      className="font-body text-base text-muted-foreground leading-relaxed whitespace-pre-line"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {/* Final Declaration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="pt-10 border-t border-primary/30"
          >
            <h3 className="font-display text-3xl md:text-4xl tracking-wider text-foreground mb-8">
              Final Declaration
            </h3>
            <div className="space-y-5">
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Capital Mota was born from a moment of clarity in a city that moves fast.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                It represents power without permission.{"\n"}
                Culture without apology.{"\n"}
                Discipline without announcement.
              </p>
              <p className="font-body text-lg text-foreground leading-relaxed font-medium whitespace-pre-line">
                It is not hype.
              </p>
              <p className="font-body text-lg text-foreground leading-relaxed font-medium">
                It is structure.
              </p>
              <p className="font-body text-base text-primary leading-relaxed italic">
                And structure always outlives noise.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BrandManifesto;
