import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";

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
      title: "Elbanna Law Firm",
      description:
        "Elbanna Law Firm - Offering exceptional legal services tailored to your unique needs, with a commitment to professionalism and excellence.",
      icons: { icon: "/logo/logo.png" },
      keywords: [
        "law firm",
        "legal services",
        "Elbanna",
        "lawyer Egypt",
        "civil law",
        "criminal law",
        "legal consultation",
        "business law",
        "family law",
        "tax law",
        "intellectual property",
        "real estate law",
        "litigation",
        "legal advice",
        "corporate law",
        "Egyptian law firm",
        "divorce lawyer",
        "contract law",
        "commercial law",
        "employment law",
        "arbitration",
        "alternative dispute resolution",
        "insurance law",
        "international law",
        "legal compliance",
        "mergers and acquisitions",
        "personal injury law",
        "banking law",
        "consumer protection law",
        "legal representation",
        "dispute resolution",
        "legal documentation",
        "legal compliance services",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app",
        title: "Elbanna Law Firm",
        description:
          "Elbanna Law Firm - Committed to providing reliable and effective legal solutions with a dedicated team of professionals.",
        siteName: "Elbanna",
        images: [{ url: "/logo/logo.png", alt: "Elbanna Law Firm Logo" }],
      },
    },
    ar: {
      title: "مكتب البنا للمحاماة",
      description:
        "مكتب البنا للمحاماة - نقدم خدمات قانونية متميزة مصممة لتلبية احتياجاتك الفريدة، مع التزامنا بالاحترافية والتميز.",
      icons: { icon: "/logo/logo.png" },
      keywords: [
        "محاماة",
        "مكتب محاماة",
        "البنا",
        "محامي مصر",
        "القانون المدني",
        "القانون الجنائي",
        "استشارات قانونية",
        "قانون الشركات",
        "قانون الأسرة",
        "قانون الضرائب",
        "الملكية الفكرية",
        "القانون التجاري",
        "قانون العقارات",
        "التقاضي",
        "استشارة قانونية",
        "عقود قانونية",
        "محامي طلاق",
        "محامي تجاري",
        "مكتب محاماة في مصر",
        "قانون العمل",
        "التحكيم",
        "حل النزاعات البديلة",
        "قانون التأمين",
        "القانون الدولي",
        "الامتثال القانوني",
        "الدمج والاستحواذ",
        "قانون الإصابات الشخصية",
        "قانون البنوك",
        "قانون حماية المستهلك",
        "تمثيل قانوني",
        "حل النزاعات",
        "توثيق قانوني",
        "خدمات الامتثال القانوني",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app",
        title: "مكتب البنا للمحاماة",
        description:
          "مكتب البنا للمحاماة - ملتزمون بتقديم حلول قانونية موثوقة وفعالة مع فريق من المحترفين المتفانين.",
        siteName: "مكتب البنا",
        images: [{ url: "/logo/logo.png", alt: "شعار مكتب البنا للمحاماة" }],
      },
    },
    fr: {
      title: "Cabinet d'avocats Elbanna",
      description:
        "Cabinet d'avocats Elbanna - Nous offrons des services juridiques exceptionnels adaptés à vos besoins uniques, avec un engagement envers le professionnalisme et l'excellence.",
      icons: { icon: "/logo/logo.png" },
      keywords: [
        "cabinet d'avocats",
        "services juridiques",
        "Elbanna",
        "avocat Egypte",
        "droit civil",
        "droit pénal",
        "consultation juridique",
        "droit des affaires",
        "droit familial",
        "droit fiscal",
        "propriété intellectuelle",
        "droit immobilier",
        "litige",
        "conseil juridique",
        "droit des contrats",
        "droit commercial",
        "avocat divorce",
        "cabinet juridique en Egypte",
        "avocat d'affaires",
        "droit du travail",
        "arbitrage",
        "règlement alternatif des litiges",
        "droit des assurances",
        "droit international",
        "conformité légale",
        "fusions et acquisitions",
        "droit des accidents corporels",
        "droit bancaire",
        "droit de la protection des consommateurs",
        "représentation juridique",
        "règlement des différends",
        "documentation juridique",
        "services de conformité légale",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app",
        title: "Cabinet d'avocats Elbanna",
        description:
          "Cabinet d'avocats Elbanna - Engagés à fournir des solutions juridiques fiables et efficaces avec une équipe de professionnels dévoués.",
        siteName: "Elbanna",
        images: [
          { url: "/logo/logo.png", alt: "Logo du cabinet d'avocats Elbanna" },
        ],
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
      <body className={cn("min-h-screen antialiased", selectedFont)}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
