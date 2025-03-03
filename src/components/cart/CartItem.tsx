
import React from "react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/PriceTag";
import { Minus, Plus, X } from "lucide-react";

interface CartItemProps {
  product: Product;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ product, quantity }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrement = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="flex py-4 space-x-4 border-b border-border">
      <div className="relative flex-shrink-0 w-20 h-20 bg-secondary rounded-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-grow justify-between min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
            <PriceTag price={product.price} size="sm" />
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 rounded-full hover:bg-secondary text-muted-foreground"
            onClick={() => removeItem(product.id)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1 border border-border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-6 text-center text-sm">{quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          <span className="text-sm font-medium">
            <PriceTag price={product.price * quantity} size="sm" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
