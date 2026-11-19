"use client";

import { useEffect, useState } from "react";
import { ChevronUp, ChevronDown, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreakingBarProps {
  headlines: string[];
}

export function BreakingBar({ headlines }: BreakingBarProps) {
  const items =
    headlines.length > 0
      ? headlines
      : [
          "DICA RÁPIDA: Levante-se a cada 50 minutos sentado para ativar a circulação nas pernas e combater a fadiga.",
          "POSTURA: Alongue os flexores do quadril por 60 segundos para aliviar a tensão na coluna lombar.",
          "HIDRATAÇÃO: Beba um copo de água ao acordar para restabelecer os níveis hídricos e ativar o metabolismo.",
          "CAMINHADA: Subir dois lances de escada no dia a dia queima até 5 vezes mais calorias que usar o elevador.",
        ];

  const totalFaces = items.length;
  const faceHeight = 54; // px
  const anglePerFace = 360 / totalFaces;
  const radius = Math.round(faceHeight / (2 * Math.tan(Math.PI / totalFaces)));

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const rotationDeg = activeIndex * -anglePerFace;

  // Auto-advance rotation every 4.2 seconds unless paused
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
      aria-label="Dicas rápidas em destaque"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left Breaking Badge: Relabeled as Dicas Rápidas */}
        <div className="flex items-center gap-2.5 shrink-0 pr-3 sm:pr-4 border-r border-warmblack-50/50">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-emerald-400 uppercase flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            DICAS RÁPIDAS
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[9px] font-semibold">
            ROTATIVO 3D
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
                    <span className="text-emerald-400 mr-2 font-mono text-xs">
                      [{String(idx + 1).padStart(2, "0")}]
                    </span>
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
            {isPaused ? "PAUSADO" : "GIRANDO"}
          </div>
          <button
            onClick={handlePrev}
            className="p-1 rounded hover:bg-warmblack-100 text-paper-300 hover:text-emerald-400 transition-colors"
            aria-label="Dica anterior"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-1 rounded hover:bg-warmblack-100 text-paper-300 hover:text-emerald-400 transition-colors"
            aria-label="Próxima dica"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
