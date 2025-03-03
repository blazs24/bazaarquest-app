
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/PriceTag";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { Heart, ShoppingBag, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className }) => {
  const { addItem } = useCart();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <div
      className={cn(
        "group relative rounded-lg overflow-hidden hover-lift",
        className
      )}
    >
      <Link to={`/product/${product.id}`}>
        <div className="product-image-container blur-load bg-secondary">
          {/* Product badges */}
          <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
            {product.new && <Badge variant="new" />}
            {product.featured && <Badge variant="featured" />}
          </div>

          {/* Wishlist button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Product image with loading effect */}
          <div className="relative aspect-square bg-secondary">
            <img
              src={product.image}
              alt={product.name}
              className={cn(
                "absolute inset-0 object-cover w-full h-full transition-transform duration-500 ease-spring group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          {/* Quick add overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={handleAddToCart}
              variant="outline"
              size="sm"
              className="w-full bg-white/90 text-primary hover:bg-white"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Quick Add
            </Button>
          </div>
        </div>

        <div className="p-3 space-y-1">
          {/* Product rating */}
          {product.rating && (
            <div className="flex items-center space-x-1">
              <Star className="h-3 w-3 fill-shop-500 text-shop-500" />
              <span className="text-xs font-medium">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}

          {/* Product name */}
          <h3 className="font-medium text-base truncate">{product.name}</h3>

          {/* Product price */}
          <PriceTag price={product.price} />
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
