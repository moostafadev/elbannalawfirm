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
      title: {
        default: "Elbanna Law Firm",
        template: "%s - Elbanna Law Firm",
      },
      description:
        "Elbanna Law Firm - Offering exceptional legal services tailored to your unique needs, with a commitment to professionalism and excellence.",
      twitter: {
        card: "summary_large_image",
      },

      keywords: [
        "Egypt lawyer",
        "legal services Egypt",
        "Elbanna Law Firm",
        "best lawyer in Cairo",
        "Egyptian law expert",
        "corporate law Egypt",
        "criminal defense attorney",
        "divorce lawyer Egypt",
        "business litigation",
        "international law firm",
        "real estate lawyer Cairo",
        "intellectual property rights",
        "employment law Egypt",
        "tax lawyer",
        "contract law specialist",
        "personal injury attorney",
        "commercial dispute resolution",
        "arbitration Egypt",
        "legal consultation Cairo",
        "family law expert",
        "immigration lawyer Egypt",
        "medical malpractice attorney",
        "bankruptcy lawyer",
        "human rights lawyer",
        "maritime law Egypt",
        "civil litigation",
        "mergers and acquisitions lawyer",
        "environmental law Egypt",
        "construction law specialist",
        "cybercrime attorney",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app/en",
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

      keywords: [
        "محامي مصر",
        "خدمات قانونية مصر",
        "مكتب البنا للمحاماة",
        "أفضل محامي في القاهرة",
        "خبير القانون المصري",
        "قانون الشركات مصر",
        "محامي دفاع جنائي",
        "محامي طلاق مصر",
        "التقاضي التجاري",
        "مكتب محاماة دولي",
        "محامي عقارات القاهرة",
        "حقوق الملكية الفكرية",
        "قانون العمل مصر",
        "محامي ضرائب",
        "متخصص قانون العقود",
        "محامي إصابات شخصية",
        "حل النزاعات التجارية",
        "التحكيم في مصر",
        "استشارة قانونية القاهرة",
        "خبير قانون الأسرة",
        "محامي الهجرة مصر",
        "محامي الأخطاء الطبية",
        "محامي الإفلاس",
        "محامي حقوق الإنسان",
        "القانون البحري مصر",
        "التقاضي المدني",
        "محامي الاندماج والاستحواذ",
        "قانون البيئة مصر",
        "متخصص قانون البناء",
        "محامي الجرائم الإلكترونية",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app/ar",
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

      keywords: [
        "avocat Égypte",
        "services juridiques Égypte",
        "Cabinet d'avocats Elbanna",
        "meilleur avocat au Caire",
        "expert en droit égyptien",
        "droit des sociétés Égypte",
        "avocat de la défense pénale",
        "avocat divorce Égypte",
        "contentieux des affaires",
        "cabinet d'avocats international",
        "avocat immobilier Caire",
        "droits de propriété intellectuelle",
        "droit du travail Égypte",
        "avocat fiscaliste",
        "spécialiste du droit des contrats",
        "avocat en dommages corporels",
        "résolution de litiges commerciaux",
        "arbitrage Égypte",
        "consultation juridique Caire",
        "expert en droit de la famille",
        "avocat en immigration Égypte",
        "avocat en faute professionnelle médicale",
        "avocat en faillite",
        "avocat des droits de l'homme",
        "droit maritime Égypte",
        "contentieux civil",
        "avocat en fusions et acquisitions",
        "droit de l'environnement Égypte",
        "spécialiste du droit de la construction",
        "avocat en cybercriminalité",
      ],
      openGraph: {
        type: "website",
        url: "https://elbannalawfirm.vercel.app/fr",
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
      <body className={cn("min-h-screen antialiased", selectedFont)}>
        <NextIntlClientProvider messages={messages}>
          <MainLayout>{children}</MainLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
