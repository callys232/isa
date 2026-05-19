"use client";

import { useState, useMemo } from "react";
import { Invoice, InvoiceItem, InvoiceTotals } from "@/src/types/invoice";
import InvoiceBuilder from "@/src/components/invoice/InvoiceBuilder";
import InvoicePreview from "@/src/components/invoice/InvoicePreview";
import InvoiceListTable from "@/src/components/invoice/InvoiceListTable";

// ── Utilities ─────────────────────────────────────────────────────
const CURRENCY_SYMBOLS: Record<string, string> = {
    NGN: "₦", USD: "$", EUR: "€", GBP: "£", GHS: "₵",
};

function calcTotals(items: InvoiceItem[], currency = "NGN"): InvoiceTotals {
    const subtotal = items.reduce((sum, i) => {
        const base = i.quantity * i.unitPrice;
        return sum + base - (base * (i.discount ?? 0)) / 100;
    }, 0);
    const taxTotal = items.reduce((sum, i) => {
        const base = i.quantity * i.unitPrice;
        const after = base - (base * (i.discount ?? 0)) / 100;
        return sum + (after * i.tax) / 100;
    }, 0);
    const discountTotal = items.reduce((sum, i) =>
        sum + (i.quantity * i.unitPrice * (i.discount ?? 0)) / 100, 0
    );
    return { subtotal, taxTotal, discountTotal, grandTotal: subtotal + taxTotal, currency };
}

// ── Seed data ─────────────────────────────────────────────────────
const SEED: Invoice[] = [
    {
        id: 10001, client: "Green Valley Farms Ltd", clientEmail: "accounts@greenvalley.ng",
        clientAddress: "Plot 12, Agro Complex, Ibadan, Oyo",
        issueDate: "2026-04-01", dueDate: "2026-05-01", status: "Paid",
        items: [
            { id: 1, description: "Agro-Tech Dashboard (3-month subscription)", quantity: 1, unitPrice: 60000, tax: 7.5, discount: 0 },
            { id: 2, description: "IoT Sensor Installation – Field 1", quantity: 3, unitPrice: 45000, tax: 7.5, discount: 0 },
        ],
        totals: calcTotals([
            { id: 1, description: "", quantity: 1, unitPrice: 60000, tax: 7.5 },
            { id: 2, description: "", quantity: 3, unitPrice: 45000, tax: 7.5 },
        ]),
        notes: "Thank you for your business!",
        auditTrail: { createdAt: "2026-04-01T09:00:00Z", paidAt: "2026-04-10T14:00:00Z" },
    },
    {
        id: 10002, client: "Sunrise Agro Cooperative", clientEmail: "info@sunriseagro.ng",
        clientAddress: "23 Farm Road, Kaduna South",
        issueDate: "2026-04-10", dueDate: "2026-05-10", status: "Pending",
        items: [
            { id: 1, description: "AI Advisory Engine – Pro Plan (monthly)", quantity: 1, unitPrice: 20000, tax: 7.5 },
            { id: 2, description: "Marketplace Seller Verification Fee", quantity: 1, unitPrice: 5000, tax: 0 },
            { id: 3, description: "Farmer Onboarding Consultation (2hrs)", quantity: 2, unitPrice: 15000, tax: 0 },
        ],
        totals: calcTotals([
            { id: 1, description: "", quantity: 1, unitPrice: 20000, tax: 7.5 },
            { id: 2, description: "", quantity: 1, unitPrice: 5000, tax: 0 },
            { id: 3, description: "", quantity: 2, unitPrice: 15000, tax: 0 },
        ]),
        notes: "Payment via bank transfer to ISA Account: 0123456789, Zenith Bank.",
        auditTrail: { createdAt: "2026-04-10T10:00:00Z" },
    },
    {
        id: 10003, client: "Riverbend Rice Mills", clientEmail: "finance@riverbend.com.ng",
        clientAddress: "Makurdi Industrial Layout, Benue State",
        issueDate: "2026-03-01", dueDate: "2026-03-31", status: "Overdue",
        items: [
            { id: 1, description: "API Access – Pro Tier (March)", quantity: 1, unitPrice: 20000, tax: 7.5 },
            { id: 2, description: "Custom Data Report – Rice Market Q1 2026", quantity: 1, unitPrice: 85000, tax: 7.5, discount: 10 },
        ],
        totals: calcTotals([
            { id: 1, description: "", quantity: 1, unitPrice: 20000, tax: 7.5 },
            { id: 2, description: "", quantity: 1, unitPrice: 85000, tax: 7.5, discount: 10 },
        ]),
        notes: "Please note 10% late fee will apply. Contact accounts@isa-platform.ng to resolve.",
        auditTrail: { createdAt: "2026-03-01T08:00:00Z" },
    },
    {
        id: 10004, client: "FarmConnect NGO", clientEmail: "grants@farmconnect.org",
        issueDate: "2026-04-15", dueDate: "2026-06-15", status: "Pending",
        items: [
            { id: 1, description: "ISA Platform – NGO License (6 months)", quantity: 1, unitPrice: 300000, tax: 0, discount: 15 },
            { id: 2, description: "Field Agent Training Workshops (10 sessions)", quantity: 10, unitPrice: 8000, tax: 0 },
        ],
        totals: calcTotals([
            { id: 1, description: "", quantity: 1, unitPrice: 300000, tax: 0, discount: 15 },
            { id: 2, description: "", quantity: 10, unitPrice: 8000, tax: 0 },
        ]),
        notes: "Payment in line with NGO procurement procedures. PO reference: FC-2026-117.",
        auditTrail: { createdAt: "2026-04-15T11:00:00Z" },
    },
    {
        id: 10005, client: "Lagos Agro Distributors Ltd", clientEmail: "procurement@lagrosagro.com",
        issueDate: "2026-04-20", dueDate: "2026-05-20", status: "Draft",
        items: [
            { id: 1, description: "Marketplace Premium Listing (3 months)", quantity: 3, unitPrice: 8000, tax: 7.5 },
        ],
        totals: calcTotals([{ id: 1, description: "", quantity: 3, unitPrice: 8000, tax: 7.5 }]),
        auditTrail: { createdAt: "2026-04-20T15:00:00Z" },
    },
];

// ── Stat Card ─────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color }: {
    label: string; value: string; sub?: string; icon: string; color: string;
}) {
    return (
        <div className={`rounded-2xl p-5 border shadow-sm cursor-default transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-blue-200 group ${color}`}>
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{label}</p>
                    <p className="text-2xl font-extrabold text-gray-800 transition-colors duration-200 group-hover:text-blue-700">{value}</p>
                    {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
                </div>
                <span className="text-2xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">{icon}</span>
            </div>
        </div>
    );
}

// ── Recent activity row ───────────────────────────────────────────
function RecentRow({ inv, onView }: { inv: Invoice; onView: () => void }) {
    const statusColor: Record<string, string> = {
        Paid: "bg-green-100 text-green-700",
        Pending: "bg-amber-100 text-amber-700",
        Overdue: "bg-red-100 text-red-700",
        Draft: "bg-gray-100 text-gray-600",
    };
    const sym = CURRENCY_SYMBOLS[inv.totals.currency] ?? "₦";
    return (
        <div onClick={onView}
            className="flex items-center justify-between px-4 py-3 hover:bg-blue-50/40 cursor-pointer rounded-xl transition-all duration-150 group hover:shadow-sm hover:border hover:border-blue-100 border border-transparent active:scale-[0.98]">
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-base font-extrabold text-blue-600 shrink-0 transition-transform duration-200 group-hover:scale-110">
                    {inv.client.charAt(0)}
                </div>
                <div>
                    <p className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{inv.client}</p>
                    <p className="text-xs text-gray-400">Due {inv.dueDate}</p>
                </div>
            </div>
            <div className="text-right flex flex-col items-end gap-1">
                <p className="font-extrabold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">{sym}{inv.totals.grandTotal.toLocaleString()}</p>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-transform duration-150 group-hover:scale-105 ${statusColor[inv.status]}`}>{inv.status}</span>
            </div>
        </div>
    );
}

// ── Main Component ─────────────────────────────────────────────────
type Tab = "overview" | "invoices" | "new";

export default function InvoiceGenerator() {
    const [invoices, setInvoices] = useState<Invoice[]>(SEED);
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [preview, setPreview] = useState<Invoice | null>(null);

    const stats = useMemo(() => {
        const total = invoices.reduce((s, i) => s + i.totals.grandTotal, 0);
        const paid = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.totals.grandTotal, 0);
        const pending = invoices.filter(i => i.status === "Pending").reduce((s, i) => s + i.totals.grandTotal, 0);
        const overdue = invoices.filter(i => i.status === "Overdue");
        return { total, paid, pending, overdue };
    }, [invoices]);

    const pastClients = useMemo(() => [...new Set(invoices.map(i => i.client))], [invoices]);

    const markPaid = (id: number) =>
        setInvoices(prev => prev.map(i => i.id === id ? { ...i, status: "Paid", auditTrail: { ...i.auditTrail, createdAt: i.auditTrail?.createdAt ?? "", paidAt: new Date().toISOString() } } : i));

    const deleteInvoice = (id: number) => setInvoices(prev => prev.filter(i => i.id !== id));

    const saveInvoice = (inv: Invoice) => {
        setInvoices(prev => [inv, ...prev]);
        setActiveTab("invoices");
    };

    const tabs: { id: Tab; label: string; icon: string }[] = [
        { id: "overview", label: "Overview", icon: "📊" },
        { id: "invoices", label: `All Invoices (${invoices.length})`, icon: "📄" },
        { id: "new", label: "New Invoice", icon: "✚" },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Page header */}
            <div className="bg-white border-b border-gray-200 sticky top-16 z-30">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex items-center justify-between py-4">
                        <div>
                            <h1 className="text-xl font-extrabold text-gray-800">Invoices</h1>
                            <p className="text-xs text-gray-500 mt-0.5">Create, track, and manage all your invoices</p>
                        </div>
                        <button onClick={() => setActiveTab("new")}
                            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all duration-150 active:scale-95 flex items-center gap-2">
                            <span className="text-lg leading-none">+</span> New Invoice
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 overflow-x-auto pb-px">
                        {tabs.map(t => (
                            <button key={t.id} onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold border-b-2 whitespace-nowrap transition-all duration-150 active:scale-95
                  ${activeTab === t.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}>
                                <span className={`transition-transform duration-150 ${activeTab === t.id ? "scale-110" : ""}`}>{t.icon}</span>{t.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">

                {/* ── Overview ── */}
                {activeTab === "overview" && (
                    <div className="space-y-6">
                        {/* Stat cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard label="Total Invoiced" value={`₦${stats.total.toLocaleString()}`}
                                sub={`${invoices.length} invoices`} icon="💰" color="bg-white border-gray-200" />
                            <StatCard label="Paid" value={`₦${stats.paid.toLocaleString()}`}
                                sub={`${invoices.filter(i => i.status === "Paid").length} invoices`} icon="✅" color="bg-green-50 border-green-200" />
                            <StatCard label="Outstanding" value={`₦${stats.pending.toLocaleString()}`}
                                sub={`${invoices.filter(i => i.status === "Pending").length} pending`} icon="⏳" color="bg-amber-50 border-amber-200" />
                            <StatCard label="Overdue" value={`₦${stats.overdue.reduce((s, i) => s + i.totals.grandTotal, 0).toLocaleString()}`}
                                sub={`${stats.overdue.length} invoice${stats.overdue.length !== 1 ? "s" : ""}`} icon="🔴" color="bg-red-50 border-red-200" />
                        </div>

                        {/* Revenue bar */}
                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-bold text-gray-800">Revenue Breakdown</h3>
                                <span className="text-xs text-gray-400">₦ NGN</span>
                            </div>
                            <div className="flex h-4 rounded-full overflow-hidden gap-0.5">
                                {stats.total > 0 && (
                                    <>
                                        <div className="bg-green-500 transition-all" style={{ width: `${(stats.paid / stats.total) * 100}%` }} title="Paid" />
                                        <div className="bg-amber-400 transition-all" style={{ width: `${(stats.pending / stats.total) * 100}%` }} title="Pending" />
                                        <div className="bg-red-400 transition-all" style={{ width: `${(stats.overdue.reduce((s, i) => s + i.totals.grandTotal, 0) / stats.total) * 100}%` }} title="Overdue" />
                                    </>
                                )}
                            </div>
                            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                                {[["bg-green-500", "Paid"], ["bg-amber-400", "Pending"], ["bg-red-400", "Overdue"]].map(([color, label]) => (
                                    <span key={label as string} className="flex items-center gap-1.5">
                                        <span className={`w-2.5 h-2.5 rounded-full ${color}`}></span>{label}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Two-column: recent + action needed */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent invoices */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-100">
                                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">Recent Invoices</h3>
                                    <button onClick={() => setActiveTab("invoices")} className="text-xs text-blue-600 hover:underline hover:text-blue-700 transition-colors font-semibold">View all →</button>
                                </div>
                                <div className="p-2">
                                    {invoices.slice(0, 5).map(inv => (
                                        <RecentRow key={inv.id} inv={inv} onView={() => setPreview(inv)} />
                                    ))}
                                </div>
                            </div>

                            {/* Action needed */}
                            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md hover:border-amber-100">
                                <div className="px-5 py-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-800">Action Needed</h3>
                                </div>
                                <div className="p-4 space-y-3">
                                    {stats.overdue.length > 0 && (
                                        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                            <p className="text-sm font-bold text-red-800 mb-1">🔴 {stats.overdue.length} Overdue Invoice{stats.overdue.length !== 1 ? "s" : ""}</p>
                                            {stats.overdue.map(inv => (
                                                <p key={inv.id} className="text-xs text-red-600 cursor-pointer hover:underline" onClick={() => setPreview(inv)}>
                                                    {inv.client} — ₦{inv.totals.grandTotal.toLocaleString()}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                    {invoices.filter(i => i.status === "Draft").length > 0 && (
                                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                            <p className="text-sm font-bold text-gray-700 mb-1">📝 {invoices.filter(i => i.status === "Draft").length} Draft Invoice{invoices.filter(i => i.status === "Draft").length !== 1 ? "s" : ""}</p>
                                            <p className="text-xs text-gray-500">Draft invoices haven't been sent yet. Review and update their status.</p>
                                        </div>
                                    )}
                                    {stats.overdue.length === 0 && invoices.filter(i => i.status === "Draft").length === 0 && (
                                        <div className="text-center py-8 text-gray-400">
                                            <div className="text-3xl mb-2">✅</div>
                                            <p className="text-sm">All caught up! No action needed.</p>
                                        </div>
                                    )}
                                    <button onClick={() => setActiveTab("new")}
                                        className="w-full py-3 border-2 border-dashed border-blue-300 rounded-xl text-blue-600 text-sm font-semibold hover:bg-blue-50 hover:border-blue-400 hover:shadow-sm transition-all duration-150 active:scale-[0.98]">
                                        + Create a New Invoice
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── All Invoices ── */}
                {activeTab === "invoices" && (
                    <InvoiceListTable
                        invoices={invoices}
                        onView={setPreview}
                        onMarkPaid={markPaid}
                        onDelete={deleteInvoice}
                    />
                )}

                {/* ── New Invoice ── */}
                {activeTab === "new" && (
                    <InvoiceBuilder
                        onSave={saveInvoice}
                        onCancel={() => setActiveTab("overview")}
                        existingCount={invoices.length}
                        pastClients={pastClients}
                    />
                )}
            </div>

            {/* Preview Modal */}
            {preview && (
                <InvoicePreview
                    invoice={preview}
                    onClose={() => setPreview(null)}
                    onMarkPaid={id => { markPaid(id); setPreview(null); }}
                />
            )}
        </div>
    );
}
