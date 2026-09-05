import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface PricingColumnProps {
  name: string;
  icon?: React.ReactNode;
  description?: string;
  price: number | string;
  originalPrice?: number | string;
  promotionText?: string;
  priceNote?: string;
  cta?: {
    variant?: "default" | "outline" | "secondary" | "glow" | "glow-brand" | "destructive" | "ghost" | "link";
    label: string;
    href?: string;
    onClick?: () => void;
  };
  features?: string[];
  variant?: "default" | "glow" | "glow-brand" | "popular";
  className?: string;
}

export function PricingColumn({
  name,
  icon,
  description,
  price,
  originalPrice,
  promotionText,
  priceNote,
  cta = { label: "Select", variant: "default" },
  features = [],
  variant = "default",
  className,
}: PricingColumnProps) {
  const isBrand = variant === "glow-brand" || variant === "popular";
  const isGlow = variant === "glow";

  return (
    <div
      className={cn(
        "relative flex flex-col justify-between rounded-2xl p-6 sm:p-8 transition-all duration-300 bg-white",
        isBrand && "border-2 border-[var(--accent-terracotta)] shadow-[0_12px_36px_-4px_rgba(194,94,32,0.18)] bg-[#FFFDFB]",
        isGlow && "border-2 border-[var(--accent-emerald)] shadow-[0_12px_36px_-4px_rgba(15,118,110,0.16)] bg-[#FCFDFD]",
        !isBrand && !isGlow && "border border-[var(--border-subtle)] shadow-[0_4px_20px_-2px_rgba(28,45,42,0.05)] hover:border-[var(--accent-emerald)]/40 hover:shadow-md",
        className
      )}
    >
      <div>
        {/* Promotion / Badge Header */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            {icon && (
              <span className="flex size-7 items-center justify-center rounded-lg bg-[rgba(15,118,110,0.1)] text-[var(--accent-emerald)]">
                {icon}
              </span>
            )}
            <h3 className="text-xl font-bold text-[var(--text-main)]">{name}</h3>
          </div>
          {promotionText && (
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold",
                isBrand
                  ? "bg-[rgba(194,94,32,0.12)] text-[var(--accent-terracotta)]"
                  : "bg-[rgba(15,118,110,0.12)] text-[var(--accent-emerald)]"
              )}
            >
              {promotionText}
            </span>
          )}
        </div>

        {/* Description */}
        {description && (
          <p className="text-sm text-[var(--text-muted)] min-h-[44px] mb-5 leading-relaxed">
            {description}
          </p>
        )}

        {/* Price display */}
        <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-[var(--border-subtle)]">
          <span className="text-4xl sm:text-5xl font-extrabold font-serif text-[var(--text-main)]">
            {typeof price === "number" ? `$${price}` : price}
          </span>
          {originalPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              {typeof originalPrice === "number" ? `$${originalPrice}` : originalPrice}
            </span>
          )}
          {priceNote && (
            <span className="text-sm font-medium text-[var(--text-muted)]">
              {priceNote}
            </span>
          )}
        </div>

        {/* Features list */}
        {features.length > 0 && (
          <ul className="space-y-3 mb-8 text-sm">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-[var(--text-main)]">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[rgba(15,118,110,0.12)] text-[var(--accent-emerald)] mt-0.5">
                  <Check className="size-3.5 stroke-[2.5]" />
                </span>
                <span className="leading-snug">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Button */}
      <div className="pt-2">
        {cta.href ? (
          <a
            href={cta.href}
            className="w-full inline-block"
            target={cta.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
          >
            <Button
              className="w-full py-2.5 font-semibold text-base transition-all"
              variant={isBrand ? "glow-brand" : "default"}
            >
              {cta.label}
            </Button>
          </a>
        ) : (
          <Button
            onClick={cta.onClick}
            className="w-full py-2.5 font-semibold text-base transition-all"
            variant={isBrand ? "glow-brand" : "default"}
          >
            {cta.label}
          </Button>
        )}
      </div>
    </div>
  );
}
