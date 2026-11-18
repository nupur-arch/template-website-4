"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Radio,
  Activity,
  Globe,
  ShieldCheck,
  Zap,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  RefreshCw,
} from "lucide-react";
import { LiveStat, SplitFlapItem } from "@/types/article";
import { cn } from "@/lib/utils";

interface LiveStatsSplitFlapProps {
  stats: LiveStat[];
  flapItems: SplitFlapItem[];
}

export function LiveStatsSplitFlap({ stats, flapItems }: LiveStatsSplitFlapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0));
  const [activeFlapIdx, setActiveFlapIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFlapIdx((prev) => (prev + 1) % flapItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [flapItems.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top 75%",
        once: true,
        onEnter: () => {
          stats.forEach((stat, i) => {
            const target = stat.value;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 2.2,
              ease: "power2.out",
              onUpdate: () => {
                setAnimatedValues((prev) => {
                  const copy = [...prev];
                  copy[i] = stat.value % 1 !== 0 ? Number(obj.val.toFixed(2)) : Math.round(obj.val);
                  return copy;
                });
              },
            });
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [stats]);

  return (
    <section
      ref={containerRef}
      id="live-stats"
      className="py-20 sm:py-28 bg-warmblack text-paper-50 border-b border-paper-300/30 dark:border-warmblack-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-warmblack-50/70">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-saffron animate-pulse" />
                07 / SOLARI SPLIT-FLAP TERMINAL
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span className="text-xs font-mono text-paper-400 uppercase flex items-center gap-1">
                <Zap className="w-3 h-3 text-saffron" /> Synchronized Telemetry
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black text-white tracking-tight">
              Live Wire & Index Metrics
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-paper-300 bg-warmblack-100 px-3 py-1.5 rounded-full border border-warmblack-50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3 text-saffron" /> 4.5S SYNC
            </span>
          </div>
        </div>

        {/* Airport Split-Flap Board */}
        <div className="mb-16 rounded-3xl bg-[#0F0C09] border border-saffron/30 p-4 sm:p-8 shadow-2xl overflow-hidden">
          {/* Board Masthead */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-warmblack-50 text-[11px] font-mono uppercase tracking-widest text-paper-400">
            <div className="flex items-center gap-3">
              <span className="text-saffron font-bold flex items-center gap-1">
                <Radio className="w-3.5 h-3.5" /> SOLARI DI UDINE METRIC 900
              </span>
              <span className="hidden sm:inline text-warmblack-50">/</span>
              <span className="hidden sm:inline">SAFFRON TELETYPE FEED</span>
            </div>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-saffron" /> GLOBAL WIRE
            </span>
          </div>

          {/* Departure Rows */}
          <div className="space-y-3 font-mono">
            {flapItems.map((item, idx) => {
              const isActive = idx === activeFlapIdx;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "relative flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-all duration-500",
                    isActive
                      ? "bg-warmblack-200/90 border-saffron/60 shadow-lg scale-[1.01]"
                      : "bg-warmblack-100/50 border-warmblack-50/50 opacity-60"
                  )}
                >
                  {/* Left Column: Time & Category */}
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="px-2 py-0.5 rounded bg-black text-saffron text-xs font-bold border border-warmblack-50 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.time}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-warmblack-50 text-paper-300 text-[10px] font-bold tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  {/* Center Column: Split-Flap Styled Headline */}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold tracking-wider text-paper-50 truncate">
                      {item.headline.split("").map((char, cIdx) => (
                        <span
                          key={cIdx}
                          className={cn(
                            "inline-block border-r border-black/40 px-0.5 relative transition-transform duration-300",
                            isActive && "text-saffron"
                          )}
                          style={{
                            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 1px 0 rgba(0,0,0,0.8)",
                          }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Status Tag with Icon */}
                  <div className="shrink-0 flex items-center gap-2">
                    <span
                      className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1",
                        item.status === "BREAKING"
                          ? "bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse"
                          : item.status === "CONFIRMED"
                          ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          : "bg-saffron/20 text-saffron border border-saffron/30"
                      )}
                    >
                      {item.status === "BREAKING" && <AlertTriangle className="w-3 h-3" />}
                      {item.status === "CONFIRMED" && <CheckCircle2 className="w-3 h-3" />}
                      {item.status === "DISPATCHED" && <Send className="w-3 h-3" />}
                      {item.status === "UPDATING" && <RefreshCw className="w-3 h-3" />}
                      <span>{item.status}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Count-Up Stats Grid with Icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={stat.id}
              className="p-6 rounded-3xl bg-warmblack-100 border border-warmblack-50 hover:border-saffron/40 transition-colors shadow-md space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-paper-400">
                <span className="flex items-center gap-1.5">
                  {i === 0 && <Globe className="w-3.5 h-3.5 text-saffron" />}
                  {i === 1 && <Zap className="w-3.5 h-3.5 text-saffron" />}
                  {i === 2 && <Radio className="w-3.5 h-3.5 text-saffron" />}
                  {i === 3 && <ShieldCheck className="w-3.5 h-3.5 text-saffron" />}
                  <span>{stat.label}</span>
                </span>
                <span className="text-saffron font-bold">{stat.trend}</span>
              </div>

              {/* Animated Count-up value */}
              <div className="font-serif font-black text-4xl sm:text-5xl text-white tracking-tight flex items-baseline gap-1">
                {stat.prefix && <span className="text-saffron text-3xl">{stat.prefix}</span>}
                <span>{animatedValues[i]?.toLocaleString()}</span>
                {stat.suffix && <span className="text-saffron text-2xl font-mono">{stat.suffix}</span>}
              </div>

              <p className="text-xs font-sans text-paper-400 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
