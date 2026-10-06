import type { LANG } from "@prisma/client";

export interface BlogListItem {
  id: string;
  title: string;
  desc: string;
  category: string;
  image: string;
  lang: LANG;
  createdAt: string;
  commentsCount: number;
  likesCount: number;
}

export interface BlogDetail extends BlogListItem {
  keywords: string[];
  updatedAt: string;
  content: string[];
}

export interface BlogsPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BlogsPage {
  blogs: BlogListItem[];
  pagination: BlogsPagination;
}

export interface GetPublishedBlogsFilters {
  lang: LANG;
  category?: string;
  page?: number;
  limit?: number;
}

export interface BlogSitemapItem {
  id: string;
  lang: LANG;
  updatedAt: string;
}

export interface PopularBlogItem {
  id: string;
  title: string;
  category: string;
  image: string;
  createdAt: string;
  views: number;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface ContentItem {
  html: string;
}
