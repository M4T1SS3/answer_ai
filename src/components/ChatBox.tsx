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
<div className="flex items-center w-full bg-gray-200 rounded-md p-2">
  {/* <div className='flex-none rounded-full bg-[#7F53FF] h-10 w-10 gplace-content-end place-items-center p-1'>
    <svg width="100%" height="100%" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26.7011 3.31697C26.7011 1.8907 27.9998 3.4198 27.7957 4.63424C27.6072 5.75594 26.4797 5.6425 26.4797 4.48788" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M9.22138 2.57503C9.22138 1.14876 10.5201 2.67786 10.316 3.8923C10.1275 5.01399 9 4.90056 9 3.74594" stroke="black" stroke-width="4" stroke-linecap="round"/>
      <path d="M2.40015 14.512C6.38596 14.7216 10.4876 16.2645 14.4386 17.0045C18.1118 17.6924 22.2171 17.6629 25.8102 16.4506C28.0088 15.7088 30.4811 15.2315 32.7358 14.7098C34.0873 14.3972 35.8349 13.4438 37.1818 13.4438" stroke="black" stroke-width="4" stroke-linecap="round"/>
    </svg>
  </div> */}
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
    placeholder="Stelle deine Frage"
  />
  <div className='flex-none grid place-content-end'>
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
