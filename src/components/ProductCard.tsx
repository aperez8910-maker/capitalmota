import { motion } from "framer-motion";

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  tag?: string;
  index: number;
}

const ProductCard = ({ image, name, price, tag, index }: ProductCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
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
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
          <button className="w-full font-display text-lg tracking-wider py-3 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
            ADD TO CART
          </button>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="font-display text-xl tracking-wider text-foreground">{name}</h3>
        <p className="font-body text-muted-foreground mt-1">{price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
