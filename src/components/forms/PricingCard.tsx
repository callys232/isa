"use client";

import Link from "next/link";

const PLANS = [
  {
    plan: "Free",
    price: "₦0/mo",
    color: "border-gray-200 bg-gray-50",
    badge: "",
    features: [
      "Farm Dashboard",
      "Browse Marketplace",
      "Plant Advisor AI",
      "Pest Detector AI",
      "Awareness Hub + Videos",
      "Onboarding Guide",
    ],
  },
  {
    plan: "Pro",
    price: "₦20,000/mo",
    color: "border-blue-200 bg-blue-50",
    badge: "Most Popular",
    features: [
      "Everything in Free",
      "Invoice Manager",
      "Farm Schedule",
      "Post Marketplace Listings",
      "All 4 AI tools",
      "Unlimited AI queries",
    ],
  },
  {
    plan: "Premium",
    price: "₦45,000/mo",
    color: "border-purple-200 bg-purple-50",
    badge: "Best Value",
    features: [
      "Everything in Pro",
      "Team access",
      "Satellite farm data",
      "Priority support",
      "Advanced analytics",
      "Upload videos",
    ],
  },
];

export default function PricingCard() {
  return (
    <div className="mt-3 space-y-2">
      {PLANS.map(p => (
        <div key={p.plan} className={`rounded-2xl border-2 p-4 transition-all duration-150 hover:shadow-md ${p.color}`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-gray-800 text-sm">{p.plan}</span>
              <span className="text-gray-600 text-xs">{p.price}</span>
            </div>
            {p.badge && (
              <span className="text-[10px] font-extrabold bg-green-600 text-white px-2 py-0.5 rounded-full">
                {p.badge}
              </span>
            )}
          </div>
          <ul className="space-y-1">
            {p.features.map(f => (
              <li key={f} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                <span className="text-green-500 flex-shrink-0 font-bold">✓</span>{f}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link href="/premuim"
        className="flex items-center justify-center gap-1.5 w-full py-2.5 mt-1
          bg-blue-600 text-white rounded-xl text-xs font-bold
          hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5
          transition-all active:scale-95 shadow-md">
        ⭐ See All Plans &amp; Upgrade →
      </Link>
    </div>
  );
}
