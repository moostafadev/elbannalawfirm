import { Metadata } from "next";
import { getLocale } from "next-intl/server";

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
  const finalTitle = title ? `${title} - ${firmTitle}` : firmTitle;

  const optimizedDescription =
    description.length > 160
      ? description.substring(0, 157) + "..."
      : description;

  const openGraphLinks = {
    facebook: "https://www.facebook.com/AhmedElbannaLawyer",
    linkedin: "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
    instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
    youtube: "https://www.youtube.com/@ahmed-elbanna1",
    tiktok: "https://www.tiktok.com/@ahmedelbanna65",
  };

  return {
    title: finalTitle,
    description: optimizedDescription,
    keywords,

    openGraph: {
      title: finalTitle,
      description: optimizedDescription,
      url,
      siteName: firmTitle,
      locale,
      type: "website",
      images: [
        {
          url: `https://elbannalawfirm.com${image}`,
          alt: title ?? firmTitle,
          width: 1200,
          height: 630,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: optimizedDescription,
      site: "@elbannalaw",
      creator: "@elbannalaw",
      images: [`https://elbannalawfirm.com${image}`],
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
        ar: `https://elbannalawfirm.com/ar${path ? `/${path}` : ""}`,
        en: `https://elbannalawfirm.com/en${path ? `/${path}` : ""}`,
        fr: `https://elbannalawfirm.com/fr${path ? `/${path}` : ""}`,
      },
    },

    other: {
      "og:social": JSON.stringify(openGraphLinks),
      "article:author": "Ahmed Elbanna",
      "article:publisher": "https://www.facebook.com/AhmedElbannaLawyer",
      "theme-color": "#1f2937",
      "msapplication-TileColor": "#1f2937",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "default",
    },

    appLinks: {
      web: {
        url,
        should_fallback: true,
      },
    },
  };
}
