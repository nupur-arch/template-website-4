import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight, Compass } from "lucide-react";
import { getCategoryArticles } from "@/services/articles";
import { siteConfig } from "@/content/site.config";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo } from "@/lib/utils";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = siteConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: "Category Not Found | Saffron Press" };
  }

  return {
    title: `${category.name} Desks | Saffron Press`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = siteConfig.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const articles = await getCategoryArticles(slug);

  return (
    <div className="min-h-screen py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
        </div>

        {/* Desk Header */}
        <div className="pb-8 mb-12 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-saffron" />
              EDITORIAL DESK ARCHIVE
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
            <span className="text-xs font-mono text-muted-foreground">
              {articles.length} dispatches registered
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight mb-4">
            {category.name}
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
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
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-warmblack/80 backdrop-blur-sm text-saffron text-[9px] font-mono uppercase font-bold">
                      {article.category}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                      #{String(index + 1).padStart(2, "0")}
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
                    <p className="text-xs text-muted-foreground line-clamp-3 font-sans">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-paper-200 dark:border-warmblack-200 flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>By {article.author.name}</span>
                  <span className="text-saffron flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Read &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center space-y-3">
            <h3 className="font-serif text-xl font-bold text-foreground">
              No dispatches currently assigned to this desk
            </h3>
            <p className="text-sm text-muted-foreground">
              Field correspondents are currently compiling dossiers for this region.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 rounded-xl bg-saffron text-warmblack font-mono text-xs font-bold uppercase"
            >
              Return to Top Stories
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
