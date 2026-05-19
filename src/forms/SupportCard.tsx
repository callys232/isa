"use client";

import { useState } from "react";

const PRIORITIES = ["Low — general question","Medium — billing or account issue","High — platform not working","Urgent — data loss or security"];
interface Props { onSuccess?: () => void }

export default function SupportCard({ onSuccess }: Props) {
  const [email,setEmail]=useState(""); const [priority,setPriority]=useState(PRIORITIES[0]); const [desc,setDesc]=useState(""); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false); const [error,setError]=useState("");
  const submit=(e:React.FormEvent)=>{e.preventDefault();setError("");if(!email.trim()||!desc.trim()){setError("Email and description are required.");return;}setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);onSuccess?.();},800);};
  const inp="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all";
  if (done) return <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"><div className="text-4xl mb-3">🎫</div><h3 className="font-extrabold text-gray-800 mb-1">Ticket submitted!</h3><p className="text-sm text-gray-500">We&apos;ll email you at <strong>{email}</strong> within 2–4 hours.</p></div>;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 px-5 py-4"><p className="text-white font-extrabold text-sm">🎫 Open a Support Ticket</p><p className="text-blue-200 text-[10px] mt-0.5">ISA support team · Avg response: 2–4 hours</p></div>
      <form onSubmit={submit} className="p-5 space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Your Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className={inp}/></div>
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Priority</label><select value={priority} onChange={e=>setPriority(e.target.value)} className={inp}>{PRIORITIES.map(p=><option key={p}>{p}</option>)}</select></div>
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Describe the Issue *</label><textarea value={desc} onChange={e=>setDesc(e.target.value)} rows={4} placeholder="What happened? What were you trying to do? Include any error messages." className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all resize-none"/></div>
        <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${loading?"bg-blue-400 cursor-wait":"bg-blue-700 hover:bg-blue-800 hover:shadow-lg hover:-translate-y-0.5"}`}>{loading?"Submitting…":"Submit Ticket →"}</button>
      </form>
    </div>
  );
}
