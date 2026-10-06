const LOCALES: readonly LocaleKey[] = ["ar", "en", "fr"];

export const DEFAULT_LOCALE: LocaleKey = "ar";

export const toLocaleKey = (locale: string): LocaleKey =>
  LOCALES.find((item) => item === locale) ?? DEFAULT_LOCALE;

export const getDirection = (locale: LocaleKey): "rtl" | "ltr" =>
  locale === "ar" ? "rtl" : "ltr";
