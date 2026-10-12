import React, { Fragment } from "react";
import CommentsSkeleton from "./CommentsSkeleton";

const CONTENT_LINES = [
  "w-full",
  "w-11/12",
  "w-full",
  "w-5/6",
  "w-full",
  "w-2/3",
  "w-full",
  "w-11/12",
  "w-4/5",
  "w-full",
];

const TOC_LINES = ["w-11/12", "w-3/4", "w-5/6", "w-2/3", "w-4/5"];

const AdPlaceholder = () => (
  <div className="min-h-[100px] w-full rounded-lg border border-dashed border-primary/20 bg-primary/5" />
);

const SubHeadingLine = () => (
  <div className="mt-4 mb-2 h-6 w-2/3 rounded bg-primary/10" />
);

const BlogContentSkeleton = () => (
  <div className="flex flex-col gap-3">
    {CONTENT_LINES.map((w, i) => (
      <Fragment key={i}>
        {i === 3 && <SubHeadingLine />}
        <div className={`h-4 rounded bg-primary/10 ${w}`} />
      </Fragment>
    ))}
    <div className="my-6">
      <AdPlaceholder />
    </div>
    {CONTENT_LINES.slice(0, 5).map((w, i) => (
      <div key={`b-${i}`} className={`h-4 rounded bg-primary/10 ${w}`} />
    ))}
  </div>
);

const ActionsSkeleton = () => (
  <div className="flex flex-wrap items-center gap-3 border-t pt-4">
    <div className="h-10 w-32 rounded-md border-2 border-primary/25 bg-primary/5" />
  </div>
);

const ShareSkeleton = () => (
  <div className="flex flex-wrap items-center gap-3 border-t pt-4">
    <div className="h-5 w-20 rounded bg-primary/15" />
    {Array.from({ length: 3 }, (_, i) => (
      <div
        key={i}
        className="h-10 w-10 rounded-md border-2 border-primary/25 bg-primary/5"
      />
    ))}
    <div className="h-10 w-32 rounded-md border-2 border-primary/25 bg-primary/5" />
  </div>
);

const TableOfContentsSkeleton = () => (
  <div className="rounded-lg border-2 border-primary/30 bg-[#bb99111a] p-4">
    <div className="mb-3 h-6 w-32 rounded bg-primary/15" />
    <ul className="flex flex-col gap-2">
      {TOC_LINES.map((w, i) => (
        <li key={i} className={i % 2 === 1 ? "ps-4" : ""}>
          <div className={`h-4 rounded bg-primary/10 ${w}`} />
        </li>
      ))}
    </ul>
  </div>
);

const RelatedArticlesSkeleton = () => (
  <section className="mt-6 flex flex-col gap-6">
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
            <div className="h-4 w-3/4 rounded bg-primary/10" />
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

const BlogArticleSkeleton = () => (
  <article className="py-6" aria-busy="true" aria-live="polite">
    <div className="container max-w-6xl">
      <div className="flex flex-col gap-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="h-4 w-20 rounded bg-primary/10" />
          <div className="h-4 w-3 rounded bg-primary/10" />
          <div className="h-4 w-16 rounded bg-primary/10" />
          <div className="h-4 w-3 rounded bg-primary/10" />
          <div className="h-4 w-40 max-w-full rounded bg-primary/10" />
        </div>

        {/* Featured image */}
        <div className="aspect-[1200/630] w-full rounded-lg bg-primary/10" />

        {/* Header */}
        <header className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="h-7 w-24 rounded-full bg-primary/15" />
            <div className="h-5 w-32 rounded bg-primary/10" />
            <div className="h-5 w-24 rounded bg-primary/10" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-8 w-full rounded bg-primary/10 md:h-10" />
            <div className="h-8 w-2/3 rounded bg-primary/10 md:h-10" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-5 w-full rounded bg-primary/10" />
            <div className="h-5 w-4/5 rounded bg-primary/10" />
          </div>
        </header>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex min-w-0 flex-col gap-6">
            {/* Mobile TOC */}
            <div className="rounded-lg border-2 border-primary/30 bg-[#bb99111a] p-4 lg:hidden">
              <div className="h-6 w-32 rounded bg-primary/15" />
            </div>

            <BlogContentSkeleton />
            <ActionsSkeleton />
            <ShareSkeleton />
            <CommentsSkeleton />
            <AdPlaceholder />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContentsSkeleton />
            </div>
          </aside>
        </div>

        <RelatedArticlesSkeleton />
      </div>
    </div>
    <span className="sr-only">Loading article…</span>
  </article>
);

export default BlogArticleSkeleton;
