"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  onComplete?: () => void;
}

export default function RegisterCard({ onComplete }: Props) {
  const router = useRouter();
  const [name,  setName]  = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [plan,  setPlan]  = useState("free");
  const [err,   setErr]   = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) { setErr("Name and email are required."); return; }
    if (!email.includes("@"))          { setErr("Please enter a valid email.");    return; }
    setErr("");
    onComplete?.();
    router.push(`/signup?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&plan=${plan}`);
  };

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all";

  return (
    <div className="mt-3 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 px-4 py-2.5">
        <p className="text-white font-extrabold text-xs">🌱 Create Your ISA Account</p>
        <p className="text-green-200 text-[10px] mt-0.5">Free to start — upgrade anytime</p>
      </div>

      <form onSubmit={submit} className="p-4 space-y-3">
        {err && (
          <p className="text-red-500 text-xs bg-red-50 border border-red-100 rounded-lg px-3 py-2">{err}</p>
        )}

        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Full Name *</label>
          <input value={name} onChange={e => setName(e.target.value)}
            placeholder="e.g. Adaeze Okafor" className={inp} />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Email *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@email.com" className={inp} />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Phone</label>
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
            placeholder="+234 803 xxx xxxx" className={inp} />
        </div>

        <div>
          <label className="block text-[10px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Plan</label>
          <div className="grid grid-cols-3 gap-1.5">
            {[["free","Free","₦0"],["pro","Pro","₦20K"],["premium","Premium","₦45K"]].map(([v, l, p]) => (
              <button key={v} type="button" onClick={() => setPlan(v)}
                className={`py-2 rounded-xl text-[10px] font-bold border-2 transition-all active:scale-95
                  ${plan === v ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:border-green-300"}`}>
                <div>{l}</div>
                <div className="text-gray-400 font-normal">{p}/mo</div>
              </button>
            ))}
          </div>
        </div>

        <button type="submit"
          className="w-full py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold
            hover:bg-green-700 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
          Continue to Sign Up →
        </button>
      </form>
    </div>
  );
}
