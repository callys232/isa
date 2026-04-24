"use client";

import { useState } from "react";
import { FarmProfile } from "@/src/types/dashboard";
import { mockSensors, mockWeather, mockForecast, mockAlerts, mockFarms } from "@/src/mocks/mockDashboard";
import DashboardHeader from "@/src/components/dashboard/DashboardHeader";
import SensorCard from "@/src/components/dashboard/SensorCard";
import WeatherWidget from "@/src/components/dashboard/WeatherWidget";
import AlertFeed from "@/src/components/dashboard/AlertFeed";

export default function DashboardPage() {
  const [activeFarm, setActiveFarm] = useState<FarmProfile>(mockFarms[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshCount(c => c + 1);
      setRefreshing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <DashboardHeader
        farms={mockFarms}
        activeFarm={activeFarm}
        onFarmChange={setActiveFarm}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        {/* Page Title */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800">Farm Intelligence Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Real-time sensor data, weather, and crop health for {activeFarm.name}</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live · Last updated: just now
            {refreshCount > 0 && <span className="text-green-600 font-semibold">· Refreshed {refreshCount}×</span>}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Farm Health Score', value: `${activeFarm.healthScore}%`, icon: '💚', color: activeFarm.healthScore >= 80 ? 'text-green-600' : 'text-amber-600' },
            { label: 'Days to Harvest', value: activeFarm.daysToHarvest, icon: '🌾', color: 'text-green-700' },
            { label: 'Active Alerts', value: mockAlerts.filter(a => !a.resolved).length, icon: '🔔', color: 'text-amber-600' },
            { label: 'Sensors Online', value: `${mockSensors.length}/6`, icon: '📡', color: 'text-blue-600' },
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sensor Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">📡 Live Sensor Readings</h2>
            <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
              {activeFarm.area} · {activeFarm.crop}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSensors.map(sensor => (
              <SensorCard key={sensor.id + refreshCount} sensor={sensor} />
            ))}
          </div>
        </div>

        {/* Weather + Alerts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">🌦️ Weather Intelligence</h2>
            <WeatherWidget current={mockWeather} forecast={mockForecast} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">🔔 Smart Alerts</h2>
            <AlertFeed alerts={mockAlerts} />
          </div>
        </div>

        {/* IoT Upgrade CTA */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-6 text-white flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl font-extrabold mb-1">Upgrade to Full IoT Monitoring</h3>
            <p className="text-green-100 text-sm">Get physical soil sensors, drone imagery, and automated irrigation controls for your farm.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 bg-white text-green-700 rounded-xl font-bold text-sm hover:bg-green-50 transition-all shadow-md">
              View Hardware Plans
            </button>
            <button className="px-5 py-2.5 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all border border-white/30">
              Talk to Expert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
