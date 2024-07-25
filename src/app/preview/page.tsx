import React from 'react';
import Customize from '../component/customize';
import Image from 'next/image';

const Preview = () => {
    const { userData, links, error } = Customize();

    if (error) return <div>{error}</div>;

    return (
        <section className='flex justify-center h-screen'>
            <div className='flex flex-col w-full'>
                <div className='bg-blue h-[40%] p-[0.7rem] rounded-[0px_0px_32px_32px]'>
                    <div className='flex justify-between w-full pt-[16px] rounded-xl pr-[16px] pb-[16px] pl-[24px] bg-white p-[1rem] mt-[1rem]'>
                        <h1 className='text-header-S-M font-bold rounded-md px-[27px] py-[11px] border-[1.2px] border-blue text-blue'>Back to Editor</h1>
                        <button className='px-[27px] py-[11px] bg-blue rounded-md text-white text-header-S-M'>Share Link</button>
                    </div>
                </div>

                <div className='w-full justify-center items-center flex'>
                    <div className='shadow-md'>
                        {userData && (
                            <div>
                                <Image src={userData.imageURL} alt="Profile" width={100} height={100} className="rounded-full border-[4px] border-[#633CFF]" />
                                <h1>{`${userData.firstName} ${userData.lastName}`}</h1>
                                <h2>{userData.email}</h2>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preview;
