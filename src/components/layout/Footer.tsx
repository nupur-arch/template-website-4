"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Shield,
  Globe,
  Terminal,
  ArrowUp,
  FileText,
  Bookmark,
  Sparkles,
  Compass,
  Radio,
  Lock,
  Dumbbell,
  Shirt,
  Users,
  HeartPulse,
  ShieldCheck,
  Search,
  Camera,
  Mail,
  Zap,
  Clock,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "@/components/brand/Logo";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });
  const [brtTime, setBrtTime] = useState<string>("12:00:00 BRT");
  const { scrollTo } = useSmoothScroll();

  // Brasília Live Clock (UTC-3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Brasília time (UTC-3)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Sao_Paulo",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setBrtTime(`${new Intl.DateTimeFormat("pt-BR", options).format(now)} BRT`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setWordmarkOffset({ x: x * 12, y: y * 6 });
  }, []);

  const handleMouseLeave = () => {
    setWordmarkOffset({ x: 0, y: 0 });
  };

  const getSectionIcon = (slug: string) => {
    switch (slug) {
      case "atividades":
        return <Dumbbell className="w-3.5 h-3.5 text-emerald-400" />;
      case "equipamentos":
        return <Shirt className="w-3.5 h-3.5 text-amber-400" />;
      case "iniciacao":
        return <Compass className="w-3.5 h-3.5 text-teal-400" />;
      case "servicos":
        return <Users className="w-3.5 h-3.5 text-emerald-300" />;
      case "habitos":
        return <HeartPulse className="w-3.5 h-3.5 text-amber-300" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
    }
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-warmblack text-paper-50 pt-16 pb-12 overflow-hidden border-t border-emerald-500/20 select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#0E9F6E_1px,transparent_1px),linear-gradient(to_bottom,#0E9F6E_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 1. TOP LIVE BRASÍLIA TELEMETRY BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-warmblack-100/80 border border-warmblack-50/80 backdrop-blur-md shadow-lg text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Radio className="w-3.5 h-3.5" /> Portal do Movimento Ativo
            </span>
            <span className="hidden sm:inline text-paper-400">•</span>
            <span className="hidden sm:flex items-center gap-1 text-paper-300">
              <Clock className="w-3 h-3 text-emerald-400" />
              <span>{brtTime}</span>
            </span>
          </div>

          {/* Brazilian Major City Timezones */}
          <div className="flex items-center gap-4 text-[11px] text-paper-300 overflow-x-auto">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-paper-400">BSB</span> {brtTime.slice(0, 5)}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-paper-400">SP</span> {brtTime.slice(0, 5)}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-paper-400">RIO</span> {brtTime.slice(0, 5)}
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-paper-400">SSA</span> {brtTime.slice(0, 5)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* 2. MASTHEAD, HEALTH NOTICE & SIGNATURE STAMP TIER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-warmblack-50/80">
          <div className="space-y-4 max-w-xl">
            <Logo variant="full" href="/" size={42} className="text-white" />
            <p className="font-serif text-sm text-paper-300 leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Mandated Health Disclaimer Alert Banner */}
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-start gap-2.5 text-xs font-sans text-paper-200">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Aviso de Saúde</strong>: {siteConfig.healthDisclaimer}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Conteúdo 100% Aberto & Seguro
              </span>
              <span className="px-3 py-1 rounded-full bg-warmblack-100 text-paper-300 border border-warmblack-50 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-amber-400" />
                Sem Promessas Milagrosas
              </span>
            </div>
          </div>

          {/* Signature Stamp & Quick Floating Action Hub */}
          <div className="flex items-center gap-6">
            <SignatureStamp
              size={120}
              text="AO VIVO • 20+ GUIAS • MOVIMENTO NA ROTINA • EST. 2026 • "
              centerText="ATIVO"
            />
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => scrollTo(0)}
                className="p-3.5 rounded-2xl bg-warmblack-100 hover:bg-emerald-600 hover:text-white border border-warmblack-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group flex items-center justify-center text-paper-200"
                aria-label="Voltar ao topo da página"
                title="Voltar ao Topo"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <Link
                href="/busca"
                className="p-3.5 rounded-2xl bg-warmblack-100 hover:bg-emerald-600 hover:text-white border border-warmblack-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group flex items-center justify-center text-paper-300"
                aria-label="Buscar no arquivo"
                title="Buscar no Arquivo"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. FOUR RICH EDITORIAL CARDS WITH ICONS ON EVERY ITEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: 5 Seções Principais */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-emerald-500/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-emerald-400" />
                5 Seções
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                5 Temas
              </span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {siteConfig.categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/secoes/${cat.slug}`}
                    className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 rounded-lg px-1.5 hover:bg-warmblack-200/50"
                  >
                    <span className="flex items-center gap-2">
                      {getSectionIcon(cat.slug)}
                      <span className="group-hover:translate-x-0.5 transition-transform text-paper-200 group-hover:text-white font-medium">
                        {cat.name}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-paper-400 group-hover:text-emerald-400">
                      {cat.count} guias
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Guias & Recursos */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-emerald-500/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                Recursos & Guias
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                Acervo
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-paper-300">
              <li>
                <Link
                  href="/arquivo"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Arquivo Completo com Filtros</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/busca"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Busca Rápida de Artigos</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#photo-story"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Fotorreportagens do Movimento</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#newsletter"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Boletim Semanal (Demo)</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/api/news"
                  target="_blank"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>Feed Notícias (/api/news)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Card 3: Fontes de Referência & Institucional */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-emerald-500/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                Fontes & Padrões
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                Oficial
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-paper-300">
              <li>
                <a
                  href="https://www.gov.br/saude/pt-br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Ministério da Saúde</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-emerald-400" />
                </a>
              </li>
              <li>
                <a
                  href="https://gooutside.com.br/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Go Outside Brasil</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                </a>
              </li>
              <li>
                <Link
                  href="/sobre#fontes"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Padrões Editoriais & Fontes</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Privacidade & LGPD</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Card 4: Canais & Redes */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-emerald-500/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                Canais do Movimento
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                Brasil
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-paper-300">
              {siteConfig.socials.map((soc, idx) => (
                <li key={idx}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{soc.platform}</span>
                    </span>
                    <span className="text-[10px] text-paper-400 group-hover:text-emerald-400 flex items-center gap-0.5">
                      <span>{soc.handle}</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. REFINED ARCHITECTURAL EXTRUDED WORDMARK WITH POINTER DEPTH PARALLAX */}
        <div
          className="relative pt-10 pb-6 overflow-hidden text-center cursor-default select-none"
          style={{ perspective: "1000px" }}
        >
          <div
            className="preserve-3d transition-transform duration-200 ease-out inline-block"
            style={{
              transform: `rotateX(${-wordmarkOffset.y * 0.7}deg) rotateY(${wordmarkOffset.x * 0.7}deg)`,
            }}
          >
            {/* Ambient emerald glow under wordmark */}
            <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Background Shadow Extrusion Layer */}
            <div
              className="font-serif font-black text-4xl sm:text-6xl md:text-8xl lg:text-[110px] tracking-tight leading-none select-none text-warmblack-200/30 absolute inset-0 blur-[2px]"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 1.0}px, ${-wordmarkOffset.y * 1.0}px, -35px)`,
              }}
            >
              MOVIMENTO NA ROTINA
            </div>

            {/* Mid Extrusion Layer with emerald tint */}
            <div
              className="font-serif font-black text-4xl sm:text-6xl md:text-8xl lg:text-[110px] tracking-tight leading-none select-none text-emerald-500/15 absolute inset-0"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 0.5}px, ${-wordmarkOffset.y * 0.5}px, -15px)`,
              }}
            >
              MOVIMENTO NA ROTINA
            </div>

            {/* Foreground Main Wordmark */}
            <div
              className="relative font-serif font-black text-4xl sm:text-6xl md:text-8xl lg:text-[110px] tracking-tight leading-none select-none text-paper-100"
              style={{
                transform: "translate3d(0, 0, 10px)",
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              MOVIMENTO NA ROTINA
            </div>
          </div>
        </div>

        {/* 5. BOTTOM COLOPHON BAR */}
        <div className="pt-8 border-t border-warmblack-50/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-paper-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Movimento na Rotina.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-emerald-400">
              movimentonarotina.com
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/sobre" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <Shield className="w-3 h-3 text-emerald-400" />
              <span>Sobre & Fontes</span>
            </Link>
            <span>•</span>
            <Link href="/marca" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Manual da Marca</span>
            </Link>
            <span>•</span>
            <Link href="/privacidade" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Privacidade (LGPD)</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
