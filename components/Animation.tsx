"use client";

import React, { useEffect } from "react";

const Animation = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    async function animate() {
      const sr = (await import("scrollreveal")).default;
      sr({
        origin: "bottom",
        distance: "20px",
        duration: 1000,
        reset: false,
      }).reveal(".content-data", {
        interval: 100,
      });
    }

    animate();
  }, []);

  return <div className="content-data">{children}</div>;
};

export default Animation;
