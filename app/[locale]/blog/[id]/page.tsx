import Animation from "@/components/Animation";
import BreadcrumbC from "@/components/Breadcrumb";
import { blogsData, ITitles } from "@/data/blogs";
import { generateLocalizedMetadataFromContent } from "@/lib/seoUtils/seoMetadata";
import { Metadata } from "next";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export async function generateStaticParams() {
  return blogsData.map((blog) => ({
    id: blog.id.toString(),
  }));
}

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const blog = blogsData.find((item) => item.id === +params.id);
  const locale = await getLocale();

  if (!blog) {
    return {
      title: "المقال غير موجود",
      description: "لم يتم العثور على المقال المطلوب",
    };
  }

  const title = blog.titles[locale as keyof ITitles];
  const description = blog.content[locale as keyof ITitles]
    .slice(0, 3)
    .join(" ");

  const metadata = await generateLocalizedMetadataFromContent({
    title,
    description,
    path: `blog/${blog.id}`,
    image: `/imgs/blog_${blog.id}.webp`,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: ["Ahmed Elbanna"],
      section: "Legal Articles",
    },
    other: {
      "article:author": "Ahmed Elbanna",
      "article:section": "Legal Articles",
    },
  };
};

const BlogPage = async ({ params: { id } }: { params: { id: string } }) => {
  const locale = await getLocale();
  const blog = blogsData.find((item) => item.id === +id);

  if (!blog) {
    notFound();
  }

  const breadcrumbTitles = {
    ar: "الصفحة الرئيسية",
    en: "Home",
    fr: "Page d'accueil",
  };

  const currentTitle = blog.titles[locale as keyof ITitles];
  const currentContent =
    blog.largeContent[locale as keyof typeof blog.largeContent];

  return (
    <article className="py-6">
      <div className="container max-w-5xl">
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
                title: currentTitle,
                isNotLast: false,
              },
            ]}
          />

          <figure>
            <Animation>
              <Image
                src={blog.image as string}
                alt={currentTitle}
                width={1200}
                height={630}
                className="rounded-lg w-full h-auto"
                priority={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </Animation>
          </figure>

          <div
            className="prose prose-lg max-w-none"
            itemScope
            itemType="https://schema.org/Article"
          >
            <div itemProp="articleBody">
              {currentContent.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-lg text-neutral-900 mb-4 leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPage;
