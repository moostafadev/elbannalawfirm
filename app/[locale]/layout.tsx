import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";

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

export const metadata: Metadata = {
  title: "Elbanna",
  description:
    "مكتب البنا للمحاماة - نقدم خدمات قانونية متميزة مصممة لتلبية احتياجاتك الفريدة، مع التزامنا بالاحترافية والتميز.",
  icons: {
    icon: "/logo/logo_elbanna.jpg",
  },
  openGraph: {
    type: "website",
    url: "https://elbannalawfirm.vercel.app/",
    title: "Elbanna",
    description:
      "مكتب البنا للمحاماة - ملتزمون بتقديم حلول قانونية موثوقة وفعالة مع فريق من المحترفين المتفانين.",
    siteName: "Elbanna",
    images: [
      {
        url: "/logo/logo_elbanna.jpg",
      },
    ],
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  const selectedFont =
    locale === "ar"
      ? `font-cairo ${fontCairo.variable}`
      : `font-sans ${fontSans.variable}`;
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body className={cn("min-h-screen antialiased", selectedFont)}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
