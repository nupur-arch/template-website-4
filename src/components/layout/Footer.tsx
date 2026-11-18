"use client";

import { useRef, useState, useCallback } from "react";
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
} from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "@/components/brand/Logo";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [wordmarkOffset, setWordmarkOffset] = useState({ x: 0, y: 0 });
  const { scrollTo } = useSmoothScroll();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setWordmarkOffset({ x: x * 15, y: y * 8 });
  }, []);

  const handleMouseLeave = () => {
    setWordmarkOffset({ x: 0, y: 0 });
  };

  return (
    <footer
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative bg-warmblack text-paper-50 pt-20 pb-12 overflow-hidden border-t border-saffron/20 select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#FFB000_1px,transparent_1px),linear-gradient(to_bottom,#FFB000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Masthead & Stamp Section */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-16 border-b border-warmblack-50/80">
          <div className="space-y-4 max-w-lg">
            <Logo variant="full" size={40} className="text-white" />
            <p className="font-serif text-sm text-paper-300 leading-relaxed">
              {siteConfig.description}
            </p>
            <div className="flex items-center gap-3 text-xs font-mono text-saffron">
              <span className="w-2 h-2 rounded-full bg-saffron animate-pulse" />
              <span className="flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5" />
                Independent Dispatches • Est. 2026
              </span>
            </div>
          </div>

          {/* Signature Circular Stamp */}
          <div className="flex items-center gap-6">
            <SignatureStamp
              size={120}
              text="LIVE • 20 STORIES • SAFFRON PRESS • EST. 2026 • "
              centerText="24/7"
            />
            <button
              onClick={() => scrollTo(0)}
              className="p-3.5 rounded-full bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 transition-all hover:scale-110 active:scale-95 shadow-lg"
              aria-label="Scroll back to top"
              title="Return to top"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Links Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-warmblack-50/80">
          {siteConfig.footerLinks.map((column, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center gap-1.5">
                {idx === 0 && <Compass className="w-3.5 h-3.5 text-saffron" />}
                {idx === 1 && <FileText className="w-3.5 h-3.5 text-saffron" />}
                {idx === 2 && <Shield className="w-3.5 h-3.5 text-saffron" />}
                <span>{column.title}</span>
              </h4>
              <ul className="space-y-2.5 text-xs font-sans text-paper-300">
                {column.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      href={link.href}
                      className="hover:text-saffron transition-colors flex items-center justify-between group py-0.5"
                    >
                      <span className="group-hover:translate-x-0.5 transition-transform">
                        {link.label}
                      </span>
                      <ArrowUpRight className="w-3 h-3 text-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Socials & Wire Feed with Icons */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-saffron font-bold flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-saffron" /> Teletype Network
            </h4>
            <ul className="space-y-2.5 text-xs font-mono text-paper-300">
              {siteConfig.socials.map((soc, idx) => (
                <li key={idx}>
                  <a
                    href={soc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-saffron transition-colors flex items-center justify-between group py-0.5"
                  >
                    <span className="flex items-center gap-1.5">
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

        {/* GIANT LAYERED / EXTRUDED WORDMARK WITH POINTER DEPTH PARALLAX */}
        <div
          className="relative pt-16 pb-8 overflow-hidden text-center cursor-default"
          style={{ perspective: "1000px" }}
        >
          <div
            className="preserve-3d transition-transform duration-200 ease-out inline-block"
            style={{
              transform: `rotateX(${-wordmarkOffset.y * 0.8}deg) rotateY(${wordmarkOffset.x * 0.8}deg)`,
            }}
          >
            {/* Background Shadow Extrusion Layer */}
            <div
              className="font-serif font-black text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] tracking-tighter leading-none select-none text-warmblack-200/40 absolute inset-0 blur-[1px]"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 1.2}px, ${-wordmarkOffset.y * 1.2}px, -40px)`,
              }}
            >
              SAFFRON PRESS
            </div>

            {/* Mid Extrusion Layer */}
            <div
              className="font-serif font-black text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] tracking-tighter leading-none select-none text-saffron/15 absolute inset-0"
              style={{
                transform: `translate3d(${-wordmarkOffset.x * 0.6}px, ${-wordmarkOffset.y * 0.6}px, -20px)`,
              }}
            >
              SAFFRON PRESS
            </div>

            {/* Foreground Main Wordmark */}
            <div
              className="relative font-serif font-black text-6xl sm:text-8xl md:text-[140px] lg:text-[180px] tracking-tighter leading-none select-none text-paper-100"
              style={{
                transform: "translate3d(0, 0, 10px)",
                textShadow: "0 10px 30px rgba(0,0,0,0.8)",
              }}
            >
              SAFFRON PRESS
            </div>
          </div>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="pt-8 border-t border-warmblack-50/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-paper-400">
          <div>
            &copy; {new Date().getFullYear()} Saffron Press Daily Syndicate. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-saffron flex items-center gap-1">
              <Shield className="w-3 h-3 text-saffron" />
              <span>Editorial Charter</span>
            </Link>
            <span>•</span>
            <Link href="/brand" className="hover:text-saffron flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-saffron" />
              <span>Design Guidelines</span>
            </Link>
            <span>•</span>
            <span className="text-saffron flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>London / Tokyo / NYC Bureaus</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
