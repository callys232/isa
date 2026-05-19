"use client";

import { useState, useMemo } from "react";

type EventType = "login" | "invoice" | "ai_query" | "payment" | "signup" | "alert" | "marketplace" | "schedule";

interface ActivityEvent {
  id: number;
  type: EventType;
  user: string;
  detail: string;
  page: string;
  time: string;
  ip: string;
  device: string;
}

const TYPE_CONFIG: Record<EventType, { icon: string; bg: string; text: string; label: string }> = {
  login:       { icon:"🔑", bg:"bg-blue-100",   text:"text-blue-700",   label:"Login"       },
  invoice:     { icon:"📄", bg:"bg-green-100",  text:"text-green-700",  label:"Invoice"     },
  ai_query:    { icon:"🤖", bg:"bg-purple-100", text:"text-purple-700", label:"AI Query"    },
  payment:     { icon:"💰", bg:"bg-emerald-100",text:"text-emerald-700",label:"Payment"     },
  signup:      { icon:"🌱", bg:"bg-teal-100",   text:"text-teal-700",   label:"Signup"      },
  alert:       { icon:"⚠️", bg:"bg-red-100",    text:"text-red-700",    label:"Alert"       },
  marketplace: { icon:"🛒", bg:"bg-amber-100",  text:"text-amber-700",  label:"Marketplace" },
  schedule:    { icon:"📅", bg:"bg-indigo-100", text:"text-indigo-700", label:"Schedule"    },
};

const EVENTS: ActivityEvent[] = [
  { id:1,  type:"login",       user:"Tunde Adeyemi",    detail:"Logged in from Lagos",                    page:"/dashboard",   time:"2m ago",  ip:"102.88.21.14",  device:"Chrome / Windows" },
  { id:2,  type:"ai_query",    user:"Adaeze Okafor",    detail:"Plant Advisor: Tomatoes in Anambra",      page:"/aiassistant", time:"4m ago",  ip:"105.64.12.88",  device:"Safari / iPhone"  },
  { id:3,  type:"invoice",     user:"Fatima Al-Hassan", detail:"Invoice #ISA-2026-0041 generated",        page:"/invoice",     time:"7m ago",  ip:"197.211.44.60", device:"Chrome / Android" },
  { id:4,  type:"payment",     user:"Amaka Eze",        detail:"Pro plan payment received — ₦20,000",     page:"/premuim",     time:"12m ago", ip:"41.58.90.201",  device:"Firefox / Mac"    },
  { id:5,  type:"signup",      user:"Seun Abiodun",     detail:"New Free account created",                page:"/signup",      time:"18m ago", ip:"102.91.3.44",   device:"Chrome / Android" },
  { id:6,  type:"marketplace", user:"Musa Ibrahim",     detail:"Listed: 500 bags Kano Maize @ ₦35,000/t", page:"/marketplace", time:"25m ago", ip:"105.113.2.18",  device:"Chrome / Windows" },
  { id:7,  type:"alert",       user:"SYSTEM",           detail:"Soil moisture critical on Farm A sensors", page:"/dashboard",   time:"31m ago", ip:"—",             device:"Server alert"     },
  { id:8,  type:"schedule",    user:"Ibrahim Garba",    detail:"Added task: Irrigate cassava rows 4–12",  page:"/schedule",    time:"45m ago", ip:"41.204.5.77",   device:"Chrome / Android" },
  { id:9,  type:"ai_query",    user:"Chioma Okonkwo",   detail:"Pest Detector: Fall armyworm on maize",   page:"/aiassistant", time:"1h ago",  ip:"105.64.90.31",  device:"Safari / iPad"    },
  { id:10, type:"payment",     user:"Yusuf Bello",      detail:"Premium plan payment — ₦45,000",          page:"/premuim",     time:"1h ago",  ip:"41.189.5.120",  device:"Chrome / Windows" },
  { id:11, type:"invoice",     user:"Abubakar Sule",    detail:"Invoice #ISA-2026-0040 marked Paid",      page:"/invoice",     time:"2h ago",  ip:"197.242.22.8",  device:"Firefox / Android"},
  { id:12, type:"login",       user:"Ngozi Eze",        detail:"Login attempt failed — suspended account", page:"/login",       time:"2h ago",  ip:"102.67.9.4",    device:"Chrome / Android" },
  { id:13, type:"marketplace", user:"Emeka Nwosu",      detail:"Purchased: Cassava Cuttings — ₦12,000",   page:"/marketplace", time:"3h ago",  ip:"41.90.12.5",    device:"Chrome / Android" },
  { id:14, type:"ai_query",    user:"Tunde Adeyemi",    detail:"Price Forecaster: Pepper Q2 2026",        page:"/aiassistant", time:"3h ago",  ip:"102.88.21.14",  device:"Chrome / Windows" },
  { id:15, type:"signup",      user:"Halima Kwara",     detail:"New Pro account created",                 page:"/signup",      time:"4h ago",  ip:"41.63.4.88",    device:"Safari / iPhone"  },
];

export default function ActivityTab() {
  const [typeFilter, setTypeFilter] = useState<EventType | "All">("All");
  const [search,     setSearch]     = useState("");
  const [live,       setLive]       = useState(true);

  const filtered = useMemo(() => {
    let list = [...EVENTS];
    if (typeFilter !== "All") list = list.filter(e => e.type === typeFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(e =>
        e.user.toLowerCase().includes(q) ||
        e.detail.toLowerCase().includes(q) ||
        e.page.toLowerCase().includes(q)
      );
    }
    return list;
  }, [typeFilter, search]);

  const types = Object.keys(TYPE_CONFIG) as EventType[];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-extrabold text-gray-800">User Activity</h2>
          <button onClick={() => setLive(l => !l)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all active:scale-95
              ${live ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
            <span className={`w-2 h-2 rounded-full ${live ? "bg-green-500 animate-pulse" : "bg-gray-400"}`} />
            {live ? "Live" : "Paused"}
          </button>
        </div>
        <span className="text-xs text-gray-500">{filtered.length} events</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search user, action, page…"
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button onClick={() => setTypeFilter("All")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95
              ${typeFilter === "All" ? "bg-gray-800 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}>
            All
          </button>
          {types.map(t => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95
                ${typeFilter === t ? `${TYPE_CONFIG[t].bg} ${TYPE_CONFIG[t].text} shadow-md` : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"}`}>
              <span>{TYPE_CONFIG[t].icon}</span>{TYPE_CONFIG[t].label}
            </button>
          ))}
        </div>
      </div>

      {/* Event feed */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1">Type</div>
          <div className="col-span-2">User</div>
          <div className="col-span-4">Detail</div>
          <div className="col-span-1">Page</div>
          <div className="col-span-2">IP / Device</div>
          <div className="col-span-2 text-right">Time</div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map((ev, i) => {
            const tc = TYPE_CONFIG[ev.type];
            return (
              <div key={ev.id}
                className="px-5 py-3.5 grid grid-cols-1 md:grid-cols-12 gap-2 items-center
                  hover:bg-blue-50/20 transition-all duration-150 group"
                style={{ animationDelay: `${i * 30}ms` }}>
                <div className="col-span-1">
                  <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>
                    {tc.icon}
                  </span>
                </div>
                <div className="col-span-2">
                  <p className="text-xs font-semibold text-gray-800 truncate group-hover:text-blue-700 transition-colors">{ev.user}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-xs text-gray-700 leading-relaxed">{ev.detail}</p>
                </div>
                <div className="col-span-1">
                  <span className="text-[10px] font-mono text-gray-400">{ev.page}</span>
                </div>
                <div className="col-span-2">
                  <p className="text-[10px] text-gray-500">{ev.ip}</p>
                  <p className="text-[10px] text-gray-400 truncate">{ev.device}</p>
                </div>
                <div className="col-span-2 text-right">
                  <span className="text-xs text-gray-400">{ev.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <div className="text-4xl mb-2">🔍</div>
            <p className="font-semibold">No activity matches your filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
