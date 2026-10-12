"use server";

import { getMostViewedBlogs } from "@/services/blog.service";
import { toLocaleKey } from "@/lib/locale";
import PopularBlogsList from "./PopularBlogsList";

const POPULAR_LIMIT = 5;

const PopularBlogsAsync = async ({ locale }: { locale: string }) => {
  const key = toLocaleKey(locale);
  const popular = await getMostViewedBlogs(key, POPULAR_LIMIT);

  if (popular.length === 0) return null;

  return <PopularBlogsList popular={popular} locale={key} />;
};

export default PopularBlogsAsync;
