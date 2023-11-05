// 'use client'
// import React, { useState, useEffect } from 'react';
// import API_URL from '@/constants';
// import BackButton from '@/components/BackButton';
// import Navigation from '@/components/Navigation';

// interface FAQEntry {
//   question: string;
//   answer: string;
// }

// // Dummy data defined outside
// const DUMMY_FAQ_DATA: FAQEntry[] = [
//   {
//     question: "What is a dummy question 1?",
//     answer: "This is a dummy answer 1.",
//   },
//   {
//     question: "What is a dummy question 2?",
//     answer: "This is a dummy answer 2.",
//   },
// ];

// const FAQList: React.FC = () => {
//   const [faqData, setFaqData] = useState<FAQEntry[] | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [visibleAnswerIndex, setVisibleAnswerIndex] = useState<number | null>(null);

//   // Moved inside the component
//   const toggleAnswerVisibility = (index: number) => {
//     if (visibleAnswerIndex === index) {
//       setVisibleAnswerIndex(null);
//     } else {
//       setVisibleAnswerIndex(index);
//     }
//   };

//   useEffect(() => {
//     fetch(API_URL[1] + '/get-faq')
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok: ' + response.statusText);
//         }
//         return response.json();
//       })
//       .then(data => {
//         setFaqData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         setError(error.toString());
//         // setFaqData(DUMMY_FAQ_DATA);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return <div className="text-xl font-bold text-center mt-20">Loading...</div>;
//   }

//   if (!faqData || faqData.length === 0) {
//     return <div className="text-xl font-bold text-center mt-20">No data</div>;
//   }

//   return (
//     <div className="px-10 bg-[#8875C0] w-screen min-h-screen">
//         <Navigation/> 

//       <div className="relative text-center inline-block mt-12"> 
//         <h1 className='text-8xl'>FAQ</h1>
//         <div className='w-full h-6 bg-[#7F53FF] ' ></div>
//       </div>
//       <ul className='ml-auto mt-8  w-1/2'>
//       {faqData.map((faq, index) => (
//         <li key={index} className="mb-5 text-xl ">
//           <h3 className="flex justify-between ">
//             {faq.question}
//             <button 
//               onClick={() => toggleAnswerVisibility(index)}
//               className="h-4 aspect-square"
//             >
//               {visibleAnswerIndex === index ? '+' : '-'}
//             </button>
//           </h3>
//           <div className='w-full h-2 bg-[#7F53FF] mt-2 mb-6'></div>
//           {visibleAnswerIndex === index && (
//             <p className="text-black opacity-60">{faq.answer}</p>
//           )}
//         </li>
//       ))}
//       </ul>
//     </div>
//   );
// };

// export default FAQList;
