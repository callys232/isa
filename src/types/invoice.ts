/**
 * Invoice item type
 * Represents a single line item in an invoice
 */
export interface InvoiceItem {
    id: number;
    description: string;
    quantity: number;
    unitPrice: number;
    tax: number; // percentage
    discount?: number; // optional discount per item
}

/**
 * Totals type
 * Used for calculated totals in tables and dashboards
 */
export interface InvoiceTotals {
    subtotal: number;
    taxTotal: number;
    discountTotal?: number;
    grandTotal: number;
    currency: string; // e.g., "NGN", "USD", "EUR"
}

/**
 * Invoice status options
 */
export type InvoiceStatus = "Pending" | "Paid" | "Overdue" | "Draft";

/**
 * Recurrence rules for premium/advanced invoices
 */
export interface InvoiceRecurrence {
    frequency: "Daily" | "Weekly" | "Monthly" | "Yearly";
    interval?: number; // every X days/weeks/months
    until?: string; // ISO date string
    count?: number; // number of occurrences
}

/**
 * Branding options for premium invoices
 */
export interface InvoiceBranding {
    logoUrl?: string;
    accentColor?: string;
    footerNote?: string;
    templateStyle?: "Classic" | "Modern" | "Minimal";
}

/**
 * Invoice type
 * Represents a full invoice with client info and items
 */
export interface Invoice {
    id: number;
    client: string;
    clientEmail?: string;
    clientAddress?: string;
    items: InvoiceItem[];
    dueDate: string;
    issueDate: string;
    status: InvoiceStatus;
    totals: InvoiceTotals;
    recurrence?: InvoiceRecurrence; // premium feature
    branding?: InvoiceBranding;     // premium feature
    notes?: string;                 // optional notes
    paymentLink?: string;           // integration with gateways
    auditTrail?: {                  // advanced tracking
        createdAt: string;
        updatedAt?: string;
        paidAt?: string;
    };
}
