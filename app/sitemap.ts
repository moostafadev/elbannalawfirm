import { blogsData } from "@/data/blogs";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["ar", "en", "fr"];
  const sitemapData: MetadataRoute.Sitemap = [];

  languages.forEach((lang) => {
    const alternates = languages.reduce((acc, currentLang) => {
      acc[currentLang] = `https://www.elbannalawfirm.com/${currentLang}`;
      return acc;
    }, {} as Record<string, string>);

    sitemapData.push({
      url: `https://www.elbannalawfirm.com/${lang}`,
      alternates: {
        languages: alternates,
      },
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });

    sitemapData.push({
      url: `https://www.elbannalawfirm.com/${lang}/inheritance-calculator`,
      alternates: {
        languages: alternates,
      },
      lastModified: new Date().toISOString(),
      changeFrequency: "weekly",
      priority: 0.8,
    });
  });

  blogsData.forEach(({ id }) => {
    languages.forEach((lang) => {
      const alternates = languages.reduce((acc, currentLang) => {
        acc[
          currentLang
        ] = `https://www.elbannalawfirm.com/${currentLang}/blog/${id}`;
        return acc;
      }, {} as Record<string, string>);

      sitemapData.push({
        url: `https://www.elbannalawfirm.com/${lang}/blog/${id}`,
        alternates: {
          languages: alternates,
        },
        lastModified: new Date().toISOString(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  });

  return [
    {
      url: "https://www.elbannalawfirm.com",
      alternates: {
        languages: languages.reduce((acc, lang) => {
          acc[lang] = `https://www.elbannalawfirm.com/${lang}`;
          return acc;
        }, {} as Record<string, string>),
      },
      lastModified: new Date().toISOString(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...sitemapData,
  ];
}
