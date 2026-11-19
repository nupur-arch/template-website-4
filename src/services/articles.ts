import { apiClient, isMockEnabled } from "@/lib/api/client";
import {
  MOCK_ARTICLES,
  MOCK_BREAKING_HEADLINES,
  MOCK_LIVE_STATS,
  MOCK_SPLIT_FLAP_ITEMS,
} from "@/mocks/articles";
import { Article, LiveStat, SearchResult, SplitFlapItem } from "@/types/article";

/**
 * Normaliza os dados dos artigos para o modelo unificado.
 */
export function mapApiArticle(raw: any): Article {
  if (!raw) throw new Error("Payload de artigo vazio");
  return {
    id: String(raw.id || raw._id || ""),
    slug: String(raw.slug || ""),
    title: String(raw.title || ""),
    excerpt: String(raw.excerpt || raw.summary || ""),
    content: String(raw.content || raw.body || ""),
    category: String(raw.category || "Geral"),
    categorySlug: String(raw.categorySlug || raw.category_slug || "geral"),
    subtopic: raw.subtopic ? String(raw.subtopic) : undefined,
    author: {
      id: String(raw.author?.id || "auth-editorial"),
      name: String(raw.author?.name || "Redação Movimento na Rotina"),
      title: String(raw.author?.title || "Equipe Editorial"),
      avatar: raw.author?.avatar || undefined,
      bio: raw.author?.bio || undefined,
    },
    publishedAt: String(raw.publishedAt || raw.published_at || new Date().toISOString()),
    readTimeMinutes: Number(raw.readTimeMinutes || raw.read_time || 3),
    featuredOrder: raw.featuredOrder ? Number(raw.featuredOrder) : undefined,
    heroRank: raw.heroRank ? String(raw.heroRank) : undefined,
    isBreaking: Boolean(raw.isBreaking),
    isTrending: Boolean(raw.isTrending),
    trendingRank: raw.trendingRank ? Number(raw.trendingRank) : undefined,
    isEditorsPick: Boolean(raw.isEditorsPick),
    isPhotoStory: Boolean(raw.isPhotoStory),
    coverImage: raw.coverImage || raw.image || null,
    coverImageAlt: raw.coverImageAlt || raw.image_alt || undefined,
    photoStoryAngle: raw.photoStoryAngle || undefined,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    stats: raw.stats || undefined,
  };
}

export async function getAllArticles(): Promise<Article[]> {
  return MOCK_ARTICLES;
}

export async function getFeaturedHeroArticles(): Promise<Article[]> {
  if (isMockEnabled()) {
    return MOCK_ARTICLES.filter((a) => a.featuredOrder !== undefined)
      .sort((a, b) => (a.featuredOrder || 0) - (b.featuredOrder || 0))
      .slice(0, 20);
  }

  try {
    const raw = await apiClient<any[]>("/articles/featured", { params: { limit: 20 } });
    return raw.map(mapApiArticle);
  } catch {
    return MOCK_ARTICLES.filter((a) => a.featuredOrder !== undefined).slice(0, 20);
  }
}

export async function getBreakingHeadlines(): Promise<string[]> {
  if (isMockEnabled()) {
    return MOCK_BREAKING_HEADLINES;
  }
  try {
    const raw = await apiClient<{ headlines: string[] }>("/articles/breaking");
    return raw.headlines;
  } catch {
    return MOCK_BREAKING_HEADLINES;
  }
}

export async function getLatestArticles(limit: number = 8): Promise<Article[]> {
  if (isMockEnabled()) {
    return MOCK_ARTICLES.slice(0, limit);
  }
  try {
    const raw = await apiClient<any[]>("/articles/latest", { params: { limit } });
    return raw.map(mapApiArticle);
  } catch {
    return MOCK_ARTICLES.slice(0, limit);
  }
}

export async function getTrendingArticles(limit: number = 10): Promise<Article[]> {
  if (isMockEnabled()) {
    const trending = MOCK_ARTICLES.filter((a) => a.isTrending).sort(
      (a, b) => (a.trendingRank || 99) - (b.trendingRank || 99)
    );
    if (trending.length >= limit) return trending.slice(0, limit);
    return [...trending, ...MOCK_ARTICLES.filter((a) => !a.isTrending)].slice(0, limit);
  }
  try {
    const raw = await apiClient<any[]>("/articles/trending", { params: { limit } });
    return raw.map(mapApiArticle);
  } catch {
    return MOCK_ARTICLES.slice(0, limit);
  }
}

export async function getEditorsPicks(): Promise<Article[]> {
  if (isMockEnabled()) {
    return MOCK_ARTICLES.filter((a) => a.isEditorsPick);
  }
  try {
    const raw = await apiClient<any[]>("/articles/editors-picks");
    return raw.map(mapApiArticle);
  } catch {
    return MOCK_ARTICLES.filter((a) => a.isEditorsPick);
  }
}

export async function getPhotoStoryFaces(): Promise<Article[]> {
  if (isMockEnabled()) {
    return MOCK_ARTICLES.filter((a) => a.isPhotoStory).slice(0, 4);
  }
  try {
    const raw = await apiClient<any[]>("/articles/photo-story");
    return raw.map(mapApiArticle);
  } catch {
    return MOCK_ARTICLES.filter((a) => a.isPhotoStory).slice(0, 4);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (isMockEnabled()) {
    const found = MOCK_ARTICLES.find((a) => a.slug === slug);
    return found || null;
  }
  try {
    const raw = await apiClient<any>(`/articles/${slug}`);
    return mapApiArticle(raw);
  } catch {
    const fallback = MOCK_ARTICLES.find((a) => a.slug === slug);
    return fallback || null;
  }
}

export async function getRelatedArticles(slug: string, limit: number = 3): Promise<Article[]> {
  const current = await getArticleBySlug(slug);
  const pool = MOCK_ARTICLES.filter((a) => a.slug !== slug);
  if (!current) return pool.slice(0, limit);

  const sameCategory = pool.filter((a) => a.categorySlug === current.categorySlug);
  if (sameCategory.length >= limit) return sameCategory.slice(0, limit);

  const remaining = pool.filter((a) => a.categorySlug !== current.categorySlug);
  return [...sameCategory, ...remaining].slice(0, limit);
}

export async function getCategoryArticles(
  categorySlug: string,
  subtopic?: string
): Promise<Article[]> {
  const normalizedCategory = categorySlug.toLowerCase();
  let list = MOCK_ARTICLES.filter(
    (a) => a.categorySlug.toLowerCase() === normalizedCategory
  );

  if (subtopic && subtopic !== "todos" && subtopic !== "all") {
    const normalizedSub = subtopic.toLowerCase();
    list = list.filter((a) => a.subtopic?.toLowerCase() === normalizedSub);
  }

  return list;
}

export async function searchArticles(
  query: string,
  options?: { category?: string; subtopic?: string; signal?: AbortSignal }
): Promise<SearchResult[]> {
  const cleanQ = query.trim().toLowerCase();
  if (cleanQ.length < 2) return [];

  if (isMockEnabled()) {
    await new Promise((resolve) => setTimeout(resolve, 80));

    if (options?.signal?.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    const filtered = MOCK_ARTICLES.filter((a) => {
      const matchCat =
        !options?.category ||
        options.category === "all" ||
        options.category === "todas" ||
        a.categorySlug === options.category;
      if (!matchCat) return false;

      const matchSub =
        !options?.subtopic ||
        options.subtopic === "all" ||
        options.subtopic === "todos" ||
        a.subtopic === options.subtopic;
      if (!matchSub) return false;

      return (
        a.title.toLowerCase().includes(cleanQ) ||
        a.excerpt.toLowerCase().includes(cleanQ) ||
        a.category.toLowerCase().includes(cleanQ) ||
        (a.subtopic && a.subtopic.toLowerCase().includes(cleanQ)) ||
        a.tags.some((t) => t.toLowerCase().includes(cleanQ))
      );
    });

    return filtered.map((article) => {
      let matchedField: "title" | "excerpt" | "tags" | "category" | "subtopic" = "title";
      let matchIndices: [number, number] | undefined;

      const titleIdx = article.title.toLowerCase().indexOf(cleanQ);
      if (titleIdx >= 0) {
        matchedField = "title";
        matchIndices = [titleIdx, titleIdx + cleanQ.length];
      } else if (article.excerpt.toLowerCase().indexOf(cleanQ) >= 0) {
        matchedField = "excerpt";
      } else if (article.category.toLowerCase().indexOf(cleanQ) >= 0) {
        matchedField = "category";
      } else if (article.subtopic && article.subtopic.toLowerCase().indexOf(cleanQ) >= 0) {
        matchedField = "subtopic";
      } else {
        matchedField = "tags";
      }

      return { article, matchedField, matchIndices };
    });
  }

  try {
    const raw = await apiClient<any[]>("/search", {
      params: { q: cleanQ, category: options?.category, subtopic: options?.subtopic },
      signal: options?.signal,
    });
    return raw.map((item) => ({
      article: mapApiArticle(item.article || item),
      matchedField: item.matchedField || "title",
      matchIndices: item.matchIndices,
    }));
  } catch (error) {
    if ((error as any)?.name === "AbortError") throw error;
    return [];
  }
}

export async function getLiveStats(): Promise<LiveStat[]> {
  return MOCK_LIVE_STATS;
}

export async function getSplitFlapItems(): Promise<SplitFlapItem[]> {
  return MOCK_SPLIT_FLAP_ITEMS;
}
