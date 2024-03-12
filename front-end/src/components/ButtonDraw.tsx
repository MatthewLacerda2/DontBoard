import React, { useState } from 'react';
import DrawingBoard from './Drawer/DrawingBoard';

const ButtonDraw: React.FC<{ dimensions: { width: number; height: number } }> = ({ dimensions }) => {
  const [drawingMode, setDrawingMode] = useState(false);

  return (
    <div>
      <button onClick={() => setDrawingMode(!drawingMode)}>Toggle Drawing</button>
      {drawingMode && <DrawingBoard dimensions={dimensions} drawingMode={drawingMode} />}
    </div>
  );
};

export default ButtonDraw;