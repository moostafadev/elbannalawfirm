import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import Script from "next/script";
import { mainKeywords } from "@/data/seo";
import AdSense from "@/components/ad/AdSense";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";

const fontSans = FontSans({
  weight: ["300", "400", "700", "900"],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const fontCairo = FontCairo({
  weight: ["300", "400", "700", "900"],
  variable: "--font-cairo",
  subsets: ["arabic"],
  display: "swap",
});

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const descriptionMap = {
    ar: mainKeywords.ar_description,
    en: mainKeywords.en_description,
    fr: mainKeywords.fr_description,
  };

  const keywordMap: Record<string, string[]> = {
    ar: mainKeywords.ar,
    en: mainKeywords.en,
    fr: mainKeywords.fr,
  };

  const safeLocale = (
    ["ar", "en", "fr"].includes(locale) ? locale : "en"
  ) as LocaleKey;

  return generateLocalizedMetadataFromContent({
    description: descriptionMap[safeLocale],
    path: "",
    image: "/logo/opengraph.jpg",
    keywordsByLocale: keywordMap,
  });
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />

        <AdSense pId="5760588310891464" />

        <meta name="apple-mobile-web-app-title" content="Elbanna" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        <meta
          name="google-site-verification"
          content="MMRg72OM49dAdaitjLy17l7bY-dBF7n-PR1wuGostrU"
        />

        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />

        <meta name="theme-color" content="#1f2937" />
        <meta name="msapplication-TileColor" content="#1f2937" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LegalService",
              name:
                locale === "ar" ? "مكتب البنا للمحاماة" : "Elbanna Law Firm",
              description:
                locale === "ar"
                  ? mainKeywords.ar_description
                  : mainKeywords.en_description,
              url: "https://elbannalawfirm.com",
              logo: "https://elbannalawfirm.com/logo/opengraph.jpg",
              image: "https://elbannalawfirm.com/logo/opengraph.jpg",
              telephone: "+20-100-072-8654",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "3 عمارات الشريف، شارع اسوان، قسم مصر الجديدة، محافظة القاهرة.",
                addressLocality: "القاهرة",
                addressRegion: "القاهرة",
                addressCountry: "EG",
              },
              sameAs: [
                "https://www.facebook.com/AhmedElbannaLawyer",
                "https://www.linkedin.com/company/ahmed-elbanna-lawyer-369527297",
                "https://www.instagram.com/ahmed_elbanna_lawyer",
                "https://www.youtube.com/@ahmed-elbanna1",
                "https://www.tiktok.com/@ahmedelbanna65",
              ],
              founder: {
                "@type": "Person",
                name: "Ahmed Elbanna",
              },
              areaServed: {
                "@type": "Country",
                name: "Egypt",
              },
              serviceType: [
                "Legal Consultation",
                "Inheritance Law",
                "Family Law",
                "Corporate Law",
              ],
            }),
          }}
        />
      </head>

      {/* تحسين Google Analytics */}
      <Script
        id="gtag-base"
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-X4CR834PMJ"
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X4CR834PMJ', {
              page_title: document.title,
              page_location: window.location.href,
              send_page_view: true
            });
          `,
        }}
      />

      <body className={cn("min-h-screen antialiased", selectedFont)}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
