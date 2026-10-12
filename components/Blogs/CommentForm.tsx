"use client";

import React, {
  memo,
  useCallback,
  useId,
  useState,
  useTransition,
} from "react";
import { addComment } from "@/actions/engagement.actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  COMMENT_LIMITS,
  ENGAGEMENT_TEXTS,
  getErrorMessage,
} from "@/constants/engagement";
import CustomButton from "../CustomButton";
import type { CommentItem } from "@/types/engagement";
import { Send } from "lucide-react";

interface CommentFormProps {
  blogId: string;
  locale: LocaleKey;
  onAdded: (comment: CommentItem) => void;
}

const CommentForm = ({ blogId, locale, onAdded }: CommentFormProps) => {
  const texts = ENGAGEMENT_TEXTS[locale];
  const nameId = useId();
  const contentId = useId();
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [website, setWebsite] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const isValid =
    name.trim().length >= COMMENT_LIMITS.nameMin &&
    content.trim().length >= COMMENT_LIMITS.contentMin;

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!isValid || isPending) return;

      setError(null);

      startTransition(async () => {
        const res = await addComment({ blogId, name, content, website });

        if (!res.success) {
          setError(getErrorMessage(locale, res.error));
          return;
        }

        onAdded(res.data);
        setContent("");
        toast({ title: texts.commentAdded });
      });
    },
    [
      blogId,
      name,
      content,
      website,
      isValid,
      isPending,
      locale,
      onAdded,
      texts.commentAdded,
    ],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border-2 border-primary bg-[#bb99111a] p-4 md:p-5"
    >
      <h3 className="text-base font-bold text-primary md:text-lg">
        {texts.leaveComment}
      </h3>

      <div className="flex flex-col gap-2">
        <label htmlFor={nameId} className="text-sm font-semibold">
          {texts.nameLabel}
        </label>
        <Input
          id={nameId}
          value={name}
          maxLength={COMMENT_LIMITS.nameMax}
          onChange={(e) => setName(e.target.value)}
          className="border border-primary/60 bg-white"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor={contentId} className="text-sm font-semibold">
          {texts.commentLabel}
        </label>
        <Textarea
          id={contentId}
          rows={5}
          value={content}
          maxLength={COMMENT_LIMITS.contentMax}
          onChange={(e) => setContent(e.target.value)}
          className="resize-none border border-primary/60 bg-white"
        />
        <span className="self-end text-xs text-neutral-600">
          {content.length}/{COMMENT_LIMITS.contentMax}
        </span>
      </div>

      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      {error ? (
        <p role="alert" className="text-sm font-semibold text-red-600">
          {error}
        </p>
      ) : null}

      <div className="mt-2 flex items-center justify-end gap-3 border-t border-primary/20 pt-4">
        <span className="text-xs text-neutral-500">
          {content.length}/{COMMENT_LIMITS.contentMax}
        </span>
        <CustomButton
          type="submit"
          size="fit"
          color="yellow"
          isLoading={isPending}
          disabled={!isValid}
          className="!gap-2 !px-5 !py-2.5"
        >
          <Send size={16} />
          {texts.submit}
        </CustomButton>
      </div>
    </form>
  );
};

export default memo(CommentForm);
