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
  Cpu,
  Coins,
  Palette,
  Leaf,
  Feather,
  Fingerprint,
  Scale,
  ShieldCheck,
  Search,
  Camera,
  Mail,
  Zap,
  RotateCcw,
  Clock,
} from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "@/components/brand/Logo";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });
  const [utcTime, setUtcTime] = useState<string>("12:00:00 UTC");
  const { scrollTo } = useSmoothScroll();

  // Bureau Live Clocks
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getUTCHours()).padStart(2, "0");
      const minutes = String(now.getUTCMinutes()).padStart(2, "0");
      const seconds = String(now.getUTCSeconds()).padStart(2, "0");
      setUtcTime(`${hours}:${minutes}:${seconds} UTC`);
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

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case "global-dispatches":
        return <Globe className="w-3.5 h-3.5 text-saffron" />;
      case "geopolitics":
        return <Shield className="w-3.5 h-3.5 text-orange-400" />;
      case "deep-tech":
        return <Cpu className="w-3.5 h-3.5 text-yellow-400" />;
      case "markets-capital":
        return <Coins className="w-3.5 h-3.5 text-emerald-400" />;
      case "culture-arts":
        return <Palette className="w-3.5 h-3.5 text-purple-400" />;
      case "climate-planet":
        return <Leaf className="w-3.5 h-3.5 text-teal-400" />;
      case "the-long-view":
        return <Feather className="w-3.5 h-3.5 text-rose-400" />;
      case "investigations":
        return <Fingerprint className="w-3.5 h-3.5 text-red-400" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-saffron" />;
    }
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-warmblack text-paper-50 pt-16 pb-12 overflow-hidden border-t border-saffron/20 select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#FFB000_1px,transparent_1px),linear-gradient(to_bottom,#FFB000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* 1. TOP LIVE GLOBAL TELEMETRY BAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-5 rounded-2xl bg-warmblack-100/80 border border-warmblack-50/80 backdrop-blur-md shadow-lg text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-saffron font-bold flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <Radio className="w-3.5 h-3.5" /> Live Bureau Network
            </span>
            <span className="hidden sm:inline text-paper-400">•</span>
            <span className="hidden sm:flex items-center gap-1 text-paper-300">
              <Clock className="w-3 h-3 text-saffron" />
              <span>{utcTime}</span>
            </span>
          </div>

          {/* Major Bureau Timezones */}
          <div className="flex items-center gap-4 text-[11px] text-paper-300 overflow-x-auto">
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-paper-400">LDN</span> 10:28
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-paper-400">NYC</span> 05:28
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-paper-400">TYO</span> 19:28
            </span>
            <span className="flex items-center gap-1.5 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-paper-400">GVA</span> 11:28
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-14">
        {/* 2. MASTHEAD & SIGNATURE STAMP TIER */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-12 border-b border-warmblack-50/80">
          <div className="space-y-4 max-w-xl">
            <Logo variant="full" href="/" size={42} className="text-white" />
            <p className="font-serif text-sm text-paper-300 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-saffron/15 text-saffron border border-saffron/30 flex items-center gap-1.5 font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Independent Syndicate
              </span>
              <span className="px-3 py-1 rounded-full bg-warmblack-100 text-paper-300 border border-warmblack-50 flex items-center gap-1.5">
                <Terminal className="w-3 h-3 text-saffron" />
                Wire Telemetry Active
              </span>
            </div>
          </div>

          {/* Signature Stamp & Quick Floating Action Hub */}
          <div className="flex items-center gap-6">
            <SignatureStamp
              size={120}
              text="LIVE • 20 STORIES • SAFFRON PRESS • EST. 2026 • "
              centerText="24/7"
            />
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => scrollTo(0)}
                className="p-3.5 rounded-2xl bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group flex items-center justify-center"
                aria-label="Scroll to top of publication"
                title="Return to Zenith"
              >
                <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <Link
                href="/search"
                className="p-3.5 rounded-2xl bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg group flex items-center justify-center text-paper-300"
                aria-label="Search archive"
                title="Search Archive"
              >
                <Search className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 3. FOUR RICH EDITORIAL CARDS WITH ICONS ON EVERY ITEM */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Desks & Coverage */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-saffron/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 text-saffron" />
                Desks & Wire
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-saffron/15 text-saffron font-mono">
                8 Desks
              </span>
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {siteConfig.categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="hover:text-saffron transition-colors flex items-center justify-between group py-1 rounded-lg px-1.5 hover:bg-warmblack-200/50"
                  >
                    <span className="flex items-center gap-2">
                      {getCategoryIcon(cat.slug)}
                      <span className="group-hover:translate-x-0.5 transition-transform text-paper-200 group-hover:text-white">
                        {cat.name}
                      </span>
                    </span>
                    <span className="text-[10px] font-mono text-paper-400 group-hover:text-saffron">
                      {cat.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Editorial Vault & Features */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-saffron/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Bookmark className="w-3.5 h-3.5 text-saffron" />
                Vault & Features
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-saffron/15 text-saffron font-mono">
                Dossier
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-paper-300">
              <li>
                <Link
                  href="/brand"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-saffron" />
                    <span>Brand System & Masthead</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/search"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-3.5 h-3.5 text-saffron" />
                    <span>Search Archive Matrix</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#photo-story"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-saffron" />
                    <span>Photo Monograph Prism</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#newsletter"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-saffron" />
                    <span>Confidential Broadside Folio</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/#breaking"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-saffron" />
                    <span>Rotating Wire Drum</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Card 3: Integrity & Governance */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-saffron/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-saffron" />
                Governance & Trust
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-saffron/15 text-saffron font-mono">
                Charter
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-sans text-paper-300">
              <li>
                <Link
                  href="/about#standards"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-saffron" />
                    <span>Editorial Standards Code</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about#contact"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-saffron" />
                    <span>Whistleblower Secure Drop</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about#corrections"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-saffron" />
                    <span>Corrections & Retractions</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about#syndication"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-saffron" />
                    <span>Syndication & Licensing</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/about#privacy"
                  className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                >
                  <span className="flex items-center gap-2">
                    <Fingerprint className="w-3.5 h-3.5 text-saffron" />
                    <span>Privacy Accord & No-Track</span>
                  </span>
                  <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Card 4: Wire Feeds & Transmissions */}
          <div className="p-6 rounded-3xl bg-warmblack-100/60 border border-warmblack-50/70 hover:border-saffron/30 transition-all duration-300 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center justify-between pb-3 border-b border-warmblack-50">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-saffron" />
                Teletype Wire
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                Online
              </span>
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-paper-300">
              {siteConfig.socials.map((soc, idx) => (
                <li key={idx}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-saffron transition-colors flex items-center justify-between group py-1 px-1.5 rounded-lg hover:bg-warmblack-200/50"
                  >
                    <span className="flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5 text-saffron" />
                      <span>{soc.platform}</span>
                    </span>
                    <span className="text-[10px] text-paper-400 group-hover:text-saffron flex items-center gap-0.5">
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
            {/* Ambient gold glow under wordmark */}
            <div className="absolute inset-0 bg-saffron/10 blur-3xl rounded-full pointer-events-none" />

            {/* Background Shadow Extrusion Layer */}
            <div
              className="font-serif font-black text-5xl sm:text-7xl md:text-9xl lg:text-[150px] tracking-tight leading-none select-none text-warmblack-200/30 absolute inset-0 blur-[2px]"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 1.0}px, ${-wordmarkOffset.y * 1.0}px, -35px)`,
              }}
            >
              SAFFRON PRESS
            </div>

            {/* Mid Extrusion Layer with Saffron tint */}
            <div
              className="font-serif font-black text-5xl sm:text-7xl md:text-9xl lg:text-[150px] tracking-tight leading-none select-none text-saffron/15 absolute inset-0"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 0.5}px, ${-wordmarkOffset.y * 0.5}px, -15px)`,
              }}
            >
              SAFFRON PRESS
            </div>

            {/* Foreground Main Wordmark */}
            <div
              className="relative font-serif font-black text-5xl sm:text-7xl md:text-9xl lg:text-[150px] tracking-tight leading-none select-none text-paper-100"
              style={{
                transform: "translate3d(0, 0, 10px)",
                textShadow: "0 10px 40px rgba(0,0,0,0.9)",
              }}
            >
              SAFFRON PRESS
            </div>
          </div>
        </div>

        {/* 5. BOTTOM COLOPHON BAR */}
        <div className="pt-8 border-t border-warmblack-50/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-paper-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} Saffron Press Syndicate.</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline text-saffron">Pure CSS 3D Transforms</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/about" className="hover:text-saffron flex items-center gap-1 transition-colors">
              <Shield className="w-3 h-3 text-saffron" />
              <span>Editorial Charter</span>
            </Link>
            <span>•</span>
            <Link href="/brand" className="hover:text-saffron flex items-center gap-1 transition-colors">
              <Sparkles className="w-3 h-3 text-saffron" />
              <span>Brand System</span>
            </Link>
            <span>•</span>
            <span className="text-paper-300 flex items-center gap-1">
              <Lock className="w-3 h-3 text-saffron" />
              <span>Zero WebGL • 60 FPS</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
