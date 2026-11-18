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
} from "lucide-react";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { cn } from "@/lib/utils";

export function NewsletterEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const envelopeFlapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<"daily" | "weekend" | "tech">("daily");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // 3D Pointer tilt on the folio
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setTilt({
      rx: -y * 8,
      ry: x * 10,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsOpen(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 70%",
        once: true,
        onEnter: () => {
          setIsOpen(true);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate flap and dispatch sheet smoothly whenever isOpen changes
  useEffect(() => {
    if (!envelopeFlapRef.current || !letterRef.current) return;

    if (isOpen) {
      // Step 1: Flap rotates open backwards in 3D
      gsap.to(envelopeFlapRef.current, {
        rotateX: -145,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: () => {
          if (envelopeFlapRef.current) {
            envelopeFlapRef.current.style.zIndex = "5";
          }
        },
      });

      // Step 2: Letter slides out with smooth spring ease
      gsap.to(letterRef.current, {
        y: -150,
        scale: 1,
        duration: 1.0,
        delay: 0.3,
        ease: "power3.out",
      });
    } else {
      // Fold back into pouch
      gsap.to(letterRef.current, {
        y: 0,
        scale: 0.95,
        duration: 0.7,
        ease: "power2.in",
      });
      gsap.to(envelopeFlapRef.current, {
        rotateX: 0,
        duration: 0.7,
        delay: 0.25,
        ease: "power2.inOut",
        onStart: () => {
          if (envelopeFlapRef.current) {
            envelopeFlapRef.current.style.zIndex = "25";
          }
        },
      });
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMsg("Please provide a valid dispatch email address.");
      return;
    }
    setErrorMsg("");
    setIsSubscribed(true);
  };

  return (
    <section
      ref={containerRef}
      id="newsletter"
      className="py-24 sm:py-36 bg-background border-b border-paper-300 dark:border-warmblack-100 overflow-hidden relative select-none"
    >
      {/* Ambient background illumination */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_40%,#FFB000_0%,transparent_65%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-saffron text-[11px] font-mono uppercase tracking-widest font-bold border border-saffron/30 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-saffron" />
            <span>08 / DIPLOMATIC DISPATCH POUCH</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            The Saffron Broadside
          </h2>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-lg mx-auto">
            A morning confidential folio transmitted directly to diplomats, researchers, and editors. Unadulterated intelligence, zero algorithmic noise.
          </p>

          {/* Interactive Pouch Status & Toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-paper-200 dark:bg-warmblack-200 hover:bg-saffron hover:text-warmblack border border-paper-300 dark:border-warmblack-50 text-xs font-mono transition-all duration-200 shadow-sm active:scale-95"
            >
              <RotateCcw className="w-3 h-3" />
              <span>{isOpen ? "Reseal Pouch" : "Unseal Folio"}</span>
            </button>
            <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3 text-saffron" /> Transmitted at 06:00 UTC
            </span>
          </div>
        </div>

        {/* 3D Envelope & Dispatch Stage */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="perspective-deep relative max-w-2xl mx-auto h-[540px] sm:h-[580px] flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            perspective: "1400px",
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
        >
          {/* THE DISPATCH SHEET / LETTER (Glides upward in 3D) */}
          <div
            ref={letterRef}
            className="absolute z-10 w-[92%] sm:w-[94%] bg-[#FAF7F0] dark:bg-[#1E1813] border border-paper-300/80 dark:border-warmblack-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-shadow duration-300 select-text"
            style={{
              transform: "translateY(0px) scale(0.95)",
              willChange: "transform",
            }}
          >
            {/* Parchment Fine Header */}
            <div className="flex items-center justify-between pb-4 border-b border-paper-300 dark:border-warmblack-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-saffron/20 border border-saffron/40 flex items-center justify-center text-saffron font-serif font-black text-xs">
                  SP
                </div>
                <div>
                  <span className="font-serif font-black text-base text-foreground tracking-tight block">
                    THE SAFFRON BROADSIDE
                  </span>
                  <span className="block text-[9px] font-mono tracking-widest uppercase text-saffron font-bold">
                    CONFIDENTIAL MORNING DISPATCH
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-saffron/15 text-saffron font-bold border border-saffron/30">
                  FOLIO NO. 4,892
                </span>
                <span className="block text-[9px] font-mono text-muted-foreground mt-1">
                  EDITION 2026.11
                </span>
              </div>
            </div>

            {/* Folio Body & Interactive Form */}
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <p className="font-serif text-sm sm:text-base text-foreground leading-snug">
                  Join thirty-two thousand ambassadors, correspondents, and quantitative strategists reading our daily unredacted cable wire.
                </p>

                {/* Dispatch Frequency Selector Chips (Icon-First) */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedTopic("daily")}
                    className={cn(
                      "p-2 rounded-xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                      selectedTopic === "daily"
                        ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                        : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold">
                      <Zap className="w-3 h-3" /> Daily Wire
                    </span>
                    <span className="text-[9px] opacity-80">06:00 UTC</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTopic("weekend")}
                    className={cn(
                      "p-2 rounded-xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                      selectedTopic === "weekend"
                        ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                        : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold">
                      <BookOpen className="w-3 h-3" /> Long View
                    </span>
                    <span className="text-[9px] opacity-80">Saturday 7am</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTopic("tech")}
                    className={cn(
                      "p-2 rounded-xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                      selectedTopic === "tech"
                        ? "bg-saffron text-warmblack font-bold border-saffron shadow-md"
                        : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                    )}
                  >
                    <span className="flex items-center gap-1 text-[10px] uppercase font-bold">
                      <Cpu className="w-3 h-3" /> Deep Tech
                    </span>
                    <span className="text-[9px] opacity-80">Bi-Weekly</span>
                  </button>
                </div>

                {/* Email Input Capsule (Pinterest Floating Aesthetic) */}
                <div className="space-y-1.5 pt-1">
                  <div className="relative flex items-center group">
                    <div className="absolute left-3.5 pointer-events-none text-muted-foreground group-focus-within:text-saffron transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="attaché@chancery.int"
                      className="w-full pl-10 pr-28 py-3 rounded-2xl bg-paper-100 dark:bg-warmblack-900 border border-paper-300 dark:border-warmblack-100 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 shadow-inner transition-all"
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

                {/* Trust Badges with Icons */}
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2 border-t border-paper-300/60 dark:border-warmblack-100/60">
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
              /* Success State with Verification Seal */
              <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                  <Check className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-serif text-xl font-bold text-foreground">
                    Diplomatic Credential Enrolled
                  </h4>
                  <p className="text-xs font-sans text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
                    Confirmation wire dispatched to <span className="text-saffron font-mono font-bold">{email}</span>. Tomorrow&apos;s 06:00 UTC unredacted edition is locked.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-paper-200 dark:bg-warmblack-200 text-[10px] font-mono text-saffron border border-paper-300 dark:border-warmblack-100">
                    <Radio className="w-3 h-3" /> Secure Channel Active
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* THE ENVELOPE BODY (Luxury Leather & Gold Saddle Stitch) */}
          <div className="absolute inset-x-0 bottom-0 h-[280px] sm:h-[300px] z-20 rounded-3xl bg-warmblack-100 border border-warmblack-50 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-none">
            {/* Golden Saddle Stitching Border */}
            <div className="absolute inset-2 rounded-2xl border border-dashed border-saffron/25 pointer-events-none" />

            {/* Embossed Luxury Paper Grain / Pattern */}
            <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#FFB000_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Front Envelope Pocket Triangular Crease Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="100%" x2="50%" y2="35%" stroke="#FFB000" strokeWidth="1.5" />
              <line x1="100%" y1="100%" x2="50%" y2="35%" stroke="#FFB000" strokeWidth="1.5" />
            </svg>

            {/* Saffron Wax Seal Emblem */}
            <div className="absolute bottom-5 inset-x-0 flex flex-col items-center justify-center">
              <div className="w-13 h-13 rounded-full bg-saffron text-warmblack font-serif font-black flex items-center justify-center shadow-[0_8px_20px_rgba(255,176,0,0.4)] border-2 border-saffron-300 scale-105">
                <span className="text-sm tracking-wider">SP</span>
              </div>
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-paper-400 mt-2 font-bold">
                SAFFRON PRESS • DIPLOMATIC SEAL
              </span>
            </div>
          </div>

          {/* THE 3D ROTATING ENVELOPE FLAP */}
          <div
            ref={envelopeFlapRef}
            className="absolute top-[175px] sm:top-[160px] inset-x-0 h-[140px] z-25 preserve-3d will-change-transform cursor-pointer"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
            onClick={() => setIsOpen(!isOpen)}
            title={isOpen ? "Click to fold envelope" : "Click to unseal envelope"}
          >
            {/* Realistic Triangular Flap */}
            <div
              className="w-full h-full bg-warmblack-200 border-t border-saffron/30 shadow-2xl relative"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            >
              {/* Flap gold perimeter stitch */}
              <div className="absolute inset-0 bg-gradient-to-b from-saffron/15 to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-saffron/20 border border-saffron/40 flex items-center justify-center text-saffron text-[10px] font-mono font-bold shadow-sm">
                SP
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
