import React from "react";
import { SITE_URL } from "@/constants/site";
import type { BlogDetail } from "@/types/blog";

const BlogJsonLd = ({ blog, url }: { blog: BlogDetail; url: string }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.desc,
    image: [blog.image],
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    inLanguage: blog.lang,
    keywords: blog.keywords.join(", "),
    mainEntityOfPage: url,
    author: { "@type": "Person", name: "Ahmed Elbanna" },
    publisher: {
      "@type": "Organization",
      name: "Elbanna Law Firm",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/logo.png` },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default BlogJsonLd;
