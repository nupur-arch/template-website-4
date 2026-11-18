import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Globe, Lock, Award, FileCheck } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { MOCK_AUTHORS } from "@/mocks/articles";
import { Logo } from "@/components/brand/Logo";

export const metadata: Metadata = {
  title: "About Saffron Press | Editorial Charter & Standards",
  description:
    "An uncompromised international daily journal delivering investigative reporting, cultural analysis, and technological forecasts.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 sm:py-20 bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Back Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Masthead
          </Link>
        </div>

        {/* Masthead Header */}
        <div className="space-y-4 pb-10 border-b border-paper-300 dark:border-warmblack-100">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-saffron/15 text-saffron text-xs font-mono uppercase tracking-widest font-bold border border-saffron/30">
              EDITORIAL CHARTER
            </span>
            <span className="text-xs font-mono text-muted-foreground">Est. 2026</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-black text-foreground tracking-tight">
            Independent Dispatches. Uncompromised Depth.
          </h1>

          <p className="font-serif italic text-lg sm:text-2xl text-muted-foreground leading-relaxed">
            &quot;In an age of endless vertical scrolls designed for distraction, Saffron Press stands for finite, rigorous, and beautifully crafted chronicles of record.&quot;
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
            <Shield className="w-6 h-6 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-foreground">
              Sovereign Neutrality
            </h3>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              We accept no corporate syndication deals or state subsidies that restrict open disclosure. Every dispatch is corroborated across multiple independent sources.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
            <Lock className="w-6 h-6 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-foreground">
              Cryptographic Provenance
            </h3>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              All published text, photographic evidence, and dataset tables are hashed with verifiable SHA-256 signatures to guarantee tampering cannot occur.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-100 space-y-3">
            <Globe className="w-6 h-6 text-saffron" />
            <h3 className="font-serif font-bold text-lg text-foreground">
              Polycentric Perspective
            </h3>
            <p className="text-xs font-sans text-muted-foreground leading-relaxed">
              Our 28 bureaus span Geneva, Reykjavik, Tokyo, Singapore, and Nairobi, ensuring stories are covered from the ground rather than through secondary echo chambers.
            </p>
          </div>
        </div>

        {/* Masthead Staff */}
        <section id="masthead" className="space-y-8 pt-8 border-t border-paper-300 dark:border-warmblack-100">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-saffron font-bold">
              EDITORIAL BOARD
            </span>
            <h2 className="font-serif text-3xl font-black text-foreground mt-1">
              Bureau Chiefs & Correspondents
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
                  <p className="text-xs font-mono text-saffron">{author.title}</p>
                  <p className="text-xs font-sans text-muted-foreground mt-2 leading-relaxed">
                    {author.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Whistleblower Drop */}
        <section id="contact" className="p-8 sm:p-10 rounded-3xl bg-warmblack text-paper-50 border border-saffron/40 space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-saffron font-bold uppercase tracking-widest">
            <Lock className="w-4 h-4" /> Secure Whistleblower Terminal
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-black text-white">
            Transmit Confidential Intelligence
          </h3>
          <p className="text-xs sm:text-sm text-paper-300 max-w-2xl leading-relaxed">
            If you possess internal documentation, telemetry recordings, or treaty drafts concerning public interest matters, contact our cryptographic intake wire via Signal at <code className="text-saffron">press.saffron</code> or send encrypted PGP bundles to our Zurich desk.
          </p>
        </section>
      </div>
    </div>
  );
}
