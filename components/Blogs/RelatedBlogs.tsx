"use server";

import BlogCard from "@/components/BlogCard";
import { BLOG_TEXTS } from "@/constants/blog";
import { toLocaleKey } from "@/lib/locale";
import { getRelatedBlogs } from "@/services/blog.service";
import type { BlogDetail } from "@/types/blog";

const RELATED_LIMIT = 3;

interface RelatedBlogsProps {
  blog: Pick<BlogDetail, "id" | "lang" | "category">;
  locale: string;
}

const RelatedBlogs = async ({ blog, locale }: RelatedBlogsProps) => {
  const key = toLocaleKey(locale);
  const related = await getRelatedBlogs(blog, RELATED_LIMIT);

  if (related.length === 0) return null;

  return (
    <section className="flex flex-col gap-6 border-t pt-8">
      <h2 className="text-2xl font-bold text-primary">
        {BLOG_TEXTS[key].relatedArticles}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {related.map((item) => (
          <BlogCard key={item.id} blog={item} locale={key} />
        ))}
      </div>
    </section>
  );
};

export default RelatedBlogs;
