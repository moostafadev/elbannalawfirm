import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

export type TranslationFunction = Awaited<ReturnType<typeof getTranslations>>;
export type TranslationKey = Parameters<ReturnType<typeof useTranslations>>[0];

// Manually declare the locales you support
export type LocaleKey = "en" | "fr" | "ar";
