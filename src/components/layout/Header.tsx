"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Menu,
  X,
  Flame,
  Radio,
  LayoutGrid,
  TrendingUp,
  BookmarkCheck,
  Compass,
  Camera,
  Activity,
  Mail,
  Archive,
  Palette,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/content/site.config";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { SearchDialog } from "@/components/search/SearchDialog";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { cn } from "@/lib/utils";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
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

  const navItems = [
    { id: "hero", label: "Top Stories", icon: Flame, href: "/#hero", badge: "20" },
    { id: "breaking", label: "Wire Breaking", icon: Radio, href: "/#breaking", pulse: true },
    { id: "latest", label: "Dispatch Grid", icon: LayoutGrid, href: "/#latest" },
    { id: "trending", label: "Trending 10", icon: TrendingUp, href: "/#trending" },
    { id: "editors-picks", label: "Editor's Picks", icon: BookmarkCheck, href: "/#editors-picks" },
    { id: "categories", label: "Desk Runway", icon: Compass, href: "/#categories" },
    { id: "photo-story", label: "Photo Prism", icon: Camera, href: "/#photo-story" },
    { id: "live-stats", label: "Live Telemetry", icon: Activity, href: "/#live-stats" },
    { id: "newsletter", label: "Broadside Pouch", icon: Mail, href: "/#newsletter" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#") && window.location.pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/", "");
      setActiveSection(targetId.replace("#", ""));
      scrollTo(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Floating Pinterest-Style Pill Header Container */}
      <header className="fixed top-3 sm:top-4 inset-x-0 z-50 pointer-events-none px-3 sm:px-6 transition-all duration-300">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-2">
          {/* Main Floating Capsule Navigation Bar */}
          <div className="pointer-events-auto w-full rounded-full bg-[#18130F]/90 dark:bg-[#120E0A]/92 backdrop-blur-2xl border border-white/10 dark:border-saffron/25 shadow-2xl px-3 sm:px-4 py-2 flex items-center justify-between gap-2 sm:gap-4 text-paper-50 transition-all duration-300">
            {/* Left: Brand Identity Capsule */}
            <Link
              href="/"
              className="flex items-center gap-2.5 px-2.5 py-1 rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron shrink-0 group"
              title="Saffron Press — Frontpage"
            >
              <Logo variant="mark" size={28} className="text-saffron" />
              <div className="flex items-baseline gap-1">
                <span className="font-serif font-black text-sm sm:text-base tracking-tight text-white group-hover:text-saffron transition-colors">
                  SAFFRON
                </span>
                <span className="font-serif italic font-normal text-xs sm:text-sm text-saffron">
                  PRESS
                </span>
              </div>
            </Link>

            {/* Center: Pinterest-Style Icon Navigation Pills (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/5 dark:bg-black/30 p-1 rounded-full border border-white/5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;

                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className={cn(
                      "group relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-200 select-none",
                      isActive
                        ? "bg-saffron text-warmblack font-bold shadow-md"
                        : "text-paper-300 hover:text-white hover:bg-white/10"
                    )}
                    title={item.label}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 transition-transform group-hover:scale-110",
                        item.pulse && "text-red-400 animate-pulse",
                        isActive ? "text-warmblack" : "text-saffron"
                      )}
                    />
                    <span className="text-[11px] font-medium hidden xl:inline">
                      {item.label}
                    </span>

                    {/* Micro Badge */}
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-black/40 text-saffron font-mono">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Center-Right: Pinterest Search Pill */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-mono text-paper-300 hover:text-white transition-all shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              aria-label="Open global search dossier"
              title="Search (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-saffron shrink-0" />
              <span className="hidden sm:inline text-[11px] font-sans">Search...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[9px] font-mono bg-black/40 text-saffron rounded border border-white/10">
                ⌘K
              </kbd>
            </button>

            {/* Right: Circular Icon Action Buttons (Pinterest Style) */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Vault / Archive Icon Button */}
              <Link
                href="/archive"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-saffron hover:text-warmblack text-paper-200 flex items-center justify-center transition-all duration-200"
                title="Chronological Vault"
                aria-label="Chronological Vault"
              >
                <Archive className="w-4 h-4" />
              </Link>

              {/* Brand Guidelines Icon Button */}
              <Link
                href="/brand"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-saffron hover:text-warmblack text-paper-200 flex items-center justify-center transition-all duration-200"
                title="Brand System & Spec"
                aria-label="Brand System & Spec"
              >
                <Palette className="w-4 h-4" />
              </Link>

              {/* Theme Toggle Icon Button */}
              <ThemeToggle />

              {/* Mobile Drawer Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Toggle navigation drawer"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Secondary Pinterest Category Chips Pill Carousel */}
          <div className="pointer-events-auto hidden sm:flex items-center gap-2 overflow-x-auto no-scrollbar max-w-5xl py-1 px-3 rounded-full bg-[#18130F]/80 dark:bg-[#120E0A]/85 backdrop-blur-xl border border-white/10 shadow-lg">
            <span className="text-[10px] font-mono uppercase tracking-widest text-saffron font-bold flex items-center gap-1 pl-1 pr-2 border-r border-white/10 shrink-0">
              <Sparkles className="w-3 h-3 text-saffron" /> DESKS:
            </span>
            {siteConfig.categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.slug}`}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-white/5 hover:bg-saffron hover:text-warmblack text-paper-300 transition-all duration-200 shrink-0 border border-transparent hover:border-saffron/40"
              >
                <CategoryIcon categorySlug={cat.slug} className="w-3 h-3 text-saffron" />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation with data-lenis-prevent */}
      {isMobileMenuOpen && (
        <div
          data-lenis-prevent
          className="fixed inset-0 top-[72px] z-40 lg:hidden bg-background/98 backdrop-blur-2xl border-t border-paper-300 dark:border-warmblack-100 overflow-y-auto p-6 space-y-6 animate-in fade-in duration-200"
        >
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-widest text-saffron flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" /> Portal Sections
            </div>
            <div className="grid grid-cols-1 gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(item.href, e)}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-paper-200 dark:hover:bg-warmblack-200 text-foreground transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-saffron/15 text-saffron flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-serif font-bold text-base">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-saffron text-warmblack font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-paper-200 dark:border-warmblack-200">
            <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-saffron" /> Editorial Desks
            </div>
            <div className="grid grid-cols-2 gap-2">
              {siteConfig.categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/category/${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-paper-200 dark:border-warmblack-100 text-xs font-mono hover:bg-saffron hover:text-warmblack transition-colors"
                >
                  <CategoryIcon categorySlug={cat.slug} className="w-3.5 h-3.5 text-saffron" />
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Global Search Dossier Modal */}
      <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
