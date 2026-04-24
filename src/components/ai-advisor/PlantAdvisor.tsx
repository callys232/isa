"use client";

import { useState } from "react";

const nigerianStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara',
];

const soilTypes = ['Sandy', 'Clay', 'Loamy', 'Silty', 'Peaty', 'Chalky'];
const seasons = ['Harmattan (Nov–Feb)', 'Early Rains (Mar–May)', 'Peak Rains (Jun–Aug)', 'Late Rains (Sep–Oct)'];

interface Advisory {
  topCrops: { name: string; emoji: string; score: number; reason: string }[];
  practices: string[];
  warnings: string[];
  fertilizer: string;
  waterNeeds: string;
  expectedYield: string;
}

function generateAdvisory(state: string, season: string, soil: string, goal: string): Advisory {
  const isDrySeason = season.includes('Harmattan');
  const isNorth = ['Kano','Katsina','Sokoto','Zamfara','Jigawa','Kebbi','Bauchi','Borno','Yobe','Gombe','Adamawa'].includes(state);
  const isSandy = soil === 'Sandy';

  const cropPool = [
    { name: 'Maize', emoji: '🌽', score: isNorth ? 85 : 90, reason: 'High demand, widely adaptable, good ROI in ' + state },
    { name: 'Tomatoes', emoji: '🍅', score: isDrySeason ? 92 : 75, reason: isDrySeason ? 'Dry season tomatoes command premium prices' : 'Rainy season requires disease management' },
    { name: 'Cowpea', emoji: '🫘', score: isNorth ? 88 : 72, reason: 'Nitrogen-fixing legume, excellent for soil health' },
    { name: 'Cassava', emoji: '🥔', score: isSandy ? 85 : 78, reason: 'Drought-tolerant, high starch demand in Nigeria' },
    { name: 'Pepper', emoji: '🌶️', score: 82, reason: 'High value per hectare, strong local market demand' },
    { name: 'Soybeans', emoji: '🫘', score: isNorth ? 80 : 70, reason: 'High protein demand, export potential' },
    { name: 'Onions', emoji: '🧅', score: isNorth && isDrySeason ? 93 : 65, reason: isNorth && isDrySeason ? 'Northern dry season onion is the highest value crop' : 'Requires dry conditions to thrive' },
    { name: 'Groundnuts', emoji: '🥜', score: isNorth ? 84 : 68, reason: 'High oil content, good for processing industries' },
  ];

  const sorted = cropPool.sort((a, b) => b.score - a.score).slice(0, 4);

  return {
    topCrops: sorted,
    practices: [
      `Apply ${soil === 'Sandy' ? 'organic matter to improve water retention' : 'gypsum to break clay compaction'} before planting`,
      isDrySeason ? 'Invest in drip irrigation — water is critical during Harmattan' : 'Ensure proper drainage to prevent waterlogging',
      'Practice crop rotation to reduce pest buildup and improve soil fertility',
      'Use row spacing of 75cm × 25cm for optimal canopy coverage',
      goal === 'export' ? 'Adopt GlobalGAP certification standards for export compliance' : 'Partner with local aggregators for bulk sales',
    ],
    warnings: [
      isDrySeason ? '⚠️ Frost risk in highland areas — mulch around root zone' : '⚠️ Watch for Fall Armyworm during peak rains',
      isNorth ? '⚠️ Sahara dust (Harmattan) can reduce solar radiation — monitor crop stress' : '⚠️ Waterlogging risk — plant on ridges or raised beds',
    ],
    fertilizer: soil === 'Loamy' ? 'NPK 15-15-15 at planting + urea top-dress at 4 weeks' : soil === 'Sandy' ? 'Split apply NPK + organic compost to minimize leaching' : 'Balanced NPK with lime if pH < 5.5',
    waterNeeds: isDrySeason ? '6–8mm/day via drip irrigation' : '4–5mm/day (rain-supplemented)',
    expectedYield: `${sorted[0].name}: ${isNorth ? '4.5–6.0' : '5.0–7.5'} tonnes/hectare under good management`,
  };
}

export default function PlantAdvisor() {
  const [form, setForm] = useState({ state: 'Oyo', season: seasons[1], soil: 'Loamy', goal: 'local', farmSize: '1' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Advisory | null>(null);

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleAnalyze = () => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(generateAdvisory(form.state, form.season, form.soil, form.goal));
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-800 text-lg mb-1">What Should I Plant?</h3>
        <p className="text-sm text-gray-500 mb-5">Answer 5 quick questions and get AI-powered planting recommendations.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Your State</label>
            <select value={form.state} onChange={e => update('state', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400">
              {nigerianStates.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Current Season</label>
            <select value={form.season} onChange={e => update('season', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400">
              {seasons.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Soil Type</label>
            <select value={form.soil} onChange={e => update('soil', e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400">
              {soilTypes.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Farm Size (hectares)</label>
            <input value={form.farmSize} onChange={e => update('farmSize', e.target.value)}
              type="number" min="0.1" step="0.5"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Goal</label>
            <div className="grid grid-cols-2 gap-2">
              {[['local', '🏪 Local Market'], ['export', '✈️ Export'], ['subsistence', '🏠 Subsistence'], ['processing', '🏭 Processing']].map(([val, label]) => (
                <button key={val} onClick={() => update('goal', val)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all border-2
                    ${form.goal === val ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleAnalyze} disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md
              ${loading ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Analyzing your farm conditions...
              </span>
            ) : '🤖 Get AI Recommendations'}
          </button>
        </div>
      </div>

      {/* Results Panel */}
      <div className="space-y-4">
        {!result && !loading && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 text-center h-full flex flex-col items-center justify-center">
            <span className="text-5xl mb-3">🌾</span>
            <h3 className="font-bold text-green-800 mb-2">Ready to Advise</h3>
            <p className="text-green-600 text-sm">Fill in your farm details and click Analyze to get personalized crop recommendations for {form.state} State.</p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="flex justify-center gap-1.5 mb-4">
              {[0,1,2].map(i => <div key={i} className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />)}
            </div>
            <p className="text-gray-700 font-semibold">Analyzing soil, climate, and market data...</p>
            <p className="text-gray-400 text-xs mt-1">Processing {form.state} × {form.season} × {form.soil} soil</p>
          </div>
        )}

        {result && (
          <>
            {/* Top Crops */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">🌱 Top Recommended Crops</h4>
              <div className="space-y-3">
                {result.topCrops.map((crop, i) => (
                  <div key={crop.name} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${i === 0 ? 'bg-green-600' : i === 1 ? 'bg-green-400' : 'bg-gray-300'}`}>
                      {i + 1}
                    </div>
                    <div className="text-xl">{crop.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-800 text-sm">{crop.name}</span>
                        <span className="text-xs font-bold text-green-600">{crop.score}% match</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${crop.score}%` }} />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5">{crop.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Practices & Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 mb-3">📋 Management Plan</h4>
              <ul className="space-y-1.5">
                {result.practices.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-green-500 mt-0.5 shrink-0">✓</span>{p}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-1 gap-3 mt-4">
                <div className="bg-green-50 rounded-xl p-3 text-xs">
                  <span className="font-bold text-green-700">💊 Fertilizer: </span>
                  <span className="text-gray-700">{result.fertilizer}</span>
                </div>
                <div className="bg-blue-50 rounded-xl p-3 text-xs">
                  <span className="font-bold text-blue-700">💧 Water Needs: </span>
                  <span className="text-gray-700">{result.waterNeeds}</span>
                </div>
                <div className="bg-amber-50 rounded-xl p-3 text-xs">
                  <span className="font-bold text-amber-700">📊 Yield Estimate: </span>
                  <span className="text-gray-700">{result.expectedYield}</span>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                {result.warnings.map((w, i) => (
                  <div key={i} className="text-xs text-amber-700 bg-amber-50 rounded-lg px-3 py-2">{w}</div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
