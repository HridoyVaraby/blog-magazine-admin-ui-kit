'use client';

import { useIncrementVideoView } from '@/hooks/use-videos';
import CommentSection from '@/components/comments/CommentSection';
import { Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { formatBengaliDateTime } from '@/lib/bengali-date-utils';

// Function to extract YouTube video ID and get embed URL
const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
};

interface Video {
    id: string;
    title: string;
    description: string | null;
    videoUrl: string;
    thumbnail: string | null;
    viewCount: number;
    createdAt: Date;
    author: {
        fullName: string;
    } | null;
}

interface VideoClientProps {
    video: Video;
}

export default function VideoClient({ video }: VideoClientProps) {
    const { mutate: incrementView } = useIncrementVideoView();

    useEffect(() => {
        if (video.id) {
            incrementView(video.id);
        }
    }, [video.id, incrementView]);

    const embedUrl = getYouTubeEmbedUrl(video.videoUrl);

    return (
        <main className="flex-1 container mx-auto px-4 py-8">
            <article className="max-w-4xl mx-auto">
                {/* Video Player */}
                <div className="aspect-video mb-6">
                    <iframe
                        src={embedUrl}
                        title={video.title}
                        className="w-full h-full rounded-lg"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>

                {/* Video Info */}
                <div className="mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                        {video.title}
                    </h1>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{formatBengaliDateTime(video.createdAt.toISOString())}</span>
                            </div>
                        </div>
                        <span>প্রকাশক: {video.author?.fullName}</span>
                    </div>

                    {video.description && (
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {video.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Comments Section */}
                <CommentSection postId={video.id} />
            </article>
        </main>
    );
}
