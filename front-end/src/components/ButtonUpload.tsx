import React, { useRef, ChangeEvent } from 'react';

interface ButtonUploadProps {
  onUpload: (files: FileList | null) => void;
}

const ButtonUpload: React.FC<ButtonUploadProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    onUpload(files);
  };

  return (
    <div>
      <button onClick={handleClick}>Select Files</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        multiple
      />
    </div>
  );
};

export default ButtonUpload;
