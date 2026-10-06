import type { MetadataRoute } from "next";
import { SITE_URL } from "@/constants/site";
import { getBlogsForSitemap } from "@/services/blog.service";

const LANGUAGES = ["ar", "en", "fr"] as const;

const STATIC_PAGES = [
  { path: "", changeFrequency: "daily", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.9 },
  { path: "/inheritance-calculator", changeFrequency: "weekly", priority: 0.9 },
] as const;

const buildLanguages = (path: string): Record<string, string> =>
  Object.fromEntries(
    LANGUAGES.map((lang) => [lang, `${SITE_URL}/${lang}${path}`]),
  );

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = await getBlogsForSitemap();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...STATIC_PAGES.flatMap(({ path, changeFrequency, priority }) =>
      LANGUAGES.map((lang) => ({
        url: `${SITE_URL}/${lang}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: { languages: buildLanguages(path) },
      })),
    ),
  ];

  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${SITE_URL}/${blog.lang}/blog/${blog.id}`,
    lastModified: new Date(blog.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...blogEntries];
}
