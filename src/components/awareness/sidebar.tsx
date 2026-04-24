"use client";
import { useState } from "react";
import { AwarenessArticle } from "@/src/types/awareness";

interface SidebarProps {
    articles: AwarenessArticle[];
    onFilter: (category: string | null) => void;
    saved: AwarenessArticle[];
}

export default function Sidebar({ articles, onFilter, saved }: SidebarProps) {
    const [filter, setFilter] = useState<string | null>(null);

    const highlights = articles.slice(0, 3);
    const trendingTags = ["Agriculture", "Technology", "Health", "Finance", "Climate"];

    const handleTagClick = (tag: string) => {
        const newFilter = filter === tag ? null : tag;
        setFilter(newFilter);
        onFilter(newFilter);
    };

    return (
        <aside className="space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Trending Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                        <span
                            key={tag}
                            onClick={() => handleTagClick(tag)}
                            className={`px-3 py-1 text-xs rounded-full cursor-pointer transition ${filter === tag
                                    ? "bg-blue-600 text-white"
                                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                                }`}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Highlights</h3>
                <ul className="space-y-3">
                    {highlights.map((h) => (
                        <li key={h.id} className="flex gap-3 items-center">
                            {h.imageUrl && (
                                <img
                                    src={h.imageUrl}
                                    alt={h.title}
                                    className="w-16 h-16 object-cover rounded-md"
                                />
                            )}
                            <div>
                                <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{h.title}</h4>
                                <a
                                    href={h.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Read →
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Recommended for You */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Recommended for You</h3>
                <ul className="space-y-2">
                    {articles.slice(3, 6).map((rec) => (
                        <li key={rec.id}>
                            <a
                                href={rec.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-800 hover:text-blue-600 transition"
                            >
                                {rec.title}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Saved Articles */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Saved Articles</h3>
                {saved.length === 0 ? (
                    <p className="text-sm text-gray-500">No saved articles yet.</p>
                ) : (
                    <ul className="space-y-2">
                        {saved.map((s) => (
                            <li key={s.id}>
                                <a
                                    href={s.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-800 hover:text-blue-600 transition"
                                >
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white rounded-lg shadow-md p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-700 mb-3">Stay Updated</h3>
                <p className="text-sm text-gray-600 mb-3">
                    Subscribe to get the latest awareness topics directly to your inbox.
                </p>
                <form className="flex flex-col gap-2">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white text-sm px-3 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Subscribe →
                    </button>
                </form>
            </div>
        </aside>
    );
}
