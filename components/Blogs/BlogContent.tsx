import React, { Fragment, type ReactNode } from "react";
import type { ContentItem } from "@/types/blog";

interface BlogContentProps {
  items: ContentItem[];
  dir: "rtl" | "ltr";
  adAfter?: number;
  ad?: ReactNode;
}

const BlogContent = ({ items, dir, adAfter, ad }: BlogContentProps) => (
  <div
    dir={dir}
    className="text-base leading-relaxed text-neutral-800 md:text-lg md:leading-loose"
  >
    {items.map((item, i) => (
      <Fragment key={i}>
        <div
          className="[&_p]:mb-4 [&_ul]:mb-4 [&_ol]:mb-4 [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:mt-6 [&_h3]:mb-2"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />
        {ad && i === adAfter ? <div className="my-6">{ad}</div> : null}
      </Fragment>
    ))}
  </div>
);

export default BlogContent;
