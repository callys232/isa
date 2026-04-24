"use client";
import { AwarenessArticle } from "@/src/types/awareness";
import MainArticleCard from "./mainArticleCard";

interface MainArticlesProps {
    articles: AwarenessArticle[];
    onSave?: (article: AwarenessArticle) => void;
}

export default function MainArticles({ articles, onSave }: MainArticlesProps) {
    return (
        <section className="space-y-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4">Latest Articles</h2>
            <div className="grid md:grid-cols-2 gap-6">
                {articles.map((a) => (
                    <MainArticleCard key={a.id} article={a} onSave={onSave} />
                ))}
            </div>
        </section>
    );
}
