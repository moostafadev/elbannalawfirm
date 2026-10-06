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

const CHIP_CLASS =
  "rounded-full border-2 border-primary px-3 py-1 text-sm font-semibold duration-300";

const CategoryFilter = ({
  categories,
  active,
  locale,
}: CategoryFilterProps) => {
  if (categories.length === 0) return null;

  return (
    <nav
      aria-label={BLOG_TEXTS[locale].categories}
      className="flex flex-wrap gap-2"
    >
      <Link
        href={buildBlogsHref(1)}
        className={cn(
          CHIP_CLASS,
          active === ""
            ? "bg-primary text-white"
            : "text-primary hover:bg-primary/10",
        )}
      >
        {BLOG_TEXTS[locale].allCategories}
      </Link>
      {categories.map((category) => (
        <Link
          key={category}
          href={buildBlogsHref(1, category)}
          className={cn(
            CHIP_CLASS,
            active === category
              ? "bg-primary text-white"
              : "text-primary hover:bg-primary/10",
          )}
        >
          {category}
        </Link>
      ))}
    </nav>
  );
};

export default CategoryFilter;
