"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Menu, X, ArrowUpRight, Radio } from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUtc, setCurrentUtc] = useState<string>("");
  const { scrollTo } = useSmoothScroll();

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

  // Update live UTC timecode
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setCurrentUtc(
        d.toLocaleTimeString("en-GB", { timeZone: "UTC", hour: "2-digit", minute: "2-digit" }) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/", "");
      scrollTo(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-paper-300/80 dark:border-warmblack-100 transition-colors duration-200">
        {/* Top Wire / Edition Bar */}
        <div className="border-b border-paper-200/60 dark:border-warmblack-200/60 py-1.5 px-4 text-[10px] font-mono tracking-wider text-muted-foreground flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <span className="hidden sm:inline-block font-semibold text-foreground">
              {siteConfig.edition}
            </span>
            <span className="hidden sm:inline-block text-paper-400">|</span>
            <span className="flex items-center gap-1.5 text-saffron">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron animate-pulse" />
              LONDON • NEW YORK • TOKYO
            </span>
            {currentUtc && (
              <span className="text-foreground/80 font-medium">[{currentUtc}]</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/archive"
              className="hover:text-foreground transition-colors hidden md:inline-block"
            >
              Dispatch Vault
            </Link>
            <Link
              href="/brand"
              className="text-saffron hover:underline font-semibold flex items-center gap-0.5"
            >
              Brand Spec
              <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </div>

        {/* Main Masthead Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Logo variant="full" size={38} />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-xs font-sans font-medium text-foreground/80">
            {siteConfig.navLinks.slice(0, 7).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="hover:text-saffron transition-colors relative py-1 focus:outline-none focus-visible:text-saffron"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Controls: Search, Theme Toggle, Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-200/80 dark:bg-warmblack-200/80 hover:bg-paper-300 dark:hover:bg-warmblack-100 border border-paper-300 dark:border-warmblack-100 transition-all text-xs font-mono text-muted-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              aria-label="Open search dossier"
            >
              <Search className="w-3.5 h-3.5 text-saffron" />
              <span className="hidden sm:inline">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] bg-paper-100 dark:bg-warmblack-100 rounded border border-paper-300/80 dark:border-warmblack-50">
                ⌘K
              </kbd>
            </button>

            {/* Light / Dark Mode Toggle */}
            <ThemeToggle />

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg border border-paper-300 dark:border-warmblack-100 text-foreground hover:bg-paper-200 dark:hover:bg-warmblack-200"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Secondary Category Ribbon */}
        <div className="hidden md:flex border-t border-paper-200/70 dark:border-warmblack-200/60 overflow-x-auto no-scrollbar max-w-7xl mx-auto px-4 sm:px-6 py-2 items-center gap-6 text-[11px] font-mono tracking-widest uppercase text-muted-foreground">
          <span className="text-saffron font-bold flex items-center gap-1 shrink-0">
            <Radio className="w-3 h-3 text-saffron animate-pulse" /> DESKS:
          </span>
          {siteConfig.categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}`}
              className="hover:text-foreground hover:border-b-2 hover:border-saffron pb-0.5 transition-all whitespace-nowrap"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </header>

      {/* Mobile Drawer Navigation with data-lenis-prevent */}
      {isMobileMenuOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 top-[108px] z-30 lg:hidden bg-background/98 backdrop-blur-xl border-t border-paper-300 dark:border-warmblack-100 overflow-y-auto p-6 space-y-6"
        >
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-saffron">
              Main Sections
            </div>
            {siteConfig.navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="block text-lg font-serif font-bold text-foreground hover:text-saffron py-2 border-b border-paper-200 dark:border-warmblack-200"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              Editorial Categories
            </div>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg border border-paper-200 dark:border-warmblack-100 text-xs font-serif font-medium hover:text-saffron hover:border-saffron/40"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
