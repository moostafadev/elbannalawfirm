import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { BLOG_TEXTS } from "@/constants/blog";
import { buildBlogsHref, getPageNumbers } from "@/lib/blog";

interface PaginationProps {
  page: number;
  totalPages: number;
  category: string;
  locale: LocaleKey;
}

const ITEM_CLASS =
  "flex h-10 min-w-10 items-center justify-center gap-1 rounded-md border-2 border-primary px-3 font-semibold duration-300";

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
    <nav
      aria-label="pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      {page > 1 ? (
        <Link
          href={buildBlogsHref(page - 1, category)}
          className={cn(ITEM_CLASS, "text-primary hover:bg-primary/10")}
        >
          <PrevIcon size={18} />
          <span className="hidden sm:inline">{texts.previous}</span>
        </Link>
      ) : null}

      {getPageNumbers(page, totalPages).map((item, index) =>
        item === "gap" ? (
          <span key={`gap-${index}`} className="px-1 text-primary">
            …
          </span>
        ) : (
          <Link
            key={item}
            href={buildBlogsHref(item, category)}
            aria-current={item === page ? "page" : undefined}
            className={cn(
              ITEM_CLASS,
              item === page
                ? "bg-primary text-white"
                : "text-primary hover:bg-primary/10",
            )}
          >
            {item}
          </Link>
        ),
      )}

      {page < totalPages ? (
        <Link
          href={buildBlogsHref(page + 1, category)}
          className={cn(ITEM_CLASS, "text-primary hover:bg-primary/10")}
        >
          <span className="hidden sm:inline">{texts.next}</span>
          <NextIcon size={18} />
        </Link>
      ) : null}
    </nav>
  );
};

export default Pagination;
