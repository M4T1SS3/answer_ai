import Link from 'next/link';
import BackButton from './BackButton';
import { useRouter } from 'next/router';

type LinkItemType = {
    href: string;
    label: string;
};

function LinkItem({ href, label }: LinkItemType) {

    const locale = "de";
    const translationMap: {[key: string]: {[key: string]: string}} = {
        'en-US': {
            'Go Back': 'Go Back',
            'Ask A Question': 'Ask A Question',
            'Knowledge Base': 'Knowledge Base',
        },
        'de': {
            'Go Back': 'Zurück',
            'Ask A Question': 'Frage stellen',
            'Knowledge Base': 'Wissensdatenbank',
        },
    };

    const translatedLabel = translationMap[locale][label];

    return (
        <Link href={href}>
           <span className="text-[#000] text-sm md:text-md cursor-pointer underline-offset-2 underline uppercase">
                {translatedLabel}
            </span>
        </Link>
    )
}

export default function Navigation() {
    return (
            <nav className="flex items-center justify-between w-full py-4 px-6 bg-purple-100">
                {/* <div className="flex-grow-0">
                    <LinkItem href="/menu" label="Go Back" />
                </div> */}
                <div className="flex-grow flex justify-center gap-x-4">
                <LinkItem href="/knowledge" label="Knowledge Base" />

                    <LinkItem href="/ask" label="Ask A Question" />
                </div>
                <div className="flex-grow-0">
                </div>
            </nav>

    );
}
