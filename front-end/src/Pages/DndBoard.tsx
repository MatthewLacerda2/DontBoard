import React, { useEffect, useState, CSSProperties } from 'react';
import DndImage from '../components/DndComponents/DndImage.tsx';
import DndVideo from '../components/DndComponents/DndVideo.tsx';
import DndAudio from '../components/DndComponents/DndAudio.tsx';
import DndText from '../components/DndComponents/DndText.tsx';
import { isValidYoutubeLink, isValidImageUrl } from '../Utils/urlValidator.tsx';
import DrawingBoard from '../components/Drawer/DrawingBoard.tsx';
import InputLink from '../components/InputLink.tsx';
import DndYouTube from '../components/DndComponents/DndYoutube.tsx';
import '../App.css';
import ButtonUpload from '../components/ButtonUpload.tsx';
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
    e.preventDefault();
    
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
    e.preventDefault();
    
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
      name: 'YouTube Video',
      text: link
    };

    if(isValidImageUrl(link)){
      newItem.type='image';
      newItem.name='imageURL';
    }

    setMedia((prevMedia) => [...prevMedia, newItem]);
    setPositions([...positions, defaultPosition]);
    setInitialPositions([...initialPositions, defaultPosition]);
  };

  const handleDrop = (eve: React.DragEvent<HTMLDivElement>) => {
    eve.preventDefault();
  
    handleUpload(eve.dataTransfer.files);
  };
  
  const getAllowedExtensions = (type: string): string => {
    switch (type) {
      case 'image':
        return '.jpg, .jpeg, .png, .gif';
      case 'video':
        return '.mp4';
      case 'audio':
        return '.mp3';
      default:
        return '';
    }
  };

  const handleUpload = (files: FileList | null) => {
    if (!files) {
      return;
    }
  
    const maxMediasNumber = 64;
  
    if (media.length + files.length > maxMediasNumber) {
      alert("Maximum number of media files reached");
      return;
    }
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const maxMB = 24;
      const maxSize = 1024 * 1024 * maxMB;
  
      if (file.size > maxSize) {
        console.warn(`File size exceeds ${maxMB}MB:`, file.name);
        alert(`File size exceeds ${maxMB}MB: ${file.name}`);
        continue;
      }
  
      let type: MediaItem['type'];
      const defaultPosition: MediaPosition = { x: 0, y: 0 };
  
      const extension = file.name.split('.').pop()?.toLowerCase();
  
      if (file.type === 'text/plain') {
        const reader = new FileReader();
        type = 'text';
  
        reader.onload = (event) => {
          const textContent = event.target?.result as string;
  
          if (isValidYoutubeLink(textContent)) {
            type = 'youtube';
          }
  
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
        continue;
      }
  
      if (file.type.startsWith('image/')) {
        type = 'image';
      } else if (file.type.startsWith('audio/')) {
        type = 'audio';
        defaultPosition.x = 40;
      } else if (file.type.startsWith('video/')) {
        type = 'video';
      } else {
        alert("Unsupported file format");
        continue;
      }
  
      if (type === 'image' && ['jpg', 'jpeg', 'png', 'gif'].includes(extension as string)) {
        type = 'image';
      } else if (type === 'video' && extension === 'mp4') {
        type = 'video';
      } else if (type === 'audio' && extension === 'mp3') {
        type = 'audio';
        defaultPosition.x = 40;
      } else {
        alert(`Only ${getAllowedExtensions(type)} are allowed for ${type}`);
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
          zIndex: isSelected ? 2 : 1
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

      <InputLink onLinkSubmit={handleYoutubeLink} />

      <ButtonUpload onUpload={handleUpload} />

      <button
        onClick={handleDrawingToggle}
        style={{
          position: 'absolute', top: 11, right: 80,
          zIndex: 999,
          padding: '8px 14px',
          backgroundColor: drawingMode ? '#ff5b5b' : '#555555',
          color: '#ffffff',
          border: 'none',
          borderRadius: '5px',
          fontWeight: 'bold',
          cursor: 'pointer',
        }}
      >
        {drawingMode ? 'Draw ON' : 'Draw OFF'}
      </button>

      <DrawingBoard
        dimensions={{ width: window.innerWidth, height: window.innerHeight }}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 99 }}
        drawingMode={drawingMode}
      />

    </div>
  );
};

export default DndBoard;
export { MediaItem, MediaPosition };