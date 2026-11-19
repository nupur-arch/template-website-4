"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/brand/Logo";
import { Sparkles } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string;
  category?: string;
  aspectRatioClass?: string;
  className?: string;
}

export function SafeImage({
  src,
  alt = "Ilustração do artigo",
  category,
  aspectRatioClass,
  className,
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const shouldShowFallback = !src || hasError;
  const isFill = Boolean(props.fill);

  if (shouldShowFallback) {
    return (
      <div
        className={cn(
          "overflow-hidden flex flex-col items-center justify-center p-6 select-none",
          "bg-gradient-to-br from-[#E6F3EE] via-[#D8ECE4] to-[#C9E5DC] dark:from-[#172A24] dark:via-[#13221D] dark:to-[#0F1B17]",
          "border border-emerald-500/25 dark:border-emerald-500/20",
          isFill ? "absolute inset-0 w-full h-full" : aspectRatioClass || "aspect-[16/10] w-full",
          className
        )}
        aria-label={alt || "Imagem editorial Movimento na Rotina"}
      >
        {/* Subtle tactile texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "16px 16px",
          }}
        />

        {/* Diagonal editorial fine lines */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="currentColor" strokeWidth="0.75" />
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
          </svg>
        </div>

        {/* Central Monogram Seal */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-2.5">
          <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-black/50 backdrop-blur-md border border-emerald-500/40 shadow-md flex items-center justify-center">
            <Logo variant="mark" href={null} size={28} />
          </div>

          {category && (
            <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.22em] uppercase font-mono font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30 shadow-sm">
              <Sparkles className="w-2.5 h-2.5 text-amber-500" />
              {category}
            </span>
          )}

          <div className="space-y-0.5">
            <span className="text-[11px] font-serif font-black tracking-wide text-foreground/90 block">
              MOVIMENTO NA ROTINA
            </span>
            <span className="text-[9px] font-mono tracking-widest uppercase text-muted-foreground block">
              Guia Prático • Vida Ativa & Bem-Estar
            </span>
          </div>
        </div>

        {/* Corner editorial details */}
        <div className="absolute bottom-2.5 left-3 text-[9px] font-mono uppercase tracking-widest text-muted-foreground/70">
          MR • ACERVO
        </div>
        <div className="absolute top-2.5 right-3 text-[9px] font-mono uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-bold">
          EST. 2026
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden bg-paper-200 dark:bg-warmblack-900",
        isFill ? "absolute inset-0 w-full h-full" : cn("relative", aspectRatioClass),
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          "transition-opacity duration-300 ease-out object-cover",
          isLoaded ? "opacity-100" : "opacity-90"
        )}
        {...props}
      />
    </div>
  );
}
