"use client";

import { useState } from "react";
import { Share2, Check, Copy, Twitter, Linkedin } from "lucide-react";
import { siteConfig } from "@/content/site.config";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const articleUrl = typeof window !== "undefined" ? window.location.href : `${siteConfig.url}/article/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`"${title}" via @SaffronPress`);
    const url = encodeURIComponent(articleUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(articleUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleTwitterShare}
        className="p-2 rounded-full border border-paper-300 dark:border-warmblack-100 hover:border-saffron hover:text-saffron transition-colors text-muted-foreground"
        aria-label="Share on X"
        title="Share on X"
      >
        <Twitter className="w-4 h-4" />
      </button>

      <button
        onClick={handleLinkedInShare}
        className="p-2 rounded-full border border-paper-300 dark:border-warmblack-100 hover:border-saffron hover:text-saffron transition-colors text-muted-foreground"
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>

      <button
        onClick={handleCopy}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-paper-300 dark:border-warmblack-100 hover:border-saffron hover:text-saffron transition-colors text-xs font-mono text-muted-foreground"
        aria-label="Copy dispatch link"
        title="Copy dispatch link"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-semibold">Link Copied</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Folio</span>
          </>
        )}
      </button>
    </div>
  );
}
