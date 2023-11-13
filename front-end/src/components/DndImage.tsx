import React, { useState } from 'react';
import Scaler from './Scaler';
import { DndMediaProps } from './DndBoard';

const DndImage: React.FC<DndMediaProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => {
  const [width, setWidth] = useState<number>(style.width as number);
  const [height, setHeight] = useState<number>(style.height as number);

  const handleResize = (newWidth: number, newHeight: number) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  return (
    <Scaler onResize={handleResize}>
      <div
        className={`draggable-media ${isSelected ? 'selected' : ''}`}
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ ...style, width, height }}
      >
        <img src={src} alt={name} className="draggable-media" />
      </div>
    </Scaler>
  );
};

export default DndImage;
