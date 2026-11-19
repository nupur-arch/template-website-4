import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, AlertTriangle, FileText, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Política de Privacidade (LGPD) | Movimento na Rotina",
  description:
    "Transparência, proteção de dados sob a LGPD brasileira, armazenamento local e compromisso com a privacidade dos leitores.",
};

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Página Inicial
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-4 pb-8 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold border border-emerald-500/30">
              CONFORMIDADE LGPD
            </span>
            <span className="text-xs font-mono text-muted-foreground">Atualizado em 2026</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Política de Privacidade e Proteção de Dados
          </h1>

          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed">
            O <strong>Movimento na Rotina</strong> (movimentonarotina.com) está plenamente comprometido com a transparência, a segurança e os direitos de privacidade de seus leitores, em total conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei Federal nº 13.709/2018).
          </p>
        </div>

        {/* Health Disclaimer Callout */}
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" /> Diretriz de Saúde Obrigatória
          </div>
          <p className="font-serif font-bold text-foreground">
            {siteConfig.healthDisclaimer}
          </p>
          <p className="text-xs text-muted-foreground">
            As orientações disponibilizadas neste portal não constituem prescrição médica nem substituem a orientação de educadores físicos ou fisioterapeutas habilitados.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base text-muted-foreground leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> 1. Conteúdo Exclusivo para Adultos
            </h2>
            <p>
              O conteúdo do Movimento na Rotina é produzido especificamente para o público adulto que busca orientações práticas e sustentáveis para incorporar exercícios físicos à sua rotina diária. Não coletamos intencionalmente dados de crianças ou adolescentes menores de 18 anos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-500" /> 2. Newsletter e Armazenamento Local (Demo)
            </h2>
            <p>
              A caixa de assinatura de newsletter presente no site opera como uma <strong>demonstração de interface</strong>. Ao informar seu endereço de e-mail e clicar em cadastrar:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li>O dado é salvo <strong>exclusivamente na memória local do seu próprio navegador</strong> (via <code>localStorage</code>).</li>
              <li>Nenhum endereço de e-mail é transmitido para servidores remotos, serviços de automação de marketing ou bancos de dados na nuvem nesta fase de demonstração.</li>
              <li>Você pode limpar esse dado a qualquer momento esvaziando o cache e armazenamento local do seu navegador.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> 3. Cookies e Tecnologias de Rastreamento
            </h2>
            <p>
              Prezamos pela privacidade como padrão (privacy by design). Utilizamos apenas cookies estritamente necessários para o funcionamento técnico do portal (como a preferência de tema claro/escuro e o estado de filtros de busca). Não utilizamos cookies invasivos para perfilamento comportamental entre sites (cross-site tracking).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" /> 4. Publicidade e Transparência Comercial
            </h2>
            <p>
              Em cumprimento às boas práticas éticas e normas do CONAR:
            </p>
            <ul className="list-disc pl-6 space-y-1.5 text-xs sm:text-sm">
              <li>Qualquer conteúdo patrocinado ou parceria comercial futura será claramente identificado com o rótulo visual ostensivo <strong>&quot;Publicidade&quot;</strong>.</li>
              <li>Não veiculamos nem aceitamos anúncios de substâncias proibidas, remédios milagrosos, promessas fraudulentas de perda de peso ou qualquer produto que não seja legalmente elegível no Brasil.</li>
              <li>No momento presente, o portal opera 100% livre de blocos promocionais ou anúncios de terceiros.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              5. Seus Direitos sob a LGPD
            </h2>
            <p>
              Conforme o artigo 18 da LGPD, você tem direito a confirmar a existência de tratamento de dados, solicitar retificação ou eliminação definitiva de dados pessoais que eventualmente venham a ser processados no futuro.
            </p>
          </section>

          <section className="space-y-3 p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
            <h3 className="font-serif text-lg font-bold text-foreground">
              6. Encarregado pelo Tratamento de Dados (DPO)
            </h3>
            <p className="text-xs sm:text-sm">
              Para esclarecer dúvidas sobre esta Política de Privacidade ou exercer direitos fundamentais previstos na LGPD, envie uma mensagem para o nosso canal de privacidade:
            </p>
            <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              privacidade@movimentonarotina.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
