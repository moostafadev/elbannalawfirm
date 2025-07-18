import { getTranslations } from "next-intl/server";
import { getLocale } from "next-intl/server";
import CalculatorClient from "@/components/inheritance/CalculatorClient";
import { inheritanceKeywords } from "@/data/seo";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();

  const title = t("InheritanceSection.title");
  const description = t("InheritanceSection.paragraph");

  const metadata = await generateLocalizedMetadataFromContent({
    title,
    description,
    path: "inheritance-calculator",
    image: "/logo/inheritance_opengraph.jpg",
    keywordsByLocale: inheritanceKeywords,
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description: description,
    url: `https://elbannalawfirm.com/${locale}/inheritance-calculator`,
    applicationCategory: "Legal Calculator",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: locale === "ar" ? "مكتب البنا للمحاماة" : "Elbanna Law Firm",
    },
    publisher: {
      "@type": "Organization",
      name: locale === "ar" ? "مكتب البنا للمحاماة" : "Elbanna Law Firm",
      logo: {
        "@type": "ImageObject",
        url: "https://elbannalawfirm.com/logo/opengraph.jpg",
      },
    },
  };

  return {
    ...metadata,
    other: {
      "application-name": title,
      "mobile-web-app-capable": "yes",
    },
    verification: {
      ...metadata.verification,
      other: {
        "structured-data": JSON.stringify(structuredData),
      },
    },
  };
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
