"use client";

import { useState } from "react";

const HIGHLIGHTS = [
  {
    id: "h1", thumb: "🌽", bg: "from-green-400 to-emerald-600",
    title: "How to Space Maize for Maximum Yield",
    platform: "YouTube", platformBg: "bg-red-600",
    duration: "14:32", views: "89K", url: "https://www.youtube.com/@ISAPlatformNG",
  },
  {
    id: "h2", thumb: "🍅", bg: "from-red-400 to-orange-500",
    title: "Farmer Makes ₦2M from 1 Acre of Tomatoes",
    platform: "YouTube", platformBg: "bg-red-600",
    duration: "22:18", views: "312K", url: "https://www.youtube.com/@ISAPlatformNG",
  },
  {
    id: "h3", thumb: "😂", bg: "from-pink-400 to-rose-600",
    title: "Funniest Farm Moments of 2026 😂🚜",
    platform: "TikTok", platformBg: "bg-gray-900",
    duration: "0:58", views: "1.4M", url: "https://www.tiktok.com/@ISAPlatformNG",
  },
  {
    id: "h4", thumb: "🐛", bg: "from-amber-400 to-yellow-500",
    title: "Identify Fall Armyworm Before It Destroys Your Crops",
    platform: "YouTube", platformBg: "bg-red-600",
    duration: "11:45", views: "204K", url: "https://www.youtube.com/@ISAPlatformNG",
  },
  {
    id: "h5", thumb: "💧", bg: "from-sky-400 to-blue-600",
    title: "Drip Irrigation Setup Under ₦50,000",
    platform: "YouTube", platformBg: "bg-red-600",
    duration: "19:22", views: "267K", url: "https://www.youtube.com/@ISAPlatformNG",
  },
  {
    id: "h6", thumb: "📈", bg: "from-indigo-400 to-purple-600",
    title: "Best Time to Sell Maize — Market Secrets",
    platform: "YouTube", platformBg: "bg-red-600",
    duration: "18:04", views: "156K", url: "https://www.youtube.com/@ISAPlatformNG",
  },
];

export default function VideoHighlights() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-fit sticky top-24">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest">Curated for You</p>
          <h3 className="text-white font-extrabold text-sm mt-0.5">🔥 Video Highlights</h3>
        </div>
        <span className="flex items-center gap-1 text-[10px] font-semibold text-green-200 bg-white/15 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
          Live
        </span>
      </div>

      {/* List */}
      <div className="divide-y divide-gray-50">
        {HIGHLIGHTS.map((v, i) => (
          <div
            key={v.id}
            className={`flex gap-3 p-3 cursor-pointer transition-all duration-200 group
              ${active === v.id ? "bg-green-50 border-l-2 border-green-500" : "hover:bg-gray-50 border-l-2 border-transparent"}`}
            onClick={() => setActive(active === v.id ? null : v.id)}
          >
            {/* Thumbnail */}
            <div className={`relative flex-shrink-0 w-16 h-12 rounded-lg bg-gradient-to-br ${v.bg}
              flex items-center justify-center text-xl overflow-hidden
              transition-transform duration-200 group-hover:scale-105`}>
              {v.thumb}
              <span className="absolute bottom-0.5 right-0.5 text-[8px] bg-black/70 text-white px-1 rounded font-bold">
                {v.duration}
              </span>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-800 line-clamp-2 leading-snug
                group-hover:text-green-700 transition-colors duration-150">
                {v.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[9px] font-bold text-white px-1.5 py-0.5 rounded ${v.platformBg}`}>
                  {v.platform}
                </span>
                <span className="text-[10px] text-gray-400">👁 {v.views}</span>
              </div>

              {/* Expanded watch link */}
              {active === v.id && (
                <a
                  href={v.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={e => e.stopPropagation()}
                  className={`inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-white px-3 py-1 rounded-lg
                    ${v.platformBg} hover:opacity-90 transition-all active:scale-95`}
                >
                  ▶ Watch on {v.platform}
                </a>
              )}
            </div>

            {/* Rank */}
            <div className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-extrabold flex items-center justify-center
              ${i === 0 ? "bg-yellow-400 text-yellow-900" : i === 1 ? "bg-gray-300 text-gray-700" : i === 2 ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-500"}`}>
              {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <a
          href="https://www.youtube.com/@ISAPlatformNG"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2 bg-red-600 text-white text-xs font-bold rounded-xl
            hover:bg-red-700 hover:shadow-md transition-all active:scale-95"
        >
          ▶ View All on YouTube
        </a>
      </div>
    </aside>
  );
}
