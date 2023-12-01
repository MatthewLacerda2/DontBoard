// ButtonDraw.tsx

import React, { useState } from 'react';
import DrawingBoard from './DrawingBoard';

const ButtonDraw: React.FC<{ dimensions: { width: number; height: number } }> = ({ dimensions }) => {
  const [drawingMode, setDrawingMode] = useState(false);

  const toggleDrawingMode = () => {
    setDrawingMode(!drawingMode);
  };

  return (
    <div>
      <button onClick={toggleDrawingMode}>Toggle Drawing</button>
      {drawingMode && <DrawingBoard dimensions={dimensions} />}
    </div>
  );
};

export default ButtonDraw;
