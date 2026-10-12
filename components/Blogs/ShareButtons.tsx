"use client";

import React, { memo, useCallback, useState } from "react";
import { Check, Facebook, Linkedin, Link2, MessageCircle } from "lucide-react";
import { BLOG_TEXTS } from "@/constants/blog";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  url: string;
  title: string;
  locale: LocaleKey;
}

const ICON_BASE =
  "flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary/60 text-primary duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-white md:h-10 md:w-10";

const ShareButtons = ({ url, title, locale }: ShareButtonsProps) => {
  const texts = BLOG_TEXTS[locale];
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const [copied, setCopied] = useState(false);

  const links = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      icon: MessageCircle,
    },
    {
      name: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
    },
    {
      name: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: Linkedin,
    },
  ];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [url]);

  return (
    <div
      className="flex items-center gap-1.5 md:gap-2"
      role="group"
      aria-label={texts.share}
    >
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={name}
          aria-label={name}
          className={ICON_BASE}
        >
          <Icon size={16} />
        </a>
      ))}
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? texts.linkCopied : texts.copyLink}
        aria-label={copied ? texts.linkCopied : texts.copyLink}
        className={cn(
          ICON_BASE,
          copied && "border-primary bg-primary text-white",
        )}
      >
        {copied ? <Check size={16} /> : <Link2 size={16} />}
      </button>
    </div>
  );
};

export default memo(ShareButtons);
