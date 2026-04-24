"use client";

import { useState } from "react";
import { Listing } from "@/src/types/marketplace";

interface ListingDetailModalProps {
  listing: Listing;
  onClose: () => void;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= Math.round(rating) ? 'text-amber-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export default function ListingDetailModal({ listing, onClose }: ListingDetailModalProps) {
  const [qty, setQty] = useState(listing.minOrder);
  const [ordered, setOrdered] = useState(false);
  const [contactShown, setContactShown] = useState(false);

  const total = qty * listing.price;

  const handleOrder = () => {
    setOrdered(true);
    setTimeout(() => setOrdered(false), 3000);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Visual */}
        <div className={`relative h-48 bg-gradient-to-br ${listing.gradient} flex items-center justify-center rounded-t-2xl`}>
          <span className="text-8xl">{listing.emoji}</span>
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-gray-600 transition-all">
            ✕
          </button>
          <div className="absolute bottom-4 left-4 flex gap-2">
            {listing.escrow && <span className="bg-white/90 text-green-700 text-xs font-bold px-3 py-1 rounded-full">🔒 Escrow Protected</span>}
            {listing.verified && <span className="bg-white/90 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">✅ Verified Listing</span>}
          </div>
        </div>

        <div className="p-6">
          {/* Title & Price */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wide capitalize">{listing.category}</span>
              <h2 className="text-xl font-extrabold text-gray-800 mt-1">{listing.title}</h2>
            </div>
            <div className="text-right shrink-0">
              <div className="text-2xl font-extrabold text-green-700">₦{listing.price.toLocaleString()}</div>
              <div className="text-xs text-gray-500">per {listing.unit}</div>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-5">{listing.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {listing.tags.map(tag => (
              <span key={tag} className="bg-green-50 text-green-700 text-xs font-medium px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 rounded-xl p-4 mb-5 text-sm">
            <div><span className="text-gray-500 text-xs block">Min. Order</span><strong>{listing.minOrder} {listing.unit.split(' ')[0]}(s)</strong></div>
            <div><span className="text-gray-500 text-xs block">Available</span><strong>{listing.availableQty} units</strong></div>
            <div><span className="text-gray-500 text-xs block">Location</span><strong>{listing.location}, {listing.state}</strong></div>
            <div><span className="text-gray-500 text-xs block">Posted</span><strong>{listing.postedAt}</strong></div>
            <div><span className="text-gray-500 text-xs block">Rating</span>
              <div className="flex items-center gap-1"><StarRating rating={listing.rating} /><span className="text-xs text-gray-500">({listing.reviews})</span></div>
            </div>
            <div><span className="text-gray-500 text-xs block">Status</span>
              <span className="text-green-600 font-semibold capitalize">{listing.status}</span>
            </div>
          </div>

          {/* Seller Card */}
          <div className="border border-gray-200 rounded-xl p-4 mb-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                    {listing.seller.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 flex items-center gap-1">
                      {listing.seller.name}
                      {listing.seller.verified && <span className="text-blue-500 text-xs">✓</span>}
                    </div>
                    <div className="text-xs text-gray-500">{listing.seller.totalSales} sales · Member since {listing.seller.memberSince}</div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end"><StarRating rating={listing.seller.rating} /></div>
                <div className="text-xs text-gray-500">{listing.seller.rating}/5.0</div>
              </div>
            </div>
            {contactShown && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-sm text-gray-700">
                📞 <a href={`tel:${listing.seller.phone}`} className="text-blue-600 underline">{listing.seller.phone}</a>
                <span className="ml-3 text-gray-400">📍 {listing.seller.location}, {listing.seller.state}</span>
              </div>
            )}
          </div>

          {/* Order Section */}
          <div className="bg-green-50 rounded-xl p-4">
            <div className="flex items-center gap-4 mb-3">
              <div>
                <label className="text-xs text-gray-600 block mb-1">Quantity ({listing.unit.split(' ')[0]}s)</label>
                <input
                  type="number"
                  min={listing.minOrder}
                  max={listing.availableQty}
                  value={qty}
                  onChange={e => setQty(Math.max(listing.minOrder, Number(e.target.value)))}
                  className="w-28 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div className="text-right flex-1">
                <div className="text-xs text-gray-500">Total Estimate</div>
                <div className="text-2xl font-extrabold text-green-700">₦{total.toLocaleString()}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleOrder}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all
                  ${ordered ? 'bg-green-200 text-green-700' : 'bg-green-600 text-white hover:bg-green-700 shadow-md'}`}
              >
                {ordered ? '✅ Order Request Sent!' : listing.escrow ? '🔒 Buy with Escrow' : 'Place Order'}
              </button>
              <button
                onClick={() => setContactShown(!contactShown)}
                className="px-4 py-3 rounded-xl border-2 border-green-600 text-green-700 font-bold text-sm hover:bg-green-50 transition-all"
              >
                {contactShown ? 'Hide' : 'Contact'}
              </button>
            </div>
            {listing.escrow && (
              <p className="text-xs text-green-600 mt-2 text-center">
                🔒 Your payment is held securely until you confirm delivery
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
