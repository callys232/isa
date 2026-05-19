"use client";

import { useState, useMemo } from "react";
import { FarmTask, TaskStatus } from "@/src/types/schedule";
import PlanGate from "@/src/components/ui/PlanGate";
import TaskCard from "@/src/components/schedule/TaskCard";
import CalendarGrid from "@/src/components/schedule/CalendarGrid";
import ScheduleStats from "@/src/components/schedule/ScheduleStats";
import AddTaskModal from "@/src/components/schedule/AddTaskModal";
import AnimatedBackground from "@/src/components/AnimatedBackground";

// ── Seed data ──────────────────────────────────────────────────────
const SEED: FarmTask[] = [
  {
    id: 1, title: "Apply NPK fertilizer to Maize field",
    description: "Use 50kg/ha NPK 15-15-15 on Field A. Water 1h after application.",
    category: "Fertilizing", priority: "High", status: "Pending",
    date: "2026-05-19", time: "07:00", farm: "Farm A — Field 1", assignee: "Musa Ibrahim",
  },
  {
    id: 2, title: "Irrigate cassava rows 4–12",
    description: "Drip irrigation cycle — 45 minutes each row. Check soil moisture after.",
    category: "Irrigation", priority: "Critical", status: "In Progress",
    date: "2026-05-19", time: "06:00", farm: "Farm B", assignee: "Chioma Okonkwo",
  },
  {
    id: 3, title: "Inspect tomatoes for early blight",
    description: "Visual inspection of all 3 tomato beds. Apply copper fungicide if spots found.",
    category: "Pest Control", priority: "High", status: "Pending",
    date: "2026-05-20", time: "08:30", farm: "Greenhouse 1",
  },
  {
    id: 4, title: "Transplant pepper seedlings",
    description: "Move 200 seedlings from nursery trays to Field C rows 1–8.",
    category: "Planting", priority: "Medium", status: "Pending",
    date: "2026-05-21", time: "07:30", farm: "Farm C", assignee: "Amaka Eze",
  },
  {
    id: 5, title: "Harvest mature yam tubers — Section B",
    description: "Use pitchfork, avoid bruising. Sort by size: Grade A (>2kg), Grade B (1–2kg).",
    category: "Harvesting", priority: "Critical", status: "Pending",
    date: "2026-05-22", time: "06:30", farm: "Farm A — Section B", assignee: "Ibrahim Garba",
  },
  {
    id: 6, title: "Weekly soil pH test across all fields",
    description: "Use pH meter on 5 soil samples per field. Target range: 6.0–7.0.",
    category: "General", priority: "Low", status: "Pending",
    date: "2026-05-22", farm: "All Farms",
  },
  {
    id: 7, title: "Plant cowpea cover crop — Field D",
    description: "Broadcast 15kg seed evenly. Rake in lightly. Great for nitrogen fixation.",
    category: "Planting", priority: "Medium", status: "Pending",
    date: "2026-05-23", time: "07:00", farm: "Farm D",
  },
  {
    id: 8, title: "Fumigate grain storage — Silo 2",
    description: "Use Phostoxin tablets — 1 tablet per tonne. Seal silo for 72h.",
    category: "Pest Control", priority: "Critical", status: "Pending",
    date: "2026-05-24", time: "09:00", farm: "Storage Facility", assignee: "Tunde Adeyemi",
  },
  {
    id: 9, title: "Repair drip lines on Field B row 6",
    description: "Two emitters blocked. Replace blocked drip emitters, flush lines.",
    category: "Irrigation", priority: "High", status: "Overdue",
    date: "2026-05-16", farm: "Farm B", assignee: "Musa Ibrahim",
  },
  {
    id: 10, title: "Apply weed control — Maize rows",
    description: "Post-emergence herbicide (Atrazine 1.5L/ha). Avoid spraying on windy days.",
    category: "General", priority: "Medium", status: "Done",
    date: "2026-05-18", farm: "Farm A — Field 1", assignee: "Chioma Okonkwo",
  },
  {
    id: 11, title: "Market price check — Tomatoes & Pepper",
    description: "Visit Bodija market + call 3 offtakers for current prices.",
    category: "General", priority: "Low", status: "Done",
    date: "2026-05-18",
  },
  {
    id: 12, title: "Bio-pesticide spray — Vegetable beds",
    description: "Neem oil solution (2% concentration) on all vegetable beds. Repeat after rain.",
    category: "Pest Control", priority: "Medium", status: "Pending",
    date: "2026-05-25", time: "08:00", farm: "Greenhouse 1", assignee: "Amaka Eze",
  },
];

function getMonday(d: Date) {
  const dt = new Date(d);
  const day = dt.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  dt.setDate(dt.getDate() + diff);
  dt.setHours(0, 0, 0, 0);
  return dt;
}

function addDays(d: Date, n: number) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-NG", { month: "short", day: "numeric" });
}

type Tab = "calendar" | "tasks" | "done";

export default function SchedulePage() {
  const [tasks, setTasks] = useState<FarmTask[]>(SEED);
  const [tab, setTab] = useState<Tab>("calendar");
  const [weekStart, setWeekStart] = useState(() => getMonday(new Date()));
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<TaskStatus | "All">("All");
  const [selected, setSelected] = useState<FarmTask | null>(null);

  const weekEnd = addDays(weekStart, 6);

  const addTask = (data: Omit<FarmTask, "id">) => {
    setTasks(prev => [{ ...data, id: Date.now() }, ...prev]);
    setShowModal(false);
    setTab("tasks");
  };

  const markDone = (id: number) =>
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: "Done" as TaskStatus } : t));

  const deleteTask = (id: number) =>
    setTasks(prev => prev.filter(t => t.id !== id));

  const activeTasks = useMemo(() => {
    let list = tasks.filter(t => t.status !== "Done");
    if (filterStatus !== "All") list = list.filter(t => t.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.farm ?? "").toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [tasks, filterStatus, search]);

  const doneTasks = tasks.filter(t => t.status === "Done");
  const weekTasks = tasks.filter(t => {
    const s = weekStart.toISOString().slice(0, 10);
    const e = weekEnd.toISOString().slice(0, 10);
    return t.date >= s && t.date <= e;
  });

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: "calendar", label: "📅 Calendar" },
    { id: "tasks",    label: "📋 Task List", count: activeTasks.length },
    { id: "done",     label: "✅ Completed", count: doneTasks.length },
  ];

  const STATUS_OPTIONS: (TaskStatus | "All")[] = ["All", "Pending", "In Progress", "Overdue"];

  return (
    <PlanGate
      require="premium"
      feature="Farm Schedule"
      description="Plan, assign, and track all your farm tasks — planting, irrigation, fertilising, pest control, and harvesting — with a weekly calendar and team assignments."
    >
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-600 overflow-hidden">
        <AnimatedBackground variant="green" density="medium" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
                Smart Farm Planner
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Farm Schedule</h1>
              <p className="text-green-200 text-sm max-w-md">
                Plan, track, and complete all your farm activities. Never miss a critical task.
              </p>
            </div>
            <div className="flex flex-col sm:items-end gap-3">
              <button onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-green-700 rounded-xl font-bold text-sm
                  hover:bg-green-50 hover:shadow-xl hover:-translate-y-1 shadow-lg transition-all duration-200 active:scale-95">
                <span className="text-xl font-bold leading-none">+</span> New Task
              </button>
              <p className="text-green-300 text-xs">{tasks.length} total tasks · {tasks.filter(t => t.status === "Done").length} completed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-12">

        {/* Stats */}
        <div className="mt-6">
          <ScheduleStats tasks={tasks} />
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-1">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold flex-1 justify-center transition-all duration-200 active:scale-95
                ${tab === t.id
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}>
              {t.label}
              {t.count !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full
                  ${tab === t.id ? "bg-white/20 text-white" : "bg-gray-200 text-gray-500"}`}>
                  {t.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Calendar Tab ── */}
        {tab === "calendar" && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-800">
                Week of {fmt(weekStart)} – {fmt(weekEnd)}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => setWeekStart(d => addDays(d, -7))}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600
                    hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all duration-150 active:scale-95">
                  ← Prev
                </button>
                <button onClick={() => setWeekStart(getMonday(new Date()))}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold
                    hover:bg-blue-700 hover:shadow-md transition-all duration-150 active:scale-95">
                  Today
                </button>
                <button onClick={() => setWeekStart(d => addDays(d, 7))}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600
                    hover:border-blue-300 hover:text-blue-600 hover:shadow-sm transition-all duration-150 active:scale-95">
                  Next →
                </button>
              </div>
            </div>
            <CalendarGrid tasks={tasks} weekStart={weekStart} onTaskClick={setSelected} />
            <p className="text-xs text-gray-400 text-right">{weekTasks.length} task(s) this week</p>
          </div>
        )}

        {/* ── Task List Tab ── */}
        {tab === "tasks" && (
          <div className="mt-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search tasks, farms, categories…"
                  className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white
                    focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all" />
              </div>
              <div className="flex gap-2 flex-wrap">
                {STATUS_OPTIONS.map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all duration-150 active:scale-95
                      ${filterStatus === s
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {activeTasks.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">🌿</div>
                <p className="font-semibold">No tasks found</p>
                <p className="text-sm mt-1">
                  {search || filterStatus !== "All" ? "Try adjusting your filters." : "Create your first task to get started."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {activeTasks.map(t => (
                  <TaskCard key={t.id} task={t}
                    onComplete={markDone}
                    onDelete={deleteTask}
                    onClick={() => setSelected(t)} />
                ))}
              </div>
            )}
            <p className="text-xs text-gray-400 text-right">Showing {activeTasks.length} task(s)</p>
          </div>
        )}

        {/* ── Completed Tab ── */}
        {tab === "done" && (
          <div className="mt-6 space-y-3">
            {doneTasks.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <div className="text-5xl mb-3">✅</div>
                <p className="font-semibold">No completed tasks yet</p>
                <p className="text-sm mt-1">Mark tasks as done to see them here.</p>
              </div>
            ) : (
              doneTasks.map(t => (
                <TaskCard key={t.id} task={t}
                  onComplete={markDone}
                  onDelete={deleteTask}
                  onClick={() => setSelected(t)} />
              ))
            )}
          </div>
        )}
      </div>

      {/* ── Add Task Modal ── */}
      {showModal && (
        <AddTaskModal onSave={addTask} onClose={() => setShowModal(false)} />
      )}

      {/* ── Task Detail Side Panel ── */}
      {selected && (
        <>
          <style>{`
            @keyframes slideRight { from{opacity:0;transform:translateX(100%)} to{opacity:1;transform:translateX(0)} }
          `}</style>
          <div className="fixed inset-0 z-50" onClick={() => setSelected(null)}
            style={{ background: "rgba(0,0,0,0.3)", backdropFilter: "blur(2px)" }}>
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
              style={{ animation: "slideRight 0.25s cubic-bezier(0.16,1,0.3,1)" }}
              onClick={e => e.stopPropagation()}>

              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 bg-gradient-to-r from-green-600 to-emerald-600">
                <div>
                  <p className="text-green-200 text-xs font-semibold uppercase tracking-wide">Task Detail</p>
                  <h3 className="text-white font-extrabold text-lg mt-0.5 leading-tight">{selected.title}</h3>
                </div>
                <button onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-90">
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-5">
                {selected.description && (
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Description</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{selected.description}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  {[
                    ["Category", selected.category],
                    ["Priority", selected.priority],
                    ["Status", selected.status],
                    ["Date", selected.date + (selected.time ? ` · ${selected.time}` : "")],
                    ...(selected.farm ? [["Farm", selected.farm]] : []),
                    ...(selected.assignee ? [["Assignee", selected.assignee]] : []),
                  ].map(([k, v]) => (
                    <div key={k as string}>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-0.5">{k}</p>
                      <p className="font-semibold text-gray-800">{v}</p>
                    </div>
                  ))}
                </div>

                {selected.notes && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-1">Notes</p>
                    <p className="text-sm text-amber-800">{selected.notes}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-2">
                  {selected.status !== "Done" && (
                    <button onClick={() => { markDone(selected.id); setSelected(null); }}
                      className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-bold
                        hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all active:scale-95">
                      ✓ Mark as Done
                    </button>
                  )}
                  <button onClick={() => { deleteTask(selected.id); setSelected(null); }}
                    className="px-5 py-3 bg-red-50 text-red-500 border border-red-200 rounded-xl text-sm font-bold
                      hover:bg-red-500 hover:text-white hover:shadow-md transition-all active:scale-95">
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    </PlanGate>
  );
}
