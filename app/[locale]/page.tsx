import Header from "@/components/Header";
import HomePageOverlay from "@/components/HomePageOverlay";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <section className="relative min-h-[calc(100vh-6rem)] py-6 flex lg:items-center">
          <div className="container lg:-mt-32 mt-4 z-20 relative">
            <div className="flex flex-col sm:gap-5 gap-2">
              <div className="flex items-end gap-2">
                <h1
                  className={`${
                    locale === "ar" ? "text-4xl" : "text-2xl"
                  } sm:text-6xl font-black text-primary`}
                >
                  {t("HeroSection.title")}
                </h1>
                <p
                  className={`${
                    locale === "ar" ? "text-xl" : "text-lg"
                  } sm:text-3xl font-bold`}
                >
                  {locale === "ar" ? "للمحاماة" : "Law firm"}
                </p>
              </div>
              <h2
                className={`${
                  locale === "ar" ? "text-lg" : "text-base"
                } sm:text-2xl font-semibold`}
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
            } flex justify-center items-center gap-1 z-20 animate-bounce text-white md:text-[#bb9911]`}
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

        <section className="min-h-screen flex py-16" id="about">
          <div className="container flex flex-col gap-8">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-primary">
              {t("AboutSection.title")}
            </h1>
            <div className="flex lg:gap-16 gap-10 flex-col lg:flex-row items-center h-full">
              <div className="flex-1 lg:order-1 order-2 flex justify-center items-center lg:px-10">
                <Image
                  src={"/imgs/ahmed_2.png"}
                  alt="elbanna"
                  width={400}
                  height={400}
                  className="w-full lg:max-w-[500px]"
                />
              </div>
              <div className="flex-1 text-lg md:text-xl font-semibold !leading-8 lg:order-2 order-1">
                {t("AboutSection.paragraph")
                  .split(".")
                  .map((text, idx) => {
                    if (
                      idx ===
                      t("AboutSection.paragraph").split(".").length - 1
                    ) {
                      return `${text}`;
                    } else {
                      return (
                        <p key={idx}>
                          {text}.<br />
                        </p>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
        </section>

        <section
          className="min-h-screen flex py-16 bg-[#bb99111a]"
          id="services"
        >
          <div className="container flex flex-col gap-8">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-primary">
              {t("ServicesSection.title")}
            </h1>
            <div className="flex lg:gap-12 gap-10 flex-col lg:flex-row items-center h-full">
              <div className="flex-1 !leading-8 gap-4 flex flex-col">
                <div className="text-lg md:text-xl">
                  <p className="font-semibold">
                    {t("ServicesSection.paragraph.main").split(",")[0]},
                  </p>
                  <p className="text-base">
                    {
                      t("ServicesSection.paragraph.main")
                        .split(",")[1]
                        .split(".")[0]
                    }
                    .
                    {
                      t("ServicesSection.paragraph.main")
                        .split(",")[1]
                        .split(".")[1]
                    }
                    .
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {
                      t("ServicesSection.paragraph.main")
                        .split(",")[1]
                        .split(".")[2]
                    }
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center min-w-fit">
                      <Image
                        src={"/icons/shop.svg"}
                        alt="icon"
                        width={34}
                        height={34}
                      />
                      <p className="lg:text-lg font-semibold">
                        {t("ServicesSection.paragraph.one").split(":")[0]}:
                      </p>
                    </div>
                    <div className="text-sm md:text-base">
                      {t("ServicesSection.paragraph.one").split(":")[1]}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center min-w-fit gap-1">
                      <Image
                        src={"/icons/law.svg"}
                        alt="icon"
                        width={30}
                        height={30}
                      />
                      <p className="lg:text-lg font-semibold">
                        {t("ServicesSection.paragraph.two").split(":")[0]}:
                      </p>
                    </div>
                    <div className="text-sm md:text-base">
                      {t("ServicesSection.paragraph.two").split(":")[1]}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center min-w-fit gap-1">
                      <Image
                        src={"/icons/family.svg"}
                        alt="icon"
                        width={34}
                        height={34}
                      />
                      <p className="lg:text-lg font-semibold">
                        {t("ServicesSection.paragraph.three").split(":")[0]}:
                      </p>
                    </div>
                    <div className="text-sm md:text-base">
                      {t("ServicesSection.paragraph.three").split(":")[1]}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center min-w-fit gap-1">
                      <Image
                        src={"/icons/company.svg"}
                        alt="icon"
                        width={32}
                        height={32}
                      />
                      <p className="lg:text-lg font-semibold">
                        {t("ServicesSection.paragraph.four").split(":")[0]}:
                      </p>
                    </div>
                    <div className="text-sm md:text-base">
                      {t("ServicesSection.paragraph.four").split(":")[1]}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center items-center">
                <Image
                  src={"/imgs/ahmed_3.JPG"}
                  alt="elbanna"
                  width={400}
                  height={400}
                  className="w-full lg:max-w-[500px] rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
