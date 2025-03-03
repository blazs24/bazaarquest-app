
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import CartDrawer from "@/components/cart/CartDrawer";
import { Button } from "@/components/ui/button";
import { categories, getProductsByCategory, products } from "@/data/products";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(categoryParam);
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Update products when category changes
  useEffect(() => {
    const filtered = getProductsByCategory(activeCategory);
    setFilteredProducts(filtered);
  }, [activeCategory]);

  // Update URL when category changes
  useEffect(() => {
    if (activeCategory !== categoryParam) {
      if (activeCategory === "all") {
        setSearchParams({});
      } else {
        setSearchParams({ category: activeCategory });
      }
    }
  }, [activeCategory, categoryParam, setSearchParams]);

  // Set active category from URL on mount
  useEffect(() => {
    setActiveCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>Shop All Products | Nova</title>
        <meta
          name="description"
          content="Browse our complete collection of premium lifestyle products."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow pt-24">
          <div className="container py-8">
            <header className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Our Collection
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our carefully curated selection of premium products
                designed to elevate your everyday life.
              </p>
            </header>

            {/* Category filter */}
            <div className="flex justify-center mb-12 overflow-x-auto pb-4">
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <Button
                    key={category.value}
                    variant={
                      activeCategory === category.value ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => handleCategoryChange(category.value)}
                    className="rounded-full"
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Products */}
            <ProductGrid products={filteredProducts} />
          </div>
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
};

export default Products;
