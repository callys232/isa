"use client";
import { useState } from "react";
import { Invoice, InvoiceItem, InvoiceTotals } from "@/src/types/invoice";
import { FaPlus, FaCheckCircle } from "react-icons/fa";

// Utility: calculate totals
const calcTotals = (items: InvoiceItem[]): InvoiceTotals => {
    const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
    const taxTotal = items.reduce(
        (sum, i) => sum + (i.quantity * i.unitPrice * i.tax) / 100,
        0
    );
    return {
        subtotal,
        taxTotal,
        grandTotal: subtotal + taxTotal,
        currency: "NGN",
    };
};

// Form for adding items
function ItemForm({ onAdd }: { onAdd: (item: InvoiceItem) => void }) {
    const [desc, setDesc] = useState("");
    const [qty, setQty] = useState(1);
    const [price, setPrice] = useState(0);
    const [tax, setTax] = useState(0);

    const addItem = () => {
        if (!desc.trim()) return;
        onAdd({
            id: Date.now(),
            description: desc,
            quantity: qty,
            unitPrice: price,
            tax,
        });
        setDesc("");
        setQty(1);
        setPrice(0);
        setTax(0);
    };

    return (
        <div className="grid md:grid-cols-4 gap-3 mb-4">
            <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Item Description"
                className="px-3 py-2 rounded-md border border-blue-300"
            />
            <input
                type="number"
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                placeholder="Qty"
                className="px-3 py-2 rounded-md border border-blue-300"
            />
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                placeholder="Unit Price"
                className="px-3 py-2 rounded-md border border-blue-300"
            />
            <input
                type="number"
                value={tax}
                onChange={(e) => setTax(Number(e.target.value))}
                placeholder="Tax %"
                className="px-3 py-2 rounded-md border border-blue-300"
            />
            <button
                onClick={addItem}
                className="md:col-span-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-2"
            >
                <FaPlus /> Add Item
            </button>
        </div>
    );
}

// Table for items
function InvoiceTable({ items }: { items: InvoiceItem[] }) {
    return (
        <table className="w-full bg-white rounded-lg shadow-md mb-6">
            <thead className="bg-blue-100 text-blue-900">
                <tr>
                    <th className="p-2 text-left">Description</th>
                    <th className="p-2">Qty</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Tax %</th>
                    <th className="p-2">Line Total</th>
                </tr>
            </thead>
            <tbody>
                {items.map((i) => (
                    <tr key={i.id} className="border-t">
                        <td className="p-2">{i.description}</td>
                        <td className="p-2 text-center">{i.quantity}</td>
                        <td className="p-2 text-center">₦{i.unitPrice}</td>
                        <td className="p-2 text-center">{i.tax}%</td>
                        <td className="p-2 text-center">
                            ₦{i.quantity * i.unitPrice + (i.quantity * i.unitPrice * i.tax) / 100}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

// List of invoices
function InvoiceList({ invoices, onMarkPaid }: { invoices: Invoice[]; onMarkPaid: (id: number) => void }) {
    return (
        <ul className="mt-6 space-y-4">
            {invoices.map((inv) => (
                <li
                    key={inv.id}
                    className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:shadow-lg transition"
                >
                    <div>
                        <p className="font-semibold text-gray-800">{inv.client}</p>
                        <p className="text-sm text-gray-600">Due: {inv.dueDate}</p>
                        <p className="text-sm text-blue-600">
                            Total: {inv.totals.currency} {inv.totals.grandTotal}
                        </p>
                        <span
                            className={`inline-block mt-2 px-2 py-1 text-xs rounded-md ${inv.status === "Paid"
                                ? "bg-green-100 text-green-700"
                                : inv.status === "Overdue"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                        >
                            {inv.status}
                        </span>
                    </div>
                    {inv.status === "Pending" && (
                        <button
                            onClick={() => onMarkPaid(inv.id)}
                            className="text-green-600 hover:text-green-800 transition"
                        >
                            <FaCheckCircle size={20} />
                        </button>
                    )}
                </li>
            ))}
        </ul>
    );
}

// Main component
export default function InvoiceGenerator() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [client, setClient] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [items, setItems] = useState<InvoiceItem[]>([]);

    const addItem = (item: InvoiceItem) => setItems([...items, item]);

    const createInvoice = () => {
        if (!client || !dueDate || items.length === 0) return;
        const totals = calcTotals(items);
        const newInvoice: Invoice = {
            id: Date.now(),
            client,
            items,
            dueDate,
            issueDate: new Date().toISOString(),
            status: "Pending",
            totals,
        };
        setInvoices([...invoices, newInvoice]);
        setClient("");
        setDueDate("");
        setItems([]);
    };

    const markPaid = (id: number) => {
        setInvoices(invoices.map((inv) => (inv.id === id ? { ...inv, status: "Paid" } : inv)));
    };

    return (
        <section className="py-8 px-6 bg-blue-200 rounded-xl shadow-xl max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                Invoice Generator & Tracker
            </h2>

            {/* Client & Due Date */}
            <div className="space-y-4 mb-6">
                <input
                    type="text"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder="Client Name"
                    className="w-full px-4
          py-2 rounded-md border border-blue-300"
                />
                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    placeholder="Due Date"
                    className="w-full px-4 py-2 rounded-md border border-blue-300"
                />
            </div>

            {/* Item Form */}
            <ItemForm onAdd={addItem} />

            {/* Items Table */}
            {items.length > 0 && <InvoiceTable items={items} />}

            {/* Create Invoice */}
            <button
                onClick={createInvoice}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
            >
                Generate Invoice
            </button>

            {/* Invoice List */}
            <InvoiceList invoices={invoices} onMarkPaid={markPaid} />
        </section>
    );
}
