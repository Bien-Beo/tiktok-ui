import React, { useState, useRef } from 'react';
import Video from '~/components/Video';

function VideoList({ videos = [] }) {
    const [activeVideoId, setActiveVideoId] = useState(null);
    const videoRefs = useRef([]);

    const handleActiveChange = (id) => {
        setActiveVideoId(id);
    };

    const handleScrollToNext = () => {
        const currentIndex = videos.findIndex((video) => video.id.videoId === activeVideoId);
        const nextIndex = currentIndex + 1;

        if (nextIndex < videos.length && videoRefs.current[nextIndex]) {
            videoRefs.current[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div>
            {videos.map((video, index) => (
                <Video
                    key={video.id.videoId}
                    video={video}
                    isActive={video.id.videoId === activeVideoId}
                    onActiveChange={handleActiveChange}
                    onScrollToNext={handleScrollToNext}
                    ref={(el) => (videoRefs.current[index] = el)}
                />
            ))}
        </div>
    );
}

export default VideoList;

