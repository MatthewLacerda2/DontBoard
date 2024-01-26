import React, { useState, useEffect } from 'react';
import Scaler from './Scaler';
import { DndMediaProps } from './DndBoard';

const DndImage: React.FC<DndMediaProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => {
  
  const [width, setWidth] = useState<number>(style.width as number);
  const [height, setHeight] = useState<number>(style.height as number);
  const [scale, setScale] = useState<number>(1);

  const handleResize = (newWidth: number, newHeight: number) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  useEffect(() => {
    // Calculate the scaling factor based on the initial width and the current width
    const newScale = width / (style.width as number);
    setScale(newScale);
  }, [width, style.width]);

  return (
    <Scaler onResize={handleResize}>
      <div
        className={`draggable-media ${isSelected ? 'selected' : ''}`}
        onMouseDown={onMouseDown}
        onClick={onClick}
        style={{ ...style, width, height }}
      >
        <img
          src={src}
          alt={name}
          className="draggable-media"
          style={{ width: '100%', height: '100%', transform: `scale(${scale})` }}
        />
      </div>
    </Scaler>
  );
};

export default DndImage;