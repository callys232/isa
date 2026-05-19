"use client";

import { FarmTask, TaskPriority } from "@/src/types/schedule";

const PRIORITY_CLS: Record<TaskPriority, string> = {
  Critical: "bg-red-500 text-white",
  High:     "bg-orange-400 text-white",
  Medium:   "bg-amber-400 text-white",
  Low:      "bg-green-500 text-white",
};

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

interface Props {
  tasks: FarmTask[];
  weekStart: Date;
  onTaskClick: (task: FarmTask) => void;
}

export default function CalendarGrid({ tasks, weekStart, onTaskClick }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {days.map((day, i) => {
          const ds = day.toISOString().slice(0, 10);
          const isToday = ds === today;
          const isPast  = ds < today;
          return (
            <div key={i}
              className={`p-2 text-center border-r border-gray-50 last:border-r-0 transition-colors duration-200
                ${isToday ? "bg-blue-600" : isPast ? "bg-gray-50" : "bg-white"}`}>
              <p className={`text-[10px] font-bold uppercase tracking-wide
                ${isToday ? "text-blue-200" : "text-gray-500"}`}>
                {DAY_LABELS[i]}
              </p>
              <p className={`text-lg font-extrabold mt-0.5
                ${isToday ? "text-white" : isPast ? "text-gray-400" : "text-gray-800"}`}>
                {day.getDate()}
              </p>
              {isToday && (
                <span className="inline-block w-1.5 h-1.5 bg-white rounded-full mt-0.5 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Task columns */}
      <div className="grid grid-cols-7 min-h-[260px]">
        {days.map((day, i) => {
          const ds       = day.toISOString().slice(0, 10);
          const dayTasks = tasks.filter(t => t.date === ds);
          const visible  = dayTasks.slice(0, 4);
          const overflow = dayTasks.length - 4;
          const isPast   = ds < today;
          const isToday  = ds === today;

          return (
            <div key={i}
              className={`p-1.5 border-r border-gray-50 last:border-r-0 transition-colors duration-200
                ${isPast ? "bg-gray-50/60" : isToday ? "bg-blue-50/30" : "hover:bg-gray-50/50"}`}>
              <div className="space-y-1">
                {visible.map(task => (
                  <button key={task.id}
                    onClick={() => onTaskClick(task)}
                    title={task.title}
                    className={`w-full text-left text-[10px] font-bold px-1.5 py-1 rounded-lg truncate
                      ${PRIORITY_CLS[task.priority]}
                      hover:opacity-80 hover:scale-105 active:scale-95
                      transition-all duration-150 shadow-sm`}>
                    {task.title}
                  </button>
                ))}
                {overflow > 0 && (
                  <p className="text-[10px] text-gray-400 font-semibold px-1.5 py-0.5">+{overflow} more</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
