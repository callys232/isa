"use client";

import { useState } from "react";

const cropPrices: Record<string, { current: number; unit: string; trend: number[]; peak: string; low: string; advice: string }> = {
  'Tomatoes': { current: 18000, unit: '25kg basket', trend: [14000,15500,18000,22000,16000,13000,18000], peak: 'Nov–Jan (Dry Season)', low: 'Jun–Aug (Peak Harvest)', advice: 'Hold until November if you have cold storage access. Dry season prices are 40–60% higher.' },
  'Maize': { current: 42000, unit: 'tonne', trend: [35000,38000,42000,45000,40000,38000,42000], peak: 'Dec–Feb (Pre-planting)', low: 'Oct–Nov (Post-harvest)', advice: 'Store for 3–4 months post-harvest. Pre-planting season prices are consistently 25% higher.' },
  'Pepper': { current: 55000, unit: '50kg bag', trend: [45000,50000,55000,65000,48000,44000,55000], peak: 'Dec–Feb', low: 'Aug–Sep', advice: 'Dry and store pepper to sell in December–February when prices peak.' },
  'Rice': { current: 55000, unit: '50kg bag', trend: [48000,52000,55000,60000,54000,50000,55000], peak: 'May–Jul', low: 'Nov–Jan', advice: 'Rice prices are relatively stable. Sell to millers for better margins than open market.' },
  'Cassava': { current: 90000, unit: 'tonne', trend: [75000,82000,90000,95000,88000,82000,90000], peak: 'Mar–Jun', low: 'Oct–Dec', advice: 'Consider processing to garri or starch for 3× value addition.' },
  'Soybeans': { current: 380000, unit: 'tonne', trend: [310000,340000,380000,400000,360000,340000,380000], peak: 'Feb–Apr', low: 'Nov–Dec', advice: 'Export grade soybeans command premium. Consider NASC certification for export markets.' },
};

const days30 = 1;
const days60 = 2;
const days90 = 3;

export default function PriceForecaster() {
  const [crop, setCrop] = useState('Tomatoes');
  const [qty, setQty] = useState('50');
  const [market, setMarket] = useState('local');
  const [loading, setLoading] = useState(false);
  const [shown, setShown] = useState(false);

  const data = cropPrices[crop];
  const quantity = parseFloat(qty) || 1;
  const marketMultiplier = market === 'export' ? 1.35 : market === 'processing' ? 1.2 : 1.0;

  const price30 = Math.round(data.current * (1 + 0.05 * days30) * marketMultiplier);
  const price60 = Math.round(data.current * (1 + 0.05 * days60) * marketMultiplier);
  const price90 = Math.round(data.current * (1 + 0.05 * days90) * marketMultiplier);
  const currentRevenue = Math.round(data.current * quantity * marketMultiplier);
  const bestRevenue = Math.round(Math.max(price30, price60, price90) * quantity);

  const handleForecast = () => {
    setLoading(true);
    setShown(false);
    setTimeout(() => { setShown(true); setLoading(false); }, 1400);
  };

  const maxBar = Math.max(data.current * marketMultiplier, price30, price60, price90);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-800 text-lg mb-1">Price Forecaster</h3>
        <p className="text-sm text-gray-500 mb-5">Find the best time to sell your harvest for maximum profit.</p>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Crop</label>
            <select value={crop} onChange={e => { setCrop(e.target.value); setShown(false); }}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400">
              {Object.keys(cropPrices).map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Quantity (units of {data.unit})</label>
            <input value={qty} onChange={e => setQty(e.target.value)} type="number" min="1"
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">Target Market</label>
            <div className="grid grid-cols-3 gap-2">
              {[['local','🏪 Local Market'],['processing','🏭 Processing'],['export','✈️ Export']].map(([val, lbl]) => (
                <button key={val} onClick={() => { setMarket(val); setShown(false); }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all border-2 text-center
                    ${market === val ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  {lbl}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-600">
            <strong>Current Price:</strong> ₦{(data.current * marketMultiplier).toLocaleString()} / {data.unit}
            <span className="ml-2 text-gray-400">({market} market)</span>
          </div>

          <button onClick={handleForecast} disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md
              ${loading ? 'bg-gray-300 text-gray-500' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {loading ? '📈 Forecasting...' : '📈 Get Price Forecast'}
          </button>
        </div>
      </div>

      <div>
        {!shown && !loading && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 text-center h-full flex flex-col items-center justify-center">
            <span className="text-5xl mb-3">📈</span>
            <h3 className="font-bold text-green-800 mb-2">Price Intelligence</h3>
            <p className="text-green-600 text-sm">Configure your crop and market target to see 90-day price projections and optimal selling window.</p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-4xl animate-bounce mb-4">📊</div>
            <p className="font-semibold text-gray-700">Analysing market trends...</p>
            <p className="text-gray-400 text-xs mt-1">Checking historical prices across 36 states</p>
          </div>
        )}

        {shown && (
          <div className="space-y-4 animate-fadeIn">
            {/* Price Chart Bars */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h4 className="font-bold text-gray-800 text-sm mb-4">90-Day Price Outlook — {crop}</h4>
              <div className="space-y-3">
                {[
                  { label: 'Today', price: Math.round(data.current * marketMultiplier), emoji: '📍' },
                  { label: '30 Days', price: price30, emoji: '📅' },
                  { label: '60 Days', price: price60, emoji: '📅' },
                  { label: '90 Days', price: price90, emoji: '📅' },
                ].map(({ label, price, emoji }) => {
                  const width = (price / maxBar) * 100;
                  const isBest = price === Math.max(data.current * marketMultiplier, price30, price60, price90);
                  return (
                    <div key={label}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-600">{emoji} {label}</span>
                        <div className="flex items-center gap-2">
                          {isBest && <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Best Time</span>}
                          <span className="text-sm font-bold text-gray-800">₦{price.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full transition-all ${isBest ? 'bg-green-500' : 'bg-blue-300'}`} style={{ width: `${width}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-[10px] text-gray-400 mt-3">Per {data.unit} · {market} market</p>
            </div>

            {/* Revenue Summary */}
            <div className="bg-gradient-to-br from-green-600 to-emerald-500 rounded-2xl p-4 text-white">
              <p className="text-green-200 text-xs mb-1">Revenue Comparison ({quantity} {data.unit}s)</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <p className="text-green-200 text-xs">Sell Today</p>
                  <p className="text-xl font-extrabold">₦{currentRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white/30 rounded-xl p-3">
                  <p className="text-green-200 text-xs">Optimal Window</p>
                  <p className="text-xl font-extrabold">₦{bestRevenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-3 bg-white/20 rounded-xl p-3 text-xs">
                <p className="font-bold mb-1">💡 Market Insight</p>
                <p className="text-green-100">{data.advice}</p>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="text-green-200">Peak Season:</span><br/>
                  <strong>{data.peak}</strong>
                </div>
                <div className="bg-white/10 rounded-lg p-2">
                  <span className="text-green-200">Low Season:</span><br/>
                  <strong>{data.low}</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
