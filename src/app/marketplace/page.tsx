"use client";

import { useState, useMemo } from "react";
import { Listing, ListingCategory } from "@/src/types/marketplace";
import { mockListings } from "@/src/mocks/mockMarketplace";
import MarketplaceHero from "@/src/components/marketplace/MarketplaceHero";
import ListingGrid from "@/src/components/marketplace/ListingGrid";
import ListingDetailModal from "@/src/components/marketplace/ListingDetailModal";
import PostListingModal from "@/src/components/marketplace/PostListingModal";
import PlanGate from "@/src/components/ui/PlanGate";
import { usePlan } from "@/src/context/UserContext";

export default function MarketplacePage() {
  const [category, setCategory] = useState<ListingCategory | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selected, setSelected] = useState<Listing | null>(null);
  const [showPost, setShowPost] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const { isPremium } = usePlan();

  const filtered = useMemo(() => {
    let list = [...mockListings];
    if (category !== 'all') list = list.filter(l => l.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some(t => t.toLowerCase().includes(q)) ||
        l.state.toLowerCase().includes(q)
      );
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [category, search, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero + Search + Categories */}
      <MarketplaceHero
        onSearch={setSearch}
        onCategory={setCategory}
        activeCategory={category}
        totalListings={mockListings.length}
      />

      {/* Trust Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap justify-center gap-6 text-xs text-gray-600">
          {[['🔒', 'Escrow-Protected Payments'], ['✅', 'Verified Seller Profiles'], ['🚚', 'Nationwide Delivery Partners'], ['⭐', 'Buyer Ratings & Reviews'], ['📞', '24/7 Dispute Resolution']].map(([icon, label]) => (
            <span key={label as string} className="flex items-center gap-1.5 font-medium">
              <span>{icon}</span>{label}
            </span>
          ))}
        </div>
      </div>

      {/* Sell CTA Bar */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 py-3 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          <p className="text-white text-sm font-medium">
            🌾 Are you a farmer, distributor, or agro-dealer? <span className="font-bold">List your products for free.</span>
          </p>
          <button
            onClick={() => isPremium ? setShowPost(true) : setShowGate(true)}
            className="px-5 py-2 bg-white text-green-700 rounded-xl text-sm font-bold hover:bg-green-50 transition-all shadow-md shrink-0"
          >
            + Sell on Marketplace
          </button>
        </div>
      </div>

      {/* Listings */}
      <ListingGrid
        listings={filtered}
        onView={setSelected}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Listing Detail Modal */}
      {selected && <ListingDetailModal listing={selected} onClose={() => setSelected(null)} />}

      {/* Post Listing Modal — Premium only */}
      {showPost && <PostListingModal onClose={() => setShowPost(false)} />}

      {/* Plan gate modal for non-premium users trying to post */}
      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
          onClick={() => setShowGate(false)}>
          <div onClick={e => e.stopPropagation()} className="w-full max-w-md">
            <PlanGate require="premium" feature="Post a Marketplace Listing" description="List your farm produce, seeds, fertiliser, or equipment for buyers across Nigeria. Available on Premium and Admin plans.">
              <div className="h-40 bg-green-50 rounded-xl flex items-center justify-center text-4xl">🛒</div>
            </PlanGate>
          </div>
        </div>
      )}
    </div>
  );
}
