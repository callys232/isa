"use client";

import Link from "next/link";
import { mockSensors, mockWeather } from "@/src/mocks/mockDashboard";

const statusColors = {
  optimal: 'text-green-600 bg-green-100',
  warning: 'text-amber-600 bg-amber-100',
  critical: 'text-red-600 bg-red-100',
};

export default function DashboardPreview() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* Text Side */}
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              Live IoT Monitoring
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              Your Farm's Vital Signs.<br />In Real Time.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-5">
              Know exactly what's happening in your fields — soil moisture, temperature, pH, nitrogen levels — all from your phone. Get smart alerts before problems become crop losses.
            </p>
            <ul className="space-y-2 mb-6">
              {['Soil moisture, temperature & pH sensors', 'Automated irrigation trigger alerts', '7-day AI weather forecast per farm', 'Fall Armyworm & disease early warnings'].map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/dashboard"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md">
              Open Farm Dashboard →
            </Link>
          </div>

          {/* Dashboard Preview Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Mini Dashboard Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 px-5 py-3 flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs">Green Valley Farm · Ibadan</p>
                <p className="text-white font-bold text-sm">Tomatoes · 34 days to harvest</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
                <span className="text-green-200 text-xs font-medium">Live</span>
              </div>
            </div>

            {/* Weather Bar */}
            <div className="flex items-center gap-4 px-5 py-3 bg-sky-50 border-b border-sky-100">
              <span className="text-2xl">{mockWeather.icon}</span>
              <div>
                <span className="font-extrabold text-sky-700 text-lg">{mockWeather.temp}°C</span>
                <span className="text-sky-500 text-xs ml-1">{mockWeather.condition}</span>
              </div>
              <div className="flex gap-3 ml-auto text-xs text-sky-600">
                <span>💧 {mockWeather.humidity}%</span>
                <span>💨 {mockWeather.windSpeed}km/h</span>
              </div>
            </div>

            {/* Sensor Readings */}
            <div className="p-4 grid grid-cols-2 gap-3">
              {mockSensors.slice(0, 4).map(sensor => {
                const pct = ((sensor.value - sensor.min) / (sensor.max - sensor.min)) * 100;
                return (
                  <div key={sensor.id} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs text-gray-600 font-medium">{sensor.icon} {sensor.label}</span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${statusColors[sensor.status]}`}>
                        {sensor.status}
                      </span>
                    </div>
                    <div className="text-xl font-extrabold text-gray-800">{sensor.value}<span className="text-xs text-gray-400 font-normal ml-0.5">{sensor.unit}</span></div>
                    <div className="mt-1.5 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sensor.status === 'optimal' ? 'bg-green-500' : sensor.status === 'warning' ? 'bg-amber-400' : 'bg-red-500'}`}
                        style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Alert Preview */}
            <div className="mx-4 mb-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <span className="text-lg">⚠️</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-amber-800">Nitrogen Deficiency Detected</p>
                <p className="text-xs text-amber-600 truncate">Field 1 — 38ppm below optimal range</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
