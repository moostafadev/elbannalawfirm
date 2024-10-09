import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

interface ILink {
  title: string;
  href?: string;
  isNotLast: boolean;
}

const BreadcrumbC = ({ links }: { links: ILink[] }) => {
  const locale = useLocale();
  return (
    <Breadcrumb className="content-data">
      <BreadcrumbList>
        {links
          .filter((link) => link.isNotLast)
          .map((link, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <Link
                  href={link.href as string}
                  className="font-bold text-black"
                >
                  {link.title}
                </Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary">
                {locale === "ar" ? <ChevronLeft /> : <ChevronRight />}
              </BreadcrumbSeparator>
            </React.Fragment>
          ))}
        {links
          .filter((link) => !link.isNotLast)
          .map((link, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-primary font-bold hover:text-primary">
                  {link.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbC;
