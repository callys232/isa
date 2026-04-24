"use client";

import { useState } from "react";
import PlantAdvisor from "@/src/components/ai-advisor/PlantAdvisor";
import PestDetector from "@/src/components/ai-advisor/PestDetector";
import YieldPredictor from "@/src/components/ai-advisor/YieldPredictor";
import PriceForecaster from "@/src/components/ai-advisor/PriceForecaster";

const tabs = [
  { id: 'plant', label: 'Plant Advisor', emoji: '🌱', description: 'What should I grow?' },
  { id: 'pest', label: 'Pest Detector', emoji: '🔬', description: 'Identify pests & diseases' },
  { id: 'yield', label: 'Yield Predictor', emoji: '📊', description: 'Model your harvest' },
  { id: 'price', label: 'Price Forecaster', emoji: '📈', description: 'Best time to sell' },
];

export default function AIAdvisorPage() {
  const [activeTab, setActiveTab] = useState('plant');

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">

      {/* Hero */}
      <section className="bg-gradient-to-br from-green-700 via-green-600 to-teal-600 py-14 px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
          Powered by ISA AI Engine
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">AI Farm Advisory</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          Get expert-level agricultural insights at your fingertips. Planting guidance, pest detection, yield modeling, and price intelligence — all AI-powered.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-center">
          {[['12,000+', 'Farms Advised'], ['2,400+', 'Pest Database'], ['36', 'States Covered'], ['95%', 'Accuracy Rate']].map(([val, label]) => (
            <div key={label as string} className="bg-white/20 rounded-2xl px-5 py-3">
              <div className="text-2xl font-extrabold text-white">{val}</div>
              <div className="text-green-200 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex overflow-x-auto gap-1 py-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all
                  ${activeTab === tab.id ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}>
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        {/* Active tab description */}
        <div className="mb-6">
          <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            {tabs.find(t => t.id === activeTab)?.emoji}
            {tabs.find(t => t.id === activeTab)?.label}
          </h2>
          <p className="text-sm text-gray-500">{tabs.find(t => t.id === activeTab)?.description}</p>
        </div>

        {activeTab === 'plant' && <PlantAdvisor />}
        {activeTab === 'pest' && <PestDetector />}
        {activeTab === 'yield' && <YieldPredictor />}
        {activeTab === 'price' && <PriceForecaster />}
      </section>

      {/* Premium CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-12 px-6 text-center">
        <h3 className="text-2xl font-extrabold text-white mb-2">Want Deeper Insights?</h3>
        <p className="text-blue-200 text-sm mb-5 max-w-lg mx-auto">
          Upgrade to Premium to unlock historical data analysis, personalized farm plans, satellite imagery interpretation, and unlimited AI queries.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <button className="px-8 py-3 bg-white text-blue-700 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-md">
            View Premium Plans
          </button>
          <button className="px-8 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-all border border-white/30">
            Talk to an Agronomist
          </button>
        </div>
      </section>
    </div>
  );
}
