import React from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoUrl }) => {
    
    // Function to extract the video ID from the YouTube URL
    const getVideoIdFromUrl = (url) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match ? match[1] : null;
    };

    const videoId = getVideoIdFromUrl(videoUrl);

    if (!videoId) {
        console.error('Invalid YouTube URL');
        return null;
    }

    const opts = {
        height: '360',
        width: '640',
        playerVars: {
        autoplay: 0,
        },
    };

    return (
        <div style={{ margin: '10px' }}>
        <YouTube videoId={videoId} opts={opts} />
        </div>
    );
};

export default YouTubeVideo;