import {
  getFeaturedHeroArticles,
  getBreakingHeadlines,
  getLatestArticles,
  getTrendingArticles,
  getEditorsPicks,
  getPhotoStoryFaces,
  getLiveStats,
  getSplitFlapItems,
} from "@/services/articles";
import { HeroCoverflow } from "@/components/sections/HeroCoverflow";
import { BreakingBar } from "@/components/sections/BreakingBar";
import { LatestNewsGrid } from "@/components/sections/LatestNewsGrid";
import { TrendingTop10 } from "@/components/sections/TrendingTop10";
import { EditorsPicksStack } from "@/components/sections/EditorsPicksStack";
import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { PhotoStoryCube } from "@/components/sections/PhotoStoryCube";
import { LiveStatsSplitFlap } from "@/components/sections/LiveStatsSplitFlap";
import { NewsletterEnvelope } from "@/components/sections/NewsletterEnvelope";
import { PageTransition } from "@/components/ui/PageTransition";

export const revalidate = 60; // 60s ISR

export default async function HomePage() {
  // Fetch data in parallel for optimum SSR performance
  const [
    heroArticles,
    breakingHeadlines,
    latestArticles,
    trendingArticles,
    editorsPicks,
    photoFaces,
    liveStats,
    splitFlapItems,
  ] = await Promise.all([
    getFeaturedHeroArticles(),
    getBreakingHeadlines(),
    getLatestArticles(6),
    getTrendingArticles(10),
    getEditorsPicks(),
    getPhotoStoryFaces(),
    getLiveStats(),
    getSplitFlapItems(),
  ]);

  return (
    <PageTransition>
      {/* 1. Hero 3D Coverflow with Reflection (Exactly 20 Articles) */}
      <HeroCoverflow articles={heroArticles} />

      {/* 2. Breaking Bar (Rotating 3D Text Drum / Cylinder) */}
      <BreakingBar headlines={breakingHeadlines} />

      {/* 3. Latest News Grid (Pointer-driven 3D tilt + glare, Z-pop) */}
      <LatestNewsGrid articles={latestArticles} />

      {/* 4. Trending Top 10 (3D Double-Faced Flip Cards on Scroll & Hover) */}
      <TrendingTop10 articles={trendingArticles} />

      {/* 5. Editor's Picks (Sticky 3D Card Stack with rotateX Tilt) */}
      <EditorsPicksStack articles={editorsPicks} />

      {/* 6. Category Showcase (Tilted Runway Counter-Scrolling Columns) */}
      <CategoryShowcase articles={latestArticles} />

      {/* 7. Photo Story (3D Rotating Cube/Prism on Scroll) */}
      <PhotoStoryCube faces={photoFaces} />

      {/* 8. Live Stats (Airport Split-Flap Board + Count-Up Metrics) */}
      <LiveStatsSplitFlap stats={liveStats} flapItems={splitFlapItems} />

      {/* 9. Newsletter (3D Envelope Opening Flap with Sliding Letter) */}
      <NewsletterEnvelope />
    </PageTransition>
  );
}
