"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "Home",        href: "/" },
        { name: "Awareness",   href: "/awareness" },
        { name: "Marketplace", href: "/marketplace" },
        { name: "Dashboard",   href: "/dashboard" },
        { name: "AI Hub",      href: "/aiassistant" },
        { name: "Schedule",    href: "/schedule" },
        { name: "Invoice",     href: "/invoice" },
        { name: "Pricing",     href: "/premuim" },
    ];

    return (
        <nav className="w-full bg-white shadow-md fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2 cursor-pointer">
                            <Image src="/isa.png" alt="ISA Logo" width={40} height={40} className="transition-transform duration-300 hover:scale-110" /></Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 whitespace-nowrap
                    ${isActive
                                            ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-200"
                                            : "text-blue-600 hover:bg-blue-50 hover:text-blue-800 hover:shadow-sm"}
                  `}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Auth Buttons (Desktop) */}
                    <div className="hidden md:flex space-x-4">
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300"
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300"
                        >
                            Sign up
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-blue-600 focus:outline-none text-2xl"
                        >
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu with Slide Animation */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out 
          ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}
        `}
            >
                <div className="bg-white shadow-lg px-4 pt-2 pb-4 space-y-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300
                  ${isActive
                                        ? "bg-blue-600 text-white shadow-md"
                                        : "text-blue-600 hover:bg-blue-100 hover:text-blue-800"}
                `}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <div className="flex flex-col space-y-2 mt-2">
                        <Link
                            href="/login"
                            className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-300 text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Log in
                        </Link>
                        <Link
                            href="/signup"
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 text-center"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
