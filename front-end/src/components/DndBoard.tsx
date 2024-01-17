import React, { useEffect, useState, CSSProperties } from 'react';
import DndImage from './DndImage';
import DndVideo from './DndVideo';
import DndAudio from './DndAudio';
import DndText from './DndText';
import '../App.css';

interface DndMediaProps {
  name: string;
  src: string;
  style: CSSProperties;
  isSelected: boolean;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

interface MediaItem {
  type: 'image' | 'video' | 'audio' | 'text';
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
  const [dragging, setDragging] = useState<number | null>(null);
  const [initialPositions, setInitialPositions] = useState<MediaPosition[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const handleDelete = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selected !== null) {
        setMedia((prevMedia) => prevMedia.filter((_, index) => index !== selected));
        setPositions((prevPositions) => prevPositions.filter((_, index) => index !== selected));
        setInitialPositions((prevInitialPositions) => prevInitialPositions.filter((_, index) => index !== selected));
        setSelected(null);
      }
    };
  
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
  
      // Check if the clicked element is outside the selected item
      if (selected !== null && !target.closest('.draggable-media')) {
        setSelected(null);
      }
    };
  
    document.addEventListener('keydown', handleDelete);
    document.addEventListener('click', handleDocumentClick);
  
    return () => {
      document.removeEventListener('keydown', handleDelete);
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [selected]);  

  const handleMediaClick = (index: number) => {
    setSelected(index);
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging !== null) {
      e.preventDefault();

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

  const handleTextChange = (index: number, newText: string) => {
    const updatedMedia = [...media];
    updatedMedia[index].text = newText;
    setMedia(updatedMedia);
  };  

  const handleDrop = (eve: React.DragEvent<HTMLDivElement>) => {
    eve.preventDefault();

    if (dragging !== null) {
      return;
    }
  
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
  
      if (file.type.startsWith('image/')) {
        type = 'image';
      } else if (file.type.startsWith('audio/')) {
        type = 'audio';
        defaultPosition.x = 40;
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      } else if (file.type === 'text/plain') {
        type = 'text';
        // Read the text content of the text file
        const reader = new FileReader();
        reader.onload = (event) => {
          const textContent = event.target?.result as string;
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
      } else {
        console.warn('Unsupported file format:', file.name);
        continue;
      }
  
      if (type !== 'text') {
        const newItem: MediaItem = {
          type,
          src: URL.createObjectURL(file),
          name: file.name,
        };
  
        setMedia((prevMedia) => [...prevMedia, newItem]);
        setPositions([...positions, defaultPosition]);
        setInitialPositions([...initialPositions, defaultPosition]);
      }
    }
  };

  return (
    <div
      className="drop-area"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >

    {media.length === 0 && (
      <p className='fluctuating-text'>Drag and drop your images here</p>
    )}

      {media.map((item, index) => {
        const isSelected = selected === index;

        const style: CSSProperties = {
          position: 'absolute',
          left: positions[index]?.x || 0,
          top: positions[index]?.y || 0,
          cursor: dragging === index ? 'grabbing' : 'grab',
          border: isSelected ? '1px solid purple' : 'none',
          padding: '12px'
        };

        const dndMedia: DndMediaProps = {
            name:item.name,
            src:item.src,
            style:style,
            isSelected:isSelected,
            onMouseDown:(e) => handleMouseDown(e, index),
            onClick:() => handleMediaClick(index)
        };

        return item.type === 'image' ? (
          <DndImage
            key={index}
            {...dndMedia}
          />
        ) : item.type === 'video' ? (
          <DndVideo
            key={index}
            {...dndMedia}
          />
        ) : item.type === 'audio' ?  (
          <DndAudio
            key={index}
            {...dndMedia}
          />
        ) : (
          <DndText
            key={index}
            text={item.text || ''}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onTextChange={(newText) => handleTextChange(index, newText)}
          />
        ) : (
          <DndText
            key={index}
            text={item.text || ''}
            style={style}
            isSelected={isSelected}
            onMouseDown={(e) => handleMouseDown(e, index)}
            onTextChange={(newText) => handleTextChange(index, newText)}
          />
        );
      })}
    </div>
  );
};

export default DndBoard;
export { MediaItem, MediaPosition, DndMediaProps };