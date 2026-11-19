import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import {
  Clock,
  Calendar,
  ChevronRight,
  ArrowLeft,
  User,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { getArticleBySlug, getRelatedArticles } from "@/services/articles";
import { MOCK_ARTICLES } from "@/mocks/articles";
import { siteConfig } from "@/content/site.config";
import { SafeImage } from "@/components/ui/SafeImage";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { ShareButtons } from "@/components/article/ShareButtons";
import { formatDate, formatTimeAgo } from "@/lib/utils";

interface ArtigoPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return MOCK_ARTICLES.map((art) => ({
    slug: art.slug,
  }));
}

export async function generateMetadata({ params }: ArtigoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artigo Não Encontrado | Movimento na Rotina",
    };
  }

  return {
    title: `${article.title} | Movimento na Rotina`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: article.coverImage ? [{ url: article.coverImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
}

export default async function ArtigoPage({ params }: ArtigoPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug, 3);

  // JSON-LD Article Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? [article.coverImage] : [],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        jobTitle: article.author.title,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/artigos/${article.slug}`,
    },
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen pt-20 sm:pt-24 pb-24 bg-background">
        {/* Breadcrumbs Navigation */}
        <div className="border-b border-paper-200 dark:border-warmblack-100 bg-paper-100/40 dark:bg-warmblack-900/40 py-3">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center gap-2 text-xs font-mono text-muted-foreground overflow-x-auto no-scrollbar">
            <Link href="/" className="hover:text-foreground flex items-center gap-1 shrink-0">
              <ArrowLeft className="w-3.5 h-3.5" />
              Início
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
            <Link
              href={`/secoes/${article.categorySlug}`}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 shrink-0 uppercase tracking-wider"
            >
              {article.category}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-40" />
            <span className="truncate text-foreground font-semibold">{article.title}</span>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16 pb-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/secoes/${article.categorySlug}`}
              className="px-3 py-1 rounded-full bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-emerald-500 transition-colors"
            >
              {article.category}
            </Link>
            {article.subtopic && (
              <span className="px-2.5 py-0.5 rounded-full bg-paper-200 dark:bg-warmblack-200 text-xs font-mono text-muted-foreground uppercase">
                {article.subtopic}
              </span>
            )}
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              {article.readTimeMinutes} min de leitura
            </span>
            <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-emerald-500" />
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-black text-foreground tracking-tight leading-[1.12]">
            {article.title}
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-muted-foreground leading-relaxed border-l-2 border-emerald-500 pl-4 sm:pl-6 my-4">
            {article.excerpt}
          </p>

          {/* Author Card & Share Controls */}
          <div className="pt-6 border-t border-paper-200 dark:border-warmblack-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-paper-300 dark:bg-warmblack-100 relative shrink-0 border border-paper-300 dark:border-warmblack-50">
                {article.author.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={article.author.avatar}
                    alt={article.author.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 m-auto text-emerald-500" />
                )}
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm text-foreground">
                  {article.author.name}
                </h4>
                <p className="text-xs font-mono text-muted-foreground">
                  {article.author.title}
                </p>
              </div>
            </div>

            <ShareButtons title={article.title} slug={article.slug} />
          </div>
        </header>

        {/* Featured Cover Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-10">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-paper-300 dark:border-warmblack-100 shadow-xl">
            <SafeImage
              src={article.coverImage}
              alt={article.title}
              category={article.category}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1100px"
              className="object-cover"
            />
          </div>
          {article.coverImageAlt && (
            <p className="mt-2 text-center text-xs font-mono text-muted-foreground">
              [Registro: {article.coverImageAlt}]
            </p>
          )}
        </div>

        {/* Health Disclaimer Banner */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 mb-8">
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3 text-xs font-sans text-paper-200">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Aviso de Saúde</strong>: {siteConfig.healthDisclaimer}
            </span>
          </div>
        </div>

        {/* Main Article Markdown Content */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg dark:prose-invert max-w-none font-sans leading-relaxed space-y-6">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeSanitize]}
              components={{
                h1: ({ children }) => (
                  <h2 className="font-serif font-black text-2xl sm:text-3xl text-foreground tracking-tight mt-10 mb-4 pb-2 border-b border-paper-200 dark:border-warmblack-100">
                    {children}
                  </h2>
                ),
                h2: ({ children }) => (
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-foreground tracking-tight mt-8 mb-3">
                    {children}
                  </h3>
                ),
                h3: ({ children }) => (
                  <h4 className="font-serif font-bold text-lg text-foreground mt-6 mb-2">
                    {children}
                  </h4>
                ),
                p: ({ children }) => (
                  <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-sans mb-5">
                    {children}
                  </p>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="my-6 border-l-4 border-emerald-500 pl-5 py-2 font-serif italic text-lg sm:text-xl text-foreground/80 bg-paper-100/60 dark:bg-warmblack-200/40 rounded-r-2xl">
                    {children}
                  </blockquote>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc pl-6 space-y-2 text-foreground/90 my-4">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal pl-6 space-y-2 text-foreground/90 my-4">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="leading-relaxed">{children}</li>
                ),
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith("http");
                  return (
                    <a
                      href={href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                      className="text-emerald-600 dark:text-emerald-400 underline underline-offset-4 font-semibold hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5"
                    >
                      {children}
                      {isExternal && <ExternalLink className="w-3 h-3 ml-0.5 inline" />}
                    </a>
                  );
                },
                code: ({ children }) => (
                  <code className="px-2 py-0.5 rounded-md bg-paper-200 dark:bg-warmblack-100 text-emerald-600 dark:text-emerald-400 font-mono text-sm">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="p-4 rounded-2xl bg-warmblack text-paper-50 font-mono text-xs overflow-x-auto border border-warmblack-50 my-6 shadow-md">
                    {children}
                  </pre>
                ),
              }}
            >
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          <div className="mt-12 pt-6 border-t border-paper-200 dark:border-warmblack-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mr-2">
              Tags:
            </span>
            {article.tags.map((tag) => (
              <Link
                key={tag}
                href={`/busca?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 rounded-full text-xs font-mono bg-paper-200 dark:bg-warmblack-200 hover:bg-emerald-500/20 border border-paper-300 dark:border-warmblack-100 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>

          {/* Author Detailed Bio Card */}
          <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-paper-100/70 dark:bg-warmblack-200/50 border border-paper-300 dark:border-warmblack-100 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-paper-300 dark:bg-warmblack-100 shrink-0 border border-paper-300 dark:border-warmblack-50">
              {article.author.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 m-auto text-emerald-500" />
              )}
            </div>
            <div className="space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                Especialista
              </div>
              <h4 className="font-serif font-bold text-lg text-foreground">
                {article.author.name}
              </h4>
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                {article.author.bio || article.author.title}
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-20 pt-12 border-t border-paper-300 dark:border-warmblack-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                  CONTINUE SE MOVIMENTANDO
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
                  Guias Relacionados
                </h3>
              </div>
              <Link
                href={`/secoes/${article.categorySlug}`}
                className="text-xs font-mono text-emerald-600 dark:text-emerald-400 hover:underline font-semibold"
              >
                Ver todos em {article.category} &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/artigos/${rel.slug}`}
                  className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-4 shadow-sm hover:border-emerald-500/60 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-3">
                      <SafeImage
                        src={rel.coverImage}
                        alt={rel.title}
                        category={rel.category}
                        fill
                        sizes="320px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-warmblack/80 text-emerald-400 text-[9px] font-mono uppercase font-bold">
                        {rel.category}
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="pt-3 mt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                    <span>{formatTimeAgo(rel.publishedAt)}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ler &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
