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

    const loadAd = () => {
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
        console.log(
          error instanceof Error ? error.message : "adsbygoogle error",
        );
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

  return (
    <div ref={wrapperRef} className="w-full">
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ display: status === "unfilled" ? "none" : "block" }}
        data-ad-client="ca-pub-5760588310891464"
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      ></ins>
      {status === "unfilled" ? <HouseAd /> : null}
    </div>
  );
};

export default memo(AdBanner);
