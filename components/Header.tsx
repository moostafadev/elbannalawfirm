"use client";

import { Link, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Header = () => {
  const t = useTranslations("Links");
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsopen] = useState(false);

  const handleLanguageChange = (newLocale: "en" | "ar" | "fr" | undefined) => {
    router.push("/", { locale: newLocale });
  };

  return (
    <header className="h-16 md:h-24 shadow-sm border-b-2 flex items-center">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex gap-12">
            <Link
              href={"/"}
              className="py-2 flex items-center justify-center h-16 w-16 md:h-24 md:w-24"
              onClick={() => setIsopen(false)}
            >
              <Image
                src={"/logo/logo_elbanna.jpg"}
                alt="logo"
                width={100}
                height={100}
                className="h-full -mt-1"
              />
            </Link>
            <nav className="flex">
              <ul className="md:flex gap-6 hidden !text-neutral-800 text-lg">
                {["about", "services", "team", "FAQs", "contact"].map(
                  (item) => (
                    <li
                      key={item}
                      className={`font-bold hover:text-primary duration-300 flex items-center relative before:w-0 before:h-[2px] before:bg-primary before:bottom-0 hover:before:w-full before:absolute before:duration-300 ${
                        locale === "ar" ? "before:right-0" : "before:left-0"
                      }`}
                    >
                      <Link href={`#${item}`}>{t(item)}</Link>
                    </li>
                  )
                )}
              </ul>
              <ul
                className={`md:hidden flex gap-8 text-xl fixed top-16 h-[calc(100vh-64px)] w-full duration-300 flex-col bg-primary text-white py-10 items-center ${
                  isOpen && locale === "ar"
                    ? "left-0"
                    : isOpen && locale !== "ar"
                    ? "right-0"
                    : locale === "ar" && !isOpen
                    ? "-left-full"
                    : "-right-full"
                }`}
              >
                {["about", "services", "team", "FAQs", "contact"].map(
                  (item) => (
                    <li
                      key={item}
                      className={`font-bold hover:text-primary duration-300 flex items-center`}
                      onClick={() => setIsopen(false)}
                    >
                      <Link href={`#${item}`}>{t(item)}</Link>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Select
              defaultValue={locale}
              onValueChange={(e) =>
                handleLanguageChange(e as "en" | "ar" | "fr" | undefined)
              }
            >
              <SelectTrigger className="w-[130px]">
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
                      />
                      <span>français</span>
                    </div>
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div
              className={`bg-white dark:bg-neutral-950 rounded-md px-[1px] md:hidden cursor-pointer hover:opacity-90 duration-300 relative w-[32px] h-[32px]`}
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
