// @ts-nocheck
"use client";
import InvoiceGenerator from "@/src/components/Invoice";
import PlanGate from "@/src/components/ui/PlanGate";

export default function InvoicePage() {
    return (
        <PlanGate
            require="premium"
            feature="Invoice Manager"
            description="Create, send, and track professional invoices with multi-currency support, tax & discount calculation, and PDF export. Available on Premium and Admin plans."
        >
            <InvoiceGenerator />
        </PlanGate>
    );
}
