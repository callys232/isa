"use client";

import FarmCard from "./farmCard";
import { farms } from "@/src/mocks/mocksagro";

export default function FarmsGrid() {
    return (
        <section className="py-16 px-6 bg-gradient-to-b from-green-50 via-white to-blue-50">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                Partner Farms & Produce
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {farms.map((farm) => (
                    <FarmCard key={farm.name} {...farm} />
                ))}
            </div>
        </section>
    );
}
