import { z } from "zod";
import { COMMENT_LIMITS, OBJECT_ID_PATTERN } from "@/constants/engagement";

const LINK_PATTERN =
  /(?:https?:\/\/|www\.|\b[a-z0-9-]+\.(?:com|net|org|io|info|xyz|top|site|online|shop|link|click|ru|cn)\b)/i;

const MULTI_BREAKS = /\n{3,}/g;

export const commentSchema = z
  .object({
    blogId: z.string().regex(OBJECT_ID_PATTERN),
    name: z
      .string()
      .trim()
      .min(COMMENT_LIMITS.nameMin)
      .max(COMMENT_LIMITS.nameMax),
    content: z
      .string()
      .transform((value) => value.trim().replace(MULTI_BREAKS, "\n\n"))
      .pipe(
        z
          .string()
          .min(COMMENT_LIMITS.contentMin)
          .max(COMMENT_LIMITS.contentMax),
      ),
  })
  .refine(
    ({ name, content }) =>
      !LINK_PATTERN.test(name) && !LINK_PATTERN.test(content),
  );
