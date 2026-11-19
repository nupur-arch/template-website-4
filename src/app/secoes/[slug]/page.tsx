import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight, Compass, AlertCircle } from "lucide-react";
import { getCategoryArticles } from "@/services/articles";
import { siteConfig } from "@/content/site.config";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo } from "@/lib/utils";
import { SecaoFilterChips } from "./SecaoFilterChips";

interface SecaoPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ subtopico?: string }>;
}

export function generateStaticParams() {
  return siteConfig.categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: SecaoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = siteConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Seção Não Encontrada | Movimento na Rotina" };
  }

  return {
    title: `${category.name} | Movimento na Rotina`,
    description: category.description,
  };
}

export default async function SecaoPage({ params, searchParams }: SecaoPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const currentSubtopic = resolvedSearchParams?.subtopico || "todos";

  const category = siteConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = await getCategoryArticles(slug, currentSubtopic);

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Início
          </Link>
        </div>

        {/* Section Header */}
        <div className="pb-8 mb-8 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-500" />
              SEÇÃO ESPECIALIZADA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-mono text-muted-foreground">
              {articles.length} guias disponíveis
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-4">
            {category.name}
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed mb-6">
            {category.description}
          </p>

          {/* Sub-topics Filter Chips (Mandated in Part 2) */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
              Filtrar por subtópico:
            </span>
            <SecaoFilterChips
              categorySlug={category.slug}
              subtopics={category.subtopics}
              currentSubtopic={currentSubtopic}
            />
          </div>
        </div>

        {/* Health Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs font-sans text-paper-200">
          <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>
            <strong>Lembrete de Saúde</strong>: {siteConfig.healthDisclaimer}
          </span>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
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
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-warmblack/80 backdrop-blur-sm text-emerald-400 text-[9px] font-mono uppercase font-bold">
                      {article.subtopic || article.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                      #{String(index + 1).padStart(2, "0")}
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
                    <p className="text-xs text-muted-foreground line-clamp-3 font-sans">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>{article.author.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform font-bold">
                    <span>Ler Guia</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <h3 className="font-serif text-xl font-bold text-foreground">
              Nenhum guia encontrado para este filtro
            </h3>
            <p className="text-sm text-muted-foreground">
              Tente selecionar outro subtópico ou ver todos os guias da seção.
            </p>
            <Link
              href={`/secoes/${category.slug}`}
              className="inline-block mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider"
            >
              Ver Todos os Guias
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
