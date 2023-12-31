'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import API_URL from '@/constants';
import ChatBox from '@/components/ChatBox';
import Icon, { IconType } from '@/components/Icon';
import QAForm from '@/components/QAForm';
import Image from 'next/image';

import Smile from '../../assets/icons/smile.svg'
import { signIn, useSession } from 'next-auth/react';
import { data } from 'autoprefixer';


export default function QuestionAnswerComponent() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [originalAnswer, setOriginalAnswer] = useState(''); // State to hold the original answer
  const [enhanced, setEnhanced] = useState(false);
  const [hasCopied, setHasCopied] = useState(false); 
  const [loading, setLoading] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/signin');
    },
  });

    
useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (hasCopied) {
        timeoutId = setTimeout(() => setHasCopied(false), 3000);
    }
    return () => {
        if (timeoutId) clearTimeout(timeoutId);
    };
}, [hasCopied]);

const handleQuestionSubmit = async () => {
  if (question.trim() === '') return;
  setLoading(true);

  try {
    const response = await fetch( API_URL[1] + '/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: question })
    });
    if (!response.ok) throw new Error('Response not okay');
    const data = await response.text();
    setAnswer(data);

  } catch (error) {
    console.error('Error:', error);
    setAnswer('Sorry, there was an error processing your request.');
  } finally {
    setLoading(false);
  }
};

const handleEnhanceAnswer = async () => {
  if (!question || !answer || question.trim() === '' || answer.trim() === '') return;
  setLoading(true);
  setOriginalAnswer(answer);
  try {
      const response = await fetch(API_URL[1] + '/enhance', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: question, 
            answer: answer
        })
      });

      if (!response.ok) throw new Error('Response not okay');
      let data = await response.text();
  
  
      setAnswer(data);
      setEnhanced(true);

  } catch (error) {
      console.error('Error:', error);
  } finally {
      setLoading(false);
  }
};
const handleGoBackToOriginal = () => {
  setAnswer(originalAnswer); // Revert to the original answer
  setEnhanced(false); // Update the state to indicate the answer is not enhanced
};

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setHasCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const handleSave = () => {
    setIsFormVisible(true); // Show the form
  };

  const handleSubmit = async () => {

    try {
        const response = await fetch(API_URL[1] + '/add-pair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question, answer })
        });

        if (!response.ok) throw new Error('Response not okay');

        const data = await response.json();
        // Show a success message or perform other actions as needed
    } catch (error) {
        console.error('Error while saving to knowledge base:', error);
    }

    setAnswer("")
    setQuestion("")
    setIsFormVisible(false); // Hide the form after submit
};


  const handleGoBack = () => {
    setIsFormVisible(false); // Hide the form without saving
  };

 

  return (
    <main className='bg-blue-50 grid place-items-center w-screen h-screen'>
   <section className="p-4 md:w-3/6 w-full h-full md:h-auto">
   <div className='mb-1 text-gray-600'>Antwort</div>

        <div className="mb-4 p-2 bg-blue-200 rounded-md flex flex-col justify-between">
            <div className='flex flex-row justify-end'>
              {/* <div className='rounded-full bg-[#7F53FF] h-10 w-10 grid place-items-center p-1'>
                <svg width="100%" height="100%" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M26.7011 3.31697C26.7011 1.8907 27.9998 3.4198 27.7957 4.63424C27.6072 5.75594 26.4797 5.6425 26.4797 4.48788" stroke="black" stroke-width="4" stroke-linecap="round"/>
                  <path d="M9.22138 2.57503C9.22138 1.14876 10.5201 2.67786 10.316 3.8923C10.1275 5.01399 9 4.90056 9 3.74594" stroke="black" stroke-width="4" stroke-linecap="round"/>
                  <path d="M2.40015 14.512C6.38596 14.7216 10.4876 16.2645 14.4386 17.0045C18.1118 17.6924 22.2171 17.6629 25.8102 16.4506C28.0088 15.7088 30.4811 15.2315 32.7358 14.7098C34.0873 14.3972 35.8349 13.4438 37.1818 13.4438" stroke="black" stroke-width="4" stroke-linecap="round"/>
                </svg>
                </div> */}
                <div className='flex justify-center gap-x-1'>
                      {(enhanced && answer.trim() !== "")  ? (
                        <Icon type={IconType.GoBack} onClick={handleGoBackToOriginal}/>
                      ):<Icon type={IconType.Magic} onClick={handleEnhanceAnswer}/>} 
                      
                      <Icon type={IconType.Save} onClick={handleSave}/>
                      {hasCopied ? (
                          <Icon type={IconType.Check}/>
                      ) : (
                        <Icon type={IconType.Copy} onClick={() => copyToClipboard(answer)} />

                      )}
                </div>
            </div>
            <textarea
                className='w-full p-2 h-full text-sm bg-transparent border-none outline-none resize-none'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Schreibe deine Stichpunkte hier rein'
                rows={11}
            />

        </div>
        <div className="w-full">
        <div className='mb-1 text-gray-600'>Frage</div>

        <ChatBox
            inputValue={question}
            onInputChange={setQuestion}
            onSend={handleQuestionSubmit}
            isLoading={loading}
        />
        </div>
    </section>
    {isFormVisible && (
        <QAForm
          pair={{ question, answer }} // Pass current question and answer
          onSubmit={handleSubmit}
          onGoBack={handleGoBack}
         // Pass this if deletion functionality is needed
        />
      )}
</main>

  );
}
