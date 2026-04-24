"use client";

import { useState } from "react";
import AgroTechHeader from "./search";
import AgroTechReport from "./report";

export default function AgroTechPage() {
    const [reportData, setReportData] = useState<any | null>(null);

    // Handle submission from AgroTechHeader
    const handleSubmit = (data: any) => {
        // Normally you'd send data to backend/AI service here
        // For demo purposes, we mock recommendations
        const mockRecommendations = {
            crops: ["Maize", "Cassava", "Rice"],
            fertilizers: ["NPK 15-15-15", "Organic Compost"],
            diseases: ["Use resistant seed varieties", "Apply fungicide for leaf spot"],
            practices: ["Crop rotation", "Drip irrigation", "Mulching"],
            machines: ["Mini-tiller", "Seed drill", "Knapsack sprayer"],
        };

        setReportData({
            region: data.region,
            requestType: data.requestType,
            recommendations: mockRecommendations,
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 via-white to-blue-50">
            {/* Header Section */}
            <AgroTechHeader onSubmit={handleSubmit} />

            {/* Report Section (only shows after submission) */}
            {reportData && (
                <AgroTechReport
                    region={reportData.region}
                    requestType={reportData.requestType}
                    recommendations={reportData.recommendations}
                />
            )}
        </main>
    );
}
