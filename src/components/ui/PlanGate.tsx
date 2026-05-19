"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePlan } from "@/src/context/UserContext";
import AnimatedBackground from "@/src/components/AnimatedBackground";
// Forms are in src/forms/ — redesign any form without touching this component

interface Props {
  require: "premium" | "admin";
  feature: string;
  description?: string;
  children: ReactNode;
}

const COPY = {
  premium: {
    badge:   "⭐ Premium Feature",
    heading: "Upgrade to Unlock",
    cta:     "View Premium Plans",
    href:    "/premuim",
    color:   "from-blue-600 to-indigo-700",
    ring:    "ring-blue-400",
  },
  admin: {
    badge:   "🔐 Admin Only",
    heading: "Admin Access Required",
    cta:     "Admin Login",
    href:    "/admin/login",
    color:   "from-gray-800 to-gray-900",
    ring:    "ring-gray-500",
  },
};

export default function PlanGate({ require, feature, description, children }: Props) {
  const { canAccess, plan } = usePlan();

  if (canAccess(require)) return <>{children}</>;

  const c = COPY[require];

  return (
    <div className="relative min-h-[60vh]">
      {/* Blurred preview of content beneath */}
      <div className="pointer-events-none select-none" style={{ filter: "blur(6px)", opacity: 0.35 }}>
        {children}
      </div>

      {/* Gate overlay */}
      <div className="absolute inset-0 flex items-center justify-center px-4 z-10">
        <div className={`relative w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ring-1 ${c.ring}`}
          style={{ animation: "popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)" }}>
          <style>{`@keyframes popIn{from{opacity:0;transform:scale(0.9)}to{opacity:1;transform:scale(1)}}`}</style>

          {/* Header */}
          <div className={`relative bg-gradient-to-br ${c.color} px-8 py-8 text-center overflow-hidden`}>
            <AnimatedBackground variant="blue" density="light" opacity={0.2} />
            <div className="relative z-10">
              <span className="inline-block text-xs font-extrabold bg-white/20 text-white px-3 py-1 rounded-full mb-4 border border-white/20">
                {c.badge}
              </span>
              <h2 className="text-2xl font-extrabold text-white mb-1">{c.heading}</h2>
              <p className="text-white/70 text-sm">
                <strong className="text-white">{feature}</strong> is not available on your current plan.
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="bg-white px-8 py-6 text-center">
            {description && (
              <p className="text-sm text-gray-600 mb-5 leading-relaxed">{description}</p>
            )}

            {/* What you get */}
            {require === "premium" && (
              <div className="space-y-2 text-left mb-6">
                {[
                  ["📅", "Farm Schedule — plan & track tasks"],
                  ["📄", "Invoice Manager — create & send invoices"],
                  ["🛒", "Post listings on the Agro Marketplace"],
                  ["🎬", "Upload and publish agro videos"],
                  ["📊", "Yield Predictor + Price Forecaster AI"],
                  ["🤖", "Unlimited AI queries across all agents"],
                ].map(([icon, text]) => (
                  <div key={text} className="flex items-center gap-2 text-sm text-gray-700">
                    <span>{icon}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <Link href={c.href}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm
                  hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 shadow-md transition-all active:scale-95">
                {c.cta} →
              </Link>
              {require === "premium" && plan === "free" && (
                <p className="text-xs text-gray-400">
                  Free plan includes: Dashboard, 2 AI agents (Plant Advisor + Pest Detector), and Onboarding Guide.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
