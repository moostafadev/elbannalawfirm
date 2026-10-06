import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { LOCALE_TAGS } from "@/constants/blog";
import { SITE_URL } from "@/constants/site";
import { DEFAULT_LOCALE } from "@/lib/locale";
import { legalServices, openGraphLinks, titleMap } from "./constants";

const ALL_LOCALES: LocaleKey[] = ["ar", "en", "fr"];

interface GenerateMetadataOptions {
  title?: string;
  description: string;
  path: string;
  image: string;
  keywordsByLocale?: Record<string, string[]>;
  alternateLocales?: LocaleKey[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
}

const resolveImageUrl = (image: string): string =>
  /^https?:\/\//i.test(image) ? image : `${SITE_URL}${image}`;

export async function generateLocalizedMetadataFromContent({
  title,
  description,
  path,
  image,
  keywordsByLocale,
  alternateLocales = ALL_LOCALES,
  type = "website",
  publishedTime,
  modifiedTime,
  section,
}: GenerateMetadataOptions): Promise<Metadata> {
  const locale = (await getLocale()) as LocaleKey;
  const firmTitle = titleMap[locale] ?? "Elbanna Law Firm";
  const fullTitle = title ? `${title} - ${firmTitle}` : firmTitle;
  const fullURL = `${SITE_URL}/${locale}/${path}`;
  const imageURL = resolveImageUrl(image);
  const services = legalServices[locale] ?? legalServices.en;
  const keywordList = keywordsByLocale?.[locale] ?? [];
  const keywords = keywordList.join(", ");

  const languages: Record<string, string> = Object.fromEntries(
    alternateLocales.map((item) => [item, `${SITE_URL}/${item}/${path}`]),
  );

  if (alternateLocales.length > 1) {
    languages["x-default"] = `${SITE_URL}/${DEFAULT_LOCALE}/${path}`;
  }

  const openGraphBase = {
    title: fullTitle,
    description,
    url: fullURL,
    siteName: firmTitle,
    locale: LOCALE_TAGS[locale].replace("-", "_"),
    images: [{ url: imageURL, alt: fullTitle, width: 1200, height: 630 }],
  };

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? {
          ...openGraphBase,
          type: "article",
          publishedTime,
          modifiedTime,
          authors: ["Ahmed Elbanna"],
          section,
          tags: keywordList.length > 0 ? keywordList : undefined,
        }
      : { ...openGraphBase, type: "website" };

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Ahmed Elbanna", url: SITE_URL }],
    creator: "Elbanna Law Firm",
    publisher: "Elbanna Law Firm",
    category: "Legal Services",
    metadataBase: new URL(SITE_URL),

    openGraph,

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      site: "@elbannalaw",
      creator: "@elbannalaw",
      images: [imageURL],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: fullURL,
      languages,
    },

    other: {
      "og:social": JSON.stringify(openGraphLinks),
      "article:author": "Ahmed Elbanna",
      "article:publisher": openGraphLinks.facebook,
      "theme-color": "#8d7101",
      "msapplication-TileColor": "#8d7101",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",

      "DC.title": fullTitle,
      "DC.creator": "Ahmed Elbanna",
      "DC.subject": `Legal Services, Law Firm, Egypt, ${services
        .slice(0, 3)
        .join(", ")}`,
      "DC.description": description,
      "DC.publisher": "Elbanna Law Firm",
      "DC.contributor": "Ahmed Elbanna",
      "DC.format": "text/html",
      "DC.identifier": fullURL,
      "DC.language": locale,
      "DC.coverage": "Egypt",
      "DC.rights": "Copyright Elbanna Law Firm",
    },

    appLinks: {
      web: {
        url: fullURL,
        should_fallback: true,
      },
    },
  };
}
