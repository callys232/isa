"use client";

import { useState } from "react";

const CATEGORIES = ["Crops & Produce","Seeds","Fertilizer & Chemicals","Equipment & Machinery","Livestock","Land & Lease","Services"];
const STATES = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

interface Props { onSuccess?: () => void; onClose?: () => void; }

export default function PostListingCard({ onSuccess, onClose }: Props) {
  const [title,    setTitle]    = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price,    setPrice]    = useState("");
  const [unit,     setUnit]     = useState("per bag");
  const [qty,      setQty]      = useState("");
  const [state,    setState]    = useState("Lagos");
  const [desc,     setDesc]     = useState("");
  const [loading,  setLoading]  = useState(false);
  const [done,     setDone]     = useState(false);
  const [error,    setError]    = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!title.trim() || !price || !desc.trim()) { setError("Title, price, and description are required."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); onSuccess?.(); }, 900);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all";

  if (done) return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
      <div className="text-4xl mb-3">🎉</div>
      <h3 className="font-extrabold text-gray-800 mb-1">Listing published!</h3>
      <p className="text-sm text-gray-500 mb-4">Your listing is now live on the ISA Marketplace.</p>
      <button onClick={onClose} className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all active:scale-95">Close</button>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center justify-between">
        <div>
          <p className="text-white font-extrabold text-sm">🛒 Post a Marketplace Listing</p>
          <p className="text-green-200 text-[10px] mt-0.5">Reach buyers across all 36 Nigerian states</p>
        </div>
        {onClose && <button onClick={onClose} className="text-white/60 hover:text-white text-xl transition-colors">✕</button>}
      </div>
      <form onSubmit={submit} className="p-5 space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Product / Service Title *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Grade-A Tomatoes — Oyo State" className={inp} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Category</label>
            <select value={category} onChange={e => setCategory(e.target.value)} className={inp}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">State</label>
            <select value={state} onChange={e => setState(e.target.value)} className={inp}>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2">
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Price (₦) *</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 35000" className={inp} />
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Per</label>
            <select value={unit} onChange={e => setUnit(e.target.value)} className={inp}>
              {["per bag","per tonne","per kg","per crate","per unit","per litre","per hectare"].map(u => <option key={u}>{u}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Available Quantity</label>
          <input value={qty} onChange={e => setQty(e.target.value)} placeholder="e.g. 500 bags" className={inp} />
        </div>
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Description *</label>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={3} placeholder="Describe your product — grade, variety, harvest date, delivery terms…"
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all resize-none" />
        </div>
        <div className="flex gap-3">
          {onClose && <button type="button" onClick={onClose} className="flex-1 py-3 border-2 border-gray-200 text-gray-600 rounded-xl text-sm font-bold hover:border-gray-400 transition-all active:scale-95">Cancel</button>}
          <button type="submit" disabled={loading}
            className={`flex-1 py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md
              ${loading ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
            {loading ? "Publishing…" : "🚀 Publish Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}
