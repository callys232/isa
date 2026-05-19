"use client";

import { useState } from "react";

const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];
const CROPS  = ["Maize","Tomatoes","Cassava","Yam","Rice","Cowpea","Pepper","Onions","Soybeans","Groundnuts","Plantain","Cocoa","Cotton","Wheat","Millet","Sorghum","Other"];
const SOILS  = ["Loamy","Sandy","Clay","Silty","Mixed"];

interface Props { onSuccess?: () => void; }

export default function FarmProfileCard({ onSuccess }: Props) {
  const [farmName, setFarmName] = useState("");
  const [state,    setState]    = useState("Oyo");
  const [size,     setSize]     = useState("");
  const [crop,     setCrop]     = useState(CROPS[0]);
  const [soil,     setSoil]     = useState(SOILS[0]);
  const [phone,    setPhone]    = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!farmName.trim() || !size) { setError("Farm name and size are required."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); onSuccess?.(); }, 800);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all";

  if (done) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
      <div className="text-4xl mb-3">🌾</div>
      <h3 className="font-extrabold text-gray-800 mb-1">Farm profile created!</h3>
      <p className="text-sm text-gray-500">Your farm is now connected to the ISA Dashboard.</p>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-700 to-teal-700 px-5 py-4">
        <p className="text-white font-extrabold text-sm">🌾 Set Up Your Farm Profile</p>
        <p className="text-green-200 text-[10px] mt-0.5">Helps the AI give you accurate recommendations</p>
      </div>
      <form onSubmit={submit} className="p-5 space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Farm Name *</label>
          <input value={farmName} onChange={e => setFarmName(e.target.value)} placeholder="e.g. Green Valley Farm" className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)} className={inp}>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Size (hectares) *</label>
            <input type="number" min="0.1" step="0.1" value={size} onChange={e => setSize(e.target.value)} placeholder="e.g. 2.5" className={inp} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Primary Crop</label>
            <select value={crop} onChange={e => setCrop(e.target.value)} className={inp}>
              {CROPS.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Soil Type</label>
            <select value={soil} onChange={e => setSoil(e.target.value)} className={inp}>
              {SOILS.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Farm Phone</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 803 xxx xxxx" className={inp} />
        </div>
        <button type="submit" disabled={loading}
          className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md
            ${loading ? "bg-green-400 cursor-wait" : "bg-green-700 hover:bg-green-800 hover:shadow-lg hover:-translate-y-0.5"}`}>
          {loading ? "Saving…" : "🌾 Save Farm Profile →"}
        </button>
      </form>
    </div>
  );
}
