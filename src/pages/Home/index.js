import React, { useEffect, useState } from "react";
import VideoList from "./VideoList";

function Home() {
    const API_KEY = "AIzaSyAgslhYG3DZFF2I9gksBxQGlQXnbA2VbmY";
    const [videos, setVideos] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchVideos() {
            try {
                const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=shorts&type=video&part=snippet&maxResults=5&key=${API_KEY}`);
                const data = await response.json();
                setVideos(data.items); // Gán dữ liệu cho videos
            } catch (error) {
                console.error("Error fetching videos:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchVideos();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <VideoList videos={videos} />;
}

export default Home;

// import React, { useState, useEffect } from "react";
// import VideoList from "./VideoList";

// function Home() {
//     const API_KEY = "AIzaSyAgslhYG3DZFF2I9gksBxQGlQXnbA2VbmY";
//     const [videos, setVideos] = useState([]);

//     useEffect(() => {
//         const fetchShorts = async () => {
//             const url = `https://www.googleapis.com/youtube/v3/search?q=shorts&type=video&part=snippet&maxResults=5&key=${API_KEY}`;
//             const response = await fetch(url);
//             const data = await response.json();
//             setVideos(data.items);
//         };

//         fetchShorts();
//     }, []);

//     return <VideoList videos={videos} />;
// }

// export default Home;
