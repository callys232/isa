"use client";
import { useEffect, useState } from "react";
import { Video } from "@/src/types/videos";

interface VideoCardProps {
    video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);
    const [animatedViews, setAnimatedViews] = useState(0);

    // Animate views count
    useEffect(() => {
        let start = 0;
        const end = video.views;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / end), 1);
        const timer = setInterval(() => {
            start += 1;
            setAnimatedViews(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);
        return () => clearInterval(timer);
    }, [video.views]);

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
        <div
            className="cursor-pointer rounded-lg border border-transparent shadow-md 
                 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
        >
            <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-2">
                    {video.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                <p className="text-xs text-gray-500">
                    {new Date(video.postedAt).toLocaleDateString()} •{" "}
                    <span className="font-semibold text-blue-600">
                        {animatedViews.toLocaleString()}
                    </span>{" "}
                    views
                </p>
                <button
                    onClick={toggleLike}
                    className={`mt-3 flex items-center gap-2 px-3 py-1 rounded transition ${liked
                            ? "bg-red-600 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                        }`}
                >
                    {liked ? "❤️ Liked" : "🤍 Like"} <span>{likes}</span>
                </button>
            </div>
        </div>
    );
}
