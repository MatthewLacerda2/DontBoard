import React, { useState, useEffect, useRef } from 'react';

const DrawingBoard: React.FC<{ dimensions: { width: number; height: number } }> = ({ dimensions }) => {
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        contextRef.current = context;
        context.lineCap = 'round';
        context.lineWidth = 5;
        context.strokeStyle = 'white'; // Set initial draw color to white
      }
    }
  }, []);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const context = contextRef.current;
    if (context) {
      context.beginPath();
      context.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      setDrawing(true);
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const context = contextRef.current;
    if (context) {
      context.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      className="drawing-board"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseOut={stopDrawing}
      width={dimensions.width}
      height={dimensions.height}
    />
  );
};

export default DrawingBoard;