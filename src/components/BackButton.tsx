import React from 'react';
import Link from 'next/link';

const BackButton: React.FC = () => {
  return (
    <Link href="/" passHref>
      <div className="text-black cursor-pointer uppercase underline-offset-2 underline">
        GO BACK
      </div>
    </Link>
  );
};

export default BackButton;
