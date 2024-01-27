import React, { useState, useRef, CSSProperties } from 'react';
import { MediaItem, MediaPosition } from './DndBoard';

const ButtonUpload: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    const maxSize = 1024 * 1024 * 24; //That's 24Mb
    const file = event.target.files && event.target.files[0];

    if(!file){
        console.warn("algo de errado nao esta certo");
        return;
    }

    if (file.size > maxSize) {
        console.warn('File size exceeds 32MB:', file.name);
        return;
    }

    let type: MediaItem['type'];
    const defaultPosition: MediaPosition = {x: 0, y: 0 };

    if (file.type.startsWith('image/')) {
        type = 'image';
    } else if (file.type.startsWith('audio/')) {
        type = 'audio';
        defaultPosition.x = 40;
    } else if (file.type.startsWith('video/')) {
        type = 'video';
    } else if (file.type === 'text/plain') {
        type = 'text';
    } else {
        console.warn('Unsupported file format:', file.name);
        return;
    }
    
    const newItem: MediaItem = {
        type,
        src: URL.createObjectURL(file),
        name: file.name
    };
    
    event.target.value = '';
  };

  const style: CSSProperties = {
    position: 'fixed',
    top: 0,
    right: 0,
    margin: '10px',
    width: '40px',
    height: '40px',
    padding: 0,
    border: 'none',
    background: 'transparent'
  };

  return (
    <div className="board-button">
        
      <button
        style={style}
        onClick={handleUploadButtonClick}
      >
        <img
          src="../images/me.jpeg"
          alt="Upload Button"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </button>
      
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileInputChange}
      />
  
      {isUploadOpen && (
        <div>
          <p>Upload Window</p>
          <button onClick={() => setIsUploadOpen(false)}>Close</button>
        </div>
      )}

    </div>
  );  
};

export default ButtonUpload;