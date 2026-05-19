"use client";

import { useState } from "react";
import AnimatedBackground from "@/src/components/AnimatedBackground";
import CommandCard from "@/src/components/aiassistant/CommandCard";
import SmartSearch from "@/src/components/aiassistant/SmartSearch";
import InsightPanel from "@/src/components/aiassistant/InsightPanel";
import ActivityFeed from "@/src/components/aiassistant/ActivityFeed";
import PlantAdvisor from "@/src/components/ai-advisor/PlantAdvisor";
import PestDetector from "@/src/components/ai-advisor/PestDetector";
import YieldPredictor from "@/src/components/ai-advisor/YieldPredictor";
import PriceForecaster from "@/src/components/ai-advisor/PriceForecaster";
import FarmIntelligence from "@/src/components/aiassistant/FarmIntelligence";
import OnboardingAgent from "@/src/components/aiassistant/OnboardingAgent";
import { usePlan } from "@/src/context/UserContext";

// ── AI Advisor sub-tabs ──────────────────────────────────────────────
const ADVISOR_TABS = [
  { id: "plant", label: "Plant Advisor",   emoji: "🌱", description: "What should I grow this season?" },
  { id: "pest",  label: "Pest Detector",   emoji: "🔬", description: "Identify pests & diseases on your crops" },
  { id: "yield", label: "Yield Predictor", emoji: "📊", description: "Model your expected harvest output" },
  { id: "price", label: "Price Forecaster",emoji: "📈", description: "Find the best time to sell your produce" },
];

// ── Command Center quick actions ─────────────────────────────────────
const COMMANDS = [
  { icon: "📄", title: "New Invoice",      description: "Create and send professional invoices to clients in seconds.",      href: "/invoice",      color: "blue"   as const },
  { icon: "🛒", title: "Agro Marketplace", description: "Browse and list farm products across 36 Nigerian states.",          href: "/marketplace",  color: "amber"  as const },
  { icon: "📅", title: "Farm Schedule",    description: "Plan and track all your farm activities and team tasks.",           href: "/schedule",     color: "purple" as const, isNew: true },
  { icon: "📡", title: "Sensor Dashboard", description: "Real-time IoT sensors, weather data, and crop health monitoring.", href: "/dashboard",    color: "blue"   as const },
  { icon: "📰", title: "Awareness Hub",    description: "Stay updated with agro news, videos, and expert articles.",        href: "/awareness",    color: "rose"   as const },
  { icon: "🌾", title: "Farm Intelligence", description: "Merged agro + AI analysis: crops, pests, equipment & yield in one report.", color: "green" as const, isNew: true },
  { icon: "💎", title: "View Pricing",     description: "Unlock premium features — save 30% on annual plans.",              href: "/premuim",      color: "amber"  as const, badge: "SAVE 30%" },
];

type HubTab = "hub" | "advisor" | "intel" | "guide";

export default function AIAssistantPage() {
  const { isPremium, plan } = usePlan();
  const [hubTab, setHubTab]         = useState<HubTab>("guide");
  const [advisorTab, setAdvisorTab] = useState("plant");
  const [lastCommand, setLastCommand] = useState<string | null>(null);

  const handleCommand = (cmd: string) => {
    setLastCommand(cmd);
    setTimeout(() => setLastCommand(null), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 overflow-hidden py-14 px-6">
        <AnimatedBackground variant="purple" density="medium" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            ISA AI Command Center
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
            Your Intelligent<br />Farm Hub
          </h1>
          <p className="text-blue-200 text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Search, navigate, and act across the entire ISA platform from one place. Powered by AI.
          </p>

          <SmartSearch onCommand={handleCommand} />

          {lastCommand && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-2 rounded-full border border-white/20">
              <span className="text-green-400">✓</span>
              Command received: &ldquo;{lastCommand}&rdquo;
            </div>
          )}
        </div>

        {/* Live stats strip */}
        <div className="relative z-10 mt-10 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-6 py-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[["12,847","Farmers Active"],["₦2.3B","Invoiced"],["98%","Uptime"],["36","States Covered"]].map(([val, label]) => (
                <div key={label}>
                  <p className="text-2xl font-extrabold text-white">{val}</p>
                  <p className="text-blue-300 text-xs mt-0.5">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Top-level tab bar ── */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 py-2">
            {[
              { id: "guide"   as HubTab, label: "🎓 Get Started",       desc: "Onboarding guide for all users"              },
              { id: "hub"     as HubTab, label: "🏠 Command Center",    desc: "Quick actions & platform overview"           },
              { id: "advisor" as HubTab, label: "🌿 AI Farm Advisor",   desc: "Crop advice & pest detection"                },
              { id: "intel"   as HubTab, label: "🌾 Farm Intelligence", desc: "Full agro report"                            },
            ].map(t => (
              <button key={t.id} onClick={() => setHubTab(t.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
                  transition-all duration-200 active:scale-95
                  ${hubTab === t.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"}`}>
                {t.label}
                {hubTab === t.id && (
                  <span className="hidden sm:inline text-[10px] font-normal text-blue-200">{t.desc}</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Onboarding / Get Started tab ── */}
      {hubTab === "guide" && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="mb-6">
            <h2 className="text-xl font-extrabold text-gray-800 mb-1">🎓 Get Started with ISA</h2>
            <p className="text-sm text-gray-500">
              {plan === "free"
                ? "You're on the Free plan. Use this guide to explore the platform and discover what's available to you."
                : "Your guide to getting the most out of every ISA feature."}
            </p>
          </div>
          <OnboardingAgent />
        </div>
      )}

      {/* ── Command Center tab ── */}
      {hubTab === "hub" && (
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left 2/3: Quick Actions + AI Advisor entry + Activity */}
            <div className="lg:col-span-2 space-y-8">

              {/* AI Advisor featured card */}
              <button onClick={() => setHubTab("advisor")}
                className="w-full group bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-5
                  text-left flex items-center gap-5 shadow-md
                  hover:shadow-xl hover:-translate-y-1 hover:from-green-700 hover:to-emerald-700
                  transition-all duration-200 active:scale-[0.99] relative overflow-hidden">
                <AnimatedBackground variant="green" density="light" className="opacity-30" />
                <div className="relative z-10 w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-3xl
                  flex-shrink-0 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3">
                  🌿
                </div>
                <div className="relative z-10 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-extrabold text-base">AI Farm Advisor</span>
                    <span className="text-[10px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">4 Tools</span>
                  </div>
                  <p className="text-green-100 text-sm">
                    Plant advice · Pest detection · Yield prediction · Price forecasting — all in one place.
                  </p>
                </div>
                <div className="relative z-10 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 text-lg">
                  →
                </div>
              </button>

              {/* Quick Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-extrabold text-gray-800">Quick Actions</h2>
                  <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">{COMMANDS.length} features</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {COMMANDS.map(cmd =>
                    cmd.title === "Farm Intelligence"
                      ? <CommandCard key={cmd.title} {...cmd} onClick={() => setHubTab("intel")} />
                      : <CommandCard key={cmd.title} {...cmd} />
                  )}
                </div>
              </div>

              <ActivityFeed />
            </div>

            {/* Right 1/3: Insights */}
            <div className="space-y-6">
              <InsightPanel />
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl p-5 text-white relative overflow-hidden">
                <AnimatedBackground variant="green" density="light" className="opacity-40" />
                <div className="relative z-10">
                  <p className="text-green-200 text-xs font-bold uppercase tracking-wide mb-2">💡 Did You Know?</p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    ISA farmers who use the AI Advisor weekly see an average <strong>23% increase</strong> in crop yield.
                  </p>
                  <button onClick={() => setHubTab("advisor")}
                    className="inline-block mt-4 px-4 py-2 bg-white text-green-700 rounded-xl text-xs font-bold
                      hover:bg-green-50 hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-95">
                    Open AI Advisor →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── AI Advisor tab ── */}
      {hubTab === "advisor" && (
        <div className="bg-gradient-to-b from-green-50 via-white to-blue-50 min-h-screen">

          {/* Advisor hero strip */}
          <div className="relative bg-gradient-to-br from-green-700 via-green-600 to-teal-600 py-10 px-6 text-center overflow-hidden">
            <AnimatedBackground variant="green" density="medium" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                Powered by ISA AI Engine
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">AI Farm Advisory</h2>
              <p className="text-green-100 max-w-xl mx-auto text-sm">
                Expert-level agricultural insights — crop guidance, pest detection, yield modeling, and price intelligence.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                {[["12,000+","Farms Advised"],["2,400+","Pest Database"],["36","States"],["95%","Accuracy"]].map(([val, label]) => (
                  <div key={label} className="bg-white/20 rounded-xl px-4 py-2 text-center">
                    <p className="text-lg font-extrabold text-white">{val}</p>
                    <p className="text-green-200 text-[10px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Advisor sub-tabs */}
          <div className="bg-white border-b border-gray-200 sticky top-[104px] z-30">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex overflow-x-auto gap-1 py-2">
                {ADVISOR_TABS.map(tab => {
                  const locked = !isPremium && (tab.id === "yield" || tab.id === "price");
                  return (
                    <button key={tab.id} onClick={() => setAdvisorTab(tab.id)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
                        transition-all duration-200 active:scale-95
                        ${advisorTab === tab.id
                          ? "bg-green-600 text-white shadow-md scale-105"
                          : locked
                          ? "text-gray-400 bg-gray-100 cursor-pointer"
                          : "text-gray-600 hover:bg-gray-100 hover:text-gray-800 hover:scale-105"}`}>
                      <span>{tab.emoji}</span>
                      {tab.label}
                      {locked && <span className="text-[10px] bg-amber-100 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">Premium</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Advisor content */}
          <section className="max-w-6xl mx-auto px-6 py-10">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
                {ADVISOR_TABS.find(t => t.id === advisorTab)?.emoji}
                {ADVISOR_TABS.find(t => t.id === advisorTab)?.label}
              </h2>
              <p className="text-sm text-gray-500">{ADVISOR_TABS.find(t => t.id === advisorTab)?.description}</p>
            </div>
            {advisorTab === "plant" && <PlantAdvisor />}
            {advisorTab === "pest"  && <PestDetector />}
            {advisorTab === "yield" && (
              isPremium ? <YieldPredictor /> : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">📊</div>
                  <h3 className="text-xl font-extrabold text-gray-800 mb-2">Yield Predictor — Premium</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Model your expected harvest based on seed quality, irrigation, and fertilizer inputs. Upgrade to unlock.</p>
                  <a href="/premuim" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">⭐ Upgrade to Premium</a>
                </div>
              )
            )}
            {advisorTab === "price" && (
              isPremium ? <PriceForecaster /> : (
                <div className="text-center py-20">
                  <div className="text-5xl mb-4">📈</div>
                  <h3 className="text-xl font-extrabold text-gray-800 mb-2">Price Forecaster — Premium</h3>
                  <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">See 30/60/90-day price projections and the optimal selling window for any crop. Upgrade to unlock.</p>
                  <a href="/premuim" className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">⭐ Upgrade to Premium</a>
                </div>
              )
            )}
          </section>

          {/* Premium CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-6 text-center relative overflow-hidden">
            <AnimatedBackground variant="blue" density="light" className="opacity-30" />
            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-white mb-2">Want Deeper Insights?</h3>
              <p className="text-blue-200 text-sm mb-5 max-w-lg mx-auto">
                Upgrade to Premium for historical data analysis, personalized farm plans, satellite imagery, and unlimited AI queries.
              </p>
              <div className="flex justify-center gap-3 flex-wrap">
                <a href="/premuim"
                  className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all shadow-md active:scale-95">
                  View Premium Plans
                </a>
                <button
                  className="px-8 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 hover:shadow-md transition-all border border-white/30 active:scale-95">
                  Talk to an Agronomist
                </button>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ── Farm Intelligence tab ── */}
      {hubTab === "intel" && (
        <div className="bg-gray-50 min-h-screen">
          <div className="relative bg-gradient-to-br from-green-700 via-emerald-600 to-teal-700 py-10 px-6 text-center overflow-hidden">
            <AnimatedBackground variant="green" density="medium" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                AI + AgroTech — Merged Engine
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Farm Intelligence</h2>
              <p className="text-green-100 text-sm max-w-xl mx-auto">
                One tool combining crop rankings, pest alerts, fertiliser plans, equipment guidance, and advanced market insights — powered by ISA AI.
              </p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-6 py-10">
            <FarmIntelligence />
          </div>
        </div>
      )}

      {/* ── Bottom CTA (hub tab only) ── */}
      {hubTab === "hub" && (
        <section className="bg-gradient-to-r from-indigo-600 via-blue-600 to-blue-700 py-12 px-6 text-center relative overflow-hidden">
          <AnimatedBackground variant="blue" density="light" className="opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl font-extrabold text-white mb-2">Upgrade to ISA Pro</h3>
            <p className="text-blue-200 text-sm mb-6">
              Unlock unlimited AI queries, satellite imagery, advanced analytics, and priority support.
            </p>
            <div className="flex justify-center gap-3 flex-wrap">
              <a href="/premuim"
                className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold text-sm hover:bg-blue-50 hover:shadow-xl hover:-translate-y-1 transition-all shadow-lg active:scale-95">
                View Plans
              </a>
              <a href="/developers"
                className="px-8 py-3 bg-white/10 text-white border border-white/30 rounded-xl font-bold text-sm hover:bg-white/20 hover:shadow-md transition-all active:scale-95">
                API Access
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
