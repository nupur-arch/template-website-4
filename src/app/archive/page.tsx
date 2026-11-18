import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock, Archive as ArchiveIcon } from "lucide-react";
import { MOCK_ARTICLES } from "@/mocks/articles";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatTimeAgo, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dispatch Vault & Archive | Saffron Press",
  description: "Complete chronological catalog of dispatches, essays, and investigative dossiers.",
};

export default function ArchivePage() {
  const articles = MOCK_ARTICLES;

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
        </div>

        {/* Header */}
        <div className="pb-8 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
              <ArchiveIcon className="w-3.5 h-3.5 text-saffron" />
              CHRONOLOGICAL FOLIO RECORD
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
            <span className="text-xs font-mono text-muted-foreground">
              {articles.length} Registered Articles
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            The Complete Dispatch Vault
          </h1>
          <p className="font-sans text-sm sm:text-base text-muted-foreground max-w-xl mt-3">
            Every investigation, geopolitical bulletin, and cultural thesis archived in chronological order of transmission.
          </p>
        </div>

        {/* Articles Table / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <Link
              key={article.id}
              href={`/article/${article.slug}`}
              className="group rounded-3xl overflow-hidden bg-card border border-paper-300 dark:border-warmblack-100 p-5 shadow-sm hover:border-saffron/60 hover:shadow-xl transition-all flex flex-col justify-between"
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
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                    VOL. {String(idx + 1).padStart(2, "0")}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-muted-foreground flex items-center justify-between">
                    <span>{formatDate(article.publishedAt)}</span>
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
                <span className="text-saffron font-medium">Inspect &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
