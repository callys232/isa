"use client";

import Link from "next/link";
import { mockListings } from "@/src/mocks/mockMarketplace";
import AnimatedBackground from "@/src/components/AnimatedBackground";

export default function MarketplacePreview() {
  const preview = mockListings.slice(0, 6);

  return (
    <section className="relative overflow-hidden py-16 px-6 bg-gradient-to-b from-green-50 to-white">
      <AnimatedBackground variant="green" density="light" opacity={0.08} />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full mb-2">
              🏪 Live Marketplace
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Buy & Sell Agri Products
            </h2>
            <p className="text-gray-500 mt-1 text-sm">
              Verified sellers · Escrow-protected payments · Nationwide delivery
            </p>
          </div>
          <Link href="/marketplace"
            className="px-5 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md whitespace-nowrap">
            View All Listings →
          </Link>
        </div>

        {/* Listing Cards Preview */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {preview.map(listing => (
            <Link key={listing.id} href="/marketplace"
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-300 transition-all group overflow-hidden">
              <div className={`h-24 bg-gradient-to-br ${listing.gradient} flex items-center justify-center`}>
                <span className="text-4xl">{listing.emoji}</span>
              </div>
              <div className="p-3">
                <p className="text-xs font-bold text-gray-800 truncate group-hover:text-green-700 transition-colors leading-tight">
                  {listing.title.split('—')[0].trim()}
                </p>
                <p className="text-green-700 font-extrabold text-sm mt-1">₦{listing.price.toLocaleString()}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{listing.unit}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-4 bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          {[['🔒', 'Escrow Protected'], ['✅', 'Verified Sellers'], ['🚚', 'Delivery Partners'], ['⭐', 'Buyer Reviews'], ['📞', 'Dispute Support']].map(([icon, label]) => (
            <span key={label as string} className="flex items-center gap-1.5 text-xs text-gray-600 font-medium">
              <span>{icon}</span>{label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
