"use client";

import { useState } from "react";

type ContentType = "Articles" | "Videos" | "Invoices" | "Listings";

const CONTENT_STATS = [
  { type:"Articles"  as ContentType, count:47,    active:42, flagged:2,  icon:"📰", color:"bg-blue-50 border-blue-200"   },
  { type:"Videos"    as ContentType, count:183,   active:178,flagged:3,  icon:"🎬", color:"bg-red-50 border-red-200"     },
  { type:"Invoices"  as ContentType, count:8194,  active:6210,flagged:0, icon:"📄", color:"bg-green-50 border-green-200" },
  { type:"Listings"  as ContentType, count:2341,  active:2198,flagged:8, icon:"🛒", color:"bg-amber-50 border-amber-200" },
];

const FLAGGED = [
  { id:1,  type:"Listing",  title:"Bulk fertilizer at 90% below market price", user:"Anonymous User", reason:"Suspected fraud — price too low",           date:"2026-05-18", severity:"High"   },
  { id:2,  type:"Video",    title:"Unverified pesticide tutorial",               user:"FarmTube NG",    reason:"Potentially hazardous chemical advice",       date:"2026-05-17", severity:"Medium" },
  { id:3,  type:"Listing",  title:"Seeds — no quality certification",            user:"Emeka Nwosu",    reason:"Missing certification documentation",          date:"2026-05-16", severity:"Low"    },
  { id:4,  type:"Article",  title:"Misleading headline on fertiliser subsidies", user:"ISA Blog",       reason:"Headline does not match article content",      date:"2026-05-15", severity:"Low"    },
  { id:5,  type:"Listing",  title:"Pesticide sold without safety label",         user:"Anonymous User", reason:"Consumer safety risk — no label",              date:"2026-05-14", severity:"High"   },
  { id:6,  type:"Video",    title:"Unscientific soil testing method",            user:"NaijaFarm Tips", reason:"Spreads inaccurate agricultural information", date:"2026-05-13", severity:"Medium" },
];

const SEV_CLS: Record<string, string> = {
  High:   "bg-red-100 text-red-700",
  Medium: "bg-amber-100 text-amber-700",
  Low:    "bg-gray-100 text-gray-600",
};

export default function ContentTab() {
  const [dismissed, setDismissed] = useState<number[]>([]);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-extrabold text-gray-800">Content Management</h2>

      {/* Content overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {CONTENT_STATS.map(s => (
          <div key={s.type} className={`rounded-2xl border p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 ${s.color}`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{s.icon}</span>
              {s.flagged > 0 && (
                <span className="text-[10px] font-extrabold bg-red-500 text-white px-2 py-0.5 rounded-full">
                  {s.flagged} flagged
                </span>
              )}
            </div>
            <p className="text-2xl font-extrabold text-gray-800">{s.count.toLocaleString()}</p>
            <p className="text-xs font-semibold text-gray-600 mt-0.5">{s.type}</p>
            <p className="text-xs text-gray-400 mt-1">{s.active.toLocaleString()} active</p>
          </div>
        ))}
      </div>

      {/* Flagged content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h3 className="font-extrabold text-gray-800">Flagged Content</h3>
            <p className="text-xs text-gray-500 mt-0.5">Requires moderation review</p>
          </div>
          <span className="text-xs font-bold bg-red-100 text-red-700 px-2.5 py-1 rounded-full">
            {FLAGGED.filter(f => !dismissed.includes(f.id)).length} pending
          </span>
        </div>

        <div className="divide-y divide-gray-50">
          {FLAGGED.filter(f => !dismissed.includes(f.id)).map(f => (
            <div key={f.id} className="px-5 py-4 flex items-start gap-4 hover:bg-red-50/20 transition-all duration-150 group">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{f.type}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${SEV_CLS[f.severity]}`}>{f.severity}</span>
                  <span className="text-xs text-gray-400">{f.date}</span>
                </div>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-red-700 transition-colors">{f.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">By: {f.user}</p>
                <p className="text-xs text-red-600 mt-1">⚠ {f.reason}</p>
              </div>
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                <button className="px-3 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg
                  hover:bg-red-700 hover:shadow-md transition-all active:scale-95">
                  Remove
                </button>
                <button onClick={() => setDismissed(d => [...d, f.id])}
                  className="px-3 py-1.5 bg-gray-100 text-gray-600 text-xs font-bold rounded-lg
                    hover:bg-gray-200 transition-all active:scale-95">
                  Dismiss
                </button>
              </div>
            </div>
          ))}

          {FLAGGED.filter(f => !dismissed.includes(f.id)).length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <div className="text-4xl mb-2">✅</div>
              <p className="font-semibold">All content reviewed</p>
              <p className="text-xs mt-1">No flagged items remaining.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
