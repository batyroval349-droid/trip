import * as React from "react";
import { User, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { PricingColumn, type PricingColumnProps } from "@/components/ui/pricing-utils/pricing-column";
import { Section } from "@/components/ui/pricing-utils/section";

export interface PricingProps {
  title?: string | false;
  description?: string | false;
  badge?: React.ReactNode;
  plans?: PricingColumnProps[] | false;
  className?: string;
  children?: React.ReactNode;
}

const DEFAULT_PRICING_PLANS: PricingColumnProps[] = [
  {
    name: "Free",
    description: "For everyone starting out on a website for their big idea",
    price: 0,
    priceNote: "Free and open-source forever. Get started now.",
    cta: {
      variant: "glow",
      label: "Get started for free",
      href: "https://www.launchuicomponents.com/",
    },
    features: [
      "1 website template",
      "9 blocks and sections",
      "4 custom animations",
    ],
    variant: "default",
    className: "hidden lg:flex",
  },
  {
    name: "Pro",
    icon: <User className="size-4" />,
    description: "For early-stage founders, solopreneurs and indie devs",
    price: 99,
    priceNote: "Lifetime access. Free updates. No recurring fees.",
    cta: {
      variant: "default",
      label: "Get all-access",
      href: "https://www.launchuicomponents.com/",
    },
    features: [
      `$1000 templates`,
      `$1000 blocks and sections`,
      `$1000 illustrations`,
      `$1000 custom animations`,
    ],
    variant: "glow-brand",
  },
  {
    name: "Pro Team",
    icon: <Users className="size-4" />,
    description: "For teams and agencies working on cool products together",
    price: 499,
    priceNote: "Lifetime access. Free updates. No recurring fees.",
    cta: {
      variant: "default",
      label: "Get all-access for your team",
      href: "https://www.launchuicomponents.com/",
    },
    features: [
      "All the templates, components and sections available for your entire team",
    ],
    variant: "glow",
  },
];

export default function Pricing({
  title = "Build your dream landing page, today.",
  description = "Get lifetime access to all the components. No recurring fees. Just simple, transparent pricing.",
  badge,
  plans = DEFAULT_PRICING_PLANS,
  className = "",
  children,
}: PricingProps) {
  return (
    <Section className={cn(className)}>
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12">
        {(title || description || badge) && (
          <div className="flex flex-col items-center gap-3 px-4 text-center sm:gap-4 max-w-3xl">
            {badge && <div>{badge}</div>}
            {title && (
              <h2 className="text-3xl leading-tight font-bold sm:text-5xl sm:leading-tight text-[var(--text-main)] font-serif">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-base text-[var(--text-muted)] max-w-[640px] leading-relaxed sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}
        {plans !== false && plans.length > 0 && (
          <div
            className={cn(
              "mx-auto grid gap-6 w-full items-stretch",
              plans.length === 4
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
                : plans.length === 2
                ? "grid-cols-1 md:grid-cols-2 max-w-4xl"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl"
            )}
          >
            {plans.map((plan) => (
              <PricingColumn
                key={plan.name}
                name={plan.name}
                icon={plan.icon}
                description={plan.description}
                price={plan.price}
                originalPrice={plan.originalPrice}
                promotionText={plan.promotionText}
                priceNote={plan.priceNote}
                cta={plan.cta}
                features={plan.features}
                variant={plan.variant}
                className={plan.className}
              />
            ))}
          </div>
        )}

        {children}
      </div>
    </Section>
  );
}
