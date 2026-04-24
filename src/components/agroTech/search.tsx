"use client";

import { useState } from "react";

export default function AgroTechHeader({ onSubmit }: { onSubmit: (data: any) => void }) {
    const [region, setRegion] = useState("");
    const [requestType, setRequestType] = useState("crop");
    const [soilFile, setSoilFile] = useState<File | null>(null);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSoilFile(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ region, requestType, soilFile });
    };

    return (
        <section className="py-16 px-6 bg-gradient-to-r from-green-100 via-white to-blue-100">
            {/* Heading */}
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-extrabold 
                       bg-gradient-to-r from-green-600 to-blue-500 bg-clip-text text-transparent">
                    Agro‑Tech Assistant
                </h1>
                <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
                    Upload your soil sample and location to get crop, fertilizer, and farm practice recommendations.
                </p>
            </div>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg max-w-3xl mx-auto p-8"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Soil Upload */}
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-green-300 rounded-lg p-6 hover:border-green-500 transition cursor-pointer">
                        {/* Plus Icon in Circle */}
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 text-3xl font-bold mb-3">
                            +
                        </div>

                        {/* Label */}
                        <label className="text-sm font-semibold text-gray-600 mb-3">Upload Soil Sample</label>

                        {/* File Input */}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-gray-600 cursor-pointer"
                        />

                        {/* File Preview */}
                        {soilFile && (
                            <p className="mt-2 text-xs text-green-700">Selected: {soilFile.name}</p>
                        )}
                    </div>


                    {/* Region + Request Type */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Region</label>
                            <input
                                type="text"
                                placeholder="Enter your sample region..."
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 text-green-600 rounded-md focus:ring-2 focus:ring-green-500"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Request Type</label>
                            <select
                                value={requestType}
                                onChange={(e) => setRequestType(e.target.value)}
                                className="w-full px-4 py-2 bg-green-200 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                            >
                                <option value="crop">Crop Type</option>
                                <option value="fertilizer">Fertilizers</option>
                                <option value="disease">Disease Treatment</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 text-center">
                    <button
                        type="submit"
                        className="px-8 py-3 rounded-md bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition-all"
                    >
                        Get Recommendations →
                    </button>
                </div>
            </form>
        </section>
    );
}
