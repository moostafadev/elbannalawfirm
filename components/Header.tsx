"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useScrollDirection from "@/hooks/useScrollDir";

const Header = () => {
  const t = useTranslations("Links");
  const tFooter = useTranslations("Footer");
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);
  const scrollDirection = useScrollDirection(0);
  const headerLinks = ["about", "services", "blog", "team", "FAQs", "contact"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleLanguageChange = (newLocale: "en" | "ar" | "fr" | undefined) => {
    router.push("/", { locale: newLocale });
  };

  return (
    <header
      className={`h-24 shadow-sm fixed bottom-0 md:top-0 bg-[hsl(0deg,0%,100%,.8)] backdrop-blur-sm z-50 w-full border-b-2 flex items-center duration-300 ${
        scrollDirection === "down" ? "!top-[-6rem]" : "!top-0"
      }`}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex lg:gap-12">
            <Link
              href={"/"}
              className="py-2 flex items-center justify-center h-24 w-24"
              onClick={() => setIsopen(false)}
              title={tFooter("ahmed-elbanna")}
            >
              <Image
                src={"/logo/logo.png"}
                alt="logo"
                width={100}
                height={100}
                className="h-full -mt-1"
                loading="eager"
                priority={true}
              />
            </Link>
            <nav className="flex">
              <ul className="lg:flex gap-6 hidden !text-neutral-800 text-lg">
                {headerLinks.map((item) => (
                  <li
                    key={item}
                    className={`font-bold hover:text-primary duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:-bottom-[1px] hover:before:w-full before:absolute before:duration-300 ${
                      locale === "ar" ? "before:right-0" : "before:left-0"
                    }`}
                  >
                    <Link href={`#${item}`} title={t(item)}>
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul
                className={`z-50 lg:hidden flex gap-8 text-xl fixed top-24 h-[calc(100vh-6rem)] w-full duration-300 flex-col bg-primary text-white py-10 items-center ${
                  isOpen && locale === "ar"
                    ? "left-0"
                    : isOpen && locale !== "ar"
                    ? "right-0"
                    : locale === "ar" && !isOpen
                    ? "-left-full"
                    : "-right-full"
                }`}
              >
                {headerLinks.map((item) => (
                  <li
                    key={item}
                    className={`font-bold hover:text-primary duration-300 flex items-center`}
                    onClick={() => setIsopen(false)}
                  >
                    <Link href={`#${item}`} title={t(item)}>
                      {t(item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="flex items-center sm:gap-4 gap-3">
            <Select
              defaultValue={locale}
              onValueChange={(e) =>
                handleLanguageChange(e as "en" | "ar" | "fr" | undefined)
              }
            >
              <SelectTrigger className="w-[125px]">
                <SelectValue placeholder="lang" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="ar">
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/countries/saudi-arabia.png"}
                        alt="saudi-arabia"
                        width={20}
                        height={20}
                        loading="eager"
                        priority={true}
                      />
                      <span>العربية</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="en">
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/countries/united-kingdom.png"}
                        alt="united-kingdom"
                        width={20}
                        height={20}
                        loading="eager"
                        priority={true}
                      />
                      <span>English</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="fr">
                    <div className="flex items-center gap-2">
                      <Image
                        src={"/countries/france.png"}
                        alt="france"
                        width={20}
                        height={20}
                        loading="eager"
                        priority={true}
                      />
                      <span>français</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div
              className={`rounded-md px-[1px] lg:hidden cursor-pointer hover:opacity-90 duration-300 relative w-[32px] h-[32px]`}
              onClick={() => setIsopen((prev) => !prev)}
            >
              <span
                className={`absolute w-[75%] h-1 bg-neutral-950 dark:bg-white top-2 left-[50%] translate-x-[-50%] rounded-md ${
                  isOpen ? "rotate-45 top-[14px] w-[28px] !bg-primary" : ""
                } duration-300`}
              ></span>
              <span
                className={`absolute w-[75%] h-1 bg-neutral-950 dark:bg-white bottom-2 right-[50%] translate-x-[50%] rounded-md ${
                  isOpen ? "-rotate-45 top-[14px] w-[28px] !bg-primary" : ""
                } duration-300`}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
