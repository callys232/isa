"use client";

import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  { icon: "📄", label: "Generate invoice",          action: "generate invoice" },
  { icon: "🌿", label: "Check crop prices",          action: "crop prices" },
  { icon: "📡", label: "View farm sensors",          action: "sensor dashboard" },
  { icon: "📅", label: "Schedule a task",            action: "schedule task" },
  { icon: "🛒", label: "Find market listings",        action: "marketplace listings" },
  { icon: "🔬", label: "Detect crop pests",          action: "pest detection" },
  { icon: "📊", label: "Predict harvest yield",      action: "yield prediction" },
  { icon: "🌦️", label: "Get weather forecast",       action: "weather forecast" },
];

interface Props {
  onCommand: (cmd: string) => void;
}

export default function SmartSearch({ onCommand }: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = value.trim()
    ? SUGGESTIONS.filter(s =>
        s.label.toLowerCase().includes(value.toLowerCase()) ||
        s.action.toLowerCase().includes(value.toLowerCase())
      )
    : [];

  const showDropdown = focused && filtered.length > 0;

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown")  { e.preventDefault(); setActiveIdx(i => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp")    { e.preventDefault(); setActiveIdx(i => Math.max(i - 1, -1)); }
    if (e.key === "Enter")      {
      if (activeIdx >= 0) { onCommand(filtered[activeIdx].action); setValue(""); setFocused(false); }
      else if (value.trim()) { onCommand(value.trim()); setValue(""); setFocused(false); }
    }
    if (e.key === "Escape") { setFocused(false); setActiveIdx(-1); }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Input */}
      <div className={`flex items-center bg-white/10 backdrop-blur-sm border rounded-2xl px-4 py-3 gap-3
        transition-all duration-200
        ${focused ? "border-white/60 bg-white/15 shadow-lg shadow-black/20 ring-2 ring-white/20" : "border-white/20 hover:border-white/40"}`}>
        <svg className="w-5 h-5 text-white/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref={inputRef}
          value={value}
          onChange={e => { setValue(e.target.value); setActiveIdx(-1); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => { setFocused(false); setActiveIdx(-1); }, 150)}
          onKeyDown={handleKey}
          placeholder="Search platform features, commands, data…"
          className="flex-1 bg-transparent text-white placeholder-white/50 text-sm focus:outline-none"
        />
        <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-white/40 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
          Ctrl K
        </kbd>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50"
          style={{ animation: "fadeDown 0.15s ease" }}>
          <style>{`@keyframes fadeDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }`}</style>
          {filtered.map((s, i) => (
            <button key={s.action}
              onMouseDown={() => { onCommand(s.action); setValue(""); setFocused(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm transition-all duration-100 active:scale-[0.99]
                ${activeIdx === i ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50"}`}>
              <span className="text-lg">{s.icon}</span>
              <span className="font-medium">{s.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Suggestion pills */}
      <div className="flex flex-wrap gap-2 mt-3">
        {SUGGESTIONS.slice(0, 5).map(s => (
          <button key={s.action}
            onClick={() => onCommand(s.action)}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full
              bg-white/10 text-white/80 border border-white/20
              hover:bg-white/20 hover:text-white hover:border-white/40 hover:shadow-md
              transition-all duration-150 active:scale-95">
            <span>{s.icon}</span>{s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
