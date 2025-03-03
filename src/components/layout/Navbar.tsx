
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { toggleCart, totalItems } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            to="/"
            className="text-2xl font-semibold tracking-tight transition-opacity hover:opacity-80"
          >
            Nova
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              isSearchOpen ? "w-60" : "w-0"
            )}
          >
            <Input
              type="search"
              placeholder="Search products..."
              className={cn(
                "rounded-full bg-secondary border-none focus-visible:ring-primary",
                !isSearchOpen && "hidden"
              )}
            />
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={toggleSearch}
          >
            <Search
              className={cn(
                "h-5 w-5 transition-transform",
                isSearchOpen && "rotate-90"
              )}
            />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => toggleCart(true)}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-shop-500 text-xs font-medium text-white animate-scale-in">
                {totalItems}
              </span>
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 bg-white z-40 pt-20 px-6 transform transition-transform duration-300 ease-spring md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="flex flex-col space-y-6 text-lg">
          <MobileNavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </MobileNavLink>
          <MobileNavLink
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </MobileNavLink>
          <MobileNavLink
            to="/about"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </MobileNavLink>
          <MobileNavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </MobileNavLink>
        </nav>
      </div>
    </header>
  );
};

const NavLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
  >
    {children}
  </Link>
);

const MobileNavLink = ({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => (
  <Link
    to={to}
    className="text-lg font-medium py-2 border-b border-border transition-colors hover:text-primary"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;
