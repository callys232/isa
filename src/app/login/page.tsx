"use client";

import { useState } from "react";
import Link from "next/link";
import AnimatedBackground from "@/src/components/AnimatedBackground";

export default function LoginPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    setLoading(true);
    // Simulate auth delay — wire to real backend here
    setTimeout(() => { setLoading(false); }, 1500);
  };

  const inp = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all duration-150";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 relative overflow-hidden px-4">
      <AnimatedBackground variant="blue" density="medium" />

      <div className="relative z-10 w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          style={{ animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}`}</style>

          {/* Header */}
          <div className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-700 px-8 py-8 text-center overflow-hidden">
            <AnimatedBackground variant="purple" density="light" className="opacity-40" />
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-3xl mx-auto mb-3 shadow-lg">
                🌾
              </div>
              <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
              <p className="text-blue-200 text-sm mt-1">Sign in to your ISA Platform account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-center gap-2">
                <span>⚠️</span>{error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                className={inp}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600">Password</label>
                <button type="button" className="text-xs text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className={inp + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors text-lg"
                  aria-label="Toggle password"
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded accent-blue-600" />
              <label htmlFor="remember" className="text-xs text-gray-600 select-none">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 active:scale-95
                ${loading ? "bg-blue-400 cursor-wait" : "bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : "Sign In →"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Social login */}
            <div className="grid grid-cols-2 gap-3">
              {[["G", "Google", "border-gray-200 hover:border-red-300 hover:bg-red-50"],
                ["f", "Facebook", "border-gray-200 hover:border-blue-300 hover:bg-blue-50"]
              ].map(([icon, label, cls]) => (
                <button key={label as string} type="button"
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border text-sm font-semibold text-gray-700
                    transition-all duration-150 active:scale-95 hover:shadow-sm ${cls}`}>
                  <span className="font-extrabold">{icon}</span>{label}
                </button>
              ))}
            </div>

            <p className="text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-blue-600 font-bold hover:text-blue-700 hover:underline transition-colors">
                Sign up free
              </Link>
            </p>
          </form>
        </div>

        {/* Admin access */}
        <div className="text-center mt-4">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors"
          >
            🔐 Admin Login
          </Link>
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-white/30 mt-3">
          By signing in you agree to ISA&apos;s{" "}
          <span className="underline cursor-pointer hover:text-white/50 transition-colors">Terms</span> and{" "}
          <span className="underline cursor-pointer hover:text-white/50 transition-colors">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
}
