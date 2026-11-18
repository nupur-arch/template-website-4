"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  User,
  Clock,
  Eye,
  ChevronLeft,
  ChevronRight,
  Camera,
  Box,
} from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { cn } from "@/lib/utils";

interface PhotoStoryCubeProps {
  faces: Article[];
}

export function PhotoStoryCube({ faces }: PhotoStoryCubeProps) {
  const items = faces.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const [activeFace, setActiveFace] = useState(0);
  const [currentAngle, setCurrentAngle] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const { scrollTo } = useSmoothScroll();

  // Prism face distance from rotation center (half of 400px = 200px)
  const faceRadius = 200;

  const updateCubeRotation = useCallback((rotationDeg: number) => {
    if (!cubeRef.current) return;
    gsap.set(cubeRef.current, {
      rotateY: rotationDeg,
    });
    setCurrentAngle(rotationDeg);

    // Active face is closest to front (angle normalized to 0..3)
    const normalizedAngle = ((-rotationDeg % 360) + 360) % 360;
    const faceIdx = Math.round(normalizedAngle / 90) % 4;
    setActiveFace(faceIdx);
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setIsReducedMotion(prefersReduced);

    if (prefersReduced) return;

    // Initial orientation: Face 0 in front
    updateCubeRotation(0);

    const ctx = gsap.context(() => {
      if (!containerRef.current) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        onUpdate: (self) => {
          // Smoothly rotate 270 degrees across the 4 faces as user scrolls the runway
          const angle = -self.progress * 270;
          updateCubeRotation(angle);
        },
      });

      ScrollTrigger.refresh();

      return () => {
        trigger.kill();
      };
    }, containerRef);

    return () => ctx.revert();
  }, [updateCubeRotation]);

  const handleFaceSelect = (targetIdx: number) => {
    setActiveFace(targetIdx);
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const sectionTop = rect.top + scrollTop;
    const scrollableDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = sectionTop + (targetIdx / 3) * scrollableDistance;

    scrollTo(targetScrollY);
  };

  const handlePrev = () => {
    const nextIdx = (activeFace - 1 + 4) % 4;
    handleFaceSelect(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeFace + 1) % 4;
    handleFaceSelect(nextIdx);
  };

  return (
    <section
      ref={containerRef}
      id="photo-story"
      className={cn(
        "relative w-full bg-warmblack text-paper-50 border-b border-paper-300/30 dark:border-warmblack-100",
        isReducedMotion ? "py-20" : "h-[280vh]"
      )}
    >
      {/* Sticky Viewport: Dedicated top clearance (pt-24) prevents any overlap with floating navbar */}
      <div
        className={cn(
          "w-full flex flex-col justify-between items-center select-none overflow-hidden",
          isReducedMotion ? "relative" : "sticky top-0 h-screen pt-20 sm:pt-24 pb-8"
        )}
      >
        {/* Ambient radial glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,#FFB000_0%,transparent_65%)]" />

        {/* Top Header: Clean title without redundant badges */}
        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              The Photo Prism
            </h2>
          </div>

          {/* Compact Stepper Pill */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handlePrev}
              className="p-1.5 sm:p-2 rounded-full bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 transition-colors shadow-sm active:scale-95"
              aria-label="Previous face"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-center gap-1.5 bg-warmblack-200/90 border border-warmblack-50 px-3 py-1 rounded-full text-xs font-mono text-paper-300 shadow-md">
              <Box className="w-3 h-3 text-saffron" />
              <span>Face {activeFace + 1} / 4</span>
            </div>
            <button
              onClick={handleNext}
              className="p-1.5 sm:p-2 rounded-full bg-warmblack-100 hover:bg-saffron hover:text-warmblack border border-warmblack-50 transition-colors shadow-sm active:scale-95"
              aria-label="Next face"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3D Prism Stage: Compact dimensions ensure the box never gets cut or collides with headers */}
        {!isReducedMotion ? (
          <div
            className="perspective-deep relative w-full flex-1 flex items-center justify-center my-auto py-2"
            style={{ perspective: "1300px" }}
          >
            {/* The Rotating 3D Prism Box: Scaled for perfect headroom and zero cut-off */}
            <div
              ref={cubeRef}
              className="preserve-3d relative w-[280px] sm:w-[350px] md:w-[400px] h-[320px] sm:h-[350px] md:h-[370px]"
              style={{
                transformStyle: "preserve-3d",
                transformOrigin: "50% 50% 0",
              }}
            >
              {items.map((face, index) => {
                const angle = index * 90;
                const isCurrent = activeFace === index;

                // Dynamic angular difference for realistic face shadow
                const faceRelAngle = Math.abs(((-currentAngle - angle + 360 + 180) % 360) - 180);
                const shadowOpacity = Math.min(0.65, Math.max(0, (faceRelAngle / 90) * 0.55));

                return (
                  <div
                    key={face.id}
                    className="absolute inset-0 preserve-3d"
                    style={{
                      transform: `rotateY(${angle}deg) translateZ(${faceRadius}px)`,
                    }}
                  >
                    {/* Inner Card Container */}
                    <div
                      className={cn(
                        "relative w-full h-full rounded-3xl overflow-hidden bg-warmblack-100 border transition-all duration-300 shadow-2xl",
                        isCurrent
                          ? "border-saffron/70 shadow-[0_20px_50px_rgba(255,176,0,0.25)] ring-1 ring-saffron/50"
                          : "border-warmblack-50/70 opacity-90"
                      )}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Big Photo Background */}
                      <div className="relative w-full h-full">
                        <SafeImage
                          src={face.coverImage}
                          alt={face.title}
                          category={face.category}
                          fill
                          sizes="(max-width: 768px) 100vw, 420px"
                          className="object-cover"
                        />

                        {/* Dynamic 3D lighting shadow scrim */}
                        <div
                          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-150"
                          style={{ opacity: shadowOpacity }}
                        />

                        {/* High-legibility Dark Gradient Scrim */}
                        <div className="absolute inset-0 bg-gradient-to-t from-warmblack via-warmblack/50 to-transparent pointer-events-none" />

                        {/* Top Face Label Tag */}
                        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
                          <span className="px-2.5 py-0.5 rounded-full bg-warmblack/85 backdrop-blur-md border border-white/10 text-saffron font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                            <Camera className="w-3 h-3 text-saffron" />
                            {face.photoStoryAngle || `Face 0${index + 1}`}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-black/70 text-white font-mono text-[11px]">
                            0{index + 1} / 04
                          </span>
                        </div>

                        {/* Bottom Story Content */}
                        <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10 space-y-2">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-semibold flex items-center gap-1">
                            <Eye className="w-3 h-3 text-saffron" /> Photographic Chronicle
                          </span>
                          <h3 className="font-serif text-base sm:text-xl font-black text-white leading-tight line-clamp-2">
                            {face.title}
                          </h3>
                          <p className="font-sans text-xs text-paper-300 line-clamp-2 leading-relaxed">
                            {face.excerpt}
                          </p>

                          <div className="pt-2.5 border-t border-white/15 flex items-center justify-between">
                            <span className="text-xs font-mono text-paper-400 flex items-center gap-1">
                              <User className="w-3 h-3 text-saffron" />
                              {face.author.name}
                            </span>
                            <Link
                              href={`/article/${face.slug}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-saffron text-warmblack font-mono text-[11px] font-bold uppercase tracking-wider hover:bg-saffron-400 transition-colors shadow-md"
                            >
                              <span>Explore</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Reduced Motion: Grid of 4 stories */
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-auto">
            {items.map((face, index) => (
              <div
                key={face.id}
                className="rounded-3xl overflow-hidden bg-warmblack-100 border border-warmblack-50 p-3.5 space-y-2.5"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <SafeImage
                    src={face.coverImage}
                    alt={face.title}
                    category={face.category}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-warmblack/80 text-saffron font-mono text-xs">
                    Face 0{index + 1}
                  </div>
                </div>
                <h4 className="font-serif font-bold text-sm text-white line-clamp-2">
                  {face.title}
                </h4>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
