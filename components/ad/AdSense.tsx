import Script from "next/script";
import React from "react";

interface IProps {
  pId: string;
}

const AdSense = ({ pId }: IProps) => {
  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
};

export default AdSense;
