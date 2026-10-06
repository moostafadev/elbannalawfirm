import React from "react";
import { SITE_URL } from "@/constants/site";
import type { BlogDetail } from "@/types/blog";

interface BreadcrumbEntry {
  name: string;
  url: string;
}

interface BlogJsonLdProps {
  blog: BlogDetail;
  url: string;
  breadcrumbs: BreadcrumbEntry[];
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const BlogJsonLd = ({ blog, url, breadcrumbs }: BlogJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: blog.title,
        description: blog.desc,
        image: [blog.image],
        datePublished: blog.createdAt,
        dateModified: blog.updatedAt,
        inLanguage: blog.lang,
        keywords: blog.keywords.join(", "),
        articleSection: blog.category,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        author: { "@type": "Person", name: "Ahmed Elbanna" },
        publisher: { "@id": ORGANIZATION_ID },
        commentCount: blog.commentsCount,
        interactionStatistic: [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: blog.likesCount,
          },
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: blog.commentsCount,
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      },
      {
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: "Elbanna Law Firm",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo/logo.png` },
      },
    ],
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
