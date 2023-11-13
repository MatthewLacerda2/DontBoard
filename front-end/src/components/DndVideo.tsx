import React from 'react';
import { DndMediaProps } from './DndBoard';

const DndVideo: React.FC<DndMediaProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => (
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
