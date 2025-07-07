"use client";

import { useTranslations } from "next-intl";
import React, { memo, useMemo } from "react";

interface GenderProps {
  deceasedGender: "male" | "female";
  setDeceasedGender: (gender: "male" | "female") => void;
  locale: string;
}

const Gender = memo(
  ({ deceasedGender, setDeceasedGender, locale }: GenderProps) => {
    const t = useTranslations("Inheritance");

    const translations = useMemo(() => {
      return {
        label: t("section1.label"),
        male: t("section1.male"),
        female: t("section1.female"),
      };
    }, [t]);

    return (
      <div className="mb-4">
        <label className="block font-medium mb-3">{translations.label}:</label>
        <div className="flex items-center gap-4">
          {/* Male */}
          <div
            onClick={() => setDeceasedGender("male")}
            className={`bg-[#2da9d9] flex flex-col items-center rounded-lg cursor-pointer shadow-sm duration-300 hover:shadow-md py-2 border-2 overflow-hidden ${
              deceasedGender === "male"
                ? "border-[#104256] text-[#104256] scale-105"
                : "border-white text-white"
            }`}
          >
            <div
              className={`${
                locale === "ar"
                  ? "w-[60px] h-[42px]"
                  : "w-[60px] lg:w-[72px] h-[42px] lg:h-[46px]"
              } flex items-center justify-center pb-2 duration-300`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-mars-icon lucide-mars"
              >
                <path d="M16 3h5v5" />
                <path d="m21 3-6.75 6.75" />
                <circle cx="10" cy="14" r="6" />
              </svg>
            </div>
            <p
              className={`pt-2 font-bold border-t-2 w-full text-center duration-300 ${
                locale === "ar" ? "text-base" : "text-xs lg:text-base"
              } ${
                deceasedGender === "male"
                  ? "border-t-[#104256] scale-105"
                  : "border-t-white"
              }`}
            >
              {translations.male}
            </p>
          </div>

          {/* Female */}
          <div
            onClick={() => setDeceasedGender("female")}
            className={`bg-[#b73377] flex flex-col items-center rounded-lg cursor-pointer shadow-sm duration-300 hover:shadow-md py-2 border-2 overflow-hidden ${
              deceasedGender === "female"
                ? "border-[#501634] text-[#501634] scale-105"
                : "border-white text-white"
            }`}
          >
            <div
              className={`${
                locale === "ar"
                  ? "w-[60px] h-[42px]"
                  : "w-[60px] lg:w-[72px] h-[42px] lg:h-[46px]"
              } flex items-center justify-center pb-2`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-venus-icon lucide-venus"
              >
                <path d="M12 15v7" />
                <path d="M9 19h6" />
                <circle cx="12" cy="9" r="6" />
              </svg>
            </div>
            <p
              className={`pt-2 font-bold border-t-2 duration-300 ${
                locale === "ar" ? "text-base" : "text-xs lg:text-base"
              } ${
                deceasedGender === "female"
                  ? "border-t-[#501634] scale-105"
                  : "border-t-white"
              } w-full text-center`}
            >
              {translations.female}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

Gender.displayName = "Gender";

export default Gender;
