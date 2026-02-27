import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const scrollLinks = [
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Culture", href: isHome ? "#culture" : "/#culture" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Capital Mota" className="h-10 object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/shop"
            className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
          >
            Shop
          </Link>
          {scrollLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-sm uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/shop"
            className="font-display text-lg tracking-wider px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            SHOP NOW
          </Link>
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
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
              >
                Shop
              </Link>
              {scrollLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-2xl tracking-widest text-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="font-display text-xl tracking-wider px-8 py-3 bg-primary text-primary-foreground"
              >
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
