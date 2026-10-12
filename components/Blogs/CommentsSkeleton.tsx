import React from "react";

const CommentCardSkeleton = () => (
  <div className="flex gap-3 rounded-lg border border-primary/15 bg-white p-4 md:gap-4 md:p-5">
    <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 md:h-11 md:w-11" />
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-2">
        <div className="h-4 w-24 rounded bg-primary/15 md:w-32" />
        <div className="h-3 w-3 rounded-full bg-primary/10" />
        <div className="h-3 w-20 rounded bg-primary/10" />
      </div>
      <div className="h-4 w-full rounded bg-primary/10" />
      <div className="h-4 w-3/4 rounded bg-primary/10" />
    </div>
  </div>
);

const CommentsSkeleton = () => (
  <div
    className="flex animate-pulse flex-col gap-6 border-t pt-6 md:pt-8"
    aria-busy="true"
  >
    {/* Header */}
    <div className="flex items-center gap-2">
      <div className="h-7 w-7 rounded bg-primary/15" />
      <div className="h-6 w-32 rounded bg-primary/15 md:h-7 md:w-40" />
      <div className="h-4 w-8 rounded bg-primary/10" />
    </div>

    {/* Grid — matches CommentsSection layout */}
    <div className="grid gap-6 md:gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
      {/* Form skeleton */}
      <div className="rounded-lg border-2 border-primary/25 bg-[#bb99111a] p-4 md:p-5">
        <div className="mb-4 h-5 w-32 rounded bg-primary/15" />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="h-4 w-16 rounded bg-primary/10" />
            <div className="h-10 w-full rounded bg-primary/10" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-4 w-20 rounded bg-primary/10" />
            <div className="h-28 w-full rounded bg-primary/10" />
          </div>
          <div className="h-10 w-full rounded-md bg-primary/15" />
        </div>
      </div>

      {/* List skeleton */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 3 }, (_, i) => (
          <CommentCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </div>
);

export default CommentsSkeleton;
