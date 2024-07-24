"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '../images/logo (5).svg';
import link from '../images/ph_link-bold.svg';
import user from '../images/ph_user-circle-bold.svg';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
    const [activeSection, setActiveSection] = useState<'link' | 'profile'>('link');

    const handleSectionChange = (section: 'link' | 'profile') => {
        setActiveSection(section);
    };


    const router = useRouter()

    return (
        <header className='p-[24px]'>
            <div className='bg-white flex p-4 justify-between w-full items-center rounded-[12px]'>
                <Image src={logo} alt='' width={146} height={32} />
                <div className='flex gap-4'>
                    <div 
                        className={`flex gap-1 items-center px-[27px] py-[11px] rounded-md cursor-pointer 
                        ${activeSection === 'link' ? 'bg-purple-50 text-blue' : 'text-gray-200'}`}
                        onClick={() => handleSectionChange('link')}
                    >
                        <Image src={link} alt='' width={20} height={20} />
                        <p className={`text-header-S-M ${activeSection === 'link' ? 'text-purple-600' : 'text-gray-200'}`}>
                            Link
                        </p>
                    </div>
                    <div 
                        className={`flex gap-1 items-center px-[27px] py-[11px] rounded-md cursor-pointer 
                        ${activeSection === 'profile' ? 'bg-purple-50 text-blue' : ''}`}
                        // onClick={() => handleSectionChange('profile')}
                        onClick={() => router.push('/profile')}
                    >
                        <Image src={user} alt='' width={20} height={20} />
                        <p className={`text-header-S-M ${activeSection === 'profile' ? 'text-purple-600' : 'text-gray-200'}`}>
                            Profile Details
                        </p>
                    </div>
                </div>
                <button className='text-[#633CFF] text-header-S-M rounded-[12px] px-[27px] py-[11px] border-[1.3px] border-[#633CFF]'>
                    Preview
                </button>
            </div>
        </header>
    );
};

export default Header;
