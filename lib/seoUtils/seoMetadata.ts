import { Metadata } from "next";
import { getLocale } from "next-intl/server";

type LocaleKey = "ar" | "en" | "fr";

export async function generateLocalizedMetadataFromContent({
  title,
  description,
  path,
  image,
  keywordsByLocale,
}: {
  title?: string;
  description: string;
  path: string;
  image: string;
  keywordsByLocale?: Record<string, string[]>;
}): Promise<Metadata> {
  const locale = await getLocale();
  const url = `https://elbannalawfirm.com/${locale}/${path}`;
  const keywords = keywordsByLocale?.[locale] || [];

  const titleMap: Record<LocaleKey, string> = {
    ar: "مكتب البنا للمحاماة",
    en: "Elbanna Law Firm",
    fr: "Cabinet d'avocats Elbanna",
  };

  const firmTitle = titleMap[locale as LocaleKey] ?? "Elbanna Law Firm";

  const openGraphLinks = {
    facebook: "https://www.facebook.com/AhmedElbannaLawyer",
    linkedin: "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
    instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
    youtube: "https://www.youtube.com/@ahmed-elbanna1",
    tiktok: "https://www.tiktok.com/@ahmedelbanna65",
  };

  return {
    title: title
      ? {
          default: firmTitle,
          template: `%s - ${firmTitle}`,
        }
      : firmTitle,
    description,
    keywords,
    openGraph: {
      title: title ? `${title} - ${firmTitle}` : firmTitle,
      description,
      url,
      siteName: firmTitle,
      locale,
      type: "website",
      images: [{ url: image, alt: title ?? firmTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? `${title} - ${firmTitle}` : firmTitle,
      description,
      site: "@elbannalaw",
      creator: "@elbannalaw",
      images: [image],
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
    metadataBase: new URL("https://elbannalawfirm.com"),
    alternates: {
      canonical: url,
      languages: {
        ar: "https://elbannalawfirm.com/ar",
        en: "https://elbannalawfirm.com/en",
        fr: "https://elbannalawfirm.com/fr",
      },
    },
    other: {
      viewport: "width=device-width, initial-scale=1",
      "og:social": JSON.stringify(openGraphLinks),
    },
  };
}
