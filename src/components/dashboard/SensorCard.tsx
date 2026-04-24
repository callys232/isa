"use client";

import { SensorData } from "@/src/types/dashboard";

interface SensorCardProps {
  sensor: SensorData;
}

const statusColors = {
  optimal:  { ring: 'stroke-green-500',  bg: 'bg-green-50',  text: 'text-green-700',  badge: 'bg-green-100 text-green-700',  label: 'Optimal' },
  warning:  { ring: 'stroke-amber-400',  bg: 'bg-amber-50',  text: 'text-amber-700',  badge: 'bg-amber-100 text-amber-700',  label: 'Warning' },
  critical: { ring: 'stroke-red-500',    bg: 'bg-red-50',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700',      label: 'Critical' },
};

const trendIcons = { up: '↑', down: '↓', stable: '→' };
const trendColors = { up: 'text-blue-500', down: 'text-orange-500', stable: 'text-gray-400' };

export default function SensorCard({ sensor }: SensorCardProps) {
  const colors = statusColors[sensor.status];
  const pct = Math.min(Math.max((sensor.value - sensor.min) / (sensor.max - sensor.min), 0), 1);

  // SVG arc gauge (semicircle)
  const r = 38;
  const cx = 50;
  const cy = 52;
  const circumference = Math.PI * r; // semicircle
  const filled = pct * circumference;
  const gap = circumference - filled;

  // Determine where optimal range falls on arc
  const optPctMin = (sensor.optimalMin - sensor.min) / (sensor.max - sensor.min);
  const optPctMax = (sensor.optimalMax - sensor.min) / (sensor.max - sensor.min);

  return (
    <div className={`rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 p-5 ${colors.bg} border-gray-100`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-2xl mb-0.5">{sensor.icon}</div>
          <h3 className="font-bold text-gray-800 text-sm">{sensor.label}</h3>
          <p className="text-[10px] text-gray-500 leading-tight">{sensor.description}</p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${colors.badge}`}>
            {colors.label}
          </span>
          <span className={`text-xs font-bold ${trendColors[sensor.trend]}`}>
            {trendIcons[sensor.trend]} {sensor.trend}
          </span>
        </div>
      </div>

      {/* SVG Semicircle Gauge */}
      <div className="flex flex-col items-center mb-3">
        <svg viewBox="0 0 100 60" className="w-32 h-20">
          {/* Background track */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none" stroke="#e5e7eb" strokeWidth="8" strokeLinecap="round"
          />
          {/* Filled arc */}
          <path
            d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
            fill="none"
            className={colors.ring}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${filled} ${gap}`}
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
          {/* Value text */}
          <text x={cx} y={cy - 8} textAnchor="middle" className="text-xs" style={{ fontSize: '13px', fontWeight: 700, fill: '#1f2937' }}>
            {sensor.value}
          </text>
          <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: '9px', fill: '#6b7280' }}>
            {sensor.unit}
          </text>
        </svg>
      </div>

      {/* Range Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-[9px] text-gray-400 mb-1">
          <span>{sensor.min}{sensor.unit}</span>
          <span className="text-green-600 font-semibold">Optimal: {sensor.optimalMin}–{sensor.optimalMax}{sensor.unit}</span>
          <span>{sensor.max}{sensor.unit}</span>
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
          {/* Optimal zone highlight */}
          <div
            className="absolute top-0 h-full bg-green-200 rounded-full"
            style={{ left: `${optPctMin * 100}%`, width: `${(optPctMax - optPctMin) * 100}%` }}
          />
          {/* Current value indicator */}
          <div
            className={`absolute top-0 w-2 h-2 rounded-full -translate-x-1 shadow ${sensor.status === 'optimal' ? 'bg-green-500' : sensor.status === 'warning' ? 'bg-amber-400' : 'bg-red-500'}`}
            style={{ left: `${pct * 100}%`, transition: 'left 0.6s ease' }}
          />
        </div>
      </div>
    </div>
  );
}
