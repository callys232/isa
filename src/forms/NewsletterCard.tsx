"use client";

import { useState } from "react";

interface Props { variant?: "inline" | "card"; onSuccess?: () => void }

export default function NewsletterCard({ variant = "card", onSuccess }: Props) {
  const [email, setEmail] = useState(""); const [loading, setLoading] = useState(false); const [done, setDone] = useState(false); const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); setError(""); if (!email.includes("@")){setError("Please enter a valid email address.");return;} setLoading(true); setTimeout(()=>{setLoading(false);setDone(true);onSuccess?.();},800); };
  if (done) return <div className={`${variant==="card"?"bg-white rounded-2xl border border-gray-100 shadow-sm p-6":""} text-center`}><p className="text-2xl mb-1">🎉</p><p className="font-bold text-gray-800 text-sm">You&apos;re subscribed!</p><p className="text-xs text-gray-500 mt-0.5">Weekly agro insights delivered to <strong>{email}</strong></p></div>;
  if (variant === "inline") return (
    <form onSubmit={submit} className="flex gap-2">
      {error && <p className="text-red-500 text-xs">{error}</p>}
      <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Enter your email" className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all"/>
      <button type="submit" disabled={loading} className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition-all active:scale-95 whitespace-nowrap">{loading?"…":"Subscribe →"}</button>
    </form>
  );
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <div className="mb-4"><p className="font-extrabold text-gray-800 text-sm">📬 Stay Updated</p><p className="text-xs text-gray-500 mt-0.5">Weekly agro tips, market prices, and ISA updates — free.</p></div>
      {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2 mb-3">{error}</p>}
      <form onSubmit={submit} className="space-y-3">
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all"/>
        <button type="submit" disabled={loading} className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${loading?"bg-green-400 cursor-wait":"bg-green-600 hover:bg-green-700 hover:shadow-lg"}`}>{loading?"Subscribing…":"Subscribe →"}</button>
      </form>
      <p className="text-[10px] text-gray-400 mt-2 text-center">No spam. Unsubscribe any time.</p>
    </div>
  );
}
