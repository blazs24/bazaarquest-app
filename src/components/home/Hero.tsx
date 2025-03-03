
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Animation effect on load
  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;

    if (title && subtitle) {
      title.style.opacity = "0";
      title.style.transform = "translateY(20px)";
      subtitle.style.opacity = "0";
      subtitle.style.transform = "translateY(20px)";

      setTimeout(() => {
        title.style.transition = "opacity 1s ease, transform 1s ease";
        title.style.opacity = "1";
        title.style.transform = "translateY(0)";
        
        setTimeout(() => {
          subtitle.style.transition = "opacity 1s ease, transform 1s ease";
          subtitle.style.opacity = "1";
          subtitle.style.transform = "translateY(0)";
        }, 200);
      }, 300);
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=1920&q=80')",
            filter: "brightness(0.8)"
          }}
        />
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Crafted for <span className="text-shop-100">Everyday</span> Excellence
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white/90 mb-8 max-w-lg"
          >
            Discover our collection of thoughtfully designed products that elevate your everyday experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 transition-all duration-300"
            >
              <Link to="/products">
                Shop Collection
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
