import React, { useState } from 'react';
import Scaler from './Scaler';

interface DndImageProps {
  src: string;
  name: string;
  style: React.CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const DndImage: React.FC<DndImageProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => {
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
        <img src={src} alt={name} className="draggable-media" style={{ width: '100%', height: '100%' }} />
      </div>
    </Scaler>
  );
};

export default DndImage;
