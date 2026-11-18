# Saffron Press — Build Status

## Architecture & Stack
- Next.js 15 App Router + TypeScript + Tailwind CSS
- GSAP + ScrollTrigger (CSS 3D scroll-driven transforms)
- Framer Motion (micro-interactions, page transitions)
- Lenis Smooth Scroll with GSAP Ticker & Touch/Reduced-Motion Guards
- React Markdown + Remark GFM + Rehype Sanitize
- Next Themes (Light/Dark Warm Palette)

## Progress Checklist

- [x] Initial Project Setup & Git Init
- [ ] Phase 1: Foundation
  - [x] Dependencies & Configs (tailwind, next.config, tsconfig, content/site.config)
  - [ ] CSS Design Tokens (warm black `#15110D`, saffron `#FFB000`, paper white, light/dark)
  - [ ] Typography & Root Layout with Font Pairing (Playfair / Plus Jakarta / Space Mono)
  - [ ] Lenis Smooth Scroll Provider with ScrollTrigger sync & reduced-motion fallback
  - [ ] Custom SVG Logo (`<Logo variant="full|mark|stacked" />` with subtle draw-in)
  - [ ] Normalized Data Types & Mappers (`types/article.ts`, `lib/api/client.ts`, `services/articles.ts`)
  - [ ] Mock Data with 20 real Unsplash photos + 3 fallback articles with no image
  - [ ] SafeImage Component with Editorial Paper Fallback
  - [ ] Navigation Header with Theme Toggle, Weather/Edition bar, Signature Stamp
  - [ ] Search Engine (Debounce 300ms, AbortController, Arrow keys, Cmd+K, Recent Searches, Mobile Sheet)
- [ ] Phase 2: Section 1 — Hero (3D Coverflow with Reflection, 20 stories pinned 350vh, 01/20 counter)
- [ ] Phase 3: Section 2 — Breaking Bar (Rotating 3D Text Drum / Cylinder text)
- [ ] Phase 4: Section 3 — Latest News Grid (Pointer-driven 3D tilt + glare, Z-pop)
- [ ] Phase 5: Section 4 — Trending Top 10 (Cards shrink/tilt on scroll then flip 3D)
- [ ] Phase 6: Section 5 — Editor's Picks (Sticky 3D card stack with rotateX tilt)
- [ ] Phase 7: Section 6 — Category Showcase (Tilted-scroll counter-movement columns)
- [ ] Phase 8: Section 7 — Photo Story (3D rotating cube/prism on scroll)
- [ ] Phase 9: Section 8 — Live / Stats (Split-flap airport departure board + count-up numbers)
- [ ] Phase 10: Section 9 — Newsletter (3D envelope with opening flap & sliding letter)
- [ ] Phase 11: Section 10 — Footer & Global (Extruded wordmark with parallax + signature stamp + 3D route transitions)
- [ ] Phase 12: Article Page (`/article/[slug]`), Category Pages, Search Page (`/search`), Brand Page (`/brand`), About Page (`/about`)
- [ ] Verification: `yarn lint` and `yarn build` passing with zero errors
