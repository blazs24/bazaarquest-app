
import React from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Nova</h3>
            <p className="text-muted-foreground text-sm">
              Crafting premium lifestyle products with exceptional attention to
              detail, designed to elevate your everyday experience.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Shop</h4>
            <ul className="space-y-2">
              <FooterLink to="/products">All Products</FooterLink>
              <FooterLink to="/products?category=audio">Audio</FooterLink>
              <FooterLink to="/products?category=home">Home</FooterLink>
              <FooterLink to="/products?category=accessories">Accessories</FooterLink>
              <FooterLink to="/products?category=kitchen">Kitchen</FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Company</h4>
            <ul className="space-y-2">
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
              <FooterLink to="/shipping">Shipping Information</FooterLink>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase">
              Join Our Newsletter
            </h4>
            <p className="text-muted-foreground text-sm">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border-border"
              />
              <Button type="submit" className="rounded-md">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nova. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <SocialLink href="#" label="Twitter" />
            <SocialLink href="#" label="Instagram" />
            <SocialLink href="#" label="Facebook" />
            <SocialLink href="#" label="LinkedIn" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) => (
  <li>
    <Link
      to={to}
      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
    >
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    aria-label={label}
    className="text-muted-foreground hover:text-primary transition-colors duration-200"
  >
    <span className="text-sm">{label}</span>
  </a>
);

export default Footer;
