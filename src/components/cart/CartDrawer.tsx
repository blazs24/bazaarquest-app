
import React, { useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import CartItem from "@/components/cart/CartItem";
import PriceTag from "@/components/ui/PriceTag";
import { ShoppingBag, X } from "lucide-react";

const CartDrawer: React.FC = () => {
  const { state, toggleCart, clearCart, subtotal, totalItems } = useCart();
  const { isOpen, items } = state;

  // Close cart when pressing escape key
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        toggleCart(false);
      }
    };

    document.addEventListener("keydown", handleEscapeKey);
    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, toggleCart]);

  // Prevent scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      toggleCart(false);
    }
  };

  const calculateTotal = () => {
    // Shipping is free over $100
    const shipping = subtotal >= 100 ? 0 : 10;
    return subtotal + shipping;
  };

  const isEmpty = items.length === 0;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleOverlayClick}
      >
        {/* Cart drawer */}
        <div
          className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-lg transform transition-transform duration-300 ease-spring ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Cart header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5" />
              Shopping Cart
              {totalItems > 0 && (
                <span className="ml-2 text-sm text-muted-foreground">
                  ({totalItems} {totalItems === 1 ? "item" : "items"})
                </span>
              )}
            </h2>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => toggleCart(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Cart content */}
          {isEmpty ? (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] p-6 text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button
                onClick={() => toggleCart(false)}
                className="rounded-full"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <ScrollArea className="flex-grow h-[calc(100vh-15rem)]">
                <div className="px-4 py-2">
                  {items.map((item) => (
                    <CartItem
                      key={item.product.id}
                      product={item.product}
                      quantity={item.quantity}
                    />
                  ))}
                </div>
              </ScrollArea>

              {/* Cart summary */}
              <div className="p-4 bg-background border-t border-border">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <PriceTag price={subtotal} />
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {subtotal >= 100 ? (
                      <span className="text-shop-500">Free</span>
                    ) : (
                      <PriceTag price={10} />
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <PriceTag price={calculateTotal()} size="lg" />
                  </div>

                  <div className="grid gap-2">
                    <Button className="w-full rounded-md" size="lg">
                      Checkout
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full rounded-md"
                      onClick={() => toggleCart(false)}
                    >
                      Continue Shopping
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
