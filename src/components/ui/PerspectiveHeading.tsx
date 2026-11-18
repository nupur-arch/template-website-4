"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface PerspectiveHeadingProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4";
  className?: string;
  accentWordIndex?: number;
}

export function PerspectiveHeading({
  children,
  as: Component = "h2",
  className = "",
  accentWordIndex,
}: PerspectiveHeadingProps) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = children.split(" ");

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;
      const wordEls = containerRef.current.querySelectorAll(".perspective-word");

      gsap.fromTo(
        wordEls,
        {
          rotateX: 75,
          y: 40,
          opacity: 0,
        },
        {
          rotateX: 0,
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Component
      ref={containerRef}
      className={cn("preserve-3d flex flex-wrap gap-x-2 gap-y-1", className)}
      style={{ perspective: "1000px" }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className={cn(
            "perspective-word inline-block will-change-transform",
            accentWordIndex === i && "text-saffron italic"
          )}
          style={{ transformOrigin: "bottom center" }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}
