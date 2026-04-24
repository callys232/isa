"use client";

import { useState } from "react";
import { Listing } from "@/src/types/marketplace";

interface ListingCardProps {
  listing: Listing;
  onView: (listing: Listing) => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-3 h-3 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function ListingCard({ listing, onView }: ListingCardProps) {
  const [saved, setSaved] = useState(false);

  return (
    <div
      className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden
                 hover:shadow-xl hover:border-green-300 transition-all duration-300 group cursor-pointer"
      onClick={() => onView(listing)}
    >
      {/* Image / Visual Area */}
      <div className={`relative h-40 bg-gradient-to-br ${listing.gradient} flex items-center justify-center`}>
        <span className="text-6xl drop-shadow-sm">{listing.emoji}</span>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {listing.escrow && (
            <span className="bg-white/90 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              🔒 Escrow
            </span>
          )}
          {listing.verified && (
            <span className="bg-white/90 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              ✅ Verified
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(!saved); }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-all"
        >
          {saved ? '❤️' : '🤍'}
        </button>

        {/* Category badge */}
        <div className="absolute bottom-3 right-3">
          <span className="bg-black/30 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize">
            {listing.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm leading-snug mb-1 group-hover:text-green-700 transition-colors line-clamp-2">
          {listing.title}
        </h3>

        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl font-extrabold text-green-700">
            ₦{listing.price.toLocaleString()}
          </span>
          <span className="text-xs text-gray-500">/ {listing.unit}</span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>Min: {listing.minOrder} {listing.unit.split(' ')[0]}</span>
          <span>📦 {listing.availableQty} available</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {listing.tags.slice(0, 3).map(tag => (
            <span key={tag} className="bg-green-50 text-green-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div>
            <div className="flex items-center gap-1 text-xs font-semibold text-gray-700">
              {listing.seller.verified && <span className="text-blue-500">✓</span>}
              {listing.seller.name}
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <StarRating rating={listing.rating} />
              <span className="text-[10px] text-gray-400">({listing.reviews})</span>
            </div>
          </div>
          <span className="text-[11px] text-gray-400 flex items-center gap-1">
            📍 {listing.state}
          </span>
        </div>
      </div>
    </div>
  );
}
