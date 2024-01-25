import React, { useState, useRef, useEffect, MouseEvent } from 'react';

interface ScalerProps {
    onResize: (width: number, height: number) => void;
    children?: React.ReactNode;
}

  const Scaler: React.FC<ScalerProps> = ({ onResize, children }) => {
  const [resizing, setResizing] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [startY, setStartY] = useState<number>(0);
  const [initialWidth, setInitialWidth] = useState<number>(0);
  const [initialHeight, setInitialHeight] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (resizing && containerRef.current && e.shiftKey ) {
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
    
        // Calculate the scaling factor based on the initial width and height
        const scalingFactor = Math.max(1 + deltaX / initialWidth, 1 + deltaY / initialHeight);
    
        const newWidth = initialWidth * scalingFactor;
        const newHeight = initialHeight * scalingFactor;
    
        onResize(newWidth, newHeight);
      }
    };      
  
    const handleMouseUp = () => {
      setResizing(false);
    };
  
    if (resizing) {
      document.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
      document.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizing, startX, startY, initialWidth, initialHeight, onResize]);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (containerRef.current) {
      setResizing(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
      setInitialWidth(containerRef.current.clientWidth);
      setInitialHeight(containerRef.current.clientHeight);
    }
  };

  return (
    <div
      className="scaler-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
    >
      {children}
    </div>
  );
};

export default Scaler;