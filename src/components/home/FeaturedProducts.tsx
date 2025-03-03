
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { getFeaturedProducts } from "@/data/products";
import ProductCard from "@/components/products/ProductCard";
import { ArrowRight } from "lucide-react";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-white opacity-0"
      style={{ opacity: 0 }}
    >
      <div className="container">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl">
              Our most popular and highly curated items, showcasing exceptional
              design and quality.
            </p>
          </div>
          <Link
            to="/products"
            className="hidden md:flex items-center text-primary hover:underline"
          >
            View All
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="opacity-0 transform translate-y-4"
              style={{
                animation: "sectionFadeIn 0.8s forwards",
                animationDelay: `${parseInt(product.id) * 0.1}s`,
              }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link
            to="/products"
            className="inline-flex items-center text-primary hover:underline"
          >
            View All Products
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
