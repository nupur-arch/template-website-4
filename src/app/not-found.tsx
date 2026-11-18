import Link from "next/link";
import { ArrowLeft, Compass, FileQuestion } from "lucide-react";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 px-4 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-saffron/15 text-saffron border border-saffron/30 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
            ERROR 404 • DISPATCH NOT FOUND
          </span>
          <h1 className="font-serif text-3xl font-black text-foreground">
            Transmission Lost
          </h1>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
            The requested folio or dispatch does not exist in the Saffron Press archive. It may have been retracted, re-indexed, or moved to cold storage.
          </p>
        </div>

        <div className="pt-4 border-t border-paper-200 dark:border-warmblack-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-saffron text-warmblack font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-saffron-400 transition-colors shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-paper-200 dark:bg-warmblack-200 text-foreground font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-paper-300 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" /> Open Index
          </Link>
        </div>
      </div>
    </div>
  );
}
