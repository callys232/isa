"use client";

import { CurrentWeather, WeatherDay } from "@/src/types/dashboard";

interface WeatherWidgetProps {
  current: CurrentWeather;
  forecast: WeatherDay[];
}

export default function WeatherWidget({ current, forecast }: WeatherWidgetProps) {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sky-200 text-xs font-semibold uppercase tracking-wide mb-1">Current Weather</p>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-extrabold">{current.temp}°</span>
            <span className="text-sky-200 text-sm mb-1">Feels {current.feelsLike}°C</span>
          </div>
          <p className="text-sky-100 text-sm mt-1">{current.condition}</p>
          <p className="text-sky-200 text-xs mt-0.5">📍 {current.location}</p>
        </div>
        <div className="text-right">
          <div className="text-5xl">{current.icon}</div>
          <div className="mt-2 space-y-1 text-xs text-sky-200">
            <p>💧 {current.humidity}% humidity</p>
            <p>💨 {current.windSpeed} km/h</p>
            <p>🌧️ {current.rainfall}mm rainfall</p>
          </div>
        </div>
      </div>

      {/* Farming Advisory */}
      <div className="bg-white/15 rounded-xl px-3 py-2 mb-4 text-xs">
        <span className="font-bold text-white">🌾 Farm Advisory: </span>
        <span className="text-sky-100">
          {current.humidity > 80
            ? 'High humidity — monitor for fungal disease. Increase air circulation.'
            : current.temp > 35
            ? 'High temperatures — increase irrigation frequency.'
            : 'Conditions are suitable for field operations today.'}
        </span>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <p className="text-sky-200 text-xs font-semibold uppercase tracking-wide mb-3">7-Day Forecast</p>
        <div className="grid grid-cols-7 gap-1">
          {forecast.map(day => (
            <div key={day.day} className="flex flex-col items-center gap-1">
              <span className="text-sky-200 text-[10px] font-semibold">{day.day}</span>
              <span className="text-lg">{day.icon}</span>
              <span className="text-white text-[11px] font-bold">{day.high}°</span>
              <span className="text-sky-300 text-[10px]">{day.low}°</span>
              {day.rainChance > 40 && (
                <span className="text-[9px] text-sky-200">{day.rainChance}%</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
