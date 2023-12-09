import React, { useState, useRef } from 'react';
import API_URL from '@/constants';
import LoadingAnimation from './LoadingAnimation';

type FileTypes = 'json' | 'csv';
type UploadDataProps = {
  setDataUploaded: (value: boolean) => void;
};

export default function UploadData({ setDataUploaded }: UploadDataProps) {

  const [fileType, setFileType] = useState<FileTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null); //

  const detectFileType = (fileName: string) => {
    const fileExtension = fileName.split('.').pop()?.toLowerCase();
    return fileExtension === 'json' ? 'json' :
           fileExtension === 'csv' ? 'csv' : null;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>) => {
    const file = e.type === 'drop' 
               ? (e as React.DragEvent<HTMLDivElement>).dataTransfer.files[0] 
               : (e as React.ChangeEvent<HTMLInputElement>).target.files?.[0];

    if (!file) return;

    const detectedFileType = detectFileType(file.name);
    if (!detectedFileType) {
      console.warn('Unsupported file type.');
      return;
    }

    setFileType(detectedFileType);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        if (detectedFileType === 'json') {
          try {
            const jsonData = JSON.parse(content);
            sendDataToAPI(jsonData);
          } catch {
            console.warn('Error parsing JSON.');
            return;
          }
        } else if (detectedFileType === 'csv') {
          // You may want to further process CSV data here
          sendDataToAPI(content);
        }
      }
    };

    reader.readAsText(file, 'UTF-8');
  };

  const sendDataToAPI = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch(API_URL[0] + "/create-knowledge-base", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      if (response.ok) {
        setDataUploaded(true)
      } else {
        console.warn('API Error:', responseData);
      }

    } catch (error) {
      console.error('Failed to upload data:', error);
    }
    setLoading(false);
  };

  const handleDivClick = () => {
    fileInputRef.current?.click(); // Safe navigation operator
  };

  return (
    <section className='text-center'>
      <h2 className='text-3xl mb-12'>DROP YOUR DATA</h2>
      <div
        className="bg-[#A98BFF] h-96 w-96 rounded-2xl p-8 cursor-pointer text-center"
        onClick={handleDivClick}
        onDrop={handleFileChange}
        onDragOver={(e) => e.preventDefault()}
      >
        <div className='bg-[#CAB9FD] w-full h-full rounded-xl p-4'>
          <div className='border-dashed border-[#A98BFF] border-2 w-full h-full rounded-lg'></div>
        </div>
        <input
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept=".json, .csv"
          onChange={handleFileChange}
          id="fileInput"
        />
      </div>
    </section>
  );
}
