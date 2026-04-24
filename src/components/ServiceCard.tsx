"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ServiceCardProps {
    name: string;
    description: string;
    href: string;
    icon?: ReactNode;
}

export default function ServiceCard({ name, description, href, icon }: ServiceCardProps) {
    return (
        <div className="relative group">
            {/* Tooltip Popup */}
            <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 
                   bg-blue-600 text-white text-sm px-3 py-1 rounded-md shadow-md 
                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
            >
                Explore this service
            </div>

            <Link
                href={href}
                aria-label={`Learn more about ${name}`}
                className="relative rounded-xl bg-white border border-gray-200 shadow-md p-8 
                   flex flex-col items-start transition-all duration-500 
                   hover:bg-blue-50 hover:border-blue-500 hover:shadow-blue-200 hover:shadow-xl hover:scale-105"
            >
                {/* Icon */}
                {icon && (
                    <div className="mb-4 text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
                        {icon}
                    </div>
                )}

                {/* Title with gradient */}
                <h3
                    className="text-2xl font-bold mb-3 
                     bg-gradient-to-r from-blue-500 to-white bg-clip-text text-transparent"
                >
                    {name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>

                {/* CTA */}
                <span
                    className="inline-block px-5 py-2 rounded-md bg-blue-100 text-blue-600 font-medium shadow-md 
                     transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white 
                     border group-hover:border-blue-600"
                >
                    Learn More →
                </span>
            </Link>
        </div>
    );
}
