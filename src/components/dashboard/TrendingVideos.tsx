"use client";

import { useState } from "react";

const TRENDING = [
  {
    id: "t1", title: "Smart Irrigation: How IoT is Revolutionizing Nigerian Farming",
    channel: "AgroTech Africa", views: "234K", duration: "12:34", category: "Technology",
    thumb: "🌊", bg: "from-blue-500 to-cyan-600", timeAgo: "2 days ago", trending: true,
  },
  {
    id: "t2", title: "Cassava Boom 2026: Why Farmers Are Switching to High-Yield Varieties",
    channel: "Farm Intelligence TV", views: "189K", duration: "8:22", category: "Crops",
    thumb: "🌿", bg: "from-green-500 to-emerald-600", timeAgo: "4 days ago", trending: true,
  },
  {
    id: "t3", title: "Drone Spraying for Pest Control — A Game Changer for Large-Scale Farms",
    channel: "ISA AgriTech", views: "312K", duration: "15:07", category: "Technology",
    thumb: "🚁", bg: "from-indigo-500 to-blue-600", timeAgo: "1 day ago", trending: false,
  },
  {
    id: "t4", title: "Climate-Smart Agriculture: Adapting West African Farms to Rainfall Shifts",
    channel: "Green Harvest Network", views: "97K", duration: "10:45", category: "Climate",
    thumb: "🌦️", bg: "from-sky-500 to-blue-500", timeAgo: "5 days ago", trending: false,
  },
  {
    id: "t5", title: "Vertical Farming in Lagos: Urban AgriTech Takes Root",
    channel: "Urban Agro Nigeria", views: "421K", duration: "18:30", category: "Innovation",
    thumb: "🏗️", bg: "from-purple-500 to-indigo-600", timeAgo: "12 hours ago", trending: true,
  },
  {
    id: "t6", title: "Maize Futures Q2 2026: Price Forecast & Best Selling Windows",
    channel: "ISA Market Intelligence", views: "156K", duration: "7:15", category: "Markets",
    thumb: "📈", bg: "from-amber-400 to-orange-500", timeAgo: "3 days ago", trending: false,
  },
];

const CATEGORIES = ["All", "Technology", "Crops", "Markets", "Climate", "Innovation"];

type VideoItem = typeof TRENDING[0];

function VideoModal({ video, onClose }: { video: VideoItem; onClose: () => void }) {
  return (
    <>
      <style>{`
        @keyframes popIn { from{opacity:0;transform:scale(0.93)} to{opacity:1;transform:scale(1)} }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
          style={{ animation: "popIn 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
          onClick={e => e.stopPropagation()}
        >
          <div className={`h-56 bg-gradient-to-br ${video.bg} flex items-center justify-center relative`}>
            <span className="text-8xl">{video.thumb}</span>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                <span className="text-2xl ml-1">▶</span>
              </div>
            </div>
            <button onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-all active:scale-90">
              ✕
            </button>
            {video.trending && (
              <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                🔥 TRENDING
              </span>
            )}
          </div>
          <div className="p-5">
            <h3 className="font-extrabold text-gray-800 text-base leading-snug mb-1">{video.title}</h3>
            <p className="text-sm text-gray-500 mb-3">{video.channel}</p>
            <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
              <span>👁 {video.views} views</span>
              <span>⏱ {video.duration}</span>
              <span>🕐 {video.timeAgo}</span>
            </div>
            <a href="#" onClick={e => e.preventDefault()}
              className="flex items-center justify-center gap-2 w-full py-3 bg-red-600 text-white rounded-xl font-bold text-sm
                hover:bg-red-700 hover:shadow-lg transition-all duration-150 active:scale-95">
              ▶ Watch on YouTube
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function TrendingVideos() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selected, setSelected] = useState<VideoItem | null>(null);

  const filtered = activeCategory === "All"
    ? TRENDING
    : TRENDING.filter(v => v.category === activeCategory);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-800">🔥 Trending in AgriTech</h2>
          <span className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Live feed
          </span>
        </div>
        <a href="/awareness"
          className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors">
          View all AgriTech videos →
        </a>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1.5 flex-wrap mb-5">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95
              ${activeCategory === cat
                ? "bg-green-600 text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-600 hover:shadow-sm"}`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Video grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(video => (
          <div key={video.id}
            onClick={() => setSelected(video)}
            className="group bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden cursor-pointer
              hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
            {/* Thumbnail */}
            <div className={`relative h-40 bg-gradient-to-br ${video.bg} flex items-center justify-center`}>
              <span className="text-5xl transition-transform duration-200 group-hover:scale-110">{video.thumb}</span>
              {/* Play overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-200">
                  <span className="text-lg ml-0.5">▶</span>
                </div>
              </div>
              {/* Duration */}
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                {video.duration}
              </span>
              {/* Trending badge */}
              {video.trending && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                  🔥 TRENDING
                </span>
              )}
            </div>

            {/* Info */}
            <div className="p-3">
              <h3 className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2 group-hover:text-green-700 transition-colors duration-200">
                {video.title}
              </h3>
              <p className="text-[11px] text-gray-500 mt-1">{video.channel}</p>
              <div className="flex items-center justify-between mt-1.5 text-[10px] text-gray-400">
                <span>👁 {video.views} views</span>
                <span>{video.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && <VideoModal video={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
