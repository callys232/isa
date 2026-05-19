"use client";

import { useRef } from "react";
import { Invoice } from "@/src/types/invoice";

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "₵",
};

function lineTotal(item: { quantity: number; unitPrice: number; tax: number; discount?: number }) {
  const base = item.quantity * item.unitPrice;
  const disc = (base * (item.discount ?? 0)) / 100;
  return base - disc + ((base - disc) * item.tax) / 100;
}

const STATUS_CONFIG = {
  Pending:  { bg: "bg-amber-100",  text: "text-amber-800",  label: "PENDING" },
  Paid:     { bg: "bg-green-100",  text: "text-green-800",  label: "PAID" },
  Overdue:  { bg: "bg-red-100",    text: "text-red-800",    label: "OVERDUE" },
  Draft:    { bg: "bg-gray-100",   text: "text-gray-700",   label: "DRAFT" },
};

interface Props {
  invoice: Invoice;
  onClose: () => void;
  onMarkPaid?: (id: number) => void;
}

export default function InvoicePreview({ invoice, onClose, onMarkPaid }: Props) {
  const printRef = useRef<HTMLDivElement>(null);
  const sym = CURRENCY_SYMBOLS[invoice.totals.currency] ?? "₦";
  const status = STATUS_CONFIG[invoice.status] ?? STATUS_CONFIG.Draft;

  const handlePrint = () => {
    const content = printRef.current?.innerHTML ?? "";
    const win = window.open("", "_blank", "width=900,height=700");
    if (!win) return;
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Invoice ${invoice.id}</title>
          <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; color: #111; background: #fff; padding: 40px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 10px 12px; text-align: left; font-size: 13px; }
            th { background: #f3f4f6; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: .05em; }
            td { border-bottom: 1px solid #f3f4f6; }
            .text-right { text-align: right; }
            .text-center { text-align: center; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);
    win.document.close();
    win.focus();
    setTimeout(() => { win.print(); win.close(); }, 300);
  };

  const invNo = invoice.auditTrail
    ? `ISA-${new Date(invoice.issueDate).getFullYear()}-${String(invoice.id).slice(-4)}`
    : `INV-${invoice.id}`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-start justify-center p-4 overflow-y-auto animate-[fadeIn_0.15s_ease]" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl my-8 animate-[popIn_0.2s_ease]" onClick={e => e.stopPropagation()}
        style={{ animation: 'popIn 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>

        {/* Modal controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <h2 className="font-extrabold text-gray-800">Invoice {invNo}</h2>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${status.bg} ${status.text}`}>
              {status.label}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {invoice.status === "Pending" && onMarkPaid && (
              <button onClick={() => { onMarkPaid(invoice.id); onClose(); }}
                className="px-4 py-2 bg-green-600 text-white text-xs font-bold rounded-xl hover:bg-green-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 active:scale-95 shadow-md">
                ✓ Mark Paid
              </button>
            )}
            <button onClick={handlePrint}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-150 active:scale-95 shadow-md">
              🖨 Print / PDF
            </button>
            <button onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 hover:bg-red-100 hover:text-red-500 flex items-center justify-center text-gray-500 transition-all duration-150 active:scale-90">
              ✕
            </button>
          </div>
        </div>

        {/* ── Printable invoice ── */}
        <div ref={printRef} className="p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-extrabold text-xl mb-2">
                ISA
              </div>
              <p className="font-extrabold text-gray-800 text-lg">ISA Platform</p>
              <p className="text-gray-500 text-xs">Intelligent SaaS Assistant</p>
              <p className="text-gray-500 text-xs">support@isa-platform.ng</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-1">INVOICE</h1>
              <p className="text-gray-600 text-sm font-semibold"># {invNo}</p>
              <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                <p>Issued: <span className="font-semibold text-gray-700">{invoice.issueDate}</span></p>
                <p>Due: <span className="font-semibold text-gray-700">{invoice.dueDate}</span></p>
              </div>
              <div className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${status.bg} ${status.text}`}>
                {status.label}
              </div>
            </div>
          </div>

          {/* Bill To / Amount Due */}
          <div className="grid grid-cols-2 gap-6 mb-8 p-4 bg-gray-50 rounded-2xl">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Bill To</p>
              <p className="font-extrabold text-gray-800 text-base">{invoice.client}</p>
              {invoice.clientEmail && <p className="text-gray-600 text-sm">{invoice.clientEmail}</p>}
              {invoice.clientAddress && <p className="text-gray-500 text-xs mt-1 leading-relaxed">{invoice.clientAddress}</p>}
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Amount Due</p>
              <p className="text-4xl font-extrabold text-blue-700">{sym}{invoice.totals.grandTotal.toLocaleString()}</p>
              <p className="text-gray-500 text-xs mt-1">{invoice.totals.currency}</p>
            </div>
          </div>

          {/* Line items */}
          <table className="w-full mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wide rounded-l-xl">Description</th>
                <th className="px-4 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wide">Qty</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wide">Unit Price</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wide">Tax</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wide rounded-r-xl">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={item.id} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-800 text-sm">{item.description}</td>
                  <td className="px-4 py-3 text-center text-gray-600 text-sm">{item.quantity}</td>
                  <td className="px-4 py-3 text-right text-gray-600 text-sm">{sym}{item.unitPrice.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center text-gray-500 text-xs">{item.tax}%</td>
                  <td className="px-4 py-3 text-right font-semibold text-gray-800 text-sm">{sym}{lineTotal(item).toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-6">
            <div className="w-64 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500 py-1 border-b border-gray-100">
                <span>Subtotal</span>
                <span className="font-medium">{sym}{invoice.totals.subtotal.toLocaleString()}</span>
              </div>
              {(invoice.totals.discountTotal ?? 0) > 0 && (
                <div className="flex justify-between text-green-600 py-1 border-b border-gray-100">
                  <span>Discount</span>
                  <span>−{sym}{(invoice.totals.discountTotal ?? 0).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-500 py-1 border-b border-gray-100">
                <span>Tax</span>
                <span>{sym}{invoice.totals.taxTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-extrabold text-gray-900 text-lg pt-1">
                <span>Total</span>
                <span className="text-blue-700">{sym}{invoice.totals.grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 hover:border-blue-300 hover:shadow-sm transition-all duration-150">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-1">Notes & Payment Terms</p>
              <p className="text-xs text-gray-600 leading-relaxed">{invoice.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
            <span>Generated by ISA Platform · isa-platform.ng</span>
            <span>Thank you for your business! 🙏</span>
          </div>
        </div>
      </div>
    </div>
  );
}
