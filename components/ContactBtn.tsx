import { Link } from "@/i18n/routing";
import { Phone } from "lucide-react";
import { useLocale } from "next-intl";
import Image from "next/image";
import React from "react";

const ContactBtn = () => {
  const locale = useLocale();

  const translations = {
    ar: "اتصل بنا",
    en: "Call Us",
    fr: "Appelez-nous",
  };

  const title =
    translations[locale as keyof typeof translations] || translations.ar;
  return (
    <>
      <Link
        href={"tel:+201000728654"}
        title={title}
        className={`fixed bottom-6 left-4 z-20 p-2 rounded-full sm:w-[56px] sm:h-[56px] w-[48px] h-[48px] bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown duration-300 border-2 border-primary flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg hover:scale-110 hover:bg-brown hover:text-primary hover:-translate-y-1`}
      >
        <Phone />
      </Link>
      <Link
        href={"/inheritance-calculator"}
        className={`fixed sm:bottom-[calc(24px+56px+8px)] bottom-[calc(24px+48px+8px)] left-3 z-20 p-1 rounded-full sm:w-[62px] sm:h-[62px] w-[52px] h-[52px] bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown duration-300 border-2 border-primary flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg hover:scale-110 hover:bg-brown hover:text-primary hover:-translate-y-1`}
      >
        <Image
          src={"/logo/inheritance.png"}
          alt="inheritance"
          width={200}
          height={200}
          priority={true}
        />
      </Link>
    </>
  );
};

export default ContactBtn;
