import React, { useState, useEffect, useRef } from 'react';
import DrawEraser from './DrawEraser';

interface DrawingBoardProps {
  dimensions: { width: number; height: number };
  style?: React.CSSProperties;
  drawingMode: boolean;
}

const DrawingBoard: React.FC<DrawingBoardProps> = ({ dimensions, style, drawingMode }) => {
  const [drawing, setDrawing] = useState(false);
  const [eraserMode, setEraserMode] = useState(false);
  const [thickness, setThickness] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        contextRef.current = context;
        context.lineCap = 'round';
        context.lineWidth = thickness;
        context.strokeStyle = eraserMode ? '#ffffff' : '#000000';
      }
    }
  }, [thickness, eraserMode]);

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

  const handleThicknessChange = (newThickness: number) => {
    setThickness(newThickness);
  };

  const handleToggleEraser = () => {
    setEraserMode(!eraserMode);
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="drawing-board"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        width={dimensions.width}
        height={dimensions.height}
        style={{
          ...style,
          pointerEvents: drawingMode ? 'auto' : 'none'
        }}
      />

      {drawingMode && <DrawEraser onThicknessChange={handleThicknessChange} onToggleEraser={handleToggleEraser} />}
      
    </div>
  );
};

export default DrawingBoard;
