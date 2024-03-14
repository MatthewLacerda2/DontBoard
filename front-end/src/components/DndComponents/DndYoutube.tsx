import React, { CSSProperties } from 'react';
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

    return (
        <div
            className={`draggable-media ${isSelected ? 'selected' : ''}`}
            onMouseDown={onMouseDown}
            onClick={onClick}
            style={style}
        >
        <YouTube videoId={videoId} opts={{ width: '640', height: '360' }} />
        </div>
    );
};

export default DndYouTube;