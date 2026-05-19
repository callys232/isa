"use client";

import { useState } from "react";

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={() => onChange(!value)}
      className={`relative inline-flex w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 active:scale-95
        ${value ? "bg-blue-600" : "bg-gray-300"}`}>
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200
        ${value ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

export default function SettingsTab() {
  const [settings, setSettings] = useState({
    maintenanceMode: false,
    allowSignups:    true,
    emailVerification: true,
    aiRateLimit:     true,
    marketplaceOpen: true,
    invoiceModule:   true,
    scheduleModule:  true,
    analyticsTracking: true,
    errorReporting:  true,
  });

  const [siteName, setSiteName]     = useState("ISA Platform");
  const [supportEmail, setSupportEmail] = useState("support@isa-platform.ng");
  const [maxFreeAI, setMaxFreeAI]   = useState("10");

  const set = (k: keyof typeof settings) => (v: boolean) =>
    setSettings(s => ({ ...s, [k]: v }));

  const inp = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-blue-300 transition-all";

  return (
    <div className="space-y-6 max-w-2xl">
      <h2 className="text-xl font-extrabold text-gray-800">Platform Settings</h2>

      {/* General */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-gray-800 border-b border-gray-100 pb-2">General</h3>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Platform Name</label>
          <input value={siteName} onChange={e => setSiteName(e.target.value)} className={inp} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Support Email</label>
          <input type="email" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} className={inp} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5">Free AI Queries per Month</label>
          <input type="number" value={maxFreeAI} onChange={e => setMaxFreeAI(e.target.value)} className={inp} />
        </div>
      </div>

      {/* Feature toggles */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
        <h3 className="font-extrabold text-gray-800 border-b border-gray-100 pb-2">Feature Toggles</h3>
        {[
          ["maintenanceMode",    "🔧 Maintenance Mode",         "Puts the site in maintenance — users see a holding page"],
          ["allowSignups",       "🌱 Allow New Signups",         "Enable or disable new user registrations"],
          ["emailVerification",  "📧 Require Email Verification","Force email verification before account activation"],
          ["aiRateLimit",        "🤖 AI Rate Limiting",          "Enforce per-plan query limits for the AI features"],
          ["marketplaceOpen",    "🛒 Marketplace",               "Enable the agro marketplace for buyers and sellers"],
          ["invoiceModule",      "📄 Invoice Module",            "Allow users to create and manage invoices"],
          ["scheduleModule",     "📅 Schedule Module",           "Enable the farm task scheduling feature"],
          ["analyticsTracking",  "📊 Analytics Tracking",        "Collect platform usage analytics"],
          ["errorReporting",     "🐛 Error Reporting",           "Send error reports to the dev team"],
        ].map(([key, label, desc]) => (
          <div key={key} className="flex items-center justify-between gap-4 py-2 hover:bg-gray-50 rounded-xl px-2 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800">{label}</p>
              <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
            </div>
            <Toggle
              value={settings[key as keyof typeof settings]}
              onChange={set(key as keyof typeof settings)}
            />
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="bg-red-50 rounded-2xl border border-red-200 p-6 space-y-3">
        <h3 className="font-extrabold text-red-800 border-b border-red-200 pb-2">⚠️ Danger Zone</h3>
        {[
          ["Clear All Cache",         "Flush server-side and CDN cache across all routes"],
          ["Reset AI Query Counters", "Zero out all monthly AI usage counters for all users"],
          ["Export All User Data",    "Download a full GDPR-compliant CSV of all user records"],
        ].map(([label, desc]) => (
          <div key={label} className="flex items-center justify-between gap-4 py-2">
            <div>
              <p className="text-sm font-bold text-red-800">{label}</p>
              <p className="text-xs text-red-600">{desc}</p>
            </div>
            <button className="px-4 py-2 border-2 border-red-300 text-red-600 text-xs font-bold rounded-xl
              hover:bg-red-600 hover:text-white hover:border-red-600 hover:shadow-md transition-all active:scale-95">
              Run
            </button>
          </div>
        ))}
      </div>

      <button className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm
        hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all active:scale-95">
        Save All Settings
      </button>
    </div>
  );
}
