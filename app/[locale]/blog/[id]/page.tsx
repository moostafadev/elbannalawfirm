import Animation from "@/components/Animation";
import BreadcrumbC from "@/components/Breadcrumb";
import { blogsData, ITitles } from "@/data/blogs";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

export const generateMetadata = async ({
  params,
}: {
  params: { id: string; locale: string };
}): Promise<Metadata> => {
  const blog = blogsData.find((item) => item.id === +params.id);
  const locale = await getLocale();

  if (!blog) {
    return {
      title: "Article",
      description: "Not found",
    };
  }

  return generateLocalizedMetadataFromContent({
    title: blog.titles[locale as keyof ITitles],
    description: blog.content[locale as keyof ITitles].join(" . "),
    path: `blog/${blog.id}`,
    image: `/imgs/blog_${blog.id}.webp`,
  });
};

const BlogPage = async ({ params: { id } }: { params: { id: string } }) => {
  const locale = await getLocale();
  const blog = blogsData.find((item) => item.id === +id);
  const breadcrumbTitles = {
    ar: "الصفحة الرئيسية",
    en: "Home",
    fr: "Page d'accueil",
  };

  const articlePrefix = {
    ar: "مقال -",
    en: "Article -",
    fr: "Article -",
  };

  return (
    <section className="py-6">
      <div className="container">
        <div className="flex flex-col gap-6">
          <BreadcrumbC
            links={[
              {
                title:
                  breadcrumbTitles[locale as keyof typeof breadcrumbTitles],
                isNotLast: true,
                href: "/",
              },
              {
                title: `${
                  articlePrefix[locale as keyof typeof articlePrefix]
                } ${blog?.titles[locale as keyof ITitles]}`,
                isNotLast: false,
              },
            ]}
          />
          <div>
            <Animation>
              <Image
                src={blog?.image as string}
                alt={"image"}
                width={2000}
                height={2000}
                className="rounded-lg max-w-full"
                loading="lazy"
              />
            </Animation>
          </div>
          <div className="flex flex-col gap-3">
            {blog?.largeContent[locale as keyof typeof blog.largeContent].map(
              (paragraph, index) => (
                <p key={index} className="text-lg text-neutral-900">
                  {paragraph}
                </p>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
