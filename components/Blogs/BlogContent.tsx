import React, { Fragment, type ReactNode } from "react";
import type { ContentItem } from "@/types/blog";

interface BlogContentProps {
  items: ContentItem[];
  dir: "rtl" | "ltr";
  adAfter?: number;
  ad?: ReactNode;
}

const BlogContent = ({ items, dir, adAfter, ad }: BlogContentProps) => (
  <div dir={dir}>
    {items.map((item, i) => (
      <Fragment key={i}>
        <div dangerouslySetInnerHTML={{ __html: item.html }} />
        {ad && i === adAfter ? <div className="my-6">{ad}</div> : null}
      </Fragment>
    ))}
  </div>
);

export default BlogContent;
