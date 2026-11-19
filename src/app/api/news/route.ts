import { NextResponse } from "next/server";
import { MOCK_ARTICLES } from "@/mocks/articles";
import { NewsItem } from "@/types/article";

export const revalidate = 1800; // Cache 30 minutes in Next.js

// In-memory cache for extra resilience
let cachedData: { timestamp: number; items: NewsItem[] } | null = null;
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

const TARGET_KEYWORDS = [
  "fitness",
  "atividade fisica",
  "academia",
  "casa",
  "vestuario",
  "acessorios",
  "planejamento",
  "orientacao",
  "academias",
  "profissionais",
  "continuidade",
  "seguranca",
];

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function parseRssXml(xmlText: string): NewsItem[] {
  const items: NewsItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xmlText)) !== null) {
    const itemBlock = match[1];

    const titleMatch = /<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/i.exec(itemBlock);
    const linkMatch = /<link>([\s\S]*?)<\/link>/i.exec(itemBlock);
    const pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/i.exec(itemBlock);
    const descMatch = /<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/i.exec(itemBlock);

    const title = titleMatch ? titleMatch[1].trim() : "";
    const link = linkMatch ? linkMatch[1].trim() : "";
    const pubDate = pubDateMatch ? pubDateMatch[1].trim() : new Date().toISOString();
    let summary = descMatch ? descMatch[1].trim() : "";

    // Strip HTML tags from description
    summary = summary.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    if (summary.length > 200) {
      summary = summary.slice(0, 197) + "...";
    }

    if (!title) continue;

    // Filter by keywords (ignore accents)
    const normalizedContent = removeAccents(`${title} ${summary}`);
    const matchesKeyword = TARGET_KEYWORDS.some((kw) =>
      normalizedContent.includes(removeAccents(kw))
    );

    if (matchesKeyword) {
      items.push({
        title,
        date: pubDate,
        summary,
        link,
        source: "Agência Brasil",
        isLocalFallback: false,
      });
    }
  }

  return items;
}

export async function GET() {
  const now = Date.now();

  // Return in-memory cache if valid
  if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
    return NextResponse.json({
      success: true,
      cached: true,
      count: cachedData.items.length,
      items: cachedData.items,
    });
  }

  let matchedItems: NewsItem[] = [];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch("https://agenciabrasil.ebc.com.br/rss/ultimasnoticias/feed.xml", {
      signal: controller.signal,
      next: { revalidate: 1800 },
      headers: {
        "User-Agent": "MovimentoNaRotina/1.0 (+https://movimentonarotina.com)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const xml = await response.text();
      matchedItems = parseRssXml(xml);
    }
  } catch (err) {
    // If external fetch fails, we proceed to fill with local guides
    console.warn("Could not fetch Agência Brasil RSS, using fallback:", err);
  }

  // If fewer than 6 match, fill with our local guides
  if (matchedItems.length < 6) {
    const needed = 6 - matchedItems.length;
    const localFallbacks: NewsItem[] = MOCK_ARTICLES.slice(0, needed).map((art) => ({
      title: art.title,
      date: art.publishedAt,
      summary: art.excerpt,
      link: `/artigos/${art.slug}`,
      source: "Movimento na Rotina",
      isLocalFallback: true,
    }));

    matchedItems = [...matchedItems, ...localFallbacks];
  }

  // Update in-memory cache
  cachedData = {
    timestamp: now,
    items: matchedItems,
  };

  return NextResponse.json(
    {
      success: true,
      cached: false,
      count: matchedItems.length,
      credit: "Agência Brasil (EBC) & Movimento na Rotina",
      healthDisclaimer:
        "Converse com um profissional de saúde antes de mudar sua rotina de exercícios.",
      items: matchedItems,
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=1800, stale-while-revalidate=3600",
      },
    }
  );
}
