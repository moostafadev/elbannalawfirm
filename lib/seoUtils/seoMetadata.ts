import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import { legalServices, openGraphLinks, titleMap } from "./constants";

const SITE_URL = "https://elbannalawfirm.com";
const ALL_LOCALES: LocaleKey[] = ["ar", "en", "fr"];

interface GenerateMetadataOptions {
  title?: string;
  description: string;
  path: string;
  image: string;
  keywordsByLocale?: Record<string, string[]>;
  alternateLocales?: LocaleKey[];
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
}: GenerateMetadataOptions): Promise<Metadata> {
  const locale = (await getLocale()) as LocaleKey;
  const firmTitle = titleMap[locale] ?? "Elbanna Law Firm";
  const fullTitle = title ? `${title} - ${firmTitle}` : firmTitle;
  const fullURL = `${SITE_URL}/${locale}/${path}`;
  const imageURL = resolveImageUrl(image);
  const services = legalServices[locale] ?? legalServices.en;
  const keywords = (keywordsByLocale?.[locale] ?? []).join(", ");

  return {
    title: fullTitle,
    description,
    keywords,
    authors: [{ name: "Ahmed Elbanna", url: SITE_URL }],
    creator: "Elbanna Law Firm",
    publisher: "Elbanna Law Firm",
    category: "Legal Services",
    metadataBase: new URL(SITE_URL),

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
      languages: Object.fromEntries(
        alternateLocales.map((item) => [item, `${SITE_URL}/${item}/${path}`]),
      ),
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
