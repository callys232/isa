"use client";

import Link from "next/link";
import AnimatedBackground from "@/src/components/AnimatedBackground";

const streams = [
  { icon: '🏪', title: 'Marketplace Commission', desc: '2–5% on every transaction', color: 'bg-green-50 border-green-200' },
  { icon: '📡', title: 'SaaS Dashboard', desc: 'Monthly farm subscriptions', color: 'bg-blue-50 border-blue-200' },
  { icon: '🔌', title: 'API Subscriptions', desc: 'Developer & enterprise tiers', color: 'bg-purple-50 border-purple-200' },
  { icon: '🤖', title: 'AI Advisory', desc: 'Premium query packs', color: 'bg-amber-50 border-amber-200' },
  { icon: '🛰️', title: 'IoT Hardware', desc: 'Sensor kits + installation', color: 'bg-teal-50 border-teal-200' },
  { icon: '📊', title: 'Data Reports', desc: 'Insights for govt & NGOs', color: 'bg-rose-50 border-rose-200' },
];

export default function RevenueStrip() {
  return (
    <section className="relative overflow-hidden py-14 px-6 bg-gray-900">
      <AnimatedBackground variant="blue" density="medium" opacity={0.18} />
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-2">6 Revenue Streams. One Platform.</h2>
          <p className="text-gray-400 text-sm">ISA is built to monetize every layer of the agricultural value chain.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {streams.map(s => (
            <div key={s.title} className={`${s.color} border rounded-xl p-4 text-center`}>
              <div className="text-2xl mb-2">{s.icon}</div>
              <p className="font-bold text-gray-800 text-xs leading-tight mb-1">{s.title}</p>
              <p className="text-gray-500 text-[10px]">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { val: '₦280B+', label: 'Nigeria agri market size', sub: 'Addressable opportunity' },
            { val: '36M+', label: 'Smallholder farmers', sub: 'Potential users' },
            { val: '2–5%', label: 'Marketplace commission', sub: 'On every transaction' },
          ].map(stat => (
            <div key={stat.label} className="bg-gray-800 rounded-2xl p-5 text-center border border-gray-700">
              <div className="text-3xl font-extrabold text-green-400 mb-1">{stat.val}</div>
              <div className="text-white font-semibold text-sm">{stat.label}</div>
              <div className="text-gray-400 text-xs mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-3 flex-wrap">
          <Link href="/developers" className="px-6 py-3 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all shadow-md">
            🔌 Build with ISA API
          </Link>
          <Link href="/marketplace" className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/20">
            🏪 Visit Marketplace
          </Link>
          <Link href="/premuim" className="px-6 py-3 bg-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/20 transition-all border border-white/20">
            ⭐ View Premium Plans
          </Link>
        </div>
      </div>
    </section>
  );
}
