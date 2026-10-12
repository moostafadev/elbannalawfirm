import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { FileSearch } from "lucide-react";
import AdBanner from "@/components/ad/AdBanner";
import Animation from "@/components/Animation";
import BlogCard from "@/components/BlogCard";
import CategoryFilter from "@/components/Blogs/CategoryFilter";
import FeaturedBlogCard from "@/components/Blogs/FeaturedBlogCard";
import Pagination from "@/components/Blogs/Pagination";
import PopularBlogsAsync from "@/components/Blogs/PopularBlogsAsync";
import PopularBlogsSkeleton from "@/components/Blogs/PopularBlogsSkeleton";
import BlogListJsonLd from "@/components/Blogs/BlogListJsonLd";
import CustomButton from "@/components/CustomButton";
import Heading from "@/components/Heading";
import { Link } from "@/i18n/routing";
import { BLOGS_PAGE_SIZE, BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import { SITE_URL } from "@/constants/site";
import { parsePage } from "@/lib/blog";
import { toLocaleKey } from "@/lib/locale";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { mainKeywords } from "@/data/seo";
import { getBlogCategories, getPublishedBlogs } from "@/services/blog.service";
import { AD_SLOTS } from "@/constants/ads";

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

  const [res, categories] = await Promise.all([
    getPublishedBlogs({ lang: locale, category, page, limit: BLOGS_PAGE_SIZE }),
    getBlogCategories(locale),
  ]);

  if (res.success && page > 1 && res.data.blogs.length === 0) notFound();

  const blogs = res.success ? res.data.blogs : [];
  const total = res.success ? res.data.pagination.total : 0;
  const totalPages = res.success ? res.data.pagination.totalPages : 0;

  const isFeaturedPage = page === 1 && category === "";
  const showFeatured = isFeaturedPage && blogs.length > 0;
  const featured = showFeatured ? blogs[0] : null;
  const rest = showFeatured ? blogs.slice(1) : blogs;
  const hasCategories = categories.length > 0;

  const sectionTitle = category
    ? category
    : page === 1
      ? texts.latestArticles
      : texts.blogs;

  return (
    <section className="py-10 md:py-14">
      <BlogListJsonLd
        blogs={blogs}
        url={`${SITE_URL}/${locale}/blog`}
        name={texts.blogs}
        description={texts.blogsDescription}
        locale={locale}
        page={page}
        totalPages={totalPages}
      />

      <div className="container flex flex-col gap-10 md:gap-12">
        {/* ① HERO */}
        <header className="flex flex-col items-center gap-4 md:gap-6">
          <Heading>{texts.blogs}</Heading>

          <Animation>
            <p className="mx-auto max-w-2xl text-center text-sm font-semibold text-neutral-700 md:text-lg">
              {texts.blogsDescription}
            </p>
          </Animation>

          {hasCategories ? (
            <Animation className="w-full">
              <CategoryFilter
                categories={categories}
                active={category}
                locale={locale}
              />
            </Animation>
          ) : null}
        </header>

        {/* ② FEATURED + POPULAR */}
        {showFeatured && featured ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
            <Animation>
              <FeaturedBlogCard blog={featured} locale={locale} />
            </Animation>

            <aside className="h-fit lg:sticky lg:top-28">
              <Suspense fallback={<PopularBlogsSkeleton />}>
                <PopularBlogsAsync locale={locale} />
              </Suspense>
            </aside>
          </div>
        ) : null}

        {/* ③ AD between featured and latest */}
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot={AD_SLOTS.blogListBottom}
        />

        {/* ④ LATEST ARTICLES */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Section header */}
          <div className="flex flex-col gap-1.5 border-b border-primary/20 pb-3 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-3 md:pb-4">
            <h2 className="text-xl font-bold leading-tight text-neutral-900 md:text-3xl">
              {sectionTitle}
            </h2>
            {res.success && total > 0 ? (
              <span className="shrink-0 text-xs font-medium text-neutral-500 md:text-base">
                {total.toLocaleString(LOCALE_TAGS[locale])} {texts.articles}
              </span>
            ) : null}
          </div>

          {/* Body */}
          {!res.success ? (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-6 text-center text-red-700"
            >
              {texts.loadError}
            </p>
          ) : blogs.length === 0 ? (
            <div className="flex flex-col items-center gap-5 rounded-lg border-2 border-dashed border-primary/30 bg-[#bb99111a] px-6 py-16">
              <FileSearch
                className="h-12 w-12 text-primary/40"
                strokeWidth={1.5}
              />
              <p className="text-center text-base text-neutral-600 md:text-lg">
                {texts.emptyBlogs}
              </p>
              {category ? (
                <Link href="/blog" title={texts.allCategories}>
                  <CustomButton size="fit" color="yellow">
                    {texts.allCategories}
                  </CustomButton>
                </Link>
              ) : null}
            </div>
          ) : rest.length === 0 ? (
            /* Only the featured article exists */
            <p className="py-10 text-center text-sm text-neutral-500 md:text-base">
              {texts.emptyBlogs}
            </p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
                {rest.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} locale={locale} />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                category={category}
                locale={locale}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
