"use client";

import React, { memo, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/routing";
import { HOUSE_ADS, HOUSE_AD_LABEL } from "@/constants/ads";
import { toLocaleKey } from "@/lib/locale";

const BUTTON_CLASS =
  "flex max-w-fit items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-white shadow-sm duration-300 hover:opacity-80 sm:text-base";

const HouseAd = () => {
  const locale = toLocaleKey(useLocale());
  const pathname = usePathname();
  const [seed] = useState(() => Math.random());

  const available = HOUSE_ADS.filter((item) => item.href !== pathname);
  const ad = available[Math.floor(seed * available.length)] ?? HOUSE_ADS[0];
  const texts = ad.texts[locale];
  const label = HOUSE_AD_LABEL[locale];

  return (
    <aside
      aria-label={label}
      className="relative flex flex-col items-center gap-4 overflow-hidden rounded-lg border-2 border-primary bg-[#bb99111a] p-4 pt-6 shadow-sm sm:flex-row"
    >
      <span className="absolute end-2 top-1 text-[10px] font-semibold text-neutral-500">
        {label}
      </span>
      <Image
        src={ad.image}
        alt={texts.title}
        width={80}
        height={80}
        loading="lazy"
        className="h-20 w-auto shrink-0"
      />
      <div className="flex flex-1 flex-col gap-1 text-center sm:text-start">
        <p className="text-lg font-bold text-primary">{texts.title}</p>
        <p className="text-sm text-neutral-700">{texts.text}</p>
      </div>
      {ad.external ? (
        <a
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer"
          title={texts.title}
          className={BUTTON_CLASS}
        >
          {texts.cta}
        </a>
      ) : (
        <Link href={ad.href} title={texts.title} className={BUTTON_CLASS}>
          {texts.cta}
        </Link>
      )}
    </aside>
  );
};

export default memo(HouseAd);
