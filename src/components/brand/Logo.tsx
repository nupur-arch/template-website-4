"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface LogoProps {
  variant?: "full" | "mark" | "stacked";
  size?: number;
  className?: string;
  animate?: boolean;
  href?: string | null;
  monoColor?: boolean;
}

export function Logo({
  variant = "full",
  size = 32,
  className = "",
  animate = false,
  href = "/",
  monoColor = false,
}: LogoProps) {
  // SVG Mark component
  const MarkIcon = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Saffron Press Monogram"
    >
      {/* Newspaper Column Folded Polygon */}
      <motion.path
        d="M8 6H34L42 14V42H8V6Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Folded corner triangular crease */}
      <motion.path
        d="M34 6V14H42"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      {/* Editorial horizontal column lines */}
      <line
        x1="15"
        y1="20"
        x2="28"
        y2="20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="15"
        y1="26"
        x2="35"
        y2="26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
      <line
        x1="15"
        y1="32"
        x2="30"
        y2="32"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Distinctive Saffron Registration Diamond / Printer's Notch */}
      <rect
        x="27"
        y="18"
        width="6"
        height="6"
        transform="rotate(45 27 18)"
        fill={monoColor ? "currentColor" : "#FFB000"}
        className="transition-colors duration-300"
      />
    </svg>
  );

  const content = (
    <div
      className={cn(
        "group inline-flex items-center gap-3 select-none",
        variant === "stacked" && "flex-col text-center gap-2",
        className
      )}
    >
      <MarkIcon />

      {variant === "full" && (
        <div className="flex flex-col text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-serif font-bold text-lg md:text-xl tracking-tight text-foreground">
              SAFFRON
            </span>
            <span className="font-serif italic font-normal text-lg md:text-xl text-saffron">
              PRESS
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.28em] uppercase text-muted-foreground mt-0.5">
            Global Dispatches
          </span>
        </div>
      )}

      {variant === "stacked" && (
        <div className="flex flex-col items-center leading-none">
          <span className="font-serif font-black text-2xl md:text-3xl tracking-tighter text-foreground">
            SAFFRON
          </span>
          <span className="font-serif italic text-base md:text-lg tracking-widest text-saffron mt-0.5">
            PRESS
          </span>
          <div className="w-8 h-[1px] bg-saffron my-2" />
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-muted-foreground">
            Est. 2026 • Journal of Record
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron rounded-lg">
        {content}
      </Link>
    );
  }

  return content;
}
