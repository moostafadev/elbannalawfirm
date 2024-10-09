import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import CustomButton from "./CustomButton";
import { useLocale } from "next-intl";

interface IProps {
  link: string;
  title: string;
  image: string;
  children: React.ReactNode;
}

const BlogCard = ({ title, image, children, link }: IProps) => {
  const locale = useLocale();
  return (
    <div className="content-data flex flex-col gap-4 rounded-lg duration-300 shadow-sm border-2 border-primary hover:scale-105 hover:shadow-md bg-[#bb99111a] overflow-hidden">
      <div className="flex max-h-1/2 justify-center items-center">
        <Image
          src={image}
          alt={title}
          width={1000}
          height={1000}
          className="!min-w-full !min-h-full"
        />
      </div>
      <div className="flex flex-col gap-3 px-4 pb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="text-sm md:text-base">{children}</div>
      </div>
      <Link href={link} className="mt-auto m-4 self-end">
        <CustomButton size="fit" color="yellow">
          {locale === "ar"
            ? "قراء المزيد"
            : locale === "en"
            ? "Read more"
            : "Lire la suite"}
        </CustomButton>
      </Link>
    </div>
  );
};

export default BlogCard;
