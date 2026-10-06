import React from "react";

const BlogsSkeleton = ({ count = 3 }: { count?: number }) => (
  <div
    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
    aria-busy="true"
  >
    {Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="flex animate-pulse flex-col gap-4 overflow-hidden rounded-lg border-2 border-primary/30 bg-[#bb99111a]"
      >
        <div className="aspect-[800/420] w-full bg-primary/10" />
        <div className="flex flex-col gap-3 px-4 pb-4">
          <div className="h-5 w-3/4 rounded bg-primary/10" />
          <div className="h-4 w-full rounded bg-primary/10" />
          <div className="h-4 w-2/3 rounded bg-primary/10" />
        </div>
      </div>
    ))}
  </div>
);

export default BlogsSkeleton;
