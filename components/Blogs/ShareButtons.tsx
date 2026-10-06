import React from "react";
import { Facebook, Linkedin, MessageCircle } from "lucide-react";
import CopyLinkButton from "./CopyLinkButton";
import { BLOG_TEXTS } from "@/constants/blog";

interface ShareButtonsProps {
  url: string;
  title: string;
  locale: LocaleKey;
}

const LINK_CLASS =
  "flex h-10 w-10 items-center justify-center rounded-md border-2 border-primary text-primary duration-300 hover:bg-primary hover:text-white";

const ShareButtons = ({ url, title, locale }: ShareButtonsProps) => {
  const texts = BLOG_TEXTS[locale];
  const encodedUrl = encodeURIComponent(url);

  const links = [
    {
      name: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
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

  return (
    <section className="flex flex-wrap items-center gap-3 border-t pt-4">
      <h3 className="font-bold">{texts.share}:</h3>
      {links.map(({ name, href, icon: Icon }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          title={name}
          aria-label={name}
          className={LINK_CLASS}
        >
          <Icon size={18} />
        </a>
      ))}
      <CopyLinkButton
        url={url}
        label={texts.copyLink}
        copiedLabel={texts.linkCopied}
      />
    </section>
  );
};

export default ShareButtons;
