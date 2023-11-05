// 'use client'
// import React, { useState, useEffect, useRef } from 'react';
// import API_URL from '@/constants';
// import ChatBox from '@/components/ChatBox';

// type MessageType = {
//   sender: 'user' | 'bot';
//   content: string;
// };

// export default function Chatbot() {
//   const [messages, setMessages] = useState<MessageType[]>([]);
//   const [inputValue, setInputValue] = useState<string>('');
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   const handleSendMessage = () => {
//     if (inputValue.trim() !== '') {
//       const userMessage: MessageType = { sender: 'user', content: inputValue };
//       setMessages(prev => [...prev, userMessage]);
//       setInputValue('');

//       fetch(API_URL[0] + '/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ query: inputValue }),
//       })
//         .then(response => response.json())
//         .then(data => {
//           const botMessage: MessageType = { sender: 'bot', content: data.response };
//           setMessages(prev => [...prev, botMessage]);
//         })
//         .catch(error => console.error('Error:', error));
//     }
//     // const botMessage: MessageType = { sender: 'bot', content: "jfkljjjjjjkj hkj hkj jjjjkj hkj hkj  hj h kjh  kjgjfg kj h k jio o h jfkljjjjjjkj hkj hkj hj h kjh  kjgjfg kj h k jio o h jfkkjkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkljjjjjjkj hkj hkj hj h kjh  kjgjfg kj h k jio o h " };
//     //     setMessages(prev => [...prev, botMessage]);
// };


//   useEffect(() => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <main className="border p-4 flex flex-col h-screen px-10">
//       <div className="overflow-y-auto py-2 grid gap-y-2">
//       {messages.map((message, index) => (
//         <div key={index} className={`${message.sender === 'bot' ? 'text-left' : 'text-right'}`}>
//           <span className={`inline-block p-2 rounded max-w-1/2 ${message.sender === 'bot' ? 'bg-gray-300' : 'bg-[#7F53FF] text-white'}`}>
//             {message.content}
//           </span>
//         </div>
//       ))}
//         <div ref={bottomRef}></div>
//       </div>
//         <ChatBox
//           inputValue={inputValue}
//           onInputChange={setInputValue}
//           onSend={handleSendMessage}
//         />
      
//     </main>
//   );
// };

