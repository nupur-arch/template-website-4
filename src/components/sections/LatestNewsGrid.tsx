"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Sparkles } from "lucide-react";
import { Article } from "@/types/article";
import { Tilt3DCard } from "@/components/ui/Tilt3DCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo } from "@/lib/utils";

interface LatestNewsGridProps {
  articles: Article[];
}

export function LatestNewsGrid({ articles }: LatestNewsGridProps) {
  const items = articles.slice(0, 6);
  const leadArticle = items[0];
  const sideArticles = items.slice(1, 3);
  const bottomArticles = items.slice(3, 6);

  if (!leadArticle) return null;

  return (
    <section id="latest" className="py-20 sm:py-24 bg-background border-b border-paper-300 dark:border-warmblack-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold">
                02 / ASYMMETRIC BROADSIDE
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Stereoscopic Tilt & Glare
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-foreground tracking-tight">
              The Dispatch Grid
            </h2>
          </div>
          <p className="text-sm font-sans text-muted-foreground max-w-md">
            Unraveling pivotal developments across deep tech, diplomatic treaties, and ecological frontiers. Hover to explore stereoscopic depth.
          </p>
        </div>

        {/* Asymmetric Top Row: Big Lead on Left, 2 Stacked on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Big Lead Article (7 Cols) */}
          <div className="lg:col-span-7">
            <Tilt3DCard
              href={`/article/${leadArticle.slug}`}
              className="h-full bg-card border border-paper-300 dark:border-warmblack-100 shadow-xl group hover:border-saffron/50 p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-paper-200 dark:border-warmblack-200">
                  <SafeImage
                    src={leadArticle.coverImage}
                    alt={leadArticle.title}
                    category={leadArticle.category}
                    fill
                    sizes="(max-width: 1024px) 100vw, 650px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Category Badge popping forward in Z */}
                  <div
                    style={{ transform: "translateZ(45px)" }}
                    className="absolute top-4 left-4 preserve-3d"
                  >
                    <span className="px-3 py-1 rounded-full bg-saffron text-warmblack font-mono text-[10px] font-bold uppercase tracking-widest shadow-md">
                      {leadArticle.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded-full bg-warmblack/80 backdrop-blur-md text-white font-mono text-xs">
                    01 • LEAD DOSSIER
                  </div>
                </div>

                {/* Title popping forward in Z */}
                <div style={{ transform: "translateZ(30px)" }} className="preserve-3d space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <span>{leadArticle.author.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(leadArticle.publishedAt)}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-foreground group-hover:text-saffron transition-colors leading-tight">
                    {leadArticle.title}
                  </h3>
                  <p className="text-sm font-sans text-muted-foreground line-clamp-3 leading-relaxed">
                    {leadArticle.excerpt}
                  </p>
                </div>
              </div>

              <div
                style={{ transform: "translateZ(20px)" }}
                className="pt-6 mt-6 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between"
              >
                <span className="text-xs font-mono text-muted-foreground">
                  Read time: {leadArticle.readTimeMinutes} minutes
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-saffron group-hover:underline">
                  Full Dispatch <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Tilt3DCard>
          </div>

          {/* 2 Stacked Cards on Right (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {sideArticles.map((article, index) => (
              <Tilt3DCard
                key={article.id}
                href={`/article/${article.slug}`}
                className="flex-1 bg-card border border-paper-300 dark:border-warmblack-100 shadow-md group hover:border-saffron/50 p-6 flex flex-col justify-between"
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden shrink-0 border border-paper-200 dark:border-warmblack-200">
                    <SafeImage
                      src={article.coverImage}
                      alt={article.title}
                      category={article.category}
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div style={{ transform: "translateZ(25px)" }} className="flex-1 min-w-0 preserve-3d">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[10px] font-mono text-saffron font-bold uppercase tracking-wider">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        #{String(index + 2).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-lg text-foreground group-hover:text-saffron transition-colors line-clamp-2 leading-snug">
                      {article.title}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-2 font-sans mt-1">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{formatTimeAgo(article.publishedAt)}</span>
                  <span className="text-saffron flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </Tilt3DCard>
            ))}
          </div>
        </div>

        {/* Bottom 3 Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bottomArticles.map((article, index) => (
            <Tilt3DCard
              key={article.id}
              href={`/article/${article.slug}`}
              className="bg-card border border-paper-300 dark:border-warmblack-100 shadow-md group hover:border-saffron/50 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 border border-paper-200 dark:border-warmblack-200">
                  <SafeImage
                    src={article.coverImage}
                    alt={article.title}
                    category={article.category}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    style={{ transform: "translateZ(30px)" }}
                    className="absolute top-3 left-3 preserve-3d"
                  >
                    <span className="px-2 py-0.5 rounded bg-warmblack/80 text-saffron font-mono text-[9px] uppercase tracking-wider font-semibold">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    #{String(index + 4).padStart(2, "0")}
                  </div>
                </div>

                <div style={{ transform: "translateZ(20px)" }} className="preserve-3d space-y-2">
                  <span className="text-[10px] font-mono text-muted-foreground block">
                    {formatTimeAgo(article.publishedAt)} • {article.readTimeMinutes} min read
                  </span>
                  <h4 className="font-serif font-bold text-base text-foreground group-hover:text-saffron transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 font-sans">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">{article.author.name}</span>
                <span className="text-saffron font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View &rarr;
                </span>
              </div>
            </Tilt3DCard>
          ))}
        </div>
      </div>
    </section>
  );
}
