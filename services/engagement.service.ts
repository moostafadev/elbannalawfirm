import "server-only";
import { unstable_cache } from "next/cache";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { COMMENTS_PAGE_SIZE, OBJECT_ID_PATTERN } from "@/constants/engagement";
import type {
  CommentItem,
  CommentsPage,
  EngagementResult,
} from "@/types/engagement";

const FIRST_PAGE_REVALIDATE_SECONDS = 300;

export const commentSelect = {
  id: true,
  name: true,
  content: true,
  createdAt: true,
} satisfies Prisma.CommentSelect;

type CommentRow = Prisma.CommentGetPayload<{ select: typeof commentSelect }>;

export const getCommentsTag = (blogId: string): string => `comments-${blogId}`;

export const toCommentItem = ({
  createdAt,
  ...comment
}: CommentRow): CommentItem => ({
  ...comment,
  createdAt: createdAt.toISOString(),
});

const queryComments = async (
  blogId: string,
  cursor?: string,
): Promise<CommentsPage> => {
  const where: Prisma.CommentWhereInput = { blogId, approved: true };

  const [rows, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      select: commentSelect,
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      take: COMMENTS_PAGE_SIZE + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    }),
    prisma.comment.count({ where }),
  ]);

  const items = rows.slice(0, COMMENTS_PAGE_SIZE).map(toCommentItem);
  const hasMore = rows.length > COMMENTS_PAGE_SIZE;

  return {
    items,
    nextCursor: hasMore ? items[items.length - 1].id : null,
    total,
  };
};

const fetchFirstPage = (blogId: string): Promise<CommentsPage> =>
  unstable_cache(() => queryComments(blogId), ["blog-comments", blogId], {
    revalidate: FIRST_PAGE_REVALIDATE_SECONDS,
    tags: [getCommentsTag(blogId)],
  })();

export async function getCommentsPage(
  blogId: string,
  cursor?: string,
): Promise<EngagementResult<CommentsPage>> {
  if (!OBJECT_ID_PATTERN.test(blogId)) {
    return { success: false, error: "not_found" };
  }

  try {
    const data = cursor
      ? await queryComments(blogId, cursor)
      : await fetchFirstPage(blogId);

    return { success: true, data };
  } catch (error) {
    console.error("[getCommentsPage]", error);
    return { success: false, error: "failed" };
  }
}
