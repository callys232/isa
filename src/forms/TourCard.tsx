"use client";

import { useState } from "react";
import Link from "next/link";

export interface TourStep {
  icon:    string;
  title:   string;
  desc:    string;
  action?: { label: string; href: string };
}

interface Props { title: string; steps: TourStep[] }

export default function TourCard({ title, steps }: Props) {
  const [idx, setIdx] = useState(0);
  const step = steps[idx];

  return (
    <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 flex items-center justify-between">
        <span className="text-white font-extrabold text-xs uppercase tracking-wide">{title} Tour</span>
        <span className="text-green-200 text-[10px]">{idx + 1} / {steps.length}</span>
      </div>
      <div className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0 transition-transform duration-200 hover:scale-110">{step.icon}</div>
          <div>
            <p className="font-extrabold text-gray-800 text-sm">{step.title}</p>
            <p className="text-xs text-gray-600 leading-relaxed mt-0.5">{step.desc}</p>
          </div>
        </div>
        {step.action && (
          <Link href={step.action.href}
            className="inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all active:scale-95">
            {step.action.label} →
          </Link>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-50">
          <button disabled={idx === 0} onClick={() => setIdx(i => i - 1)}
            className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors active:scale-95">← Prev</button>
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-2 rounded-full transition-all duration-200 ${i === idx ? "bg-green-600 w-4" : "bg-gray-300 hover:bg-gray-400 w-2"}`} />
            ))}
          </div>
          <button disabled={idx === steps.length - 1} onClick={() => setIdx(i => i + 1)}
            className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-gray-700 disabled:opacity-30 transition-colors active:scale-95">Next →</button>
        </div>
      </div>
    </div>
  );
}
