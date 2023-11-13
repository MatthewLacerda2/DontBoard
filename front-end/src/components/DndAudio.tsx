import React from 'react';
import { DndMediaProps } from './DndBoard';

const DndAudio: React.FC<DndMediaProps> = ({ src, name, style, isSelected, onMouseDown, onClick }) => (
  
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