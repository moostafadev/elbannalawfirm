import React from "react";
import PopularBlogsSkeleton from "./PopularBlogsSkeleton";

const CARD_VARIANTS = [
  { title: "w-5/6", desc: ["w-full", "w-5/6", "w-4/5"] },
  { title: "w-4/5", desc: ["w-full", "w-3/4", "w-5/6"] },
  { title: "w-3/4", desc: ["w-full", "w-4/5", "w-3/4"] },
  { title: "w-5/6", desc: ["w-full", "w-5/6", "w-2/3"] },
  { title: "w-full", desc: ["w-full", "w-3/4", "w-4/5"] },
  { title: "w-4/5", desc: ["w-full", "w-5/6", "w-3/4"] },
];

const SkelPill = ({ className = "" }: { className?: string }) => (
  <span className={`block rounded-full bg-primary/15 ${className}`} />
);

const HeroSkeleton = () => (
  <div className="flex flex-col items-center gap-4 md:gap-6">
    <div className="h-9 w-56 rounded bg-primary/15" />
    <div className="flex w-full max-w-2xl flex-col items-center gap-2">
      <div className="h-4 w-full rounded bg-primary/10" />
      <div className="h-4 w-3/4 rounded bg-primary/10" />
    </div>
    <div className="flex w-full justify-center gap-2 overflow-hidden">
      {Array.from({ length: 6 }, (_, i) => (
        <SkelPill key={i} className="h-7 w-20 shrink-0 md:h-8" />
      ))}
    </div>
  </div>
);

const FeaturedVerticalSkeleton = () => (
  <div className="flex h-full flex-col overflow-hidden rounded-lg border-2 border-primary/30 bg-[#bb99111a]">
    <div className="aspect-[16/10] w-full bg-primary/10 sm:aspect-[16/9]" />
    <div className="flex flex-1 flex-col justify-center gap-3 p-4 md:gap-5 md:p-6 lg:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <SkelPill className="h-6 w-20 md:h-7 md:w-24" />
        <SkelPill className="h-6 w-16 md:h-7 md:w-20" />
        <SkelPill className="h-4 w-24 md:w-28" />
      </div>
      <div className="h-5 w-full rounded bg-primary/10 md:h-7" />
      <div className="h-5 w-3/4 rounded bg-primary/10 md:h-7" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-full rounded bg-primary/10" />
        <div className="h-4 w-5/6 rounded bg-primary/10" />
      </div>
      <div className="h-9 w-28 rounded-md bg-primary/15 md:w-32" />
    </div>
  </div>
);

const BlogCardSkeleton = ({ index = 0 }: { index?: number }) => {
  const variant = CARD_VARIANTS[index % CARD_VARIANTS.length];

  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-lg border-2 border-primary/30 bg-[#bb99111a]">
      <div className="aspect-[800/420] w-full bg-primary/10" />
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <SkelPill className="h-6 w-20" />
          <SkelPill className="h-4 w-24" />
        </div>
        <div className={`h-5 rounded bg-primary/10 ${variant.title}`} />
        {variant.desc.map((w, i) => (
          <div key={i} className={`h-4 rounded bg-primary/10 ${w}`} />
        ))}
      </div>
      <div className="mt-auto flex items-center justify-between gap-3 p-4 pt-0">
        <div className="flex items-center gap-3">
          <div className="h-4 w-10 rounded bg-primary/10" />
          <div className="h-4 w-10 rounded bg-primary/10" />
        </div>
        <div className="h-9 w-28 rounded-md bg-primary/15" />
      </div>
    </div>
  );
};

const SectionHeaderSkeleton = () => (
  <div className="flex flex-col gap-1.5 border-b border-primary/20 pb-3 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-3 md:pb-4">
    <div className="h-6 w-40 rounded bg-primary/15 md:h-8 md:w-56" />
    <div className="h-5 w-20 rounded bg-primary/10" />
  </div>
);

const PaginationSkeleton = () => (
  <div className="flex flex-wrap items-center justify-center gap-2">
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className="h-10 w-10 rounded-md border-2 border-primary/20 bg-primary/5"
      />
    ))}
  </div>
);

const AdSkeleton = () => (
  <div className="min-h-[100px] w-full rounded-lg border border-dashed border-primary/20 bg-primary/5" />
);

interface BlogsSkeletonProps {
  count?: number;
  showFeatured?: boolean;
}

const BlogsSkeleton = ({
  count = 8,
  showFeatured = true,
}: BlogsSkeletonProps) => (
  <section className="py-10 md:py-14" aria-busy="true" aria-live="polite">
    <div className="container flex flex-col gap-10 md:gap-12">
      <HeroSkeleton />

      {showFeatured ? (
        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8">
          <FeaturedVerticalSkeleton />
          <aside className="h-fit lg:sticky lg:top-28">
            <PopularBlogsSkeleton />
          </aside>
        </div>
      ) : null}

      <AdSkeleton />

      <div className="flex flex-col gap-6 md:gap-8">
        <SectionHeaderSkeleton />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-7">
          {Array.from({ length: count }, (_, i) => (
            <BlogCardSkeleton key={i} index={i} />
          ))}
        </div>

        <PaginationSkeleton />
      </div>
    </div>
    <span className="sr-only">Loading articles…</span>
  </section>
);

export default BlogsSkeleton;
