"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePlan } from "@/src/context/UserContext";

interface Msg { id: number; role: "bot" | "user"; text: string; links?: { label: string; href: string }[] }

const QUICK = [
  "What can I do for free?",
  "How do I create an invoice?",
  "What is the Marketplace?",
  "How does the AI work?",
  "How to upgrade?",
  "What is Farm Schedule?",
];

const RESPONSES: Record<string, { text: string; links?: { label: string; href: string }[] }> = {
  default: {
    text: "I'm not sure about that — but I can help you explore ISA Platform! Try one of the quick questions below, or ask me anything about features, pricing, or getting started.",
  },
  free: {
    text: "On the Free plan you get:\n\n✅ Farm Intelligence Dashboard\n✅ Plant Advisor AI — best crops for your state & soil\n✅ Pest Detector AI — identify pests from a description\n✅ Browse the Agro Marketplace\n✅ Read Awareness articles & videos\n\nUpgrade to Premium to unlock Invoice, Schedule, video posting, and 4 AI tools.",
    links: [{ label: "View Premium Plans", href: "/premuim" }],
  },
  invoice: {
    text: "The Invoice Manager lets you create, send, and track professional invoices with multiple currencies, tax & discount support, and PDF export.\n\n🔒 This feature is available on Premium and Admin plans only.",
    links: [{ label: "Upgrade to Premium", href: "/premuim" }, { label: "View Invoice (preview)", href: "/invoice" }],
  },
  marketplace: {
    text: "The ISA Marketplace lets you buy and sell farm produce, seeds, fertilizer, and equipment across Nigeria.\n\n✅ Browsing listings is FREE for everyone.\n🔒 Posting your own listings requires a Premium plan.",
    links: [{ label: "Browse Marketplace", href: "/marketplace" }],
  },
  ai: {
    text: "ISA has 4 AI tools:\n\n🌱 Plant Advisor — best crops for your location & season (FREE)\n🔬 Pest Detector — identify pests & diseases (FREE)\n📊 Yield Predictor — model your harvest (Premium)\n📈 Price Forecaster — best time to sell (Premium)\n\nYou also have the Farm Intelligence engine for full agro analysis.",
    links: [{ label: "Open AI Hub", href: "/aiassistant" }],
  },
  upgrade: {
    text: "ISA Premium unlocks everything:\n\n📅 Farm Schedule\n📄 Invoice Manager\n🛒 Marketplace listing\n🎬 Video posting\n📊 All 4 AI tools\n🤖 Unlimited AI queries\n\nPro starts at ₦20,000/month. Premium at ₦45,000/month.",
    links: [{ label: "See All Plans", href: "/premuim" }],
  },
  schedule: {
    text: "Farm Schedule lets you plan, assign, and track all farm tasks — planting, irrigation, fertilising, pest control, and harvesting — with a weekly calendar view.\n\n🔒 Available on Premium and Admin plans.",
    links: [{ label: "Upgrade to Access", href: "/premuim" }],
  },
  dashboard: {
    text: "The Farm Dashboard shows real-time IoT sensor data — soil moisture, temperature, pH, and nitrogen levels — plus weather forecasts and automated crop alerts.\n\n✅ Available on all plans!",
    links: [{ label: "Open Dashboard", href: "/dashboard" }],
  },
};

function match(input: string): typeof RESPONSES[string] {
  const q = input.toLowerCase();
  if (q.includes("free") || q.includes("can i do")) return RESPONSES.free;
  if (q.includes("invoice") || q.includes("bill"))   return RESPONSES.invoice;
  if (q.includes("market"))                          return RESPONSES.marketplace;
  if (q.includes("ai") || q.includes("agent"))      return RESPONSES.ai;
  if (q.includes("upgrade") || q.includes("premium") || q.includes("plan") || q.includes("cost") || q.includes("price")) return RESPONSES.upgrade;
  if (q.includes("schedule") || q.includes("task") || q.includes("calendar")) return RESPONSES.schedule;
  if (q.includes("dashboard") || q.includes("sensor")) return RESPONSES.dashboard;
  return RESPONSES.default;
}

const WELCOME: Msg = {
  id: 0, role: "bot",
  text: "👋 Hi! I'm your ISA Onboarding Guide.\n\nI can help you understand all platform features, find out what's included in your plan, and get you started fast.\n\nWhat would you like to know?",
};

export default function OnboardingAgent() {
  const { plan } = usePlan();
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Msg = { id: Date.now(), role: "user", text };
    setMsgs(m => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const resp = match(text);
      setMsgs(m => [...m, { id: Date.now() + 1, role: "bot", text: resp.text, links: resp.links }]);
      setTyping(false);
    }, 700 + Math.random() * 400);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Chat */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col" style={{ height: "560px" }}>

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-xl">🌾</div>
          <div>
            <p className="text-white font-extrabold text-sm">ISA Onboarding Guide</p>
            <p className="text-green-200 text-[10px]">● Always available · Your plan: <span className="font-bold text-white capitalize">{plan}</span></p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50">
          {msgs.map(msg => (
            <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "gap-2"}`}>
              {msg.role === "bot" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-1">
                  🌾
                </div>
              )}
              <div className={`max-w-[85%] ${msg.role === "user" ? "bg-green-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5" : "bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3"}`}>
                <p className={`text-sm leading-relaxed whitespace-pre-line ${msg.role === "bot" ? "text-gray-800" : "text-white"}`}>
                  {msg.text}
                </p>
                {msg.links && msg.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {msg.links.map(l => (
                      <Link key={l.href} href={l.href}
                        className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all active:scale-95">
                        {l.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {typing && (
            <div className="flex gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center text-white text-xs flex-shrink-0 mt-1">🌾</div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm shadow-sm px-4 py-3.5 flex gap-1.5">
                {[0, 150, 300].map(d => (
                  <div key={d} className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="border-t border-gray-100 px-3 py-2 bg-white flex gap-1.5 overflow-x-auto">
          {QUICK.map(q => (
            <button key={q} onClick={() => send(q)}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700
                hover:bg-green-600 hover:text-white transition-all whitespace-nowrap active:scale-95 flex-shrink-0">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={e => { e.preventDefault(); send(input); }}
          className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100">
          <input value={input} onChange={e => setInput(e.target.value)}
            placeholder="Ask anything about ISA Platform…"
            className="flex-1 px-4 py-2.5 bg-gray-100 rounded-xl text-sm text-gray-800 placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:bg-white transition-all" />
          <button type="submit" disabled={!input.trim()}
            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all
              ${input.trim() ? "bg-green-600 hover:bg-green-700 shadow-md active:scale-95" : "bg-gray-200"}`}>
            <svg className={`w-4 h-4 ${input.trim() ? "text-white" : "text-gray-400"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* Plan sidebar */}
      <div className="space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
          <h3 className="font-extrabold text-gray-800 mb-4">Your Plan: <span className="capitalize text-blue-600">{plan}</span></h3>
          <div className="space-y-2">
            {[
              { label: "Farm Dashboard",       free: true  },
              { label: "Browse Marketplace",   free: true  },
              { label: "Plant Advisor AI",      free: true  },
              { label: "Pest Detector AI",      free: true  },
              { label: "Awareness Hub",         free: true  },
              { label: "Yield Predictor AI",    free: false },
              { label: "Price Forecaster AI",   free: false },
              { label: "Invoice Manager",       free: false },
              { label: "Farm Schedule",         free: false },
              { label: "Post Marketplace Listing", free: false },
              { label: "Upload Videos",         free: false },
            ].map(item => {
              const hasAccess = item.free || plan !== "free";
              return (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full
                    ${hasAccess ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                    {hasAccess ? "✓ Included" : "🔒 Premium"}
                  </span>
                </div>
              );
            })}
          </div>
          {plan === "free" && (
            <Link href="/premuim"
              className="flex items-center justify-center gap-2 mt-5 w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm
                hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-md active:scale-95">
              ⭐ Upgrade to Premium
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
