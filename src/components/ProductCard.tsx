import { useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "@/hooks/use-cart";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  tag?: string;
  index: number;
  stripePriceId?: string;
  sizes?: string[];
}

const defaultSizes = ["S", "M", "L", "XL", "2XL"];

const ProductCard = ({ image, name, price, tag, index, stripePriceId, sizes = defaultSizes }: ProductCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizes, setShowSizes] = useState(false);
  const { addItem } = useCart();

  const numericPrice = parseFloat(price.replace("$", ""));

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      name,
      price: numericPrice,
      image,
      size: selectedSize,
      quantity: 1,
      stripePriceId,
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
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {tag && (
          <span className="absolute top-4 left-4 font-display text-sm tracking-wider px-3 py-1 bg-accent text-accent-foreground">
            {tag}
          </span>
        )}
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />

        {/* Add to cart overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          {!showSizes ? (
            <button
              onClick={() => setShowSizes(true)}
              className="w-full font-display text-lg tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              SELECT SIZE
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
        <h3 className="font-display text-base md:text-lg tracking-wider text-foreground leading-tight">{name}</h3>
        <p className="font-body text-sm text-muted-foreground mt-0.5">{price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
