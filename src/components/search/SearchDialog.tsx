"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  X,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  CornerDownLeft,
} from "lucide-react";
import { searchArticles } from "@/services/articles";
import { SearchResult } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo } from "@/lib/utils";
import { siteConfig } from "@/content/site.config";

interface SearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES_KEY = "movimento_recent_searches";

export function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const abortControllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored).slice(0, 5));
      }
    } catch { }
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Global Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Debounced search with AbortController
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const timer = setTimeout(async () => {
      try {
        const found = await searchArticles(query, { signal: abortController.signal });
        setResults(found);
        setSelectedIndex(0);
      } catch (err: any) {
        if (err?.name !== "AbortError") {
          setResults([]);
        }
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      abortController.abort();
    };
  }, [query]);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    try {
      const updated = [trimmed, ...recentSearches.filter((s) => s !== trimmed)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    } catch { }
  };

  const handleSelectArticle = (slug: string, term?: string) => {
    if (term) saveRecentSearch(term);
    onClose();
    router.push(`/artigos/${slug}`);
  };

  const handleSubmitSearchPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      saveRecentSearch(query);
      onClose();
      router.push(`/busca?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results.length > 0 && results[selectedIndex]) {
        handleSelectArticle(results[selectedIndex].article.slug, query);
      } else if (query.trim()) {
        handleSubmitSearchPage(e);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscar artigos e guias"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-20 px-3 sm:px-6 bg-warmblack/70 backdrop-blur-md transition-all duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="relative w-full max-w-2xl bg-paper-50 dark:bg-[#13221D] rounded-2xl md:rounded-3xl border border-paper-300 dark:border-warmblack-100 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
        data-lenis-prevent
      >
        {/* Top Search Input Bar */}
        <form onSubmit={handleSubmitSearchPage} className="relative flex items-center border-b border-paper-200 dark:border-warmblack-100 px-4 sm:px-6 py-4">
          <Search className="w-5 h-5 text-emerald-500 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Buscar por treino, caminhada, postura, tênis, hábitos..."
            className="w-full bg-transparent text-base sm:text-lg font-sans text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              className="p-1 text-muted-foreground hover:text-foreground rounded-full hover:bg-paper-200 dark:hover:bg-warmblack-200 mr-2"
              aria-label="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-mono uppercase tracking-widest text-muted-foreground bg-paper-200 dark:bg-warmblack-200 rounded-md border border-paper-300 dark:border-warmblack-50"
          >
            ESC
          </button>
        </form>

        {/* Scrollable Results Area */}
        <div className="overflow-y-auto overflow-x-hidden p-3 sm:p-5 space-y-4 flex-1">
          {/* Loading Skeleton */}
          {isLoading && (
            <div className="space-y-3 py-2">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-4 p-3 rounded-xl animate-pulse bg-paper-200/50 dark:bg-warmblack-200/40"
                >
                  <div className="w-16 h-12 rounded-lg bg-paper-300 dark:bg-warmblack-100 shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-paper-300 dark:bg-warmblack-100 rounded w-3/4" />
                    <div className="h-3 bg-paper-300 dark:bg-warmblack-100 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results List */}
          {!isLoading && results.length > 0 && (
            <div className="space-y-1">
              <div className="flex items-center justify-between px-2 py-1 text-[11px] font-mono uppercase tracking-wider text-muted-foreground border-b border-paper-200 dark:border-warmblack-200 mb-2">
                <span>{results.length} Guias Encontrados</span>
                <span className="flex items-center gap-1">
                  Navegar <CornerDownLeft className="w-3 h-3 text-emerald-500" />
                </span>
              </div>
              {results.map((res, index) => {
                const isSelected = index === selectedIndex;
                const { article, matchedField } = res;

                return (
                  <div
                    key={article.id}
                    onClick={() => handleSelectArticle(article.slug, query)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl cursor-pointer transition-colors duration-150 ${isSelected
                        ? "bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/30"
                        : "hover:bg-paper-200/70 dark:hover:bg-warmblack-200/50 border border-transparent"
                      }`}
                  >
                    {/* Thumbnail */}
                    <div className="w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden shrink-0 border border-paper-300 dark:border-warmblack-100">
                      <SafeImage
                        src={article.coverImage}
                        alt={article.title}
                        category={article.category}
                        width={80}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Metadata & Headline */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-paper-200 dark:bg-warmblack-200 text-emerald-600 dark:text-emerald-400 font-medium">
                          {article.category}
                        </span>
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {formatTimeAgo(article.publishedAt)}
                        </span>
                        {matchedField !== "title" && (
                          <span className="text-[9px] font-mono text-muted-foreground bg-paper-300 dark:bg-warmblack-100 px-1.5 rounded">
                            em {matchedField}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-serif font-bold text-foreground line-clamp-1 leading-snug">
                        <HighlightText text={article.title} highlight={query} />
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-1 font-sans mt-0.5">
                        {article.excerpt}
                      </p>
                    </div>

                    <ArrowRight
                      className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "translate-x-1 text-emerald-500" : "text-muted-foreground/40"
                        }`}
                    />
                  </div>
                );
              })}

              <div className="pt-3 text-center">
                <Link
                  href={`/busca?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-2 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                  Ver todos os resultados para &quot;{query}&quot; &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && query.trim().length >= 2 && results.length === 0 && (
            <div className="py-12 text-center space-y-3">
              <FileText className="w-10 h-10 text-muted-foreground/40 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-foreground">
                Nenhum guia encontrado
              </h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Não encontramos guias para &quot;{query}&quot;. Tente termos como{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">caminhada</span>,{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">casa</span> ou{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">postura</span>.
              </p>
            </div>
          )}

          {/* Default State: Recent Searches & Categories */}
          {!isLoading && query.trim().length < 2 && (
            <div className="space-y-6 py-2">
              {recentSearches.length > 0 && (
                <div>
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2 px-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" /> Buscas Recentes
                    </span>
                    <button
                      onClick={() => {
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem(RECENT_SEARCHES_KEY);
                        } catch { }
                      }}
                      className="text-[10px] text-muted-foreground hover:text-foreground"
                    >
                      Limpar
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <button
                        key={term}
                        onClick={() => {
                          setQuery(term);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans bg-paper-200 dark:bg-warmblack-200 hover:bg-emerald-500/20 border border-paper-300 dark:border-warmblack-100 transition-colors"
                      >
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{term}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggested Sections */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 px-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-500" /> Explorar Seções
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {siteConfig.categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/secoes/${cat.slug}`}
                      onClick={onClose}
                      className="p-3 rounded-xl border border-paper-200 dark:border-warmblack-100 hover:border-emerald-500/40 bg-paper-100/50 dark:bg-warmblack-200/30 transition-all text-left group"
                    >
                      <span className="text-xs font-serif font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                        {cat.name}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {cat.count} guias
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="hidden sm:flex items-center justify-between px-6 py-2.5 bg-paper-200/50 dark:bg-warmblack-200/30 border-t border-paper-200 dark:border-warmblack-100 text-[11px] font-mono text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-paper-100 dark:bg-warmblack-100 border border-paper-300 dark:border-warmblack-50">
                &uarr; &darr;
              </kbd>{" "}
              navegar
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-paper-100 dark:bg-warmblack-100 border border-paper-300 dark:border-warmblack-50">
                &crarr;
              </kbd>{" "}
              abrir
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-paper-100 dark:bg-warmblack-100 border border-paper-300 dark:border-warmblack-50">
                esc
              </kbd>{" "}
              fechar
            </span>
          </div>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">Movimento na Rotina</span>
        </div>
      </div>
    </div>
  );
}

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <mark
            key={i}
            className="bg-emerald-500/30 text-foreground font-semibold px-0.5 rounded"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}
