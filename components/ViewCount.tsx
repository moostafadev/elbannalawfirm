"use client";

import React, { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { usePathname } from "next/navigation";
import { createView, getViews } from "@/actions/views";
import { useLocale } from "next-intl";

const translations = {
  en: "Views",
  ar: "المشاهدات",
  fr: "Vues",
};

const EXPIRY_MINUTES = 30;

const ViewCount = () => {
  const locale = useLocale();
  const slug = usePathname();
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const title =
    translations[locale as keyof typeof translations] || translations.en;

  useEffect(() => {
    const key = `viewed-${slug}`;
    const stored = localStorage.getItem(key);

    if (stored) {
      const { timestamp } = JSON.parse(stored);
      const now = Date.now();
      const elapsed = (now - timestamp) / (1000 * 60);

      if (elapsed < EXPIRY_MINUTES) {
        getViews(slug)
          .then(setViews)
          .finally(() => setLoading(false));
        return;
      } else {
        localStorage.removeItem(key);
      }
    }

    const increment = async () => {
      await createView(slug);
      const updated = await getViews(slug);
      setViews(updated);
      localStorage.setItem(key, JSON.stringify({ timestamp: Date.now() }));
      setLoading(false);
    };

    increment();
  }, [slug]);

  return (
    <div
      title={title}
      className="fixed bottom-6 left-1/2 gap-1 -translate-x-1/2 z-20 rounded-lg py-1 px-3 bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown duration-300 border-2 border-primary flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg hover:bg-brown hover:text-primary"
    >
      {loading ? (
        <svg
          aria-hidden="true"
          className="w-6 h-6 text-gray-200 animate-spin fill-primary mx-auto"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M100 50.5908C100 78.2051..." fill="currentColor" />
          <path d="M93.9676 39.0409C96.393..." fill="currentFill" />
        </svg>
      ) : (
        <>
          <span className="font-semibold text-sm">{views}</span>
          <Eye size={17} />
        </>
      )}
    </div>
  );
};

export default ViewCount;
