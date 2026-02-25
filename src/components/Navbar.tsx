import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const navLinks = ["Collection", "About", "Culture", "Contact"];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img src={logo} alt="Capital Mota" className="h-10 object-contain" />
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link}
            </a>
          ))}
          <a
            href="#collection"
            className="font-display text-lg tracking-wider px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            SHOP NOW
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-foreground"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navLinks.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
              <a
                href="#collection"
                onClick={() => setIsOpen(false)}
                className="font-display text-xl tracking-wider px-8 py-3 bg-primary text-primary-foreground"
              >
                SHOP NOW
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
