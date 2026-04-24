"use client";
import { AwarenessArticle } from "@/src/types/awareness";

interface HighlightCardProps {
    article: AwarenessArticle;
}

export default function HighlightCard({ article }: HighlightCardProps) {
    return (
        <li className="flex gap-3 items-center">
            {article.imageUrl && (
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-16 h-16 object-cover rounded-md"
                />
            )}
            <div>
                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{article.title}</h4>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:underline"
                >
                    Read →
                </a>
            </div>
        </li>
    );
}
