"use client";

import { useState } from "react";
import { Invoice, InvoiceItem, InvoiceTotals } from "@/src/types/invoice";

const CURRENCIES: Record<string, string> = {
  NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "₵",
};

function calcTotals(items: InvoiceItem[], currency = "NGN"): InvoiceTotals {
  const subtotal = items.reduce((sum, i) => {
    const line = i.quantity * i.unitPrice;
    return sum + line - (line * (i.discount ?? 0)) / 100;
  }, 0);
  const taxTotal = items.reduce((sum, i) => {
    const line = i.quantity * i.unitPrice;
    const afterDisc = line - (line * (i.discount ?? 0)) / 100;
    return sum + (afterDisc * i.tax) / 100;
  }, 0);
  const discountTotal = items.reduce((sum, i) => {
    return sum + (i.quantity * i.unitPrice * (i.discount ?? 0)) / 100;
  }, 0);
  return { subtotal, taxTotal, discountTotal, grandTotal: subtotal + taxTotal, currency };
}

function lineTotal(item: InvoiceItem): number {
  const base = item.quantity * item.unitPrice;
  const disc = (base * (item.discount ?? 0)) / 100;
  return base - disc + ((base - disc) * item.tax) / 100;
}

const emptyItem = (): InvoiceItem => ({
  id: Date.now(), description: "", quantity: 1, unitPrice: 0, tax: 0, discount: 0,
});

interface Props {
  onSave: (inv: Invoice) => void;
  onCancel: () => void;
  existingCount: number;
  pastClients: string[];
}

export default function InvoiceBuilder({ onSave, onCancel, existingCount, pastClients }: Props) {
  const [step, setStep] = useState(1);

  // Step 1 fields
  const today = new Date().toISOString().slice(0, 10);
  const [invoiceNo, setInvoiceNo] = useState(
    `ISA-${new Date().getFullYear()}-${String(existingCount + 1).padStart(3, "0")}`
  );
  const [issueDate, setIssueDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [client, setClient] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [notes, setNotes] = useState("Payment via bank transfer. 10% late fee after due date.");
  const [errors1, setErrors1] = useState<Record<string, string>>({});

  // Step 2 fields
  const [items, setItems] = useState<InvoiceItem[]>([emptyItem()]);
  const [errors2, setErrors2] = useState<string>("");

  const sym = CURRENCIES[currency] ?? "₦";

  // ── Validation ──
  const validate1 = () => {
    const e: Record<string, string> = {};
    if (!client.trim()) e.client = "Client name is required";
    if (!dueDate) e.dueDate = "Due date is required";
    if (!invoiceNo.trim()) e.invoiceNo = "Invoice number is required";
    setErrors1(e);
    return !Object.keys(e).length;
  };
  const validate2 = () => {
    const invalid = items.some(i => !i.description.trim() || i.unitPrice <= 0);
    if (invalid) { setErrors2("All items must have a description and price > 0"); return false; }
    setErrors2("");
    return true;
  };

  // ── Item helpers ──
  const updateItem = (id: number, key: keyof InvoiceItem, value: string | number) =>
    setItems(prev => prev.map(i => i.id === id ? { ...i, [key]: value } : i));
  const removeItem = (id: number) => setItems(prev => prev.filter(i => i.id !== id));
  const addItem = () => setItems(prev => [...prev, emptyItem()]);

  const totals = calcTotals(items, currency);

  // ── Submit ──
  const handleGenerate = () => {
    const inv: Invoice = {
      id: Date.now(),
      client, clientEmail, clientAddress,
      items,
      dueDate, issueDate,
      status: "Pending",
      totals,
      notes,
      auditTrail: { createdAt: new Date().toISOString() },
    };
    onSave(inv);
  };

  const inputCls = (err?: string) =>
    `w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white transition-all duration-150 hover:border-blue-300 ${err ? "border-red-400" : "border-gray-200"}`;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="flex items-center gap-0 mb-8">
        {[["1", "Client & Details"], ["2", "Line Items"], ["3", "Review"]].map(([n, label], idx) => (
          <div key={n} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200
                ${step > idx + 1 ? "bg-green-500 border-green-500 text-white shadow-md shadow-green-200" : step === idx + 1 ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 scale-110" : "bg-white border-gray-300 text-gray-400"}`}>
                {step > idx + 1 ? "✓" : n}
              </div>
              <span className={`text-xs mt-1 font-medium transition-colors duration-200 ${step === idx + 1 ? "text-blue-600" : "text-gray-400"}`}>{label}</span>
            </div>
            {idx < 2 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 transition-all duration-300 ${step > idx + 1 ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ── Step 1: Details ── */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Invoice meta */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 transition-all duration-200 hover:shadow-md hover:border-blue-100">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-2">Invoice Details</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Invoice Number *</label>
              <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className={inputCls(errors1.invoiceNo)} />
              {errors1.invoiceNo && <p className="text-red-500 text-xs mt-1">{errors1.invoiceNo}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Issue Date</label>
                <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className={inputCls()} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Due Date *</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputCls(errors1.dueDate)} />
                {errors1.dueDate && <p className="text-red-500 text-xs mt-1">{errors1.dueDate}</p>}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Currency</label>
              <select value={currency} onChange={e => setCurrency(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400">
                {Object.entries(CURRENCIES).map(([code, sym]) => (
                  <option key={code} value={code}>{code} ({sym})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Notes / Payment Terms</label>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
            </div>
          </div>

          {/* Right: Client info */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4 transition-all duration-200 hover:shadow-md hover:border-blue-100">
            <h3 className="font-bold text-gray-800 text-base border-b border-gray-100 pb-2">Bill To</h3>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Client Name *</label>
              <input value={client} onChange={e => setClient(e.target.value)}
                list="past-clients" placeholder="e.g. Green Valley Farms Ltd"
                className={inputCls(errors1.client)} />
              <datalist id="past-clients">
                {pastClients.map(c => <option key={c} value={c} />)}
              </datalist>
              {errors1.client && <p className="text-red-500 text-xs mt-1">{errors1.client}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Client Email</label>
              <input type="email" value={clientEmail} onChange={e => setClientEmail(e.target.value)}
                placeholder="accounts@company.com" className={inputCls()} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
              <input value={clientPhone} onChange={e => setClientPhone(e.target.value)}
                placeholder="+234 803 xxx xxxx" className={inputCls()} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Billing Address</label>
              <textarea value={clientAddress} onChange={e => setClientAddress(e.target.value)} rows={3}
                placeholder="Street, City, State"
                className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none" />
            </div>
          </div>
        </div>
      )}

      {/* ── Step 2: Items ── */}
      {step === 2 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-800">Line Items</h3>
            <span className="text-sm text-gray-500">{sym} {currency}</span>
          </div>

          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-2 px-6 py-2 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
            <div className="col-span-4">Description</div>
            <div className="col-span-1 text-center">Qty</div>
            <div className="col-span-2 text-center">Unit Price</div>
            <div className="col-span-2 text-center">Disc %</div>
            <div className="col-span-1 text-center">Tax %</div>
            <div className="col-span-2 text-right">Total</div>
          </div>

          {/* Item rows */}
          <div className="divide-y divide-gray-50">
            {items.map((item, idx) => (
              <div key={item.id} className="px-6 py-3 grid grid-cols-12 gap-2 items-center group">
                <div className="col-span-12 md:col-span-4">
                  <input value={item.description} onChange={e => updateItem(item.id, "description", e.target.value)}
                    placeholder={`Item ${idx + 1}`}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="col-span-4 md:col-span-1">
                  <input type="number" min={1} value={item.quantity} onChange={e => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="col-span-4 md:col-span-2">
                  <div className="relative">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">{sym}</span>
                    <input type="number" min={0} value={item.unitPrice} onChange={e => updateItem(item.id, "unitPrice", Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-2 border border-gray-200 rounded-lg text-sm text-right focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <div className="relative">
                    <input type="number" min={0} max={100} value={item.discount ?? 0} onChange={e => updateItem(item.id, "discount", Number(e.target.value))}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-1">
                  <div className="relative">
                    <input type="number" min={0} max={100} value={item.tax} onChange={e => updateItem(item.id, "tax", Number(e.target.value))}
                      className="w-full px-2 py-2 border border-gray-200 rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-400" />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-xs">%</span>
                  </div>
                </div>
                <div className="col-span-8 md:col-span-2 flex items-center justify-end gap-2">
                  <span className="font-semibold text-sm text-gray-800">
                    {sym}{lineTotal(item).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  {items.length > 1 && (
                    <button onClick={() => removeItem(item.id)}
                      className="w-6 h-6 rounded-full bg-red-50 text-red-400 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-xs transition-all opacity-0 group-hover:opacity-100">
                      ✕
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add item */}
          <div className="px-6 py-3 border-t border-gray-100">
            <button onClick={addItem}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-all duration-150 active:scale-95 group">
              <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xs font-bold transition-all duration-150 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-md">+</span>
              Add Line Item
            </button>
          </div>

          {/* Totals */}
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="max-w-xs ml-auto space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span className="font-medium">{sym}{totals.subtotal.toLocaleString()}</span></div>
              {(totals.discountTotal ?? 0) > 0 && (
                <div className="flex justify-between text-green-600"><span>Discount</span><span>−{sym}{(totals.discountTotal ?? 0).toLocaleString()}</span></div>
              )}
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>{sym}{totals.taxTotal.toLocaleString()}</span></div>
              <div className="flex justify-between text-gray-900 font-extrabold text-base border-t border-gray-300 pt-2 mt-1">
                <span>Total</span><span>{sym}{totals.grandTotal.toLocaleString()}</span>
              </div>
            </div>
            {errors2 && <p className="text-red-500 text-xs mt-2 text-right">{errors2}</p>}
          </div>
        </div>
      )}

      {/* ── Step 3: Review ── */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-xs font-semibold uppercase tracking-wide">Invoice Preview</p>
                <h3 className="font-extrabold text-xl mt-0.5">{invoiceNo}</h3>
              </div>
              <div className="text-right text-sm">
                <p className="text-blue-200">Issued: {issueDate}</p>
                <p className="text-blue-200">Due: {dueDate}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Bill To</p>
                <p className="font-bold text-gray-800">{client}</p>
                {clientEmail && <p className="text-gray-600">{clientEmail}</p>}
                {clientPhone && <p className="text-gray-600">{clientPhone}</p>}
                {clientAddress && <p className="text-gray-500 text-xs mt-0.5">{clientAddress}</p>}
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">Amount Due</p>
                <p className="text-3xl font-extrabold text-blue-700">{sym}{totals.grandTotal.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-0.5">{currency}</p>
              </div>
            </div>

            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                  <th className="px-3 py-2 text-left">Description</th>
                  <th className="px-3 py-2 text-center">Qty</th>
                  <th className="px-3 py-2 text-right">Price</th>
                  <th className="px-3 py-2 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map(item => (
                  <tr key={item.id}>
                    <td className="px-3 py-2 text-gray-800">{item.description}</td>
                    <td className="px-3 py-2 text-center text-gray-600">{item.quantity}</td>
                    <td className="px-3 py-2 text-right text-gray-600">{sym}{item.unitPrice.toLocaleString()}</td>
                    <td className="px-3 py-2 text-right font-semibold">{sym}{lineTotal(item).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end">
              <div className="w-56 space-y-1 text-sm">
                <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{sym}{totals.subtotal.toLocaleString()}</span></div>
                {(totals.discountTotal ?? 0) > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>−{sym}{(totals.discountTotal ?? 0).toLocaleString()}</span></div>}
                <div className="flex justify-between text-gray-500"><span>Tax</span><span>{sym}{totals.taxTotal.toLocaleString()}</span></div>
                <div className="flex justify-between font-extrabold text-gray-900 text-base border-t pt-1"><span>Total</span><span>{sym}{totals.grandTotal.toLocaleString()}</span></div>
              </div>
            </div>

            {notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600">
                <span className="font-semibold text-gray-700">Notes: </span>{notes}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={step === 1 ? onCancel : () => setStep(s => s - 1)}
          className="px-5 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:border-gray-400 hover:text-gray-800 hover:shadow-sm transition-all duration-150 active:scale-95">
          {step === 1 ? "Cancel" : "← Back"}
        </button>
        {step < 3 && (
          <button onClick={() => {
            if (step === 1 && !validate1()) return;
            if (step === 2 && !validate2()) return;
            setStep(s => s + 1);
          }}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all duration-150 active:scale-95">
            Continue →
          </button>
        )}
        {step === 3 && (
          <button onClick={handleGenerate}
            className="px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all duration-150 active:scale-95">
            ✓ Generate Invoice
          </button>
        )}
      </div>
    </div>
  );
}
