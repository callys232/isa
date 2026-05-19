"use client";

import { useState } from "react";

const INSIGHTS = [
  {
    id: 1, category: "Prices", icon: "📈",
    text: "Maize prices up 12% this week in Lagos markets — optimal selling window open now.",
    action: "View Price Chart", color: "green",
  },
  {
    id: 2, category: "Weather", icon: "🌧️",
    text: "Heavy rain forecast for Kano this weekend (Sat–Sun). Delay irrigation and delay harvest.",
    action: "Full Forecast", color: "blue",
  },
  {
    id: 3, category: "Alert", icon: "🔴",
    text: "Fall Armyworm sightings reported in 3 southwest states — check your maize crops immediately.",
    action: "View Advisory", color: "red",
  },
  {
    id: 4, category: "Tip", icon: "💡",
    text: "Top-dress Nitrogen fertilizer on maize at knee height for 20–30% yield improvement.",
    action: "Learn More", color: "amber",
  },
];

const CAT_COLORS: Record<string, string> = {
  Prices: "bg-green-100 text-green-700",
  Weather: "bg-blue-100 text-blue-700",
  Alert: "bg-red-100 text-red-700",
  Tip: "bg-amber-100 text-amber-700",
};

const BORDER_MAP: Record<string, string> = {
  green: "border-green-300 hover:border-green-400",
  blue:  "border-blue-300 hover:border-blue-400",
  red:   "border-red-300 hover:border-red-400",
  amber: "border-amber-300 hover:border-amber-400",
};

export default function InsightPanel() {
  const [dismissed, setDismissed] = useState<number[]>([]);
  const active = INSIGHTS.filter(i => !dismissed.includes(i.id));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-fit">
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div>
          <p className="text-blue-200 text-[10px] font-bold uppercase tracking-widest">AI Insights</p>
          <h3 className="text-white font-extrabold text-sm mt-0.5">Today&apos;s Recommendations</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-300 text-[10px] font-semibold">Live</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {active.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-semibold">All caught up!</p>
            <p className="text-xs mt-0.5">No new insights right now.</p>
          </div>
        ) : (
          active.map((ins, i) => (
            <div key={ins.id}
              className={`group relative bg-white border rounded-xl p-3 transition-all duration-200
                hover:shadow-md hover:-translate-y-0.5 ${BORDER_MAP[ins.color]}`}
              style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-start gap-2">
                <span className="text-xl flex-shrink-0 mt-0.5">{ins.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${CAT_COLORS[ins.category]}`}>
                    {ins.category}
                  </span>
                  <p className="text-xs text-gray-700 leading-relaxed mt-1.5">{ins.text}</p>
                  <button className="mt-2 text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                    {ins.action} →
                  </button>
                </div>
                <button onClick={() => setDismissed(d => [...d, ins.id])}
                  className="opacity-0 group-hover:opacity-100 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500
                    flex items-center justify-center text-gray-400 text-[10px] transition-all duration-150 flex-shrink-0">
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50">
        <p className="text-[10px] text-gray-400 text-center">
          Powered by <span className="font-bold text-blue-600">ISA AI Engine</span> · Updated hourly
        </p>
      </div>
    </div>
  );
}
