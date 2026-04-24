// types/agrotypes.ts

export interface Farm {
    name: string;
    location: string;
    description: string;
    produce: string[];
    images: string[];
    googleLink?: string;
}

export interface ReportProps {
    region: string;
    requestType: string;
    recommendations: {
        crops?: string[];
        fertilizers?: string[];
        diseases?: string[];
        practices?: string[];
        machines?: string[];
        images?: string[];
        advanced?: string[];
    };
}

// Header form submission type
export interface HeaderFormData {
    region: string;
    requestType: string;
    soilFile: File | null;
}
export interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    referralLink: string;
}
