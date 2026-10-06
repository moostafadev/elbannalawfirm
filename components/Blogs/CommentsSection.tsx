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
  ({ comment, locale }: { comment: CommentItem; locale: LocaleKey }) => (
    <li className="flex gap-3 rounded-lg border border-primary/30 bg-white p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
        {(Array.from(comment.name)[0] ?? "?").toUpperCase()}
      </div>
      <div className="flex min-w-0 flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold">{comment.name}</span>
          <time
            dateTime={comment.createdAt}
            className="text-xs text-neutral-600"
          >
            {formatBlogDate(comment.createdAt, locale)}
          </time>
        </div>
        <p className="whitespace-pre-line break-words text-sm md:text-base">
          {comment.content}
        </p>
      </div>
    </li>
  ),
);

CommentCard.displayName = "CommentCard";

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
    <section
      className="flex flex-col gap-6 border-t pt-6"
      aria-labelledby="comments-title"
    >
      <h2
        id="comments-title"
        className="flex items-center gap-2 text-2xl font-bold text-primary"
      >
        <MessageSquare size={24} />
        {texts.commentsTitle} ({total.toLocaleString(LOCALE_TAGS[locale])})
      </h2>

      <CommentForm blogId={blogId} locale={locale} onAdded={handleAdded} />

      {initial === null ? (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700"
        >
          {BLOG_TEXTS[locale].loadError}
        </p>
      ) : items.length === 0 ? (
        <p className="py-6 text-center text-muted-foreground">
          {texts.noComments}
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((comment) => (
            <CommentCard key={comment.id} comment={comment} locale={locale} />
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
    </section>
  );
};

export default memo(CommentsSection);
