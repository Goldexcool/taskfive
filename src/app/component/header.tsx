import React from 'react';
import logo from '../images/logo (5).svg'
import Image from 'next/image';
import link from '../images/ph_link-bold.svg'
import profile from '../images/ph_user-circle-bold.svg'
import {useRouter} from 'next/navigation'

const Header = ({ activeSection, setActiveSection }: any) => {
    const router = useRouter()
    return (
        <header className="flex bg-gray-100 p-4 border-b border-gray-300 justify-between items-center">
            <div className='p-2 bg-white-- flex justify-between items-center w-full rounded-md'>
                <Image src={logo} alt="Logo" width={150} height={100} />
                <div className='flex gap-[1.4rem] cursor-pointer'>
                    <div
                        onClick={() => setActiveSection('link')}
                        className={`flex gap-2 p-2 rounded-md transition-colors duration-300 ${activeSection === 'link' ? 'bg-purple-50 text-blue' : ' text-gray-600'}`}
                    >
                        <Image src={link} alt="Link" width={20} height={20} />
                        <span>
                            Links
                        </span>
                    </div>



                    <div
                        onClick={() => setActiveSection('profile')}
                        className={`flex gap-2 p-2 rounded-md transition-colors duration-300 ${activeSection === 'profile' ? 'bg-purple-50 text-blue' : 'text-gray-600'}`}
                    >
                        <Image src={profile} alt="Profile" width={20} height={20} />
                        <span>
                            Profile Details
                        </span>
                    </div>

                </div>

                <button className='px-[27px] py-[11px] rounded-[8px] text-blue text-header-S-M font-600 border-[1.3px] border-blue ' onClick={() => router.push('preview')}>Preview</button>
            </div>


        </header>
    );
};

export default Header;

