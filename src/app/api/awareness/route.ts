import type { NextApiRequest, NextApiResponse } from "next";
import { AwarenessArticle } from "@/src/types/awareness";
import { normalizeNewsAPI, normalizeNewsData } from "@/src/utils/normalizer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const newsApiKey = process.env.NEWS_API_KEY;
        const newsDataKey = process.env.NEWSDATA_KEY;

        // Fetch multiple APIs in parallel
        const [newsApiRes, newsDataRes] = await Promise.all([
            fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${newsApiKey}`).then(r => r.json()),
            fetch(`https://newsdata.io/api/1/news?apikey=${newsDataKey}&language=en`).then(r => r.json()),
        ]);

        // Normalize into AwarenessArticle[]
        const articles: AwarenessArticle[] = [
            ...normalizeNewsAPI(newsApiRes),
            ...normalizeNewsData(newsDataRes),
        ];

        // Shuffle and pick 5
        const shuffled = articles.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);

        res.status(200).json(selected);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch awareness topics" });
    }
}
