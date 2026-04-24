"use client";
import Hero from "@/src/components/Hero";
import Services from "@/src/components/Services";
import SponsoredVideoSection from "@/src/components/SponsoredVideo";
import { mockVideos } from "@/src/mocks/mockvideos";
import FourVideoSection from "@/src/components/video/theFour";
import MarketplacePreview from "@/src/components/home/MarketplacePreview";
import DashboardPreview from "@/src/components/home/DashboardPreview";
import AiPreview from "@/src/components/home/AiPreview";
import RevenueStrip from "@/src/components/home/RevenueStrip";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <MarketplacePreview />
      <DashboardPreview />
      <AiPreview />
      <RevenueStrip />
      <SponsoredVideoSection video={mockVideos[0]} />
      <FourVideoSection />
    </main>
  );
}
