"use client";

import { useState, useEffect, useRef } from "react";
import { COUNTRIES } from "./locationData";

export interface LocationValue {
  country:     string;  // country name
  countryCode: string;  // ISO code
  state:       string;  // state/province/region
  city:        string;  // city or locality
  display:     string;  // full display string
}

interface Props {
  value?:    LocationValue;
  onChange:  (loc: LocationValue) => void;
  required?: boolean;
  label?:    string;
}

const EMPTY: LocationValue = { country: "", countryCode: "", state: "", city: "", display: "" };

function build(c: string, cc: string, s: string, ci: string): LocationValue {
  const parts = [ci, s, c].filter(Boolean);
  return { country: c, countryCode: cc, state: s, city: ci, display: parts.join(", ") };
}

export default function LocationSelector({ value = EMPTY, onChange, required, label = "Location" }: Props) {
  const [countryCode, setCountryCode] = useState(value.countryCode || "");
  const [state,       setState]       = useState(value.state || "");
  const [city,        setCity]        = useState(value.city || "");
  const [detecting,   setDetecting]   = useState(false);
  const [geoError,    setGeoError]    = useState("");
  const [search,      setSearch]      = useState("");
  const [open,        setOpen]        = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const selected = COUNTRIES.find(c => c.code === countryCode);
  const hasStates = (selected?.states?.length ?? 0) > 0;

  const filtered = search.trim()
    ? COUNTRIES.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))
    : COUNTRIES;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Propagate changes upward
  useEffect(() => {
    if (!countryCode) return;
    const country = COUNTRIES.find(c => c.code === countryCode)?.name ?? "";
    onChange(build(country, countryCode, state, city));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countryCode, state, city]);

  const detectLocation = () => {
    setGeoError("");
    if (!navigator.geolocation) { setGeoError("Geolocation not supported by your browser."); return; }
    setDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
            { headers: { "Accept-Language": "en" } }
          );
          const data = await res.json();
          const addr = data.address ?? {};

          // Match country code
          const cc = (addr.country_code ?? "").toUpperCase();
          const detectedCountry = COUNTRIES.find(c => c.code === cc);
          const detectedState   = addr.state ?? addr.region ?? addr.county ?? "";
          const detectedCity    = addr.city ?? addr.town ?? addr.village ?? addr.municipality ?? "";

          if (detectedCountry) {
            setCountryCode(detectedCountry.code);
            // Try to match state from our list
            if (detectedCountry.states) {
              const matched = detectedCountry.states.find(
                s => s.toLowerCase().includes(detectedState.toLowerCase()) ||
                     detectedState.toLowerCase().includes(s.toLowerCase())
              );
              setState(matched ?? detectedState);
            } else {
              setState(detectedState);
            }
            setCity(detectedCity);
          }
        } catch {
          setGeoError("Could not read location data. Please select manually.");
        } finally {
          setDetecting(false);
        }
      },
      (err) => {
        setDetecting(false);
        if (err.code === 1) setGeoError("Location access denied. Please select manually.");
        else setGeoError("Could not detect location. Please select manually.");
      },
      { timeout: 8000 }
    );
  };

  const inp = "w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 hover:border-green-300 transition-all";

  return (
    <div className="space-y-2">
      {/* Label + GPS button */}
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
          {label}{required && " *"}
        </label>
        <button type="button" onClick={detectLocation} disabled={detecting}
          className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg transition-all active:scale-95
            ${detecting ? "bg-blue-100 text-blue-400 cursor-wait" : "bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"}`}>
          {detecting ? (
            <><span className="w-3 h-3 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />Detecting…</>
          ) : (
            <><span>📍</span>Use My Location</>
          )}
        </button>
      </div>

      {geoError && (
        <p className="text-amber-600 text-[10px] bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">{geoError}</p>
      )}

      {/* Country dropdown (searchable) */}
      <div className="relative" ref={dropRef}>
        <button type="button" onClick={() => setOpen(o => !o)}
          className={`${inp} flex items-center justify-between cursor-pointer`}>
          <span className={countryCode ? "text-gray-900" : "text-gray-400"}>
            {countryCode ? COUNTRIES.find(c => c.code === countryCode)?.name : "Select country…"}
          </span>
          <span className={`text-gray-400 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}>▼</span>
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden"
            style={{ animation: "fadeDown 0.12s ease" }}>
            <style>{`@keyframes fadeDown{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:translateY(0)}}`}</style>
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search country…"
                className="w-full px-3 py-2 bg-gray-100 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
            {/* List */}
            <div className="max-h-52 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">No results for &ldquo;{search}&rdquo;</p>
              ) : (
                filtered.map(c => (
                  <button key={c.code} type="button"
                    onClick={() => { setCountryCode(c.code); setState(""); setSearch(""); setOpen(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-left text-sm transition-colors
                      ${countryCode === c.code ? "bg-green-50 text-green-700 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}>
                    <span className="flex-1">{c.name}</span>
                    {c.states && <span className="text-[9px] text-gray-400">{c.states.length} regions</span>}
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* State/Province dropdown — only if selected country has states */}
      {countryCode && hasStates && (
        <select value={state} onChange={e => setState(e.target.value)} className={inp}>
          <option value="">Select state / province…</option>
          {selected?.states?.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      )}

      {/* State as free text if no state list */}
      {countryCode && !hasStates && (
        <input value={state} onChange={e => setState(e.target.value)}
          placeholder="State / Province / Region (optional)"
          className={inp} />
      )}

      {/* City */}
      {countryCode && (
        <input value={city} onChange={e => setCity(e.target.value)}
          placeholder="City or locality (optional)"
          className={inp} />
      )}

      {/* Preview */}
      {value.display && (
        <div className="flex items-center gap-1.5 text-[11px] text-green-700 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
          <span>📍</span>
          <span className="font-semibold">{value.display}</span>
        </div>
      )}
    </div>
  );
}
