"use client";

import Link from "next/link";
import AnimatedBackground from "@/src/components/AnimatedBackground";

const features = [
  { emoji: '🌱', title: 'Plant Advisor', desc: 'Tell ISA your state, season, and soil type — get ranked crop recommendations with yield and revenue projections.' },
  { emoji: '🔬', title: 'Pest Detector', desc: 'Upload a photo of your affected plant. AI identifies the pest or disease in seconds with a treatment protocol.' },
  { emoji: '📊', title: 'Yield Predictor', desc: 'Model your expected harvest based on seed quality, irrigation, and fertilizer inputs before you plant.' },
  { emoji: '📈', title: 'Price Forecaster', desc: 'Know the best time to sell. See 30/60/90-day price projections and optimal selling windows for any crop.' },
];

export default function AiPreview() {
  return (
    <section className="relative overflow-hidden py-16 px-6 bg-gradient-to-b from-blue-50 via-purple-50 to-white">
      <AnimatedBackground variant="purple" density="light" opacity={0.07} />
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full mb-3">
            🤖 Powered by ISA AI
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
            Expert Farm Advice.<br />Available 24/7.
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Our AI engine is trained on Nigerian agricultural data across 36 states. Get recommendations that are specific to your crop, climate zone, and market.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {features.map(f => (
            <div key={f.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:border-purple-200 transition-all group">
              <div className="text-3xl mb-3">{f.emoji}</div>
              <h3 className="font-extrabold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">{f.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Demo CTA */}
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-center text-white">
          <p className="text-green-100 text-sm mb-2">Used by 12,000+ farmers across Nigeria</p>
          <h3 className="text-2xl font-extrabold mb-3">Try the AI Advisor — Free</h3>
          <p className="text-green-200 text-sm mb-5 max-w-md mx-auto">No signup required for basic recommendations. Upgrade for unlimited queries and advanced insights.</p>
          <Link href="/ai-advisor"
            className="inline-block px-8 py-3 bg-white text-green-700 rounded-xl font-bold hover:bg-green-50 transition-all shadow-md">
            Open AI Advisor →
          </Link>
        </div>
      </div>
    </section>
  );
}
