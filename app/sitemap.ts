import type { MetadataRoute } from "next";
import { getBlogsForSitemap } from "@/services/blog.service";

const BASE_URL = "https://www.elbannalawfirm.com";
const LANGUAGES = ["ar", "en", "fr"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = await getBlogsForSitemap();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...LANGUAGES.flatMap((lang) => [
      {
        url: `${BASE_URL}/${lang}`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/${lang}/blog`,
        lastModified: now,
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${BASE_URL}/${lang}/inheritance-calculator`,
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.9,
      },
    ]),
  ];

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${BASE_URL}/${blog.lang}/blog/${blog.id}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
