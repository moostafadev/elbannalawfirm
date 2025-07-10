"use client";

import { Link } from "@/i18n/routing";
import { Phone } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";

const ContactBtn = () => {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("Inheritance");

  const translations = {
    ar: "اتصل بنا",
    en: "Call Us",
    fr: "Appelez-nous",
  };

  const title =
    translations[locale as keyof typeof translations] || translations.ar;

  const isOnInheritanceCalculator = pathname.endsWith(
    "/inheritance-calculator"
  );

  return (
    <>
      <Link
        href={"tel:+201000728654"}
        title={title}
        className={`fixed bottom-6 ${
          locale === "ar" ? "left-4" : "right-4"
        } z-20 p-2 rounded-full sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown duration-300 border-2 border-primary flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg hover:scale-110 hover:bg-brown hover:text-primary hover:-translate-y-1`}
      >
        <Phone />
      </Link>

      {!isOnInheritanceCalculator && (
        <Link
          href={"/inheritance-calculator"}
          title={t("title")}
          className={`fixed top-32 w-fit z-20 p-1 ${
            locale === "ar"
              ? "left-[-2px] translate-x-[calc(-100%+45px+8px)] hover:translate-x-0 pl-2 animate-slide-in-out-ar"
              : "right-[-2px] translate-x-[calc(100%-45px-8px)] hover:translate-x-0 pr-2 animate-slide-in-out"
          } rounded-s-lg h-[56px] bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown transition-all border-2 border-primary flex items-center gap-1 cursor-pointer shadow-md hover:shadow-lg hover:rounded-none hover:bg-brown`}
        >
          <Image
            src={"/logo/inheritance.png"}
            alt={t("title")}
            width={200}
            height={200}
            priority={true}
            className="max-h-full w-auto"
          />
          <p className="min-w-fit">{t("title")}</p>
        </Link>
      )}
    </>
  );
};

export default ContactBtn;
