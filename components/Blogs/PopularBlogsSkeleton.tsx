import React from "react";

const ITEM_WIDTHS = [
  ["w-full", "w-2/3"],
  ["w-5/6", "w-1/2"],
  ["w-full", "w-3/5"],
  ["w-4/5", "w-2/3"],
  ["w-full", "w-1/2"],
];

const PopularBlogsSkeleton = () => (
  <section className="rounded-lg border-2 border-primary/30 bg-[#bb99111a] p-4">
    <div className="mb-3 h-6 w-32 rounded bg-primary/15" />
    <ul className="flex flex-col gap-3">
      {ITEM_WIDTHS.map(([titleW, metaW], i) => (
        <li key={i} className="flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-md bg-primary/10" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <div className={`h-4 rounded bg-primary/10 ${titleW}`} />
            <div className={`h-3 rounded bg-primary/10 ${metaW}`} />
          </div>
        </li>
      ))}
    </ul>
  </section>
);

export default PopularBlogsSkeleton;
