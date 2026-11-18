"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Archive,
  Palette,
  Info,
  Search,
  Sparkles,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Setup Cmd/Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pageLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/archive", label: "Vault & Archive", icon: Archive },
    { href: "/brand", label: "Brand System", icon: Palette },
    { href: "/about", label: "Editorial Charter", icon: Info },
  ];

  return (
    <>
      {/* Sleek, Single-Line Floating Pill Header (100% Responsive from 320px to 1440px) */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6">
        <nav
          aria-label="Main Navigation"
          className="pointer-events-auto max-w-xl sm:max-w-2xl mx-auto rounded-full bg-[#15110D]/90 dark:bg-[#120E0A]/95 backdrop-blur-2xl border border-white/10 dark:border-saffron/25 shadow-2xl px-3 sm:px-5 py-2 flex items-center justify-between gap-2 sm:gap-4 text-paper-50 transition-all duration-300"
        >
          {/* Left: Brand Monogram + Title */}
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron shrink-0 group"
            title="Saffron Press — Home"
            aria-label="Saffron Press Home"
          >
            <Logo variant="mark" size={26} className="text-saffron transition-transform group-hover:scale-105" />
            <div className="flex items-baseline gap-1">
              <span className="font-serif font-black text-sm tracking-tight text-white group-hover:text-saffron transition-colors">
                SAFFRON
              </span>
              <span className="font-serif italic font-normal text-xs text-saffron">
                PRESS
              </span>
            </div>
          </Link>

          {/* Center / Right: Pure Icon-First Page Navigation (Icon only, no text) */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {pageLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 relative group",
                    isActive
                      ? "bg-saffron text-warmblack shadow-md scale-105"
                      : "text-paper-300 hover:text-white hover:bg-white/10 hover:scale-105"
                  )}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon className="w-4 h-4" />
                  
                  {/* Pinterest-style clean hover tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-warmblack/95 text-white text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
                    {item.label}
                  </span>
                </Link>
              );
            })}

            {/* Subtle Divider */}
            <div className="w-[1px] h-5 bg-white/15 mx-0.5 sm:mx-1 shrink-0" />

            {/* Search Icon Button (Pure Icon) */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-saffron/15 hover:bg-saffron text-saffron hover:text-warmblack border border-saffron/30 flex items-center justify-center transition-all duration-200 relative group shrink-0"
              title="Search Dispatches (⌘K)"
              aria-label="Search Dispatches"
            >
              <Search className="w-4 h-4" />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-warmblack/95 text-white text-[10px] font-mono tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10 shadow-lg">
                Search (⌘K)
              </span>
            </button>

            {/* Theme Toggle Button (Pure Icon) */}
            <ThemeToggle />
          </div>
        </nav>
      </header>

      {/* Global Search Dossier Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
