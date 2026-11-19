"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Layers,
  Flame,
  Clock,
  User,
} from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

interface HeroCoverflowProps {
  articles: Article[];
}

export function HeroCoverflow({ articles }: HeroCoverflowProps) {
  // Exactly 20 articles
  const items = useMemo(() => articles.slice(0, 20), [articles]);

  const containerRef = useRef<HTMLDivElement>(null);
  const pinStageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const { scrollTo } = useSmoothScroll();

  /**
   * Pure mathematical 3D Coverflow positioning
   */
  const applyCardTransforms = useCallback(
    (prog: number) => {
      const total = items.length;
      if (total <= 0) return;

      const rawIdx = prog * (total - 1);
      const activeIdx = Math.min(total - 1, Math.max(0, Math.round(rawIdx)));
      setCurrentIndex(activeIdx);
      setScrollProgress(prog);

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const offset = i - rawIdx;
        const absOffset = Math.abs(offset);

        // Hide cards out of view for 60fps performance & zero overlapping
        if (absOffset > 3.8) {
          gsap.set(card, {
            opacity: 0,
            pointerEvents: "none",
            display: "none",
          });
          return;
        }

        const sign = Math.sign(offset);
        // Non-linear horizontal spacing so side cards peek with clean separation
        const x = sign * (Math.pow(absOffset, 0.85) * 310);
        const z = -Math.min(absOffset * 190, 500);
        const rotateY = -sign * Math.min(absOffset * 40, 55);
        const scale = Math.max(0.72, 1 - absOffset * 0.08);
        const opacity = Math.max(0.15, 1 - absOffset * 0.28);
        const zIndex = 60 - Math.round(absOffset * 10);

        gsap.set(card, {
          display: "block",
          x,
          z,
          rotateY,
          scale,
          opacity,
          zIndex,
          pointerEvents: absOffset < 1.2 ? "auto" : "none",
        });
      });
    },
    [items.length]
  );

  // Initialize card positions immediately on mount
  useEffect(() => {
    applyCardTransforms(0);
  }, [applyCardTransforms]);

  // Setup GSAP ScrollTrigger for 380vh scroll runway
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          applyCardTransforms(self.progress);
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [applyCardTransforms]);

  // Direct programmatic jump to card
  const navigateToCard = (targetIdx: number) => {
    const total = items.length;
    const clamped = Math.max(0, Math.min(total - 1, targetIdx));
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;

    const targetScrollY = sectionTop + (clamped / (total - 1)) * scrollableDistance;
    scrollTo(targetScrollY);
  };

  const activeNumber = String(currentIndex + 1).padStart(2, "0");
  const totalNumber = String(items.length).padStart(2, "0");

  return (
    <section
      ref={containerRef}
      id="hero"
      aria-label="Destaques em 3D Coverflow"
      className={cn(
        "relative w-full bg-background border-b border-paper-300 dark:border-warmblack-100",
        isReducedMotion ? "py-20" : "h-[380vh]"
      )}
    >
      {/* Pinned Sticky Viewport */}
      <div
        ref={pinStageRef}
        className={cn(
          "w-full overflow-hidden flex flex-col justify-center items-center select-none",
          isReducedMotion ? "relative" : "sticky top-0 h-screen pt-14 pb-8"
        )}
      >
        {/* Subtle Ambient Background Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#0E9F6E_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* 3D Coverflow Stage */}
        {!isReducedMotion ? (
          <div className="relative w-full flex-1 flex items-center justify-center">
            {/* Left Nav Pill Button */}
            <button
              onClick={() => navigateToCard(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="absolute left-3 sm:left-10 z-40 p-3 rounded-full bg-warmblack/80 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-md shadow-2xl transition-all disabled:opacity-20 disabled:pointer-events-none hover:scale-110 active:scale-95"
              aria-label="Guia anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Pill Button */}
            <button
              onClick={() => navigateToCard(currentIndex + 1)}
              disabled={currentIndex === items.length - 1}
              className="absolute right-3 sm:right-10 z-40 p-3 rounded-full bg-warmblack/80 hover:bg-emerald-600 text-white border border-white/10 backdrop-blur-md shadow-2xl transition-all disabled:opacity-20 disabled:pointer-events-none hover:scale-110 active:scale-95"
              aria-label="Próximo guia"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* 3D Track Container */}
            <div
              ref={trackRef}
              className="perspective-deep relative w-full max-w-6xl h-[420px] sm:h-[480px] md:h-[500px] flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {items.map((article, idx) => {
                const isSelected = idx === currentIndex;

                return (
                  <div
                    key={article.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    onClick={() => {
                      if (!isSelected) navigateToCard(idx);
                    }}
                    className={cn(
                      "absolute w-[300px] sm:w-[380px] md:w-[430px] h-[390px] sm:h-[450px] md:h-[480px] rounded-3xl preserve-3d will-change-transform cursor-pointer transition-shadow duration-300",
                      isSelected && "shadow-[0_25px_60px_-15px_rgba(14,159,110,0.35)]"
                    )}
                    style={{
                      transformOrigin: "50% 50% -120px",
                    }}
                  >
                    <Link
                      href={`/artigos/${article.slug}`}
                      className="block w-full h-full rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 shadow-2xl group hover:border-emerald-500/70 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 coverflow-reflection"
                    >
                      {/* Cover Photo */}
                      <div className="relative w-full h-[54%] overflow-hidden bg-paper-200 dark:bg-warmblack-900">
                        <SafeImage
                          src={article.coverImage}
                          alt={article.title}
                          category={article.category}
                          fill
                          sizes="(max-width: 768px) 380px, 450px"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Rank Pill with Flame Icon */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-warmblack/85 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-bold flex items-center gap-1 shadow-md">
                          <Flame className="w-3 h-3 text-amber-400" />
                          <span>#{String(idx + 1).padStart(2, "0")}</span>
                        </div>

                        {/* Category Pill with Icon */}
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-[10px] uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5">
                          <CategoryIcon categorySlug={article.categorySlug} className="w-3 h-3" />
                          <span>{article.category}</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex flex-col justify-between h-[46%] bg-card text-card-foreground">
                        <div>
                          {/* Metadata Icons Row */}
                          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-1.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-emerald-500" />
                              {article.readTimeMinutes} min
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 truncate">
                              <User className="w-3 h-3 text-muted-foreground" />
                              {article.author.name}
                            </span>
                          </div>

                          <h2 className="font-serif font-bold text-base sm:text-lg md:text-xl line-clamp-2 text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                            {article.title}
                          </h2>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="pt-2 border-t border-paper-200 dark:border-warmblack-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[70%]">
                            #{article.subtopic || article.tags[0] || "Movimento"}
                          </span>
                          <div className="w-7 h-7 rounded-full bg-emerald-500/15 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Reduced Motion: Clean grid fallback */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((article, idx) => (
              <Link
                key={article.id}
                href={`/artigos/${article.slug}`}
                className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-4 block hover:border-emerald-500 shadow-md"
              >
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3">
                  <SafeImage
                    src={article.coverImage}
                    alt={article.title}
                    category={article.category}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-warmblack/80 text-white font-mono text-xs">
                    #{String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
                <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase font-bold mb-1 flex items-center gap-1">
                  <CategoryIcon categorySlug={article.categorySlug} className="w-3 h-3" />
                  {article.category}
                </div>
                <h3 className="font-serif font-bold text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-2">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom Scrubber & Counter Pill */}
        <div className="relative z-20 w-full max-w-md px-4 mt-2">
          <div className="bg-[#0F1B17]/90 dark:bg-[#09110F]/90 backdrop-blur-xl rounded-full border border-white/10 dark:border-emerald-500/30 px-3 py-2 shadow-2xl flex items-center gap-3 text-paper-50">
            {/* Number Pill */}
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/10 font-mono font-bold text-xs">
              <span className="text-emerald-400 text-sm">{activeNumber}</span>
              <span className="text-paper-400">/</span>
              <span className="text-paper-400">{totalNumber}</span>
            </div>

            {/* Interactive Progress Line Bar */}
            <div
              className="flex-1 h-2 bg-white/15 rounded-full overflow-hidden relative cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const ratio = clickX / rect.width;
                navigateToCard(Math.round(ratio * (items.length - 1)));
              }}
              title="Clique para avançar até o guia"
            >
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-150 ease-out group-hover:brightness-110"
                style={{
                  width: `${Math.max(5, scrollProgress * 100)}%`,
                }}
              />
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-emerald-400 pr-1">
              <Layers className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span className="hidden sm:inline">Deslize</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
