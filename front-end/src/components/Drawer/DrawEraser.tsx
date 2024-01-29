import React, { useState } from 'react';

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
        top: '12px',
        right: '180px',
        zIndex: 999,
      }}
    >
      <label htmlFor="thicknessSlider"/>
      <input
        type="range"
        id="thicknessSlider"
        min={2}
        max={18}
        value={thickness}
        onChange={handleThicknessChange}
      />
      <button onClick={onToggleEraser}>Eraser</button>
    </div>
  );
};

export default DrawEraser;
