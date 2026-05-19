"use client";

import Link from "next/link";
import { usePlan } from "@/src/context/UserContext";

interface Props {
  feature?: string;
  highlightPlan?: "pro" | "premium";
}

const PLANS = [
  {
    id:    "pro",
    label: "Pro",
    price: "₦20,000",
    period: "/month",
    color: "border-blue-400 bg-blue-50",
    btnCls: "bg-blue-600 hover:bg-blue-700",
    features: ["Invoice Manager","Farm Schedule","Post Marketplace Listings","All 4 AI tools","Unlimited AI queries"],
  },
  {
    id:    "premium",
    label: "Premium",
    price: "₦45,000",
    period: "/month",
    color: "border-purple-400 bg-purple-50",
    btnCls: "bg-purple-600 hover:bg-purple-700",
    badge: "Best Value",
    features: ["Everything in Pro","Team access","Satellite data","Priority support","Upload videos","Advanced analytics"],
  },
];

export default function UpgradeCard({ feature, highlightPlan = "pro" }: Props) {
  const { plan } = usePlan();

  if (plan !== "free") return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
      <p className="text-2xl mb-2">✅</p>
      <p className="font-extrabold text-green-800 text-sm">You have full access!</p>
      <p className="text-xs text-green-600 mt-1">Your <span className="capitalize font-bold">{plan}</span> plan includes all features.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-5 py-4 text-center relative overflow-hidden">
        <p className="text-white font-extrabold text-sm relative z-10">
          {feature ? `Unlock ${feature}` : "Upgrade Your Plan"}
        </p>
        <p className="text-blue-200 text-[10px] mt-0.5 relative z-10">Choose a plan that works for your farm</p>
      </div>

      <div className="p-4 space-y-3">
        {PLANS.map(p => (
          <div key={p.id} className={`rounded-2xl border-2 p-4 transition-all duration-150 ${p.color} ${highlightPlan === p.id ? "ring-2 ring-offset-1 " + (p.id === "pro" ? "ring-blue-400" : "ring-purple-400") : ""}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-gray-800 text-sm">{p.label}</span>
                {p.badge && <span className="text-[9px] font-extrabold bg-green-600 text-white px-1.5 py-0.5 rounded-full">{p.badge}</span>}
              </div>
              <span className="font-extrabold text-gray-800 text-sm">{p.price}<span className="text-gray-400 text-[10px] font-normal">{p.period}</span></span>
            </div>
            <ul className="space-y-1 mb-3">
              {p.features.map(f => (
                <li key={f} className="flex items-center gap-1.5 text-[11px] text-gray-700">
                  <span className="text-green-500 font-bold flex-shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <Link href="/premuim"
              className={`flex items-center justify-center w-full py-2 rounded-xl text-xs font-bold text-white transition-all active:scale-95 ${p.btnCls} shadow-sm`}>
              Get {p.label} →
            </Link>
          </div>
        ))}
      </div>

      <div className="px-4 pb-4">
        <p className="text-center text-[10px] text-gray-400">Cancel anytime · No long-term contract</p>
      </div>
    </div>
  );
}
