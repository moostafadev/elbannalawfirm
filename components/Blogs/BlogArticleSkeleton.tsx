import React from "react";

const CONTENT_LINES = [
  "w-full",
  "w-full",
  "w-5/6",
  "w-full",
  "w-2/3",
  "w-full",
  "w-full",
  "w-4/5",
  "w-full",
  "w-3/4",
];

const BlogArticleSkeleton = () => (
  <article className="py-6" aria-busy="true">
    <div className="container max-w-6xl">
      <div className="flex animate-pulse flex-col gap-6">
        <div className="h-5 w-64 max-w-full rounded bg-primary/10" />
        <div className="aspect-[1200/630] w-full rounded-lg bg-primary/10" />
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-3">
            <div className="h-7 w-24 rounded-full bg-primary/10" />
            <div className="h-7 w-32 rounded bg-primary/10" />
            <div className="h-7 w-24 rounded bg-primary/10" />
          </div>
          <div className="h-8 w-full rounded bg-primary/10 md:h-10" />
          <div className="h-8 w-2/3 rounded bg-primary/10 md:h-10" />
          <div className="h-5 w-full rounded bg-primary/10" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-4">
            {CONTENT_LINES.map((width, index) => (
              <div
                key={index}
                className={`h-4 rounded bg-primary/10 ${width}`}
              />
            ))}
          </div>
          <div className="hidden h-64 rounded-lg border-2 border-primary/30 bg-[#bb99111a] lg:block" />
        </div>
      </div>
    </div>
    <span role="status" className="sr-only">
      Loading...
    </span>
  </article>
);

export default BlogArticleSkeleton;
