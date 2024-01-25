import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { isValidYoutubeLink } from './urlValidator.tsx';
import './InputYoutube.css'

interface InputYoutubeProps {
  onLinkSubmit: (link: string) => void;
}

const isValidImageUrl = (url: string): boolean => {
  const supportedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
  const lowerCaseUrl = url.toLowerCase();
  return supportedExtensions.some(ext => lowerCaseUrl.endsWith(ext));
};

const InputYoutube: React.FC<InputYoutubeProps> = ({ onLinkSubmit }) => {

  const [inputValue, setInputValue] = useState<string>('');
  const [isValidLink, setIsValidLink] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsValidLink(true); // Reset validation when typing
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      if (isValidYoutubeLink(inputValue)) {
        onLinkSubmit(inputValue);
        setInputValue('');
      }else if(isValidImageUrl(inputValue)){
        onLinkSubmit(inputValue);
        setInputValue('');
      } else {
        setIsValidLink(false);
        setTimeout(() => {
          setIsValidLink(true);
          if (inputRef.current) {
            inputRef.current.focus();
          }
        }, 5000);
      }
    }
  };  

  return (
    <div className={`input-youtube ${isValidLink ? '' : 'invalid'}`}>
      <input
        type="text"
        placeholder={isValidLink ? 'Enter Youtube-link' : 'Invalid link'}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        ref={inputRef}
      />
    </div>
  );
};

export default InputYoutube;