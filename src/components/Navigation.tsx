import Link from 'next/link';
import BackButton from './BackButton';
import { useRouter } from 'next/router';

type LinkItemType = {
    href: string;
    label: string;
};

function LinkItem({ href, label }: LinkItemType) {

    // const { locale } = useRouter();
    // const translationMap = {
    //   'en-US': {
    //     'Go Back': 'Go Back',
    //     'Ask A Question': 'Ask A Question',
    //     'Knowledge Base': 'Knowledge Base',
    //   },
    //   'de': {
    //     'Go Back': 'Zurück',
    //     'Ask A Question': 'Frage stellen',
    //     'Knowledge Base': 'Wissensdatenbank',
    //   },
    // };

    // const translatedLabel = translationMap[locale][label];
    return (
        <Link href={href}>
           <span className="text-[#000] text-md cursor-pointer underline-offset-2 underline uppercase">
            {label}
            </span>
        </Link>
    )
}

export default function Navigation() {
    return (
            <nav className="flex items-center justify-between w-full py-4 px-6 bg-gray-200">
                <div className="flex-grow-0">
                    <LinkItem href="/menu" label="Zurück" />
                </div>
                <div className="flex-grow flex justify-center gap-x-4">
                    <LinkItem href="/ask" label="Frage stellen" />
                    <LinkItem href="/knowledge" label="Wissensbank" />
                </div>
                <div className="flex-grow-0">
                </div>
            </nav>

    );
}
