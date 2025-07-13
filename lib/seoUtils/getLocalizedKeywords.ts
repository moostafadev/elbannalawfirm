import { getLocale } from "next-intl/server";

/**
 * Returns the localized keyword array for the current locale.
 */
export async function getLocalizedKeywords<T extends Record<string, string[]>>(
  keywordsMap: T
): Promise<string[] | undefined> {
  const locale = await getLocale();
  return keywordsMap[locale as keyof T];
}
