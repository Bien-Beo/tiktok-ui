import React, { useEffect, useState } from 'react';
import VideoList from '~/components/Video/VideoList';

function Home() {
    const API_KEY = 'AIzaSyAgslhYG3DZFF2I9gksBxQGlQXnbA2VbmY';
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?q=shorts&type=video&part=snippet&maxResults=5&key=${API_KEY}`,
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }
                const data = await response.json();
                setVideos(data.items || []);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setVideos([]);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div className="loading">
                <span>Loading videos...</span>
                <div className="spinner"></div>
            </div>
        );
    }
    

    return <VideoList videos={videos} />;
}

export default Home;
