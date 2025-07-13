import { getTranslations } from "next-intl/server";
import CalculatorClient from "@/components/inheritance/CalculatorClient";
import { inheritanceKeywords } from "@/data/seo";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";

export async function generateMetadata() {
  const t = await getTranslations("HomePage");

  return generateLocalizedMetadataFromContent({
    title: t("InheritanceSection.title"),
    description: t("InheritanceSection.paragraph"),
    path: "inheritance-calculator",
    image: "/logo/inheritance_opengraph.jpg",
    keywordsByLocale: inheritanceKeywords,
  });
}

export default async function InheritancePage() {
  const t = await getTranslations("Inheritance");
  const translations = {
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
  };

  return <CalculatorClient translations={translations} />;
}
