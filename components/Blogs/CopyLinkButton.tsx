"use client";

import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Check, Link2 } from "lucide-react";

interface CopyLinkButtonProps {
  url: string;
  label: string;
  copiedLabel: string;
}

const RESET_DELAY_MS = 2000;

const CopyLinkButton = ({ url, label, copiedLabel }: CopyLinkButtonProps) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_DELAY_MS);
    } catch {
      setCopied(false);
    }
  }, [url]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={label}
      className="flex items-center gap-2 rounded-md border-2 border-primary px-3 py-2 text-sm font-semibold text-primary duration-300 hover:bg-primary/10"
    >
      {copied ? <Check size={18} /> : <Link2 size={18} />}
      <span>{copied ? copiedLabel : label}</span>
    </button>
  );
};

export default memo(CopyLinkButton);
