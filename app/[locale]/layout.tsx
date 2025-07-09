import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import Script from "next/script";
import { mainKeywords } from "@/data/seo";

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
  const openGraphLinks = {
    facebook: "https://www.facebook.com/AhmedElbannaLawyer",
    linkedin: "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
    instagram: "https://www.instagram.com/ahmed_elbanna_lawyer",
    youtube: "https://www.youtube.com/@ahmed-elbanna1",
    tiktok: "https://www.tiktok.com/@ahmedelbanna65",
  };

  const metadataByLocale: Record<string, Metadata> = {
    en: {
      title: {
        default: "Elbanna Law Firm",
        template: "%s - Elbanna Law Firm",
      },
      description: mainKeywords.en_description,
      twitter: {
        card: "summary_large_image",
        title: {
          default: "Elbanna Law Firm",
          template: "%s - Elbanna Law Firm",
        },
        description: mainKeywords.en_description,
        images: ["/logo/opengraph.jpg"],
      },

      keywords: mainKeywords.en,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/en",
        title: {
          default: "Elbanna Law Firm",
          template: "%s - Elbanna Law Firm",
        },
        description: mainKeywords.en_description,
        siteName: "Elbanna",
        images: [{ url: "/logo/opengraph.jpg", alt: "Elbanna Law Firm Logo" }],
      },
      other: {
        "og:social": JSON.stringify(openGraphLinks),
      },
      icons: {
        icon: "/logo/logo.png",
      },
    },
    ar: {
      title: {
        default: "مكتب البنا للمحاماة",
        template: "%s - مكتب البنا للمحاماة",
      },
      description: mainKeywords.ar_description,
      twitter: {
        card: "summary_large_image",
        title: {
          default: "مكتب البنا للمحاماة",
          template: "%s - مكتب البنا للمحاماة",
        },
        description: mainKeywords.ar_description,
        images: ["/logo/opengraph.jpg"],
      },

      keywords: mainKeywords.ar,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/ar",
        title: {
          default: "مكتب البنا للمحاماة",
          template: "%s - مكتب البنا للمحاماة",
        },
        description: mainKeywords.ar_description,
        siteName: "مكتب البنا",
        images: [
          { url: "/logo/opengraph.jpg", alt: "شعار مكتب البنا للمحاماة" },
        ],
      },
      other: {
        "og:social": JSON.stringify(openGraphLinks),
      },
      icons: {
        icon: "/logo/logo.png",
      },
    },
    fr: {
      title: {
        default: "Cabinet d'avocats Elbanna",
        template: "%s - Cabinet d'avocats Elbanna",
      },
      description: mainKeywords.fr_description,
      twitter: {
        card: "summary_large_image",
        title: {
          default: "Cabinet d'avocats Elbanna",
          template: "%s - Cabinet d'avocats Elbanna",
        },
        description: mainKeywords.fr_description,
        images: ["/logo/opengraph.jpg"],
      },

      keywords: mainKeywords.fr,
      openGraph: {
        type: "website",
        url: "https://www.elbannalawfirm.com/fr",
        title: {
          default: "Cabinet d'avocats Elbanna",
          template: "%s - Cabinet d'avocats Elbanna",
        },
        description: mainKeywords.fr_description,
        siteName: "Elbanna",
        images: [
          {
            url: "/logo/opengraph.jpg",
            alt: "Logo du cabinet d'avocats Elbanna",
          },
        ],
      },
      other: {
        "og:social": JSON.stringify(openGraphLinks),
      },
      icons: {
        icon: "/logo/logo.png",
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
        <meta name="apple-mobile-web-app-title" content="Elbanna" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5760588310891464"
          crossOrigin="anonymous"
        ></script>
        <meta
          name="google-site-verification"
          content="MMRg72OM49dAdaitjLy17l7bY-dBF7n-PR1wuGostrU"
        />
        <meta name="google-adsense-account" content="ca-pub-5760588310891464" />
      </head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-X4CR834PMJ"
        referrerPolicy="no-referrer-when-downgrade"
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
