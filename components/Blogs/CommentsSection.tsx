"use client";

import React, { memo, useCallback, useState } from "react";
import { MessageSquare } from "lucide-react";
import { loadMoreComments } from "@/actions/engagement.actions";
import { toast } from "@/hooks/use-toast";
import { BLOG_TEXTS, LOCALE_TAGS } from "@/constants/blog";
import { ENGAGEMENT_TEXTS, getErrorMessage } from "@/constants/engagement";
import { formatBlogDate } from "@/lib/blog";
import CustomButton from "../CustomButton";
import CommentForm from "./CommentForm";
import type { CommentItem, CommentsPage } from "@/types/engagement";

interface CommentsSectionProps {
  blogId: string;
  locale: LocaleKey;
  initial: CommentsPage | null;
}

const CommentCard = memo(
  ({ comment, locale }: { comment: CommentItem; locale: LocaleKey }) => {
    const initial = (Array.from(comment.name)[0] ?? "?").toUpperCase();

    return (
      <li className="flex gap-3 rounded-lg border border-primary/15 bg-white p-4 transition-colors duration-300 hover:border-primary/30 hover:bg-primary/[0.02] md:gap-4 md:p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-primary/5 text-sm font-bold text-primary ring-1 ring-primary/20 md:h-11 md:w-11 md:text-base">
          {initial}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="text-sm font-bold text-neutral-900 md:text-base">
              {comment.name}
            </span>
            <span aria-hidden="true" className="text-neutral-400">
              •
            </span>
            <time
              dateTime={comment.createdAt}
              className="text-xs text-neutral-500 md:text-sm"
            >
              {formatBlogDate(comment.createdAt, locale)}
            </time>
          </div>

          <p className="whitespace-pre-line break-words text-sm leading-relaxed text-neutral-700 md:text-base">
            {comment.content}
          </p>
        </div>
      </li>
    );
  },
);

CommentCard.displayName = "CommentCard";

const EmptyComments = ({ label }: { label: string }) => (
  <div className="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-primary/20 bg-primary/[0.02] px-6 py-12 text-center">
    <MessageSquare className="h-10 w-10 text-primary/30" strokeWidth={1.5} />
    <p className="text-sm text-neutral-500 md:text-base">{label}</p>
  </div>
);

const CommentsSection = ({ blogId, locale, initial }: CommentsSectionProps) => {
  const texts = ENGAGEMENT_TEXTS[locale];
  const [items, setItems] = useState<CommentItem[]>(initial?.items ?? []);
  const [nextCursor, setNextCursor] = useState<string | null>(
    initial?.nextCursor ?? null,
  );
  const [total, setTotal] = useState(initial?.total ?? 0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleAdded = useCallback((comment: CommentItem) => {
    setItems((prev) => [comment, ...prev]);
    setTotal((prev) => prev + 1);
  }, []);

  const handleLoadMore = useCallback(async () => {
    if (!nextCursor || isLoadingMore) return;

    setIsLoadingMore(true);

    try {
      const res = await loadMoreComments(blogId, nextCursor);

      if (!res.success) {
        toast({
          variant: "destructive",
          title: getErrorMessage(locale, res.error),
        });
        return;
      }

      setItems((prev) => {
        const ids = new Set(prev.map((item) => item.id));
        return [...prev, ...res.data.items.filter((item) => !ids.has(item.id))];
      });
      setNextCursor(res.data.nextCursor);
    } finally {
      setIsLoadingMore(false);
    }
  }, [blogId, locale, nextCursor, isLoadingMore]);

  return (
    <section className="border-t pt-6 md:pt-8" aria-labelledby="comments-title">
      {/* Header */}
      <h2
        id="comments-title"
        className="flex items-center gap-2 text-xl font-bold text-primary md:text-2xl"
      >
        <MessageSquare size={22} className="md:hidden" />
        <MessageSquare size={26} className="hidden md:block" />
        <span>{texts.commentsTitle}</span>
        <span className="text-sm font-medium text-neutral-500 md:text-base">
          ({total.toLocaleString(LOCALE_TAGS[locale])})
        </span>
      </h2>

      {/* Form + List grid */}
      <div className="mt-6 grid gap-6 md:mt-8 md:gap-8 lg:grid-cols-[340px_minmax(0,1fr)] lg:items-start">
        {/* Form — first on mobile, sticky left column on lg */}
        <div className="lg:sticky lg:top-28">
          <CommentForm blogId={blogId} locale={locale} onAdded={handleAdded} />
        </div>

        {/* Comments list */}
        <div className="flex flex-col gap-4">
          {initial === null ? (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700"
            >
              {BLOG_TEXTS[locale].loadError}
            </p>
          ) : items.length === 0 ? (
            <EmptyComments label={texts.noComments} />
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  locale={locale}
                />
              ))}
            </ul>
          )}

          {nextCursor ? (
            <CustomButton
              size="fit"
              color="yellow"
              onClick={handleLoadMore}
              isLoading={isLoadingMore}
              className="self-center"
            >
              {texts.loadMore}
            </CustomButton>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default memo(CommentsSection);
