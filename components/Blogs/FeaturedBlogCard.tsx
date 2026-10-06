import React from "react";
import { Link } from "@/i18n/routing";
import CustomButton from "../CustomButton";
import BlogImage from "./BlogImage";
import { BLOG_TEXTS } from "@/constants/blog";
import { formatBlogDate } from "@/lib/blog";
import type { BlogListItem } from "@/types/blog";

interface FeaturedBlogCardProps {
  blog: BlogListItem;
  locale: LocaleKey;
}

const FeaturedBlogCard = ({ blog, locale }: FeaturedBlogCardProps) => {
  const texts = BLOG_TEXTS[locale];

  return (
    <article className="content-data grid overflow-hidden rounded-lg border-2 border-primary bg-[#bb99111a] shadow-sm duration-300 hover:shadow-md lg:grid-cols-2">
      <BlogImage
        src={blog.image}
        alt={blog.title}
        variant="cover"
        priority
        className="lg:aspect-auto lg:h-full"
      />
      <div className="flex flex-col justify-center gap-4 p-4 md:p-8">
        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
          <span className="rounded-full bg-primary px-3 py-1 font-semibold text-white">
            {texts.featured}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary">
            {blog.category}
          </span>
          <time dateTime={blog.createdAt} className="text-neutral-600">
            {formatBlogDate(blog.createdAt, locale)}
          </time>
        </div>
        <h2 className="line-clamp-3 text-xl font-bold md:text-3xl">
          {blog.title}
        </h2>
        <p className="line-clamp-4 text-sm text-neutral-700 md:text-base">
          {blog.desc}
        </p>
        <Link
          href={`/blog/${blog.id}`}
          title={blog.title}
          className="self-start"
        >
          <CustomButton size="fit" color="yellow">
            {texts.readMore}
          </CustomButton>
        </Link>
      </div>
    </article>
  );
};

export default FeaturedBlogCard;
