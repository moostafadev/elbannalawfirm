import { LOCALE_TAGS } from "@/constants/blog";
import type { ContentItem, TocItem } from "@/types/blog";

const HEADING_PATTERN = /^\s*<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>\s*$/i;
const TAG_PATTERN = /<[^>]*>/g;
const ENTITY_PATTERN = /&(amp|lt|gt|quot|#39);/g;
const TOC_MAX_LEVEL = 3;
const WORDS_PER_MINUTE = 200;
const HEADING_SCROLL_OFFSET = "7rem";

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

export const stripHtml = (html: string): string =>
  html
    .replace(TAG_PATTERN, " ")
    .replace(ENTITY_PATTERN, (entity) => ENTITIES[entity] ?? entity)
    .replace(/\s+/g, " ")
    .trim();

export const getReadingTime = (content: string[]): number => {
  const words = content.reduce((sum, html) => {
    const text = stripHtml(html);
    return sum + (text ? text.split(" ").length : 0);
  }, 0);

  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export const prepareContent = (
  content: string[],
): { items: ContentItem[]; toc: TocItem[] } => {
  const toc: TocItem[] = [];

  const items = content.map((html, index): ContentItem => {
    const match = HEADING_PATTERN.exec(html);
    if (!match) return { html };

    const text = stripHtml(match[3]);
    if (!text) return { html };

    const level = Number(match[1]);
    const tag = level === 1 ? 2 : level;
    const id = `section-${index}`;

    if (level <= TOC_MAX_LEVEL) toc.push({ id, text, level: tag });

    return {
      html: `<h${tag} id="${id}" style="scroll-margin-top:${HEADING_SCROLL_OFFSET}"${match[2]}>${match[3]}</h${tag}>`,
    };
  });

  return { items, toc };
};

export const formatBlogDate = (iso: string, locale: LocaleKey): string =>
  new Date(iso).toLocaleDateString(LOCALE_TAGS[locale], {
    dateStyle: "long",
    timeZone: "Africa/Cairo",
  });

export const parsePage = (value?: string | string[]): number => {
  const parsed = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

export const buildBlogsHref = (page: number, category?: string): string => {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));

  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
};

export const getPageNumbers = (
  page: number,
  totalPages: number,
): (number | "gap")[] => {
  const sorted = Array.from(new Set([1, totalPages, page - 1, page, page + 1]))
    .filter((item) => item >= 1 && item <= totalPages)
    .sort((a, b) => a - b);

  return sorted.reduce<(number | "gap")[]>((acc, item, index) => {
    if (index > 0 && item - sorted[index - 1] > 1) acc.push("gap");
    acc.push(item);
    return acc;
  }, []);
};
