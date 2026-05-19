"use client";

import { useState } from "react";

const RATINGS=[{val:5,emoji:"😍",label:"Excellent"},{val:4,emoji:"😊",label:"Good"},{val:3,emoji:"😐",label:"Okay"},{val:2,emoji:"😕",label:"Poor"},{val:1,emoji:"😠",label:"Terrible"}];
interface Props { feature?: string; onSuccess?: () => void }

export default function FeedbackCard({ feature = "ISA Platform", onSuccess }: Props) {
  const [rating,setRating]=useState<number|null>(null); const [comment,setComment]=useState(""); const [loading,setLoading]=useState(false); const [done,setDone]=useState(false);
  const submit=(e:React.FormEvent)=>{e.preventDefault();if(!rating)return;setLoading(true);setTimeout(()=>{setLoading(false);setDone(true);onSuccess?.();},700);};
  if (done) return <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 text-center"><p className="text-3xl mb-2">🙏</p><p className="font-extrabold text-gray-800 text-sm">Thanks for your feedback!</p><p className="text-xs text-gray-500 mt-1">It helps us make ISA better for every Nigerian farmer.</p></div>;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-5 py-4"><p className="text-white font-extrabold text-sm">⭐ Rate {feature}</p><p className="text-purple-200 text-[10px] mt-0.5">Your feedback shapes our roadmap</p></div>
      <form onSubmit={submit} className="p-5 space-y-4">
        <div><p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-2">How would you rate your experience?</p><div className="flex gap-2 justify-center">{RATINGS.map(r=>(<button key={r.val} type="button" onClick={()=>setRating(r.val)} className={`flex flex-col items-center gap-1 p-2.5 rounded-xl border-2 transition-all active:scale-95 ${rating===r.val?"border-purple-500 bg-purple-50 scale-110":"border-gray-200 hover:border-purple-300"}`}><span className="text-2xl">{r.emoji}</span><span className="text-[9px] font-bold text-gray-500">{r.label}</span></button>))}</div></div>
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Tell us more (optional)</label><textarea value={comment} onChange={e=>setComment(e.target.value)} rows={3} placeholder="What did you love? What could be better?" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 hover:border-purple-300 transition-all resize-none"/></div>
        <button type="submit" disabled={loading||!rating} className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${loading||!rating?"bg-gray-300 cursor-not-allowed":"bg-purple-600 hover:bg-purple-700 hover:shadow-lg hover:-translate-y-0.5"}`}>{loading?"Submitting…":"Submit Feedback →"}</button>
      </form>
    </div>
  );
}
