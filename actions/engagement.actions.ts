"use server";

import { randomUUID } from "crypto";
import { revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { isPrismaUniqueError } from "@/lib/prisma-errors";
import { getOrCreateVisitorId, getVisitorId } from "@/lib/visitor";
import { commentSchema } from "@/lib/comment-validation";
import {
  commentSelect,
  getCommentsPage,
  getCommentsTag,
  toCommentItem,
} from "@/services/engagement.service";
import {
  OBJECT_ID_PATTERN,
  RATE_LIMIT_HOUR_MAX,
  RATE_LIMIT_HOUR_MS,
  RATE_LIMIT_SHORT_MS,
} from "@/constants/engagement";
import type {
  AddCommentInput,
  CommentItem,
  CommentsPage,
  EngagementResult,
  LikeState,
} from "@/types/engagement";

const isPublishedBlog = async (blogId: string): Promise<boolean> => {
  const blog = await prisma.blog.findFirst({
    where: { id: blogId, status: "show" },
    select: { id: true },
  });

  return blog !== null;
};

// ─── Likes ────────────────────────────────────────────────────────────────────

export async function getLikeState(
  blogId: string,
): Promise<EngagementResult<LikeState>> {
  if (!OBJECT_ID_PATTERN.test(blogId)) {
    return { success: false, error: "invalid" };
  }

  try {
    const visitorId = getVisitorId();

    const [count, mine] = await Promise.all([
      prisma.like.count({ where: { blogId } }),
      visitorId
        ? prisma.like.findUnique({
            where: { blogId_visitorId: { blogId, visitorId } },
            select: { id: true },
          })
        : null,
    ]);

    return { success: true, data: { liked: mine !== null, count } };
  } catch (error) {
    console.error("[getLikeState]", error);
    return { success: false, error: "failed" };
  }
}

export async function toggleLike(
  blogId: string,
): Promise<EngagementResult<LikeState>> {
  if (!OBJECT_ID_PATTERN.test(blogId)) {
    return { success: false, error: "invalid" };
  }

  try {
    if (!(await isPublishedBlog(blogId))) {
      return { success: false, error: "not_found" };
    }

    const visitorId = getOrCreateVisitorId();
    let liked = true;

    try {
      await prisma.like.create({
        data: { uuid: randomUUID(), blogId, visitorId },
      });
    } catch (error) {
      if (!isPrismaUniqueError(error)) throw error;
      await prisma.like.deleteMany({ where: { blogId, visitorId } });
      liked = false;
    }

    const count = await prisma.like.count({ where: { blogId } });

    return { success: true, data: { liked, count } };
  } catch (error) {
    console.error("[toggleLike]", error);
    return { success: false, error: "failed" };
  }
}

// ─── Comments ─────────────────────────────────────────────────────────────────

export async function addComment(
  input: AddCommentInput,
): Promise<EngagementResult<CommentItem>> {
  if (input.website) return { success: false, error: "spam" };

  const parsed = commentSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "invalid" };

  const { blogId, name, content } = parsed.data;

  try {
    const visitorId = getOrCreateVisitorId();
    const now = Date.now();

    const recent = await prisma.comment.findMany({
      where: {
        visitorId,
        createdAt: { gte: new Date(now - RATE_LIMIT_HOUR_MS) },
      },
      select: { createdAt: true, content: true },
      take: RATE_LIMIT_HOUR_MAX,
    });

    const tooFast = recent.some(
      (item) => now - item.createdAt.getTime() < RATE_LIMIT_SHORT_MS,
    );

    if (tooFast || recent.length >= RATE_LIMIT_HOUR_MAX) {
      return { success: false, error: "rate_limit" };
    }

    if (recent.some((item) => item.content === content)) {
      return { success: false, error: "spam" };
    }

    if (!(await isPublishedBlog(blogId))) {
      return { success: false, error: "not_found" };
    }

    const comment = await prisma.comment.create({
      data: {
        uuid: randomUUID(),
        name,
        content,
        blogId,
        visitorId,
        approved: true,
      },
      select: commentSelect,
    });

    revalidateTag(getCommentsTag(blogId));

    return { success: true, data: toCommentItem(comment) };
  } catch (error) {
    console.error("[addComment]", error);
    return { success: false, error: "failed" };
  }
}

export async function loadMoreComments(
  blogId: string,
  cursor: string,
): Promise<EngagementResult<CommentsPage>> {
  if (!OBJECT_ID_PATTERN.test(blogId) || !OBJECT_ID_PATTERN.test(cursor)) {
    return { success: false, error: "invalid" };
  }

  return getCommentsPage(blogId, cursor);
}
