"use client";

import React, { memo, useEffect, useRef, useState } from "react";
import HouseAd from "./HouseAd";

type AdBannerProps = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

type AdStatus = "idle" | "pending" | "filled" | "unfilled";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const FILL_TIMEOUT_MS = 4000;
const LOAD_MARGIN = "300px";
const MIN_HEIGHT = 100;

// أخطاء AdSense المعروفة بأنها benign — لا تستدعي معالجة
const BENIGN_ERRORS = ["already have ads", "No slot size", "availableWidth=0"];

const AdBanner: React.FC<AdBannerProps> = ({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const insRef = useRef<HTMLModElement>(null);
  const [status, setStatus] = useState<AdStatus>("idle");

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const ins = insRef.current;
    if (!wrapper || !ins) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    let statusObserver: MutationObserver | undefined;

    const readStatus = () => {
      const value = ins.getAttribute("data-ad-status");
      if (value === "filled") setStatus("filled");
      else if (value === "unfilled") setStatus("unfilled");
    };

    if (ins.getAttribute("data-adsbygoogle-status") === "done") {
      readStatus();
      return;
    }

    const loadAd = () => {
      if (ins.getAttribute("data-adsbygoogle-status") === "done") {
        readStatus();
        return;
      }

      setStatus("pending");

      statusObserver = new MutationObserver(readStatus);
      statusObserver.observe(ins, {
        attributes: true,
        attributeFilter: ["data-ad-status"],
      });

      timer = setTimeout(() => {
        setStatus((prev) => (prev === "pending" ? "unfilled" : prev));
      }, FILL_TIMEOUT_MS);

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        // تجاهل صامت للأخطاء المتوقعة من AdSense
        if (BENIGN_ERRORS.some((needle) => message.includes(needle))) {
          readStatus();
          return;
        }

        if (process.env.NODE_ENV !== "production") {
          console.warn("[AdBanner]", message);
        }
        setStatus("unfilled");
      }
    };

    const intersection = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        intersection.disconnect();
        loadAd();
      },
      { rootMargin: LOAD_MARGIN },
    );

    intersection.observe(wrapper);

    return () => {
      intersection.disconnect();
      statusObserver?.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const showHouse = status === "unfilled";

  return (
    <div ref={wrapperRef} className="w-full">
      {showHouse ? (
        <HouseAd />
      ) : (
        <ins
          ref={insRef}
          className="adsbygoogle block w-full"
          suppressHydrationWarning
          style={{ display: "block", width: "100%", minHeight: MIN_HEIGHT }}
          data-ad-client="ca-pub-5760588310891464"
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />
      )}
    </div>
  );
};

export default memo(AdBanner);
