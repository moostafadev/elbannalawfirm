import React from "react";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import AdBanner from "@/components/ad/AdBanner";
import Animation from "@/components/Animation";
import BlogCard from "@/components/BlogCard";
import BreadcrumbC from "@/components/Breadcrumb";
import BlogContent from "@/components/Blogs/BlogContent";
import BlogImage from "@/components/Blogs/BlogImage";
import BlogJsonLd from "@/components/Blogs/BlogJsonLd";
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
import { getBlogById, getRelatedBlogs } from "@/services/blog.service";

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

  const { id, title, desc, image, lang, keywords } = res.data;

  return generateLocalizedMetadataFromContent({
    title,
    description: desc,
    path: `blog/${id}`,
    image,
    keywordsByLocale: { [lang]: keywords },
    alternateLocales: [lang],
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
  const related = await getRelatedBlogs(blog);
  const url = `${SITE_URL}/${locale}/blog/${blog.id}`;
  const hasToc = toc.length > 1;
  const adAfter =
    items.length >= MIN_ITEMS_FOR_INLINE_AD
      ? Math.floor(items.length / 2)
      : undefined;

  return (
    <article className="py-6">
      <BlogJsonLd blog={blog} url={url} />
      <div className="container max-w-6xl">
        <div className="flex flex-col gap-6">
          <BreadcrumbC
            links={[
              { title: texts.home, isNotLast: true, href: "/" },
              { title: texts.blogs, isNotLast: true, href: "/blog" },
              { title: blog.title, isNotLast: false },
            ]}
          />

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

          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600">
              <Link
                href={buildBlogsHref(1, blog.category)}
                className="rounded-full bg-primary/10 px-3 py-1 font-semibold text-primary duration-300 hover:bg-primary hover:text-white"
              >
                {blog.category}
              </Link>
              <time dateTime={blog.createdAt}>
                {formatBlogDate(blog.createdAt, locale)}
              </time>
              <span>
                {getReadingTime(blog.content)} {texts.minRead}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-neutral-900 md:text-4xl">
              {blog.title}
            </h1>
            <p className="text-lg text-neutral-600">{blog.desc}</p>
          </header>

          <div
            className={
              hasToc
                ? "grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]"
                : "grid gap-8"
            }
          >
            <div className="flex min-w-0 flex-col gap-6">
              {hasToc ? (
                <details className="rounded-lg border-2 border-primary bg-[#bb99111a] p-4 lg:hidden">
                  <summary className="cursor-pointer text-lg font-bold text-primary">
                    {texts.tableOfContents}
                  </summary>
                  <div className="mt-3">
                    <TableOfContents toc={toc} title={texts.tableOfContents} />
                  </div>
                </details>
              ) : null}

              <BlogContent
                items={items}
                dir={getDirection(locale)}
                adAfter={adAfter}
                ad={
                  adAfter !== undefined ? (
                    <AdBanner
                      dataAdFormat="auto"
                      dataFullWidthResponsive={true}
                      dataAdSlot="2456497086"
                    />
                  ) : undefined
                }
              />

              <ShareButtons url={url} title={blog.title} locale={locale} />
              <AdBanner
                dataAdFormat="auto"
                dataFullWidthResponsive={true}
                dataAdSlot="2456497086"
              />
            </div>

            {hasToc ? (
              <aside className="hidden lg:block">
                <div className="sticky top-28">
                  <TableOfContents toc={toc} title={texts.tableOfContents} />
                </div>
              </aside>
            ) : null}
          </div>

          {related.length > 0 ? (
            <section className="mt-6 flex flex-col gap-6">
              <h2 className="text-2xl font-bold text-primary">
                {texts.relatedArticles}
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <BlogCard key={item.id} blog={item} locale={locale} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default BlogPage;
