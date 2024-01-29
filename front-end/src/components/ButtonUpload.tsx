import React, { useRef, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface ButtonUploadProps {
  onUpload: (files: FileList | null) => void;
}

const ButtonUpload: React.FC<ButtonUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onUpload(files);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '8px',
        right: '18px',
      }}
    >
      <label
        style={{
          backgroundColor: '#555555',
          color: '#ffffff',
          padding: '10px 15px',
          cursor: 'pointer',
          borderRadius: '5px',
          display: 'inline-flex',
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          multiple
        />
        <FontAwesomeIcon icon={faUpload} />
      </label>
    </div>
  );
};

export default ButtonUpload;
