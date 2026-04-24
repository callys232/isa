"use client";

import { useState } from "react";

const tiers = [
  {
    name: 'Free', price: '₦0', period: '/month', color: 'border-gray-200', badge: '',
    description: 'For hobbyists and early-stage developers',
    features: [
      '1,000 API calls/month',
      'Basic weather data (48-hour forecast)',
      'Crop calendar for 5 crops',
      'Public market prices (delayed 24h)',
      'Community support',
      'Rate limit: 10 req/min',
    ],
    missing: ['Soil sensor data', 'Real-time prices', 'AI recommendations', 'Webhooks'],
    cta: 'Get Free Key', ctaStyle: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
  },
  {
    name: 'Starter', price: '₦5,000', period: '/month', color: 'border-blue-200 bg-blue-50/30', badge: 'Popular',
    description: 'For growing agri-tech startups',
    features: [
      '50,000 API calls/month',
      'Real-time weather + 14-day forecast',
      'Full crop calendar (50+ crops)',
      'Live market prices across 36 states',
      'Soil health advisory endpoints',
      'Email support + Slack community',
      'Rate limit: 100 req/min',
    ],
    missing: ['IoT sensor streaming', 'AI advisory', 'White-label'],
    cta: 'Start Trial', ctaStyle: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md',
  },
  {
    name: 'Pro', price: '₦20,000', period: '/month', color: 'border-green-400 ring-2 ring-green-400', badge: 'Best Value',
    description: 'For production-grade agri platforms',
    features: [
      'Unlimited API calls',
      'Real-time IoT sensor data streaming',
      'AI planting & yield recommendations',
      'Pest detection endpoint (image upload)',
      'Price forecasting (30/60/90 day)',
      'Webhooks for real-time alerts',
      'Priority SLA (99.9% uptime)',
      'Dedicated technical support',
    ],
    missing: [],
    cta: 'Get Pro Access', ctaStyle: 'bg-green-600 text-white hover:bg-green-700 shadow-lg',
  },
  {
    name: 'Enterprise', price: 'Custom', period: '', color: 'border-purple-200', badge: '',
    description: 'For banks, insurance, government, NGOs',
    features: [
      'Everything in Pro',
      'Custom endpoints & data schemas',
      'On-premise deployment option',
      'White-label branding',
      'Bulk historical data access',
      'Dedicated account manager',
      'Custom SLA agreements',
      'Co-branding opportunities',
    ],
    missing: [],
    cta: 'Contact Sales', ctaStyle: 'bg-purple-600 text-white hover:bg-purple-700 shadow-md',
  },
];

export default function ApiTiers() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');

  return (
    <section className="py-16 px-6 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Simple, Scalable Pricing</h2>
          <p className="text-gray-400 mb-6">Start free. Scale as you grow. No hidden fees.</p>
          {/* Billing toggle */}
          <div className="inline-flex items-center bg-gray-700 rounded-full p-1 gap-1">
            {(['monthly', 'annual'] as const).map(opt => (
              <button key={opt} onClick={() => setBilling(opt)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all capitalize
                  ${billing === opt ? 'bg-white text-gray-800 shadow' : 'text-gray-400 hover:text-white'}`}>
                {opt} {opt === 'annual' && <span className="text-green-400 text-xs ml-1">−20%</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {tiers.map(tier => (
            <div key={tier.name}
              className={`relative bg-white rounded-2xl border-2 ${tier.color} p-6 flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 duration-300`}>
              {tier.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[11px] font-bold px-3 py-0.5 rounded-full">
                  {tier.badge}
                </span>
              )}
              <div className="mb-4">
                <h3 className="font-extrabold text-gray-800 text-lg">{tier.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{tier.description}</p>
                <div className="mt-3 flex items-end gap-1">
                  <span className="text-3xl font-extrabold text-gray-900">
                    {tier.price === 'Custom' ? tier.price : billing === 'annual' && tier.price !== '₦0' ? `₦${Math.round(parseInt(tier.price.replace('₦','').replace(',','')) * 0.8).toLocaleString()}` : tier.price}
                  </span>
                  {tier.period && <span className="text-gray-400 text-sm mb-1">{tier.period}</span>}
                </div>
              </div>

              <ul className="space-y-2 mb-4 flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className="text-green-500 shrink-0 mt-0.5">✓</span>{f}
                  </li>
                ))}
                {tier.missing.map(f => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                    <span className="shrink-0 mt-0.5">✕</span>{f}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${tier.ctaStyle}`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          All plans include HTTPS encryption, 99.5%+ uptime SLA, and JSON/REST API format.
          Questions? <span className="text-green-400 cursor-pointer hover:underline">Talk to our team →</span>
        </p>
      </div>
    </section>
  );
}
