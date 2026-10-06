import React from "react";
import { Eye } from "lucide-react";
import { Link } from "@/i18n/routing";
import BlogImage from "./BlogImage";
import CategoryFilter from "./CategoryFilter";
import { BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import type { PopularBlogItem } from "@/types/blog";

interface BlogSidebarProps {
  locale: LocaleKey;
  categories: string[];
  activeCategory: string;
  popular: PopularBlogItem[];
}

const CARD_CLASS = "rounded-lg border-2 border-primary bg-[#bb99111a] p-4";

const BlogSidebar = ({
  locale,
  categories,
  activeCategory,
  popular,
}: BlogSidebarProps) => {
  const texts = BLOG_TEXTS[locale];

  return (
    <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
      {categories.length > 0 ? (
        <section className={`hidden lg:block ${CARD_CLASS}`}>
          <h3 className="mb-3 text-lg font-bold text-primary">
            {texts.categories}
          </h3>
          <CategoryFilter
            categories={categories}
            active={activeCategory}
            locale={locale}
          />
        </section>
      ) : null}

      {popular.length > 0 ? (
        <section className={CARD_CLASS}>
          <h3 className="mb-3 text-lg font-bold text-primary">
            {texts.mostViewed}
          </h3>
          <ul className="flex flex-col gap-3">
            {popular.map((blog) => (
              <li key={blog.id}>
                <Link
                  href={`/blog/${blog.id}`}
                  title={blog.title}
                  className="group flex items-center gap-3"
                >
                  <BlogImage
                    src={blog.image}
                    alt={blog.title}
                    variant="thumb"
                    className="rounded-md"
                  />
                  <div className="flex min-w-0 flex-col gap-1">
                    <span className="line-clamp-2 text-sm font-semibold duration-300 group-hover:text-primary">
                      {blog.title}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-neutral-600">
                      <Eye size={14} />
                      {blog.views.toLocaleString(LOCALE_TAGS[locale])}{" "}
                      {texts.views}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </aside>
  );
};

export default BlogSidebar;
