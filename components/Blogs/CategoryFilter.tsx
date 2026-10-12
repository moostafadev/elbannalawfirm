import React from "react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { BLOG_TEXTS } from "@/constants/blog";
import { buildBlogsHref } from "@/lib/blog";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  locale: LocaleKey;
}

const CHIP_BASE =
  "shrink-0 whitespace-nowrap rounded-full border-2 border-primary px-3 py-1 text-xs font-semibold duration-300 md:px-4 md:py-1.5 md:text-sm";

const CategoryFilter = ({
  categories,
  active,
  locale,
}: CategoryFilterProps) => {
  if (categories.length === 0) return null;

  const renderChip = (label: string, value: string) => {
    const isActive = active === value;
    return (
      <Link
        href={buildBlogsHref(1, value || undefined)}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          CHIP_BASE,
          isActive
            ? "bg-primary text-white shadow-sm"
            : "bg-white/60 text-primary hover:bg-primary/10",
        )}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      aria-label={BLOG_TEXTS[locale].categories}
      className="relative w-full max-w-full"
    >
      {/* Edge fades (mobile only) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent md:hidden" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent md:hidden" />

      {/* Scrollable row on mobile · wrapped centered on desktop */}
      <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
        <div className="flex w-max gap-2 px-1 md:w-full md:flex-wrap md:justify-center md:px-0">
          {renderChip(BLOG_TEXTS[locale].allCategories, "")}
          {categories.map((category) => (
            <React.Fragment key={category}>
              {renderChip(category, category)}
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default CategoryFilter;
