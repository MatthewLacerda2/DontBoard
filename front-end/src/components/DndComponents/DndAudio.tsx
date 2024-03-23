import React, { CSSProperties } from 'react';

interface DndAudioProps {
  name: string;
  src: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

const DndAudio: React.FC<DndAudioProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => (
  
  <div
    className={`draggable-audio ${isSelected ? 'selected' : ''}`}
    onMouseDown={onMouseDown}
    onClick={onClick}
    style={style}
  >
    <div className="draggable-audio" >
      <p className="round-text">{name}</p>
      <audio src={src} controls loop/>
    </div>    
    
  </div>

);

export default DndAudio;