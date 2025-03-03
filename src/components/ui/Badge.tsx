
import React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "new" | "featured" | "sale" | "out-of-stock";

interface ProductBadgeProps {
  variant: BadgeVariant;
  className?: string;
  children?: React.ReactNode;
}

const Badge: React.FC<ProductBadgeProps> = ({
  variant,
  className,
  children,
}) => {
  const variantClasses = {
    new: "bg-shop-500 text-white",
    featured: "bg-shop-900 text-white",
    sale: "bg-destructive text-destructive-foreground",
    "out-of-stock": "bg-muted text-muted-foreground",
  };

  const defaultLabels = {
    new: "New",
    featured: "Featured",
    sale: "Sale",
    "out-of-stock": "Out of Stock",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 text-xs font-medium rounded-full",
        variantClasses[variant],
        className
      )}
    >
      {children || defaultLabels[variant]}
    </span>
  );
};

export default Badge;
