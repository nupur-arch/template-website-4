export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  description: string;
  badgeColor?: string;
  count?: number;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  signatureStamp: string;
  categories: CategoryConfig[];
  navLinks: {
    label: string;
    href: string;
    badge?: string;
  }[];
  footerLinks: {
    title: string;
    links: { label: string; href: string }[];
  }[];
  socials: {
    platform: string;
    href: string;
    handle: string;
  }[];
  edition: string;
  foundedYear: number;
}

export const siteConfig: SiteConfig = {
  name: "Saffron Press",
  tagline: "Independent Global Dispatches & In-Depth Chronicles",
  description:
    "An uncompromised international daily journal delivering investigative reporting, cultural analysis, technological forecasts, and geopolitical chronicles with rigorous editorial craft.",
  url: "https://saffronpress.daily",
  signatureStamp: "LIVE • 20 STORIES • SAFFRON PRESS • EST. 2026 •",
  edition: "International Daily Broadside No. 4,892",
  foundedYear: 2026,
  categories: [
    {
      id: "world",
      name: "Global Dispatches",
      slug: "global-dispatches",
      description: "Frontline geopolitical reporting, treaty developments, and international diplomacy.",
      badgeColor: "border-amber-500/30 text-amber-500 bg-amber-500/10",
      count: 42,
    },
    {
      id: "geopolitics",
      name: "Geopolitics",
      slug: "geopolitics",
      description: "Strategic defense postures, sovereign treaties, trade alliances, and border dynamics.",
      badgeColor: "border-orange-500/30 text-orange-500 bg-orange-500/10",
      count: 28,
    },
    {
      id: "technology",
      name: "Deep Tech",
      slug: "deep-tech",
      description: "Frontier artificial intelligence, quantum systems, semiconductor supply, and synthetic bio.",
      badgeColor: "border-yellow-500/30 text-yellow-500 bg-yellow-500/10",
      count: 36,
    },
    {
      id: "economy",
      name: "Markets & Capital",
      slug: "markets-capital",
      description: "Macroeconomic flows, energy corridors, central bank liquidity, and commodity cycles.",
      badgeColor: "border-emerald-500/30 text-emerald-500 bg-emerald-500/10",
      count: 31,
    },
    {
      id: "culture",
      name: "Culture & Arts",
      slug: "culture-arts",
      description: "Literary essays, cinema critiques, contemporary architecture, and cultural philosophies.",
      badgeColor: "border-purple-500/30 text-purple-500 bg-purple-500/10",
      count: 24,
    },
    {
      id: "climate",
      name: "Climate & Planet",
      slug: "climate-planet",
      description: "Atmospheric research, critical mineral reserves, renewable transitions, and biosphere shifts.",
      badgeColor: "border-teal-500/30 text-teal-500 bg-teal-500/10",
      count: 19,
    },
    {
      id: "opinions",
      name: "The Long View",
      slug: "the-long-view",
      description: "Distinguished essays, dissenting perspectives, and rigorous philosophical commentaries.",
      badgeColor: "border-rose-500/30 text-rose-500 bg-rose-500/10",
      count: 15,
    },
    {
      id: "investigations",
      name: "Investigations",
      slug: "investigations",
      description: "Multi-month investigative dossiers uncovering institutional integrity and hidden paper trails.",
      badgeColor: "border-red-500/30 text-red-500 bg-red-500/10",
      count: 12,
    },
  ],
  navLinks: [
    { label: "Top Stories", href: "/#hero" },
    { label: "Breaking", href: "/#breaking" },
    { label: "Latest Grid", href: "/#latest" },
    { label: "Trending 10", href: "/#trending" },
    { label: "Editor's Picks", href: "/#editors-picks" },
    { label: "Dispatch Topics", href: "/#categories" },
    { label: "Photo Cube", href: "/#photo-story" },
    { label: "Live Flap", href: "/#live-stats" },
    { label: "Brand Index", href: "/brand", badge: "Design" },
  ],
  footerLinks: [
    {
      title: "Desks & Sections",
      links: [
        { label: "Global Dispatches", href: "/category/global-dispatches" },
        { label: "Deep Tech & Intelligence", href: "/category/deep-tech" },
        { label: "Markets & Capital", href: "/category/markets-capital" },
        { label: "Climate & Planet", href: "/category/climate-planet" },
        { label: "Culture & Architecture", href: "/category/culture-arts" },
        { label: "The Long View (Essays)", href: "/category/the-long-view" },
      ],
    },
    {
      title: "Journal & Features",
      links: [
        { label: "Brand System & Masthead", href: "/brand" },
        { label: "Full Search Archive", href: "/search" },
        { label: "Editorial Standards", href: "/about#standards" },
        { label: "Whistleblower Drop", href: "/about#contact" },
        { label: "Print & Broadside Edition", href: "/about#print" },
      ],
    },
    {
      title: "Company & Trust",
      links: [
        { label: "About Saffron Press", href: "/about" },
        { label: "Masthead & Staff", href: "/about#masthead" },
        { label: "Corrections Policy", href: "/about#corrections" },
        { label: "Syndication & Licensing", href: "/about#syndication" },
        { label: "Privacy & Terms", href: "/about#privacy" },
      ],
    },
  ],
  socials: [
    { platform: "Terminal / X", href: "https://x.com", handle: "@SaffronPress" },
    { platform: "Signal Wire", href: "https://signal.org", handle: "press.saffron" },
    { platform: "Fediverse", href: "https://mastodon.social", handle: "@saffron@press" },
    { platform: "Bloomberg Wire", href: "https://bloomberg.com", handle: "SAFFRON<GO>" },
  ],
};
