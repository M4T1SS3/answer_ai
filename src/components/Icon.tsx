import React from 'react';

export enum IconType {
  Copy,
  Save,
  Magic,
  Delete,
  Smile,
  Send,
  Check,
  GoBack, 
}

interface IconProps {
  type: IconType;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ type,  onClick}) => {
  const renderIcon = () => {
    switch (type) {
      case IconType.Copy:
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M16 1H4C2.897 1 2 1.897 2 3v14h2V3h12V1z"/>
            <path d="M20 5H8c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2zM8 21V7h12l.002 14H8z"/>
          </svg>
          
        );
      case IconType.Save:
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17 3H5C3.897 3 3 3.897 3 5v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2V7l-6-4zM5 19V5h10.995v4H19l.001 10H5z"/>
            <path d="M10 14H8v-4h2v4zm6 0h-2v-4h2v4z"/>
          </svg>
          
        );
        case IconType.Magic:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32">
                    <path d="M16,8 L18,14 L22,16 L18,18 L16,24 L14,18 L10,16 L14,14 L16,8" fill="currentColor"/>
                </svg>
            );
        
      case IconType.Delete:
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M5 11h14v2H5z"/>
            <path d="M15 4h-2v2H7v2h10V6h-2V4z"/>
            <path d="M19 9H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H5v-8h14v8z"/>
          </svg>
          
        );
      case IconType.Send:
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 21l21-9-21-9v7l15 2-15 2v7z"/>
          </svg>
          
        );
    case IconType.Smile:
        return (
            <svg width="100%" height="100%" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26.7011 3.31697C26.7011 1.8907 27.9998 3.4198 27.7957 4.63424C27.6072 5.75594 26.4797 5.6425 26.4797 4.48788" stroke="black" stroke-width="4" stroke-linecap="round"/>
              <path d="M9.22138 2.57503C9.22138 1.14876 10.5201 2.67786 10.316 3.8923C10.1275 5.01399 9 4.90056 9 3.74594" stroke="black" stroke-width="4" stroke-linecap="round"/>
              <path d="M2.40015 14.512C6.38596 14.7216 10.4876 16.2645 14.4386 17.0045C18.1118 17.6924 22.2171 17.6629 25.8102 16.4506C28.0088 15.7088 30.4811 15.2315 32.7358 14.7098C34.0873 14.3972 35.8349 13.4438 37.1818 13.4438" stroke="black" stroke-width="4" stroke-linecap="round"/>
            </svg>

        )
        case IconType.Check:
        return (
            <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7"></path>
            </svg>
        );
        case IconType.GoBack:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 11H6.414l5.293-5.293-1.414-1.414L3.586 12l6.707 6.707 1.414-1.414L6.414 13H21v-2z"/>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-10 h-10 grid place-items-center rounded-lg cursor-pointer bg-[#000000] text-white hover:bg-primary" onClick={onClick}>
      {renderIcon()}
    </div>
  );
};

export default Icon;
