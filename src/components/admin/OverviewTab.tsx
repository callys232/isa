"use client";

import { useState } from "react";

// ── Sparkline SVG ────────────────────────────────────────────────────
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80; const h = 28;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Bar chart SVG ────────────────────────────────────────────────────
function BarChart({ data, labels, color }: { data: number[]; labels: string[]; color: string }) {
  const max = Math.max(...data);
  const W = 100; const H = 60; const gap = 4;
  const barW = (W - gap * (data.length - 1)) / data.length;
  return (
    <svg viewBox={`0 0 ${W} ${H + 12}`} className="w-full">
      {data.map((v, i) => {
        const bh = (v / max) * H;
        const x = i * (barW + gap);
        const y = H - bh;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} rx="1.5" fill={color} fillOpacity="0.8" />
            <text x={x + barW / 2} y={H + 10} textAnchor="middle" fontSize="4" fill="#9ca3af">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ── Line area chart ──────────────────────────────────────────────────
function AreaChart({ data, color, fillColor }: { data: number[]; color: string; fillColor: string }) {
  const max = Math.max(...data);
  const W = 100; const H = 80;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * W;
    const y = H - (v / max) * H;
    return [x, y] as [number, number];
  });
  const line = pts.map(([x, y]) => `${x},${y}`).join(" ");
  const area = `${pts[0][0]},${H} ` + pts.map(([x, y]) => `${x},${y}`).join(" ") + ` ${pts[pts.length - 1][0]},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none">
      <polygon points={area} fill={fillColor} fillOpacity="0.15" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── KPI card ─────────────────────────────────────────────────────────
function KPICard({ label, value, sub, trend, icon, color, spark }: {
  label: string; value: string; sub: string; trend: string; icon: string;
  color: string; spark: number[];
}) {
  const up = trend.startsWith("+");
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5
      hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group cursor-default">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
          <p className="text-2xl font-extrabold text-gray-800 mt-1 group-hover:text-blue-700 transition-colors">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-2xl">{icon}</span>
          <Sparkline data={spark} color={color} />
        </div>
      </div>
      <span className={`text-xs font-bold px-2 py-0.5 rounded-full
        ${up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
        {trend} vs last month
      </span>
    </div>
  );
}

const KPIS = [
  { label: "Total Users",    value: "12,847", sub: "Registered farmers", trend: "+18%", icon: "👥", color: "#3b82f6",
    spark: [420,480,510,490,540,580,610,650,680,720,780,820] },
  { label: "Monthly Revenue",value: "₦4.2M", sub: "Across all plans",   trend: "+24%", icon: "💰", color: "#10b981",
    spark: [280,310,340,320,380,410,450,480,510,560,600,650] },
  { label: "Active Sessions", value: "3,241", sub: "Right now",          trend: "+7%",  icon: "⚡", color: "#8b5cf6",
    spark: [180,210,190,240,260,230,280,310,290,320,340,360] },
  { label: "Invoices Issued", value: "8,194", sub: "₦2.3B total value",  trend: "+31%", icon: "📄", color: "#f59e0b",
    spark: [120,145,160,155,180,200,220,210,240,260,280,310] },
  { label: "AI Queries",      value: "94,210", sub: "This month",        trend: "+42%", icon: "🤖", color: "#ec4899",
    spark: [1200,1450,1600,1750,1900,2100,2300,2500,2800,3100,3400,3800] },
  { label: "Paid Subscribers",value: "2,108", sub: "Pro + Premium",      trend: "+15%", icon: "💎", color: "#14b8a6",
    spark: [80,90,95,100,110,120,130,145,160,175,190,210] },
];

const MONTHLY_REVENUE = [180,210,240,220,280,310,350,330,390,420,460,500];
const MONTHS = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];

const TOP_PAGES = [
  { page: "/marketplace",  visits: "28,410", pct: 88 },
  { page: "/dashboard",    visits: "21,830", pct: 68 },
  { page: "/ai-advisor",   visits: "19,200", pct: 60 },
  { page: "/awareness",    visits: "15,640", pct: 49 },
  { page: "/invoice",      visits: "12,300", pct: 38 },
  { page: "/schedule",     visits: "8,910",  pct: 28 },
];

const PLAN_SPLIT = [
  { label: "Free",    count: 8920, pct: 69, color: "bg-gray-400" },
  { label: "Pro",     count: 2834, pct: 22, color: "bg-blue-500" },
  { label: "Premium", count: 1093, pct:  9, color: "bg-purple-500" },
];

export default function OverviewTab() {
  const [period, setPeriod] = useState<"7d"|"30d"|"90d">("30d");

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="text-xl font-extrabold text-gray-800">Platform Overview</h2>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
          {(["7d","30d","90d"] as const).map(p => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 active:scale-95
                ${period === p ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {KPIS.map(k => <KPICard key={k.label} {...k} />)}
      </div>

      {/* Revenue chart + plan split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue area chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-gray-800">Monthly Revenue</h3>
              <p className="text-xs text-gray-500 mt-0.5">Last 12 months · ₦ NGN</p>
            </div>
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full">↑ 24% YoY</span>
          </div>
          <AreaChart data={MONTHLY_REVENUE} color="#3b82f6" fillColor="#3b82f6" />
          <div className="flex gap-0 mt-1">
            {MONTHS.map(m => (
              <span key={m} className="flex-1 text-[9px] text-gray-400 text-center">{m}</span>
            ))}
          </div>
        </div>

        {/* Plan split */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-4">Subscription Plans</h3>
          <div className="space-y-4">
            {PLAN_SPLIT.map(p => (
              <div key={p.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{p.label}</span>
                  <span className="text-xs text-gray-500">{p.count.toLocaleString()} users · {p.pct}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${p.color} transition-all duration-700`}
                    style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500 mb-1">Monthly Recurring Revenue</p>
            <p className="text-2xl font-extrabold text-blue-600">₦4.2M</p>
          </div>
        </div>
      </div>

      {/* Bar chart + top pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Daily active users bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-4">Daily Active Users (Last 12 days)</h3>
          <BarChart
            data={[1840,2100,1960,2350,2680,2420,2890,3100,2970,3240,3410,3620]}
            labels={["9","10","11","12","13","14","15","16","17","18","19","20"]}
            color="#3b82f6"
          />
        </div>

        {/* Top pages */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-4">Top Pages This Month</h3>
          <div className="space-y-3">
            {TOP_PAGES.map((p, i) => (
              <div key={p.page} className="flex items-center gap-3 group">
                <span className="w-5 text-xs font-bold text-gray-400 text-center">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700 group-hover:text-blue-600 transition-colors font-mono">{p.page}</span>
                    <span className="text-xs text-gray-500">{p.visits}</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${p.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
