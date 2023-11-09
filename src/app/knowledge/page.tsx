'use client';
import { useState,useEffect } from "react";
import QAForm from "@/components/QAForm";
import QACard from "@/components/QACard";

import QAPair from "@/types/types";

import API_URL from "@/constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";




export default function KnowledgeBase() {
    let [pairs, setPairs] = useState<QAPair[]>([]);
    let [openForm, setOpenForm] = useState(false)
    const [editPair, setEditPair] = useState<QAPair | null>(null);

    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/signin');
      },
    });

    

    useEffect(() => {
        fetch(API_URL[1] + '/get-knowledge-base')  // Replace with your actual API URL
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                setPairs(data); // Assuming the data structure matches your QAPair type
                // setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching knowledge base:', error);
                // setError(error.toString());
                // setLoading(false);
            });
    }, []);

    const handleAddPair = async (newQuestion: string, newAnswer: string) => {
        const newPair = {
            question: newQuestion,
            answer: newAnswer,
        };
    
        try {
            const response = await fetch(API_URL[1] + '/add-pair', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPair),
            });
    
            const createdPair = await response.json();
    
            setPairs(prevPairs => [...prevPairs, createdPair]);
            setEditPair(null);
            setOpenForm(false);
               
           
        } catch (error) {
            console.error('Error with the knowledge base operation:', error);
        }
        
    };
    
    
    const handleUpdatePair = (newQuestion: string, newAnswer: string) => {
        if (!editPair) return;

        const newPair: QAPair = {
            id: editPair.id,
            question: newQuestion,
            answer: newAnswer,
        };
   
        
    
        const body = JSON.stringify(newPair);
    
        fetch(API_URL[1] + '/update-pair', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        })
        .then(handleResponse)
        .then(() => {
            // Update the local state with the updated pair returned from the server.
            // Make sure your server returns the full updated pair object.
            setPairs(prevPairs => prevPairs.map(pair => 
                pair.id === editPair.id ? newPair : pair // Use the updatedPair here
            ));
            setEditPair(null);
            setOpenForm(false);
        })
        .catch(handleError);
    };

    const handleResponse = (response: Response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };

    const handleError = (error: Error) => {
        console.error('Error with the knowledge base operation:', error);
    };



    const handleEditPair = (pair: QAPair) => {
        setEditPair(pair);
        setOpenForm(true);
    };

    const handleDeletePair = (pairToDelete: QAPair) => {
        fetch(API_URL[1] + '/delete-pair', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: pairToDelete.id }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setPairs(pairs.filter(pair => pair.id !== pairToDelete.id));
        })
        .catch(error => {
            console.error('Error deleting the pair from the knowledge base:', error);
        });
        setEditPair(null)
        setOpenForm(false);
    };
    
    

    return (
            <main className="w-screen bg-[#fff] pt-16 min-h-screen">
                <section className="text-center flex flex-col items-center mb-48">
                <div className="relative inline-block">
                    <h1 className='text-3xl uppercase relative z-10'>Knowledge Base</h1>
                    <div className='absolute top-1/2 transform w-full h-6 bg-[#7F53FF] z-0'></div>
                </div>

                    <div onClick={() => setOpenForm(!openForm)} className="mt-4 h-12 w-12 bg-black rounded-full grid place-items-center cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v12m6-6H6" />
                        </svg>
                    </div>
                </section>

                {openForm && (
                        <QAForm
                            onSubmit={editPair ? handleUpdatePair : handleAddPair}
                            onGoBack={() => {
                                setOpenForm(false);
                                setEditPair(null); // Reset the edit pair
                            }}
                            pair={editPair}
                            onDelete={handleDeletePair}
                        />
                
                )}
                <div className="w-full flex justify-center">
                <ul className="flex flex-wrap gap-x-2">
                    {pairs.map((pair, index) => (
                            <QACard pair={pair} key={index} onEdit={handleEditPair} />
                    ))}
                </ul>
                </div>
            

            </main>

    );
};
