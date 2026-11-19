"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Archive as ArchiveIcon, Filter, AlertCircle } from "lucide-react";
import { MOCK_ARTICLES } from "@/mocks/articles";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteConfig } from "@/content/site.config";
import { formatDate } from "@/lib/utils";

export default function ArquivoPage() {
  const [selectedSection, setSelectedSection] = useState<string>("todas");
  const [selectedSubtopic, setSelectedSubtopic] = useState<string>("todos");

  const filteredArticles = MOCK_ARTICLES.filter((article) => {
    const matchSection =
      selectedSection === "todas" ||
      article.categorySlug.toLowerCase() === selectedSection.toLowerCase();
    if (!matchSection) return false;

    const matchSubtopic =
      selectedSubtopic === "todos" ||
      article.subtopic?.toLowerCase() === selectedSubtopic.toLowerCase();
    return matchSubtopic;
  });

  const activeCategoryConfig = siteConfig.categories.find(
    (c) => c.slug.toLowerCase() === selectedSection.toLowerCase()
  );

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
          </Link>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <ArchiveIcon className="w-3.5 h-3.5 text-emerald-500" />
              ARQUIVO COMPLETO DE GUIAS
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-muted-foreground">
              {MOCK_ARTICLES.length} Guias Publicados
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Arquivo do Movimento
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-xl mt-3 leading-relaxed">
            Todos os guias sobre atividades em casa e academia, equipamentos, iniciação segura, serviços e hábitos saudáveis reunidos com filtros práticos.
          </p>

          {/* Health Disclaimer Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs font-sans text-paper-200">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Lembrete de Saúde</strong>: {siteConfig.healthDisclaimer}
            </span>
          </div>
        </div>

        {/* Interactive Filters Bar */}
        <div className="p-5 rounded-2xl bg-paper-100 dark:bg-warmblack-200 border border-paper-300 dark:border-warmblack-100 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
            <Filter className="w-4 h-4 text-emerald-500" />
            <span>Filtrar por Seção:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedSection("todas");
                setSelectedSubtopic("todos");
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${selectedSection === "todas"
                  ? "bg-emerald-600 text-white font-bold shadow-sm"
                  : "bg-paper-200 dark:bg-warmblack-100 text-muted-foreground hover:text-foreground"
                }`}
            >
              Todas as Seções ({MOCK_ARTICLES.length})
            </button>
            {siteConfig.categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedSection(cat.slug);
                  setSelectedSubtopic("todos");
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all ${selectedSection === cat.slug
                    ? "bg-emerald-600 text-white font-bold shadow-sm"
                    : "bg-paper-200 dark:bg-warmblack-100 text-muted-foreground hover:text-foreground"
                  }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>

          {/* Subtopic Filter Chips when a section is active */}
          {activeCategoryConfig && activeCategoryConfig.subtopics.length > 0 && (
            <div className="pt-3 border-t border-paper-200 dark:border-warmblack-100 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase text-muted-foreground mr-1">
                Subtópico:
              </span>
              <button
                onClick={() => setSelectedSubtopic("todos")}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${selectedSubtopic === "todos"
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/40"
                    : "bg-paper-200 dark:bg-warmblack-100 text-muted-foreground hover:text-foreground"
                  }`}
              >
                Todos de {activeCategoryConfig.name}
              </button>
              {activeCategoryConfig.subtopics.map((sub) => (
                <button
                  key={sub.slug}
                  onClick={() => setSelectedSubtopic(sub.slug)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${selectedSubtopic === sub.slug
                      ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/40"
                      : "bg-paper-200 dark:bg-warmblack-100 text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Results Counter */}
        <div className="text-xs font-mono text-muted-foreground">
          Exibindo {filteredArticles.length} {filteredArticles.length === 1 ? "guia" : "guias"}
        </div>

        {/* Articles Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article, idx) => (
            <Link
              key={article.id}
              href={`/artigos/${article.slug}`}
              className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-5 shadow-sm hover:border-emerald-500/60 hover:shadow-xl transition-all flex flex-col justify-between"
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
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    GUIA {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                    <span>{formatDate(article.publishedAt)}</span>
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
                <span className="text-emerald-600 dark:text-emerald-400 font-medium group-hover:translate-x-1 transition-transform">
                  Ler Guia &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
