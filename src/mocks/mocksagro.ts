// mock/mockagro.ts
import { Farm } from "../types/agrotypes";

export const farms: Farm[] = [
    {
        name: "Green Valley Farms",
        location: "Ibadan, Nigeria",
        description: "Specializing in organic vegetables and sustainable farming practices.",
        produce: ["Tomatoes", "Spinach", "Carrots", "Cabbage"],
        images: ["/images/farm1a.jpg", "/images/farm1b.jpg", "/images/farm1c.jpg"],
    },
    {
        name: "Sunrise Plantations",
        location: "Kaduna, Nigeria",
        description: "Large-scale maize and cassava production with modern machinery.",
        produce: ["Maize", "Cassava", "Soybeans"],
        images: ["/images/farm2a.jpg", "/images/farm2b.jpg"],
    },
    {
        name: "Riverbend Agro",
        location: "Benue, Nigeria",
        description: "Focused on rice cultivation and irrigation-based farming.",
        produce: ["Rice", "Millet", "Groundnuts"],
        images: ["/images/farm3a.jpg", "/images/farm3b.jpg", "/images/farm3c.jpg"],
    },
];
