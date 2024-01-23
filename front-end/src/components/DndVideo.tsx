import React, { CSSProperties } from 'react';

interface DndVideoProps {
  src: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const DndVideo: React.FC<DndVideoProps> = ({ src, style, isSelected, onMouseDown, onClick }) => (
  <div
    className={`draggable-media ${isSelected ? 'selected' : ''}`}
    onMouseDown={onMouseDown}
    onClick={onClick}
    style={style}
  >
    <video src={src} className="draggable-media" controls loop />
  </div>
);

export default DndVideo;