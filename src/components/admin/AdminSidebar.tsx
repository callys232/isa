"use client";

import Link from "next/link";

type AdminTab = "overview" | "users" | "activity" | "revenue" | "content" | "settings";

interface Props {
  active: AdminTab;
  onChange: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggle: () => void;
}

const NAV: { id: AdminTab; label: string; icon: string; badge?: string }[] = [
  { id: "overview",  label: "Overview",    icon: "📊" },
  { id: "users",     label: "Users",       icon: "👥", badge: "1,284" },
  { id: "activity",  label: "Activity",    icon: "⚡", badge: "Live" },
  { id: "revenue",   label: "Revenue",     icon: "💰" },
  { id: "content",   label: "Content",     icon: "📰" },
  { id: "settings",  label: "Settings",    icon: "⚙️" },
];

export type { AdminTab };

export default function AdminSidebar({ active, onChange, collapsed, onToggle }: Props) {
  return (
    <aside className={`flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300 flex-shrink-0
      ${collapsed ? "w-16" : "w-56"}`}>

      {/* Logo row */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-gray-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-extrabold">
              ISA
            </div>
            <span className="text-white font-extrabold text-sm">Admin</span>
          </div>
        )}
        <button onClick={onToggle}
          className="text-gray-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-gray-800 active:scale-90">
          {collapsed ? "→" : "←"}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {NAV.map(item => (
          <button key={item.id} onClick={() => onChange(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold
              transition-all duration-150 active:scale-95 group
              ${active === item.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-900/40"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}>
            <span className={`text-base transition-transform duration-200 ${active === item.id ? "" : "group-hover:scale-110"}`}>
              {item.icon}
            </span>
            {!collapsed && (
              <>
                <span className="flex-1 text-left truncate">{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                    ${item.badge === "Live"
                      ? "bg-green-500 text-white animate-pulse"
                      : active === item.id ? "bg-white/20 text-white" : "bg-gray-700 text-gray-300"}`}>
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </button>
        ))}
      </nav>

      {/* Back to site */}
      <div className="px-2 pb-4">
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold text-gray-500
            hover:bg-gray-800 hover:text-gray-300 transition-all duration-150">
          <span>🏠</span>
          {!collapsed && <span>Back to Site</span>}
        </Link>
      </div>
    </aside>
  );
}
