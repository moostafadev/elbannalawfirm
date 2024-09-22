import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const HomePageOverlay = () => {
  const locale = useLocale();
  return (
    <>
      <Image
        src={"/imgs/ahmed_1.png"}
        width={1000}
        height={1000}
        alt="elbanna"
        className={`absolute bottom-0 lg:h-full lg:w-[auto] w-[800px] max-w-none select-none ${
          locale !== "ar"
            ? "lg:right-0 right-1/2 translate-x-1/2 lg:translate-x-0"
            : "lg:left-0 left-1/2 -translate-x-1/2 lg:translate-x-0"
        }`}
      />
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-neutral-950 opacity-20"></div>
    </>
  );
};

export default HomePageOverlay;
