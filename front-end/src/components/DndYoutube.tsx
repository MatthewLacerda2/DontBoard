import React, { CSSProperties, useRef } from 'react';
import YouTube from 'react-youtube';

interface DndYouTubeProps {
  videoUrl: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const DndYouTube: React.FC<DndYouTubeProps> = ({ videoUrl, style, isSelected, onMouseDown, onClick }) => {

    const getYouTubeVideoId = (url: string) => {
        const match = url.match(/[?&]v=([^?&]+)/);
        return match ? match[1] : null;
    };

    const videoId = getYouTubeVideoId(videoUrl) ?? undefined;
    const youtubePlayerRef = useRef<any>(null);

    return (
        <div
            className={`draggable-media ${isSelected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onClick={onClick}
            style={style}
        >
        <YouTube videoId={videoId} ref={youtubePlayerRef} opts={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default DndYouTube;