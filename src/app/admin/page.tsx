"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/src/components/AnimatedBackground";
import AdminSidebar, { AdminTab } from "@/src/components/admin/AdminSidebar";
import OverviewTab  from "@/src/components/admin/OverviewTab";
import UsersTab     from "@/src/components/admin/UsersTab";
import ActivityTab  from "@/src/components/admin/ActivityTab";
import RevenueTab   from "@/src/components/admin/RevenueTab";
import ContentTab   from "@/src/components/admin/ContentTab";
import SettingsTab  from "@/src/components/admin/SettingsTab";

// ── Admin Search ──────────────────────────────────────────────────────
function AdminSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const results = q.trim().length > 1 ? [
    { type:"User",    label:`Adaeze Okafor — adaeze@greenvalley.ng`,       icon:"👤" },
    { type:"Invoice", label:`Invoice #ISA-2026-0041 — ₦195,750`,           icon:"📄" },
    { type:"Page",    label:`/marketplace — 28,410 visits this month`,      icon:"🛒" },
    { type:"User",    label:`Musa Ibrahim — musa.ibrahim@kanog.com`,        icon:"👤" },
    { type:"Setting", label:`Maintenance Mode — currently OFF`,             icon:"⚙️" },
  ].filter(r => r.label.toLowerCase().includes(q.toLowerCase())) : [];

  return (
    <div className="relative">
      <style>{`@keyframes srDrop{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div className={`flex items-center gap-2 bg-gray-800 border rounded-xl px-3 py-2 transition-all duration-150
        ${open ? "border-blue-500 ring-1 ring-blue-500/30" : "border-gray-700 hover:border-gray-600"}`}>
        <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          value={q} onChange={e => setQ(e.target.value)}
          onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Search users, invoices, pages…"
          className="bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none w-56"
        />
        <kbd className="hidden sm:block text-[10px] text-gray-600 bg-gray-700 px-1.5 py-0.5 rounded border border-gray-600 flex-shrink-0">
          Ctrl K
        </kbd>
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
          style={{ animation: "srDrop 0.15s ease" }}>
          {results.map((r, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-700 cursor-pointer transition-colors">
              <span className="text-base">{r.icon}</span>
              <div>
                <p className="text-xs font-semibold text-white">{r.label}</p>
                <p className="text-[10px] text-gray-500">{r.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Topbar ────────────────────────────────────────────────────────────
function AdminTopbar({ tab }: { tab: AdminTab }) {
  const labels: Record<AdminTab, string> = {
    overview: "Platform Overview",
    users:    "User Management",
    activity: "User Activity",
    revenue:  "Revenue Analytics",
    content:  "Content Management",
    settings: "Platform Settings",
  };

  return (
    <header className="flex items-center justify-between px-6 py-3.5 bg-gray-900 border-b border-gray-800 flex-shrink-0">
      <div>
        <p className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest">ISA Admin</p>
        <h2 className="text-white font-extrabold text-sm mt-0.5">{labels[tab]}</h2>
      </div>
      <div className="flex items-center gap-3">
        <AdminSearch />
        {/* Live indicator */}
        <div className="flex items-center gap-1.5 bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-semibold text-green-400">Live</span>
        </div>
        {/* Admin avatar */}
        <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white text-sm font-bold
          hover:bg-blue-500 transition-colors cursor-pointer">
          A
        </div>
      </div>
    </header>
  );
}

// ── Page ──────────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const [tab,       setTab]       = useState<AdminTab>("overview");
  const [collapsed, setCollapsed] = useState(false);

  // Simple session check — in production replace with real auth (JWT / NextAuth)
  useEffect(() => {
    // Allow access only if navigated from admin login (referrer check is basic — use real auth in prod)
    const allowed = document.referrer.includes("/admin") || sessionStorage.getItem("isa-admin") === "true";
    if (!allowed) {
      sessionStorage.setItem("isa-admin", "true"); // first-time direct access allowed for demo
    }
  }, [router]);

  const renderTab = () => {
    switch (tab) {
      case "overview":  return <OverviewTab />;
      case "users":     return <UsersTab />;
      case "activity":  return <ActivityTab />;
      case "revenue":   return <RevenueTab />;
      case "content":   return <ContentTab />;
      case "settings":  return <SettingsTab />;
    }
  };

  return (
    <div className="fixed inset-0 flex bg-gray-950 overflow-hidden">
      {/* Subtle particle bg */}
      <AnimatedBackground variant="blue" density="light" speed="slow" opacity={0.06} fixed />

      {/* Sidebar */}
      <AdminSidebar
        active={tab}
        onChange={setTab}
        collapsed={collapsed}
        onToggle={() => setCollapsed(c => !c)}
      />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden relative z-10">
        <AdminTopbar tab={tab} />

        {/* Content area */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {renderTab()}
        </main>
      </div>
    </div>
  );
}
