"use client";
import { Video } from "@/src/types/videos";

interface VideoCardProps {
  video: Video;
  onSelect: (video: Video) => void;
}

export default function VideoCard({ video, onSelect }: VideoCardProps) {
  return (
    <div
      onClick={() => onSelect(video)}
      className="cursor-pointer rounded-lg border border-transparent 
                 shadow-md overflow-hidden transition-all duration-300 
                 hover:shadow-xl hover:border-blue-500 hover:scale-[1.02]"
    >
      <div className="relative">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-105"
        />
        {/* Play overlay */}
        <div className="absolute inset-0 flex items-center justify-center 
                        opacity-0 hover:opacity-100 transition bg-black/40">
          <span className="bg-white text-blue-600 rounded-full p-3 shadow-lg">
            ▶
          </span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-900 line-clamp-2">
          {video.title}
        </h3>
        <p className="text-xs text-gray-500">
          {new Date(video.postedAt).toLocaleDateString()} • {video.views} views
        </p>
        {video.premium && (
          <span className="inline-block mt-2 text-xs bg-yellow-500 text-white px-2 py-1 rounded">
            Premium
          </span>
        )}
      </div>
    </div>
  );
}
