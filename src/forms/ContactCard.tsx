"use client";

import { useState } from "react";

const SUBJECTS = ["General Enquiry","Technical Support","Billing & Plans","Marketplace Issue","Partnership","Press / Media"];

interface Props { onSuccess?: () => void }

export default function ContactCard({ onSuccess }: Props) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [subject, setSubject] = useState(SUBJECTS[0]); const [message, setMessage] = useState(""); const [loading, setLoading] = useState(false); const [sent, setSent] = useState(false); const [error, setError] = useState("");
  const submit = (e: React.FormEvent) => { e.preventDefault(); setError(""); if (!name.trim()||!email.trim()||!message.trim()){setError("Please fill in all required fields.");return;} setLoading(true); setTimeout(()=>{setLoading(false);setSent(true);onSuccess?.();},1000); };
  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all";
  if (sent) return <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"><div className="text-4xl mb-3">✅</div><h3 className="font-extrabold text-gray-800 mb-1">Message sent!</h3><p className="text-sm text-gray-500">We&apos;ll get back to you within 24 hours at <strong>{email}</strong>.</p></div>;
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4"><p className="text-white font-extrabold text-sm">📬 Contact ISA Support</p><p className="text-blue-200 text-[10px] mt-0.5">We typically reply within 24 hours</p></div>
      <form onSubmit={submit} className="p-5 space-y-4">
        {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div className="grid grid-cols-2 gap-3"><div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Name *</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className={inp}/></div><div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className={inp}/></div></div>
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Subject</label><select value={subject} onChange={e=>setSubject(e.target.value)} className={inp}>{SUBJECTS.map(s=><option key={s}>{s}</option>)}</select></div>
        <div><label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Message *</label><textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} placeholder="How can we help?" className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all resize-none"/></div>
        <button type="submit" disabled={loading} className={`w-full py-3 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${loading?"bg-blue-400 cursor-wait":"bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"}`}>{loading?"Sending…":"Send Message →"}</button>
      </form>
    </div>
  );
}
