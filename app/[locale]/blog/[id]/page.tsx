import React, { Suspense } from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import AdBanner from "@/components/ad/AdBanner";
import Animation from "@/components/Animation";
import BreadcrumbC from "@/components/Breadcrumb";
import AuthorBio from "@/components/Blogs/AuthorBio";
import BlogContent from "@/components/Blogs/BlogContent";
import BlogImage from "@/components/Blogs/BlogImage";
import BlogJsonLd from "@/components/Blogs/BlogJsonLd";
import CommentsBlock from "@/components/Blogs/CommentsBlock";
import CommentsSkeleton from "@/components/Blogs/CommentsSkeleton";
import LikeButton from "@/components/Blogs/LikeButton";
import RelatedBlogs from "@/components/Blogs/RelatedBlogs";
import RelatedBlogsSkeleton from "@/components/Blogs/RelatedBlogsSkeleton";
import ShareButtons from "@/components/Blogs/ShareButtons";
import TableOfContents from "@/components/Blogs/TableOfContents";
import { Link } from "@/i18n/routing";
import { BLOG_TEXTS } from "@/constants/blog";
import { SITE_URL } from "@/constants/site";
import {
  buildBlogsHref,
  formatBlogDate,
  getReadingTime,
  prepareContent,
} from "@/lib/blog";
import { getDirection, toLocaleKey } from "@/lib/locale";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { getBlogById } from "@/services/blog.service";
import { AD_SLOTS } from "@/constants/ads";

interface PageProps {
  params: { id: string; locale: string };
}

const MIN_ITEMS_FOR_INLINE_AD = 6;

export const generateMetadata = async ({
  params,
}: PageProps): Promise<Metadata> => {
  const res = await getBlogById(params.id);

  if (!res.success) {
    return { title: "Article", robots: { index: false, follow: false } };
  }

  const {
    id,
    title,
    desc,
    image,
    lang,
    keywords,
    category,
    createdAt,
    updatedAt,
  } = res.data;

  return generateLocalizedMetadataFromContent({
    title,
    description: desc,
    path: `blog/${id}`,
    image,
    keywordsByLocale: { [lang]: keywords },
    alternateLocales: [lang],
    type: "article",
    publishedTime: createdAt,
    modifiedTime: updatedAt,
    section: category,
  });
};

const BlogPage = async ({ params: { id } }: PageProps) => {
  const locale = toLocaleKey(await getLocale());
  const res = await getBlogById(id);

  if (!res.success) {
    if (res.error === "Blog not found") notFound();
    throw new Error(res.error);
  }

  const blog = res.data;

  if (blog.lang !== locale) redirect(`/${blog.lang}/blog/${blog.id}`);

  const texts = BLOG_TEXTS[locale];
  const { items, toc } = prepareContent(blog.content);
  const url = `${SITE_URL}/${locale}/blog/${blog.id}`;
  const hasToc = toc.length > 1;
  const readingTime = getReadingTime(blog.content);
  const adAfter =
    items.length >= MIN_ITEMS_FOR_INLINE_AD
      ? Math.floor(items.length / 2)
      : undefined;

  return (
    <article className="py-6 md:py-8">
      <BlogJsonLd
        blog={blog}
        url={url}
        breadcrumbs={[
          { name: texts.home, url: `${SITE_URL}/${locale}` },
          { name: texts.blogs, url: `${SITE_URL}/${locale}/blog` },
          { name: blog.title, url },
        ]}
      />

      <div className="container max-w-6xl">
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Breadcrumb */}
          <BreadcrumbC
            links={[
              { title: texts.home, isNotLast: true, href: "/" },
              { title: texts.blogs, isNotLast: true, href: "/blog" },
              { title: blog.title, isNotLast: false },
            ]}
          />

          {/* Hero image */}
          <figure>
            <Animation>
              <BlogImage
                src={blog.image}
                alt={blog.title}
                variant="cover"
                priority
                className="rounded-lg"
              />
            </Animation>
          </figure>

          {/* Header */}
          <header className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-neutral-600 md:text-sm">
                <Link
                  href={buildBlogsHref(1, blog.category)}
                  className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary duration-300 hover:bg-primary hover:text-white"
                >
                  {blog.category}
                </Link>
                <time dateTime={blog.createdAt}>
                  {formatBlogDate(blog.createdAt, locale)}
                </time>
                <span className="hidden sm:inline" aria-hidden="true">
                  •
                </span>
                <span>
                  {readingTime} {texts.minRead}
                </span>
              </div>

              <ShareButtons url={url} title={blog.title} locale={locale} />
            </div>

            <h1 className="text-2xl font-bold leading-tight text-neutral-900 md:text-3xl lg:text-4xl">
              {blog.title}
            </h1>

            <p className="text-base leading-relaxed text-neutral-600 md:text-lg">
              {blog.desc}
            </p>
          </header>

          {/* Content + Sidebar */}
          <div
            className={
              hasToc
                ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-10"
                : "grid gap-8"
            }
          >
            <div className="flex min-w-0 flex-col gap-6">
              {/* Mobile TOC */}
              {hasToc ? (
                <details className="rounded-lg border-2 border-primary bg-[#bb99111a] p-4 lg:hidden">
                  <summary className="cursor-pointer text-base font-bold text-primary md:text-lg">
                    {texts.tableOfContents}
                  </summary>
                  <div className="mt-3">
                    <TableOfContents toc={toc} title={texts.tableOfContents} />
                  </div>
                </details>
              ) : null}

              {/* Body */}
              <BlogContent
                items={items}
                dir={getDirection(locale)}
                adAfter={adAfter}
                ad={
                  adAfter !== undefined ? (
                    <AdBanner
                      dataAdFormat="auto"
                      dataFullWidthResponsive={true}
                      dataAdSlot={AD_SLOTS.blogInline}
                    />
                  ) : undefined
                }
              />

              {/* Like — centered below content */}
              <div className="flex justify-center border-t pt-8">
                <LikeButton
                  blogId={blog.id}
                  initialCount={blog.likesCount}
                  locale={locale}
                />
              </div>

              {/* Author bio */}
              <AuthorBio locale={locale} />

              {/* Comments (streamed) */}
              <Suspense fallback={<CommentsSkeleton />}>
                <CommentsBlock blogId={blog.id} locale={locale} />
              </Suspense>

              {/* Bottom ad */}
              <AdBanner
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                dataAdSlot={AD_SLOTS.blogArticleBottom}
              />
            </div>

            {/* Desktop TOC */}
            {hasToc ? (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents toc={toc} title={texts.tableOfContents} />
                </div>
              </aside>
            ) : null}
          </div>

          {/* Related (streamed) */}
          <Suspense fallback={<RelatedBlogsSkeleton />}>
            <RelatedBlogs blog={blog} locale={locale} />
          </Suspense>
        </div>
      </div>
    </article>
  );
};

export default BlogPage;
