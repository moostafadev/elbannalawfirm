import React from "react";
import type { TocItem } from "@/types/blog";

interface TableOfContentsProps {
  toc: TocItem[];
  title: string;
}

const TableOfContents = ({ toc, title }: TableOfContentsProps) => (
  <nav
    aria-label={title}
    className="rounded-lg border-2 border-primary bg-[#bb99111a] p-4"
  >
    <h3 className="mb-3 text-lg font-bold text-primary">{title}</h3>
    <ol className="flex flex-col gap-2 text-sm">
      {toc.map((item) => (
        <li key={item.id} className={item.level >= 3 ? "ps-4" : ""}>
          <a href={`#${item.id}`} className="duration-300 hover:text-primary">
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  </nav>
);

export default TableOfContents;
