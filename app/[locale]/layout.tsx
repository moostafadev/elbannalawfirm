import type { Metadata } from "next";
import { Merriweather as FontSans, Cairo as FontCairo } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { cn } from "@/lib/utils";
import MainLayout from "@/components/MainLayout";
import Script from "next/script";

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
        "Top lawyer in Egypt",
        "Best lawyer",
        "Legal consultant",
        "Professional legal services",
        "Commercial litigation lawyer",
        "Legal consultations",
        "Civil cases lawyer",
        "International lawyer",
        "Divorce lawyer",
        "Real estate lawyer",
        "Corporate lawyer",
        "Expert in Egyptian law",
        "Intellectual property law",
        "Contract law",
        "Experienced criminal lawyer",
        "Family law specialist",
        "Family cases",
        "Corruption cases lawyer",
        "Judgment enforcement lawyer",
        "Criminal law expert",
        "Major commercial cases lawyer",
        "Financial cases lawyer",
        "Family disputes lawyer",
        "Investment law specialist",
        "Compensation cases lawyer",
        "Economic cases lawyer",
        "Labor law specialist",
        "Online legal consultations",
        "Illicit gains cases lawyer",
        "Labor law expert",
        "Drug cases lawyer",
        "Financial crime lawyer",
        "Insurance lawyer",
        "Contract notarization lawyer",
        "Electronic transactions law expert",
        "Immigration lawyer",
        "Rental disputes lawyer",
        "Employment contract specialist",
        "Foreign investment lawyer",
        "Corporate disputes lawyer",
        "International arbitration lawyer",
        "Medical cases lawyer",
        "Labor disputes lawyer",
        "Labor law lawyer",
        "Intellectual property cases expert",
        "Real estate contracts lawyer",
        "Distinguished real estate lawyer",
        "Marriage and divorce lawyer",
        "Co-ownership law specialist",
        "Residential rental disputes lawyer",
        "Financial advisory lawyer",
        "Medical disputes lawyer",
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
        "محامي شاطر في مصر",
        "افضل محامي",
        "مستشار قانوني",
        "خدمات قانونية احترافية",
        "محامي قضايا تجارية",
        "استشارات قانونية",
        "محامي قضايا مدنية",
        "محامي دولي",
        "محامي قضايا طلاق",
        "محامي عقاري",
        "محامي متخصص في الشركات",
        "محامي خبير بالقانون المصري",
        "قانون الملكية الفكرية",
        "قانون العقود",
        "محامي جنائي ممتاز",
        "محامي متخصص في قانون الأحوال الشخصية",
        "قضايا الاسرة",
        "محامي قضايا فساد",
        "محامي تنفيذ احكام",
        "خبير في القانون الجنائي",
        "محامي قضايا تجارية كبرى",
        "محامي قضايا مالية",
        "محامي مختص بقضايا الأسرة",
        "محامي متخصص في قانون الاستثمار",
        "محامي قضايا تعويضات",
        "محامي قضايا اقتصادية",
        "محامي شؤون العمال",
        "استشارات قانونية اونلاين",
        "محامي قضايا الكسب غير المشروع",
        "محامي خبرة في قانون العمل",
        "محامي قضايا مخدرات",
        "محامي جريمة مالية",
        "محامي تأمينات",
        "محامي توثيق عقود",
        "خبير في قانون المعاملات الإلكترونية",
        "محامي قضايا الهجرة",
        "محامي قضايا الإيجارات",
        "محامي متخصص في عقود العمل",
        "محامي استثمارات أجنبية",
        "محامي قضايا شركات",
        "محامي تحكيم دولي",
        "محامي قضايا طبية",
        "محامي قضايا عمالية",
        "محامي قانون العمل",
        "خبير في قضايا الملكية الفكرية",
        "محامي عقود البيع والشراء",
        "محامي عقارات متميز",
        "محامي زواج وطلاق",
        "محامي قانون الملكية المشتركة",
        "محامي قضايا الإيجارات السكنية",
        "محامي قضايا الاستشارات المالية",
        "محامي قضايا طبية",
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
        "Meilleur avocat en Égypte",
        "Meilleur avocat",
        "Consultant juridique",
        "Services juridiques professionnels",
        "Avocat en litiges commerciaux",
        "Consultations juridiques",
        "Avocat en affaires civiles",
        "Avocat international",
        "Avocat en divorce",
        "Avocat immobilier",
        "Avocat en droit des entreprises",
        "Expert en droit égyptien",
        "Droit de la propriété intellectuelle",
        "Droit des contrats",
        "Avocat pénal expérimenté",
        "Spécialiste en droit de la famille",
        "Affaires familiales",
        "Avocat pour les affaires de corruption",
        "Avocat en exécution de jugements",
        "Expert en droit pénal",
        "Avocat pour grandes affaires commerciales",
        "Avocat en affaires financières",
        "Avocat en litiges familiaux",
        "Spécialiste en droit des investissements",
        "Avocat en affaires d'indemnisation",
        "Avocat en affaires économiques",
        "Spécialiste en droit du travail",
        "Consultations juridiques en ligne",
        "Avocat pour les affaires de gains illicites",
        "Expert en droit du travail",
        "Avocat pour affaires de drogues",
        "Avocat en crimes financiers",
        "Avocat en assurances",
        "Avocat en notarisation de contrats",
        "Expert en transactions électroniques",
        "Avocat en immigration",
        "Avocat en litiges de location",
        "Spécialiste en contrats de travail",
        "Avocat en investissement étranger",
        "Avocat en litiges corporatifs",
        "Avocat en arbitrage international",
        "Avocat en affaires médicales",
        "Avocat en litiges du travail",
        "Avocat en droit du travail",
        "Expert en affaires de propriété intellectuelle",
        "Avocat en contrats immobiliers",
        "Avocat immobilier distingué",
        "Avocat en mariage et divorce",
        "Spécialiste en droit de copropriété",
        "Avocat en litiges de location résidentielle",
        "Avocat en conseils financiers",
        "Avocat en litiges médicaux",
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
      <head>
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
