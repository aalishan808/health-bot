'use client';

import React, { useState, useTransition } from 'react';
import { RiGoogleFill } from '@remixicon/react';
import { useRouter , redirect } from 'next/navigation'; 
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../../../lib/firebase';
import { signinAction } from '@/app/auth/signin/signin-action'; 

const LoginContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const { token } = await signinAction({ email, password  });
        
        // Set the cookie with the token
        document.cookie = `firebase-session=${token}; path=/;`; 
        router.push('/dashboard')
      } catch (error: any) {
        console.error('Sign-up error:', error.message); 
      }
    }); 
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      // Set session in localStorage (or cookies can be set in server-side)
      localStorage.setItem('firebase-session', 'true'); // Replace with actual token
      router.push('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <header className="w-full flex justify-between p-6">
        <div />
        <h1 className="text-[#00DB0F] text-3xl font-bold absolute top-10 left-[40%] justify-center">Welcome Back!</h1>
        <a href="/" className="text-[#00DB0F] font-semibold absolute top-10 right-10 pl-10">HealthBot</a>
      </header>

      <div className="bg-white w-full max-w-md p-8 rounded-md shadow-md">
        <form onSubmit={handleEmailSignIn}>
          <div className="space-y-4">
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              className="border border-[#00DB0F] rounded-lg px-4 py-2 w-full text-[#00DB0F] placeholder-[#00DB0F] placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-[#00DB0F]"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isPending} className="mt-6 w-full bg-[#00DB0F] text-white py-2 rounded-lg hover:bg-[#00DB0F]/90 transition duration-200">
            {isPending ? 'Signing in...' : 'Sign in with Email'}
          </button>
        </form>

        <div className="flex justify-center mt-6">
          <button onClick={handleGoogleSignIn} className="bg-[#00DB0F] p-2 rounded-full">
            <RiGoogleFill className='text-white w-6 h-auto' />
          </button>
        </div>

        <p className="text-center mt-4 text-gray-600">
          Do not have an account?{' '}
          <a href="/signup" className="text-[#00DB0F] font-semibold">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginContent;
