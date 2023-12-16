'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'

export default function Home() {
  const [dataUploaded, setDataUploaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.push('/menu');
  }, [router]); // Corrected dependency array

  return (
    <main className=" w-screen grid place-items-center ">
      {/* <UploadData setDataUploaded={setDataUploaded} /> */}
    </main>
  );
}
