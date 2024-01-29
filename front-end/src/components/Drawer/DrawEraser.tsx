import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

interface DrawEraserProps {
  onThicknessChange: (thickness: number) => void;
  onToggleEraser: () => void;
}

const DrawEraser: React.FC<DrawEraserProps> = ({ onThicknessChange, onToggleEraser }) => {
  const [thickness, setThickness] = useState(5);

  const handleThicknessChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newThickness = parseInt(event.target.value, 10);
    setThickness(newThickness);
    onThicknessChange(newThickness);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '9px',
        right: '180px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <button
        onClick={onToggleEraser}
        style={{
          marginBottom: '5px',
          backgroundColor: '#555555',
          color: '#ffffff',
          padding: '8px',
          cursor: 'pointer',
          borderRadius: '5px',
          border: 'none'
        }}
      >
        <FontAwesomeIcon icon={faEraser} style={{ width: '20px', height:'auto', fontSize:'1.5em' }} /> {/* Adjusted font size */}
      </button>

      <label htmlFor="thicknessSlider" style={{ marginRight: '15px' }} />
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
          marginTop: '-3px', // Moved the slider 2px to the top
        }}
      />
    </div>
  );
};

export default DrawEraser;