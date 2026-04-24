"use client";

import { Listing } from "@/src/types/marketplace";
import ListingCard from "./ListingCard";

interface ListingGridProps {
  listings: Listing[];
  onView: (listing: Listing) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function ListingGrid({ listings, onView, sortBy, onSortChange }: ListingGridProps) {
  if (listings.length === 0) {
    return (
      <section className="py-20 px-6 text-center bg-gray-50 min-h-[400px] flex flex-col items-center justify-center">
        <span className="text-6xl mb-4">🔍</span>
        <h3 className="text-xl font-bold text-gray-700 mb-2">No listings found</h3>
        <p className="text-gray-500 text-sm">Try a different search term or category filter.</p>
      </section>
    );
  }

  return (
    <section className="py-8 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <p className="text-sm text-gray-600">
            Showing <span className="font-bold text-gray-800">{listings.length}</span> listings
          </p>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Sort by:</label>
            <select
              value={sortBy}
              onChange={e => onSortChange(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {listings.map(listing => (
            <ListingCard key={listing.id} listing={listing} onView={onView} />
          ))}
        </div>
      </div>
    </section>
  );
}
