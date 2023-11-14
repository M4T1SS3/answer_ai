'use client'
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn('credentials', {
      redirect: false, // to prevent automatic redirection
      email,
      password,
    });
    
    if (result && result.error) {
      setError(result.error);
    } else {
      // If there's no error, navigate to the menu
      router.push('/menu');
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center flex-col">
        <div className="relative inline-block mb-8">
            <h1 className='text-3xl uppercase relative z-10'>Sign IN</h1>
            <div className='absolute top-1/2 transform w-full h-6 bg-[#7F53FF] z-0'></div>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-bold mb-2">
            Email
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="appearance-none border rounded w-full py-3 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black w-full text-white  h-12 rounded grid place-items-center"
          >
            Sign In
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
      </form>
    </section>
  );
};

export default SignIn;
