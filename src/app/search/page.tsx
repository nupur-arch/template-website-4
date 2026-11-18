"use client";

import { useEffect, useState, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Filter, X, ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import { searchArticles } from "@/services/articles";
import { SearchResult } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/content/site.config";
import { formatTimeAgo } from "@/lib/utils";

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("category") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const controller = new AbortController();

    searchArticles(query, {
      category: activeCategory !== "all" ? activeCategory : undefined,
      signal: controller.signal,
    })
      .then((data) => {
        setResults(data);
      })
      .catch((err) => {
        if (err?.name !== "AbortError") setResults([]);
      })
      .finally(() => {
        setIsSearching(false);
      });

    return () => controller.abort();
  }, [query, activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}&category=${activeCategory}`);
    }
  };

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
        </div>

        {/* Search Header */}
        <div className="pb-8 mb-10 border-b border-paper-300 dark:border-warmblack-100">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-saffron font-bold block mb-2">
            INTELLIGENCE DOSSIER LOOKUP
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-6">
            Dispatch Search Archive
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <Search className="w-5 h-5 text-saffron absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by treaty name, technology, or correspondent..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-paper-100 dark:bg-warmblack-200 border border-paper-300 dark:border-warmblack-100 text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-xs font-mono uppercase text-muted-foreground mr-1">
              Desks:
            </span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                activeCategory === "all"
                  ? "bg-saffron text-warmblack font-bold"
                  : "bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-foreground"
              }`}
            >
              All Desks
            </button>
            {siteConfig.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-saffron text-warmblack font-bold"
                    : "bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div>
          {isSearching && (
            <div className="space-y-4 py-8">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="p-6 rounded-2xl bg-paper-200/50 dark:bg-warmblack-200/40 animate-pulse flex items-center gap-6"
                >
                  <div className="w-24 h-16 rounded-xl bg-paper-300 dark:bg-warmblack-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-paper-300 dark:bg-warmblack-100 rounded w-2/3" />
                    <div className="h-3 bg-paper-300 dark:bg-warmblack-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isSearching && results.length > 0 && (
            <div className="space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Displaying {results.length} verified dispatches for &quot;{query}&quot;
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(({ article }) => (
                  <Link
                    key={article.id}
                    href={`/article/${article.slug}`}
                    className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-5 shadow-sm hover:border-saffron/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4 border border-paper-200 dark:border-warmblack-200">
                        <SafeImage
                          src={article.coverImage}
                          alt={article.title}
                          category={article.category}
                          fill
                          sizes="360px"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-warmblack/80 text-saffron text-[9px] font-mono uppercase font-bold">
                          {article.category}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                          <span>{article.readTimeMinutes} min read</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-saffron transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 font-sans">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>By {article.author.name}</span>
                      <span className="text-saffron flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Read &rarr;
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!isSearching && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-24 text-center space-y-4 max-w-md mx-auto">
              <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-foreground">
                No Dispatches Found
              </h3>
              <p className="text-sm font-sans text-muted-foreground">
                No dispatches matched &quot;{query}&quot;. Try exploring other desks or check for spelling errors.
              </p>
            </div>
          )}

          {!isSearching && query.trim().length < 2 && (
            <div className="py-16 text-center space-y-3 max-w-sm mx-auto text-muted-foreground">
              <Search className="w-10 h-10 text-saffron/40 mx-auto" />
              <p className="text-sm font-mono">
                Type at least two characters to interrogate the Saffron Press archive.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-16 text-center font-mono text-xs text-muted-foreground">
          Loading intelligence index...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
