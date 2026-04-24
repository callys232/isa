// app/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import FloatingAdvisor from "@/src/components/advisor/FloatingAdvisor";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    // ✅ Ensure pathname is always a string
    const pathname = usePathname() ?? "";

    // ✅ Hide layout elements on these routes (and their sub‑routes)
    const noLayoutRoutes = ["/signin", "/signup", "/admin"];
    const hideLayout = noLayoutRoutes.some((path) => pathname.startsWith(path));

    return (
        <div className="min-h-screen w-screen bg-[#0c0000] text-white overflow-x-hidden flex flex-col transition-colors duration-300">
            {/* Navbar */}
            {!hideLayout && <Navbar />}

            {/* Main Content */}
            <main
                role="main"
                className={`flex-1 w-full overflow-y-auto ${!hideLayout ? "pt-20" : ""
                    }`}
            >
                {children}
            </main>

            {/* Footer */}
            {!hideLayout && <Footer />}

            {/* Floating AI Advisor — visible on all pages */}
            {!hideLayout && <FloatingAdvisor />}
        </div>
    );
}
