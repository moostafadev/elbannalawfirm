import { Suspense } from "react";
import HomeClient from "@/components/HomePage";
import BlogsSection from "@/components/BlogsSection";
import BlogsSkeleton from "@/components/Blogs/BlogsSkeleton";
import LegalServiceJsonLd from "@/components/Seo/LegalServiceJsonLd";
import { mainKeywords } from "@/data/seo";
import { toLocaleKey } from "@/lib/locale";
import { getTranslations, getLocale } from "next-intl/server";

const DESCRIPTIONS: Record<LocaleKey, string> = {
  ar: mainKeywords.ar_description,
  en: mainKeywords.en_description,
  fr: mainKeywords.fr_description,
};

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
      t(`ServicesSection.paragraph.${i + 1}`),
    ),
    blogTitle: t("BlogSection.title"),
    faqTitle: t("FAQsSection.title"),
    contactTitle: t("ContactSection.title"),
    contactParagraph: t("ContactSection.paragraph"),
    inheritanceTitle: t("InheritanceSection.title"),
    inheritanceParagraph: t("InheritanceSection.paragraph"),
    tryNow: t("InheritanceSection.tryNow"),
  };
  const localeKey = toLocaleKey(locale);

  return (
    <>
      <LegalServiceJsonLd
        locale={localeKey}
        description={DESCRIPTIONS[localeKey]}
      />
      <HomeClient
        locale={locale}
        translations={translations}
        blogsSection={
          <Suspense fallback={<BlogsSkeleton />}>
            <BlogsSection locale={locale} />
          </Suspense>
        }
      />
    </>
  );
}
