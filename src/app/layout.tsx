// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "./layoutWrapper";

export const metadata: Metadata = {
  title: "ISA",
  description: "Your Intelligent SaaS Assistant and Agric-Tech Platform",
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
      <body className="antialiased font-sans bg-[#0c0000] text-white min-h-screen flex flex-col">

        {/* Layout wrapper for navbar, footer, main content */}
        <LayoutWrapper>{children}</LayoutWrapper>



      </body>
    </html>
  );
}
