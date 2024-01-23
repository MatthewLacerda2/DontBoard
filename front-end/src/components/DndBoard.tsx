import React, { useEffect, useState, CSSProperties } from 'react';
import DndImage from './DndImage';
import DndVideo from './DndVideo';
import DndAudio from './DndAudio';
import DndText from './DndText';
import { isValidYoutubeLink } from './youtubeUtils.tsx';
import DrawingBoard from './DrawingBoard';
import '../App.css';
import InputYoutube from './InputYoutube.tsx';
import DndYouTube from './DndYoutube.tsx';
//How many imports? //Yes

interface MediaItem {
  type: 'image' | 'video' | 'audio' | 'text' | 'youtube';
  src: string;
  name: string;
  text?: string;
}

interface MediaPosition {
  x: number;
  y: number;
}

const DndBoard: React.FC = () => {
  
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [positions, setPositions] = useState<MediaPosition[]>([]);
  const [initialPositions, setInitialPositions] = useState<MediaPosition[]>([]);
  const [dragging, setDragging] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const [drawingMode, setDrawingMode] = useState(false);

  const [isInteractable, setIsInteractable] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', handleDelete);

    return () => {
      document.removeEventListener('keydown', handleDelete);
    };
  });

  const handleDrawingToggle = () => {
    setDrawingMode(!drawingMode);
    setIsInteractable((prev) => !prev);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setSelected(index);
    setDragging(index);

    const offSetX = e.nativeEvent.offsetX;
    const offSetY = e.nativeEvent.offsetY;

    setInitialPositions([
      ...initialPositions,
      {
        x: offSetX,
        y: offSetY,
      },
    ]);
  };
  
  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMediaClick = (index: number) => {
    setSelected(index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging !== null) {
      const updatedPositions = [...positions];
      updatedPositions[dragging] = {
        x: e.clientX - initialPositions[dragging].x,
        y: e.clientY - initialPositions[dragging].y,
      };
      setPositions(updatedPositions);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleYoutubeLink = (link: string) => {
    const type: MediaItem['type'] = 'youtube';
    const defaultPosition: MediaPosition = { x: 0, y: 0 };
  
    const newItem: MediaItem = {
      type,
      src: link,
      name: 'YouTube Video', // You can customize the name as needed
    };
  
    setMedia((prevMedia) => [...prevMedia, newItem]);
    setPositions([...positions, defaultPosition]);
    setInitialPositions([...initialPositions, defaultPosition]);
  };

  const handleDrop = (eve: React.DragEvent<HTMLDivElement>) => {

    eve.preventDefault();
  
    const files = eve.dataTransfer.files;
  
    for (let i = 0; i < files.length; i++) {

      const file = files[i];
      const maxSize = 1024 * 1024 * 24; // 24MB
  
      if (file.size > maxSize) {
        console.warn('File size exceeds 24MB:', file.name);
        continue;
      }
  
      let type: MediaItem['type'];
      const defaultPosition: MediaPosition = { x: 0, y: 0 };
      console.log("bugabugabuga");
      if (file.type === 'text/plain') {

        const reader = new FileReader();
        type = 'text';

        reader.onload = (event) => {

          const textContent = event.target?.result as string;

          if(isValidYoutubeLink(textContent)) {
            type='youtube';
            console.log("debug is on");
          }
          console.log("debug is the table");
          const newItem: MediaItem = {
            type,
            src: URL.createObjectURL(file),
            name: file.name,
            text: textContent,
          };
  
          setMedia((prevMedia) => [...prevMedia, newItem]);
          setPositions([...positions, defaultPosition]);
          setInitialPositions([...initialPositions, defaultPosition]);
        };

        reader.readAsText(file);

        return;
      }
  
      if (file.type.startsWith('image/')) {
        type = 'image';
      } else if (file.type.startsWith('audio/')) {
        type = 'audio';
        defaultPosition.x = 40;
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      } else {
        console.warn('Unsupported file format:', file.name);
        continue;
      }
  
      const newItem: MediaItem = {
        type,
        src: URL.createObjectURL(file),
        name: file.name,
      };

      setMedia((prevMedia) => [...prevMedia, newItem]);
      setPositions([...positions, defaultPosition]);
      setInitialPositions([...initialPositions, defaultPosition]);
    }
  };

  const handleDelete = (event: KeyboardEvent) => {
    if (event.key === 'Delete' && selected !== null) {
      setMedia((prevMedia) => prevMedia.filter((_, index) => index !== selected));
      setPositions((prevPositions) => prevPositions.filter((_, index) => index !== selected));
      setInitialPositions((prevInitialPositions) => prevInitialPositions.filter((_, index) => index !== selected));
      setSelected(null);
    }
  };

  const handleTextChange = (index: number, newText: string) => {
    const updatedMedia = [...media];
    updatedMedia[index].text = newText;
    setMedia(updatedMedia);
  };

  return (
    <div
      className="drop-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {media.map((item, index) => {
        const isSelected = selected === index;

        const style: CSSProperties = {
          position: 'absolute',
          left: positions[index]?.x || 0,
          top: positions[index]?.y || 0,
          cursor: dragging === index ? 'grabbing' : 'grab',
          border: isSelected ? '1px solid purple' : 'none',
          padding: '12px',
          pointerEvents: isInteractable ? 'auto' : 'none', // Use pointer-events property
          zIndex: 1,
        };

        return item.type === 'image' ? (
          <DndImage
            key={index}
            src={item.src}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onClick={() => handleMediaClick(index)}
          />
        ) : item.type === 'video' ? (
          <DndVideo
            key={index}
            src={item.src}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onClick={() => handleMediaClick(index)}
          />
        ) : item.type === 'audio' ? (
          <DndAudio
            key={index}
            src={item.src}
            name={item.name}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onClick={() => handleMediaClick(index)}
          />
        ) : item.type === 'text' ? (
          <DndText
            key={index}
            text={item.text || ''}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onTextChange={(newText) => handleTextChange(index, newText)}
          />
          ) : (
            <DndYouTube
              key={index}
              videoUrl={item.text || ''}
              style={style}
              isSelected={isSelected}
              onMouseDown={(e) => handleMouseDown(e, index)}
              onClick={() => handleMediaClick(index)}
            />
          );
      })}

      <DrawingBoard
        dimensions={{ width: window.innerWidth, height: window.innerHeight }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
        drawingMode={drawingMode}
      />
      
      <button
        onClick={handleDrawingToggle}
        style={{
          position: 'absolute', top: 8, right: 80,
          zIndex: 3,
          padding: '8px 14px',
          backgroundColor: drawingMode ? '#ff5b5b' : '#444444',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {drawingMode ? 'Draw ON' : 'Draw OFF'}
      </button>

      <InputYoutube onLinkSubmit={handleYoutubeLink} />
    </div>
  );
};

export default DndBoard;
export { MediaItem, MediaPosition };