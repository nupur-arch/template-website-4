"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Check,
  Send,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Lock,
  Clock,
  Radio,
  Zap,
  BookOpen,
  Cpu,
  Fingerprint,
  RotateCcw,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function NewsletterEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const envelopeFlapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);

  const [isClosed, setIsClosed] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<"daily" | "weekend" | "tech">("daily");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  /**
   * Pure mathematical function to apply envelope state based on a 0..1 progress:
   * 0.0 -> Envelope fully open, letter elevated high above envelope
   * 0.0 to 0.5 -> Letter slides smoothly DOWN into the envelope pocket
   * 0.5 to 0.95 -> Top flap smoothly rotates from -180deg (open) down to 0deg (closed)
   * 0.95 to 1.0 -> Wax seal shines / locks in place
   */
  const applyEnvelopeProgress = useCallback((prog: number) => {
    setScrollProgress(prog);

    if (letterRef.current) {
      // Letter starts at -150px (elevated) and glides down to 35px (inside the pocket)
      const letterProg = Math.min(1, prog / 0.5);
      const letterY = -150 + letterProg * 185; // from -150 to +35
      gsap.set(letterRef.current, {
        y: letterY,
        scale: 1 - letterProg * 0.03,
      });
    }

    if (envelopeFlapRef.current) {
      if (prog <= 0.45) {
        // Flap stays folded all the way back (-180deg) while letter is out
        gsap.set(envelopeFlapRef.current, {
          rotateX: -180,
          zIndex: 5,
        });
      } else {
        // Flap smoothly folds down from -180deg to 0deg
        const flapProg = Math.min(1, (prog - 0.45) / 0.45);
        const flapAngle = -180 + flapProg * 180; // from -180 to 0
        gsap.set(envelopeFlapRef.current, {
          rotateX: flapAngle,
          zIndex: flapAngle > -90 ? 35 : 5, // Bring to front as it crosses the halfway point
        });
      }
    }

    if (waxSealRef.current) {
      if (prog >= 0.9) {
        const sealProg = (prog - 0.9) / 0.1;
        gsap.set(waxSealRef.current, {
          scale: 1 + Math.sin(sealProg * Math.PI) * 0.15,
        });
      } else {
        gsap.set(waxSealRef.current, { scale: 1 });
      }
    }

    setIsClosed(prog >= 0.85);
  }, []);

  // Setup scroll-driven animation with ScrollTrigger scrub
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      applyEnvelopeProgress(1);
      return;
    }

    const ctx = gsap.context(() => {
      if (!stageRef.current) return;

      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top 75%",
        end: "bottom 35%",
        scrub: 0.8,
        onUpdate: (self) => {
          applyEnvelopeProgress(self.progress);
        },
      });
    }, stageRef);

    return () => ctx.revert();
  }, [applyEnvelopeProgress]);

  // Interactive toggle to smoothly close or open the envelope on click
  const toggleEnvelopeState = () => {
    const targetProg = isClosed ? 0 : 1;

    gsap.to(
      { p: scrollProgress },
      {
        p: targetProg,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          applyEnvelopeProgress(this.targets()[0].p);
        },
      }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please provide a valid diplomatic dispatch email.");
      return;
    }
    setErrorMsg("");
    setIsSubscribed(true);

    // Smoothly close the envelope when subscribing to seal the dispatch
    gsap.to(
      { p: scrollProgress },
      {
        p: 1,
        duration: 1.2,
        ease: "power2.inOut",
        onUpdate: function () {
          applyEnvelopeProgress(this.targets()[0].p);
        },
      }
    );
  };

  return (
    <section
      ref={containerRef}
      id="newsletter"
      className="py-24 sm:py-36 bg-background border-b border-paper-300 dark:border-warmblack-100 overflow-hidden relative select-none"
    >
      {/* Ambient warm background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_40%,#FFB000_0%,transparent_65%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-saffron/15 text-saffron text-[11px] font-mono uppercase tracking-widest font-bold border border-saffron/30 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-saffron" />
            <span>08 / DIPLOMATIC DISPATCH POUCH</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            The Saffron Broadside
          </h2>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-xl mx-auto">
            A morning confidential folio transmitted directly to diplomats, researchers, and editors. Unadulterated intelligence, zero algorithmic noise.
          </p>
        </div>

        {/* 2-Column Luxury Editorial Layout: Form on Left, 3D Closing Envelope on Right */}
        <div
          ref={stageRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center max-w-6xl mx-auto"
        >
          {/* LEFT COLUMN: Subscription Desk & Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-card border border-paper-300 dark:border-warmblack-50 shadow-xl space-y-6">
              {/* Masthead Header */}
              <div className="flex items-center justify-between pb-4 border-b border-paper-300 dark:border-warmblack-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-saffron/15 border border-saffron/30 flex items-center justify-center text-saffron font-serif font-black text-base shadow-sm">
                    SP
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-lg text-foreground tracking-tight leading-tight">
                      Confidential Wire Folio
                    </h3>
                    <span className="text-[10px] font-mono text-saffron font-bold uppercase tracking-wider block">
                      Transmitted daily at 06:00 UTC
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-paper-200 dark:bg-warmblack-200 text-muted-foreground border border-paper-300 dark:border-warmblack-100 font-semibold">
                    No. 4,892
                  </span>
                </div>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="font-serif text-sm sm:text-base text-foreground leading-snug">
                    Join thirty-two thousand ambassadors, correspondents, and quantitative strategists reading our daily unredacted cable wire.
                  </p>

                  {/* Dispatch Frequency Selector Chips */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTopic("daily")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "daily"
                          ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <Zap className="w-3 h-3" /> Daily Wire
                      </span>
                      <span className="text-[9px] opacity-80">06:00 UTC</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTopic("weekend")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "weekend"
                          ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <BookOpen className="w-3 h-3" /> Long View
                      </span>
                      <span className="text-[9px] opacity-80">Saturday</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTopic("tech")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "tech"
                          ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <Cpu className="w-3 h-3" /> Deep Tech
                      </span>
                      <span className="text-[9px] opacity-80">Bi-Weekly</span>
                    </button>
                  </div>

                  {/* Floating Email Input Capsule */}
                  <div className="space-y-1.5">
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 pointer-events-none text-muted-foreground group-focus-within:text-saffron transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="attaché@chancery.int"
                        className="w-full pl-10 pr-32 py-3.5 rounded-2xl bg-paper-100 dark:bg-warmblack-900 border border-paper-300 dark:border-warmblack-100 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 shadow-inner transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 px-4 py-2 rounded-xl bg-saffron text-warmblack font-mono text-xs font-bold uppercase tracking-wider hover:bg-saffron-400 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Transcribe</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="text-xs font-mono text-red-500 pl-1">{errorMsg}</p>
                    )}
                  </div>

                  {/* Trust Indicators with Icons */}
                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-muted-foreground pt-3 border-t border-paper-300/60 dark:border-warmblack-100/60 gap-2">
                    <span className="flex items-center gap-1 text-foreground/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-saffron" /> Cryptographically Signed
                    </span>
                    <span className="flex items-center gap-1 text-foreground/80">
                      <Lock className="w-3 h-3 text-saffron" /> Zero Trackers
                    </span>
                    <span className="flex items-center gap-1 text-foreground/80">
                      <Fingerprint className="w-3 h-3 text-saffron" /> Instant One-Click Exit
                    </span>
                  </div>
                </form>
              ) : (
                /* Subscribed Success State */
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground">
                      Diplomatic Credential Enrolled
                    </h4>
                    <p className="text-xs font-sans text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
                      Verification wire transmitted to <span className="text-saffron font-mono font-bold">{email}</span>. Tomorrow&apos;s 06:00 UTC unredacted folio is locked in the diplomatic pouch.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-mono border border-emerald-500/30">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Envelope Sealed & Ready for Dispatch
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Envelope Sealer Control Pill */}
            <div className="flex items-center justify-between px-5 py-3 rounded-2xl bg-card/60 border border-paper-300/60 dark:border-warmblack-50/60 text-xs font-mono">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors",
                    isClosed ? "bg-saffron animate-pulse" : "bg-emerald-400"
                  )}
                />
                <span className="text-muted-foreground">
                  Status:{" "}
                  <strong className="text-foreground">
                    {isClosed ? "Pouch Fully Sealed" : "Folio Unsealed & Reading"}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={toggleEnvelopeState}
                className="px-3.5 py-1.5 rounded-xl bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isClosed ? "Open Folio" : "Close Envelope"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D ENVELOPE THEATRE (Letter descends, flap seals fully on scroll) */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* 3D Perspective Stage */}
            <div
              className="relative w-full max-w-[440px] sm:max-w-[480px] h-[480px] flex items-end justify-center perspective-deep pb-4"
              style={{ perspective: "1200px" }}
            >
              {/* ENVELOPE WRAPPER */}
              <div
                className="relative w-full h-[280px] sm:h-[300px] preserve-3d"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 1. BACK PLATE (The back wall of the envelope) */}
                <div className="absolute inset-0 rounded-3xl bg-[#191410] border border-saffron/30 shadow-2xl overflow-hidden z-0">
                  {/* Silk Lining Pattern inside the envelope */}
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-[#251D17] to-[#17120E] border border-saffron/15" />
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FFB000_1px,transparent_1px)] [background-size:12px_12px]" />
                </div>

                {/* 2. THE LETTER (Slides DOWN into the envelope pocket) */}
                <div
                  ref={letterRef}
                  className="absolute left-[5%] w-[90%] h-[260px] sm:h-[280px] rounded-2xl bg-[#FAF7F0] dark:bg-[#1E1813] border border-paper-300 dark:border-warmblack-50 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] z-10 space-y-3 transition-shadow"
                  style={{
                    transform: "translateY(-150px)",
                    willChange: "transform",
                  }}
                >
                  {/* Letter Fine Print Masthead */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-paper-300 dark:border-warmblack-100">
                    <div>
                      <span className="font-serif font-black text-sm text-foreground tracking-tight block">
                        THE SAFFRON BROADSIDE
                      </span>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-saffron font-bold">
                        CONFIDENTIAL DIPLOMATIC FOLIO
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-saffron/15 text-saffron font-bold border border-saffron/30">
                      06:00 UTC
                    </span>
                  </div>

                  {/* Letter Editorial Excerpt Preview */}
                  <div className="space-y-2 pt-1 text-left">
                    <h5 className="font-serif font-black text-sm text-foreground leading-snug">
                      Global Dispatches & Autonomous Treaty Analysis
                    </h5>
                    <p className="font-sans text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      A synthesis of semiconductor sovereign pacts, deep-sea cable corridors, and transpolar navigation treaties compiled for morning intelligence reading.
                    </p>
                  </div>

                  {/* Editorial Seal Stamp & Sign-off on Letter */}
                  <div className="pt-2 border-t border-paper-300/70 dark:border-warmblack-100/70 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1 text-saffron font-semibold">
                      <FileText className="w-3 h-3" /> Certified Dispatches
                    </span>
                    <span className="italic font-serif text-foreground/80">
                      The Editorial Board
                    </span>
                  </div>
                </div>

                {/* 3. FRONT POCKET (Covers the bottom half, hiding the descending letter) */}
                <div className="absolute inset-x-0 bottom-0 h-[210px] sm:h-[225px] rounded-b-3xl bg-[#15110D] border-x border-b border-saffron/30 shadow-[0_20px_45px_rgba(0,0,0,0.6)] z-20 overflow-hidden pointer-events-none">
                  {/* Golden Saddle Stitch Border */}
                  <div className="absolute inset-2 rounded-2xl border border-dashed border-saffron/25 pointer-events-none" />

                  {/* Triangular Pocket Neckline Creases */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="0" y1="100%" x2="50%" y2="30%" stroke="#FFB000" strokeWidth="1.5" />
                    <line x1="100%" y1="100%" x2="50%" y2="30%" stroke="#FFB000" strokeWidth="1.5" />
                  </svg>

                  {/* Front Pocket Debossed Inscription */}
                  <div className="absolute bottom-4 inset-x-0 text-center">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-paper-400 font-bold block">
                      SAFFRON PRESS • DIPLOMATIC POUCH
                    </span>
                    <span className="text-[8px] font-mono text-saffron/70 uppercase tracking-widest mt-0.5 block">
                      OFFICIAL DIPLOMATIC COURIER • EST. 2026
                    </span>
                  </div>
                </div>

                {/* 4. THE 3D ROTATING ENVELOPE FLAP (Hinged exactly at top: 0, folds down to close fully) */}
                <div
                  ref={envelopeFlapRef}
                  className="absolute top-0 inset-x-0 h-[155px] sm:h-[165px] preserve-3d will-change-transform cursor-pointer"
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(-180deg)", // Starts fully open, folded backwards
                    zIndex: 5,
                  }}
                  onClick={toggleEnvelopeState}
                  title={isClosed ? "Click to open folio" : "Click to seal envelope"}
                >
                  {/* The Flap Polygon with realistic bevel and golden wax seal */}
                  <div
                    className="w-full h-full bg-[#18130F] border-t border-saffron/40 shadow-2xl relative"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  >
                    {/* Flap gold perimeter stitch line */}
                    <div className="absolute inset-0 bg-gradient-to-b from-saffron/20 via-saffron/5 to-transparent pointer-events-none" />

                    {/* Gold Foil Border along the triangular edges */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline
                        points="0,0 50%,100% 100%,0"
                        fill="none"
                        stroke="#FFB000"
                        strokeWidth="1.5"
                      />
                    </svg>

                    {/* 5. THE SAFFRON WAX SEAL EMBLEM (Rests proudly on the tip when fully closed) */}
                    <div
                      ref={waxSealRef}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-saffron text-warmblack font-serif font-black flex items-center justify-center shadow-[0_4px_16px_rgba(255,176,0,0.5)] border-2 border-saffron-300 transition-transform"
                    >
                      <span className="text-xs tracking-wider font-bold">SP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Under-Envelope Scroll Cue Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-4">
              <Clock className="w-3.5 h-3.5 text-saffron" />
              <span>Scroll down to seal folio • Scroll up to unseal</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
