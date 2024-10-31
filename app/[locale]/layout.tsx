import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import Script from "next/script";
import { keywordsAr, keywordsEn, keywordsFr } from "@/data/seo";

const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  subsets: ["latin"],
});

const fontCairo = FontCairo({
  weight: ["300", "400", "700", "900"],
  variable: "--font-cairo",
  subsets: ["arabic"],
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const metadataByLocale: Record<string, Metadata> = {
    en: {
      title: {
        default: "Elbanna Law Firm",
        template: "%s - Elbanna Law Firm",
      },
      description:
        "Elbanna Law Firm - Offering exceptional legal services tailored to your unique needs, with a commitment to professionalism and excellence.",
      twitter: {
        card: "summary_large_image",
      },

      keywords: keywordsEn,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/en",
        title: "Elbanna Law Firm",
        description:
          "Elbanna Law Firm - Committed to providing reliable and effective legal solutions with a dedicated team of professionals.",
        siteName: "Elbanna",
        images: [{ url: "/logo/opengraph.jpg", alt: "Elbanna Law Firm Logo" }],
      },
      other: {
        "og:social": JSON.stringify({
          facebook: "https://www.facebook.com/AhmedElbannaLawyer",
          linkedin:
            "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
          instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
          youtube: "https://www.youtube.com/@ahmed-elbanna1",
          tiktok: "https://www.tiktok.com/@ahmedelbanna65",
        }),
      },
    },
    ar: {
      title: {
        default: "مكتب البنا للمحاماة",
        template: "%s - مكتب البنا للمحاماة",
      },
      description:
        "مكتب البنا للمحاماة - نقدم خدمات قانونية متميزة مصممة لتلبية احتياجاتك الفريدة، مع التزامنا بالاحترافية والتميز.",
      twitter: {
        card: "summary_large_image",
      },

      keywords: keywordsAr,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/ar",
        title: "مكتب البنا للمحاماة",
        description:
          "مكتب البنا للمحاماة - ملتزمون بتقديم حلول قانونية موثوقة وفعالة مع فريق من المحترفين المتفانين.",
        siteName: "مكتب البنا",
        images: [
          { url: "/logo/opengraph.jpg", alt: "شعار مكتب البنا للمحاماة" },
        ],
      },
      other: {
        "og:social": JSON.stringify({
          facebook: "https://www.facebook.com/AhmedElbannaLawyer",
          linkedin:
            "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
          instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
          youtube: "https://www.youtube.com/@ahmed-elbanna1",
          tiktok: "https://www.tiktok.com/@ahmedelbanna65",
        }),
      },
    },
    fr: {
      title: {
        default: "Cabinet d'avocats Elbanna",
        template: "%s - Cabinet d'avocats Elbanna",
      },
      description:
        "Cabinet d'avocats Elbanna - Nous offrons des services juridiques exceptionnels adaptés à vos besoins uniques, avec un engagement envers le professionnalisme et l'excellence.",
      twitter: {
        card: "summary_large_image",
      },

      keywords: keywordsFr,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/fr",
        title: "Cabinet d'avocats Elbanna",
        description:
          "Cabinet d'avocats Elbanna - Engagés à fournir des solutions juridiques fiables et efficaces avec une équipe de professionnels dévoués.",
        siteName: "Elbanna",
        images: [
          {
            url: "/logo/opengraph.jpg",
            alt: "Logo du cabinet d'avocats Elbanna",
          },
        ],
      },
      other: {
        "og:social": JSON.stringify({
          facebook: "https://www.facebook.com/AhmedElbannaLawyer",
          linkedin:
            "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
          instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
          youtube: "https://www.youtube.com/@ahmed-elbanna1",
          tiktok: "https://www.tiktok.com/@ahmedelbanna65",
        }),
      },
    },
  };

  return metadataByLocale[locale] || metadataByLocale.en;
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  const selectedFont =
    locale === "ar"
      ? `font-cairo ${fontCairo.variable}`
      : `font-sans ${fontSans.variable}`;

  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5760588310891464"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="MMRg72OM49dAdaitjLy17l7bY-dBF7n-PR1wuGostrU"
        />
      </head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-X4CR834PMJ"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4CR834PMJ');
          `}
      </Script>
      <body className={cn("min-h-screen antialiased", selectedFont)}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
