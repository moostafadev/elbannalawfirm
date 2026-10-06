import "server-only";
import { unstable_cache } from "next/cache";
import type { LANG, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { ActionResult } from "@/types/action";
import type {
  BlogDetail,
  BlogListItem,
  BlogSitemapItem,
  BlogsPage,
  GetPublishedBlogsFilters,
  PopularBlogItem,
} from "@/types/blog";

export const BLOGS_TAG = "blogs";

const REVALIDATE_SECONDS = 300;
const DEFAULT_LIMIT = 9;
const MAX_LIMIT = 24;
const POPULAR_CANDIDATES = 20;
const OBJECT_ID_PATTERN = /^[0-9a-f]{24}$/i;

const listSelect = {
  id: true,
  title: true,
  desc: true,
  category: true,
  image: true,
  lang: true,
  createdAt: true,
  _count: { select: { comments: { where: { approved: true } }, likes: true } },
} satisfies Prisma.BlogSelect;

const detailSelect = {
  ...listSelect,
  keywords: true,
  updatedAt: true,
  htmlContent: { select: { content: true } },
} satisfies Prisma.BlogSelect;

type ListRow = Prisma.BlogGetPayload<{ select: typeof listSelect }>;
type DetailRow = Prisma.BlogGetPayload<{ select: typeof detailSelect }>;

const toListItem = ({ _count, createdAt, ...blog }: ListRow): BlogListItem => ({
  ...blog,
  createdAt: createdAt.toISOString(),
  commentsCount: _count.comments,
  likesCount: _count.likes,
});

const toDetail = ({
  htmlContent,
  updatedAt,
  keywords,
  ...row
}: DetailRow): BlogDetail => ({
  ...toListItem(row),
  keywords,
  updatedAt: updatedAt.toISOString(),
  content: htmlContent.content,
});

const cacheOptions = { revalidate: REVALIDATE_SECONDS, tags: [BLOGS_TAG] };

const fetchPublishedBlogs = unstable_cache(
  async (
    lang: LANG,
    category: string,
    page: number,
    limit: number,
  ): Promise<BlogsPage> => {
    const where: Prisma.BlogWhereInput = {
      status: "show",
      lang,
      ...(category && { category }),
    };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        select: listSelect,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blog.count({ where }),
    ]);

    return {
      blogs: blogs.map(toListItem),
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };
  },
  ["published-blogs"],
  cacheOptions,
);

const fetchBlogById = unstable_cache(
  async (id: string): Promise<BlogDetail | null> => {
    const blog = await prisma.blog.findFirst({
      where: { id, status: "show" },
      select: detailSelect,
    });

    return blog ? toDetail(blog) : null;
  },
  ["published-blog"],
  cacheOptions,
);

const fetchRelatedBlogs = unstable_cache(
  async (
    id: string,
    lang: LANG,
    category: string,
    limit: number,
  ): Promise<BlogListItem[]> => {
    const blogs = await prisma.blog.findMany({
      where: { status: "show", lang, category, id: { not: id } },
      select: listSelect,
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return blogs.map(toListItem);
  },
  ["related-blogs"],
  cacheOptions,
);

const fetchCategories = unstable_cache(
  async (lang: LANG): Promise<string[]> => {
    const rows = await prisma.blog.findMany({
      where: { status: "show", lang },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });

    return rows.map((row) => row.category);
  },
  ["blog-categories"],
  cacheOptions,
);

const fetchMostViewed = unstable_cache(
  async (lang: LANG, limit: number): Promise<PopularBlogItem[]> => {
    const prefix = `/${lang}/blog/`;
    const views = await prisma.views.findMany({
      where: { slug: { startsWith: prefix } },
      orderBy: { count: "desc" },
      take: POPULAR_CANDIDATES,
      select: { slug: true, count: true },
    });

    const counts = new Map<string, number>();

    for (const { slug, count } of views) {
      const id = slug.slice(prefix.length);
      if (OBJECT_ID_PATTERN.test(id)) counts.set(id, count);
    }

    if (counts.size === 0) return [];

    const blogs = await prisma.blog.findMany({
      where: { id: { in: Array.from(counts.keys()) }, status: "show", lang },
      select: {
        id: true,
        title: true,
        category: true,
        image: true,
        createdAt: true,
      },
    });

    return blogs
      .map(({ createdAt, ...blog }) => ({
        ...blog,
        createdAt: createdAt.toISOString(),
        views: counts.get(blog.id) ?? 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  },
  ["most-viewed-blogs"],
  cacheOptions,
);

const fetchSitemapItems = unstable_cache(
  async (): Promise<BlogSitemapItem[]> => {
    const rows = await prisma.blog.findMany({
      where: { status: "show" },
      select: { id: true, lang: true, updatedAt: true },
      orderBy: { createdAt: "desc" },
    });

    return rows.map(({ updatedAt, ...row }) => ({
      ...row,
      updatedAt: updatedAt.toISOString(),
    }));
  },
  ["blogs-sitemap"],
  cacheOptions,
);

export async function getPublishedBlogs({
  lang,
  category,
  page = 1,
  limit = DEFAULT_LIMIT,
}: GetPublishedBlogsFilters): Promise<ActionResult<BlogsPage>> {
  const safePage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const safeLimit = Number.isFinite(limit)
    ? Math.min(MAX_LIMIT, Math.max(1, Math.floor(limit)))
    : DEFAULT_LIMIT;

  try {
    const data = await fetchPublishedBlogs(
      lang,
      category?.trim() ?? "",
      safePage,
      safeLimit,
    );

    return { success: true, data };
  } catch (error) {
    console.error("[getPublishedBlogs]", error);
    return { success: false, error: "Failed to fetch blogs" };
  }
}

export async function getBlogById(
  id: string,
): Promise<ActionResult<BlogDetail>> {
  if (!OBJECT_ID_PATTERN.test(id)) {
    return { success: false, error: "Blog not found" };
  }

  try {
    const blog = await fetchBlogById(id);

    return blog
      ? { success: true, data: blog }
      : { success: false, error: "Blog not found" };
  } catch (error) {
    console.error("[getBlogById]", error);
    return { success: false, error: "Failed to fetch blog" };
  }
}

export async function getRelatedBlogs(
  blog: Pick<BlogDetail, "id" | "lang" | "category">,
  limit = 3,
): Promise<BlogListItem[]> {
  try {
    return await fetchRelatedBlogs(blog.id, blog.lang, blog.category, limit);
  } catch (error) {
    console.error("[getRelatedBlogs]", error);
    return [];
  }
}

export async function getBlogCategories(lang: LANG): Promise<string[]> {
  try {
    return await fetchCategories(lang);
  } catch (error) {
    console.error("[getBlogCategories]", error);
    return [];
  }
}

export async function getMostViewedBlogs(
  lang: LANG,
  limit = 5,
): Promise<PopularBlogItem[]> {
  try {
    return await fetchMostViewed(lang, limit);
  } catch (error) {
    console.error("[getMostViewedBlogs]", error);
    return [];
  }
}

export async function getBlogsForSitemap(): Promise<BlogSitemapItem[]> {
  try {
    return await fetchSitemapItems();
  } catch (error) {
    console.error("[getBlogsForSitemap]", error);
    return [];
  }
}
