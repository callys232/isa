"use client";

import { FarmProfile } from "@/src/types/dashboard";

interface DashboardHeaderProps {
  farms: FarmProfile[];
  activeFarm: FarmProfile;
  onFarmChange: (farm: FarmProfile) => void;
  onRefresh: () => void;
  refreshing: boolean;
}

function HealthBar({ score }: { score: number }) {
  const color = score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-amber-400' : 'bg-red-500';
  const label = score >= 80 ? 'Excellent' : score >= 60 ? 'Fair' : 'Needs Attention';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className={`text-xs font-bold ${score >= 80 ? 'text-green-600' : score >= 60 ? 'text-amber-600' : 'text-red-600'}`}>
        {score}% — {label}
      </span>
    </div>
  );
}

const irrigationConfig = {
  active: { dot: 'bg-green-500', label: 'Active', color: 'text-green-600' },
  idle:   { dot: 'bg-amber-400', label: 'Idle',   color: 'text-amber-600' },
  off:    { dot: 'bg-gray-400',  label: 'Off',    color: 'text-gray-500' },
};

export default function DashboardHeader({ farms, activeFarm, onFarmChange, onRefresh, refreshing }: DashboardHeaderProps) {
  const irr = irrigationConfig[activeFarm.irrigationStatus];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">

          {/* Farm Selector */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-400 flex items-center justify-center text-white text-lg shadow-sm">
              🌾
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Active Farm</p>
              <select
                value={activeFarm.id}
                onChange={e => {
                  const farm = farms.find(f => f.id === e.target.value);
                  if (farm) onFarmChange(farm);
                }}
                className="font-bold text-gray-800 bg-transparent border-none outline-none cursor-pointer text-sm"
              >
                {farms.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Farm Stats */}
          <div className="flex flex-wrap gap-4 md:gap-6 flex-1">
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Crop</p>
              <p className="text-sm font-bold text-gray-800">{activeFarm.crop}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Area</p>
              <p className="text-sm font-bold text-gray-800">{activeFarm.area}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Harvest In</p>
              <p className="text-sm font-bold text-green-700">{activeFarm.daysToHarvest} days</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide">Irrigation</p>
              <p className={`text-sm font-bold flex items-center gap-1 ${irr.color}`}>
                <span className={`w-2 h-2 rounded-full ${irr.dot} ${activeFarm.irrigationStatus === 'active' ? 'animate-pulse' : ''}`}></span>
                {irr.label}
              </p>
            </div>
            <div className="min-w-[160px]">
              <p className="text-[10px] text-gray-400 uppercase tracking-wide mb-1">Farm Health</p>
              <HealthBar score={activeFarm.healthScore} />
            </div>
          </div>

          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className={`px-4 py-2 rounded-xl border-2 border-green-200 text-green-700 text-sm font-bold
              hover:bg-green-50 transition-all flex items-center gap-2 shrink-0
              ${refreshing ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            <span className={refreshing ? 'animate-spin' : ''}>🔄</span>
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </div>
  );
}
