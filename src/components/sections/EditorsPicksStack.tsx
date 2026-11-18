"use client";

import { useRef } from "react";
import Link from "next/link";
import { useScroll, useTransform, useReducedMotion, motion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  Clock,
  User,
  Sparkles,
} from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { formatDate } from "@/lib/utils";

interface EditorsPicksProps {
  articles: Article[];
}

interface PickCardProps {
  article: Article;
  index: number;
  total: number;
  progress: any;
}

function PickCard({ article, index, total, progress }: PickCardProps) {
  const isReduced = useReducedMotion();
  const rangeStart = index / Math.max(1, total);
  const rangeEnd = Math.min(1, (index + 1) / Math.max(1, total));

  // Scale down card slightly as the next one stacks over (last card stays 1)
  const scale = useTransform(
    progress,
    [rangeStart, rangeEnd],
    [1, index === total - 1 ? 1 : 0.94]
  );

  // Dim overlay as the next card scrolls in
  const dimOpacity = useTransform(
    progress,
    [rangeStart, rangeEnd],
    [0, index !== total - 1 ? 0.38 : 0]
  );

  const isToneSaffron = index % 2 === 0;

  return (
    <div
      className="pick-pin sticky top-[72px] sm:top-[84px] mb-8 sm:mb-12 h-[520px] sm:h-[480px] lg:h-[520px] will-change-transform"
      style={{
        zIndex: index + 10,
      }}
    >
      <motion.article
        style={{
          scale: isReduced ? 1 : scale,
          transformOrigin: "50% 0",
        }}
        className={`pick-card relative grid grid-cols-1 lg:grid-cols-2 h-full rounded-3xl sm:rounded-4xl overflow-hidden border shadow-2xl transition-shadow ${
          isToneSaffron
            ? "bg-saffron text-warmblack border-saffron-600 shadow-saffron/20"
            : "bg-card text-foreground border-paper-300 dark:border-warmblack-100"
        }`}
      >
        {/* Left: Editorial Copy */}
        <div className="pick-copy flex flex-col justify-between p-6 sm:p-8 lg:p-10 z-10">
          {/* Eyebrow Header */}
          <div className="flex items-center justify-between w-full text-xs font-mono tracking-widest uppercase opacity-75">
            <span className="flex items-center gap-1.5 font-bold">
              <Award className="w-3.5 h-3.5" /> THE EDITOR’S PICK
            </span>
            <span className="font-bold">/{String(index + 1).padStart(2, "0")}</span>
          </div>

          {/* Middle Story Block */}
          <div className="my-auto py-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider font-semibold opacity-85">
              <CategoryIcon categorySlug={article.categorySlug} className="w-3.5 h-3.5" />
              <span>{article.category}</span>
              <span>/</span>
              <span>Dispatch #{String(index + 1).padStart(2, "0")}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black leading-[1.08] tracking-tight line-clamp-3">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm font-sans opacity-80 leading-relaxed line-clamp-3 max-w-md">
              {article.excerpt}
            </p>
          </div>

          {/* Bottom Meta & Action */}
          <div className="flex items-center justify-between pt-4 border-t border-current/15 mt-auto">
            <div className="text-xs font-mono leading-tight opacity-80 space-y-0.5">
              <span className="flex items-center gap-1 font-bold">
                <User className="w-3.5 h-3.5" />
                {article.author.name}
              </span>
              <span className="flex items-center gap-1 text-[11px] opacity-75">
                <Clock className="w-3 h-3" />
                {article.readTimeMinutes}m • {formatDate(article.publishedAt)}
              </span>
            </div>

            {/* Circular Rotating Arrow Button */}
            <Link
              href={`/article/${article.slug}`}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:rotate-45 hover:scale-110 shrink-0 ${
                isToneSaffron
                  ? "border-warmblack text-warmblack hover:bg-warmblack hover:text-saffron"
                  : "border-saffron text-saffron hover:bg-saffron hover:text-warmblack"
              }`}
              aria-label={`Read editor's pick: ${article.title}`}
              title="Read Full Story"
            >
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Right: Full-Bleed Photo with Caption */}
        <div className="pick-photo relative h-full min-h-[220px] lg:min-h-full overflow-hidden bg-paper-200 dark:bg-warmblack-900">
          <SafeImage
            src={article.coverImage}
            alt={article.title}
            category={article.category}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Floating Caption Badge */}
          <div className="absolute bottom-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-warmblack/85 backdrop-blur-md text-white font-mono text-[11px] tracking-wider flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3 h-3 text-saffron" />
            <span>A WIDER VIEW / 0{index + 1}</span>
          </div>
        </div>

        {/* Dimming Layer on Scroll */}
        <motion.div
          className="pick-dim absolute inset-0 bg-black pointer-events-none rounded-3xl sm:rounded-4xl z-30"
          style={{ opacity: isReduced ? 0 : dimOpacity }}
          aria-hidden="true"
        />
      </motion.article>
    </div>
  );
}

export function EditorsPicksStack({ articles }: EditorsPicksProps) {
  const items = articles.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the deck container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="editors-picks"
      className="editors-section relative py-20 sm:py-28 bg-background border-b border-paper-300 dark:border-warmblack-100"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Heading: Good stories deserve a little more time. */}
        <div className="desk-heading mb-12 sm:mb-16 pb-6 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-saffron" />
              04 / SELECTED BY THE EDITORS
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.08] max-w-2xl">
            Good stories deserve a little more time.
          </h2>
          <p className="font-sans text-sm sm:text-base text-muted-foreground mt-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-saffron shrink-0" />
            Pause here. There’s more to the story.
          </p>
        </div>

        {/* The Card Deck with Framer Motion Stacking */}
        <div ref={containerRef} className="pick-deck relative pb-12">
          {items.map((article, idx) => (
            <PickCard
              key={article.id}
              article={article}
              index={idx}
              total={items.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
