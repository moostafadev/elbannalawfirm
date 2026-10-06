import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import AdBanner from "@/components/ad/AdBanner";
import BlogCard from "@/components/BlogCard";
import BlogSidebar from "@/components/Blogs/BlogSidebar";
import CategoryFilter from "@/components/Blogs/CategoryFilter";
import FeaturedBlogCard from "@/components/Blogs/FeaturedBlogCard";
import Pagination from "@/components/Blogs/Pagination";
import Heading from "@/components/Heading";
import { BLOGS_PAGE_SIZE, BLOG_TEXTS } from "@/constants/blog";
import { parsePage } from "@/lib/blog";
import { toLocaleKey } from "@/lib/locale";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { mainKeywords } from "@/data/seo";
import {
  getBlogCategories,
  getMostViewedBlogs,
  getPublishedBlogs,
} from "@/services/blog.service";

interface PageProps {
  searchParams: { page?: string | string[]; category?: string | string[] };
}

export const generateMetadata = async (): Promise<Metadata> => {
  const texts = BLOG_TEXTS[toLocaleKey(await getLocale())];

  return generateLocalizedMetadataFromContent({
    title: texts.blogs,
    description: texts.blogsDescription,
    path: "blog",
    image: "/logo/opengraph.jpg",
    keywordsByLocale: {
      ar: mainKeywords.ar,
      en: mainKeywords.en,
      fr: mainKeywords.fr,
    },
  });
};

const BlogsPage = async ({ searchParams }: PageProps) => {
  const locale = toLocaleKey(await getLocale());
  const texts = BLOG_TEXTS[locale];
  const page = parsePage(searchParams.page);
  const rawCategory = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const category = rawCategory?.trim() ?? "";

  const [res, categories, popular] = await Promise.all([
    getPublishedBlogs({ lang: locale, category, page, limit: BLOGS_PAGE_SIZE }),
    getBlogCategories(locale),
    getMostViewedBlogs(locale, 5),
  ]);

  if (res.success && page > 1 && res.data.blogs.length === 0) notFound();

  const blogs = res.success ? res.data.blogs : [];
  const showFeatured = page === 1 && category === "" && blogs.length > 0;
  const featured = showFeatured ? blogs[0] : null;
  const rest = showFeatured ? blogs.slice(1) : blogs;

  return (
    <section className="py-10">
      <div className="container flex flex-col gap-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <Heading>{texts.blogs}</Heading>
          <p className="max-w-2xl text-base font-semibold md:text-lg">
            {texts.blogsDescription}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="flex min-w-0 flex-col gap-8">
            <div className="lg:hidden">
              <CategoryFilter
                categories={categories}
                active={category}
                locale={locale}
              />
            </div>

            {!res.success ? (
              <p
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700"
              >
                {texts.loadError}
              </p>
            ) : blogs.length === 0 ? (
              <p className="py-16 text-center text-muted-foreground">
                {texts.emptyBlogs}
              </p>
            ) : (
              <>
                {featured ? (
                  <FeaturedBlogCard blog={featured} locale={locale} />
                ) : null}
                {rest.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {rest.map((blog) => (
                      <BlogCard key={blog.id} blog={blog} locale={locale} />
                    ))}
                  </div>
                ) : null}
                <Pagination
                  page={page}
                  totalPages={res.data.pagination.totalPages}
                  category={category}
                  locale={locale}
                />
              </>
            )}

            <AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot="2456497086"
            />
          </div>

          <BlogSidebar
            locale={locale}
            categories={categories}
            activeCategory={category}
            popular={popular}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
