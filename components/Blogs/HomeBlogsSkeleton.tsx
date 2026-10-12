import React from "react";

const CardSkeleton = () => (
  <div className="flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-primary/30 bg-[#bb99111a]">
    <div className="aspect-[800/420] w-full bg-primary/10" />
    <div className="flex flex-col gap-3 px-4">
      <div className="flex flex-wrap items-center gap-2">
        <div className="h-6 w-20 rounded-full bg-primary/15" />
        <div className="h-4 w-24 rounded bg-primary/10" />
      </div>
      <div className="h-5 w-5/6 rounded bg-primary/10" />
      <div className="h-4 w-full rounded bg-primary/10" />
      <div className="h-4 w-4/5 rounded bg-primary/10" />
      <div className="h-4 w-2/3 rounded bg-primary/10" />
    </div>
    <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-0">
      <div className="flex items-center gap-3">
        <div className="h-4 w-10 rounded bg-primary/10" />
        <div className="h-4 w-10 rounded bg-primary/10" />
      </div>
      <div className="h-9 w-24 rounded-md bg-primary/15" />
    </div>
  </div>
);

const HomeBlogsSkeleton = () => (
  <div className="flex flex-col gap-12" aria-busy="true" aria-live="polite">
    {/* Heading + description */}
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="h-9 w-56 rounded bg-primary/15" />
      <div className="flex w-full max-w-2xl flex-col items-center gap-2">
        <div className="h-4 w-full rounded bg-primary/10" />
        <div className="h-4 w-3/4 rounded bg-primary/10" />
      </div>
    </div>

    {/* Cards grid */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>

    {/* View-all button */}
    <div className="h-11 w-44 self-center rounded-md bg-primary/15" />

    <span className="sr-only">Loading latest articles…</span>
  </div>
);

export default HomeBlogsSkeleton;
