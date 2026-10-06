import React from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Link } from "@/i18n/routing";
import CustomButton from "./CustomButton";
import BlogImage from "./Blogs/BlogImage";
import { BLOG_TEXTS } from "@/constants/blog";
import { formatBlogDate } from "@/lib/blog";
import type { BlogListItem } from "@/types/blog";

interface BlogCardProps {
  blog: BlogListItem;
  locale: LocaleKey;
}

const BlogCard = ({ blog, locale }: BlogCardProps) => (
  <article className="content-data flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-primary bg-[#bb99111a] shadow-sm duration-300 hover:rounded-none hover:shadow-md">
    <BlogImage src={blog.image} alt={blog.title} variant="card" />
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
        <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
          {blog.category}
        </span>
        <time dateTime={blog.createdAt} className="text-neutral-600">
          {formatBlogDate(blog.createdAt, locale)}
        </time>
      </div>
      <h2 className="line-clamp-2 text-lg font-bold">{blog.title}</h2>
      <p className="line-clamp-3 text-sm md:text-base">{blog.desc}</p>
    </div>
    <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-0">
      <div className="flex items-center gap-3 text-sm text-neutral-600">
        <span className="flex items-center gap-1">
          <MessageSquare size={16} />
          {blog.commentsCount}
        </span>
        <span className="flex items-center gap-1">
          <Heart size={16} />
          {blog.likesCount}
        </span>
      </div>
      <Link href={`/blog/${blog.id}`} title={blog.title}>
        <CustomButton size="fit" color="yellow">
          {BLOG_TEXTS[locale].readMore}
        </CustomButton>
      </Link>
    </div>
  </article>
);

export default BlogCard;
