"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AlertCircle, ChevronUp, ChevronDown, Flame, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreakingBarProps {
  headlines: string[];
}

export function BreakingBar({ headlines }: BreakingBarProps) {
  const items = headlines.length > 0 ? headlines : [
    "GLOBAL DISPATCH: Strait of Malacca quantum radar corridor becomes fully operational.",
    "DEEP TECH: European photonic wafer achieves 100 terabit optical interconnect speeds.",
    "MARKETS: Project Amber Bridge clears first $10B multi-currency atomic swap in 380ms.",
    "CLIMATE: Atacama Basin direct lithium extraction accord signed with zero evaporation.",
  ];

  const totalFaces = items.length;
  const faceHeight = 54; // px
  // Cylinder radius for regular polygon
  const anglePerFace = 360 / totalFaces;
  const radius = Math.round(faceHeight / (2 * Math.tan(Math.PI / totalFaces)));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rotationDeg = activeIndex * -anglePerFace;

  // Auto-advance rotation every 4 seconds unless paused
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalFaces);
    }, 4200);
    return () => clearInterval(timer);
  }, [isPaused, totalFaces]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalFaces) % totalFaces);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalFaces);
  };

  return (
    <section
      id="breaking"
      className="relative z-20 w-full bg-warmblack text-paper-100 border-y border-paper-300/40 dark:border-warmblack-100 py-2 sm:py-2.5 overflow-hidden shadow-md select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Breaking Badge */}
        <div className="flex items-center gap-2.5 shrink-0 pr-3 sm:pr-4 border-r border-warmblack-50/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-saffron uppercase flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-saffron" />
            WIRE BREAKING
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-saffron/20 text-saffron font-mono text-[9px] font-semibold">
            CYLINDER 3D
          </span>
        </div>

        {/* 3D Drum Stage */}
        <div
          className="perspective-container relative flex-1 h-[54px] flex items-center justify-center overflow-hidden"
          style={{ perspective: "900px" }}
        >
          <div
            className="preserve-3d w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transform: `translateZ(-${radius}px) rotateX(${rotationDeg}deg)`,
            }}
          >
            {items.map((headline, idx) => {
              const faceAngle = idx * anglePerFace;
              const isCurrent = idx === activeIndex;

              return (
                <div
                  key={idx}
                  className="absolute inset-x-0 h-[54px] flex items-center justify-start px-2 sm:px-4 backface-hidden will-change-transform"
                  style={{
                    transform: `rotateX(${faceAngle}deg) translateZ(${radius}px)`,
                  }}
                >
                  <p
                    className={cn(
                      "font-sans text-xs sm:text-sm font-semibold tracking-tight transition-opacity duration-500 line-clamp-1",
                      isCurrent ? "text-paper-50 opacity-100" : "text-paper-400 opacity-20"
                    )}
                  >
                    <span className="text-saffron mr-2 font-mono text-xs">[{String(idx + 1).padStart(2, "0")}]</span>
                    {headline}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Stepper Controls */}
        <div className="flex items-center gap-1 shrink-0 pl-2">
          <div className="text-[10px] font-mono text-paper-400 mr-2 hidden md:inline-block">
            {isPaused ? "PAUSED" : "ROTATING"}
          </div>
          <button
            onClick={handlePrev}
            className="p-1 rounded hover:bg-warmblack-100 text-paper-300 hover:text-saffron transition-colors"
            aria-label="Previous breaking dispatch"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded hover:bg-warmblack-100 text-paper-300 hover:text-saffron transition-colors"
            aria-label="Next breaking dispatch"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
