import React from "react";

const CommentsSkeleton = () => (
  <div
    className="flex animate-pulse flex-col gap-6 border-t pt-6"
    aria-busy="true"
  >
    <div className="h-8 w-48 rounded bg-primary/10" />
    <div className="flex flex-col gap-4 rounded-lg border-2 border-primary/30 bg-[#bb99111a] p-4">
      <div className="h-5 w-32 rounded bg-primary/10" />
      <div className="h-10 w-full rounded bg-primary/10" />
      <div className="h-24 w-full rounded bg-primary/10" />
    </div>
    {Array.from({ length: 2 }, (_, index) => (
      <div
        key={index}
        className="flex gap-3 rounded-lg border border-primary/30 bg-white p-4"
      >
        <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10" />
        <div className="flex flex-1 flex-col gap-2">
          <div className="h-4 w-1/3 rounded bg-primary/10" />
          <div className="h-4 w-full rounded bg-primary/10" />
        </div>
      </div>
    ))}
  </div>
);

export default CommentsSkeleton;
