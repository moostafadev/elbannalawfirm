import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const Arrow = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <article className="content-data group flex h-full flex-col overflow-hidden rounded-lg border-2 border-primary bg-[#bb99111a] shadow-sm duration-300 hover:shadow-md">
      <BlogImage src={blog.image} alt={blog.title} variant="cover" priority />

      <div className="flex flex-1 flex-col justify-center gap-3 p-4 md:gap-5 md:p-6 lg:p-8">
        <div className="flex flex-wrap items-center gap-2 text-[11px] md:text-sm">
          <span className="rounded-full bg-primary px-2.5 py-0.5 font-semibold text-white shadow-sm md:px-3 md:py-1">
            {texts.featured}
          </span>
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 font-semibold text-primary md:px-3 md:py-1">
            {blog.category}
          </span>
          <time dateTime={blog.createdAt} className="text-neutral-600">
            {formatBlogDate(blog.createdAt, locale)}
          </time>
        </div>

        <h2 className="line-clamp-2 text-lg font-bold leading-snug duration-300 group-hover:text-primary md:line-clamp-3 md:text-2xl lg:text-3xl">
          {blog.title}
        </h2>

        <p className="line-clamp-2 text-sm leading-relaxed text-neutral-700 md:line-clamp-3 md:text-base">
          {blog.desc}
        </p>

        <Link
          href={`/blog/${blog.id}`}
          title={blog.title}
          className="mt-1 self-start"
        >
          <CustomButton
            size="fit"
            color="yellow"
            className="!gap-2 !px-4 !py-2 !text-sm md:!px-5 md:!py-2.5 md:!text-base"
          >
            <span>{texts.readMore}</span>
            <Arrow
              size={16}
              strokeWidth={2.5}
              className="duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            />
          </CustomButton>
        </Link>
      </div>
    </article>
  );
};

export default FeaturedBlogCard;
