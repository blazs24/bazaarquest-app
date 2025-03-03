
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import CartDrawer from "@/components/cart/CartDrawer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Nova | Premium Lifestyle Products</title>
        <meta
          name="description"
          content="Discover our collection of thoughtfully designed products that elevate your everyday experiences."
        />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Hero />
          <FeaturedProducts />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </>
  );
};

export default Index;
