// @ts-nocheck
import AwarenessBlog from "../../components/awareness/awareness";
import VideoBlogHub from "../../components/awareness/VideoBlogHub";
import FourVideoSection from "../../components/video/theFour";
import VideoGallery from "../../components/video/videoBlog";
import VideoHighlights from "../../components/awareness/VideoHighlights";
import AnimatedBackground from "../../components/AnimatedBackground";

export default function AwarenessPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ── Hero ── */}
            <div className="relative bg-gradient-to-br from-green-800 via-emerald-700 to-teal-800 overflow-hidden py-14 px-6">
                <AnimatedBackground variant="green" density="medium" />
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3 leading-tight">
                        ISA Awareness Hub
                    </h1>
                    <p className="text-green-100 text-base max-w-2xl mx-auto mb-6 leading-relaxed">
                        Educative farm videos, agro techniques, market tips, success stories, and comedy — streamed on YouTube, TikTok, and Facebook. Watch, learn, and grow.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <a href="https://www.youtube.com/@ISAPlatformNG" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-red-600 text-white hover:bg-red-700 hover:shadow-xl shadow-lg transition-all">
                            ▶ Subscribe on YouTube
                        </a>
                        <a href="https://www.tiktok.com/@ISAPlatformNG" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl shadow-lg transition-all">
                            ♪ Follow on TikTok
                        </a>
                        <a href="https://www.facebook.com/ISAPlatformNG" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl shadow-lg transition-all">
                            f Follow on Facebook
                        </a>
                    </div>
                </div>
            </div>

            {/* ── Video Blog Hub ── */}
            <VideoBlogHub />

            {/* ── Featured videos + highlights sidebar ── */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
                    <div className="lg:col-span-3">
                        <FourVideoSection />
                    </div>
                    <div className="lg:col-span-1">
                        <VideoHighlights />
                    </div>
                </div>
            </div>

            {/* ── Video gallery carousel ── */}
            <VideoGallery />

            {/* ── Section divider ── */}
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex items-center gap-3 py-2">
                    <div className="flex-1 h-px bg-gray-200" />
                    <span className="text-sm font-bold text-gray-500 bg-white px-4 py-1 rounded-full border border-gray-200">
                        📰 Latest Articles & Agro News
                    </span>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
            </div>

            {/* ── Articles (preserved as-is) ── */}
            <AwarenessBlog />
        </div>
    );
}
