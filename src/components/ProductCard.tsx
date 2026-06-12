import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";
import SizeGuideModal from "./SizeGuideModal";

export interface Colorway {
  label: string;
  image: string;
  stripePriceId: string;
  name: string;
}

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  tag?: string;
  index: number;
  stripePriceId?: string;
  sizes?: string[];
  colorways?: Colorway[];
  stock?: number;
}

const defaultSizes = ["S", "M", "L", "XL", "2XL"];

const ProductCard = ({ image, name, price, tag, index, stripePriceId, sizes = defaultSizes, colorways, stock }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const [activeColor, setActiveColor] = useState(0);
  const { addItem } = useCart();

  const soldOut = typeof stock === "number" && stock <= 0;
  const lowStock = typeof stock === "number" && stock > 0 && stock <= 5;

  const current = colorways && colorways.length > 0 ? colorways[activeColor] : null;
  const activeImage = current?.image ?? image;
  const activeName = current?.name ?? name;
  const activePriceId = current?.stripePriceId ?? stripePriceId;

  const numericPrice = parseFloat(price.replace("$", ""));

  const handleAddToCart = () => {
    if (!selectedSize || soldOut) return;
    addItem({
      name: activeName,
      price: numericPrice,
      image: activeImage,
      size: selectedSize,
      quantity: 1,
      stripePriceId: activePriceId,
    });
    setSelectedSize(null);
    setShowSizes(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden bg-muted aspect-[3/4]">
        <img
          src={activeImage}
          alt={activeName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {tag && (
          <span className="absolute top-4 left-4 font-display text-sm tracking-wider px-3 py-1 bg-accent text-accent-foreground">
            {tag}
          </span>
        )}
        {soldOut && (
          <span className="absolute top-4 right-4 font-display text-xs tracking-wider px-3 py-1 bg-foreground text-background">
            SOLD OUT
          </span>
        )}
        {!soldOut && lowStock && (
          <span className="absolute top-4 right-4 font-display text-xs tracking-wider px-3 py-1 bg-destructive text-destructive-foreground">
            LOW STOCK
          </span>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />

        {/* Add to cart overlay — always visible on mobile, hover-reveal on desktop */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-500">
          {!showSizes ? (
            <button
              onClick={() => !soldOut && setShowSizes(true)}
              disabled={soldOut}
              className="w-full font-display text-base md:text-lg tracking-wider py-2.5 md:py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground"
            >
              {soldOut ? "SOLD OUT" : "SELECT SIZE"}
            </button>
          ) : (
            <div className="space-y-2">
              <div className="flex flex-wrap gap-1.5 justify-center">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`font-display text-sm tracking-wider px-3 py-1.5 border transition-colors ${
                      selectedSize === size
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-foreground border-border hover:border-primary/40"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="w-full font-display text-lg tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
              >
                ADD TO CART
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <h3 className="font-display text-base md:text-lg tracking-wider text-foreground leading-tight">{activeName}</h3>
        <div className="flex items-center justify-between mt-0.5">
          <p className="font-body text-sm text-muted-foreground">{price}</p>
          <SizeGuideModal
            trigger={
              <button
                onClick={(e) => e.stopPropagation()}
                className="font-body text-[10px] md:text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
              >
                Size Guide
              </button>
            }
          />
        </div>
        {colorways && colorways.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {colorways.map((cw, i) => (
              <button
                key={cw.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveColor(i);
                  setSelectedSize(null);
                }}
                className={`font-display text-[10px] md:text-xs tracking-widest px-2 py-1 border transition-colors ${
                  activeColor === i
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                }`}
                aria-label={`Select ${cw.label} colorway`}
              >
                {cw.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
