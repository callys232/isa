"use client";
import { Video } from "@/src/types/videos";
import { mockVideos } from "@/src/mocks/mockvideos";
import VideoCard from "./4vidCard";

export default function FourVideoSection() {
    // Pick 4 videos (could be sponsored + 3 others)
    const videos: Video[] = mockVideos.slice(0, 4);

    return (
        <section className="py-12 px-6 bg-gray-50">
            <h2 className="text-2xl font-extrabold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Featured Videos
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
                {videos.map((video) => (
                    <VideoCard key={video.id} video={video} />
                ))}
            </div>
        </section>
    );
}
