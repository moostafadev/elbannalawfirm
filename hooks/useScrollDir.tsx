"use client";

import { useEffect, useRef, useState } from "react";

const useScrollDirection = (threshold = 0) => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const lastScrollTop = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        const current =
          document.documentElement.scrollTop || document.body.scrollTop;

        if (current > lastScrollTop.current + threshold) {
          setScrollDirection("down");
        } else if (current < lastScrollTop.current - threshold) {
          setScrollDirection("up");
        }

        lastScrollTop.current = current <= 0 ? 0 : current;
      }, 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [threshold]);

  return scrollDirection;
};

export default useScrollDirection;
