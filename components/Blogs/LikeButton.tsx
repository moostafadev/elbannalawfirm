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

    setState({
      liked: !previous.liked,
      count: Math.max(0, previous.count + (previous.liked ? -1 : 1)),
    });

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

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isPending}
      aria-pressed={state.liked}
      aria-label={state.liked ? texts.unlike : texts.like}
      className={cn(
        "flex items-center gap-2 rounded-md border-2 border-primary px-3 py-2 text-sm font-semibold duration-300 disabled:cursor-not-allowed disabled:opacity-60",
        state.liked
          ? "bg-primary text-white"
          : "text-primary hover:bg-primary/10",
      )}
    >
      <Heart size={18} fill={state.liked ? "currentColor" : "none"} />
      <span>{texts.like}</span>
      <span>{state.count.toLocaleString(LOCALE_TAGS[locale])}</span>
    </button>
  );
};

export default memo(LikeButton);
