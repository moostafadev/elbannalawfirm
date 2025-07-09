import { blogsData } from "@/data/blogs";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.elbannalawfirm.com";
  const now = new Date().toISOString();
  const languages = ["ar", "en", "fr"];

  const staticPaths = languages.flatMap((lang) => [
    `/${lang}`,
    `/${lang}/inheritance-calculator`,
  ]);

  const blogPaths = blogsData.flatMap(({ id }) =>
    languages.map((lang) => `/${lang}/blog/${id}`)
  );

  const allPaths = ["", ...staticPaths, ...blogPaths];

  return allPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.startsWith("/blog") ? 0.8 : 0.9,
  }));
}
