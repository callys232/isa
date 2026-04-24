"use client";
import { useEffect, useState } from "react";
import { Video } from "@/src/types/videos";
import { mockVideos } from "@/src/mocks/mockvideos";
import VideoCard from "./videoCard";
import VideoModal from "./videoModal";

export default function VideoBlog() {
    const [videos, setVideos] = useState<Video[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await fetch("/api/videos");
                if (!res.ok) throw new Error("Failed to fetch");
                const data: Video[] = await res.json();
                setVideos(data);
            } catch (error) {
                console.error("Backend failed, using mock videos:", error);
                setVideos(mockVideos);
            }
        };
        fetchVideos();
    }, []);

    const handleSelect = (index: number) => setSelectedIndex(index);
    const handleClose = () => setSelectedIndex(null);

    const handleNext = () => {
        if (selectedIndex !== null && selectedIndex < videos.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const handlePrev = () => {
        if (selectedIndex !== null && selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    return (
        <section className="py-10 px-6 bg-gray-50">
            {/* Carousel container */}
            <div className="relative">
                {/* Scrollable row */}
                <div className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                    {videos.map((video, idx) => (
                        <div
                            key={video.id}
                            className="flex-shrink-0 w-72 snap-center"
                        >
                            <VideoCard video={video} onSelect={() => handleSelect(idx)} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Popup Modal */}
            {selectedIndex !== null && (
                <VideoModal
                    video={videos[selectedIndex]}
                    onClose={handleClose}
                    onNext={handleNext}
                    onPrev={handlePrev}
                    hasNext={selectedIndex < videos.length - 1}
                    hasPrev={selectedIndex > 0}
                />
            )}
        </section>
    );
}
