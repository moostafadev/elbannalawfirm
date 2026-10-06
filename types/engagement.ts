export interface CommentItem {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

export interface CommentsPage {
  items: CommentItem[];
  nextCursor: string | null;
  total: number;
}

export interface LikeState {
  liked: boolean;
  count: number;
}

export interface AddCommentInput {
  blogId: string;
  name: string;
  content: string;
  website?: string;
}

export type EngagementError =
  | "invalid"
  | "spam"
  | "rate_limit"
  | "not_found"
  | "failed";

export type EngagementResult<T> =
  | { success: true; data: T }
  | { success: false; error: EngagementError };
