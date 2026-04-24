import { normalizeNewsAPI, normalizeNewsData } from "./normalizer";
import { AwarenessArticle } from "@/src/types/awareness";

export async function fetchAwareness(): Promise<AwarenessArticle[]> {
    const [newsApiRes, newsDataRes] = await Promise.all([
        fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`).then(r => r.json()),
        fetch(`https://newsdata.io/api/1/news?apikey=${process.env.NEWSDATA_KEY}&language=en`).then(r => r.json()),
    ]);

    const articles: AwarenessArticle[] = [
        ...normalizeNewsAPI(newsApiRes),
        ...normalizeNewsData(newsDataRes),
    ];

    return articles.sort(() => 0.5 - Math.random()).slice(0, 10);
}
