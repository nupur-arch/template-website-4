"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Camera, Box, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Article } from "@/types/article";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

interface PhotoStoryCubeProps {
  faces: Article[];
}

export function PhotoStoryCube({ faces }: PhotoStoryCubeProps) {
  const items = faces.slice(0, 4);
  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);

  const [activeFace, setActiveFace] = useState(0);
  const [manualRotation, setManualRotation] = useState<number | null>(null);

  // Geometry: 4-faced prism with depth 250px
  const translateZ = 250;

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !cubeRef.current) return;

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=260%",
        pin: true,
        scrub: 0.8,
        onUpdate: (self) => {
          const prog = self.progress;
          // Rotate 270 degrees across the 4 faces
          const angle = -prog * 270;
          gsap.set(cubeRef.current, {
            rotateY: angle,
          });

          // Compute active face index
          const currentFace = Math.min(3, Math.max(0, Math.round(prog * 3)));
          setActiveFace(currentFace);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  const handleFaceSelect = (index: number) => {
    setActiveFace(index);
    if (cubeRef.current) {
      gsap.to(cubeRef.current, {
        rotateY: -index * 90,
        duration: 0.8,
        ease: "power2.out",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="photo-story"
      className="relative min-h-screen py-16 flex flex-col justify-between bg-warmblack text-paper-50 border-b border-paper-300/30 dark:border-warmblack-100 overflow-hidden"
    >
      {/* Background glow and subtle ambient rays */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_40%,#FFB000_0%,transparent_60%)]" />

      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full pt-4 z-10 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-saffron font-bold flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-saffron" />
              06 / VISUAL MONOGRAPH
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
            <span className="text-xs font-mono text-paper-400 uppercase">
              3D Rotating Prism Prism
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            The Photo Prism
          </h2>
        </div>

        {/* Current Face Pill */}
        <div className="flex items-center gap-2 bg-warmblack-200/90 border border-warmblack-50 px-3 py-1.5 rounded-full text-xs font-mono text-paper-300">
          <Box className="w-3.5 h-3.5 text-saffron animate-spin-slow" />
          <span>Face {activeFace + 1} of 4</span>
        </div>
      </div>

      {/* Main 3D Cube Stage */}
      <div
        className="perspective-deep relative w-full h-[460px] sm:h-[520px] flex items-center justify-center my-auto z-10"
        style={{ perspective: "1400px" }}
      >
        <div
          ref={cubeRef}
          className="preserve-3d relative w-[310px] sm:w-[440px] md:w-[520px] h-[380px] sm:h-[440px] transition-transform duration-300"
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: `50% 50% -${translateZ}px`,
          }}
        >
          {items.map((face, index) => {
            const angle = index * 90;
            const isCurrent = activeFace === index;

            return (
              <div
                key={face.id}
                className="absolute inset-0 rounded-4xl overflow-hidden bg-warmblack-100 border border-saffron/30 shadow-2xl preserve-3d backface-hidden"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${translateZ}px)`,
                }}
              >
                {/* Big Photo Background */}
                <div className="relative w-full h-full">
                  <SafeImage
                    src={face.coverImage}
                    alt={face.title}
                    category={face.category}
                    fill
                    sizes="(max-width: 768px) 100vw, 540px"
                    className="object-cover"
                  />

                  {/* Gradient Overlay for Editorial Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-warmblack via-warmblack/40 to-transparent" />

                  {/* Face Label Ribbon */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-warmblack/80 backdrop-blur-md border border-white/10 text-saffron font-mono text-[10px] font-bold uppercase tracking-wider">
                      {face.photoStoryAngle || `Face 0${index + 1}`}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-white font-mono text-xs">
                      0{index + 1} / 04
                    </span>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 z-10 space-y-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-semibold">
                      Photographic Dispatch
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-white leading-tight line-clamp-2">
                      {face.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-paper-300 line-clamp-2">
                      {face.excerpt}
                    </p>

                    <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                      <span className="text-xs font-mono text-paper-400">
                        Photo: {face.author.name}
                      </span>
                      <Link
                        href={`/article/${face.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron text-warmblack font-mono text-xs font-bold uppercase tracking-wider hover:bg-saffron-400 transition-colors shadow-md"
                      >
                        Explore Story <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Face Switcher Pills */}
      <div className="max-w-xl mx-auto px-4 z-10 pb-6 w-full flex items-center justify-center gap-3">
        {items.map((face, index) => (
          <button
            key={face.id}
            onClick={() => handleFaceSelect(index)}
            className={cn(
              "px-3 sm:px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 flex items-center gap-2",
              activeFace === index
                ? "bg-saffron text-warmblack font-bold shadow-lg scale-105"
                : "bg-warmblack-100 text-paper-400 hover:text-white border border-warmblack-50"
            )}
          >
            <span>0{index + 1}</span>
            <span className="hidden sm:inline text-[10px]">
              {index === 0 ? "Danakil" : index === 1 ? "Hardanger" : index === 2 ? "Kyoto" : "Atacama"}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
