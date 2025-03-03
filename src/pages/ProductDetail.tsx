
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { getProductById } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/ui/PriceTag";
import Badge from "@/components/ui/Badge";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Get product details
  const product = id ? getProductById(id) : undefined;

  // Redirect to products page if product not found
  useEffect(() => {
    if (!product && id) {
      toast.error("Product not found");
      navigate("/products");
    }
  }, [product, id, navigate]);

  if (!product) {
    return null;
  }

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  };

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <>
      <Helmet>
        <title>{`${product.name} | Nova`}</title>
        <meta name="description" content={product.description} />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="sticky top-24 h-fit">
                <div className="relative rounded-lg overflow-hidden aspect-square bg-secondary">
                  {/* Product badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.new && <Badge variant="new" />}
                    {product.featured && <Badge variant="featured" />}
                  </div>

                  {/* Product image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-opacity duration-500 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col">
                <div className="mb-auto">
                  {/* Product name and rating */}
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    
                    {/* Product rating */}
                    {product.rating && (
                      <div className="flex items-center space-x-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-shop-500 text-shop-500"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium">
                          {product.rating}
                        </span>
                        {product.reviews && (
                          <span className="text-sm text-muted-foreground">
                            ({product.reviews} reviews)
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <PriceTag price={product.price} size="lg" />
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>

                  {/* Stock status */}
                  <div className="mb-8">
                    <p className="text-sm">
                      Availability:{" "}
                      <span
                        className={
                          product.stock > 0 ? "text-shop-500" : "text-destructive"
                        }
                      >
                        {product.stock > 0
                          ? `In Stock (${product.stock} available)`
                          : "Out of Stock"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Add to cart */}
                <div className="pt-6 border-t border-border">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-border rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-none h-10 w-10"
                          onClick={handleDecrement}
                          disabled={quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center">{quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-none h-10 w-10"
                          onClick={handleIncrement}
                          disabled={quantity >= product.stock}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Add to cart button */}
                      <Button
                        className="flex-1"
                        size="lg"
                        onClick={handleAddToCart}
                        disabled={product.stock <= 0}
                      >
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        Add to Cart
                      </Button>

                      {/* Wishlist button */}
                      <Button variant="outline" size="icon" className="h-12 w-12">
                        <Heart className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
};

export default ProductDetail;
