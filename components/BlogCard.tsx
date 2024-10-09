import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";

interface IProps {
  link: string;
  title: string;
  image: string;
  children: React.ReactNode;
}

const BlogCard = ({ title, image, children, link }: IProps) => {
  return (
    <Link
      href={link}
      className="flex flex-col gap-4 rounded-lg duration-300 shadow-sm border-2 border-primary hover:scale-105 hover:shadow-md bg-[#bb99111a] overflow-hidden"
    >
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
    </Link>
  );
};

export default BlogCard;
