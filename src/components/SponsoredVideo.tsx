"use client";
import { useEffect, useState } from "react";
import { Video } from "@/src/types/videos";
import ReactPlayer from "react-player";
import type { ComponentType } from "react";
import AnimatedBackground from "@/src/components/AnimatedBackground";

// react-player v3 changed its forwardRef signature in a way that hides
// standard props from TypeScript. This cast restores the expected API.
const Player = ReactPlayer as unknown as ComponentType<{
    url: string;
    width?: string | number;
    height?: string | number;
    controls?: boolean;
    className?: string;
    playing?: boolean;
    loop?: boolean;
    muted?: boolean;
    volume?: number;
    playbackRate?: number;
    onReady?: () => void;
    onStart?: () => void;
    onPlay?: () => void;
    onPause?: () => void;
    onEnded?: () => void;
    onError?: (error: unknown) => void;
}>;

interface SponsoredVideoProps {
    video?: Video;
}

export default function SponsoredVideoSection({ video }: SponsoredVideoProps) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [animatedViews, setAnimatedViews] = useState(0);

    // Animate views count
    useEffect(() => {
        if (!video) return;
        let start = 0;
        const end = video.views;
        const duration = 1500;
        const stepTime = Math.max(Math.floor(duration / end), 1);
        const timer = setInterval(() => {
            start += 1;
            setAnimatedViews(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [video]);

    if (!video) {
        return (
            <section className="py-12 px-6 bg-yellow-50 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-red-600">
                    No sponsored video available
                </h2>
            </section>
        );
    }

    const toggleLike = () => {
        if (liked) {
            setLikes(likes - 1);
            setLiked(false);
        } else {
            setLikes(likes + 1);
            setLiked(true);
        }
    };

    return (
        <section className="relative py-12 px-6 bg-yellow-50 rounded-lg shadow-md overflow-hidden">
            <AnimatedBackground variant="green" density="medium" />
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">

                {/* Supporting pictures on the left */}
                {video.pictures && video.pictures.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {video.pictures.map((pic, idx) => (
                            <img
                                key={idx}
                                src={pic}
                                alt={`Sponsored visual ${idx + 1}`}
                                className="w-full h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
                            />
                        ))}
                    </div>
                )}

                {/* Video Player with hover pop */}
                <div className="relative transform transition-transform hover:scale-105">
                    <Player
                        url={video.url}
                        width="100%"
                        height="320px"
                        controls={true}
                        className="rounded-lg shadow-lg"
                    />
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded">
                        Sponsored
                    </span>
                </div>

                {/* Details */}
                <div>
                    <h2 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {video.title}
                    </h2>
                    {video.description && (
                        <p className="text-gray-700 mb-4">{video.description}</p>
                    )}
                    <p className="text-sm text-gray-500 mb-2">
                        Posted: {new Date(video.postedAt).toLocaleDateString()} •{" "}
                        <span className="font-semibold text-blue-600 transition-all">
                            {animatedViews.toLocaleString()}
                        </span>{" "}
                        views
                    </p>
                    {video.premium && (
                        <span className="inline-block text-xs bg-yellow-500 text-white px-2 py-1 rounded mb-4">
                            Premium Content
                        </span>
                    )}

                    {/* Like button */}
                    <button
                        onClick={toggleLike}
                        className={`mt-4 flex items-center gap-2 px-4 py-2 rounded transition ${liked
                            ? "bg-red-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                            }`}
                    >
                        {liked ? "❤️ Liked" : "🤍 Like"}{" "}
                        <span className="font-bold">{likes}</span>
                    </button>
                </div>
            </div>
        </section>
    );
}
