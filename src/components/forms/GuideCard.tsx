"use client";

import { useState } from "react";

export interface GuideStep {
  step:   number;
  title:  string;
  detail: string;
}

interface Props {
  title: string;
  icon:  string;
  steps: GuideStep[];
}

export default function GuideCard({ title, icon, steps }: Props) {
  const [done, setDone] = useState<number[]>([]);

  const toggle = (n: number) =>
    setDone(d => d.includes(n) ? d.filter(x => x !== n) : [...d, n]);

  const progress = Math.round((done.length / steps.length) * 100);

  return (
    <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">{icon}</span>
          <span className="text-white font-extrabold text-xs">{title}</span>
        </div>
        <span className="text-blue-200 text-[10px]">{done.length}/{steps.length} done</span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-100">
        <div className="h-full bg-green-500 transition-all duration-500 rounded-full"
          style={{ width: `${progress}%` }} />
      </div>

      {/* Steps */}
      <div className="p-3 space-y-2">
        {steps.map(s => {
          const isDone = done.includes(s.step);
          return (
            <div key={s.step}
              onClick={() => toggle(s.step)}
              className={`flex items-start gap-3 p-2.5 rounded-xl cursor-pointer transition-all duration-150
                ${isDone ? "bg-green-50 border border-green-200" : "hover:bg-gray-50 border border-transparent"}`}>
              <div className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-extrabold transition-all duration-200
                ${isDone ? "bg-green-500 text-white scale-110" : "bg-blue-100 text-blue-700"}`}>
                {isDone ? "✓" : s.step}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-bold transition-colors duration-150
                  ${isDone ? "text-green-700 line-through" : "text-gray-800"}`}>
                  {s.title}
                </p>
                <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">{s.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-3 pb-3">
        {progress === 100 ? (
          <p className="text-center text-xs font-bold text-green-600">🎉 All steps complete!</p>
        ) : (
          <p className="text-[10px] text-gray-400 text-center">Click each step to mark as done</p>
        )}
      </div>
    </div>
  );
}
