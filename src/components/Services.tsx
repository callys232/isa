"use client";

import Link from "next/link";
import { FaLightbulb, FaSeedling, FaCalendarAlt, FaFileInvoice, FaStore, FaMicrochip, FaRobot, FaCode } from "react-icons/fa";

const primaryServices = [
    {
        name: "Marketplace",
        description: "Buy and sell crops, livestock, seeds, fertilizer, and farm equipment nationwide. Escrow-protected payments, verified sellers, and nationwide logistics.",
        href: "/marketplace",
        icon: <FaStore size={28} className="text-green-600" />,
        badge: "New",
        badgeColor: "bg-green-100 text-green-700",
        gradient: "from-green-50 to-emerald-50",
        borderColor: "border-green-200",
    },
    {
        name: "Farm Dashboard",
        description: "Real-time IoT sensor data — soil moisture, temperature, pH, humidity. Smart weather forecasts and automated crop health alerts for your farm.",
        href: "/dashboard",
        icon: <FaMicrochip size={28} className="text-blue-600" />,
        badge: "Live",
        badgeColor: "bg-blue-100 text-blue-700",
        gradient: "from-blue-50 to-sky-50",
        borderColor: "border-blue-200",
    },
    {
        name: "AI Advisor",
        description: "AI-powered planting recommendations, pest & disease detection via photo, yield modeling, and price forecasting to maximize your farm profit.",
        href: "/ai-advisor",
        icon: <FaRobot size={28} className="text-purple-600" />,
        badge: "AI",
        badgeColor: "bg-purple-100 text-purple-700",
        gradient: "from-purple-50 to-violet-50",
        borderColor: "border-purple-200",
    },
    {
        name: "Developer API",
        description: "REST API for agri-startups, banks, insurers, and NGOs. Access weather, soil health, market prices, and AI endpoints. Free tier available.",
        href: "/developers",
        icon: <FaCode size={28} className="text-gray-700" />,
        badge: "API",
        badgeColor: "bg-gray-100 text-gray-700",
        gradient: "from-gray-50 to-slate-50",
        borderColor: "border-gray-200",
    },
];

const secondaryServices = [
    { name: "Awareness", description: "Stay informed with agriculture, investing, and lifestyle insights.", href: "/awareness", icon: <FaLightbulb size={20} className="text-amber-500" /> },
    { name: "Agro-Tech", description: "Partner farms, produce listings, and agricultural video resources.", href: "/agro", icon: <FaSeedling size={20} className="text-green-600" /> },
    { name: "Scheduling", description: "Plan and automate social media posts across multiple platforms.", href: "/scheduler", icon: <FaCalendarAlt size={20} className="text-purple-600" /> },
    { name: "Invoice", description: "Create, send, and track invoices with integrated payment solutions.", href: "/invoice", icon: <FaFileInvoice size={20} className="text-indigo-600" /> },
];

export default function Services() {
    return (
        <section
            id="services-section"
            aria-label="ISA Services"
            className="relative py-20 px-6 bg-gradient-to-b from-white via-gray-50 to-green-50"
        >
            <div className="max-w-6xl mx-auto text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-4 py-1.5 rounded-full mb-4">
                    🌾 Nigeria's Most Complete Agri-Tech Platform
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Everything Your Farm Needs
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    From buying seeds to selling your harvest — ISA covers the full agricultural value chain with technology built for Nigerian farmers.
                </p>
            </div>

            {/* Primary Platform Features */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {primaryServices.map((service) => (
                    <Link key={service.name} href={service.href}
                        className={`group bg-gradient-to-br ${service.gradient} rounded-2xl border-2 ${service.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                        <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center">
                                {service.icon}
                            </div>
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${service.badgeColor}`}>{service.badge}</span>
                        </div>
                        <h3 className="text-xl font-extrabold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{service.name}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{service.description}</p>
                        <span className="text-green-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                            Explore {service.name} →
                        </span>
                    </Link>
                ))}
            </div>

            {/* Secondary Services */}
            <div className="max-w-6xl mx-auto">
                <p className="text-center text-gray-500 text-sm font-semibold uppercase tracking-wide mb-4">More Tools</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {secondaryServices.map((service) => (
                        <Link key={service.name} href={service.href}
                            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:border-green-300 transition-all group">
                            <div className="flex items-center gap-2 mb-2">
                                {service.icon}
                                <h4 className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">{service.name}</h4>
                            </div>
                            <p className="text-gray-500 text-xs leading-relaxed">{service.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
