"use client";

import { FaStar, FaSeedling, FaChartLine, FaCloudSun, FaTractor } from "react-icons/fa";
import Link from "next/link";

export default function PremiumPage() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-green-50 py-16 px-6">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                    Unlock Premium Insights
                </h1>
                <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
                    Upgrade to Premium and access advanced recommendations, yield projections, climate risk analysis, and exclusive farm management tools.
                </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* Free Plan */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Free Plan</h2>
                    <p className="text-gray-600 mb-6">Basic recommendations for crops, fertilizers, and farm practices.</p>
                    <ul className="text-gray-700 space-y-2 mb-6">
                        <li className="flex items-center gap-2"><FaSeedling /> Crop suggestions</li>
                        <li className="flex items-center gap-2"><FaTractor /> Basic machine recommendations</li>
                    </ul>
                    <button className="w-full px-6 py-2 rounded-md bg-gray-300 text-gray-700 font-semibold cursor-not-allowed">
                        Current Plan
                    </button>
                </div>

                {/* Premium Plan */}
                <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-blue-500 transform scale-105">
                    <h2 className="text-2xl font-bold text-blue-600 mb-4">Premium Plan</h2>
                    <p className="text-gray-600 mb-6">Advanced insights for professional farmers and agribusinesses.</p>
                    <ul className="text-gray-700 space-y-2 mb-6">
                        <li className="flex items-center gap-2"><FaChartLine /> Yield projections</li>
                        <li className="flex items-center gap-2"><FaCloudSun /> Climate risk alerts</li>
                        <li className="flex items-center gap-2"><FaStar /> Advanced disease treatment</li>
                        <li className="flex items-center gap-2"><FaTractor /> Smart machinery recommendations</li>
                    </ul>
                    <Link
                        href="/checkout"
                        className="block w-full px-6 py-3 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all"
                    >
                        Subscribe Now →
                    </Link>
                </div>

                {/* Enterprise Plan */}
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                    <h2 className="text-2xl font-bold text-green-600 mb-4">Enterprise Plan</h2>
                    <p className="text-gray-600 mb-6">Tailored solutions for cooperatives, distributors, and large farms.</p>
                    <ul className="text-gray-700 space-y-2 mb-6">
                        <li className="flex items-center gap-2"><FaStar /> Custom analytics dashboard</li>
                        <li className="flex items-center gap-2"><FaCloudSun /> Regional climate forecasting</li>
                        <li className="flex items-center gap-2"><FaTractor /> Machinery leasing options</li>
                    </ul>
                    <Link
                        href="/contact"
                        className="block w-full px-6 py-3 rounded-md bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all"
                    >
                        Contact Sales →
                    </Link>
                </div>
            </div>
        </section>
    );
}
