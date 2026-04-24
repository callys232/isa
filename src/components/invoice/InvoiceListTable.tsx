"use client";

import { useState, useMemo } from "react";
import { Invoice, InvoiceStatus } from "@/src/types/invoice";

const CURRENCY_SYMBOLS: Record<string, string> = {
  NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "₵",
};

const STATUS_CONFIG: Record<InvoiceStatus, { bg: string; text: string; dot: string }> = {
  Pending: { bg: "bg-amber-100",  text: "text-amber-700",  dot: "bg-amber-400" },
  Paid:    { bg: "bg-green-100",  text: "text-green-700",  dot: "bg-green-500" },
  Overdue: { bg: "bg-red-100",    text: "text-red-700",    dot: "bg-red-500" },
  Draft:   { bg: "bg-gray-100",   text: "text-gray-600",   dot: "bg-gray-400" },
};

interface Props {
  invoices: Invoice[];
  onView: (inv: Invoice) => void;
  onMarkPaid: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function InvoiceListTable({ invoices, onView, onMarkPaid, onDelete }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<InvoiceStatus | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "amount" | "due">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [confirmDelete, setConfirmDelete] = useState<number | null>(null);

  const filtered = useMemo(() => {
    let list = [...invoices];
    if (statusFilter !== "All") list = list.filter(i => i.status === statusFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.client.toLowerCase().includes(q) ||
        String(i.id).includes(q)
      );
    }
    list.sort((a, b) => {
      let diff = 0;
      if (sortBy === "amount") diff = a.totals.grandTotal - b.totals.grandTotal;
      else if (sortBy === "due")  diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      else                        diff = new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime();
      return sortDir === "asc" ? diff : -diff;
    });
    return list;
  }, [invoices, search, statusFilter, sortBy, sortDir]);

  const toggleSort = (col: typeof sortBy) => {
    if (sortBy === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortBy(col); setSortDir("desc"); }
  };

  const SortIcon = ({ col }: { col: typeof sortBy }) =>
    sortBy === col ? <span className="ml-1 text-blue-500">{sortDir === "asc" ? "↑" : "↓"}</span> : null;

  if (invoices.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <div className="text-5xl mb-3">📄</div>
        <p className="font-semibold">No invoices yet</p>
        <p className="text-sm mt-1">Create your first invoice to get started.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by client or invoice ID..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(["All", "Pending", "Paid", "Overdue", "Draft"] as const).map(s => (
            <button key={s} onClick={() => setStatusFilter(s)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all
                ${statusFilter === s ? "bg-blue-600 text-white shadow-md" : "bg-white border border-gray-200 text-gray-600 hover:border-blue-300"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Desktop header */}
        <div className="hidden md:grid grid-cols-12 gap-2 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wide">
          <div className="col-span-1">#</div>
          <div className="col-span-3">Client</div>
          <div className="col-span-2 cursor-pointer hover:text-blue-600" onClick={() => toggleSort("date")}>
            Issued <SortIcon col="date" />
          </div>
          <div className="col-span-2 cursor-pointer hover:text-blue-600" onClick={() => toggleSort("due")}>
            Due <SortIcon col="due" />
          </div>
          <div className="col-span-2 cursor-pointer hover:text-blue-600 text-right" onClick={() => toggleSort("amount")}>
            Amount <SortIcon col="amount" />
          </div>
          <div className="col-span-1 text-center">Status</div>
          <div className="col-span-1 text-center">Actions</div>
        </div>

        {/* Rows */}
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-sm">No invoices match your filter.</div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filtered.map(inv => {
              const sym = CURRENCY_SYMBOLS[inv.totals.currency] ?? "₦";
              const sc  = STATUS_CONFIG[inv.status];
              const invNo = `ISA-${new Date(inv.issueDate).getFullYear()}-${String(inv.id).slice(-4)}`;
              const isOverdue = inv.status === "Pending" && new Date(inv.dueDate) < new Date();

              return (
                <div key={inv.id}
                  className="px-5 py-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center hover:bg-gray-50 transition-colors group">
                  {/* Mobile: stacked */}
                  <div className="md:hidden flex items-center justify-between">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{inv.client}</p>
                      <p className="text-xs text-gray-400">{invNo} · Due {inv.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-extrabold text-gray-900">{sym}{inv.totals.grandTotal.toLocaleString()}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                        {inv.status}
                      </span>
                    </div>
                  </div>

                  {/* Desktop: grid */}
                  <div className="hidden md:block col-span-1 text-xs text-gray-400 font-mono">{invNo.split("-").pop()}</div>
                  <div className="hidden md:block col-span-3">
                    <p className="font-semibold text-gray-800 text-sm truncate">{inv.client}</p>
                    {inv.clientEmail && <p className="text-xs text-gray-400 truncate">{inv.clientEmail}</p>}
                  </div>
                  <div className="hidden md:block col-span-2 text-sm text-gray-600">{inv.issueDate}</div>
                  <div className="hidden md:block col-span-2 text-sm">
                    <span className={isOverdue && inv.status !== "Paid" ? "text-red-600 font-semibold" : "text-gray-600"}>
                      {inv.dueDate}
                    </span>
                  </div>
                  <div className="hidden md:block col-span-2 text-right font-extrabold text-gray-800">
                    {sym}{inv.totals.grandTotal.toLocaleString()}
                  </div>
                  <div className="hidden md:flex col-span-1 justify-center">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`}></span>
                      {inv.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex md:justify-center gap-1.5 mt-2 md:mt-0 col-span-1">
                    <button onClick={() => onView(inv)} title="View"
                      className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center text-xs transition-all">
                      👁
                    </button>
                    {inv.status === "Pending" && (
                      <button onClick={() => onMarkPaid(inv.id)} title="Mark Paid"
                        className="w-7 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center text-xs transition-all">
                        ✓
                      </button>
                    )}
                    {confirmDelete === inv.id ? (
                      <button onClick={() => { onDelete(inv.id); setConfirmDelete(null); }}
                        className="px-2 h-7 rounded-lg bg-red-500 text-white text-[10px] font-bold hover:bg-red-600 transition-all">
                        Confirm
                      </button>
                    ) : (
                      <button onClick={() => setConfirmDelete(inv.id)} title="Delete"
                        className="w-7 h-7 rounded-lg bg-red-50 text-red-400 hover:bg-red-100 flex items-center justify-center text-xs transition-all opacity-0 group-hover:opacity-100">
                        🗑
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-right">
        Showing {filtered.length} of {invoices.length} invoice{invoices.length !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
