"use client";

import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Heart } from "lucide-react";
import { getLikeState, toggleLike } from "@/actions/engagement.actions";
import { toast } from "@/hooks/use-toast";
import { LOCALE_TAGS } from "@/constants/blog";
import { ENGAGEMENT_TEXTS, getErrorMessage } from "@/constants/engagement";
import { cn } from "@/lib/utils";
import type { LikeState } from "@/types/engagement";

interface LikeButtonProps {
  blogId: string;
  initialCount: number;
  locale: LocaleKey;
}

const LikeButton = ({ blogId, initialCount, locale }: LikeButtonProps) => {
  const texts = ENGAGEMENT_TEXTS[locale];
  const [state, setState] = useState<LikeState>({
    liked: false,
    count: initialCount,
  });
  const [isPending, startTransition] = useTransition();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    let active = true;

    getLikeState(blogId).then((res) => {
      if (active && res.success) setState(res.data);
    });

    return () => {
      active = false;
    };
  }, [blogId]);

  const handleToggle = useCallback(() => {
    const previous = state;
    const nextLiked = !previous.liked;

    setState({
      liked: nextLiked,
      count: Math.max(0, previous.count + (nextLiked ? 1 : -1)),
    });

    if (nextLiked) {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 600);
    }

    startTransition(async () => {
      const res = await toggleLike(blogId);

      if (res.success) {
        setState(res.data);
        return;
      }

      setState(previous);
      toast({
        variant: "destructive",
        title: getErrorMessage(locale, res.error),
      });
    });
  }, [blogId, locale, state]);

  const label = state.liked ? texts.unlike : texts.like;

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={state.liked}
      aria-label={label}
      title={label}
      className={cn(
        "flex items-center gap-2 rounded-md border-2 border-primary px-3 py-2 text-sm font-semibold shadow-sm duration-300 sm:rounded-lg sm:px-4 sm:text-base",
        "hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60",
        state.liked
          ? "bg-primary text-white hover:opacity-80"
          : "bg-transparent text-primary hover:bg-primary/10",
      )}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {burst ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 animate-heart-ring rounded-full bg-white/70"
          />
        ) : null}
        <Heart
          size={18}
          strokeWidth={2.5}
          fill={state.liked ? "currentColor" : "none"}
          className={cn(
            "relative transition-transform duration-300",
            burst && "scale-110",
          )}
        />
      </span>

      <span
        className={cn(
          "rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums sm:text-sm",
          state.liked ? "bg-white/20" : "bg-primary/15",
        )}
      >
        {state.count.toLocaleString(LOCALE_TAGS[locale])}
      </span>
    </button>
  );
};

export default memo(LikeButton);
