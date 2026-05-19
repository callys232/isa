"use client";

import { useState } from "react";

const FEED = [
  { id: 1, icon: "📄", text: "Invoice #ISA-2026-0003 marked as Overdue",         time: "2h ago",  color: "bg-red-500",    href: "/invoice" },
  { id: 2, icon: "🌿", text: "AI Advisor: 3 crop recommendations generated",     time: "4h ago",  color: "bg-green-500",  href: "/ai-advisor" },
  { id: 3, icon: "🛒", text: "New marketplace listing: Tomatoes — Lagos",         time: "5h ago",  color: "bg-amber-500",  href: "/marketplace" },
  { id: 4, icon: "📡", text: "Sensor alert: Soil moisture low on Farm A",         time: "6h ago",  color: "bg-blue-500",   href: "/dashboard" },
  { id: 5, icon: "💰", text: "Invoice #ISA-2026-0001 paid — ₦195,750 received",   time: "1d ago",  color: "bg-green-500",  href: "/invoice" },
  { id: 6, icon: "🌦️", text: "Weather alert: Rain forecast for Kano weekend",    time: "1d ago",  color: "bg-sky-500",    href: "/ai-advisor" },
  { id: 7, icon: "📰", text: "New awareness article: Agro market trends Q2",      time: "2d ago",  color: "bg-purple-500", href: "/awareness" },
  { id: 8, icon: "🔬", text: "Pest alert: Fall Armyworm detected in SW states",   time: "2d ago",  color: "bg-red-500",    href: "/ai-advisor" },
];

export default function ActivityFeed() {
  const [visible, setVisible] = useState(5);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);
    setTimeout(() => { setVisible(FEED.length); setLoading(false); }, 600);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <h3 className="font-extrabold text-gray-800">Recent Activity</h3>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{FEED.length} events</span>
      </div>

      <div className="divide-y divide-gray-50">
        {FEED.slice(0, visible).map((item, i) => (
          <div key={item.id}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50/30 hover:pl-6
              transition-all duration-200 group cursor-pointer"
            style={{ animationDelay: `${i * 60}ms` }}>
            <div className="flex-shrink-0 flex flex-col items-center gap-1">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 ${item.color} group-hover:scale-125 transition-transform duration-200`} />
            </div>
            <span className="text-base flex-shrink-0">{item.icon}</span>
            <p className="text-xs text-gray-700 flex-1 leading-relaxed group-hover:text-blue-700 transition-colors duration-150">
              {item.text}
            </p>
            <span className="text-[10px] text-gray-400 flex-shrink-0 whitespace-nowrap">{item.time}</span>
          </div>
        ))}
      </div>

      {visible < FEED.length && (
        <div className="px-5 py-3 border-t border-gray-100">
          <button onClick={loadMore} disabled={loading}
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-gray-300 text-xs font-semibold text-gray-500
              hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-150 active:scale-95
              flex items-center justify-center gap-2">
            {loading ? (
              <>
                <span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                Loading…
              </>
            ) : (
              `Show ${FEED.length - visible} more`
            )}
          </button>
        </div>
      )}
    </div>
  );
}
