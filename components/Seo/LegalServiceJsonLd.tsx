import React from "react";
import { SITE_URL } from "@/constants/site";
import { openGraphLinks, titleMap } from "@/lib/seoUtils/constants";

interface LegalServiceJsonLdProps {
  locale: LocaleKey;
  description: string;
}

const LegalServiceJsonLd = ({
  locale,
  description,
}: LegalServiceJsonLdProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": `${SITE_URL}/#organization`,
    name: titleMap[locale],
    url: `${SITE_URL}/${locale}`,
    description,
    logo: `${SITE_URL}/logo/logo.png`,
    image: `${SITE_URL}/logo/opengraph.jpg`,
    telephone: "+201000728654",
    areaServed: { "@type": "Country", name: "Egypt" },
    address: {
      "@type": "PostalAddress",
      streetAddress: "3 Al Sharif Buildings, Aswan Street",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: Object.values(openGraphLinks),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
};

export default LegalServiceJsonLd;
