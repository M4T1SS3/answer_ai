'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function FeatureMenu() {
    const router = useRouter();
    const { data: session, status } = useSession({
      required: true,
      onUnauthenticated() {
        router.push('/signin');
      },
    });
    
   
    return (
        <main className="relative w-screen h-screen grid place-items-center">
            <section>
                <ul className="flex flex-row space-x-4 p-6 rounded-md">
                    <MenuItem
                        href="/knowledge"
                        text="Wissensbank"
                        iconPaths="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM16 3H8a5 5 0 000 10h8a5 5 0 100-10z"
                    />
                    <MenuItem
                        href="/ask"
                        text="Frage stellen"
                        iconPaths="M3 3v18h18V3H3zm3 3h12v12H6V6zm2 2v8h8V8H8z"
                    />
                </ul>
            </section>
        </main>
    );
}



interface MenuItemProps {
    href: string;
    text: string;
    iconPaths: string;
    iconCircle?: { cx: string, cy: string, r: string };
}

const MenuItem: React.FC<MenuItemProps> = ({ href, text, iconPaths, iconCircle }) => {
    const locale = "de";
    const translationMap: {[key: string]: {[key: string]: string}} = {
        'en-US': {
            'Wissensbank': 'Knowledge Base',
            'Frage stellen': 'Ask A Question',
        },
        'de': {
            'Wissensbank': 'Wissensbank',
            'Frage stellen': 'Frage stellen',
        },
    };

    const translatedText = translationMap[locale][text]; 
    
    return (
        <li className="bg-gray-200 p-2 w-[216px] h-[336px] rounded-md relative">
            <a href={href} className="grid place-items-end space-x-2 h-full">
                <div className="absolute top-2 right-2 bg-black p-2 grid place-items-center rounded-full">
                    <svg className="w-6 h-6 text-white" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                        <path d={iconPaths} />
                    </svg>
                </div>

                <div className="">
                    <h2 className="text-black uppercase text-2xl">
                    {translatedText}
                    </h2>
                </div>
            </a>    
        </li>
    );
};


