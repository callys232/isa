"use client";

import { useState } from "react";
import { ListingCategory } from "@/src/types/marketplace";

interface MarketplaceHeroProps {
  onSearch: (q: string) => void;
  onCategory: (cat: ListingCategory | 'all') => void;
  activeCategory: ListingCategory | 'all';
  totalListings: number;
}

const categories: { key: ListingCategory | 'all'; label: string; emoji: string }[] = [
  { key: 'all',        label: 'All',        emoji: '🏪' },
  { key: 'crops',      label: 'Crops',      emoji: '🌽' },
  { key: 'livestock',  label: 'Livestock',  emoji: '🐓' },
  { key: 'seeds',      label: 'Seeds',      emoji: '🌱' },
  { key: 'fertilizer', label: 'Fertilizer', emoji: '🧪' },
  { key: 'equipment',  label: 'Equipment',  emoji: '🚜' },
];

export default function MarketplaceHero({ onSearch, onCategory, activeCategory, totalListings }: MarketplaceHeroProps) {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 py-14 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          {totalListings} active listings across Nigeria
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
          Nigeria's #1 Agri Marketplace
        </h1>
        <p className="text-green-100 text-lg mb-8 max-w-2xl mx-auto">
          Buy and sell crops, livestock, seeds, fertilizer, and farm equipment. Secure escrow payments. Verified sellers.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl mx-auto mb-8">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            type="text"
            placeholder="Search crops, livestock, seeds, equipment..."
            className="flex-1 px-5 py-3 rounded-xl text-gray-800 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-white text-green-700 font-bold shadow-lg hover:bg-green-50 transition-all text-sm"
          >
            Search
          </button>
        </form>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat.key}
              onClick={() => onCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${activeCategory === cat.key
                  ? 'bg-white text-green-700 shadow-md scale-105'
                  : 'bg-white/20 text-white hover:bg-white/30'
                }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
