import ApiTiers from "@/src/components/developers/ApiTiers";
import EndpointDocs from "@/src/components/developers/EndpointDocs";
import ApiKeyForm from "@/src/components/developers/ApiKeyForm";

export const metadata = {
  title: 'ISA Developer API — Agricultural Data for Nigeria',
  description: 'Access real-time weather, soil health, market prices, and AI recommendations for Nigerian agriculture. REST API for startups, banks, insurers, and NGOs.',
};

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            ISA Developer API v1.0
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Build Nigeria's<br />
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Agri-Data Infrastructure
            </span>
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            One API to access weather forecasts, soil analysis, real-time market prices, AI crop recommendations, and IoT sensor data — all calibrated for Nigerian agriculture.
          </p>

          {/* Code snippet preview */}
          <div className="bg-gray-800 rounded-2xl border border-gray-700 p-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-400 text-xs ml-2 font-mono">GET /v1/weather/current?state=Kano</span>
            </div>
            <pre className="text-xs font-mono text-green-300 leading-relaxed">
{`{
  "data": {
    "temperature": 34,
    "humidity": 28,
    "condition": "Sunny",
    "farm_advisory": "Ideal for field operations"
  }
}`}
            </pre>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <a href="#get-key" className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-400 transition-all shadow-lg">
              Get Free API Key
            </a>
            <a href="#docs" className="px-8 py-3 bg-white/10 text-white rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20">
              View Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Use Case Showcase */}
      <section className="py-12 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-extrabold text-white text-center mb-8">Who Builds with ISA API</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '🏦', title: 'Agri-Lenders & Banks', desc: 'Use soil health and yield data to underwrite agri-loans and automate credit scoring for smallholder farmers.' },
              { icon: '🛡️', title: 'Insurance Companies', desc: 'Build index-based crop insurance products using our weather and NDVI satellite data for parametric payouts.' },
              { icon: '📱', title: 'AgriTech Startups', desc: "Power your farmer-facing app with ISA's weather, market prices, and AI recommendations without building data infrastructure." },
              { icon: '🏛️', title: 'Government & NGOs', desc: 'Access aggregated farm data for policy research, subsidy targeting, and agricultural extension programs.' },
              { icon: '🔬', title: 'Research Institutions', desc: 'API access to historical climate and soil data for agricultural research and academic publications.' },
              { icon: '🌐', title: 'Global AgriTech', desc: 'White-label our Nigeria-specific data layer to offer local market intelligence to international platforms.' },
            ].map(uc => (
              <div key={uc.title} className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h3 className="font-bold text-white mb-2">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Tiers */}
      <ApiTiers />

      {/* Documentation */}
      <div id="docs">
        <EndpointDocs />
      </div>

      {/* API Key Form */}
      <div id="get-key">
        <ApiKeyForm />
      </div>

      {/* Footer CTA */}
      <section className="py-12 px-6 bg-gray-950 border-t border-gray-800 text-center">
        <h3 className="text-xl font-extrabold text-white mb-2">Questions? We're here to help.</h3>
        <p className="text-gray-400 text-sm mb-5">Our developer support team responds within 4 hours on business days.</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <button className="px-6 py-2.5 bg-green-600 text-white rounded-xl font-bold text-sm hover:bg-green-700 transition-all">
            📧 Email Support
          </button>
          <button className="px-6 py-2.5 bg-gray-700 text-white rounded-xl font-bold text-sm hover:bg-gray-600 transition-all">
            💬 Join Developer Slack
          </button>
          <button className="px-6 py-2.5 bg-gray-700 text-white rounded-xl font-bold text-sm hover:bg-gray-600 transition-all">
            📖 Full API Docs
          </button>
        </div>
      </section>
    </div>
  );
}
