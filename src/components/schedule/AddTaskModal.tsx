"use client";

import { useState } from "react";
import { FarmTask, TaskCategory, TaskPriority, TaskStatus } from "@/src/types/schedule";

const CATEGORIES: TaskCategory[] = ["Planting", "Harvesting", "Irrigation", "Fertilizing", "Pest Control", "General"];
const PRIORITIES: TaskPriority[] = ["Critical", "High", "Medium", "Low"];
const STATUSES: TaskStatus[] = ["Pending", "In Progress", "Done"];

interface Props {
  onSave: (task: Omit<FarmTask, "id">) => void;
  onClose: () => void;
}

export default function AddTaskModal({ onSave, onClose }: Props) {
  const [title, setTitle]           = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory]     = useState<TaskCategory>("General");
  const [priority, setPriority]     = useState<TaskPriority>("Medium");
  const [status, setStatus]         = useState<TaskStatus>("Pending");
  const [date, setDate]             = useState(new Date().toISOString().slice(0, 10));
  const [time, setTime]             = useState("");
  const [farm, setFarm]             = useState("");
  const [assignee, setAssignee]     = useState("");
  const [notes, setNotes]           = useState("");
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [saving, setSaving]         = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!title.trim()) e.title = "Task title is required";
    if (!date) e.date = "Date is required";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      onSave({
        title, description, category, priority, status, date,
        time: time || undefined,
        farm: farm || undefined,
        assignee: assignee || undefined,
        notes: notes || undefined,
      });
      setSaving(false);
    }, 350);
  };

  const inp = (err?: string) =>
    `w-full px-3 py-2.5 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400
    hover:border-blue-300 transition-all duration-150 ${err ? "border-red-400" : "border-gray-200"}`;

  return (
    <>
      <style>{`
        @keyframes modalSlide {
          from { opacity:0; transform:translateY(32px) scale(0.97) }
          to   { opacity:1; transform:translateY(0)   scale(1) }
        }
      `}</style>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
        onClick={onClose}
      >
        <div
          className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
          style={{ animation: "modalSlide 0.3s cubic-bezier(0.16,1,0.3,1)" }}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
            <div>
              <h2 className="font-extrabold text-gray-800 text-lg">Add Farm Task</h2>
              <p className="text-xs text-gray-500 mt-0.5">Schedule a new farm activity</p>
            </div>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center text-gray-500 text-lg font-bold transition-all duration-150 active:scale-90">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Task Title *</label>
              <input value={title} onChange={e => setTitle(e.target.value)}
                placeholder="e.g. Apply NPK fertilizer to Field 3"
                className={inp(errors.title)} />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Category</label>
                <select value={category} onChange={e => setCategory(e.target.value as TaskCategory)} className={inp()}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Priority</label>
                <select value={priority} onChange={e => setPriority(e.target.value as TaskPriority)} className={inp()}>
                  {PRIORITIES.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Date *</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inp(errors.date)} />
                {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Time</label>
                <input type="time" value={time} onChange={e => setTime(e.target.value)} className={inp()} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as TaskStatus)} className={inp()}>
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Farm / Field</label>
                <input value={farm} onChange={e => setFarm(e.target.value)}
                  placeholder="e.g. Farm A, Field 2" className={inp()} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Assignee</label>
              <input value={assignee} onChange={e => setAssignee(e.target.value)}
                placeholder="e.g. Musa Ibrahim" className={inp()} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Description</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                placeholder="Additional details about this task..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-150 resize-none" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Notes</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={2}
                placeholder="Any additional notes..."
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-150 resize-none" />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={onClose}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600
                  hover:border-gray-400 hover:shadow-sm transition-all duration-150 active:scale-95">
                Cancel
              </button>
              <button type="submit" disabled={saving}
                className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all duration-150 active:scale-95 shadow-md
                  ${saving ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
                {saving ? "Saving…" : "✓ Save Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
