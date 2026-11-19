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
  href = null,
  monoColor = false,
}: LogoProps) {
  // Dynamic Movement Pulse & Cadence Monogram Mark
  const MarkIcon = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="Logotipo Movimento na Rotina"
    >
      {/* Outer Dynamic Pulse / Motion Wave Track */}
      <motion.path
        d="M6 34C11 34 14 14 22 14C28 14 30 34 38 34C42 34 44 26 44 26"
        stroke={monoColor ? "currentColor" : "#0E9F6E"}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate ? { pathLength: 0, opacity: 0 } : { pathLength: 1, opacity: 1 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cadence Arch / Step Arc */}
      <motion.path
        d="M12 26C16 18 20 18 24 26C28 34 32 34 36 26"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
        initial={animate ? { pathLength: 0 } : { pathLength: 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      {/* Amber Kinetic Pulse Spark Accent Dot */}
      <circle
        cx="22"
        cy="14"
        r="3.5"
        fill={monoColor ? "currentColor" : "#F5B700"}
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
            <span className="font-serif font-black text-lg md:text-xl tracking-tight text-foreground">
              MOVIMENTO
            </span>
            <span className="font-serif italic font-normal text-lg md:text-xl text-emerald-600 dark:text-emerald-400">
              NA ROTINA
            </span>
          </div>
          <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-muted-foreground mt-0.5">
            Fitness & Atividade Física
          </span>
        </div>
      )}

      {variant === "stacked" && (
        <div className="flex flex-col items-center leading-none">
          <span className="font-serif font-black text-2xl md:text-3xl tracking-tighter text-foreground">
            MOVIMENTO
          </span>
          <span className="font-serif italic text-base md:text-lg tracking-widest text-emerald-600 dark:text-emerald-400 mt-0.5">
            NA ROTINA
          </span>
          <div className="w-8 h-[2px] bg-emerald-500 my-2" />
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground">
            Est. 2026 • Fitness & Vida Ativa
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
}
