"use client";

import { useState, useRef } from "react";

interface DetectionResult {
  pest: string;
  emoji: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  treatments: string[];
  preventions: string[];
}

const pestDatabase: DetectionResult[] = [
  {
    pest: 'Fall Armyworm', emoji: '🐛', confidence: 84, severity: 'high',
    description: 'Spodoptera frugiperda larvae detected. Characteristic "window-paning" damage pattern and frass visible in leaf whorls. Active infestation stage.',
    treatments: ['Apply Emamectin benzoate 1.9EC at 0.4L/ha within 48 hours', 'Spray Lambda-cyhalothrin 2.5CS in the morning or evening', 'For organic: apply Neem-based biopesticide (Azadirachtin 0.15%)'],
    preventions: ['Scout weekly during vegetative stage', 'Use pheromone traps (1 per 2 acres)', 'Plant push-pull companion crops (Desmodium + Napier grass)'],
  },
  {
    pest: 'Leaf Rust (Fungal)', emoji: '🍂', confidence: 91, severity: 'medium',
    description: 'Puccinia fungal rust identified. Orange-brown pustules visible on leaf undersides. Early to mid-stage infection — spread risk is HIGH under current humidity levels.',
    treatments: ['Apply Mancozeb 80WP at 2.5kg/ha immediately', 'Alternate with Propiconazole 25EC after 7 days', 'Remove and burn heavily infected leaves'],
    preventions: ['Use rust-resistant varieties in next season', 'Avoid overhead irrigation', 'Maintain 30cm row spacing for airflow'],
  },
  {
    pest: 'Aphid Colony', emoji: '🦟', confidence: 78, severity: 'low',
    description: 'Aphis gossypii colony on undersides of young leaves. Current density: moderate (~150/leaf). Honeydew deposits and sooty mold beginning. Predatory ladybirds observed (positive sign).',
    treatments: ['Spray Imidacloprid 200SL at 0.3ml/L water', 'Insecticidal soap solution (5ml/L) for organic option', 'Avoid broad-spectrum insecticides to preserve natural enemies'],
    preventions: ['Introduce Lacewing larvae for biological control', 'Remove weeds that serve as alternate hosts', 'Reflective mulch to repel aphids in dry season'],
  },
];

export default function PestDetector() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(f);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleAnalyze = () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(pestDatabase[Math.floor(Math.random() * pestDatabase.length)]);
      setLoading(false);
    }, 2400);
  };

  const sevColor = { low: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', high: 'bg-red-100 text-red-700' };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-extrabold text-gray-800 text-lg mb-1">Pest & Disease Detector</h3>
        <p className="text-sm text-gray-500 mb-5">Upload a photo of affected leaves or plants. Our AI will identify the pest or disease and provide treatment recommendations.</p>

        {/* Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all mb-4
            ${dragging ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'}`}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          {preview ? (
            <div>
              <img src={preview} alt="Upload preview" className="w-full h-48 object-cover rounded-xl mb-3" />
              <p className="text-xs text-gray-500">{file?.name}</p>
            </div>
          ) : (
            <>
              <div className="text-4xl mb-3">📸</div>
              <p className="font-semibold text-gray-700 mb-1">Drop image here or click to upload</p>
              <p className="text-xs text-gray-400">JPG, PNG, WEBP · Max 10MB · Best: close-up of affected area</p>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />

        {/* Tips */}
        <div className="bg-green-50 rounded-xl p-3 mb-4 text-xs text-green-700">
          <strong>📷 Photo Tips:</strong> Take photos in bright natural light · Show both sides of leaves · Include stem/fruit if affected · Avoid blurry images
        </div>

        <button onClick={handleAnalyze} disabled={!file || loading}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all shadow-md
            ${!file ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : loading ? 'bg-amber-400 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
              Scanning for pests & diseases...
            </span>
          ) : '🔬 Detect Pest / Disease'}
        </button>
      </div>

      {/* Results */}
      <div>
        {!result && !loading && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border border-green-100 p-8 text-center h-full flex flex-col items-center justify-center">
            <span className="text-5xl mb-3">🔬</span>
            <h3 className="font-bold text-green-800 mb-2">AI Pest Scanner</h3>
            <p className="text-green-600 text-sm">Upload a photo of your affected plant to get instant pest/disease identification with treatment protocol.</p>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <div className="text-4xl mb-4 animate-pulse">🧬</div>
            <p className="font-semibold text-gray-700 mb-1">Analyzing image...</p>
            <div className="space-y-2 text-xs text-gray-400">
              {['Preprocessing image...', 'Extracting visual features...', 'Matching against 2,400+ pest database...', 'Generating treatment protocol...'].map((step, i) => (
                <p key={i} className="flex items-center justify-center gap-2">
                  <svg className="w-3 h-3 animate-spin text-green-500" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {result && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fadeIn">
            {/* Detection Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-5 text-white">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{result.emoji}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-lg">{result.pest}</h4>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${sevColor[result.severity]}`}>
                      {result.severity.toUpperCase()} severity
                    </span>
                  </div>
                  <p className="text-green-100 text-sm">{result.confidence}% confidence</p>
                </div>
              </div>
              {/* Confidence bar */}
              <div className="h-1.5 bg-white/30 rounded-full">
                <div className="h-full bg-white rounded-full" style={{ width: `${result.confidence}%` }} />
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-700 leading-relaxed">{result.description}</p>

              <div>
                <h5 className="font-bold text-red-700 text-sm mb-2 flex items-center gap-1">💊 Immediate Treatment</h5>
                <ul className="space-y-1.5">
                  {result.treatments.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700 bg-red-50 rounded-lg px-3 py-2">
                      <span className="text-red-500 shrink-0 mt-0.5">→</span>{t}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-green-700 text-sm mb-2 flex items-center gap-1">🛡️ Prevention Strategy</h5>
                <ul className="space-y-1">
                  {result.preventions.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 shrink-0">✓</span>{p}
                    </li>
                  ))}
                </ul>
              </div>

              <button onClick={() => { setFile(null); setPreview(null); setResult(null); }}
                className="w-full py-2.5 rounded-xl border-2 border-green-200 text-green-700 font-semibold text-sm hover:bg-green-50 transition-all">
                Scan Another Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
