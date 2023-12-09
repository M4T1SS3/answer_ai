import React, { useState, useEffect } from 'react';
import QAPair from '@/types/types';
import Icon, { IconType } from './Icon';

interface QAFormProps {
    onSubmit: (question: string, answer: string) => void;
    onGoBack: () => void;
    onDelete?: (pair: QAPair) => void;  // Add a delete function
    pair: QAPair | null;
}

const QAForm: React.FC<QAFormProps> = ({pair, onSubmit, onGoBack, onDelete }) => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    
    useEffect(() => {
        if (pair) {
            setQuestion(pair.question);
            setAnswer(pair.answer);
        } else {
            // Reset the form fields if there's no pair (e.g., for a new addition)
            setQuestion('');
            setAnswer('');
        }
    }, [pair]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(question, answer);
        setQuestion('');
        setAnswer('');
    };
    

    return (
<div className="z-[1000] fixed top-0 left-0 w-full h-full flex items-center p-2 justify-center bg-black bg-opacity-50">
    <div className='bg-white rounded-md p-4 w-full h-full md:w-1/3 md:min-w-[600px] md:h-auto'>
            <div className='flex flex-row justify-between'>
                {pair && onDelete && (
                    <Icon type={IconType.Delete} onClick={() => onDelete(pair)}/>
                )}
                 <Icon type={IconType.Close} onClick={onGoBack}/>
                 
            </div>
            <h2 className='text-2xl mt-10 mb-4'>Add Question to Knowledgebase</h2>
            <form onSubmit={handleSubmit} className='h-full'>
                <InputField
                    id="question"
                    label="Question"
                    value={question}
                    onChange={setQuestion}
                    row={1}
                />
                <InputField
                    id="answer"
                    label="Answer"
                    value={answer}
                    onChange={setAnswer}
                    row={4}
                />
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-black hover:bg-gray-800 text-white font-bold p-2 rounded-lg inline-flex items-center">
                        <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M5 13l4 4L19 7"></path>
                        </svg>
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

interface InputFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    row: number
  }
  
  const InputField: React.FC<InputFieldProps> = ({ id, label, value, onChange, row }) => {
    return (
      <div className="mb-3">
        <label htmlFor={id} className="text-sm mb-2">
          {label}:
        </label>
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none text-sm border rounded w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline"
          rows={row} // You can adjust the number of rows
        />
      </div>
    );
};

export default QAForm;
