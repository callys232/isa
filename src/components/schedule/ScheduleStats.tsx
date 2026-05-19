"use client";

import { FarmTask } from "@/src/types/schedule";

interface Props { tasks: FarmTask[]; }

export default function ScheduleStats({ tasks }: Props) {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.status === "Done").length;
  const active  = tasks.filter(t => t.status === "Pending" || t.status === "In Progress").length;
  const overdue = tasks.filter(t => t.status === "Overdue").length;
  const pct     = total > 0 ? Math.round((done / total) * 100) : 0;

  const stats = [
    { label: "Total Tasks",  value: total,   sub: `${tasks.length} this week`,  icon: "📋", color: "bg-white border-gray-200",       val: "text-gray-800" },
    { label: "Completed",    value: done,    sub: `${pct}% complete`,            icon: "✅", color: "bg-green-50 border-green-200",   val: "text-green-700" },
    { label: "In Progress",  value: active,  sub: "active tasks",                icon: "⏳", color: "bg-blue-50 border-blue-200",     val: "text-blue-700" },
    { label: "Overdue",      value: overdue, sub: "need attention",               icon: "🔴", color: "bg-red-50 border-red-200",       val: "text-red-700" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(s => (
        <div key={s.label}
          className={`rounded-2xl p-5 border shadow-sm cursor-default
            transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 group
            ${s.color}`}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{s.label}</p>
              <p className={`text-3xl font-extrabold group-hover:text-blue-700 transition-colors duration-200 ${s.val}`}>
                {s.value}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{s.sub}</p>
            </div>
            <span className="text-2xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
              {s.icon}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
