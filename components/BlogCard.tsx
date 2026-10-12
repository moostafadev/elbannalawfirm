import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";
import CustomButton from "./CustomButton";
import BlogImage from "./Blogs/BlogImage";
import { BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import { formatBlogDate } from "@/lib/blog";
import type { BlogListItem } from "@/types/blog";

interface BlogCardProps {
  blog: BlogListItem;
  locale: LocaleKey;
}

const BlogCard = ({ blog, locale }: BlogCardProps) => {
  const texts = BLOG_TEXTS[locale];

  return (
    <article className="content-data group flex flex-col overflow-hidden rounded-lg border-2 border-primary/40 bg-[#bb99111a] shadow-sm duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg">
      <BlogImage src={blog.image} alt={blog.title} variant="card" />

      <div className="flex flex-1 flex-col gap-2.5 p-3.5 md:gap-3 md:p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary md:px-3 md:py-1 md:text-sm">
            {blog.category}
          </span>
          <time
            dateTime={blog.createdAt}
            className="text-[11px] text-neutral-600 md:text-sm"
          >
            {formatBlogDate(blog.createdAt, locale)}
          </time>
        </div>

        <h2 className="line-clamp-2 text-base font-bold leading-snug duration-300 group-hover:text-primary md:text-lg">
          {blog.title}
        </h2>

        {/* Shorter desc on mobile for compact cards */}
        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-700 md:line-clamp-3 md:text-base">
          {blog.desc}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 border-t border-primary/20 px-3.5 pb-3.5 pt-3 md:gap-3 md:px-5 md:pb-4">
        <div className="flex items-center gap-3 text-[11px] text-neutral-600 md:text-sm">
          <span className="flex items-center gap-1">
            <MessageSquare size={14} className="md:hidden" />
            <MessageSquare size={16} className="hidden md:block" />
            {blog.commentsCount.toLocaleString(LOCALE_TAGS[locale])}
          </span>
          <span className="flex items-center gap-1">
            <Heart size={14} className="md:hidden" />
            <Heart size={16} className="hidden md:block" />
            {blog.likesCount.toLocaleString(LOCALE_TAGS[locale])}
          </span>
        </div>

        <Link href={`/blog/${blog.id}`} title={blog.title} className="shrink-0">
          <CustomButton
            size="fit"
            color="yellow"
            className="!px-2.5 !py-1 !text-[11px] md:!px-3 md:!py-1.5 md:!text-sm"
          >
            {texts.readMore}
          </CustomButton>
        </Link>
      </div>
    </article>
  );
};

export default BlogCard;
