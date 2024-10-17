import { AccordionFAQ } from "@/components/Accordion";
import Animation from "@/components/Animation";
import BlogsSection from "@/components/BlogsSection";
import Heading from "@/components/Heading";
import HomePageOverlay from "@/components/HomePageOverlay";
import { teamData } from "@/data/team";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";

export default function Home() {
  const locale = useLocale();
  const t = useTranslations("HomePage");

  return (
    <>
      <section className="relative min-h-[calc(100vh-6rem)] py-6 flex lg:items-center">
        <div className="container lg:-mt-32 mt-4 z-20 relative">
          <div className="flex flex-col sm:gap-5 gap-2">
            <div className="flex items-end gap-2">
              <Animation>
                <h1
                  className={`${
                    locale === "ar" ? "text-4xl" : "text-2xl"
                  } sm:text-6xl font-black text-primary`}
                >
                  {t("HeroSection.title")}
                </h1>
              </Animation>
              <Animation>
                <p
                  className={`${
                    locale === "ar" ? "text-xl" : "text-lg"
                  } sm:text-3xl font-bold`}
                >
                  {locale === "ar" ? "للمحاماة" : "Law firm"}
                </p>
              </Animation>
            </div>
            <Animation>
              <h2
                className={`${
                  locale === "ar" ? "text-lg" : "text-base"
                } sm:text-2xl font-semibold`}
              >
                {t("HeroSection.paragraph").split(",")[0]},<br />
                {t("HeroSection.paragraph").split(",")[1]}
              </h2>
            </Animation>
          </div>
        </div>
        <Link
          href={"#about"}
          className={`content-data absolute md:bottom-8 bottom-2 ${
            locale === "ar" ? "right-2 md:right-14" : "left-2 md:left-14"
          } flex justify-center items-center gap-1 z-20 animate-bounce text-[#bb9911]`}
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
          <Heading>{t("AboutSection.title")}</Heading>
          <div className="flex lg:gap-16 gap-10 flex-col lg:flex-row items-center h-full">
            <div className="flex-1 lg:order-1 order-2 flex justify-center items-center lg:px-10">
              <Animation>
                <Image
                  src={"/imgs/ahmed_5.jpg"}
                  alt="elbanna"
                  width={400}
                  height={400}
                  className="w-full lg:max-w-[400px] rounded-lg shadow-sm duration-300 hover:scale-105 hover:rounded-none hover:shadow-md"
                />
              </Animation>
            </div>
            <div className="flex-1 text-lg md:text-xl font-semibold !leading-8 lg:order-2 order-1">
              <Animation>
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
              </Animation>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex py-16 bg-[#bb99111a]" id="services">
        <div className="container flex flex-col gap-8">
          <Heading>{t("ServicesSection.title")}</Heading>
          <div className="flex flex-col gap-2">
            <div className="text-lg md:text-xl">
              <Animation>
                <p className="font-semibold">
                  {t("ServicesSection.paragraph.0").split(",")[0]},
                </p>
                <p className="text-base">
                  {t("ServicesSection.paragraph.0").split(",")[1].split(".")[0]}
                  .
                  {t("ServicesSection.paragraph.0").split(",")[1].split(".")[1]}
                  .
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {t("ServicesSection.paragraph.0").split(",")[1].split(".")[2]}
                </p>
              </Animation>
            </div>
            <div className="flex lg:gap-12 gap-10 flex-col lg:flex-row items-center h-full">
              <div className="flex flex-col gap-2 flex-1 self-start">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                  const [title, description] = t(
                    `ServicesSection.paragraph.${num}`
                  ).split(":");
                  return (
                    <div className="flex flex-col" key={num}>
                      <Animation>
                        <div className="flex items-center min-w-fit">
                          <p className="lg:text-lg font-semibold">
                            {num} - {title}:
                          </p>
                        </div>
                        <div className="text-sm md:text-base">
                          {description}
                        </div>
                      </Animation>
                    </div>
                  );
                })}
              </div>
              <div className="flex-1 flex justify-center items-center">
                <Animation>
                  <Image
                    src={"/imgs/ahmed_6.jpg"}
                    alt="elbanna"
                    width={400}
                    height={400}
                    className="w-full max-w-[400px] lg:max-w-[360px] rounded-lg shadow-sm duration-300 hover:scale-105 hover:rounded-none hover:shadow-md"
                  />
                </Animation>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex py-16" id="blog">
        <div className="container flex flex-col gap-20">
          <Heading>{t("BlogSection.title")}</Heading>
          <BlogsSection />
        </div>
      </section>

      <section className="min-h-screen flex py-16 bg-[#bb99111a]" id="team">
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col gap-8 items-center">
            <Heading>{t("TeamSection.title")}</Heading>
            <Animation>
              <p className="md:text-xl text-lg font-semibold text-center">
                {t("TeamSection.paragraph")}
              </p>
            </Animation>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 my-auto">
            {teamData.map((member) => (
              <div
                key={member.id}
                className="bg-white relative rounded-lg shadow-sm text-center overflow-hidden duration-300 hover:shadow-md hover:rounded-none hover:scale-105 group content-data border-2 border-primary"
              >
                <div className="relative">
                  <Image
                    src={member.image}
                    alt={member.name[locale as keyof typeof member.name]}
                    width={500}
                    height={500}
                    className="w-full mx-auto object-cover"
                  />
                  <div
                    className={`absolute ${
                      locale === "ar" ? "left-0" : "right-0"
                    } top-0 bg-black opacity-30 group-hover:w-full w-0 h-full duration-300 z-20`}
                  />
                </div>
                <div className="flex flex-col items-center p-4 border-t-2 border-primary">
                  <h2 className="text-lg font-semibold">
                    {member.name[locale as keyof typeof member.name]}
                  </h2>
                  <p className="text-neutral-500">
                    {member.role[0][locale as keyof (typeof member.role)[0]]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="min-h-screen flex py-16" id="FAQs">
        <div className="container flex flex-col gap-20">
          <Heading>{t("FAQsSection.title")}</Heading>
          <AccordionFAQ />
        </div>
      </section>
    </>
  );
}
