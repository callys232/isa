import { NewsAPIResponse, NewsDataResponse, AwarenessArticle } from "@/src/types/awareness";

export function normalizeNewsAPI(data: NewsAPIResponse): AwarenessArticle[] {
    return data.articles.map((a, idx) => ({
        id: a.url || `newsapi-${idx}`,
        title: a.title,
        description: a.description || undefined,
        url: a.url,
        imageUrl: a.urlToImage || undefined,
        source: a.source.name,
        publishedAt: a.publishedAt,
        author: a.author || undefined,
    }));
}

export function normalizeNewsData(data: NewsDataResponse): AwarenessArticle[] {
    return data.results.map((a, idx) => ({
        id: a.link || `newsdata-${idx}`,
        title: a.title,
        description: a.description,
        url: a.link,
        imageUrl: a.image_url || undefined,
        source: a.source_id || "NewsData.io",
        publishedAt: a.pubDate,
        author: a.creator?.[0] || undefined,
        category: a.category?.[0],
    }));
}
