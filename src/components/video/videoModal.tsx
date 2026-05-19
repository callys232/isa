"use client";
import { useEffect } from "react";
import ReactPlayer from "react-player";
import type { ComponentType } from "react";
import { Video } from "@/src/types/videos";

// react-player v3 changed its forwardRef signature — this cast restores the expected API.
const Player = ReactPlayer as unknown as ComponentType<{
    url: string;
    width?: string | number;
    height?: string | number;
    controls?: boolean;
    className?: string;
}>;

interface VideoModalProps {
    video: Video;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    hasNext: boolean;
    hasPrev: boolean;
}

export default function VideoModal({ video, onClose, onNext, onPrev, hasNext, hasPrev }: VideoModalProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl relative transform animate-slideUp mx-4">
                {/* Exit button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-red-600 text-xl transition-transform hover:scale-125"
                >
                    ✕
                </button>

                {/* Player */}
                <Player url={video.url} width="100%" height="240px" controls={true} className="md:h-[480px]" />

                {/* Info */}
                <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900">{video.title}</h3>
                    <p className="text-sm text-gray-600">
                        {new Date(video.postedAt).toLocaleString()} • {video.views} views
                    </p>
                    <p className="text-sm text-blue-700 mt-2">Section: {video.section}</p>
                    {video.premium && (
                        <p className="text-sm text-yellow-600 font-semibold mt-2">Premium Content</p>
                    )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center p-4">
                    {hasPrev && (
                        <button
                            onClick={onPrev}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
                        >
                            ◀ Previous
                        </button>
                    )}
                    {hasNext && (
                        <button
                            onClick={onNext}
                            className="ml-auto px-4 py-2 bg-gray-200 rounded hover:bg-blue-500 hover:text-white transition"
                        >
                            Next ▶
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
