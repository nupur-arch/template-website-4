"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  RotateCw,
  Flame,
  BarChart3,
  Clock,
  User,
} from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { cn, formatTimeAgo } from "@/lib/utils";

interface TrendingTop10Props {
  articles: Article[];
}

export function TrendingTop10({ articles }: TrendingTop10Props) {
  const items = articles.slice(0, 10);
  const containerRef = useRef<HTMLDivElement>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".trending-flip-card");

      // ScrollTrigger scroll-driven tilt / shrink effect
      gsap.fromTo(
        cards,
        {
          rotateX: 18,
          scale: 0.94,
          opacity: 0.7,
        },
        {
          rotateX: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      ref={containerRef}
      id="trending"
      className="py-20 sm:py-28 bg-paper-100/60 dark:bg-[#110E0B] border-b border-paper-300 dark:border-warmblack-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header: Relabeled to Top 10 em destaque */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                03 / TOP 10 EM DESTAQUE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
                <RotateCw className="w-3 h-3 text-emerald-500" /> Giro 3D Dupla Face
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Top 10 em destaque
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground max-w-sm">
            Os dez guias e artigos mais acessados e recomendados para transformar a sua rotina com mais movimento, energia e consistência.
          </p>
        </div>

        {/* 10 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 perspective-deep">
          {items.map((article, index) => {
            const isFlipped = Boolean(flippedCards[article.id]);
            const rankStr = String(index + 1).padStart(2, "0");

            return (
              <div
                key={article.id}
                className="trending-flip-card group relative h-[380px] w-full cursor-pointer select-none"
                onClick={() => toggleFlip(article.id)}
                style={{ perspective: "1200px" }}
              >
                {/* 3D Flippable Wrapper */}
                <div
                  className="preserve-3d relative w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                  }}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 shadow-md group-hover:border-emerald-500/60 flex flex-col justify-between p-5">
                    {/* Top Row: Rank & Flip icon button */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 font-serif font-black text-3xl text-emerald-600/80 group-hover:text-emerald-500 transition-colors">
                        <Flame className="w-4 h-4 text-amber-500" />
                        <span>{rankStr}</span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFlip(article.id);
                        }}
                        className="p-2 rounded-full bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-emerald-500 transition-colors shadow-sm"
                        title="Virar para ver resumo"
                        aria-label="Virar card para ler resumo"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Image / Thumbnail */}
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden my-3 border border-paper-200 dark:border-warmblack-200">
                      <SafeImage
                        src={article.coverImage}
                        alt={article.title}
                        category={article.category}
                        fill
                        sizes="250px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full bg-warmblack/85 backdrop-blur-sm text-[9px] font-mono text-emerald-400 uppercase font-bold flex items-center gap-1 shadow-md">
                        <CategoryIcon categorySlug={article.categorySlug} className="w-2.5 h-2.5" />
                        {article.category}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="font-serif font-bold text-sm sm:text-base text-foreground line-clamp-2 leading-snug group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {article.title}
                      </h4>
                      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mt-3 pt-2 border-t border-paper-200 dark:border-warmblack-200">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-emerald-500" />
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold">
                          <span>Virar</span>
                          <RotateCw className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE (Flipped 180deg) */}
                  <div
                    className="absolute inset-0 backface-hidden rounded-3xl overflow-hidden bg-warmblack text-paper-50 border border-emerald-500/40 shadow-xl p-5 flex flex-col justify-between"
                    style={{ transform: "rotateY(180deg)" }}
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 border-b border-warmblack-100">
                        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-400" /> GUIA #{rankStr}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFlip(article.id);
                          }}
                          className="p-1 rounded-full text-paper-400 hover:text-white"
                          title="Virar de volta"
                        >
                          <RotateCw className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="mt-3 space-y-1.5">
                        <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider flex items-center gap-1 font-bold">
                          <BarChart3 className="w-3 h-3 text-emerald-400" /> Resumo Prático
                        </div>
                        <p className="font-sans text-xs text-paper-200 line-clamp-4 leading-relaxed">
                          {article.excerpt}
                        </p>
                      </div>

                      {/* Author & Stats */}
                      <div className="mt-4 pt-3 border-t border-warmblack-100 space-y-1.5 text-[11px] font-mono text-paper-400">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3 text-emerald-400" /> Especialista:
                          </span>
                          <span className="text-paper-100 font-semibold">{article.author.name}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-emerald-400" /> Leitura:
                          </span>
                          <span className="text-emerald-400 font-bold">{article.readTimeMinutes} min</span>
                        </div>
                      </div>
                    </div>

                    {/* Direct Link button */}
                    <Link
                      href={`/artigos/${article.slug}`}
                      onClick={(e) => e.stopPropagation()}
                      className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-emerald-500 transition-colors shadow-md"
                    >
                      <span>Ler Guia Completo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
