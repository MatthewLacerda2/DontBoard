import React, { CSSProperties } from 'react';

interface DndImageProps {
  src: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const DndImage: React.FC<DndImageProps> = ({ src, style, isSelected, onMouseDown, onClick }) => (
  <div
    className={`draggable-media ${isSelected ? 'selected' : ''}`}
    onMouseDown={onMouseDown}
    onClick={onClick}
    style={style}
  >
    <img src={src} alt="Dropped" className="draggable-media" />
  </div>
);

export default DndImage;