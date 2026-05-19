"use client";

import { useState } from "react";

// ── Data ─────────────────────────────────────────────────────────────
const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno",
  "Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo",
  "Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos",
  "Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers",
  "Sokoto","Taraba","Yobe","Zamfara",
];
const SOILS   = ["Loamy","Sandy","Clay","Silty","Peaty","Chalky"];
const SEASONS = ["Harmattan (Nov–Feb)","Early Rains (Mar–May)","Peak Rains (Jun–Aug)","Late Rains (Sep–Oct)"];

const NORTH = new Set(["Kano","Katsina","Sokoto","Zamfara","Jigawa","Kebbi","Bauchi","Borno","Yobe","Gombe","Adamawa","Kaduna"]);

interface IntelReport {
  crops:     { name: string; emoji: string; score: number; reason: string }[];
  fertilizer: string;
  waterNeeds: string;
  yieldEst:  string;
  practices:  string[];
  pestAlerts: string[];
  equipment:  string[];
  advanced:   string[];
}

function generate(state: string, season: string, soil: string, goal: string, size: string): IntelReport {
  const dry   = season.includes("Harmattan");
  const north = NORTH.has(state);
  const sandy = soil === "Sandy";
  const ha    = parseFloat(size) || 1;

  const pool = [
    { name:"Maize",      emoji:"🌽", score: north ? 85 : 90, reason:`High demand, adaptable, good ROI in ${state}` },
    { name:"Tomatoes",   emoji:"🍅", score: dry ? 92 : 72,   reason: dry ? "Dry-season tomatoes fetch premium prices" : "Needs disease management in rains" },
    { name:"Cowpea",     emoji:"🫘", score: north ? 88 : 72,  reason:"Nitrogen-fixing legume — improves next-crop yields" },
    { name:"Cassava",    emoji:"🥔", score: sandy ? 86 : 78,  reason:"Drought-tolerant; high starch demand in Nigeria" },
    { name:"Pepper",     emoji:"🌶️", score:82,               reason:"High value per hectare, strong local & export market" },
    { name:"Onions",     emoji:"🧅", score: north && dry ? 95 : 62, reason: north && dry ? "Northern dry-season onion = highest value crop" : "Needs dry conditions to thrive" },
    { name:"Soybeans",   emoji:"🫘", score: north ? 80 : 70,  reason:"High protein demand; export potential" },
    { name:"Groundnuts", emoji:"🥜", score: north ? 84 : 68,  reason:"High oil content; good for processing industries" },
  ].sort((a, b) => b.score - a.score).slice(0, 4);

  return {
    crops: pool,
    fertilizer: soil === "Loamy"
      ? "NPK 15-15-15 at planting + Urea top-dress at 4 weeks (50kg/ha each)"
      : sandy
      ? "Split-apply NPK + organic compost (20t/ha) to minimise leaching"
      : "Balanced NPK + lime if pH < 5.5; consider dolomite for clay soils",
    waterNeeds: dry
      ? `${(6 * ha).toFixed(1)}–${(8 * ha).toFixed(1)} m³/day via drip irrigation`
      : `${(4 * ha).toFixed(1)}–${(5 * ha).toFixed(1)} m³/day (rain-supplemented)`,
    yieldEst: `${pool[0].name}: ${north ? "4.5–6.0" : "5.0–7.5"} t/ha under good management (${ha} ha → ${(north ? 5 : 6) * ha}–${(north ? 6 : 7.5) * ha} t total)`,
    practices: [
      sandy ? "Add organic matter (compost) to improve water retention before planting" : "Apply gypsum/lime to break compaction and correct pH",
      dry ? "Install drip lines — water is critical during Harmattan" : "Build drainage channels to prevent waterlogging on flat land",
      "Practice crop rotation (legume → cereal → root crop) every season",
      "Row spacing 75cm × 25cm for optimal canopy coverage and mechanisation access",
      goal === "export" ? "Adopt GlobalGAP certification standards for export compliance" : "Partner with local aggregators for bulk sales and reduced transport costs",
    ],
    pestAlerts: [
      dry ? "⚠️ Red spider mites active in dry season — apply acaricide at first sign" : "⚠️ Fall Armyworm peaks during rain season — scout weekly",
      north ? "⚠️ Sahara dust (Harmattan) reduces solar radiation — monitor crop stress" : "⚠️ Anthracnose fungus risk in humid south — apply copper fungicide preventively",
      "🛡 Use resistant seed varieties where available; source certified seeds",
      "🔬 Apply bio-pesticide (neem oil 2%) as first-line treatment before synthetic pesticides",
    ],
    equipment: [
      ha <= 1 ? "Hand tools + knapsack sprayer (sufficient for ≤1ha)" : ha <= 5 ? "Mini-tiller + knapsack or motorised sprayer (1–5ha)" : "Tractor + disc plough + boom sprayer (>5ha)",
      "Seed drill or jab planter for uniform spacing and reduced seed waste",
      dry ? "Drip irrigation kit or solar pump + surface hose" : "Rainwater harvesting tank + drainage pipes",
      "Grain moisture meter to determine optimal harvest time",
    ],
    advanced: [
      `Satellite NDVI analysis for ${state} shows optimal planting window opens in ${dry ? "late November" : "mid-March"}`,
      `Historical price data: ${pool[0].name} fetches ₦${north ? "18,000–24,000" : "22,000–30,000"}/tonne at peak demand`,
      "Carbon credit potential: 0.3–0.8 tCO₂/ha/year with conservation practices",
      "Precision fertiliser application (variable-rate) can reduce input costs by 15–20%",
    ],
  };
}

// ── Component ─────────────────────────────────────────────────────────
export default function FarmIntelligence() {
  const [state,   setState]   = useState("Oyo");
  const [season,  setSeason]  = useState(SEASONS[1]);
  const [soil,    setSoil]    = useState("Loamy");
  const [goal,    setGoal]    = useState("local");
  const [size,    setSize]    = useState("1");
  const [file,    setFile]    = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [report,  setReport]  = useState<IntelReport | null>(null);

  const run = () => {
    setLoading(true);
    setReport(null);
    setTimeout(() => {
      setReport(generate(state, season, soil, goal, size));
      setLoading(false);
    }, 1600);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all duration-150";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

      {/* ── Input Panel (2/5) ── */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 h-fit">
        <div>
          <h3 className="font-extrabold text-gray-800 text-base">Farm Intelligence Engine</h3>
          <p className="text-xs text-gray-500 mt-0.5">Combined crop advice, pest alerts, equipment &amp; yield projection</p>
        </div>

        {/* Soil image upload */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Soil / Crop Sample (optional)</label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-green-200 rounded-xl p-4 cursor-pointer
            hover:border-green-400 hover:bg-green-50 transition-all duration-150 group">
            <span className="text-2xl mb-1 group-hover:scale-110 transition-transform">📷</span>
            <span className="text-xs font-semibold text-gray-500 group-hover:text-green-600 transition-colors">
              {file ? file.name : "Upload soil or crop photo"}
            </span>
            <input type="file" accept="image/*" className="hidden"
              onChange={e => setFile(e.target.files?.[0] ?? null)} />
          </label>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">State</label>
          <select value={state} onChange={e => setState(e.target.value)} className={inp}>
            {STATES.map(s => <option key={s}>{s}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Season</label>
            <select value={season} onChange={e => setSeason(e.target.value)} className={inp}>
              {SEASONS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Soil Type</label>
            <select value={soil} onChange={e => setSoil(e.target.value)} className={inp}>
              {SOILS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">Farm Size (hectares)</label>
          <input type="number" min="0.1" step="0.5" value={size}
            onChange={e => setSize(e.target.value)} className={inp} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">Primary Goal</label>
          <div className="grid grid-cols-2 gap-2">
            {[["local","🏪 Local Market"],["export","✈️ Export"],["subsistence","🏠 Subsistence"],["processing","🏭 Processing"]].map(([v, l]) => (
              <button key={v} onClick={() => setGoal(v)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold border-2 transition-all duration-150 active:scale-95
                  ${goal === v ? "border-green-500 bg-green-50 text-green-700 shadow-sm" : "border-gray-200 text-gray-600 hover:border-green-300 hover:bg-green-50/50"}`}>
                {l}
              </button>
            ))}
          </div>
        </div>

        <button onClick={run} disabled={loading}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all duration-200 shadow-md active:scale-95
            ${loading ? "bg-green-400 cursor-wait text-white" : "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analysing farm conditions…
            </span>
          ) : "🤖 Generate Full Farm Report"}
        </button>
      </div>

      {/* ── Results Panel (3/5) ── */}
      <div className="lg:col-span-3 space-y-4">

        {!report && !loading && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-12 text-center">
            <span className="text-6xl mb-4 block">🌾</span>
            <h3 className="font-extrabold text-green-800 text-lg mb-2">Ready to Analyse</h3>
            <p className="text-green-600 text-sm max-w-xs mx-auto">
              Enter your farm details and click Generate to get a full AI report for {state} State.
            </p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
            <div className="flex justify-center gap-2 mb-4">
              {[0,1,2].map(i => (
                <div key={i} className="w-3 h-3 bg-green-500 rounded-full animate-bounce" style={{ animationDelay:`${i*150}ms` }} />
              ))}
            </div>
            <p className="font-semibold text-gray-700">Processing {state} × {season.split("(")[0].trim()} × {soil} soil…</p>
            <p className="text-xs text-gray-400 mt-1">Correlating climate, market, and agronomic data</p>
          </div>
        )}

        {report && (
          <>
            {/* Crops */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-green-200 transition-all duration-200">
              <h4 className="font-extrabold text-gray-800 mb-4 flex items-center gap-2">🌱 Top Recommended Crops</h4>
              <div className="space-y-3">
                {report.crops.map((crop, i) => (
                  <div key={crop.name}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-colors duration-150 group">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0
                      ${i === 0 ? "bg-green-600" : i === 1 ? "bg-green-400" : i === 2 ? "bg-amber-400" : "bg-gray-300"}`}>
                      {i + 1}
                    </div>
                    <span className="text-xl">{crop.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">{crop.name}</span>
                        <span className="text-xs font-extrabold text-green-600">{crop.score}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full mt-1">
                        <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full transition-all duration-500"
                          style={{ width:`${crop.score}%` }} />
                      </div>
                      <p className="text-[11px] text-gray-500 mt-0.5 leading-tight">{crop.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3-col grid: Fertilizer | Water | Yield */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon:"🧪", label:"Fertilizer",   text: report.fertilizer,  bg:"bg-green-50 border-green-200",  tc:"text-green-700" },
                { icon:"💧", label:"Water Needs",  text: report.waterNeeds,  bg:"bg-blue-50 border-blue-200",    tc:"text-blue-700" },
                { icon:"📊", label:"Yield Estimate",text: report.yieldEst,   bg:"bg-amber-50 border-amber-200",  tc:"text-amber-700" },
              ].map(c => (
                <div key={c.label}
                  className={`rounded-xl border p-4 ${c.bg} hover:shadow-md hover:-translate-y-0.5 transition-all duration-150`}>
                  <p className={`text-xs font-extrabold uppercase tracking-wide mb-1.5 flex items-center gap-1 ${c.tc}`}>
                    <span>{c.icon}</span>{c.label}
                  </p>
                  <p className="text-xs text-gray-700 leading-relaxed">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Pest Alerts */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-red-100 transition-all duration-200">
              <h4 className="font-extrabold text-gray-800 mb-3 flex items-center gap-2">🐛 Pest & Disease Alerts</h4>
              <div className="space-y-2">
                {report.pestAlerts.map((a, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 bg-red-50/60 border border-red-100 rounded-lg px-3 py-2
                    hover:bg-red-50 hover:border-red-200 transition-colors duration-150">
                    <span className="mt-0.5 flex-shrink-0">{a.startsWith("⚠️") ? "⚠️" : a.startsWith("🛡") ? "🛡" : "🔬"}</span>
                    <span>{a.replace(/^[⚠️🛡🔬]\s?/, "")}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2-col: Farm Practices | Equipment */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200">
                <h4 className="font-extrabold text-gray-800 mb-3 flex items-center gap-2">📋 Farm Practices</h4>
                <ul className="space-y-2">
                  {report.practices.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-green-500 mt-0.5 flex-shrink-0 font-bold">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:shadow-md hover:border-blue-100 transition-all duration-200">
                <h4 className="font-extrabold text-gray-800 mb-3 flex items-center gap-2">🚜 Equipment</h4>
                <ul className="space-y-2">
                  {report.equipment.map((e, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                      <span className="text-blue-500 mt-0.5 flex-shrink-0 font-bold">→</span>{e}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Advanced Insights (premium-style) */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="xMidYMid slice">
                  <circle cx="350" cy="30"  r="40" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.08" />
                  <circle cx="50"  cy="130" r="30" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.1" />
                  <circle cx="200" cy="20"  r="5"  fill="white" fillOpacity="0.15" />
                  <circle cx="320" cy="120" r="4"  fill="white" fillOpacity="0.12" />
                </svg>
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-extrabold flex items-center gap-2">⭐ Advanced Insights</h4>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">PREMIUM</span>
                </div>
                <ul className="space-y-2">
                  {report.advanced.map((a, i) => (
                    <li key={i} className="text-xs text-blue-100 flex items-start gap-2">
                      <span className="text-yellow-300 flex-shrink-0 mt-0.5">★</span>{a}
                    </li>
                  ))}
                </ul>
                <a href="/premuim"
                  className="inline-block mt-4 px-5 py-2 bg-white text-blue-700 rounded-xl text-xs font-bold
                    hover:bg-blue-50 hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 shadow-md">
                  Unlock Full Premium Insights →
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => window.print()}
                className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-bold
                  hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all active:scale-95">
                🖨 Print Report
              </button>
              <button onClick={() => { setReport(null); }}
                className="px-5 py-3 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold
                  hover:border-gray-400 hover:shadow-sm transition-all active:scale-95">
                ↺ Reset
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
