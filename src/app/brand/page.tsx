"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Copy, Download, RefreshCw, Sparkles } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SignatureStamp } from "@/components/brand/SignatureStamp";

export default function BrandPage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [drawKey, setDrawKey] = useState(0);

  const colors = [
    { name: "Warm Black", hex: "#15110D", role: "Primary dark background, headline ink", dark: true },
    { name: "Saffron Core", hex: "#FFB000", role: "Signature registration mark, active accents", dark: false },
    { name: "Paper White", hex: "#FBF9F5", role: "Tactile newsprint light background", dark: false },
    { name: "Editorial Border", hex: "#E5DFD3", role: "Precision thin rules & bounding lines", dark: false },
    { name: "Night Card", hex: "#1D1813", role: "Dark mode card surface depth", dark: true },
  ];

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div className="min-h-screen py-12 sm:py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-20">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
        </div>

        {/* Brand System Header */}
        <div className="space-y-4 pb-10 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-saffron/15 text-saffron text-xs font-mono uppercase tracking-widest font-bold border border-saffron/30">
              IDENTITY MANUAL NO. 01
            </span>
            <span className="text-xs font-mono text-muted-foreground">Version 2.0</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            The Saffron Press Brand System
          </h1>

          <p className="font-sans text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Constructed for monumental editorial integrity. Rooted in tactile twentieth-century broadsides, precision printing geometry, and high-contrast typographic hierarchy.
          </p>
        </div>

        {/* 1. LOGO IDENTITY CONCEPT & VARIANTS */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
                01 / MASTHEAD & MARK
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
                The Monogram & Masthead
              </h2>
            </div>
            <button
              onClick={() => setDrawKey((k) => k + 1)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-paper-200 dark:bg-warmblack-200 hover:bg-saffron hover:text-warmblack transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Replay Draw-In
            </button>
          </div>

          <p className="text-sm font-sans text-muted-foreground max-w-2xl">
            Concept: <strong>The Press Column & Folded Broadside Corner</strong>. A pure vector polygon representing the folded corner of a broadside newspaper merged with editorial column lines, accented with a 45-degree saffron registration diamond.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Full Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Variant: Full Masthead
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`full-${drawKey}`} variant="full" size={44} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Primary horizontal lockup for navigation bars & official headers.
              </div>
            </div>

            {/* Mark Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Variant: Monogram Mark
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`mark-${drawKey}`} variant="mark" size={64} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Standalone icon for favicons, stamps, and telemetry avatars.
              </div>
            </div>

            {/* Stacked Variant */}
            <div className="p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 shadow-md flex flex-col justify-between space-y-8">
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                Variant: Stacked Monolith
              </div>
              <div className="py-6 flex items-center justify-center">
                <Logo key={`stacked-${drawKey}`} variant="stacked" size={48} animate />
              </div>
              <div className="text-xs font-mono text-muted-foreground pt-4 border-t border-paper-200 dark:border-warmblack-100">
                Vertical ceremonial lockup for title folios & colophons.
              </div>
            </div>
          </div>
        </section>

        {/* 2. COLOR TOKEN PALETTE */}
        <section className="space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
              02 / COLOR TOKENS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Warm Broadside Palette
            </h2>
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
            <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
              03 / SIGNATURE MOTIF
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Circular Teletype Stamp
            </h2>
          </div>

          <p className="text-sm font-sans text-muted-foreground max-w-2xl">
            A rotating circular-text stamp: <code>&quot;LIVE • 20 STORIES • SAFFRON PRESS • EST. 2026 •&quot;</code>. Reused in the Hero masthead and footer extrusion to signify real-time authenticated dispatches.
          </p>

          <div className="p-10 rounded-3xl bg-paper-100/60 dark:bg-warmblack-200/50 border border-paper-300 dark:border-warmblack-100 flex flex-wrap items-center justify-around gap-8">
            <div className="text-center space-y-3">
              <SignatureStamp size={90} centerText="01/20" />
              <div className="text-xs font-mono text-muted-foreground">Hero Scale (90px)</div>
            </div>

            <div className="text-center space-y-3">
              <SignatureStamp size={120} centerText="24/7" />
              <div className="text-xs font-mono text-muted-foreground">Colophon Scale (120px)</div>
            </div>

            <div className="text-center space-y-3">
              <SignatureStamp size={150} centerText="VERIFIED" text="AUTONOMOUS TELEMETRY • RECORD DISPATCH • " />
              <div className="text-xs font-mono text-muted-foreground">Broadside Seal (150px)</div>
            </div>
          </div>
        </section>

        {/* 4. TYPOGRAPHY MATRIX */}
        <section className="space-y-8 pb-12 border-b border-paper-300 dark:border-warmblack-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
              04 / TYPOGRAPHY MATRIX
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-foreground">
              Editorial Type Trio
            </h2>
          </div>

          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-saffron">
                Headlines & Editorial Titles
              </span>
              <div className="font-serif text-3xl sm:text-5xl font-black text-foreground mt-2">
                Playfair Display — The Monolithic Voice
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Tight letter-spacing, deep italic swashes, uncompromising editorial authority.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-saffron">
                Body & Structural Interface
              </span>
              <div className="font-sans text-xl sm:text-2xl font-semibold text-foreground mt-2">
                Plus Jakarta Sans — Geometric Clarity & High Readability
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Optimized for multi-device readability across 320px to 1440px displays.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-paper-300 dark:border-warmblack-100">
              <span className="text-xs font-mono uppercase tracking-widest text-saffron">
                Telemetry, Stamps, Numbered Folios
              </span>
              <div className="font-mono text-lg sm:text-xl font-bold text-foreground mt-2">
                Space Mono — 14:52:00 UTC • [DOC_REF_#4892]
              </div>
              <p className="text-xs font-mono text-muted-foreground mt-2">
                Fixed-width characters driving the Solari split-flap departure board and timestamps.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
