// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./layoutWrapper";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "ISA Platform",
  "applicationCategory": "AgricultureApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "NGN",
    "description": "Free tier available. Premium plans from ₦20,000/month",
  },
  "description": "ISA is Nigeria's intelligent agricultural SaaS platform offering AI crop advisory, farm management, agro marketplace, IoT sensor dashboards, and invoice management.",
  "url": "https://isa-platform.ng",
  "provider": { "@type": "Organization", "name": "ISA Platform", "url": "https://isa-platform.ng" },
};

export const metadata: Metadata = {
  title: {
    default: "ISA Platform — Intelligent Agricultural SaaS for Nigerian Farmers",
    template: "%s | ISA Platform",
  },
  description: "ISA is Nigeria's leading Agro-Tech SaaS platform. Get AI-powered farm advice, real-time sensor dashboards, agro marketplace listings, invoice management, and crop intelligence — built for 36 states.",
  keywords: [
    "agro-tech Nigeria", "farm management software", "AI agriculture", "crop advisor",
    "farm invoice", "agricultural marketplace", "smart farming Nigeria",
    "IoT farm sensors", "yield prediction", "pest detection AI",
    "ISA platform", "farm schedule", "agricultural SaaS",
  ],
  authors: [{ name: "ISA Platform", url: "https://isa-platform.ng" }],
  creator: "ISA Platform",
  publisher: "ISA Platform",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://isa-platform.ng",
    siteName: "ISA Platform",
    title: "ISA Platform — AI-Powered Agricultural SaaS for Nigerian Farmers",
    description: "Plan, manage, and grow your farm with ISA — Nigeria's most powerful Agro-Tech platform. AI crop advisor, marketplace, IoT dashboard, invoicing and more.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ISA Platform — Intelligent Agricultural SaaS" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ISA Platform — Smart Farming for Nigeria",
    description: "AI-powered farm advice, crop prices, IoT sensors, and agro marketplace. Join 12,000+ farmers on ISA.",
    images: ["/og-image.png"],
    creator: "@ISAPlatformNG",
  },
  alternates: { canonical: "https://isa-platform.ng" },
  category: "Agriculture Technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans bg-[#0c0000] text-white min-h-screen flex flex-col">

        {/* Layout wrapper for navbar, footer, main content */}
        <LayoutWrapper>{children}</LayoutWrapper>



      </body>
    </html>
  );
}
