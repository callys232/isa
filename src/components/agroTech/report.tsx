"use client";

import { FaSeedling, FaFlask, FaShieldAlt, FaHandsHelping, FaTractor, FaStar } from "react-icons/fa";
import Link from "next/link";
import { ReportProps } from "@/src/types/agrotypes";

export default function AgroTechReport({ region, requestType, recommendations }: ReportProps) {
    return (
        <section className="py-12 px-6 bg-gradient-to-b from-green-50 via-white to-blue-50">
            <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-8">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                    Recommendations for {region}
                </h2>
                <p className="text-gray-700 mb-8">Request type: {requestType}</p>

                {/* Three-column layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left: Images */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-green-700 flex items-center gap-2">
                            <FaSeedling /> Soil & Produce Images
                        </h3>
                        {recommendations.images && recommendations.images.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {recommendations.images.map((img, idx) => (
                                    <div key={idx} className="w-full h-28 rounded-md overflow-hidden border">
                                        <img
                                            src={img}
                                            alt={`Recommendation image ${idx + 1}`}
                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-sm">No images uploaded.</p>
                        )}
                    </div>

                    {/* Middle: Standard Recommendations */}
                    <div className="space-y-4">
                        {recommendations.crops && (
                            <div>
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <FaSeedling /> Best Crops
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {recommendations.crops.map((crop) => (
                                        <li key={crop}>{crop}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recommendations.fertilizers && (
                            <div>
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <FaFlask /> Fertilizers
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {recommendations.fertilizers.map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recommendations.diseases && (
                            <div>
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <FaShieldAlt /> Disease Treatment
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {recommendations.diseases.map((d) => (
                                        <li key={d}>{d}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recommendations.practices && (
                            <div>
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <FaHandsHelping /> Farm Practices
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {recommendations.practices.map((p) => (
                                        <li key={p}>{p}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {recommendations.machines && (
                            <div>
                                <h3 className="font-semibold text-green-700 flex items-center gap-2">
                                    <FaTractor /> Recommended Machines
                                </h3>
                                <ul className="list-disc list-inside text-gray-700">
                                    {recommendations.machines.map((m) => (
                                        <li key={m}>{m}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Right: Advanced Recommendations (Premium) */}
                    <div className="space-y-4 border-l pl-4">
                        <h3 className="font-semibold text-blue-700 flex items-center gap-2">
                            <FaStar /> Advanced Insights (Premium)
                        </h3>
                        {recommendations.advanced && recommendations.advanced.length > 0 ? (
                            <ul className="list-disc list-inside text-gray-700">
                                {recommendations.advanced.map((adv, idx) => (
                                    <li key={idx}>{adv}</li>
                                ))}
                            </ul>
                        ) : (
                            <div className="text-center">
                                <p className="text-gray-500 text-sm mb-4">
                                    Upgrade to Premium to unlock advanced recommendations.
                                </p>
                                <Link
                                    href="/premium"
                                    className="inline-block px-6 py-2 rounded-md bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 transition-all"
                                >
                                    Go Premium →
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 mt-8 justify-center">
                    <button
                        onClick={() => window.print()}
                        className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Print Report
                    </button>
                    <button
                        onClick={() => alert("Download feature to be integrated")}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Download PDF
                    </button>
                </div>
            </div>
        </section>
    );
}
