"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Sparkles } from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { cn } from "@/lib/utils";

interface HeroCoverflowProps {
  articles: Article[];
}

export function HeroCoverflow({ articles }: HeroCoverflowProps) {
  // Ensure exactly 20 articles
  const items = useMemo(() => articles.slice(0, 20), [articles]);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !trackRef.current) return;

      const totalItems = items.length;
      if (totalItems <= 1) return;

      // Master scroll-driven coverflow timeline
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=320%", // ~350vh total scroll distance
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          // Active index in [0, 19]
          const rawIdx = prog * (totalItems - 1);
          const activeIdx = Math.min(totalItems - 1, Math.max(0, Math.round(rawIdx)));
          setCurrentIndex(activeIdx);

          // Update each 3D card position in real time
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            const offset = i - rawIdx;
            const absOffset = Math.abs(offset);

            // Hide cards far out of view for 60fps performance
            if (absOffset > 4.5) {
              gsap.set(card, {
                opacity: 0,
                pointerEvents: "none",
                display: "none",
              });
              return;
            }

            const x = offset * 260; // horizontal separation
            const z = -Math.min(absOffset * 170, 500); // depth recession
            const rotateY = Math.sign(offset) * -Math.min(absOffset * 32, 58); // coverflow rotation
            const scale = Math.max(0.72, 1 - absOffset * 0.08); // center scale
            const opacity = Math.max(0.12, 1 - absOffset * 0.24); // opacity falloff
            const zIndex = 100 - Math.round(absOffset * 10);

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
      });

      return () => {
        pinTrigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  const activeNumber = String(currentIndex + 1).padStart(2, "0");
  const totalNumber = String(items.length).padStart(2, "0");

  return (
    <section
      ref={containerRef}
      id="hero"
      className={cn(
        "relative w-full overflow-hidden bg-background border-b border-paper-300 dark:border-warmblack-100",
        isReducedMotion ? "py-16" : "h-screen min-h-[680px]"
      )}
    >
      {/* Background Ambience & Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06] bg-[radial-gradient(#FFB000_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Top Section Headline & Motif Ribbon */}
      <div className="absolute top-4 sm:top-6 inset-x-0 z-20 max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-saffron/15 text-saffron border border-saffron/30 font-semibold">
            <Sparkles className="w-3 h-3 text-saffron" />
            01 / HERO 3D DISPATCH
          </span>
          <span className="hidden sm:inline-block text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Autonomous Coverflow Stream
          </span>
        </div>

        {/* Signature Stamp Motif */}
        <div className="hidden sm:block">
          <SignatureStamp size={92} text="LIVE • 20 STORIES • SAFFRON PRESS • " centerText="01/20" />
        </div>
      </div>

      {/* Main 3D Coverflow Stage (Desktop / Scroll-Driven) */}
      {!isReducedMotion ? (
        <div className="relative w-full h-full flex flex-col justify-center items-center pt-10 sm:pt-14 pb-16">
          {/* Header Typography in Hero */}
          <div className="text-center max-w-3xl px-4 mb-2 z-10 pointer-events-none">
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-saffron font-bold">
              THE EDITORIAL ARCHIVE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-foreground leading-[1.08] mt-1">
              Frontline Chronicles <br className="hidden sm:inline" />
              <span className="italic font-normal text-saffron">in Pure Perspective</span>
            </h1>
          </div>

          {/* 3D Perspective Stage */}
          <div
            ref={trackRef}
            className="perspective-deep relative w-full max-w-6xl h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center my-auto"
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
                  className="absolute w-[290px] sm:w-[350px] md:w-[390px] h-[340px] sm:h-[390px] md:h-[420px] rounded-3xl preserve-3d will-change-transform cursor-pointer transition-shadow duration-300"
                  style={{
                    transformOrigin: "50% 50% -120px",
                  }}
                >
                  <Link
                    href={`/article/${article.slug}`}
                    className="block w-full h-full rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 shadow-xl group hover:border-saffron/60 relative focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron coverflow-reflection"
                  >
                    {/* Cover Image */}
                    <div className="relative w-full h-[52%] sm:h-[56%] overflow-hidden bg-paper-200 dark:bg-warmblack-900">
                      <SafeImage
                        src={article.coverImage}
                        alt={article.title}
                        category={article.category}
                        fill
                        sizes="(max-width: 768px) 350px, 420px"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Rank Tag (01 - 20) */}
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-warmblack/80 backdrop-blur-md border border-white/10 text-white font-mono text-[11px] font-bold flex items-center gap-1.5">
                        <span className="text-saffron">#</span>
                        {String(idx + 1).padStart(2, "0")}
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-saffron text-warmblack-950 font-mono text-[9px] uppercase tracking-widest font-bold shadow-md">
                        {article.category}
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 sm:p-5 flex flex-col justify-between h-[48%] sm:h-[44%] bg-card text-card-foreground">
                      <div>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground mb-1.5">
                          <span>{article.readTimeMinutes} min read</span>
                          <span>•</span>
                          <span className="truncate">{article.author.name}</span>
                        </div>
                        <h2 className="font-serif font-bold text-base sm:text-lg line-clamp-2 text-foreground group-hover:text-saffron transition-colors leading-snug">
                          {article.title}
                        </h2>
                      </div>

                      <div className="pt-2 border-t border-paper-200 dark:border-warmblack-100 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-muted-foreground line-clamp-1 max-w-[80%]">
                          {article.tags.slice(0, 2).join(" / ")}
                        </span>
                        <div className="w-7 h-7 rounded-full bg-paper-200 dark:bg-warmblack-200 flex items-center justify-center text-foreground group-hover:bg-saffron group-hover:text-warmblack-900 transition-colors shrink-0">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Bottom Counter & Progress Dock */}
          <div className="absolute bottom-5 inset-x-0 z-20 max-w-xl mx-auto px-6">
            <div className="bg-card/90 dark:bg-warmblack-900/90 backdrop-blur-md rounded-2xl border border-paper-300 dark:border-warmblack-100 p-3 shadow-lg flex items-center gap-4">
              <div className="flex items-center gap-1.5 shrink-0 font-mono font-bold text-sm">
                <span className="text-saffron text-base">{activeNumber}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{totalNumber}</span>
              </div>

              {/* Progress Line */}
              <div className="flex-1 h-1.5 bg-paper-200 dark:bg-warmblack-200 rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-saffron rounded-full transition-all duration-150 ease-out"
                  style={{
                    width: `${Math.max(5, scrollProgress * 100)}%`,
                  }}
                />
              </div>

              {/* Scroll prompt label */}
              <div className="hidden sm:flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-muted-foreground shrink-0">
                <Layers className="w-3.5 h-3.5 text-saffron" />
                <span>Scroll to browse</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Reduced Motion Fallback: Native horizontal scroll row */
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-saffron font-bold">
              THE EDITORIAL ARCHIVE
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground mt-1">
              Frontline Chronicles — 20 Featured Dispatches
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((article, idx) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group rounded-2xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-4 block hover:border-saffron"
              >
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-3">
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
                <div className="text-[10px] font-mono text-saffron uppercase tracking-wider font-semibold mb-1">
                  {article.category}
                </div>
                <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-saffron line-clamp-2">
                  {article.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
