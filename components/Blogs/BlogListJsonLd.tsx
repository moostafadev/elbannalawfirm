import React from "react";
import { SITE_URL } from "@/constants/site";
import type { BlogListItem } from "@/types/blog";

interface BlogListJsonLdProps {
  blogs: BlogListItem[];
  url: string;
  name: string;
  description: string;
  locale: LocaleKey;
  page: number;
  totalPages: number;
}

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const BlogListJsonLd = ({
  blogs,
  url,
  name,
  description,
  locale,
  page,
  totalPages,
}: BlogListJsonLdProps) => {
  const items = blogs.map((blog, index) => ({
    "@type": "ListItem",
    position: (page - 1) * blogs.length + index + 1,
    url: `${SITE_URL}/${blog.lang}/blog/${blog.id}`,
    name: blog.title,
    image: blog.image,
  }));

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#collection`,
        url,
        name,
        description,
        inLanguage: locale,
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${url}#blog` },
        mainEntity: { "@id": `${url}#list` },
      },
      {
        "@type": "Blog",
        "@id": `${url}#blog`,
        name,
        description,
        url,
        inLanguage: locale,
        publisher: { "@id": ORGANIZATION_ID },
      },
      {
        "@type": "ItemList",
        "@id": `${url}#list`,
        numberOfItems: blogs.length,
        itemListOrder: "https://schema.org/ItemListOrderDescending",
        itemListElement: items,
        ...(totalPages > 1 && { pagination: { page, totalPages } }),
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

export default BlogListJsonLd;
