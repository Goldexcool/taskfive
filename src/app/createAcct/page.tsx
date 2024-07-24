"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../images/logo (5).svg'
import emailIcon from '../images/email.svg'
import passw from '../images/password.svg'
import { useRouter } from 'next/navigation'
import {
    auth,
    googleProvider,
    githubProvider,
  } from "../../../Firebase/initFirebase";
  import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
  } from "firebase/auth";
  import initFirebase from "../../../Firebase/initFirebase";

const CreateAcct = () => {
    const [emailInput, setEmailInput] = useState('')
    const [passwordInput, setPasswordInput] = useState('')
    const [confirmPasswordInput, setConfirmPasswordInput] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    
    const router = useRouter()

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value)
        if (emailError) setEmailError('')
    }

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordInput(e.target.value)
        if (passwordError) setPasswordError('')
    }

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPasswordInput(e.target.value)
        if (confirmPasswordError) setConfirmPasswordError('')
    }

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let isValid = true

        if (emailInput === '') {
            setEmailError("Can't be empty")
            isValid = false
        } else {
            setEmailError('')
        }

        if (passwordInput === '') {
            setPasswordError('Please check again')
            isValid = false
        } else {
            setPasswordError('')
        }

        if (confirmPasswordInput === '') {
            setConfirmPasswordError('Please confirm your password')
            isValid = false
        } else if (confirmPasswordInput !== passwordInput) {
            setConfirmPasswordError('Passwords do not match')
            isValid = false
        } else {
            setConfirmPasswordError('')
        }

        if (isValid) {
            try {
                await createUserWithEmailAndPassword(auth, emailInput, passwordInput)
                alert("Success! You are now registered.")
                setEmailInput("")
                setPasswordInput("")
                setConfirmPasswordInput("")
                router.push('/login')
            } catch (err: any) {
                alert(err.message)
            }
        }
    }

    return (
        <section className='w-full h-full flex  justify-center items-center bg-gray-100'>
            <div className='flex flex-col justify-center items-center gap-8'>
                <Image src={logo} alt='applogo' width={150} height={100} className='mt-[2rem]' />
                <div className='flex flex-col gap-4 p-[40px] bg-white rounded-md mb-[2rem]'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='md:text-header-M text-[28px] font-[700]'>Sign Up</h1>
                        <h2 className='md:text-header-S-M text-[14px] font-[400]'>Add your details below to create a new account</h2>
                    </div>

                    <form className='flex flex-col gap-2' onSubmit={handleSignup}>
                        <label className={`md:text-[14px] text-[11px] font-[400] ${emailError ? 'text-red' : ''}`}>Email address</label>
                        <div className='relative w-full'>
                            <input
                                type='email'
                                value={emailInput}
                                onChange={handleEmailChange}
                                placeholder='e.g. alex@email.com'
                                className={`px-[36px] py-[12px] w-full placeholder:text-gray-600 text-header-S-M border-[1.5px] ${emailError ? 'border-red' : 'border-gray-500'} focus:shadow-faint-blue rounded-md focus:outline-none font-[400]`}
                            />
                            <Image src={emailIcon} alt='Email Icon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} />
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

                        <label className="md:text-[14px] text-[11px] font-[400] mt-[0.5rem]">Confirm Password</label>
                        <div className='relative w-full'>
                            <input
                                type='password'
                                value={confirmPasswordInput}
                                onChange={handleConfirmPasswordChange}
                                placeholder='Enter your password again'
                                className={`px-[36px] py-[12px] w-full placeholder:text-gray-600 text-header-S-M font-[400] border-[1.5px] ${confirmPasswordError ? 'border-red' : 'border-gray-500'} focus:shadow-faint-blue rounded-md focus:outline-none`}
                            />
                            <Image src={passw} alt='Password Icon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} />
                        </div>
                        {confirmPasswordError && <span className='text-red text-[11px] mt-1'>{confirmPasswordError}</span>}
                        <button type='submit' className='w-full px-[27px] py-[11px] bg-blue mt-[0.8rem] text-white text-header-S-M rounded-md focus:bg-purple-400 hover:bg-purple-400'>Create new account</button>
                    </form>
                    <h2 className='text-header-S-M font-[400] text-center'>Already have an account? <span className='text-[#633CFF] cursor-pointer' onClick={() => router.push('/login')}>Login</span></h2>
                </div>
            </div>
        </section>
    )
}

export default CreateAcct
