import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { isValidYoutubeLink, isValidImageUrl } from './urlValidator.tsx';
import './InputLink.css';

interface InputYoutubeProps {
  onLinkSubmit: (link: string) => void;
}

const InputLink: React.FC<InputYoutubeProps> = ({ onLinkSubmit }) => {

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
        }, 5000);

      }
    }
  };  

  return (
    <div className={`input-youtube ${isValidLink ? '' : 'invalid'}`}>
      <input
        type="text"
        placeholder={isValidLink ? ' Enter Video/Image Link ' : 'Invalid link'}
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        ref={inputRef}
      />
    </div>
  );
};

export default InputLink;