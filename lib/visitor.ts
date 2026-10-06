import "server-only";
import { randomUUID } from "crypto";
import { cookies } from "next/headers";

const VISITOR_COOKIE = "visitor-id";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const UUID_PATTERN = /^[0-9a-f-]{36}$/i;

export const getVisitorId = (): string | null => {
  const value = cookies().get(VISITOR_COOKIE)?.value;
  return value && UUID_PATTERN.test(value) ? value : null;
};

// يجب استدعاؤها داخل Server Action فقط (لأن الكتابة في الكوكيز غير مسموحة أثناء الـ render)
export const getOrCreateVisitorId = (): string => {
  const existing = getVisitorId();
  if (existing) return existing;

  const id = randomUUID();

  cookies().set(VISITOR_COOKIE, id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
  });

  return id;
};
