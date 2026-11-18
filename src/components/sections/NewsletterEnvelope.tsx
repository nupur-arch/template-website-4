"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Check, Send, Sparkles, Shield, ArrowRight } from "lucide-react";
import { SignatureStamp } from "@/components/brand/SignatureStamp";
import { cn } from "@/lib/utils";

export function NewsletterEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const envelopeFlapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsOpen(true);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 65%",
        once: true,
        onEnter: () => {
          setIsOpen(true);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Animate flap and letter whenever isOpen changes
  useEffect(() => {
    if (!envelopeFlapRef.current || !letterRef.current) return;

    if (isOpen) {
      // Step 1: Flap rotates open (rotateX -180deg)
      gsap.to(envelopeFlapRef.current, {
        rotateX: -180,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: () => {
          // Bring flap behind the letter once open
          if (envelopeFlapRef.current) {
            envelopeFlapRef.current.style.zIndex = "0";
          }
        },
      });

      // Step 2: Letter slides out upward
      gsap.to(letterRef.current, {
        y: -140,
        scale: 1,
        duration: 0.9,
        delay: 0.35,
        ease: "power2.out",
      });
    } else {
      gsap.to(letterRef.current, {
        y: 0,
        scale: 0.96,
        duration: 0.6,
        ease: "power2.in",
      });
      gsap.to(envelopeFlapRef.current, {
        rotateX: 0,
        duration: 0.6,
        delay: 0.3,
        ease: "power2.inOut",
        onStart: () => {
          if (envelopeFlapRef.current) {
            envelopeFlapRef.current.style.zIndex = "20";
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
      className="py-24 sm:py-36 bg-background border-b border-paper-300 dark:border-warmblack-100 overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-saffron/15 text-saffron text-xs font-mono uppercase tracking-widest font-bold border border-saffron/30">
            <Mail className="w-3.5 h-3.5" />
            08 / DIPLOMATIC DISPATCH POUCH
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            The Saffron Broadside
          </h2>
          <p className="text-sm font-sans text-muted-foreground">
            A daily morning synthesis delivered directly to your terminal. Uncompromised analysis, zero algorithm feeds.
          </p>
        </div>

        {/* 3D Envelope Container */}
        <div
          className="perspective-deep relative max-w-xl mx-auto h-[480px] sm:h-[520px] flex items-center justify-center select-none"
          style={{ perspective: "1200px" }}
        >
          {/* THE LETTER (Slides out upward) */}
          <div
            ref={letterRef}
            className="absolute z-10 w-[92%] sm:w-[94%] bg-[#FAF8F5] dark:bg-[#201A15] border border-paper-300 dark:border-warmblack-50 rounded-2xl p-6 sm:p-8 shadow-2xl transition-shadow"
            style={{
              transform: "translateY(0px) scale(0.96)",
              willChange: "transform",
            }}
          >
            {/* Letter Masthead */}
            <div className="flex items-center justify-between pb-4 border-b border-paper-300 dark:border-warmblack-100">
              <div>
                <span className="font-serif font-black text-base text-foreground tracking-tight">
                  SAFFRON PRESS
                </span>
                <span className="block text-[9px] font-mono tracking-widest uppercase text-saffron">
                  Morning Confidential Folio
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-saffron/15 text-saffron font-bold">
                NO. 4,892
              </span>
            </div>

            {/* Form & Content */}
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <p className="font-serif text-sm sm:text-base text-foreground leading-snug">
                  Join thirty thousand diplomats, researchers, and engineers receiving our unredacted daily briefing at 06:00 UTC.
                </p>

                <div className="space-y-2">
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="diplomat@consulate.int"
                      className="w-full px-4 py-3 rounded-xl bg-paper-100 dark:bg-warmblack-900 border border-paper-300 dark:border-warmblack-100 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-saffron"
                    />
                    <button
                      type="submit"
                      className="absolute right-1.5 px-4 py-2 rounded-lg bg-saffron text-warmblack font-mono text-xs font-bold uppercase tracking-wider hover:bg-saffron-400 transition-colors flex items-center gap-1.5"
                    >
                      Subscribe <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {errorMsg && (
                    <p className="text-xs font-mono text-red-500">{errorMsg}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-2">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3 text-saffron" /> Cryptographically Sealed
                  </span>
                  <span>Instant Unsubscribe</span>
                </div>
              </form>
            ) : (
              <div className="py-6 text-center space-y-3 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-serif text-lg font-bold text-foreground">
                  Credentials Verified
                </h4>
                <p className="text-xs font-sans text-muted-foreground max-w-xs mx-auto">
                  A verification dispatch has been transmitted to <span className="text-saffron font-mono">{email}</span>. Tomorrow&apos;s 06:00 UTC folio is booked.
                </p>
              </div>
            )}
          </div>

          {/* THE ENVELOPE BODY */}
          <div className="absolute inset-x-0 bottom-0 h-[280px] sm:h-[300px] z-20 rounded-3xl bg-[#ECE5D8] dark:bg-[#18130F] border border-paper-400 dark:border-warmblack-50 shadow-2xl overflow-hidden">
            {/* Envelope Paper Creases */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="0" y1="100%" x2="50%" y2="40%" stroke="currentColor" strokeWidth="1" />
              <line x1="100%" y1="100%" x2="50%" y2="40%" stroke="currentColor" strokeWidth="1" />
            </svg>

            {/* Saffron Wax Seal Emblem */}
            <div className="absolute bottom-6 inset-x-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-saffron text-warmblack font-serif font-black flex items-center justify-center shadow-lg border-2 border-saffron-300">
                SP
              </div>
              <span className="text-[9px] font-mono tracking-widest uppercase text-warmblack/60 dark:text-paper-400 mt-2">
                DIPLOMATIC POUCH • EST. 2026
              </span>
            </div>
          </div>

          {/* THE 3D ROTATING FLAP */}
          <div
            ref={envelopeFlapRef}
            className="absolute top-[180px] sm:top-[160px] inset-x-0 h-[140px] z-30 preserve-3d will-change-transform cursor-pointer"
            style={{
              transformOrigin: "top center",
              transformStyle: "preserve-3d",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* Triangular Flap */}
            <div
              className="w-full h-full bg-[#E5DDCB] dark:bg-[#1C1612] border-t border-paper-400 dark:border-warmblack-50 shadow-md"
              style={{
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
