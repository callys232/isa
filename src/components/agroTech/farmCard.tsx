"use client";

import { useState } from "react";
import Image from "next/image";
import { Farm } from "@/src/types/agrotypes";

export default function FarmCard({
    name,
    location,
    description,
    produce,
    images,
    googleLink,
}: Farm) {
    const [isOpen, setIsOpen] = useState(false);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [showContact, setShowContact] = useState(false);

    const openModal = (img: string) => {
        setActiveImage(img);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setActiveImage(null);
    };

    return (
        <div
            className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden 
                 hover:shadow-xl hover:border-green-400 transition-all duration-300 
                 transform hover:scale-[1.02]"
        >
            {/* Farm Header */}
            <div className="px-4 py-3 border-b border-gray-100">
                <h3 className="text-lg font-bold text-green-700">{name}</h3>
                <p className="text-xs text-gray-500">{location}</p>
            </div>

            {/* Main Image */}
            {images[0] && (
                <div
                    className="relative w-full h-40 cursor-pointer"
                    onClick={() => openModal(images[0])}
                >
                    <Image
                        src={images[0]}
                        alt={`${name} main produce`}
                        fill
                        className="object-cover"
                    />
                </div>
            )}

            {/* Scrollable Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto px-2 py-2 snap-x snap-mandatory">
                    {images.slice(1).map((img, idx) => (
                        <div
                            key={idx}
                            className="relative min-w-[100px] h-20 rounded-md overflow-hidden snap-center 
                         border hover:border-green-400 transition-all duration-300 cursor-pointer"
                            onClick={() => openModal(img)}
                        >
                            <Image
                                src={img}
                                alt={`${name} produce ${idx + 2}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    ))}
                </div>
            )}

            {/* Farm Details */}
            <div className="px-4 py-3">
                <p className="text-gray-700 text-sm mb-2">{description}</p>
                <h4 className="font-semibold text-green-600 text-sm mb-1">Produce:</h4>
                <ul className="list-disc list-inside text-gray-700 text-xs">
                    {produce.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* CTA */}
            <div className="px-4 py-3 border-t border-gray-100 flex justify-end">
                <button
                    onClick={() => setShowContact(!showContact)}
                    className="px-4 py-1.5 rounded-md bg-green-600 text-white text-sm font-medium 
                     shadow-md hover:bg-green-700 transition-all"
                >
                    Contact →
                </button>
            </div>

            {/* Contact Info */}
            {showContact && (
                <div className="px-4 py-3 bg-green-50 border-t border-green-200 text-sm">
                    <p className="font-semibold text-green-700">{name}</p>
                    <p className="text-gray-600">{location}</p>
                    {googleLink ? (
                        <a
                            href={googleLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline mt-1 inline-block"
                        >
                            View on Google Maps →
                        </a>
                    ) : (
                        <p className="text-gray-400">No map link available</p>
                    )}
                </div>
            )}

            {/* Modal Gallery */}
            {isOpen && activeImage && (
                <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                    <div className="relative w-11/12 h-5/6">
                        <Image
                            src={activeImage}
                            alt="Expanded farm image"
                            fill
                            className="object-contain"
                        />
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 
                         text-sm font-bold text-green-600 shadow-md hover:bg-green-100"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
