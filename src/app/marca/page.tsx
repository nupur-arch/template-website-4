"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, RefreshCw } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SignatureStamp } from "@/components/brand/SignatureStamp";

export default function MarcaPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [drawKey, setDrawKey] = useState(0);

  const colors = [
    { name: "Verde Esmeralda (Primário)", hex: "#0E9F6E", role: "Botões de ação, links principais, realces de energia", dark: true },
    { name: "Âmbar Solar (Acento)", hex: "#F5B700", role: "Badges de atenção, destaques pontuais e avisos", dark: false },
    { name: "Dark Escuro Profundo", hex: "#0F1B17", role: "Fundo no modo escuro, tipografia e contraste denso", dark: true },
    { name: "Light Fundo Claro", hex: "#F4FAF7", role: "Fundo principal em modo claro, tom arejado e limpo", dark: false },
    { name: "Ink Texto Neutro", hex: "#10201A", role: "Texto de leitura contínua, títulos e traços estruturais", dark: true },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen pt-24 sm:pt-28 pb-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-emerald-500 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar à Página Inicial
          </Link>
        </div>

        {/* Brand System Header */}
        <div className="space-y-4 pb-10 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono uppercase tracking-widest font-bold border border-emerald-500/30">
              MANUAL DE IDENTIDADE VISUAL
            </span>
            <span className="text-xs font-mono text-muted-foreground">Versão 2.0 • 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Sistema de Identidade: Movimento na Rotina
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Desenvolvido para transmitir vitalidade sustentável, sobriedade e incentivo ao adulto contemporâneo. Combina a herança editorial clássica com dinamismo atlético responsivo e tipografia de alto impacto.
          </p>
        </div>

        {/* 1. LOGO IDENTITY CONCEPT & VARIANTS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
                01 / MARCA & MONOGRAMA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
                Monograma e Assinatura Visual
              </h2>
            </div>
            <button
              onClick={() => setDrawKey((k) => k + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-paper-200 dark:bg-warmblack-200 hover:bg-emerald-500 hover:text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Repetir Desenho
            </button>
          </div>

          <p className="text-sm font-sans text-muted-foreground max-w-2xl">
            Conceito: <strong>A Onda Contínua de Movimento</strong>. Uma forma vetorial geométrica que une o rigor das colunas editoriais com a curvatura fluida do corpo em movimento, coroada pelo vértice em tom âmbar solar.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Versão: Logotipo Completo
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`full-${drawKey}`} variant="full" size={44} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Assinatura principal aplicada na barra de navegação e cabeçalhos oficiais.
              </div>
            </div>

            {/* Mark Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Versão: Monograma Isolado
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`mark-${drawKey}`} variant="mark" size={64} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Ícone independente para favicons, selos circulares e avatares de rede.
              </div>
            </div>

            {/* Stacked Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Versão: Monólito Vertical
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`stacked-${drawKey}`} variant="stacked" size={48} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Composição cerimonial em duas linhas para rodapés e encerramentos.
              </div>
            </div>
          </div>
        </section>

        {/* 2. COLOR TOKEN PALETTE */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              02 / PALETA DE CORES OFICIAIS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Harmonia Botânica & Energia Vital
            </h2>
            <p className="text-sm font-sans text-muted-foreground mt-1">
              Clique em qualquer amostra para copiar o código hexadecimal para sua área de transferência.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {colors.map((c) => (
              <div
                key={c.hex}
                onClick={() => handleCopyColor(c.hex)}
                className="group cursor-pointer rounded-2xl overflow-hidden border border-paper-300 dark:border-warmblack-100 bg-card shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className="h-28 w-full relative flex items-end p-3 transition-transform group-hover:scale-[1.02]"
                  style={{ backgroundColor: c.hex }}
                >
                  <span
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                      c.dark ? "bg-white/20 text-white" : "bg-black/20 text-black"
                    }`}
                  >
                    {c.hex}
                  </span>
                </div>
                <div className="p-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-foreground">
                      {c.name}
                    </span>
                    {copiedColor === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                  <p className="text-[11px] font-sans text-muted-foreground leading-snug">
                    {c.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SIGNATURE MOTIF STAMP */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              03 / SELO CINÉTICO DE ASSINATURA
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Carimbo Circular em Rotação Contínua
            </h2>
          </div>

          <p className="text-sm font-sans text-muted-foreground max-w-2xl">
            Selo animado em SVG com texto radial circular: <code>&quot;AO VIVO • 20+ GUIAS • MOVIMENTO NA ROTINA • EST. 2026 •&quot;</code>. Aplicado no Hero e no rodapé para certificar atualização e curadoria ativa.
          </p>

          <div className="p-10 rounded-3xl bg-paper-100/60 dark:bg-warmblack-200/50 border border-paper-300 dark:border-warmblack-100 flex flex-wrap items-center justify-around gap-8">
            <div className="text-center space-y-3">
              <SignatureStamp size={90} centerText="01/20" />
              <div className="text-xs font-mono text-muted-foreground">Escala Hero (90px)</div>
            </div>

            <div className="text-center space-y-3">
              <SignatureStamp size={120} centerText="ATIVO" />
              <div className="text-xs font-mono text-muted-foreground">Escala Rodapé (120px)</div>
            </div>

            <div className="text-center space-y-3">
              <SignatureStamp size={150} centerText="OFICIAL" text="SAÚDE & MOVIMENTO • GUIA BRASILEIRO • " />
              <div className="text-xs font-mono text-muted-foreground">Selo Editorial (150px)</div>
            </div>
          </div>
        </section>

        {/* 4. TYPOGRAPHY MATRIX */}
        <section className="space-y-8 pb-12 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-bold">
              04 / MATRIZ TIPOGRÁFICA
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Trio Tipográfico com Suporte a Diacríticos (pt-BR)
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Títulos Principais & Manchetes
              </span>
              <div className="font-serif text-3xl sm:text-5xl font-black text-foreground mt-2">
                Playfair Display — Força Editorial & Ritmo
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Espaçamento óptico denso, serifas expressivas e suporte completo aos caracteres ã, ç, é, ô, ú.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Corpo de Texto & Interface Interativa
              </span>
              <div className="font-sans text-xl sm:text-2xl font-semibold text-foreground mt-2">
                Plus Jakarta Sans — Clareza Geométrica & Alta Legibilidade
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Desenvolvida para leitura confortável em dispositivos móveis, sem fadiga visual em textos longos.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Contadores, Selos e Dados Mecânicos
              </span>
              <div className="font-mono text-lg sm:text-xl font-bold text-foreground mt-2">
                Space Mono — 100% GRATUITO • 20 GUIAS • 5 SEÇÕES
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Caracteres monoespaçados que alimentam as barras rotativas de dicas rápidas e o painel split-flap.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
