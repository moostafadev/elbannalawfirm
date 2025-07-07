import { getTranslations } from "next-intl/server";
import CalculatorClient from "@/components/inheritance/CalculatorClient";
import { Metadata } from "next";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations("Inheritance");
  const tHome = await getTranslations("HomePage");

  return {
    title: t("title"),
    description: t("InheritanceSection.paragraph"),
    openGraph: {
      title: t("title"),
      description: tHome("InheritanceSection.paragraph"),
      url: `https://elbannalawfirm.com/ar/inheritance-calculator`,
      images: [{ url: "/logo/inheritance.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: tHome("InheritanceSection.paragraph"),
      images: ["/logo/inheritance.png"],
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
