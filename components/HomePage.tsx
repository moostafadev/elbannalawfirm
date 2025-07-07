"use client";

import { AccordionFAQ } from "@/components/Accordion";
import Animation from "@/components/Animation";
import BlogsSection from "@/components/BlogsSection";
import ContactForm from "@/components/ContactForm";
import Heading from "@/components/Heading";
import HomePageOverlay from "@/components/HomePageOverlay";
import { Link } from "@/i18n/routing";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import CustomButton from "./CustomButton";

interface HomeClientProps {
  locale: string;
  translations: {
    heroTitle: string;
    heroParagraph: string;
    lawFirm: { ar: string; en: string; fr: string };
    discoverMore: { ar: string; en: string; fr: string };
    aboutTitle: string;
    aboutParagraph: string;
    servicesTitle: string;
    servicesParagraph0: string;
    servicesList: string[];
    blogTitle: string;
    teamTitle: string;
    teamParagraph: string;
    faqTitle: string;
    contactTitle: string;
    contactParagraph: string;
    inheritanceTitle: string;
    inheritanceParagraph: string;
    tryNow: string;
  };
}

export default function HomeClient({ translations }: HomeClientProps) {
  const locale = useLocale();
  const t = translations;

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-6rem)] py-6 flex lg:items-center">
        <div className="container lg:-mt-32 mt-4 z-20 relative">
          <div className="flex flex-col lg:gap-5 gap-2">
            <div
              className={`${
                locale === "fr"
                  ? "flex flex-col sm:flex-row sm:gap-2 sm:items-end"
                  : "flex gap-2 items-end"
              }`}
            >
              <Animation>
                <h1
                  className={`${
                    locale === "ar" ? "text-4xl" : "text-2xl"
                  } lg:text-5xl xl:text-6xl sm:text-4xl font-black text-primary`}
                >
                  {t.heroTitle}
                </h1>
              </Animation>
              <Animation>
                <h2
                  className={`${
                    locale === "ar" ? "text-2xl" : "text-lg"
                  } xl:text-3xl sm:text-xl font-bold`}
                >
                  {t.lawFirm[locale as keyof typeof t.lawFirm]}
                </h2>
              </Animation>
            </div>
            <Animation>
              <h2
                className={`${
                  locale === "ar" ? "text-lg" : "text-base"
                } xl:text-2xl md:text-xl font-semibold`}
              >
                {t.heroParagraph.split(",")[0]},<br />
                {t.heroParagraph.split(",")[1]}
              </h2>
            </Animation>
          </div>
        </div>
        <Link
          href={"#about"}
          className={`content-data absolute md:bottom-8 bottom-2 ${
            locale === "ar" ? "right-2 md:right-14" : "left-2 md:left-14"
          } flex justify-center items-center gap-1 z-20 animate-bounce text-primary`}
          style={{ writingMode: "vertical-lr" }}
        >
          {locale === "ar" && <ChevronDown />}
          <span className="text-lg font-semibold">
            {t.discoverMore[locale as keyof typeof t.discoverMore]}
          </span>
          {locale !== "ar" && <ChevronDown />}
        </Link>
        <HomePageOverlay />
      </section>

      {/* About Section */}
      <section className="min-h-screen flex py-16" id="about">
        <div className="container flex flex-col gap-8">
          <Heading>{t.aboutTitle}</Heading>
          <div className="flex lg:gap-16 gap-10 flex-col lg:flex-row items-center h-full">
            <div className="flex-1 lg:order-1 order-2 flex justify-center items-center lg:px-10">
              <Animation>
                <Image
                  src="/imgs/ahmed_5.webp"
                  alt="elbanna"
                  width={400}
                  height={400}
                  className="w-full lg:max-w-[400px] rounded-lg shadow-sm duration-300 hover:scale-105 hover:rounded-none hover:shadow-md"
                  loading="lazy"
                />
              </Animation>
            </div>
            <div className="flex-1 text-lg md:text-xl font-semibold !leading-8 lg:order-2 order-1">
              <Animation>
                {t.aboutParagraph.split(".").map((text, idx, arr) => (
                  <p key={idx}>
                    {text}
                    {idx !== arr.length - 1 && "."}
                    <br />
                  </p>
                ))}
              </Animation>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="min-h-screen flex py-16 bg-[#bb99111a]" id="services">
        <div className="container flex flex-col gap-8">
          <Heading>{t.servicesTitle}</Heading>
          <div className="flex flex-col gap-2">
            <div className="text-lg md:text-xl">
              <Animation>
                <p className="font-semibold">
                  {t.servicesParagraph0.split(",")[0]},
                </p>
                <p className="text-base">
                  {t.servicesParagraph0.split(",")[1].split(".")[0]}.
                  {t.servicesParagraph0.split(",")[1].split(".")[1]}.
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {t.servicesParagraph0.split(",")[1].split(".")[2]}
                </p>
              </Animation>
            </div>
            <div className="flex lg:gap-12 gap-10 flex-col lg:flex-row items-center h-full">
              <div className="flex flex-col gap-2 flex-1 self-start">
                {t.servicesList.map((item, i) => {
                  const [title, description] = item.split(":");
                  return (
                    <div className="flex flex-col" key={i}>
                      <Animation>
                        <div className="flex items-center min-w-fit">
                          <p className="lg:text-lg font-semibold">
                            {i + 1} - {title}:
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
                    src="/imgs/ahmed_6.webp"
                    alt="elbanna"
                    width={400}
                    height={400}
                    loading="lazy"
                    className="w-full max-w-[400px] lg:max-w-[360px] rounded-lg shadow-sm duration-300 hover:scale-105 hover:rounded-none hover:shadow-md"
                  />
                </Animation>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="min-h-screen flex py-16" id="blog">
        <div className="container flex flex-col gap-20">
          <Heading>{t.blogTitle}</Heading>
          <BlogsSection />
        </div>
      </section>

      {/* Inheritance Calculator Section */}
      <section
        className="min-h-screen flex py-16 bg-[#bb99111a]"
        id="inheritance"
      >
        <div className="container flex flex-col gap-8">
          <Heading>{t.inheritanceTitle}</Heading>
          <div className="flex lg:gap-16 gap-10 flex-col lg:flex-row items-center h-full">
            <div className="flex-1 lg:order-1 order-2 flex justify-center items-center lg:px-10">
              <Animation>
                <Image
                  src="/logo/inheritance.png"
                  alt="inheritance-calc"
                  width={400}
                  height={400}
                  className="w-full lg:max-w-[400px] duration-300 hover:scale-105"
                  loading="lazy"
                />
              </Animation>
            </div>
            <div className="flex-1 text-lg md:text-xl font-semibold !leading-8 lg:order-2 order-1">
              <Animation>
                {t.inheritanceParagraph
                  .split(". ")
                  .map((sentence, index, arr) => (
                    <p key={index} className="mb-3">
                      {sentence}
                      {index !== arr.length - 1 && "."}
                    </p>
                  ))}
              </Animation>
              <Animation>
                <div className="mt-6">
                  <Link href="/inheritance-calculator" title={t.tryNow}>
                    <CustomButton size="fit" color="yellow">
                      {t.tryNow}
                    </CustomButton>
                  </Link>
                </div>
              </Animation>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="min-h-screen flex py-16" id="FAQs">
        <div className="container flex flex-col gap-20">
          <Heading>{t.faqTitle}</Heading>
          <AccordionFAQ />
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen flex py-16 bg-[#bb99111a]" id="contact">
        <div className="container flex flex-col gap-10">
          <div className="flex flex-col gap-8 items-center">
            <Heading>{t.contactTitle}</Heading>
            <Animation>
              <p className="md:text-xl text-lg font-semibold text-center">
                {t.contactParagraph}
              </p>
            </Animation>
          </div>
          <div className="flex flex-col lg:flex-row gap-6 lg:items-center">
            <div className="flex-1">
              <ContactForm />
            </div>
            <div className="flex-1 flex justify-center items-center">
              <Animation>
                <Image
                  src="/logo/logo.png"
                  alt="elbanna"
                  width={1000}
                  height={1000}
                  className="w-full max-w-[400px] max-h-[400px] lg:max-w-[380px] lg:max-h-[380px]"
                  loading="lazy"
                />
              </Animation>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
