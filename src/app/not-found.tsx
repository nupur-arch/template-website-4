import Link from "next/link";
import { ArrowLeft, Compass, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center pt-28 pb-20 px-4 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
            ERRO 404 • PÁGINA NÃO ENCONTRADA
          </span>
          <h1 className="font-serif text-3xl font-black text-foreground">
            Guia Não Encontrado
          </h1>
          <p className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed">
            O endereço ou guia solicitado não foi localizado em nosso acervo. Ele pode ter sido atualizado, renomeado ou movido.
          </p>
        </div>

        <div className="pt-4 border-t border-paper-200 dark:border-warmblack-100 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Página Inicial
          </Link>
          <Link
            href="/busca"
            className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-paper-200 dark:bg-warmblack-200 text-foreground font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-paper-300 transition-colors"
          >
            <Compass className="w-3.5 h-3.5" /> Fazer uma Busca
          </Link>
        </div>
      </div>
    </div>
  );
}
