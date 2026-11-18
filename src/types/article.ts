export interface Author {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown formatted
  category: string;
  categorySlug: string;
  author: Author;
  publishedAt: string;
  readTimeMinutes: number;
  featuredOrder?: number; // 1-20 for the Hero coverflow
  heroRank?: string; // "01", "02", etc.
  isBreaking?: boolean;
  isTrending?: boolean;
  trendingRank?: number; // 1-10
  isEditorsPick?: boolean;
  isPhotoStory?: boolean;
  coverImage?: string | null; // Can be null to test SafeImage fallback
  coverImageAlt?: string;
  photoStoryAngle?: string; // For 3D cube faces
  stats?: {
    views?: number;
    shares?: number;
    comments?: number;
  };
  tags: string[];
}

export interface SearchResult {
  article: Article;
  matchedField: "title" | "excerpt" | "tags" | "category";
  matchIndices?: [number, number];
}

export interface LiveStat {
  id: string;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  description: string;
  trend: "+2.4%" | "-1.1%" | "CRITICAL" | "ACTIVE";
}

export interface SplitFlapItem {
  id: string;
  time: string;
  category: string;
  headline: string;
  status: "BREAKING" | "CONFIRMED" | "DISPATCHED" | "UPDATING";
}
