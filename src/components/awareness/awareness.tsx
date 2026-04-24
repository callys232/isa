"use client";
import { useEffect, useState } from "react";
import { AwarenessArticle } from "@/src/types/awareness";

// Modular components
import FeaturedArticleCard from "./featuredArticleCard";
import MainArticles from "./articles";
import Sidebar from "./sidebar";

// Optional: import mock data for fallback
import { mockAwarenessArticles } from "@/src/mocks/mockAwareness";

export default function AwarenessBlog() {
    const [articles, setArticles] = useState<AwarenessArticle[]>([]);
    const [saved, setSaved] = useState<AwarenessArticle[]>([]);
    const [filter, setFilter] = useState<string | null>(null);

    useEffect(() => {
        fetch("/api/awareness")
            .then(async (res) => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then((data: AwarenessArticle[]) => setArticles(data))
            .catch((err) => {
                console.error("Backend failed, using mock:", err);
                setArticles(mockAwarenessArticles); // ✅ proper fallback
            });
    }, []);

    // Filtering logic
    const filteredArticles = filter
        ? articles.filter(
            (a) => a.category?.toLowerCase() === filter.toLowerCase()
        )
        : articles;

    // Save/bookmark logic
    const handleSave = (article: AwarenessArticle) => {
        if (!saved.find((s) => s.id === article.id)) {
            setSaved((prev) => [...prev, article]);
        }
    };

    return (
        <section className="py-10 px-6 bg-gradient-to-b from-white via-blue-50 to-white">
            <div className="grid lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Featured Section */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {articles.slice(0, 3).map((a) => (
                            <FeaturedArticleCard key={a.id} article={a} />
                        ))}
                    </div>

                    {/* Main Articles */}
                    <MainArticles
                        articles={filteredArticles.slice(3)}
                        onSave={handleSave}
                    />
                </div>

                {/* Sidebar (Sticky on large screens) */}
                <aside className="hidden lg:block space-y-6 sticky top-6 self-start h-fit">
                    <Sidebar articles={articles} onFilter={setFilter} saved={saved} />
                </aside>
            </div>
        </section>
    );
}
