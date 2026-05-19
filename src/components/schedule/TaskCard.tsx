"use client";

import { FarmTask, TaskCategory, TaskPriority, TaskStatus } from "@/src/types/schedule";

const CATEGORY_EMOJI: Record<TaskCategory, string> = {
  Planting: "🌱", Harvesting: "🌾", Irrigation: "💧",
  Fertilizing: "🧪", "Pest Control": "🐛", General: "📋",
};

const PRIORITY_CONFIG: Record<TaskPriority, { border: string; badge: string; dot: string }> = {
  Critical: { border: "border-l-red-500",    badge: "bg-red-100 text-red-700",    dot: "bg-red-500" },
  High:     { border: "border-l-orange-500", badge: "bg-orange-100 text-orange-700", dot: "bg-orange-500" },
  Medium:   { border: "border-l-amber-500",  badge: "bg-amber-100 text-amber-700",  dot: "bg-amber-500" },
  Low:      { border: "border-l-green-500",  badge: "bg-green-100 text-green-700",  dot: "bg-green-500" },
};

const STATUS_CONFIG: Record<TaskStatus, { bg: string; text: string }> = {
  Pending:       { bg: "bg-amber-100", text: "text-amber-700" },
  "In Progress": { bg: "bg-blue-100",  text: "text-blue-700" },
  Done:          { bg: "bg-green-100", text: "text-green-700" },
  Overdue:       { bg: "bg-red-100",   text: "text-red-700" },
};

interface Props {
  task: FarmTask;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: () => void;
}

export default function TaskCard({ task, onComplete, onDelete, onClick }: Props) {
  const pc = PRIORITY_CONFIG[task.priority];
  const sc = STATUS_CONFIG[task.status];

  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-xl border border-gray-200 border-l-4 ${pc.border}
        shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-blue-200
        transition-all duration-200 cursor-pointer p-4`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={e => { e.stopPropagation(); if (task.status !== "Done") onComplete(task.id); }}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center
            transition-all duration-150 hover:scale-110 active:scale-90
            ${task.status === "Done"
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-green-400 hover:bg-green-50"}`}
        >
          {task.status === "Done" && <span className="text-[10px] font-bold">✓</span>}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base leading-none">{CATEGORY_EMOJI[task.category]}</span>
            <h3 className={`font-semibold text-sm text-gray-800 group-hover:text-blue-700 transition-colors truncate
              ${task.status === "Done" ? "line-through text-gray-400" : ""}`}>
              {task.title}
            </h3>
          </div>
          {task.description && (
            <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mt-0.5">{task.description}</p>
          )}
        </div>

        <button
          onClick={e => { e.stopPropagation(); onDelete(task.id); }}
          className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded-full bg-red-50 text-red-400
            hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-bold
            transition-all duration-150 active:scale-90 flex-shrink-0"
        >
          ×
        </button>
      </div>

      <div className="flex items-center flex-wrap gap-2 mt-3 pl-8">
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${pc.badge}`}>{task.priority}</span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{task.status}</span>
        <span className="text-[10px] text-gray-400">📅 {task.date}{task.time ? ` · ${task.time}` : ""}</span>
        {task.farm && <span className="text-[10px] text-gray-400">🌾 {task.farm}</span>}
        {task.assignee && <span className="text-[10px] text-gray-400">👤 {task.assignee}</span>}
      </div>
    </div>
  );
}
