// YouTest.tsx

import React from 'react';
import YouTube from 'react-youtube';

interface YouTestProps {
  videoUrl: string;
}

const YouTest: React.FC<YouTestProps> = ({ videoUrl }) => {
  const getYouTubeVideoId = (url: string) => {
    const match = url.match(/[?&]v=([^?&]+)/);
    return match ? match[1] : null;
  };

  const videoId = getYouTubeVideoId(videoUrl) ?? undefined;

  return (
    <div>
      <YouTube videoId={videoId} opts={{ width: '640', height: '360' }} />
    </div>
  );
};

export default YouTest;
