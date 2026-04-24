"use client";

import { useState } from "react";

interface YieldResult {
  crop: string;
  area: number;
  baseYield: number;
  projectedYield: number;
  bestCase: number;
  worstCase: number;
  revenueEstimate: number;
  revenueRange: [number, number];
  factors: { name: string; impact: number; emoji: string }[];
  recommendation: string;
}

const cropData: Record<string, { baseYield: number; pricePerTonne: number }> = {
  'Maize': { baseYield: 4.5, pricePerTonne: 280000 },
  'Tomatoes': { baseYield: 18, pricePerTonne: 180000 },
  'Rice': { baseYield: 3.5, pricePerTonne: 550000 },
  'Cassava': { baseYield: 22, pricePerTonne: 90000 },
  'Pepper': { baseYield: 8, pricePerTonne: 600000 },
  'Cowpea': { baseYield: 1.8, pricePerTonne: 450000 },
  'Soybeans': { baseYield: 2.0, pricePerTonne: 380000 },
  'Groundnuts': { baseYield: 2.5, pricePerTonne: 420000 },
};

function calcYield(form: Record<string, string>): YieldResult {
  const data = cropData[form.crop] || cropData['Maize'];
  const area = parseFloat(form.area) || 1;
  const seedScore = { 'certified': 1.2, 'improved': 1.0, 'local': 0.75 }[form.seedQuality] || 1.0;
  const irrigScore = { 'drip': 1.35, 'sprinkler': 1.2, 'flood': 1.05, 'rain-fed': 0.85 }[form.irrigation] || 1.0;
  const fertScore = { 'optimal': 1.3, 'moderate': 1.0, 'minimal': 0.7, 'none': 0.5 }[form.fertilizer] || 1.0;

  const projYield = data.baseYield * seedScore * irrigScore * fertScore;
  const best = projYield * 1.2;
  const worst = projYield * 0.7;
  const revenue = projYield * area * data.pricePerTonne;

  const factors = [
    { name: 'Seed Quality', impact: Math.round((seedScore - 1) * 100), emoji: '🌱' },
    { name: 'Irrigation', impact: Math.round((irrigScore - 1) * 100), emoji: '💧' },
    { name: 'Fertilizer', impact: Math.round((fertScore - 1) * 100), emoji: '🧪' },
  ];

  return {
    crop: form.crop, area,
    baseYield: data.baseYield,
    projectedYield: Math.round(projYield * 10) / 10,
    bestCase: Math.round(best * 10) / 10,
    worstCase: Math.round(worst * 10) / 10,
    revenueEstimate: Math.round(revenue),
    revenueRange: [Math.round(worst * area * data.pricePerTonne), Math.round(best * area * data.pricePerTonne)],
    factors,
    recommendation: projYield > data.baseYield * 1.2
      ? '🚀 Excellent input combination! You are set for above-average yields.'
      : projYield > data.baseYield
      ? '✅ Good setup. Minor improvements in irrigation or seed quality can push you to top 20%.'
      : '⚠️ Below baseline — consider upgrading seed variety and irrigation system to improve profitability.',
  };
}

export default function YieldPredictor() {
  const [form, setForm] = useState({ crop: 'Maize', area: '2', seedQuality: 'improved', irrigation: 'rain-fed', fertilizer: 'moderate' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<YieldResult | null>(null);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => { setResult(calcYield(form)); setLoading(false); }, 1200);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-800 text-lg mb-1">Yield Predictor</h3>
        <p className="text-sm text-gray-500 mb-5">Model your expected harvest based on seed quality, irrigation, and fertilizer input level.</p>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Crop</label>
              <select value={form.crop} onChange={e => update('crop', e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400">
                {Object.keys(cropData).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Farm Size (ha)</label>
              <input value={form.area} onChange={e => update('area', e.target.value)} type="number" min="0.1" step="0.5"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
          </div>

          {[
            { key: 'seedQuality', label: '🌱 Seed Quality', options: [['certified','Certified Hybrid'],['improved','Improved Variety'],['local','Local/Landseed']] },
            { key: 'irrigation', label: '💧 Irrigation System', options: [['drip','Drip Irrigation'],['sprinkler','Sprinkler'],['flood','Flood/Furrow'],['rain-fed','Rain-fed Only']] },
            { key: 'fertilizer', label: '🧪 Fertilizer Application', options: [['optimal','Optimal (Soil-tested)'],['moderate','Moderate'],['minimal','Minimal'],['none','None']] },
          ].map(({ key, label, options }) => (
            <div key={key}>
              <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
              <div className="grid grid-cols-2 gap-2">
                {options.map(([val, lbl]) => (
                  <button key={val} onClick={() => update(key, val)}
                    className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all border-2 text-left
                      ${form[key as keyof typeof form] === val ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {lbl}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button onClick={handlePredict} disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md
              ${loading ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {loading ? '📊 Calculating...' : '📊 Predict Yield & Revenue'}
          </button>
        </div>
      </div>

      <div>
        {!result && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 text-center h-full flex flex-col items-center justify-center">
            <span className="text-5xl mb-3">📊</span>
            <h3 className="font-bold text-green-800 mb-2">Yield Projection Engine</h3>
            <p className="text-green-600 text-sm">Configure your inputs and get projected yields based on agronomic models calibrated for Nigerian conditions.</p>
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-fadeIn">
            {/* Main Yield Card */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-5 text-white">
              <p className="text-green-200 text-xs font-semibold uppercase tracking-wide mb-1">Projected Yield — {result.crop} ({result.area} ha)</p>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-extrabold">{result.projectedYield}</span>
                <span className="text-green-200 text-lg mb-1">tonnes/ha</span>
              </div>
              <div className="flex gap-4 text-sm text-green-100 mb-3">
                <span>↑ Best: {result.bestCase} t/ha</span>
                <span>↓ Worst: {result.worstCase} t/ha</span>
              </div>
              <div className="bg-white/20 rounded-xl px-4 py-2">
                <p className="text-xs text-green-200">Total Revenue Estimate ({result.area} ha)</p>
                <p className="text-2xl font-extrabold">₦{result.revenueEstimate.toLocaleString()}</p>
                <p className="text-xs text-green-200">Range: ₦{result.revenueRange[0].toLocaleString()} – ₦{result.revenueRange[1].toLocaleString()}</p>
              </div>
            </div>

            {/* Factors */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <h4 className="font-bold text-gray-800 text-sm mb-3">Input Impact on Yield</h4>
              <div className="space-y-3">
                {result.factors.map(f => (
                  <div key={f.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-700">{f.emoji} {f.name}</span>
                      <span className={`text-xs font-bold ${f.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {f.impact >= 0 ? '+' : ''}{f.impact}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${f.impact >= 20 ? 'bg-green-500' : f.impact >= 0 ? 'bg-amber-400' : 'bg-red-400'}`}
                        style={{ width: `${Math.min(Math.abs(f.impact) + 20, 100)}%` }} />
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs mt-4 p-3 bg-green-50 rounded-xl text-green-700">{result.recommendation}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
