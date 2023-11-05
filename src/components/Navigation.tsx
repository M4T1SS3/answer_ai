import Link from 'next/link';
import BackButton from './BackButton';

type LinkItemType = {
    href: string;
    label: string;
};

function LinkItem({ href, label }: LinkItemType) {
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
                    <LinkItem href="/menu" label="Go Back" />
                </div>
                <div className="flex-grow flex justify-center gap-x-4">
                    <LinkItem href="/ask" label="Ask A Question" />
                    <LinkItem href="/knowledge" label="Knowledge Base" />
                </div>
                <div className="flex-grow-0">
                </div>
            </nav>

    );
}
