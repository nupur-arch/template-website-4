"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  category?: string;
  aspectRatioClass?: string;
  className?: string;
}

export function SafeImage({
  src,
  alt = "Article illustration",
  category,
  aspectRatioClass,
  className,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const shouldShowFallback = !src || hasError;

  if (shouldShowFallback) {
    return (
      <div
        className={cn(
          "relative overflow-hidden flex flex-col items-center justify-center p-6 select-none",
          "bg-gradient-to-br from-[#F5F1E8] via-[#EFE8DC] to-[#E5DDCB] dark:from-[#211A14] dark:via-[#19140F] dark:to-[#130F0C]",
          "border border-[#E2DACB] dark:border-[#2C241D]",
          aspectRatioClass || "aspect-[16/10] w-full",
          className
        )}
        aria-label={alt || "Illustration placeholder"}
      >
        {/* Subtle newsprint tactile texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Diagonal editorial fine lines */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="0.75" />
          </svg>
        </div>

        {/* Central Logo Mark */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-3">
          <div className="p-3.5 rounded-2xl bg-white/70 dark:bg-black/40 backdrop-blur-sm border border-saffron/30 shadow-sm">
            <Logo variant="mark" size={36} className="text-saffron" />
          </div>
          {category && (
            <span className="inline-block text-[10px] tracking-[0.25em] uppercase font-mono font-medium px-2.5 py-1 rounded-full bg-saffron/15 text-saffron-700 dark:text-saffron-300 border border-saffron/20">
              {category}
            </span>
          )}
          <span className="text-[11px] font-serif italic text-warmblack/50 dark:text-paper-400 max-w-[200px] line-clamp-1">
            Dispatch Archival Plate
          </span>
        </div>

        {/* Corner stamp details */}
        <div className="absolute bottom-2 left-3 text-[9px] font-mono uppercase tracking-widest text-warmblack/40 dark:text-paper-400">
          SP • ARCHIVE
        </div>
        <div className="absolute top-2 right-3 text-[9px] font-mono text-warmblack/30 dark:text-paper-500">
          FIG. NO. 04
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-paper-200 dark:bg-warmblack-900",
        aspectRatioClass,
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-all duration-700 ease-out object-cover",
          isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
        )}
        {...props}
      />
    </div>
  );
}
