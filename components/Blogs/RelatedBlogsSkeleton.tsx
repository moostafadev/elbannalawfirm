import React from "react";

const RelatedBlogsSkeleton = () => (
  <section className="mt-6 flex flex-col gap-6 border-t pt-8" aria-busy="true">
    <div className="h-8 w-48 rounded bg-primary/15" />
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={i}
          className="flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-primary/25 bg-[#bb99111a]"
        >
          <div className="aspect-[800/420] w-full bg-primary/10" />
          <div className="flex flex-col gap-3 px-4">
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 rounded-full bg-primary/15" />
              <div className="h-5 w-24 rounded bg-primary/10" />
            </div>
            <div className="h-5 w-full rounded bg-primary/10" />
            <div className="h-4 w-5/6 rounded bg-primary/10" />
          </div>
          <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-0">
            <div className="h-4 w-20 rounded bg-primary/10" />
            <div className="h-9 w-24 rounded-md bg-primary/15" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default RelatedBlogsSkeleton;
