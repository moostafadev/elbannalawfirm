import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import { buildBlogsHref, getPageNumbers } from "@/lib/blog";

interface PaginationProps {
  page: number;
  totalPages: number;
  category: string;
  locale: LocaleKey;
}

const ITEM_BASE =
  "flex h-10 min-w-10 items-center justify-center gap-1 rounded-md border-2 border-primary px-3 text-sm font-semibold duration-300 md:text-base";

const Pagination = ({
  page,
  totalPages,
  category,
  locale,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const texts = BLOG_TEXTS[locale];
  const isArabic = locale === "ar";
  const PrevIcon = isArabic ? ChevronRight : ChevronLeft;
  const NextIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <nav aria-label="pagination" className="flex flex-col items-center gap-4">
      {/* Compact info (mobile) */}
      <p className="text-sm text-neutral-600 md:hidden">
        {page.toLocaleString(LOCALE_TAGS[locale])} /{" "}
        {totalPages.toLocaleString(LOCALE_TAGS[locale])}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-1.5 md:gap-2">
        {page > 1 ? (
          <Link
            href={buildBlogsHref(page - 1, category)}
            aria-label={texts.previous}
            className={cn(ITEM_BASE, "text-primary hover:bg-primary/10")}
          >
            <PrevIcon size={18} />
            <span className="hidden md:inline">{texts.previous}</span>
          </Link>
        ) : null}

        {/* Numbers hidden on mobile to keep it clean */}
        <div className="hidden flex-wrap items-center gap-1.5 md:flex md:gap-2">
          {getPageNumbers(page, totalPages).map((item, index) =>
            item === "gap" ? (
              <span
                key={`gap-${index}`}
                aria-hidden="true"
                className="px-1 text-primary"
              >
                …
              </span>
            ) : (
              <Link
                key={item}
                href={buildBlogsHref(item, category)}
                aria-current={item === page ? "page" : undefined}
                className={cn(
                  ITEM_BASE,
                  item === page
                    ? "bg-primary text-white shadow-sm"
                    : "text-primary hover:bg-primary/10",
                )}
              >
                {item.toLocaleString(LOCALE_TAGS[locale])}
              </Link>
            ),
          )}
        </div>

        {page < totalPages ? (
          <Link
            href={buildBlogsHref(page + 1, category)}
            aria-label={texts.next}
            className={cn(ITEM_BASE, "text-primary hover:bg-primary/10")}
          >
            <span className="hidden md:inline">{texts.next}</span>
            <NextIcon size={18} />
          </Link>
        ) : null}
      </div>
    </nav>
  );
};

export default Pagination;
