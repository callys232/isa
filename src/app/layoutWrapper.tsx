// app/LayoutWrapper.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/src/components/Navbar";
import Footer from "@/src/components/Footer";
import FloatingAdvisor from "@/src/components/advisor/FloatingAdvisor";
import AnimatedBackground from "@/src/components/AnimatedBackground";
import { UserProvider } from "@/src/context/UserContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname() ?? "";

    const noLayoutRoutes = ["/signin", "/login", "/signup", "/admin"];
    const hideLayout = noLayoutRoutes.some((path) => pathname.startsWith(path));

    return (
        <UserProvider>
            <div className="relative min-h-screen w-screen bg-[#0c0000] text-white overflow-x-hidden flex flex-col transition-colors duration-300">

                {/* Global particle network — fixed behind all pages */}
                <AnimatedBackground variant="blue" density="medium" speed="slow" opacity={0.13} fixed />

                {/* Navbar */}
                {!hideLayout && <Navbar />}

                {/* Main Content */}
                <main
                    role="main"
                    className={`flex-1 w-full overflow-y-auto ${!hideLayout ? "pt-20" : ""}`}
                >
                    {children}
                </main>

                {/* Footer */}
                {!hideLayout && <Footer />}

                {/* Floating AI Advisor — visible on all pages */}
                {!hideLayout && <FloatingAdvisor />}

            </div>
        </UserProvider>
    );
}
