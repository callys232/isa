"use client";
import { AwarenessArticle } from "@/src/types/awareness";

interface MainArticleCardProps {
    article: AwarenessArticle;
    onSave?: (article: AwarenessArticle) => void;
}

export default function MainArticleCard({ article, onSave }: MainArticleCardProps) {
    return (
        <article className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden border border-blue-100">
            {/* Image */}
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
            )}

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-full">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-3">{article.description}</p>

                {/* Meta */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{article.source}</span>
                    {article.publishedAt && (
                        <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                    )}
                </div>

                {/* Actions */}
                <div className="flex justify-between items-center mt-3">
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        Read More →
                    </a>
                    {onSave && (
                        <button
                            onClick={() => onSave(article)}
                            className="text-xs px-3 py-1 rounded-md border border-blue-300 text-blue-700 hover:bg-blue-50 transition"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </article>
    );
}
