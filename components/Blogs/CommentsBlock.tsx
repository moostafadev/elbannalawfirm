import React from "react";
import CommentsSection from "./CommentsSection";
import { getCommentsPage } from "@/services/engagement.service";

interface CommentsBlockProps {
  blogId: string;
  locale: LocaleKey;
}

const CommentsBlock = async ({ blogId, locale }: CommentsBlockProps) => {
  const res = await getCommentsPage(blogId);

  return (
    <CommentsSection
      key={blogId}
      blogId={blogId}
      locale={locale}
      initial={res.success ? res.data : null}
    />
  );
};

export default CommentsBlock;
