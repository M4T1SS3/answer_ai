'use client';
import React, { useRef, useEffect } from 'react';
import Icon,  { IconType } from './Icon';

type SearchBoxProps = {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
};

const ChatBox: React.FC<SearchBoxProps> = ({ inputValue, onInputChange, onSend, isLoading }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '32px'; // Temporarily reset height to shrink if needed
      textareaRef.current.style.height = `${Math.max(textareaRef.current.scrollHeight, 32)}px`; // Set new height based on content
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [inputValue]);

  useEffect(() => {
    // Resize on initial render
    if (textareaRef.current) {
      textareaRef.current.style.height = '32px'; // Adjust based on your CSS for single line height
    }
  }, []);

  return (
    <div className="flex w-full bg-gray-200 rounded-md p-2">
      <textarea
        ref={textareaRef}
        className="flex-grow p-2 rounded-sm border-0 focus:ring-0 bg-gray-200 text-sm resize-none"
        style={{ outline: 'none', overflowY: 'hidden' }}
        value={inputValue}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent default action (new line)
            onSend();
          }
        }}
        placeholder="Schreibe deine Frage"
      />
      <div className='grid place-content-end'>
      <div className="w-10 h-10 grid place-items-center rounded-lg cursor-pointer bg-[#000000] text-white" >
      {isLoading ? (
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
              <Icon type={IconType.Send} onClick={onSend}/>
            )}
        </div>
          </div>
      </div>
      );
     
    };

export default ChatBox;
