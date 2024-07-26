"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import logo from '../images/logo (5).svg';
import email from '../images/email.svg';
import passw from '../images/password.svg';
import { useRouter } from 'next/navigation';
import { auth, googleProvider, githubProvider } from "../../../Firebase/initFirebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  User,
} from "firebase/auth";

const Login = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unRegistered = onAuthStateChanged(auth, (user) => {
      console.log("user", user);
      setUser(user);
      if (user) {
        router.push("/");
      }
    });

    return () => unRegistered();
  }, [router]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    let isValid = true;
    if (emailInput === '') {
      setEmailError("Can't be empty");
      isValid = false;
    } else {
      setEmailError('');
    }
    if (passwordInput === '') {
      setPasswordError('Please check again');
      isValid = false;
    } else {
      setPasswordError('');
    }
    if (isValid) {
      try {
        await signInWithEmailAndPassword(auth, emailInput, passwordInput);
        alert("Login successful!");
        setEmailInput("");
        setPasswordInput("");
        router.push("/"); // Redirect to home page after successful login
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailInput(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(e.target.value);
    if (passwordError) {
      setPasswordError('');
    }
  };

  return (
    <section className='w-full h-[100vh] flex justify-center items-center bg-gray-100 '>
      <div className='flex flex-col justify-center items-center gap-8 mt-[1rem] md:mt-[0.1rem]'>
        <Image src={logo} alt='applogo' width={150} height={100} />
        <div className='flex flex-col gap-4 p-[40px] bg-white rounded-md'>
          <div className='flex flex-col gap-2'>
            <h1 className='md:text-header-M text-[28px] font-[700]'>Login</h1>
            <h2 className='md:text-header-S-M text-[14px] font-[400]'>Add your details below to get back into the app</h2>
          </div>

          <form className='flex flex-col gap-2' onSubmit={handleLogin}>
            <label className={`md:text-[14px] text-[11px] font-[400] ${emailError ? 'text-red' : ''}`}>Email address</label>
            <div className='relative w-full'>
              <input
                type='email'
                value={emailInput}
                onChange={handleEmailChange}
                placeholder='e.g. alex@email.com'
                className={`px-[36px] py-[12px] w-full placeholder:text-gray-600 text-header-S-M border-[1.5px] ${emailError ? 'border-red' : 'border-gray-500'} focus:shadow-faint-blue rounded-md focus:outline-none font-[400]`}
              />
              <Image src={email} alt='Email Icon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} />
              {emailError && <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-red text-[11px]'>{emailError}</span>}
            </div>

            <label className={`md:text-[14px] text-[11px] font-[400] mt-[0.5rem] ${passwordError ? 'text-red' : ''}`}>Password</label>
            <div className='relative w-full'>
              <input
                type='password'
                value={passwordInput}
                onChange={handlePasswordChange}
                placeholder='Enter your password'
                className={`px-[36px] py-[12px] w-full placeholder:text-gray-600 text-header-S-M font-[400] border-[1.5px] ${passwordError ? 'border-red' : 'border-gray-500'} focus:shadow-faint-blue rounded-md focus:outline-none`}
              />
              <Image src={passw} alt='Password Icon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} />
              {passwordError && <span className='absolute right-2 top-1/2 transform -translate-y-1/2 text-red text-[11px]'>{passwordError}</span>}
            </div>

            <button type='submit' className='w-full px-[27px] py-[11px] bg-blue text-white text-header-S-M rounded-md focus:bg-purple-400 hover:bg-purple-400'>Login</button>
          </form>
          <h2 className='text-header-S-M font-[400] text-center'>Don&apos;t have an account? <span className='text-[#633CFF] cursor-pointer' onClick={() => router.push('/createAcct')}>Create account</span></h2>
        </div>
      </div>
    </section>
  );
};

export default Login;
