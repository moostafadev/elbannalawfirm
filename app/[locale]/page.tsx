import Header from "@/components/Header";
import HomePageOverlay from "@/components/HomePageOverlay";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("HomePage");
  const locale = useLocale();

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="relative min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-96px)] py-6 flex lg:items-center">
          <div className="container lg:-mt-32 mt-4 z-20 relative">
            <div className="flex flex-col sm:gap-5 gap-2">
              <div className="flex items-end gap-2">
                <h1
                  className={`${
                    locale === "ar" ? "text-4xl" : "text-2xl"
                  } sm:text-6xl font-bold`}
                >
                  {t("HeroSection.title")}
                </h1>
                <p
                  className={`${
                    locale === "ar" ? "text-xl" : "text-lg"
                  } sm:text-3xl font-semibold`}
                >
                  {locale === "ar" ? "للمحاماة" : "Law firm"}
                </p>
              </div>
              <h2
                className={`${
                  locale === "ar" ? "text-lg" : "text-base"
                } sm:text-2xl font-medium`}
              >
                {t("HeroSection.paragraph").split(",")[0]},<br />
                {t("HeroSection.paragraph").split(",")[1]}
              </h2>
            </div>
          </div>
          <Link
            href={"#about"}
            className={`absolute md:bottom-8 bottom-2 ${
              locale === "ar" ? "right-2 md:right-14" : "left-2 md:left-14"
            } flex justify-center items-center gap-1 z-20 animate-bounce text-white md:text-neutral-950`}
            style={{ writingMode: "vertical-lr" }}
          >
            {locale === "ar" && <ChevronDown />}
            <span className="text-lg font-semibold">
              {locale === "ar"
                ? "استكشف المزيد"
                : locale === "en"
                ? "Discover More"
                : "Découvrez Plus"}
            </span>
            {locale !== "ar" && <ChevronDown />}
          </Link>
          <HomePageOverlay />
        </section>
        <section className="min-h-screen" id="about"></section>
      </main>
    </>
  );
}
