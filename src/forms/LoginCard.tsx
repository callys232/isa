"use client";

import { useState } from "react";
import Link from "next/link";

interface Props { onSuccess?: () => void; compact?: boolean }

export default function LoginCard({ onSuccess, compact }: Props) {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess?.(); }, 1000);
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all";

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${compact ? "" : "max-w-sm mx-auto"}`}>
      {!compact && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-4 text-center">
          <p className="text-white font-extrabold text-sm">Sign In to ISA</p>
          <p className="text-blue-200 text-[10px] mt-0.5">Access your farm dashboard &amp; tools</p>
        </div>
      )}
      <form onSubmit={submit} className="p-4 space-y-3">
        {error && <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" className={inp} />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Password</label>
            <Link href="/login" className="text-[10px] text-blue-600 hover:underline">Forgot?</Link>
          </div>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" className={inp + " pr-10"} />
            <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">{showPw ? "🙈" : "👁"}</button>
          </div>
        </div>
        <button type="submit" disabled={loading}
          className={`w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all active:scale-95 shadow-md ${loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5"}`}>
          {loading ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Signing in…</span> : "Sign In →"}
        </button>
        <p className="text-center text-xs text-gray-500">No account? <Link href="/signup" className="text-blue-600 font-bold hover:underline">Sign up free</Link></p>
      </form>
    </div>
  );
}
