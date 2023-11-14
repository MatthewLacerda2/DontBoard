import React, { CSSProperties, ChangeEvent } from 'react';

interface DndTextProps {
  text: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTextChange: (text: string) => void;
}

const DndText: React.FC<DndTextProps> = ({ text, style, isSelected, onMouseDown, onTextChange }) => (
  <div
    className={`draggable-media ${isSelected ? 'selected' : ''}`}
    onMouseDown={onMouseDown}
    style={style}
  >
    <textarea
        value={text}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onTextChange(e.target.value)}
        placeholder="Type your text here"
        className="draggable-media-text"
    />

  </div>
);

export default DndText;