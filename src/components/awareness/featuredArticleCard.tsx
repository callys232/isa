"use client";
import { AwarenessArticle } from "@/src/types/awareness";

interface FeaturedArticleCardProps {
    article: AwarenessArticle;
}

export default function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
    return (
        <div className="relative group rounded-xl overflow-hidden shadow-lg transform transition duration-500 hover:-translate-y-1 hover:shadow-2xl">
            <img
                src={article.imageUrl || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition duration-500">
                <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                <p className="text-sm text-gray-200 line-clamp-2">{article.description}</p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-blue-600 text-white text-xs px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
                >
                    Read More →
                </a>
            </div>
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md shadow-md">
                Featured
            </span>
        </div>
    );
}
