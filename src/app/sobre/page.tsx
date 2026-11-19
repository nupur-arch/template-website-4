import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Globe, HeartPulse, ExternalLink, CheckCircle2, AlertTriangle, Users } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { MOCK_AUTHORS } from "@/mocks/articles";

export const metadata: Metadata = {
  title: "Sobre & Fontes Oficiais | Movimento na Rotina",
  description:
    "Conheça nossa carta editorial, padrões de segurança, equipe técnica e fontes oficiais de saúde e movimento para adultos.",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Página Inicial
          </Link>
        </div>

        {/* Masthead Header */}
        <div className="space-y-4 pb-10 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold border border-emerald-500/30">
              DIRETRIZES EDITORIAIS & FONTES
            </span>
            <span className="text-xs font-mono text-muted-foreground">Est. 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Movimento real para a vida cotidiana.
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-muted-foreground leading-relaxed">
            &ldquo;Acreditamos que o exercício físico sustentável não nasce da culpa ou do extremismo, mas da consistência simples integrada à rotina dos adultos brasileiros.&rdquo;
          </p>
        </div>

        {/* Health Disclaimer Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" /> Aviso Importante de Saúde
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold text-foreground">
            {siteConfig.healthDisclaimer}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Todo o conteúdo publicado no <strong>Movimento na Rotina</strong> tem caráter puramente educativo e informativo para o público adulto. Nossos guias não substituem a avaliação individualizada, o diagnóstico clínico ou a prescrição personalizada feita por médicos, educadores físicos ou fisioterapeutas.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              COMPROMISSO ÉTICO
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Nossos Três Pilares de Produção
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
              <Shield className="w-6 h-6 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg text-foreground">
                Segurança Sem Extremismos
              </h3>
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                Rejeitamos dietas milagrosas, promessas de transformação corporal em poucos dias e treinos lesivos. Priorizamos a ergonomia, a progressão gradual e o respeito à individualidade biológica.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
              <HeartPulse className="w-6 h-6 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg text-foreground">
                Conteúdo Adulto & Realista
              </h3>
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                Criado especificamente para quem lida com jornadas de trabalho, família e cansaço. Focamos em soluções de 15 a 45 minutos que cabem na rotina sem gerar sobrecarga mental.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
              <Globe className="w-6 h-6 text-emerald-500" />
              <h3 className="font-serif font-bold text-lg text-foreground">
                Transparência e Fatos Reais
              </h3>
              <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                Não publicamos números inflados, depoimentos fabricados ou personas fictícias. Nossos guias citam parâmetros oficiais e boas práticas reconhecidas da educação física e da medicina do esporte.
              </p>
            </div>
          </div>
        </div>

        {/* Reference Sources Section */}
        <section id="fontes" className="space-y-8 pt-8 border-t border-paper-300 dark:border-warmblack-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              REFERÊNCIAS & EMBASAMENTO
            </span>
            <h2 className="font-serif text-3xl font-black text-foreground mt-1">
              Fontes Oficiais & Inspirações
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
              Nossos guias apoiam-se em documentos públicos do governo federal e referências consolidadas do jornalismo esportivo brasileiro:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {siteConfig.referenceSources.map((source) => (
              <a
                key={source.name}
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 hover:border-emerald-500/50 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif font-bold text-base text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {source.name}
                  </h3>
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-emerald-500 shrink-0 mt-1" />
                </div>
                <p className="text-xs font-sans text-muted-foreground leading-relaxed">
                  {source.description}
                </p>
                <span className="inline-block text-[11px] font-mono text-emerald-600 dark:text-emerald-400 group-hover:underline">
                  {source.url.replace(/^https?:\/\//, "")} →
                </span>
              </a>
            ))}
          </div>
        </section>

        {/* Editorial Team */}
        <section id="equipe" className="space-y-8 pt-8 border-t border-paper-300 dark:border-warmblack-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              CORPO EDITORIAL
            </span>
            <h2 className="font-serif text-3xl font-black text-foreground mt-1">
              Redação e Consultoria Técnica
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(MOCK_AUTHORS).map((author) => (
              <div
                key={author.id}
                className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-paper-200 dark:bg-warmblack-200 border border-paper-300 dark:border-warmblack-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-foreground">
                    {author.name}
                  </h4>
                  <p className="text-xs font-mono text-emerald-600 dark:text-emerald-400">{author.title}</p>
                  <p className="text-xs font-sans text-muted-foreground mt-2 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact and Ethics Terminal */}
        <section id="contato" className="p-8 sm:p-10 rounded-3xl bg-warmblack text-paper-50 border border-emerald-500/40 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
            <Users className="w-4 h-4" /> Atendimento & Fale Conosco
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Sugestões, Correções e Pautas
          </h3>
          <p className="text-xs sm:text-sm text-paper-300 max-w-2xl leading-relaxed">
            Prezamos pela máxima precisão técnica. Caso encontre alguma informação que precise de atualização ou sugestão de tema sobre treinos, equipamentos ou hábitos, entre em contato com nossa redação pelo e-mail <code className="text-emerald-400">redacao@movimentonarotina.com</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
