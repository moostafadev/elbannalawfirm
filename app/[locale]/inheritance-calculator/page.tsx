import { getLocale, getTranslations } from "next-intl/server";
import CalculatorClient from "@/components/inheritance/CalculatorClient";
import { Metadata } from "next";
import { inheritanceKeywords } from "@/data/seo";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  return {
    title: t("InheritanceSection.title"),
    description: t("InheritanceSection.paragraph"),
    keywords: inheritanceKeywords[locale as keyof typeof inheritanceKeywords],
    alternates: {
      canonical: `https://elbannalawfirm.com/${locale}/inheritance-calculator`,
      languages: {
        en: "https://elbannalawfirm.com/en/inheritance-calculator",
        ar: "https://elbannalawfirm.com/ar/inheritance-calculator",
        fr: "https://elbannalawfirm.com/fr/inheritance-calculator",
      },
    },
    openGraph: {
      title: t("InheritanceSection.title"),
      description: t("InheritanceSection.paragraph"),
      url: `https://elbannalawfirm.com/${locale}/inheritance-calculator`,
      images: [
        {
          url: "/logo/inheritance_opengraph.png",
          alt: t("InheritanceSection.title"),
        },
        { url: "/logo/opengraph.jpg", alt: t("InheritanceSection.title") },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("InheritanceSection.title"),
      description: t("InheritanceSection.paragraph"),
      site: "@elbannalaw",
      creator: "@elbannalaw",
      images: ["/logo/inheritance_opengraph.jpg"],
    },
  };
};

export default async function InheritancePage() {
  const t = await getTranslations("Inheritance");

  return (
    <CalculatorClient
      translations={{
        title: t("title"),
        genderLabel: t("section1.label"),
        male: t("section1.male"),
        female: t("section1.female"),
        estateLabel: t("section2.label"),
        unitPound: t("section2.pound"),
        unitFaddan: t("section2.faddan"),
        heirsLabel: t("section3.label"),
        calculateButton: t("section3.button"),
        alive: t("section3.alive"),
        dead: t("section3.dead"),
        resultsTitle: t("section4.resultsTitle"),
        heirLabel: t("section4.heirLabel"),
        totalShare: t("section4.totalShare"),
        individualShare: t("section4.individualShare"),
        toggleTitle: t("section4.toggleTitle"),
      }}
    />
  );
}
