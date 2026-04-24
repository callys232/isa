"use client";

import { useState } from "react";

const endpoints = [
  {
    method: 'GET', path: '/v1/weather/current',
    description: 'Get current weather conditions for any Nigerian LGA',
    params: [{ name: 'state', type: 'string', required: true, desc: 'Nigerian state (e.g., Kano)' }, { name: 'lga', type: 'string', required: false, desc: 'Local government area' }],
    response: `{
  "status": "success",
  "data": {
    "location": "Kano, Kano State",
    "temperature": 34,
    "humidity": 28,
    "wind_speed": 12,
    "condition": "Sunny",
    "rainfall_mm": 0,
    "updated_at": "2026-04-24T10:00:00Z"
  }
}`,
  },
  {
    method: 'GET', path: '/v1/weather/forecast',
    description: 'Get 7-day or 14-day agricultural weather forecast',
    params: [{ name: 'state', type: 'string', required: true, desc: 'Nigerian state' }, { name: 'days', type: 'integer', required: false, desc: '7 or 14 (default: 7)' }],
    response: `{
  "status": "success",
  "data": {
    "location": "Ibadan, Oyo State",
    "forecast": [
      { "day": "2026-04-25", "high": 31, "low": 22, "rain_chance": 40, "condition": "Partly Cloudy" }
    ]
  }
}`,
  },
  {
    method: 'GET', path: '/v1/soil/analysis',
    description: 'Get soil health data for a farm coordinates or state',
    params: [{ name: 'lat', type: 'float', required: true, desc: 'Latitude' }, { name: 'lng', type: 'float', required: true, desc: 'Longitude' }],
    response: `{
  "status": "success",
  "data": {
    "ph": 6.2,
    "nitrogen_ppm": 48,
    "phosphorus_ppm": 22,
    "potassium_ppm": 180,
    "moisture_pct": 65,
    "organic_matter_pct": 2.8,
    "recommendation": "Optimal for maize, tomatoes, cowpea"
  }
}`,
  },
  {
    method: 'GET', path: '/v1/market/prices',
    description: 'Get current crop prices across Nigerian markets',
    params: [{ name: 'crop', type: 'string', required: true, desc: 'Crop name (e.g., maize, tomatoes)' }, { name: 'state', type: 'string', required: false, desc: 'Filter by state' }],
    response: `{
  "status": "success",
  "data": {
    "crop": "Maize",
    "unit": "tonne",
    "markets": [
      { "market": "Dawanau, Kano", "price": 44000, "updated": "2026-04-24" },
      { "market": "Mile 12, Lagos", "price": 52000, "updated": "2026-04-24" }
    ],
    "national_avg": 46500
  }
}`,
  },
  {
    method: 'POST', path: '/v1/ai/pest-detect',
    description: 'Detect pest or disease from a crop image (multipart/form-data)',
    params: [{ name: 'image', type: 'file', required: true, desc: 'JPG/PNG image of affected plant' }, { name: 'crop_type', type: 'string', required: false, desc: 'Crop type hint for accuracy' }],
    response: `{
  "status": "success",
  "data": {
    "detected": "Fall Armyworm",
    "confidence": 0.84,
    "severity": "high",
    "treatment": ["Apply Emamectin benzoate 1.9EC", "Scout weekly"],
    "prevention": ["Use pheromone traps", "Companion planting"]
  }
}`,
  },
  {
    method: 'GET', path: '/v1/calendar/planting',
    description: 'Get optimal planting calendar for a crop and state',
    params: [{ name: 'crop', type: 'string', required: true, desc: 'Crop name' }, { name: 'state', type: 'string', required: true, desc: 'Nigerian state' }],
    response: `{
  "status": "success",
  "data": {
    "crop": "Maize",
    "state": "Oyo",
    "planting_windows": [
      { "season": "First Rains", "start": "March 15", "end": "April 30", "confidence": "high" },
      { "season": "Second Rains", "start": "July 1", "end": "July 31", "confidence": "medium" }
    ]
  }
}`,
  },
];

const languageSamples: Record<string, string> = {
  'JavaScript': `const ISA_KEY = 'YOUR_API_KEY';

const response = await fetch(
  'https://api.isa-agro.ng/v1/weather/current?state=Kano',
  {
    headers: {
      'Authorization': \`Bearer \${ISA_KEY}\`,
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();
console.log(data.data.temperature); // 34`,

  'Python': `import requests

ISA_KEY = 'YOUR_API_KEY'
BASE_URL = 'https://api.isa-agro.ng/v1'

headers = {
    'Authorization': f'Bearer {ISA_KEY}',
    'Content-Type': 'application/json'
}

response = requests.get(
    f'{BASE_URL}/weather/current',
    headers=headers,
    params={'state': 'Kano'}
)

data = response.json()
print(data['data']['temperature'])  # 34`,

  'cURL': `curl -X GET "https://api.isa-agro.ng/v1/weather/current?state=Kano" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
};

export default function EndpointDocs() {
  const [selected, setSelected] = useState(endpoints[0]);
  const [lang, setLang] = useState<'JavaScript' | 'Python' | 'cURL'>('JavaScript');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const methodColor = { GET: 'bg-green-100 text-green-700', POST: 'bg-blue-100 text-blue-700', PUT: 'bg-amber-100 text-amber-700', DELETE: 'bg-red-100 text-red-700' };

  return (
    <section className="py-16 px-6 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-3">API Reference</h2>
          <p className="text-gray-400">Clean REST API. JSON responses. Easy integration.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Endpoint List */}
          <div className="space-y-2">
            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Endpoints</p>
            {endpoints.map(ep => (
              <button key={ep.path} onClick={() => setSelected(ep)}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all border ${selected.path === ep.path ? 'bg-gray-700 border-green-500' : 'bg-gray-800 border-gray-700 hover:border-gray-600'}`}>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${methodColor[ep.method as keyof typeof methodColor]}`}>{ep.method}</span>
                  <span className="text-gray-200 text-xs font-mono truncate">{ep.path}</span>
                </div>
                <p className="text-gray-400 text-[11px] mt-1 truncate">{ep.description}</p>
              </button>
            ))}
          </div>

          {/* Endpoint Detail */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header */}
            <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-sm font-bold px-2 py-1 rounded ${methodColor[selected.method as keyof typeof methodColor]}`}>{selected.method}</span>
                <code className="text-green-400 text-sm font-mono">{selected.path}</code>
              </div>
              <p className="text-gray-300 text-sm">{selected.description}</p>
            </div>

            {/* Parameters */}
            <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
              <h4 className="text-gray-200 font-bold text-sm mb-3">Parameters</h4>
              <div className="space-y-2">
                {selected.params.map(p => (
                  <div key={p.name} className="flex items-start gap-3 text-sm">
                    <code className="text-amber-400 font-mono text-xs bg-gray-700 px-2 py-0.5 rounded shrink-0">{p.name}</code>
                    <span className="text-gray-400 text-xs">{p.type}</span>
                    {p.required && <span className="text-red-400 text-xs font-bold shrink-0">required</span>}
                    <span className="text-gray-400 text-xs">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
                <h4 className="text-gray-200 font-bold text-sm">Example Response</h4>
                <button onClick={() => handleCopy(selected.response)}
                  className="text-xs text-gray-400 hover:text-white transition-colors">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-5 text-xs text-green-300 font-mono overflow-x-auto whitespace-pre">{selected.response}</pre>
            </div>

            {/* Code Sample */}
            <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-700">
                <div className="flex gap-2">
                  {(['JavaScript', 'Python', 'cURL'] as const).map(l => (
                    <button key={l} onClick={() => setLang(l)}
                      className={`text-xs px-3 py-1 rounded-full transition-all ${lang === l ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                      {l}
                    </button>
                  ))}
                </div>
                <button onClick={() => handleCopy(languageSamples[lang])}
                  className="text-xs text-gray-400 hover:text-white transition-colors">
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-5 text-xs text-blue-300 font-mono overflow-x-auto whitespace-pre">{languageSamples[lang]}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
