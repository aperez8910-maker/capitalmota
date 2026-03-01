import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCart } from "@/hooks/use-cart";
import originalLogo from "@/assets/logo.jpeg";
import logo from "@/assets/brand-logo.png";
import seal from "@/assets/brand-seal.jpeg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { itemCount, setIsOpen: setCartOpen } = useCart();

  const scrollLinks = [
    { label: "About", href: isHome ? "#about" : "/#about" },
    { label: "Culture", href: isHome ? "#culture" : "/#culture" },
    { label: "Contact", href: isHome ? "#contact" : "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src={originalLogo} alt="Capital Mota" className="h-12 md:h-14 object-contain" />
          <img src={logo} alt="Capital Mota Austin" className="h-12 md:h-14 object-contain" />
          <div className="h-12 md:h-14 w-12 md:w-14 rounded-full overflow-hidden border border-foreground/20 flex-shrink-0">
            <img src={seal} alt="United Mota Mob" className="h-full w-full object-cover scale-110" />
          </div>
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
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-foreground hover:text-primary transition-colors"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground font-display text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="relative text-foreground"
          >
            <ShoppingBag size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground font-display text-xs flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
