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
        <AdSense pId="5760588310891464" />
        <meta name="apple-mobile-web-app-title" content="Elbanna" />
        <meta
          name="google-site-verification"
          content="MMRg72OM49dAdaitjLy17l7bY-dBF7n-PR1wuGostrU"
        />
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
