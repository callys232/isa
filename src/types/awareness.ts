// types/awareness.ts

/**
 * Base normalized article type used in your Awareness component.
 * All API responses will be mapped into this shape.
 */
export interface AwarenessArticle {
    id: string;                // unique identifier
    title: string;             // headline or post title
    description?: string;      // summary or excerpt
    url: string;               // link to full article/post
    imageUrl?: string;         // thumbnail or preview image
    source: string;            // source name (e.g., "BBC", "Reddit")
    publishedAt?: string;      // ISO date string
    author?: string;           // optional author/username
    category?: string;         // optional category (e.g., "Agriculture", "Tech")
    excerpt?: string;          // optional summary or excerpt
    // optional thumbnail or preview image
    postedAt?: string;


}

/**
 * NewsAPI.org response types
 */
export interface NewsAPIResponse {
    status: string;
    totalResults: number;
    articles: {
        source: { id: string | null; name: string };
        author: string | null;
        title: string;
        description: string | null;
        url: string;
        urlToImage: string | null;
        publishedAt: string;
        content: string | null;
    }[];
}

/**
 * NewsData.io response types
 */
export interface NewsDataResponse {
    status: string;
    results: {
        title: string;
        link: string;
        description: string;
        image_url?: string;
        pubDate?: string;
        source_id?: string;
        category?: string[];
        creator?: string[];
    }[];
}

/**
 * Google News RSS feed item type (after parsing XML to JSON)
 */
export interface GoogleNewsItem {
    title: string;
    link: string;
    pubDate?: string;
    description?: string;
    source?: string;
}

/**
 * Reddit API post type
 */
export interface RedditPost {
    id: string;
    title: string;
    url: string;
    thumbnail?: string;
    author: string;
    subreddit: string;
    created_utc: number;
    ups: number;
    num_comments: number;
}

/**
 * Twitter/X API tweet type
 */
export interface TwitterTweet {
    id: string;
    text: string;
    author_id: string;
    created_at: string;
    public_metrics?: {
        retweet_count: number;
        reply_count: number;
        like_count: number;
        quote_count: number;
    };
}

/**
 * Union type for raw API responses
 */
export type AwarenessAPIResponse =
    | NewsAPIResponse
    | NewsDataResponse
    | GoogleNewsItem[]
    | RedditPost[]
    | TwitterTweet[];

/**
 * Utility: Normalizer function signature
 * Each API response should be mapped into AwarenessArticle[]
 */
export type AwarenessNormalizer = (data: AwarenessAPIResponse) => AwarenessArticle[];
