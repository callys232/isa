"use client";

import { useState } from "react";
import { FarmAlert } from "@/src/types/dashboard";

interface AlertFeedProps {
  alerts: FarmAlert[];
}

const severityConfig = {
  critical: { bg: 'bg-red-50',    border: 'border-red-300',   icon: '🚨', badge: 'bg-red-100 text-red-700',   dot: 'bg-red-500' },
  warning:  { bg: 'bg-amber-50',  border: 'border-amber-300', icon: '⚠️', badge: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
  info:     { bg: 'bg-blue-50',   border: 'border-blue-200',  icon: 'ℹ️', badge: 'bg-blue-100 text-blue-700',  dot: 'bg-blue-400' },
};

export default function AlertFeed({ alerts }: AlertFeedProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'active' | 'resolved'>('all');

  const visible = alerts.filter(a => {
    if (dismissed.has(a.id)) return false;
    if (filter === 'active') return !a.resolved;
    if (filter === 'resolved') return a.resolved;
    return true;
  });

  const unresolved = alerts.filter(a => !a.resolved && !dismissed.has(a.id)).length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <h3 className="font-bold text-gray-800">Farm Alerts</h3>
          {unresolved > 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{unresolved}</span>
          )}
        </div>
        <div className="flex gap-1">
          {(['all', 'active', 'resolved'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1 text-xs rounded-full font-medium transition-all capitalize
                ${filter === f ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      <div className="divide-y divide-gray-50 max-h-80 overflow-y-auto">
        {visible.length === 0 && (
          <div className="py-10 text-center text-gray-400">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm">No alerts to show</p>
          </div>
        )}
        {visible.map(alert => {
          const cfg = severityConfig[alert.severity];
          return (
            <div key={alert.id} className={`flex gap-3 px-4 py-3 ${cfg.bg} hover:brightness-95 transition-all`}>
              <div className="flex flex-col items-center gap-1 mt-0.5 shrink-0">
                <span className="text-lg leading-none">{cfg.icon}</span>
                <div className={`w-1.5 h-1.5 rounded-full ${alert.resolved ? 'bg-gray-300' : cfg.dot} animate-pulse`}></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-semibold text-gray-800 text-sm">{alert.title}</span>
                  {alert.resolved && <span className="text-[10px] font-bold text-green-600 bg-green-100 px-1.5 py-0.5 rounded-full">Resolved</span>}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{alert.message}</p>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-gray-400">
                  <span>📍 {alert.field}</span>
                  <span>🕐 {alert.time}</span>
                  <span className={`font-semibold capitalize px-1.5 py-0.5 rounded-full ${cfg.badge}`}>{alert.severity}</span>
                </div>
              </div>
              {!alert.resolved && (
                <button
                  onClick={() => setDismissed(d => new Set([...d, alert.id]))}
                  className="shrink-0 text-gray-300 hover:text-gray-500 transition-colors text-sm self-start mt-1"
                  title="Dismiss"
                >
                  ✕
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
