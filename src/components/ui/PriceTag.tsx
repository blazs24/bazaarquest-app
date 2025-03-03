
import React from "react";
import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  withCurrency?: boolean;
}

const PriceTag: React.FC<PriceTagProps> = ({
  price,
  className,
  size = "md",
  withCurrency = true,
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl font-semibold",
  };

  // Format price with currency
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: withCurrency ? "currency" : "decimal",
    currency: "USD",
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
  }).format(price);

  return (
    <span className={cn(sizeClasses[size], "tracking-tight", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceTag;
