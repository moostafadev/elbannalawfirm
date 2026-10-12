import React from "react";
import { Eye } from "lucide-react";
import { Link } from "@/i18n/routing";
import BlogImage from "./BlogImage";
import { BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import type { PopularBlogItem } from "@/types/blog";

interface PopularBlogsListProps {
  popular: PopularBlogItem[];
  locale: LocaleKey;
}

const PopularBlogsList = ({ popular, locale }: PopularBlogsListProps) => {
  const texts = BLOG_TEXTS[locale];

  return (
    <section className="rounded-lg border-2 border-primary bg-[#bb99111a] p-4">
      <h3 className="mb-3 text-base font-bold text-primary md:text-lg">
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
                  {blog.views.toLocaleString(LOCALE_TAGS[locale])} {texts.views}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularBlogsList;
