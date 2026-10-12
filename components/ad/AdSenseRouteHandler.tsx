"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "@/i18n/routing";

const AdSenseRouteHandler = () => {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const timer = setTimeout(() => {
      try {
        const ads = document.querySelectorAll<HTMLElement>(
          ".adsbygoogle:not([data-ad-status])",
        );
        ads.forEach(() => {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
      } catch (error) {
        console.error("[AdSenseRouteHandler]", error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default AdSenseRouteHandler;
