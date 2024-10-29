import { blogsData } from "@/data/blogs";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const languages = ["ar", "en", "fr"];
  const sitemapData: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    sitemapData.push({
      url: `https://www.elbannalawfirm.com/${lang}`,
    });
  });

  blogsData.forEach(({ id }) => {
    languages.forEach((lang) => {
      sitemapData.push({
        url: `https://www.elbannalawfirm.com/${lang}/blog/${id}`,
      });
    });
  });

  return sitemapData;
}
