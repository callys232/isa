"use client";

export default function InvoiceEducation() {
    return (
        <section className="py-8 px-6 bg-blue-200 rounded-xl shadow-xl max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
                Learn About Invoices
            </h2>

            {/* Intro */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <p className="text-gray-800 mb-4">
                    An invoice is a formal document issued by a business to a client,
                    detailing products or services provided, their costs, and payment
                    terms. It serves as both a record and a request for payment.
                </p>
            </div>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        📑 Record Keeping
                    </h3>
                    <p className="text-sm text-gray-700">
                        Invoices provide a clear record of transactions, helping businesses
                        track sales, manage cash flow, and prepare for audits.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        💰 Payment Tracking
                    </h3>
                    <p className="text-sm text-gray-700">
                        They outline payment terms and due dates, making it easier to follow
                        up on pending or overdue payments.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        🌍 Professionalism
                    </h3>
                    <p className="text-sm text-gray-700">
                        A well‑structured invoice enhances credibility and builds trust with
                        clients by showing transparency and organization.
                    </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-lg font-semibold text-blue-900 mb-2">
                        📊 Business Insights
                    </h3>
                    <p className="text-sm text-gray-700">
                        Invoice data can be analyzed to understand revenue trends, client
                        behavior, and growth opportunities.
                    </p>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-800 mb-4">
                    Mastering invoices is essential for running a successful business.
                    They’re more than just bills — they’re tools for growth, accountability,
                    and financial health.
                </p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Explore Invoice Generator →
                </button>
            </div>
        </section>
    );
}
