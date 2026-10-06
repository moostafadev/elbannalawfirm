import React from "react";
import { Link } from "@/i18n/routing";
import BlogCard from "./BlogCard";
import CustomButton from "./CustomButton";
import { BLOG_TEXTS } from "@/constants/blog";
import { toLocaleKey } from "@/lib/locale";
import { getPublishedBlogs } from "@/services/blog.service";

const HOME_BLOGS_LIMIT = 3;

const BlogsSection = async ({ locale }: { locale: string }) => {
  const key = toLocaleKey(locale);
  const texts = BLOG_TEXTS[key];
  const res = await getPublishedBlogs({ lang: key, limit: HOME_BLOGS_LIMIT });

  if (!res.success) {
    return (
      <p role="alert" className="text-center text-red-600">
        {texts.loadError}
      </p>
    );
  }

  if (res.data.blogs.length === 0) {
    return (
      <p className="text-center text-muted-foreground">{texts.emptyBlogs}</p>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {res.data.blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} locale={key} />
        ))}
      </div>
      {res.data.pagination.total > HOME_BLOGS_LIMIT ? (
        <Link href="/blog" title={texts.viewAll} className="self-center">
          <CustomButton size="fit" color="yellow">
            {texts.viewAll}
          </CustomButton>
        </Link>
      ) : null}
    </div>
  );
};

export default BlogsSection;
