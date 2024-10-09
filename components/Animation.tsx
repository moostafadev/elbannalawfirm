"use client";

import React, { useEffect } from "react";
import ScrollReveal from "scrollreveal";

const Animation = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const sr = ScrollReveal({
      origin: "top",
      distance: "20px",
      duration: 1000,
      reset: false,
    });

    sr.reveal(".content-data", {
      interval: 200,
    });
  }, []);

  return <div className="content-data">{children}</div>;
};

export default Animation;
