import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { legalServices, openGraphLinks, titleMap } from "./constants";

interface GenerateMetadataOptions {
  title?: string;
  description: string;
  path: string;
  image: string;
  keywordsByLocale?: Record<string, string[]>;
}

export async function generateLocalizedMetadataFromContent({
  title,
  description,
  path,
  image,
  keywordsByLocale,
}: GenerateMetadataOptions): Promise<Metadata> {
  const locale = (await getLocale()) as LocaleKey;
  const firmTitle = titleMap[locale] ?? "Elbanna Law Firm";
  const fullTitle = title ? `${title} - ${firmTitle}` : firmTitle;
  const fullURL = `https://elbannalawfirm.com/${locale}/${path}`;
  const imageURL = `https://elbannalawfirm.com${image}`;
  const services = legalServices[locale] ?? legalServices.en;
  const keywords = (keywordsByLocale?.[locale] ?? []).join(", ");

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Ahmed Elbanna", url: "https://elbannalawfirm.com" }],
    creator: "Elbanna Law Firm",
    publisher: "Elbanna Law Firm",
    category: "Legal Services",
    metadataBase: new URL("https://elbannalawfirm.com"),

    openGraph: {
      title: fullTitle,
      description,
      url: fullURL,
      siteName: firmTitle,
      locale,
      type: "website",
      images: [
        {
          url: imageURL,
          alt: fullTitle,
          width: 1200,
          height: 630,
        },
      ],
    },

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
      languages: {
        ar: `https://elbannalawfirm.com/ar/${path}`,
        en: `https://elbannalawfirm.com/en/${path}`,
        fr: `https://elbannalawfirm.com/fr/${path}`,
      },
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
