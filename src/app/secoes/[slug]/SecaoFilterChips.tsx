"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SecaoFilterChipsProps {
  categorySlug: string;
  subtopics: { label: string; slug: string }[];
  currentSubtopic: string;
}

export function SecaoFilterChips({
  categorySlug,
  subtopics,
  currentSubtopic,
}: SecaoFilterChipsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/secoes/${categorySlug}`}
        className={cn(
          "px-3.5 py-1.5 rounded-full text-xs font-mono transition-all",
          currentSubtopic === "todos" || !currentSubtopic
            ? "bg-emerald-600 text-white font-bold shadow-sm"
            : "bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-foreground border border-paper-300 dark:border-warmblack-100"
        )}
      >
        Todos
      </Link>
      {subtopics.map((sub) => {
        const isActive = currentSubtopic === sub.slug;
        return (
          <Link
            key={sub.slug}
            href={`/secoes/${categorySlug}?subtopico=${sub.slug}`}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-1.5",
              isActive
                ? "bg-emerald-600 text-white font-bold shadow-sm"
                : "bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-foreground border border-paper-300 dark:border-warmblack-100"
            )}
          >
            <span>{sub.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
