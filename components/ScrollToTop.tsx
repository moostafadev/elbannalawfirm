"use client";

import { ChevronUp } from "lucide-react";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      className={`fixed ${
        isShow ? "bottom-6" : "-bottom-20"
      } right-4 z-20 p-2 rounded-lg sm:w-[44px] sm:h-[44px] w-[40px] h-[40px] bg-[hsl(48,83%,40%,.2)] backdrop-blur-sm text-brown duration-300 border-2 border-primary flex justify-center items-center cursor-pointer shadow-md hover:shadow-lg hover:scale-110 hover:bg-brown hover:text-primary hover:-translate-y-1`}
      onClick={handleToTop}
    >
      <ChevronUp />
    </div>
  );
};

export default ScrollToTop;
