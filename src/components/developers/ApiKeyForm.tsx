"use client";

import { useState } from "react";

const useCases = ['AgriFintech / Lending', 'Crop Insurance', 'Farm Management App', 'Market Price App', 'Government / NGO', 'Research', 'Other'];

export default function ApiKeyForm() {
  const [form, setForm] = useState({ name: '', email: '', company: '', useCase: useCases[0], tier: 'starter', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const key = 'isa_live_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
      setApiKey(key);
      setSubmitted(true);
      setLoading(false);
    }, 1600);
  };

  if (submitted) {
    return (
      <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Your API Key is Ready!</h2>
          <p className="text-gray-400 text-sm mb-6">Keep this key secure. You can regenerate it in your dashboard anytime.</p>
          <div className="bg-gray-800 rounded-2xl p-5 border border-green-500 mb-4">
            <p className="text-gray-400 text-xs mb-2 uppercase tracking-wide">Your API Key</p>
            <code className="text-green-400 font-mono text-sm break-all">{apiKey}</code>
          </div>
          <div className="space-y-2 text-sm text-left bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <p className="font-bold text-white mb-2">Next Steps:</p>
            <p className="text-gray-300 flex items-center gap-2">📧 Check your email for onboarding docs</p>
            <p className="text-gray-300 flex items-center gap-2">📖 Read the API documentation below</p>
            <p className="text-gray-300 flex items-center gap-2">🧪 Try the sandbox environment first</p>
            <p className="text-gray-300 flex items-center gap-2">💬 Join our developer Slack community</p>
          </div>
          <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', useCase: useCases[0], tier: 'starter', description: '' }); }}
            className="mt-6 px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-all shadow-md">
            Register Another Key
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
            🔑 Get API Access
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">Start Building Today</h2>
          <p className="text-gray-400 text-sm">Your free API key gets you 1,000 calls/month to start. Upgrade anytime.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl border border-gray-700 p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name *</label>
              <input required value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Emeka Nwosu"
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Work Email *</label>
              <input required type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="you@company.ng"
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">Company / Organization</label>
            <input value={form.company} onChange={e => update('company', e.target.value)}
              placeholder="AgroStartup Ltd."
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Use Case</label>
              <select value={form.useCase} onChange={e => update('useCase', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                {useCases.map(uc => <option key={uc} value={uc}>{uc}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Start With</label>
              <select value={form.tier} onChange={e => update('tier', e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                <option value="free">Free Plan</option>
                <option value="starter">Starter — ₦5k/mo</option>
                <option value="pro">Pro — ₦20k/mo</option>
                <option value="enterprise">Enterprise</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1">What are you building? (optional)</label>
            <textarea value={form.description} onChange={e => update('description', e.target.value)}
              rows={2} placeholder="Brief description of your project..."
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none" />
          </div>

          <button type="submit" disabled={loading}
            className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-lg
              ${loading ? 'bg-gray-600 text-gray-400' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Generating your API key...
              </span>
            ) : '🔑 Get My API Key'}
          </button>

          <p className="text-gray-500 text-xs text-center">
            By registering, you agree to our <span className="text-green-400 cursor-pointer hover:underline">API Terms of Service</span>. No credit card required for Free plan.
          </p>
        </form>
      </div>
    </section>
  );
}
