import React from 'react';
import { DndMediaProps } from './DndBoard';

const DndImage: React.FC<DndMediaProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => (
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