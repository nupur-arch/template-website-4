"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Compass, Filter } from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/content/site.config";
import { formatTimeAgo } from "@/lib/utils";

interface CategoryShowcaseProps {
  articles: Article[];
}

export function CategoryShowcase({ articles }: CategoryShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);

  // Group articles into 3 columns
  const col1Articles = articles.filter((_, i) => i % 3 === 0).slice(0, 4);
  const col2Articles = articles.filter((_, i) => i % 3 === 1).slice(0, 4);
  const col3Articles = articles.filter((_, i) => i % 3 === 2).slice(0, 4);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      // Scrub column 1 upward
      if (col1Ref.current) {
        gsap.fromTo(
          col1Ref.current,
          { y: 60 },
          {
            y: -140,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Scrub column 2 downward (opposite direction!)
      if (col2Ref.current) {
        gsap.fromTo(
          col2Ref.current,
          { y: -100 },
          {
            y: 100,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // Scrub column 3 upward
      if (col3Ref.current) {
        gsap.fromTo(
          col3Ref.current,
          { y: 80 },
          {
            y: -120,
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="categories"
      className="py-24 sm:py-32 bg-paper-200/50 dark:bg-[#120F0C] border-b border-paper-300 dark:border-warmblack-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-saffron" />
                05 / TILTED RUNWAY SHOWCASE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Counter-Scrolling 3D Columns
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Desks in Motion
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {siteConfig.categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-mono bg-paper-100 dark:bg-warmblack-200 border border-paper-300 dark:border-warmblack-100 hover:border-saffron text-foreground transition-colors flex items-center gap-1"
              >
                <span>{cat.name}</span>
                <ArrowUpRight className="w-3 h-3 text-saffron" />
              </Link>
            ))}
          </div>
        </div>

        {/* Tilted Stage Container */}
        <div
          className="relative py-8"
          style={{
            transform: "perspective(1200px) rotateX(4deg) rotateZ(-1.5deg)",
            transformStyle: "preserve-3d",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Column 1 (Moving Up) */}
            <div ref={col1Ref} className="space-y-6 sm:space-y-8 will-change-transform">
              <div className="px-3 py-1.5 rounded-xl bg-warmblack text-paper-50 dark:bg-saffron dark:text-warmblack text-[11px] font-mono uppercase font-bold tracking-widest text-center shadow">
                Dispatches • Fleet Alpha
              </div>
              {col1Articles.map((article) => (
                <ColumnArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Column 2 (Moving Down) */}
            <div ref={col2Ref} className="space-y-6 sm:space-y-8 will-change-transform">
              <div className="px-3 py-1.5 rounded-xl bg-saffron text-warmblack text-[11px] font-mono uppercase font-bold tracking-widest text-center shadow">
                Intelligence • Fleet Beta
              </div>
              {col2Articles.map((article) => (
                <ColumnArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Column 3 (Moving Up) */}
            <div ref={col3Ref} className="space-y-6 sm:space-y-8 will-change-transform">
              <div className="px-3 py-1.5 rounded-xl bg-warmblack text-paper-50 dark:bg-saffron dark:text-warmblack text-[11px] font-mono uppercase font-bold tracking-widest text-center shadow">
                Frontiers • Fleet Gamma
              </div>
              {col3Articles.map((article) => (
                <ColumnArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColumnArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/article/${article.slug}`}
      className="block group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 shadow-md hover:shadow-2xl hover:border-saffron/60 transition-all duration-300 p-5"
    >
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-paper-200 dark:border-warmblack-200">
        <SafeImage
          src={article.coverImage}
          alt={article.title}
          category={article.category}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-warmblack/80 backdrop-blur-sm text-saffron text-[9px] font-mono uppercase font-bold">
          {article.category}
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between">
          <span>{formatTimeAgo(article.publishedAt)}</span>
          <span>{article.readTimeMinutes} min read</span>
        </div>
        <h4 className="font-serif font-bold text-base text-foreground group-hover:text-saffron transition-colors line-clamp-2 leading-snug">
          {article.title}
        </h4>
        <p className="text-xs text-muted-foreground line-clamp-2 font-sans">
          {article.excerpt}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
        <span>By {article.author.name}</span>
        <span className="text-saffron flex items-center gap-1 group-hover:translate-x-1 transition-transform">
          View &rarr;
        </span>
      </div>
    </Link>
  );
}
