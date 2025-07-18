import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const HomePageOverlay = () => {
  const locale = useLocale();
  return (
    <>
      <Image
        src={"/imgs/elbanna_3.webp"}
        width={1000}
        height={1000}
        loading="eager"
        alt="elbanna"
        className={`absolute bottom-0 lg:h-full lg:w-[auto] w-[430px] md:w-[500px] lg:mx-60 max-w-none select-none content-data ${
          locale !== "ar"
            ? "xl:-right-[180px] lg:-right-[240px] sm:right-0 right-1/2 translate-x-1/2 sm:translate-x-0"
            : "xl:-left-[180px] lg: lg:-left-[240px] sm:left-0 left-1/2 -translate-x-1/2 sm:translate-x-0"
        }`}
        priority={true}
      />
      <div
        className={`absolute top-0 left-0 w-full h-full z-10 ${
          locale === "ar" ? "bg-gradient-to-l" : "bg-gradient-to-r"
        } from-[#6b560266] to-transparent`}
      ></div>
    </>
  );
};

export default HomePageOverlay;
