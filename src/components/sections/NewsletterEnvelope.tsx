"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Mail,
  Check,
  ShieldCheck,
  ArrowRight,
  Lock,
  Clock,
  RotateCcw,
  CheckCircle2,
  FileText,
  Dumbbell,
  Compass,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DEMO_NEWSLETTER_STORAGE_KEY = "movimento_newsletter_demo";

export function NewsletterEnvelope() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const envelopeFlapRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const waxSealRef = useRef<HTMLDivElement>(null);

  const [isClosed, setIsClosed] = useState(false);
  const [email, setEmail] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<"atividades" | "iniciacao" | "habitos">("atividades");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Load existing demo subscription from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(DEMO_NEWSLETTER_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email) {
          setEmail(parsed.email);
          setIsSubscribed(true);
        }
      }
    } catch {}
  }, []);

  /**
   * Pure mathematical function to apply envelope state based on a 0..1 progress
   */
  const applyEnvelopeProgress = useCallback((prog: number) => {
    setScrollProgress(prog);

    if (letterRef.current) {
      const letterProg = Math.min(1, prog / 0.5);
      const letterY = -150 + letterProg * 185;
      gsap.set(letterRef.current, {
        y: letterY,
        scale: 1 - letterProg * 0.03,
      });
    }

    if (envelopeFlapRef.current) {
      if (prog <= 0.45) {
        gsap.set(envelopeFlapRef.current, {
          rotateX: -180,
          zIndex: 5,
        });
      } else {
        const flapProg = Math.min(1, (prog - 0.45) / 0.45);
        const flapAngle = -180 + flapProg * 180;
        gsap.set(envelopeFlapRef.current, {
          rotateX: flapAngle,
          zIndex: flapAngle > -90 ? 35 : 5,
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
      setErrorMsg("Por favor, informe um endereço de e-mail válido.");
      return;
    }
    setErrorMsg("");
    setIsSubscribed(true);

    // Save demo subscription in browser localStorage only
    try {
      localStorage.setItem(
        DEMO_NEWSLETTER_STORAGE_KEY,
        JSON.stringify({ email, topic: selectedTopic, subscribedAt: new Date().toISOString() })
      );
    } catch {}

    // Smoothly close the envelope
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
      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_40%,#0E9F6E_0%,transparent_65%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header: Clearly labeled as demo */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono uppercase tracking-widest font-bold border border-emerald-500/30 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-emerald-500" />
            <span>08 / BOLETIM SEMANAL (DEMONSTRAÇÃO)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-black text-foreground tracking-tight">
            Boletim Movimento na Rotina
          </h2>
          <p className="text-sm font-sans text-muted-foreground leading-relaxed max-w-xl mx-auto">
            (Edição de Demonstração) Toda segunda-feira às 07:00, receba rotinas de 15 minutos, dicas de ergonomia e estratégias seguras para se movimentar mais.
          </p>
        </div>

        {/* 2-Column Editorial Layout */}
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
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-serif font-black text-base shadow-sm">
                    MR
                  </div>
                  <div>
                    <h3 className="font-serif font-black text-lg text-foreground tracking-tight leading-tight">
                      Edição Demonstrativa
                    </h3>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">
                      Enviada toda segunda-feira • 07:00 BRT
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-paper-200 dark:bg-warmblack-200 text-muted-foreground border border-paper-300 dark:border-warmblack-100 font-semibold">
                    Simulação Demo
                  </span>
                </div>
              </div>

              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="font-serif text-sm sm:text-base text-foreground leading-snug">
                    Junte-se a leitores brasileiros que buscam consistência diária e saúde prática sem radicalismos.
                  </p>

                  {/* Frequency / Topic Selector Chips */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedTopic("atividades")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "atividades"
                          ? "bg-emerald-600 text-white font-bold border-emerald-600 shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <Dumbbell className="w-3 h-3" /> Atividades
                      </span>
                      <span className="text-[9px] opacity-80">Casa & Academia</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTopic("iniciacao")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "iniciacao"
                          ? "bg-emerald-600 text-white font-bold border-emerald-600 shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <Compass className="w-3 h-3" /> Iniciação
                      </span>
                      <span className="text-[9px] opacity-80">Planejamento</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTopic("habitos")}
                      className={cn(
                        "p-2.5 rounded-2xl text-left border text-xs font-mono transition-all flex flex-col gap-1",
                        selectedTopic === "habitos"
                          ? "bg-emerald-600 text-white font-bold border-emerald-600 shadow-md"
                          : "bg-paper-100 dark:bg-warmblack-200 text-muted-foreground border-paper-300 dark:border-warmblack-100 hover:text-foreground"
                      )}
                    >
                      <span className="flex items-center gap-1.5 text-[10px] uppercase font-bold">
                        <HeartPulse className="w-3 h-3" /> Hábitos
                      </span>
                      <span className="text-[9px] opacity-80">Segurança</span>
                    </button>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <div className="relative flex items-center group">
                      <div className="absolute left-3.5 pointer-events-none text-muted-foreground group-focus-within:text-emerald-500 transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu.email@exemplo.com.br"
                        className="w-full pl-10 pr-36 py-3.5 rounded-2xl bg-paper-100 dark:bg-warmblack-900 border border-paper-300 dark:border-warmblack-100 text-sm font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-inner transition-all"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 active:scale-95 transition-all shadow-md flex items-center gap-1.5"
                      >
                        <span>Cadastrar (Demo)</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    {errorMsg && (
                      <p className="text-xs font-mono text-red-500 pl-1">{errorMsg}</p>
                    )}
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-wrap items-center justify-between text-[10px] font-mono text-muted-foreground pt-3 border-t border-paper-300/60 dark:border-warmblack-100/60 gap-2">
                    <span className="flex items-center gap-1 text-foreground/80">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Salvo localmente (Demo)
                    </span>
                    <span className="flex items-center gap-1 text-foreground/80">
                      <Lock className="w-3.5 h-3.5 text-emerald-500" /> Zero Spam
                    </span>
                    <span className="flex items-center gap-1 text-foreground/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Gratuito
                    </span>
                  </div>
                </form>
              ) : (
                /* Subscribed Success State */
                <div className="py-8 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-foreground">
                      Inscrição de Demonstração Confirmada!
                    </h4>
                    <p className="text-xs font-sans text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
                      Seu e-mail <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">{email}</span> foi registrado no seu navegador. O envelope 3D foi lacrado com sucesso.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsSubscribed(false);
                        setEmail("");
                        try {
                          localStorage.removeItem(DEMO_NEWSLETTER_STORAGE_KEY);
                        } catch {}
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-paper-200 dark:bg-warmblack-200 text-muted-foreground text-xs font-mono hover:text-foreground"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Limpar cadastro demo</span>
                    </button>
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
                    isClosed ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                  )}
                />
                <span className="text-muted-foreground">
                  Status:{" "}
                  <strong className="text-foreground">
                    {isClosed ? "Envelope Lacrado" : "Carta Aberta para Leitura"}
                  </strong>
                </span>
              </div>
              <button
                type="button"
                onClick={toggleEnvelopeState}
                className="px-3.5 py-1.5 rounded-xl bg-warmblack-100 hover:bg-emerald-600 hover:text-white border border-warmblack-50 text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 flex items-center gap-1.5 text-paper-200"
              >
                <RotateCcw className="w-3 h-3" />
                <span>{isClosed ? "Abrir Carta" : "Fechar Envelope"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: 3D ENVELOPE THEATRE */}
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
                {/* 1. BACK PLATE */}
                <div className="absolute inset-0 rounded-3xl bg-[#0F1B17] border border-emerald-500/30 shadow-2xl overflow-hidden z-0">
                  <div className="absolute inset-2 rounded-2xl bg-gradient-to-b from-[#172A24] to-[#0F1B17] border border-emerald-500/15" />
                  <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0E9F6E_1px,transparent_1px)] [background-size:12px_12px]" />
                </div>

                {/* 2. THE LETTER */}
                <div
                  ref={letterRef}
                  className="absolute left-[5%] w-[90%] h-[260px] sm:h-[280px] rounded-2xl bg-[#F4FAF7] dark:bg-[#13221D] border border-paper-300 dark:border-warmblack-50 p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.35)] z-10 space-y-3 transition-shadow"
                  style={{
                    transform: "translateY(-150px)",
                    willChange: "transform",
                  }}
                >
                  {/* Letter Fine Print Masthead */}
                  <div className="flex items-center justify-between pb-2.5 border-b border-paper-300 dark:border-warmblack-100">
                    <div>
                      <span className="font-serif font-black text-sm text-foreground tracking-tight block">
                        BOLETIM MOVIMENTO NA ROTINA
                      </span>
                      <span className="text-[9px] font-mono tracking-widest uppercase text-emerald-600 dark:text-emerald-400 font-bold">
                        EDIÇÃO DE DEMONSTRAÇÃO
                      </span>
                    </div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/30">
                      07:00 BRT
                    </span>
                  </div>

                  {/* Letter Editorial Excerpt Preview */}
                  <div className="space-y-2 pt-1 text-left">
                    <h5 className="font-serif font-black text-sm text-foreground leading-snug">
                      Diretrizes para Mover o Corpo sem Sobrecarga
                    </h5>
                    <p className="font-sans text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                      Uma síntese semanal de rotinas práticas para fazer em casa ou na academia, dicas de ergonomia postural e hábitos sustentáveis para a vida real.
                    </p>
                  </div>

                  {/* Letter Sign-off */}
                  <div className="pt-2 border-t border-paper-300/70 dark:border-warmblack-100/70 flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                    <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                      <FileText className="w-3 h-3" /> Guia Verificado
                    </span>
                    <span className="italic font-serif text-foreground/80">
                      Conselho Editorial
                    </span>
                  </div>
                </div>

                {/* 3. FRONT POCKET */}
                <div className="absolute inset-x-0 bottom-0 h-[210px] sm:h-[225px] rounded-b-3xl bg-[#0F1B17] border-x border-b border-emerald-500/30 shadow-[0_20px_45px_rgba(0,0,0,0.6)] z-20 overflow-hidden pointer-events-none">
                  {/* Emerald Saddle Stitch Border */}
                  <div className="absolute inset-2 rounded-2xl border border-dashed border-emerald-500/25 pointer-events-none" />

                  {/* Triangular Pocket Neckline Creases */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line x1="0" y1="100%" x2="50%" y2="30%" stroke="#0E9F6E" strokeWidth="1.5" />
                    <line x1="100%" y1="100%" x2="50%" y2="30%" stroke="#0E9F6E" strokeWidth="1.5" />
                  </svg>

                  {/* Front Pocket Inscription */}
                  <div className="absolute bottom-4 inset-x-0 text-center">
                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-paper-300 font-bold block">
                      MOVIMENTO NA ROTINA • DEMONSTRAÇÃO
                    </span>
                    <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest mt-0.5 block">
                      BOLETIM DIGITAL DO MOVIMENTO • EST. 2026
                    </span>
                  </div>
                </div>

                {/* 4. THE 3D ROTATING ENVELOPE FLAP */}
                <div
                  ref={envelopeFlapRef}
                  className="absolute top-0 inset-x-0 h-[155px] sm:h-[165px] preserve-3d will-change-transform cursor-pointer"
                  style={{
                    transformOrigin: "top center",
                    transformStyle: "preserve-3d",
                    transform: "rotateX(-180deg)",
                    zIndex: 5,
                  }}
                  onClick={toggleEnvelopeState}
                  title={isClosed ? "Clique para abrir a carta" : "Clique para lacrar o envelope"}
                >
                  <div
                    className="w-full h-full bg-[#13221D] border-t border-emerald-500/40 shadow-2xl relative"
                    style={{
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 via-emerald-500/5 to-transparent pointer-events-none" />

                    {/* Edge border */}
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <polyline
                        points="0,0 50%,100% 100%,0"
                        fill="none"
                        stroke="#0E9F6E"
                        strokeWidth="1.5"
                      />
                    </svg>

                    {/* 5. WAX SEAL EMBLEM */}
                    <div
                      ref={waxSealRef}
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-emerald-600 text-white font-serif font-black flex items-center justify-center shadow-[0_4px_16px_rgba(14,159,110,0.5)] border-2 border-emerald-400 transition-transform"
                    >
                      <span className="text-xs tracking-wider font-bold">MR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Cue Indicator */}
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mt-4">
              <Clock className="w-3.5 h-3.5 text-emerald-500" />
              <span>Role para baixo para lacrar • Role para cima para abrir</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
