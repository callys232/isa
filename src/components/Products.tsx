"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Product } from "@/src/types/agrotypes";
import { products } from "@/src/mocks/mockproducts";

interface ProductGalleryProps {
    title?: string;
    items?: Product[];
}

export default function ProductGallery({
    title = "Farm Implements & Fertilizers",
    items = products,
}: ProductGalleryProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);
    const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let raf: number;
        const speed = 0.3; // pixels per frame (slow + smooth)

        const step = () => {
            if (!isPaused) {
                el.scrollLeft += speed;

                // Reset when reaching end
                if (el.scrollLeft + el.clientWidth >= el.scrollWidth) {
                    el.scrollLeft = 0;
                }
            }
            raf = requestAnimationFrame(step);
        };

        raf = requestAnimationFrame(step);
        return () => cancelAnimationFrame(raf);
    }, [isPaused]);

    // Pause on manual scroll (mobile swipe)
    const handleUserScroll = () => {
        setIsPaused(true);
        if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
        pauseTimeout.current = setTimeout(() => setIsPaused(false), 3000); // resume after 3s
    };

    return (
        <section className="py-4 px-3 bg-gradient-to-b from-green-300 via-white to-blue-100">
            <h2 className="text-lg font-bold text-green-700 mb-3">{title}</h2>

            <div
                ref={scrollRef}
                className="flex gap-3 overflow-x-scroll snap-x snap-mandatory scroll-smooth scrollbar-hide"
                onMouseEnter={() => setIsPaused(true)}   // pause on hover (desktop)
                onMouseLeave={() => setIsPaused(false)} // resume on leave
                onScroll={handleUserScroll}             // pause when user scrolls manually
            >
                {items.map((p) => (
                    <div
                        key={p.id}
                        className="min-w-[160px] bg-white rounded-lg shadow-md border border-gray-200 
                       snap-center hover:shadow-lg hover:border-green-400 transition-all duration-300 
                       transform hover:scale-[1.05]"
                    >
                        {/* Product Image */}
                        <div className="relative w-full h-24 cursor-pointer">
                            <Image src={p.image} alt={p.name} fill className="object-cover rounded-t-lg" />
                        </div>

                        {/* Product Info */}
                        <div className="px-3 py-2">
                            <h3 className="text-sm font-semibold text-gray-700 truncate">{p.name}</h3>
                            <p className="text-xs text-gray-500">{p.price}</p>

                            {/* Referral Link */}
                            <a
                                href={p.referralLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-2 text-center px-3 py-1.5 bg-green-600 text-white text-xs rounded-md 
                           hover:bg-green-700 transition-all"
                            >
                                Buy Now →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
