"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/src/components/AnimatedBackground";

const PLANS = [
  { id: "free",    label: "Free",    price: "₦0",      desc: "Basic AI advice, 5 invoices/mo",  badge: "" },
  { id: "pro",     label: "Pro",     price: "₦20,000", desc: "Unlimited AI, priority support",   badge: "Most Popular" },
  { id: "premium", label: "Premium", price: "₦45,000", desc: "Satellite data + team access",     badge: "Best Value" },
];

export default function SignupPage() {
  const [step, setStep]           = useState<1 | 2>(1);
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");
  const [plan, setPlan]           = useState("free");
  const [showPw, setShowPw]       = useState(false);
  const [agreed, setAgreed]       = useState(false);
  const [loading, setLoading]     = useState(false);
  const [errors, setErrors]       = useState<Record<string, string>>({});

  const inp = (err?: string) =>
    `w-full px-4 py-3 border rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-400
    hover:border-green-300 transition-all duration-150 ${err ? "border-red-400" : "border-gray-200"}`;

  const validate1 = () => {
    const e: Record<string, string> = {};
    if (!name.trim())                          e.name     = "Full name is required";
    if (!email.includes("@"))                  e.email    = "Valid email is required";
    if (password.length < 8)                   e.password = "Password must be at least 8 characters";
    if (password !== confirm)                  e.confirm  = "Passwords do not match";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate1()) setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setErrors({ agreed: "Please accept the terms to continue." }); return; }
    setErrors({});
    setLoading(true);
    // Wire to real backend here
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-green-950 to-gray-900 relative overflow-hidden px-4 py-10">
      <AnimatedBackground variant="green" density="medium" />

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="relative z-10 w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>

          {/* Header */}
          <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 px-8 py-7 overflow-hidden">
            <AnimatedBackground variant="green" density="light" className="opacity-40" />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold text-white">Create your account</h1>
                <p className="text-green-200 text-sm mt-0.5">Join 12,000+ Nigerian farmers on ISA</p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-3xl shadow-lg">
                🌱
              </div>
            </div>

            {/* Step indicator */}
            <div className="relative z-10 flex items-center gap-2 mt-5">
              {[1, 2].map(s => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300
                    ${step > s ? "bg-white border-white text-green-700" : step === s ? "bg-white/30 border-white text-white" : "bg-white/10 border-white/30 text-white/50"}`}>
                    {step > s ? "✓" : s}
                  </div>
                  <span className={`text-xs font-semibold transition-colors duration-200 ${step === s ? "text-white" : "text-white/50"}`}>
                    {s === 1 ? "Your Details" : "Choose Plan"}
                  </span>
                  {s < 2 && <div className={`flex-1 h-0.5 ${step > s ? "bg-white" : "bg-white/20"} transition-all duration-300`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Personal details */}
          {step === 1 && (
            <form onSubmit={handleStep1} className="px-8 py-7 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Full Name *</label>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Adaeze Okafor" className={inp(errors.name)} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email Address *</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" className={inp(errors.email)} />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phone Number</label>
                <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+234 803 xxx xxxx" className={inp()} />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Password * <span className="text-gray-400 font-normal">(min. 8 characters)</span></label>
                <div className="relative">
                  <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                    placeholder="Create a strong password" autoComplete="new-password" className={inp(errors.password) + " pr-11"} />
                  <button type="button" onClick={() => setShowPw(s => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-lg">
                    {showPw ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">Confirm Password *</label>
                <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)}
                  placeholder="Repeat your password" autoComplete="new-password" className={inp(errors.confirm)} />
                {errors.confirm && <p className="text-red-500 text-xs mt-1">{errors.confirm}</p>}
              </div>

              <button type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-green-600
                  hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5 shadow-lg transition-all active:scale-95">
                Continue → Choose Plan
              </button>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link href="/login" className="text-green-600 font-bold hover:underline transition-colors">Sign in</Link>
              </p>
            </form>
          )}

          {/* Step 2: Plan selection */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="px-8 py-7 space-y-5">
              <div>
                <h2 className="font-extrabold text-gray-800 text-base mb-1">Choose your plan</h2>
                <p className="text-xs text-gray-500">You can upgrade or downgrade anytime.</p>
              </div>

              <div className="space-y-3">
                {PLANS.map(p => (
                  <label key={p.id} onClick={() => setPlan(p.id)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${plan === p.id
                        ? "border-green-500 bg-green-50 shadow-md"
                        : "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"}`}>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all
                      ${plan === p.id ? "border-green-500 bg-green-500" : "border-gray-300"}`}>
                      {plan === p.id && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-gray-800 text-sm">{p.label}</span>
                        {p.badge && (
                          <span className="text-[10px] font-extrabold bg-green-600 text-white px-2 py-0.5 rounded-full">{p.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                    </div>
                    <span className="font-extrabold text-gray-800 text-sm flex-shrink-0">{p.price}<span className="text-gray-400 font-normal text-[10px]">/mo</span></span>
                  </label>
                ))}
              </div>

              <div className="flex items-start gap-2 bg-gray-50 rounded-xl p-3">
                <input type="checkbox" id="terms" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded accent-green-600 flex-shrink-0" />
                <label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
                  I agree to ISA&apos;s{" "}
                  <span className="text-green-600 font-semibold cursor-pointer hover:underline">Terms of Service</span> and{" "}
                  <span className="text-green-600 font-semibold cursor-pointer hover:underline">Privacy Policy</span>
                </label>
              </div>
              {errors.agreed && <p className="text-red-500 text-xs -mt-3">{errors.agreed}</p>}

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)}
                  className="px-5 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600
                    hover:border-gray-400 transition-all active:scale-95">
                  ← Back
                </button>
                <button type="submit" disabled={loading}
                  className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all active:scale-95
                    ${loading ? "bg-green-400 cursor-wait" : "bg-green-600 hover:bg-green-700 hover:shadow-xl hover:-translate-y-0.5"}`}>
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating account…
                    </span>
                  ) : "🌱 Create My Account"}
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-center text-xs text-white/40 mt-6">
          Trusted by 12,000+ farmers across Nigeria&apos;s 36 states
        </p>
      </div>
    </div>
  );
}
