"use client";

import { useState, useEffect } from "react";

const useScrollDirection = (threshold: number = 0) => {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      setScrollTimeout(
        setTimeout(() => {
          const currentScrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;

          if (currentScrollTop > lastScrollTop + threshold) {
            setScrollDirection("down");
          } else if (currentScrollTop < lastScrollTop - threshold) {
            setScrollDirection("up");
          }

          setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
        }, 10)
      );
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollTop, threshold, scrollTimeout]);

  return scrollDirection;
};

export default useScrollDirection;
