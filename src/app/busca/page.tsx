"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X, ArrowLeft, FileText } from "lucide-react";
import { searchArticles } from "@/services/articles";
import { SearchResult } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/content/site.config";
import { formatTimeAgo } from "@/lib/utils";

function BuscaPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialCategory = searchParams.get("categoria") || searchParams.get("category") || "todas";

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
      category: activeCategory !== "todas" && activeCategory !== "all" ? activeCategory : undefined,
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
      router.push(`/busca?q=${encodeURIComponent(query)}&categoria=${activeCategory}`);
    }
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
          </Link>
        </div>

        {/* Search Header */}
        <div className="pb-8 mb-10 border-b border-paper-300 dark:border-warmblack-100">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold block mb-2">
            CONSULTA AO ACERVO
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-6">
            Busca de Guias & Artigos
          </h1>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-2xl">
            <Search className="w-5 h-5 text-emerald-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Busque por treino, caminhada, tênis, postura, hábitos..."
              className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-paper-100 dark:bg-warmblack-200 border border-paper-300 dark:border-warmblack-100 text-base font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-1"
                aria-label="Limpar termo de busca"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            <span className="text-xs font-mono uppercase text-muted-foreground mr-1">
              Seções:
            </span>
            <button
              onClick={() => setActiveCategory("todas")}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                activeCategory === "todas" || activeCategory === "all"
                  ? "bg-emerald-600 text-white font-bold"
                  : "bg-paper-200 dark:bg-warmblack-200 text-muted-foreground hover:text-foreground"
              }`}
            >
              Todas as Seções
            </button>
            {siteConfig.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors ${
                  activeCategory === cat.slug
                    ? "bg-emerald-600 text-white font-bold"
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
                Exibindo {results.length} guias verificados para &quot;{query}&quot;
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map(({ article }) => (
                  <Link
                    key={article.id}
                    href={`/artigos/${article.slug}`}
                    className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-5 shadow-sm hover:border-emerald-500/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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
                        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-warmblack/80 text-emerald-400 text-[9px] font-mono uppercase font-bold">
                          {article.subtopic || article.category}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                          <span>{formatTimeAgo(article.publishedAt)}</span>
                          <span>{article.readTimeMinutes} min de leitura</span>
                        </div>
                        <h3 className="font-serif font-bold text-lg text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 font-sans">
                          {article.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>{article.author.name}</span>
                      <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                        Acessar &rarr;
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
                Nenhum Guia Encontrado
              </h3>
              <p className="text-sm font-sans text-muted-foreground">
                Nenhum guia correspondeu a &quot;{query}&quot;. Tente explorar termos mais amplos como{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">treino</span>,{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">casa</span> ou{" "}
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">mobilidade</span>.
              </p>
            </div>
          )}

          {!isSearching && query.trim().length < 2 && (
            <div className="py-16 text-center space-y-3 max-w-sm mx-auto text-muted-foreground">
              <Search className="w-10 h-10 text-emerald-500/40 mx-auto" />
              <p className="text-sm font-mono">
                Digite pelo menos duas letras para buscar guias e artigos no Movimento na Rotina.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BuscaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen py-16 text-center font-mono text-xs text-muted-foreground">
          Carregando busca de guias...
        </div>
      }
    >
      <BuscaPageContent />
    </Suspense>
  );
}
