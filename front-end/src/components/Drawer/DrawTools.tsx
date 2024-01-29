import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

interface DrawToolsProps {
  onThicknessChange: (thickness: number) => void;
  onToggleEraser: () => void;
  onColorChange: (color: string) => void;
}

const DrawTools: React.FC<DrawToolsProps> = ({ onThicknessChange, onToggleEraser, onColorChange }) => {
  const [thickness, setThickness] = useState(5);
  const [eraserActive, setEraserActive] = useState(false);

  const handleThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThickness = parseInt(event.target.value, 10);
    setThickness(newThickness);
    onThicknessChange(newThickness);
  };

  const handleColorChange = (color: string) => {
    onColorChange(color);
  };

  const handleToggleEraser = () => {
    onToggleEraser();
    setEraserActive(!eraserActive);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '50px',
        right: '10px',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <button
        onClick={handleToggleEraser}
        style={{
          marginBottom: '5px',
          backgroundColor: '#444444',
          color: '#ffffff',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: '2px solid',
          borderColor: eraserActive ? '#444444' : '#DDDDDD'
        }}
      >
        <FontAwesomeIcon icon={faEraser} style={{ width: '20px', height: 'auto', fontSize: '1.5em' }} />
      </button>

      <ColorButton color="#FFFFFF" onClick={() => handleColorChange('#FFFFFF')} />
      <ColorButton color="#2196F3" onClick={() => handleColorChange('#2196F3')} />
      <ColorButton color="#FF0000" onClick={() => handleColorChange('#FF0000')} />
      <ColorButton color="#D000D0" onClick={() => handleColorChange('#D000D0')} />
      <ColorButton color="#3333FF" onClick={() => handleColorChange('#3333FF')} />
      <ColorButton color="#009900" onClick={() => handleColorChange('#009900')} />

      {/* Circular color buttons */}
      {/* ... (unchanged) */}

      <label htmlFor="thicknessSlider" style={{ marginRight: '15px', marginTop: '10px' }} />
      <input
        type="range"
        id="thicknessSlider"
        min={1}
        max={20}
        value={thickness}
        onChange={handleThicknessChange}
        style={{
          width: '100%',
          height: '6px',
          marginTop: '-3px',
        }}
      />
    </div>
  );
};

const ColorButton: React.FC<{ color: string; onClick: () => void }> = ({ color, onClick }) => (
  <button
    onClick={onClick}
    style={{
      width: '25px',
      height: '25px',
      borderRadius: '50%',
      backgroundColor: color,
      border: '2px solid white',
      margin: '4px',
      cursor: 'pointer',
    }}
  />
);

export default DrawTools;