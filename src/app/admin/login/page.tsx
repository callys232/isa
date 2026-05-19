"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AnimatedBackground from "@/src/components/AnimatedBackground";

// Demo credentials — replace with real auth in production
const ADMIN_EMAIL    = "admin@isa-platform.ng";
const ADMIN_PASSWORD = "ISAadmin2026";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        // In production: set a real session/cookie here
        router.push("/admin");
      } else {
        setError("Invalid credentials. Access denied.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 relative overflow-hidden px-4">
      <AnimatedBackground variant="blue" density="medium" opacity={0.15} />

      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>

      <div className="relative z-10 w-full max-w-sm" style={{ animation: "fadeUp 0.4s cubic-bezier(0.16,1,0.3,1)" }}>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center
            text-white font-extrabold text-2xl mx-auto mb-4 shadow-2xl shadow-blue-900/50">
            ISA
          </div>
          <h1 className="text-2xl font-extrabold text-white">Admin Portal</h1>
          <p className="text-gray-500 text-sm mt-1">Restricted access — authorised personnel only</p>
        </div>

        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">

          {error && (
            <div className="bg-red-950 border border-red-800 rounded-xl px-4 py-3 mb-5 flex items-center gap-2">
              <span className="text-red-400 text-sm">🔒</span>
              <p className="text-red-400 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="admin@isa-platform.ng"
                autoComplete="email"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm font-medium
                  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400
                  hover:border-gray-400 transition-all duration-150"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm
                    placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    hover:border-gray-600 transition-all duration-150"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-lg"
                >
                  {showPw ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 active:scale-95 shadow-lg
                ${loading
                  ? "bg-blue-700 text-blue-300 cursor-wait"
                  : "bg-blue-600 text-white hover:bg-blue-500 hover:shadow-blue-900/50 hover:-translate-y-0.5"}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                  Verifying…
                </span>
              ) : "🔐 Access Admin Dashboard"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-800">
            <p className="text-center text-xs text-gray-600">
              Not an admin?{" "}
              <a href="/" className="text-blue-500 hover:text-blue-400 font-semibold hover:underline transition-colors">
                Return to ISA Platform
              </a>
            </p>
          </div>
        </div>

        {/* Security note */}
        <p className="text-center text-xs text-gray-700 mt-6">
          🔒 All admin actions are logged and monitored
        </p>
      </div>
    </div>
  );
}
