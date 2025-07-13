import HomeClient from "@/components/HomePage";
import { getTranslations, getLocale } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const locale = await getLocale();
  const translations = {
    heroTitle: t("HeroSection.title"),
    heroParagraph: t("HeroSection.paragraph"),
    lawFirm: {
      ar: "للمحاماة",
      en: "Law firm",
      fr: "Cabinet d'avocats",
    },
    discoverMore: {
      ar: "استكشف المزيد",
      en: "Discover More",
      fr: "Découvrez Plus",
    },
    aboutTitle: t("AboutSection.title"),
    aboutParagraph: t("AboutSection.paragraph"),
    servicesTitle: t("ServicesSection.title"),
    servicesParagraph0: t("ServicesSection.paragraph.0"),
    servicesList: Array.from({ length: 10 }, (_, i) =>
      t(`ServicesSection.paragraph.${i + 1}`)
    ),
    blogTitle: t("BlogSection.title"),
    faqTitle: t("FAQsSection.title"),
    contactTitle: t("ContactSection.title"),
    contactParagraph: t("ContactSection.paragraph"),
    inheritanceTitle: t("InheritanceSection.title"),
    inheritanceParagraph: t("InheritanceSection.paragraph"),
    tryNow: t("InheritanceSection.tryNow"),
  };

  return <HomeClient locale={locale} translations={translations} />;
}
