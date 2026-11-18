"use client";

import { cn } from "@/lib/utils";

interface SignatureStampProps {
  size?: number;
  className?: string;
  text?: string;
  centerText?: string;
}

export function SignatureStamp({
  size = 110,
  className = "",
  text = "LIVE • 20 STORIES • SAFFRON PRESS • EST. 2026 • ",
  centerText = "24/7",
}: SignatureStampProps) {
  const radius = 42;
  const viewBoxSize = 100;
  const center = viewBoxSize / 2;

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center select-none group cursor-pointer",
        className
      )}
      style={{ width: size, height: size }}
      aria-label="Saffron Press Signature Circular Stamp"
    >
      {/* Outer rotating SVG text ring */}
      <svg
        viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
        className="w-full h-full animate-spin-slow group-hover:[animation-play-state:paused] text-foreground transition-transform duration-500 ease-out"
      >
        <defs>
          <path
            id="stampCirclePath"
            d={`M ${center},${center} m -${radius},0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
          />
        </defs>

        {/* Thin concentric guide rings */}
        <circle
          cx={center}
          cy={center}
          r={radius + 6}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="2 2"
          className="opacity-30"
        />
        <circle
          cx={center}
          cy={center}
          r={radius - 9}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          className="opacity-35"
        />

        {/* Circular text along path */}
        <text className="text-[7.6px] font-mono uppercase tracking-[0.22em] font-semibold fill-current">
          <textPath href="#stampCirclePath" startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center Static Badge / Accent */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="w-9 h-9 rounded-full bg-saffron/15 dark:bg-saffron/20 border border-saffron/40 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
          <span className="text-[10px] font-mono font-bold text-saffron tracking-wider">
            {centerText}
          </span>
        </div>
      </div>
    </div>
  );
}
