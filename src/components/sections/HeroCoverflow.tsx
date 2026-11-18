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
  Sparkles,
  Flame,
  Clock,
  User,
  Bookmark,
  Compass,
} from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
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

        // Active center card vs side cards
        const isCenter = absOffset < 0.5;
        // Non-linear horizontal spacing so side cards peek with clean separation
        const sign = Math.sign(offset);
        const x = sign * (Math.pow(absOffset, 0.85) * 290);
        const z = -Math.min(absOffset * 180, 480);
        const rotateY = -sign * Math.min(absOffset * 38, 55);
        const scale = Math.max(0.74, 1 - absOffset * 0.08);
        const opacity = Math.max(0.18, 1 - absOffset * 0.28);
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

  // Initialize card positions IMMEDIATELY on mount (Fixes overlapping text in ss-2)
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

      // Refresh ScrollTrigger to ensure accurate layout
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
      className={cn(
        "relative w-full bg-background border-b border-paper-300 dark:border-warmblack-100",
        isReducedMotion ? "py-24" : "h-[380vh]" // 380vh runway ensures smooth scrolling and perfect holding
      )}
    >
      {/* Pinned Sticky Viewport: perfectly locked in place while scrolling */}
      <div
        ref={pinStageRef}
        className={cn(
          "w-full overflow-hidden flex flex-col justify-between items-center select-none",
          isReducedMotion ? "relative" : "sticky top-0 h-screen pt-20 sm:pt-24 pb-8"
        )}
      >
        {/* Subtle Ambient Background Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#FFB000_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top Header Label & Signature Stamp */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-saffron/15 text-saffron border border-saffron/30 font-bold shadow-sm">
              <Sparkles className="w-3 h-3 text-saffron" />
              01 / HERO 3D COVERFLOW
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-mono text-muted-foreground uppercase tracking-widest">
              <Layers className="w-3.5 h-3.5 text-saffron" /> 20 Stories Stream
            </span>
          </div>

          {/* Signature Stamp Motif */}
          <div className="hidden sm:block">
            <SignatureStamp size={80} text="LIVE • 20 STORIES • SAFFRON PRESS • " centerText="01/20" />
          </div>
        </div>

        {/* Center Title */}
        <div className="relative z-10 text-center max-w-2xl px-4 my-2 pointer-events-none">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-saffron font-bold flex items-center justify-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-saffron" /> THE MONUMENTAL ARCHIVE
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground leading-[1.08] mt-1">
            Frontline Chronicles <span className="italic font-normal text-saffron">in Pure 3D</span>
          </h1>
        </div>

        {/* Main 3D Coverflow Stage */}
        {!isReducedMotion ? (
          <div className="relative w-full flex-1 max-h-[500px] flex items-center justify-center">
            {/* Left Nav Pill Button */}
            <button
              onClick={() => navigateToCard(currentIndex - 1)}
              disabled={currentIndex === 0}
              className="absolute left-4 sm:left-12 z-40 p-3 rounded-full bg-warmblack/80 hover:bg-saffron text-white hover:text-warmblack border border-white/10 backdrop-blur-md shadow-2xl transition-all disabled:opacity-20 disabled:pointer-events-none hover:scale-110 active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Nav Pill Button */}
            <button
              onClick={() => navigateToCard(currentIndex + 1)}
              disabled={currentIndex === items.length - 1}
              className="absolute right-4 sm:right-12 z-40 p-3 rounded-full bg-warmblack/80 hover:bg-saffron text-white hover:text-warmblack border border-white/10 backdrop-blur-md shadow-2xl transition-all disabled:opacity-20 disabled:pointer-events-none hover:scale-110 active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* 3D Track Container */}
            <div
              ref={trackRef}
              className="perspective-deep relative w-full max-w-5xl h-[340px] sm:h-[400px] md:h-[440px] flex items-center justify-center"
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
                      "absolute w-[290px] sm:w-[360px] md:w-[410px] h-[340px] sm:h-[390px] md:h-[430px] rounded-3xl preserve-3d will-change-transform cursor-pointer transition-shadow duration-300",
                      isSelected && "shadow-[0_25px_60px_-15px_rgba(255,176,0,0.3)]"
                    )}
                    style={{
                      transformOrigin: "50% 50% -120px",
                    }}
                  >
                    <Link
                      href={`/article/${article.slug}`}
                      className="block w-full h-full rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 shadow-xl group hover:border-saffron/70 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron coverflow-reflection"
                    >
                      {/* Cover Photo */}
                      <div className="relative w-full h-[52%] sm:h-[56%] overflow-hidden bg-paper-200 dark:bg-warmblack-900">
                        <SafeImage
                          src={article.coverImage}
                          alt={article.title}
                          category={article.category}
                          fill
                          sizes="(max-width: 768px) 360px, 440px"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Rank Pill with Flame Icon */}
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-warmblack/85 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-bold flex items-center gap-1 shadow-md">
                          <Flame className="w-3 h-3 text-saffron" />
                          <span>#{String(idx + 1).padStart(2, "0")}</span>
                        </div>

                        {/* Category Pill with Icon */}
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-saffron text-warmblack-950 font-mono text-[10px] uppercase tracking-wider font-bold shadow-md flex items-center gap-1.5">
                          <CategoryIcon categorySlug={article.categorySlug} className="w-3 h-3" />
                          <span>{article.category}</span>
                        </div>
                      </div>

                      {/* Content Body */}
                      <div className="p-4 sm:p-5 flex flex-col justify-between h-[48%] sm:h-[44%] bg-card text-card-foreground">
                        <div>
                          {/* Metadata Icons Row */}
                          <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground mb-1.5">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-saffron" />
                              {article.readTimeMinutes}m
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1 truncate">
                              <User className="w-3 h-3 text-muted-foreground" />
                              {article.author.name}
                            </span>
                          </div>

                          <h2 className="font-serif font-bold text-sm sm:text-base md:text-lg line-clamp-2 text-foreground group-hover:text-saffron transition-colors leading-snug">
                            {article.title}
                          </h2>
                        </div>

                        {/* Bottom Actions Row */}
                        <div className="pt-2 border-t border-paper-200 dark:border-warmblack-100 flex items-center justify-between">
                          <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[70%]">
                            #{article.tags[0] || "Dispatch"}
                          </span>
                          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-saffron group-hover:translate-x-0.5 transition-transform">
                            <span>Read</span>
                            <div className="w-6 h-6 rounded-full bg-saffron/20 flex items-center justify-center text-saffron">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
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
                href={`/article/${article.slug}`}
                className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-4 block hover:border-saffron shadow-md"
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
                <div className="text-[10px] font-mono text-saffron uppercase font-bold mb-1 flex items-center gap-1">
                  <CategoryIcon categorySlug={article.categorySlug} className="w-3 h-3" />
                  {article.category}
                </div>
                <h3 className="font-serif font-bold text-base text-foreground group-hover:text-saffron line-clamp-2">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        )}

        {/* Bottom Pinterest-Style Scrubber & Counter Pill */}
        <div className="relative z-10 w-full max-w-xl px-4">
          <div className="bg-[#18130F]/90 dark:bg-[#120E0A]/90 backdrop-blur-xl rounded-full border border-white/10 dark:border-saffron/30 p-2.5 shadow-2xl flex items-center gap-4 text-paper-50">
            {/* Number Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 font-mono font-bold text-xs">
              <span className="text-saffron text-sm">{activeNumber}</span>
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
              title="Click to jump to card"
            >
              <div
                className="h-full bg-saffron rounded-full transition-all duration-150 ease-out group-hover:brightness-110"
                style={{
                  width: `${Math.max(5, scrollProgress * 100)}%`,
                }}
              />
            </div>

            {/* Scroll Indicator with Layers Icon */}
            <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-saffron pr-2">
              <Layers className="w-3.5 h-3.5 text-saffron animate-pulse" />
              <span>Scroll down</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
