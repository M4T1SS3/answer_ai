import React, { useState } from 'react';
import QAPair from '@/types/types';
import Icon, { IconType } from '@/components/Icon'; // Adjust the import path as needed

type QACardProps = {
    pair: QAPair;
    onEdit: (pair: QAPair) => void;
    key: number
};

const QACard: React.FC<QACardProps> = ({ pair, onEdit,key }) => {
    const [copied, setCopied] = useState(false);

    const handleCopyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 3000); // Reset after 3 seconds
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <li key={key} onClick={() => onEdit(pair)} className="bg-purple-200 rounded-lg p-4 my-2 w-60 h-56 relative flex flex-col justify-end cursor-pointer">
            <button className="absolute top-0 right-0 p-2" onClick={() => onEdit(pair)}>
                <span>•••</span>
            </button>
            <button className="absolute top-0 left-0 p-2" onClick={() => handleCopyToClipboard(pair.answer)}>
                {copied ? (
                    <Icon type={IconType.Check} />
                ) : (
                    <Icon type={IconType.Copy} />
                )}
            </button>
            <div className="text-left">
                <h3 className="line-clamp-3 mb-2 font-medium leading-tight">{pair.question}</h3>
                <p className='text-sm opacity-40 line-clamp-2'>{pair.answer}</p>
            </div>
        </li>
    );
};

export default QACard;
