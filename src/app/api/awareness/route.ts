import { NextResponse } from "next/server";
import { AwarenessArticle } from "@/src/types/awareness";
import { normalizeNewsAPI, normalizeNewsData } from "@/src/utils/normalizer";

export async function GET() {
    try {
        const newsApiKey  = process.env.NEWS_API_KEY;
        const newsDataKey = process.env.NEWSDATA_KEY;

        const [newsApiRes, newsDataRes] = await Promise.all([
            fetch(`https://newsapi.org/v2/top-headlines?language=en&pageSize=20&apiKey=${newsApiKey}`).then(r => r.json()),
            fetch(`https://newsdata.io/api/1/news?apikey=${newsDataKey}&language=en`).then(r => r.json()),
        ]);

        const articles: AwarenessArticle[] = [
            ...normalizeNewsAPI(newsApiRes),
            ...normalizeNewsData(newsDataRes),
        ];

        const selected = articles.sort(() => 0.5 - Math.random()).slice(0, 5);

        return NextResponse.json(selected);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch awareness topics" }, { status: 500 });
    }
}
