"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Award, Bookmark, Clock, UserCheck } from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo } from "@/lib/utils";

interface EditorsPicksStackProps {
  articles: Article[];
}

export function EditorsPicksStack({ articles }: EditorsPicksStackProps) {
  const items = articles.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

      cards.forEach((card, index) => {
        // Skip animating the last card as it sits at the top of the completed stack
        if (index === cards.length - 1) return;

        ScrollTrigger.create({
          trigger: card,
          start: "top top+=100",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
          scrub: true,
          onUpdate: (self) => {
            const p = self.progress;
            // Tilt back with rotateX and scale down as subsequent cards stack over
            const rotateX = -12 * p;
            const scale = 1 - 0.05 * p;
            const opacity = 1 - 0.25 * p;
            gsap.set(card, {
              rotateX,
              scale,
              opacity,
              transformOrigin: "center top",
            });
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section
      ref={containerRef}
      id="editors-picks"
      className="relative py-24 sm:py-32 bg-background border-b border-paper-300 dark:border-warmblack-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16 pb-6 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-saffron" />
                04 / CURATED PORTFOLIO
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-xs font-mono text-muted-foreground uppercase">
                Sticky 3D Stacked Folios
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
              Editor&apos;s Long View
            </h2>
          </div>
          <p className="text-sm font-sans text-muted-foreground max-w-md">
            Rigorous philosophical theses and investigative dossiers hand-selected by the Editor-in-Chief. As you scroll, previous folios tilt back into an archival stack.
          </p>
        </div>

        {/* Stack Container */}
        <div className="relative space-y-12 sm:space-y-16 perspective-deep">
          {items.map((article, index) => (
            <div
              key={article.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              style={{
                top: `${100 + index * 20}px`,
                transformStyle: "preserve-3d",
              }}
              className="sticky rounded-4xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-2xl p-6 sm:p-10 will-change-transform transition-shadow duration-300 group hover:border-saffron/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left Text Column */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="font-serif font-black text-4xl text-saffron">
                      0{index + 1}
                    </span>
                    <span className="h-4 w-[1px] bg-paper-300 dark:bg-warmblack-100" />
                    <span className="text-xs font-mono uppercase tracking-widest text-saffron font-semibold px-2.5 py-0.5 rounded-full bg-saffron/10 border border-saffron/20">
                      {article.category}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">
                      Folio No. {article.readTimeMinutes}0{index + 1}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-4xl font-black text-foreground group-hover:text-saffron transition-colors leading-tight">
                    <Link href={`/article/${article.slug}`}>{article.title}</Link>
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="pt-4 border-t border-paper-200 dark:border-warmblack-200 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-paper-300 dark:bg-warmblack-100 relative shrink-0">
                        {article.author.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserCheck className="w-5 h-5 m-auto text-saffron" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-serif font-bold text-foreground">
                          {article.author.name}
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground">
                          {article.author.title}
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/article/${article.slug}`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-warmblack dark:bg-saffron text-paper-50 dark:text-warmblack font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shadow-md"
                    >
                      Read Full Folio <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right Image Column */}
                <div className="lg:col-span-5">
                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-paper-200 dark:border-warmblack-200 shadow-inner">
                    <SafeImage
                      src={article.coverImage}
                      alt={article.title}
                      category={article.category}
                      fill
                      sizes="(max-width: 1024px) 100vw, 450px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-warmblack/80 backdrop-blur-md text-[10px] font-mono text-white">
                      {article.readTimeMinutes} min reading folio
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
