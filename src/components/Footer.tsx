"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

export default function Footer() {
    const links = [
        { name: "Awareness", href: "/awareness", color: "after:bg-blue-400" },
        { name: "AI Assistant", href: "/ai-assistant", color: "after:bg-green-400" },
        { name: "Scheduling", href: "/scheduler", color: "after:bg-purple-400" },
        { name: "Invoice", href: "/invoices", color: "after:bg-orange-400" },
        { name: "Pricing", href: "/pricing", color: "after:bg-pink-400" },
        { name: "Contact", href: "/contact", color: "after:bg-yellow-400" },
    ];

    return (
        <footer className="bg-blue-900 text-white py-12 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Brand Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">ISA</h2>
                    <p className="text-gray-300">
                        Your Intelligent SaaS Assistant — empowering freelancers, businesses, and creators.
                    </p>
                </div>

                {/* Navigation Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className={`relative inline-block text-gray-300 hover:text-white transition-colors duration-300
                    after:content-[''] after:block after:h-[2px] after:w-0 after:transition-all after:duration-500 after:rounded-full ${link.color}
                    hover:after:w-full`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact & Socials */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Connect</h3>
                    <p className="text-gray-300 mb-4">Email: support@isa.com</p>
                    <div className="flex space-x-4">
                        <Link href="https://twitter.com" className="hover:text-blue-300"><FaTwitter size={24} /></Link>
                        <Link href="https://linkedin.com" className="hover:text-blue-300"><FaLinkedin size={24} /></Link>
                        <Link href="https://facebook.com" className="hover:text-blue-300"><FaFacebook size={24} /></Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-12 border-t border-blue-700 pt-6 text-center text-gray-400 text-sm">
                <p>© {new Date().getFullYear()} ISA. All rights reserved.</p>
                <div className="flex justify-center space-x-6 mt-2">
                    <Link href="/privacy" className="hover:text-blue-300">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-blue-300">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
