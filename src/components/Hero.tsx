"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Hero() {
    const phrases = [
        "Welcome to ISA",
        "Intelligent SaaS Assistant",
        "Manage invoices with ease",
        "Schedule posts effortlessly",
        "Generate AI content instantly",
    ];

    const [text, setText] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentPhrase = phrases[phraseIndex];
        let typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting && charIndex < currentPhrase.length) {
                setText(currentPhrase.substring(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            } else if (isDeleting && charIndex > 0) {
                setText(currentPhrase.substring(0, charIndex - 1));
                setCharIndex(charIndex - 1);
            } else if (!isDeleting && charIndex === currentPhrase.length) {
                setTimeout(() => setIsDeleting(true), 1000); // pause before deleting
            } else if (isDeleting && charIndex === 0) {
                setIsDeleting(false);
                setPhraseIndex((phraseIndex + 1) % phrases.length); // loop phrases
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex, phrases]);

    return (
        <section className="relative w-full h-90 flex items-center justify-center text-center overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src="/hero.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-blue-700/30 to-blue-500/20"></div>
            </div>

            {/* Glassmorphic Content */}
            <div className="relative z-10 max-w-3xl px-6 py-8 rounded-2xl backdrop-blur-md bg-blue-600/20 border border-blue-400/30 shadow-lg">
                {/* Continuous Typewriter Heading */}
                <h1 className="text-3xl md:text-5xl font-extrabold mb-6 
               bg-gradient-to-r from-blue-500 to-white 
               bg-clip-text text-transparent">
                    {text}
                    <span className="border-r-2 border-white animate-pulse ml-1"></span>
                </h1>

                <p className="text-base md:text-lg mb-6 
              bg-gradient-to-r from-blue-400 to-white 
              bg-clip-text text-transparent">
                    Your Intelligent SaaS Assistant for freelancers, businesses, and creators.
                    Manage invoices, schedule posts, generate AI content, and stay informed.
                </p>


                {/* Feature Buttons */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                    <Link href="/awareness" className="btn-hero">Awareness</Link>
                    <Link href="/ai-assistant" className="btn-hero">AI Assistant</Link>
                    <Link href="/scheduler" className="btn-hero">Scheduling</Link>
                    <Link href="/invoices" className="btn-hero">Invoice</Link>
                </div>

                {/* Sign Up Button */}
                <Link
                    href="/signup"
                    className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transform transition-all duration-300"
                >
                    Sign Up
                </Link>
            </div>
        </section>
    );
}
