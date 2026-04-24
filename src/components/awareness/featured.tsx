"use client";
import { AwarenessArticle } from "@/src/types/awareness";

interface FeaturedArticleCardProps {
    article: AwarenessArticle;
}

export default function FeaturedArticleCard({ article }: FeaturedArticleCardProps) {
    return (
        <div
            className="relative group rounded-xl overflow-hidden 
                 bg-blue-200 shadow-lg transition-transform duration-500 
                 hover:-translate-y-2 hover:shadow-2xl"
        >
            {/* Image */}
            <img
                src={article.imageUrl || "/placeholder.jpg"}
                alt={article.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div
                className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-700/40 to-transparent 
                   flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 
                   transition duration-500"
            >
                <h3 className="text-lg font-semibold text-white mb-2">{article.title}</h3>
                <p className="text-sm text-blue-50 line-clamp-2">{article.description}</p>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block bg-white text-blue-700 font-medium text-xs px-3 py-1.5 rounded-md 
                     hover:bg-blue-50 transition"
                >
                    Read More →
                </a>
            </div>

            {/* Suspended Badge */}
            <span
                className="absolute top-3 left-3 bg-white text-blue-700 font-semibold text-xs px-2 py-1 
                   rounded-md shadow-md"
            >
                Featured
            </span>
        </div>
    );
}
