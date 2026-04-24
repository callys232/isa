"use client";

import { useState } from "react";

interface PostListingModalProps {
  onClose: () => void;
}

const categories = ['crops', 'livestock', 'seeds', 'fertilizer', 'equipment'];
const nigerianStates = [
  'Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno',
  'Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','FCT','Gombe','Imo',
  'Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos',
  'Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers',
  'Sokoto','Taraba','Yobe','Zamfara',
];

export default function PostListingModal({ onClose }: PostListingModalProps) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    title: '', category: 'crops', price: '', unit: '', minOrder: '',
    availableQty: '', state: 'Lagos', location: '', description: '', escrow: true,
    phone: '', name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const validate1 = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = 'Title is required';
    if (!form.price || isNaN(Number(form.price))) e.price = 'Enter a valid price';
    if (!form.unit.trim()) e.unit = 'Unit is required';
    if (!form.minOrder || isNaN(Number(form.minOrder))) e.minOrder = 'Enter min order';
    if (!form.availableQty || isNaN(Number(form.availableQty))) e.availableQty = 'Enter available qty';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validate2 = () => {
    const e: Record<string, string> = {};
    if (!form.description.trim() || form.description.length < 30) e.description = 'Description must be at least 30 characters';
    if (!form.name.trim()) e.name = 'Your name is required';
    if (!form.phone.trim()) e.phone = 'Phone number is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (step === 1 && validate1()) setStep(2); };
  const handleSubmit = () => { if (validate2()) setSubmitted(true); };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl" onClick={e => e.stopPropagation()}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-extrabold text-gray-800 mb-2">Listing Submitted!</h2>
          <p className="text-gray-600 text-sm mb-2">Your listing is under review and will go live within 24 hours.</p>
          <p className="text-gray-500 text-xs mb-6">Reference: ISA-{Math.random().toString(36).slice(2,8).toUpperCase()}</p>
          <button onClick={onClose} className="px-8 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700">
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-gray-800">Post a Listing</h2>
            <p className="text-xs text-gray-500 mt-0.5">Step {step} of 2 — {step === 1 ? 'Product Details' : 'Seller Info'}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
        </div>

        {/* Progress */}
        <div className="flex h-1.5 bg-gray-100">
          <div className={`bg-green-500 transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`}></div>
        </div>

        <div className="p-5 space-y-4">
          {step === 1 && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Listing Title *</label>
                <input value={form.title} onChange={e => update('title', e.target.value)}
                  placeholder="e.g. Fresh Roma Tomatoes — Grade A"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.title ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => update('category', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white capitalize">
                  {categories.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Price (₦) *</label>
                  <input value={form.price} onChange={e => update('price', e.target.value)}
                    type="number" placeholder="18000"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.price ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Unit *</label>
                  <input value={form.unit} onChange={e => update('unit', e.target.value)}
                    placeholder="bag (50kg)"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.unit ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Min. Order *</label>
                  <input value={form.minOrder} onChange={e => update('minOrder', e.target.value)}
                    type="number" placeholder="5"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.minOrder ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.minOrder && <p className="text-red-500 text-xs mt-1">{errors.minOrder}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Available Qty *</label>
                  <input value={form.availableQty} onChange={e => update('availableQty', e.target.value)}
                    type="number" placeholder="200"
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.availableQty ? 'border-red-400' : 'border-gray-200'}`} />
                  {errors.availableQty && <p className="text-red-500 text-xs mt-1">{errors.availableQty}</p>}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => update('escrow', !form.escrow)}
                    className={`w-12 h-6 rounded-full relative transition-colors ${form.escrow ? 'bg-green-500' : 'bg-gray-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${form.escrow ? 'translate-x-7' : 'translate-x-1'}`}></div>
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-gray-700">Enable Escrow Protection</span>
                    <p className="text-xs text-gray-500">Buyers pay securely. You get paid on delivery confirmation.</p>
                  </div>
                </label>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Product Description * (min 30 chars)</label>
                <textarea value={form.description} onChange={e => update('description', e.target.value)}
                  rows={4} placeholder="Describe your product: quality, source, how it was processed, delivery options..."
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none ${errors.description ? 'border-red-400' : 'border-gray-200'}`} />
                <div className="flex justify-between mt-1">
                  {errors.description ? <p className="text-red-500 text-xs">{errors.description}</p> : <span />}
                  <span className="text-xs text-gray-400">{form.description.length} chars</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State *</label>
                  <select value={form.state} onChange={e => update('state', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white">
                    {nigerianStates.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City / LGA</label>
                  <input value={form.location} onChange={e => update('location', e.target.value)}
                    placeholder="e.g. Ibadan North"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Your Full Name *</label>
                <input value={form.name} onChange={e => update('name', e.target.value)}
                  placeholder="Emeka Nwosu"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.name ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number *</label>
                <input value={form.phone} onChange={e => update('phone', e.target.value)}
                  placeholder="+234 803 xxx xxxx"
                  className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.phone ? 'border-red-400' : 'border-gray-200'}`} />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              <p className="text-xs text-gray-400">
                By submitting, you agree to our <span className="text-green-600 underline cursor-pointer">Terms of Service</span> and <span className="text-green-600 underline cursor-pointer">Seller Guidelines</span>.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 flex gap-3">
          {step === 2 && (
            <button onClick={() => setStep(1)} className="flex-1 py-3 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-300 transition-all">
              ← Back
            </button>
          )}
          {step === 1 && (
            <button onClick={handleNext} className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-md transition-all">
              Next →
            </button>
          )}
          {step === 2 && (
            <button onClick={handleSubmit} className="flex-1 py-3 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 shadow-md transition-all">
              Submit Listing 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
