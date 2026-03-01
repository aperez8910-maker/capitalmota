import { Link } from "react-router-dom";
import logo from "@/assets/brand-logo.png";

const Footer = () => {
  return (
    <footer id="contact" className="bg-card border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={logo} alt="Capital Mota" className="h-10 object-contain mb-6" />
            <p className="font-body text-sm text-muted-foreground font-light leading-relaxed">
              Heavyweight streetwear rooted in Austin, Texas. Built for the 420 culture.
            </p>
          </div>

          <div>
            <h4 className="font-display text-xl tracking-wider text-foreground mb-4">NAVIGATE</h4>
            <div className="space-y-3">
              <Link to="/shop" className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                Shop
              </Link>
              {["About", "Culture", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`/#${link.toLowerCase()}`}
                  className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-xl tracking-wider text-foreground mb-4">CONNECT</h4>
            <div className="space-y-3">
              {["Instagram", "Twitter / X", "TikTok"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="block font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © {new Date().getFullYear()} CAPITAL MOTA CLOTHING. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
