"use client";

import { useState, useMemo } from "react";
import AnimatedBackground from "@/src/components/AnimatedBackground";

// ── Types ─────────────────────────────────────────────────────────────
type Platform = "youtube" | "tiktok" | "facebook";
type VideoCategory = "All" | "Techniques" | "Pest Control" | "Comedy" | "Market Tips" | "Success Stories" | "Equipment" | "Business" | "News";

interface AgroVideo {
  id: string;
  title: string;
  description: string;
  category: Exclude<VideoCategory, "All">;
  platform: Platform;
  externalUrl: string;
  // YouTube video ID — replace with your real video IDs from YouTube Studio.
  // Every embedded play is counted as a YouTube view and generates ad revenue for your channel.
  youtubeId?: string;
  thumb: string;
  thumbBg: string;
  duration: string;
  views: string;
  likes: string;
  postedAt: string;
  channel: string;
  featured?: boolean;
  isNew?: boolean;
  isPremium?: boolean;
}

// ── Mock video data ───────────────────────────────────────────────────
const VIDEOS: AgroVideo[] = [
  // ⚠️ Replace each youtubeId with your real YouTube video ID (found in YouTube Studio > Videos).
  // Embedded plays count as real views and generate ad revenue for your channel automatically.
  {
    id: "v1", title: "How to Space Your Maize for Maximum Yield — Complete Guide",
    description: "Learn the optimal row and plant spacing for maize farming in Nigeria. Get 20–30% more yield with proper spacing techniques.",
    category: "Techniques", platform: "youtube",
    externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    youtubeId: "PASTE_YOUR_VIDEO_ID_HERE", // e.g. "dQw4w9WgXcQ"
    thumb: "🌽", thumbBg: "from-green-400 to-emerald-600", duration: "14:32", views: "89K", likes: "4.2K",
    postedAt: "2026-05-10", channel: "ISA AgroTech", featured: true,
  },
  {
    id: "v2", title: "Farmer Makes ₦2M from 1 Acre of Tomatoes in 90 Days",
    description: "Adaeze from Anambra shares her complete playbook — from seed selection to market day.",
    category: "Success Stories", platform: "youtube",
    externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    youtubeId: "PASTE_YOUR_VIDEO_ID_HERE",
    thumb: "🍅", thumbBg: "from-red-400 to-orange-500", duration: "22:18", views: "312K", likes: "18.7K",
    postedAt: "2026-05-05", channel: "ISA Farm Stories",
  },
  {
    id: "v3", title: "Funniest Farm Moments of 2026 😂🚜 #AgroComedy",
    description: "When the tractor won't start, when the goats escape, and when it rains on harvest day. Nigerian farmers know the struggle!",
    category: "Comedy", platform: "tiktok", externalUrl: "https://www.tiktok.com/@ISAPlatformNG",
    thumb: "😂", thumbBg: "from-pink-400 to-rose-600", duration: "0:58", views: "1.4M", likes: "92K",
    postedAt: "2026-05-15", channel: "ISA Comedy Farm", isNew: true,
  },
  {
    id: "v4", title: "How to Identify Fall Armyworm Before It Destroys Your Crops",
    description: "Early detection signs, field scouting checklist, and organic + chemical treatment options for Nigerian farmers.",
    category: "Pest Control", platform: "youtube",
    externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    youtubeId: "PASTE_YOUR_VIDEO_ID_HERE",
    thumb: "🐛", thumbBg: "from-amber-400 to-yellow-600", duration: "11:45", views: "204K", likes: "9.8K",
    postedAt: "2026-04-28", channel: "ISA Pest Watch",
  },
  {
    id: "v5", title: "Best Time to Sell Your Maize for Maximum Profit — Market Secrets",
    description: "Post-harvest price cycles explained. When to hold, when to sell, and how to find the best-paying offtakers.",
    category: "Market Tips", platform: "youtube",
    externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    youtubeId: "PASTE_YOUR_VIDEO_ID_HERE",
    thumb: "📈", thumbBg: "from-blue-400 to-indigo-600", duration: "18:04", views: "156K", likes: "7.3K",
    postedAt: "2026-04-20", channel: "ISA Market Intelligence",
  },
  {
    id: "v6", title: "25-Year-Old Nigerian Farmer Buys First Tractor — His Journey",
    description: "Emeka from Benue started with ₦50,000 and scaled to owning his own tractor. A story of discipline and vision.",
    category: "Success Stories", platform: "facebook", externalUrl: "https://www.facebook.com/ISAPlatformNG",
    thumb: "🚜", thumbBg: "from-green-500 to-teal-600", duration: "28:13", views: "445K", likes: "31K",
    postedAt: "2026-04-15", channel: "ISA Farm Stories",
  },
  {
    id: "v7", title: "NPK Fertilizer Complete Guide: Ratios, Application & Timing",
    description: "Everything you need to know about NPK — what 15-15-15 means, when to apply, and how much to use per hectare.",
    category: "Techniques", platform: "youtube",
    externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    youtubeId: "PASTE_YOUR_VIDEO_ID_HERE",
    thumb: "🧪", thumbBg: "from-teal-400 to-cyan-600", duration: "16:50", views: "178K", likes: "8.9K",
    postedAt: "2026-04-10", channel: "ISA AgroTech",
  },
  {
    id: "v8", title: "Day in the Life of a Nigerian Farmer ☀️🌧️ (Part 7)",
    description: "From 5am watering to market negotiations — unfiltered farm life in Oyo State.",
    category: "Comedy", platform: "tiktok", externalUrl: "https://www.tiktok.com/@ISAPlatformNG",
    thumb: "🌅", thumbBg: "from-orange-300 to-amber-500", duration: "2:34", views: "876K", likes: "67K",
    postedAt: "2026-05-17", channel: "ISA Farm Life", isNew: true,
  },
  {
    id: "v9", title: "How to Register Your Farm Business and Access Government Grants",
    description: "Step-by-step guide to CAC registration, NIRSAL loans, and Central Bank agriculture intervention funds.",
    category: "Business", platform: "youtube", externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    thumb: "📊", thumbBg: "from-purple-400 to-indigo-600", duration: "21:07", views: "93K", likes: "5.1K",
    postedAt: "2026-04-05", channel: "ISA AgriFinance",
  },
  {
    id: "v10", title: "Drip Irrigation Setup for Small Farms — Under ₦50,000 Budget",
    description: "Practical irrigation guide for plots under 1 hectare. DIY setup with readily available materials.",
    category: "Equipment", platform: "youtube", externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    thumb: "💧", thumbBg: "from-sky-400 to-blue-600", duration: "19:22", views: "267K", likes: "12.4K",
    postedAt: "2026-03-30", channel: "ISA AgroTech",
  },
  {
    id: "v11", title: "Cassava Processing to Garri: From Field to ₦500/kg",
    description: "Value chain walkthrough — harvesting, processing, packaging, and selling at premium prices.",
    category: "Business", platform: "facebook", externalUrl: "https://www.facebook.com/ISAPlatformNG",
    thumb: "🥔", thumbBg: "from-amber-500 to-yellow-500", duration: "32:40", views: "388K", likes: "24.5K",
    postedAt: "2026-03-25", channel: "ISA Agro Business",
  },
  {
    id: "v12", title: "Agro News: New Government Policy on Fertilizer Subsidies 2026",
    description: "Breaking down the new Federal Government fertiliser subsidy programme and how farmers can apply.",
    category: "News", platform: "youtube", externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    thumb: "📰", thumbBg: "from-gray-400 to-slate-600", duration: "8:15", views: "54K", likes: "2.8K",
    postedAt: "2026-05-18", channel: "ISA Agro News", isNew: true,
  },
  {
    id: "v13", title: "Soil pH Testing at Home — No Lab Needed 🧪",
    description: "Use readily available indicators to test your soil pH at home. Accurate results in 5 minutes.",
    category: "Techniques", platform: "tiktok", externalUrl: "https://www.tiktok.com/@ISAPlatformNG",
    thumb: "🌍", thumbBg: "from-lime-400 to-green-500", duration: "1:12", views: "2.1M", likes: "145K",
    postedAt: "2026-05-12", channel: "ISA TipTok", isNew: true,
  },
  {
    id: "v14", title: "How Market Women Control Farm Prices (And How to Beat Them!)",
    description: "The secrets of farmgate vs market pricing — and negotiation tactics every farmer must know.",
    category: "Market Tips", platform: "youtube", externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    thumb: "🏪", thumbBg: "from-rose-400 to-pink-600", duration: "24:38", views: "421K", likes: "29.3K",
    postedAt: "2026-03-15", channel: "ISA Market Intelligence",
  },
  {
    id: "v15", title: "When the Rains Come Early 😂 — Every Farmer's Nightmare",
    description: "A comedic take on what happens when your perfectly planned harvest meets unexpected early rains.",
    category: "Comedy", platform: "tiktok", externalUrl: "https://www.tiktok.com/@ISAPlatformNG",
    thumb: "🌧️", thumbBg: "from-slate-400 to-blue-500", duration: "1:44", views: "3.2M", likes: "198K",
    postedAt: "2026-05-08", channel: "ISA Comedy Farm",
  },
  {
    id: "v16", title: "Mini Tractor vs Manual Labour: Real Cost Comparison for Nigerian Farmers",
    description: "A data-driven breakdown of equipment vs labour costs across cassava, maize, and yam farming.",
    category: "Equipment", platform: "youtube", externalUrl: "https://www.youtube.com/@ISAPlatformNG",
    thumb: "⚙️", thumbBg: "from-zinc-400 to-gray-600", duration: "27:05", views: "112K", likes: "6.7K",
    postedAt: "2026-03-10", channel: "ISA AgroTech",
  },
];

// ── Platform config ───────────────────────────────────────────────────
const PLATFORM = {
  youtube:  { label: "YouTube",  icon: "▶", bg: "bg-red-600",    text: "text-white", border: "border-red-500",   hover: "hover:bg-red-700" },
  tiktok:   { label: "TikTok",   icon: "♪", bg: "bg-gray-900",   text: "text-white", border: "border-gray-700",  hover: "hover:bg-gray-800" },
  facebook: { label: "Facebook", icon: "f", bg: "bg-blue-600",   text: "text-white", border: "border-blue-500",  hover: "hover:bg-blue-700" },
};

const CATEGORIES: VideoCategory[] = ["All","Techniques","Pest Control","Comedy","Market Tips","Success Stories","Equipment","Business","News"];

const CAT_EMOJI: Record<string, string> = {
  "Techniques":"🌱","Pest Control":"🐛","Comedy":"😄","Market Tips":"💰",
  "Success Stories":"🌟","Equipment":"🚜","Business":"📊","News":"📰",
};

const CHANNEL_STATS = [
  { platform: "youtube"  as Platform, followers: "84.2K", label: "Subscribers", color: "text-red-400",  actionLabel: "Subscribe",     icon: "▶" },
  { platform: "tiktok"   as Platform, followers: "214K",  label: "Followers",    color: "text-pink-400", actionLabel: "Follow",        icon: "♪" },
  { platform: "facebook" as Platform, followers: "156K",  label: "Followers",    color: "text-blue-400", actionLabel: "Follow Page",   icon: "f" },
];

// ── Sub-components ────────────────────────────────────────────────────
function PlatformBadge({ platform }: { platform: Platform }) {
  const p = PLATFORM[platform];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full ${p.bg} ${p.text}`}>
      <span className="font-bold">{p.icon}</span>{p.label}
    </span>
  );
}

function VideoCard({ video, onExpand }: { video: AgroVideo; onExpand: (v: AgroVideo) => void }) {
  const p = PLATFORM[video.platform];
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden
      hover:shadow-xl hover:-translate-y-1.5 hover:border-blue-200 transition-all duration-200 cursor-pointer"
      onClick={() => onExpand(video)}>

      {/* Thumbnail */}
      <div className={`relative h-44 bg-gradient-to-br ${video.thumbBg} flex items-center justify-center overflow-hidden`}>
        <span className="text-6xl transition-transform duration-300 group-hover:scale-110 select-none">
          {video.thumb}
        </span>

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl
            transform scale-90 group-hover:scale-100 transition-transform duration-200">
            <span className="text-xl ml-1">▶</span>
          </div>
        </div>

        {/* Duration */}
        <span className="absolute bottom-2 right-2 bg-black/75 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </span>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
          <PlatformBadge platform={video.platform} />
          {video.isNew && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-green-500 text-white animate-pulse">NEW</span>
          )}
        </div>

        {/* Category */}
        <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/90 text-gray-700">
          {CAT_EMOJI[video.category]} {video.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-800 text-sm leading-snug line-clamp-2
          group-hover:text-blue-700 transition-colors duration-200 mb-1.5">
          {video.title}
        </h3>
        <p className="text-[11px] text-gray-500 line-clamp-2 mb-3 leading-relaxed">{video.description}</p>

        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-3">
          <span className="font-semibold text-gray-600 truncate">{video.channel}</span>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span>👁 {video.views}</span>
            <span>❤️ {video.likes}</span>
          </div>
        </div>

        {/* Watch button */}
        <a
          href={video.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          className={`flex items-center justify-center gap-1.5 w-full py-2 rounded-xl text-xs font-bold
            ${p.bg} ${p.text} ${p.hover} transition-all duration-150 active:scale-95 shadow-sm hover:shadow-md`}
        >
          <span>{p.icon}</span> Watch on {p.label}
        </a>
      </div>
    </div>
  );
}

function FeaturedCard({ video, onExpand }: { video: AgroVideo; onExpand: (v: AgroVideo) => void }) {
  const p = PLATFORM[video.platform];
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${video.thumbBg} shadow-xl cursor-pointer group`}
      onClick={() => onExpand(video)}>
      <AnimatedBackground variant="green" density="light" className="opacity-30" />
      <div className="relative z-10 p-8 flex flex-col md:flex-row gap-8 items-center">

        {/* Thumb + play button */}
        <div className="relative flex-shrink-0">
          <div className="text-8xl md:text-9xl transition-transform duration-300 group-hover:scale-105 select-none">
            {video.thumb}
          </div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-2xl
              transform scale-90 group-hover:scale-100 transition-transform duration-200">
              <span className="text-2xl ml-1 text-gray-800">▶</span>
            </div>
          </div>
        </div>

        <div className="flex-1 text-white">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-xs font-extrabold bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full">⭐ FEATURED THIS WEEK</span>
            <PlatformBadge platform={video.platform} />
            <span className="text-xs font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
              {CAT_EMOJI[video.category]} {video.category}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3 group-hover:text-white/90 transition-colors">
            {video.title}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-xl">{video.description}</p>
          <div className="flex items-center gap-4 text-white/70 text-xs mb-5">
            <span>👁 {video.views} views</span>
            <span>❤️ {video.likes} likes</span>
            <span>⏱ {video.duration}</span>
            <span>📅 {video.postedAt}</span>
          </div>
          <div className="flex gap-3 flex-wrap" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => onExpand(video)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm shadow-lg
                bg-white text-gray-900 hover:bg-gray-100 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95"
            >
              ▶ Play Video
            </button>
            <a href={video.externalUrl} target="_blank" rel="noopener noreferrer"
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm shadow-lg
                ${p.bg} ${p.text} ${p.hover} hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95`}>
              <span>{p.icon}</span> Open on {p.label}
            </a>
            <a href="https://www.youtube.com/@ISAPlatformNG" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm
                bg-white/20 text-white hover:bg-white/30 border border-white/30 hover:shadow-md transition-all active:scale-95">
              🔔 Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoDetailModal({ video, onClose }: { video: AgroVideo; onClose: () => void }) {
  const p = PLATFORM[video.platform];
  const canEmbed = video.platform === "youtube" && video.youtubeId && !video.youtubeId.startsWith("PASTE");

  // YouTube embed URL — plays ON this platform, but every view + ad impression
  // is counted by YouTube and ad revenue flows to your YouTube channel.
  // ?rel=0          — no competitor videos in end-screen
  // ?modestbranding — smaller YouTube logo
  // ?autoplay=1     — starts immediately when modal opens
  const embedUrl = canEmbed
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`
    : null;

  return (
    <>
      <style>{`@keyframes modalPop{from{opacity:0;transform:scale(0.95)}to{opacity:1;transform:scale(1)}}`}</style>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
        onClick={onClose}
      >
        <div
          className="bg-black rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden"
          style={{ animation: "modalPop 0.2s cubic-bezier(0.175,0.885,0.32,1.275)" }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── Video player area ── */}
          <div className="relative w-full bg-black" style={{ paddingTop: "56.25%" /* 16:9 */ }}>

            {canEmbed ? (
              // ✅ YouTube iframe — views + ads counted by YouTube, revenue to your channel
              <iframe
                className="absolute inset-0 w-full h-full rounded-t-2xl"
                src={embedUrl!}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              // Fallback for TikTok, Facebook, or missing YouTube ID
              <div className={`absolute inset-0 bg-gradient-to-br ${video.thumbBg} flex flex-col items-center justify-center gap-4`}>
                <span className="text-8xl select-none">{video.thumb}</span>
                {video.platform === "youtube" && (
                  <p className="text-white/70 text-xs text-center px-8 max-w-sm">
                    Add your YouTube video ID to <code className="bg-white/20 px-1 rounded">youtubeId</code> in the mock data to embed this video directly.
                  </p>
                )}
              </div>
            )}

            {/* Close button — always on top */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80
                flex items-center justify-center text-white text-lg transition-all active:scale-90"
            >
              ✕
            </button>

            {/* Platform badge */}
            <div className="absolute top-3 left-3 z-10">
              <PlatformBadge platform={video.platform} />
            </div>
          </div>

          {/* ── Info bar ── */}
          <div className="p-5 bg-gray-950 text-white">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <span className="text-[10px] font-bold bg-white/10 text-white/70 px-2 py-0.5 rounded-full">
                    {CAT_EMOJI[video.category]} {video.category}
                  </span>
                  <span className="text-[10px] text-white/50">{video.channel}</span>
                  <span className="text-[10px] text-white/40">· {video.postedAt}</span>
                  {video.isNew && (
                    <span className="text-[10px] font-extrabold bg-green-500 text-white px-2 py-0.5 rounded-full animate-pulse">NEW</span>
                  )}
                </div>
                <h3 className="font-extrabold text-white text-base leading-snug">{video.title}</h3>
              </div>
            </div>

            <p className="text-sm text-white/60 leading-relaxed mb-4 line-clamp-2">{video.description}</p>

            <div className="flex items-center gap-4 text-xs text-white/50 mb-4">
              <span>👁 {video.views} views</span>
              <span>❤️ {video.likes} likes</span>
              <span>⏱ {video.duration}</span>
            </div>

            {/* Action row */}
            <div className="flex gap-2 flex-wrap">
              {/* For non-YouTube or missing ID: open on platform */}
              {!canEmbed && (
                <a
                  href={video.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-sm shadow-md
                    ${p.bg} ${p.text} ${p.hover} hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95`}
                >
                  <span>{p.icon}</span> Watch on {p.label}
                </a>
              )}


              {/* Subscribe CTA */}
              <a
                href="https://www.youtube.com/@ISAPlatformNG"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-sm
                  bg-red-600 text-white hover:bg-red-700 hover:shadow-md transition-all active:scale-95"
              >
                🔔 Subscribe
              </a>
            </div>

            <p className="text-[10px] text-white/30 mt-3 text-center">
              {canEmbed
                ? "This video plays here on ISA — views & ad revenue are counted by YouTube for our channel."
                : "Watching on the platform supports ISA. Like, share & subscribe to keep content free."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────
export default function VideoBlogHub() {
  const [category, setCategory] = useState<VideoCategory>("All");
  const [platform, setPlatform] = useState<Platform | "all">("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<AgroVideo | null>(null);
  const [showAll, setShowAll] = useState(false);

  const featured = VIDEOS.find(v => v.featured)!;

  const filtered = useMemo(() => {
    let list = VIDEOS.filter(v => !v.featured);
    if (category !== "All") list = list.filter(v => v.category === category);
    if (platform !== "all") list = list.filter(v => v.platform === platform);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(v =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q) ||
        v.channel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [category, platform, search]);

  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <div className="py-12 px-6 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* ── Channel Hero ── */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl overflow-hidden">
          <AnimatedBackground variant="blue" density="medium" />
          <div className="relative z-10 p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-3 border border-white/20">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  Live Across 3 Platforms
                </div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">ISA Agro Media Hub</h2>
                <p className="text-white/70 text-sm max-w-lg">
                  Farm techniques, market intelligence, success stories, and comedy — free for every Nigerian farmer. Watch on your favourite platform and help us grow!
                </p>
              </div>

              {/* Channel stats */}
              <div className="flex flex-wrap gap-3">
                {CHANNEL_STATS.map(s => (
                  <div key={s.platform} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 text-center
                    hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-default min-w-[110px]">
                    <span className={`text-2xl font-extrabold ${s.color}`}>{s.followers}</span>
                    <p className="text-white/60 text-[10px] mt-0.5">{s.label}</p>
                    <a href={
                      s.platform === "youtube" ? "https://www.youtube.com/@ISAPlatformNG"
                      : s.platform === "tiktok" ? "https://www.tiktok.com/@ISAPlatformNG"
                      : "https://www.facebook.com/ISAPlatformNG"
                    } target="_blank" rel="noopener noreferrer"
                      className={`mt-2 flex items-center justify-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg
                        ${PLATFORM[s.platform].bg} ${PLATFORM[s.platform].text} ${PLATFORM[s.platform].hover}
                        transition-all active:scale-95`}>
                      {PLATFORM[s.platform].icon} {s.actionLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue message */}
            <div className="mt-6 bg-white/5 border border-white/15 rounded-xl px-5 py-3 flex flex-wrap items-center gap-3">
              <span className="text-yellow-400 text-lg">💡</span>
              <p className="text-white/80 text-xs leading-relaxed">
                <strong className="text-white">Support us for free:</strong> Watching our YouTube videos, liking, commenting, and subscribing earns us ad revenue that funds free agro education for all Nigerian farmers. No payment needed — just a click!
              </p>
            </div>
          </div>
        </div>

        {/* ── Featured Video ── */}
        <FeaturedCard video={featured} onExpand={setSelected} />

        {/* ── Filters ── */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative max-w-md">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search videos, topics, channels…"
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white
                focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all" />
          </div>

          {/* Category filter */}
          <div className="flex gap-1.5 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95
                  ${category === cat
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-white border border-gray-200 text-gray-600 hover:border-green-300 hover:text-green-700 hover:shadow-sm"}`}>
                {cat === "All" ? "🎬 All" : `${CAT_EMOJI[cat]} ${cat}`}
              </button>
            ))}
          </div>
        </div>

        {/* ── Video Grid ── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <div className="text-5xl mb-3">🎬</div>
            <p className="font-semibold">No videos found</p>
            <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {visible.map(v => <VideoCard key={v.id} video={v} onExpand={setSelected} />)}
            </div>

            {!showAll && filtered.length > 6 && (
              <div className="text-center pt-2">
                <button onClick={() => setShowAll(true)}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold text-sm
                    hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all active:scale-95">
                  Show {filtered.length - 6} More Videos
                </button>
              </div>
            )}

            <p className="text-xs text-gray-400 text-right">
              Showing {visible.length} of {filtered.length} video{filtered.length !== 1 ? "s" : ""}
            </p>
          </>
        )}

        {/* ── Subscribe CTA strip ── */}
        <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-6 text-white relative overflow-hidden">
          <AnimatedBackground variant="green" density="light" className="opacity-30" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold mb-1">Never Miss a Farm Video 🌾</h3>
              <p className="text-green-100 text-sm">New videos every week — techniques, prices, comedy, and farm news. Free forever.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(["youtube","tiktok","facebook"] as Platform[]).map(pl => (
                <a key={pl} href={
                  pl === "youtube" ? "https://www.youtube.com/@ISAPlatformNG"
                  : pl === "tiktok" ? "https://www.tiktok.com/@ISAPlatformNG"
                  : "https://www.facebook.com/ISAPlatformNG"
                } target="_blank" rel="noopener noreferrer"
                  className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold shadow-md
                    ${PLATFORM[pl].bg} ${PLATFORM[pl].text} ${PLATFORM[pl].hover}
                    hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95`}>
                  <span>{PLATFORM[pl].icon}</span>{PLATFORM[pl].label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selected && <VideoDetailModal video={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}
