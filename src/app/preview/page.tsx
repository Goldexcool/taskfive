"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomizeContext } from '../component/customizeContext';
import linkIcon from '../images/ph_link-bold (1).svg';
import Image from 'next/image';

const Preview = () => {
    const {
        userData,
        imageURL,
        links,
        error,
        handleAddNewLink,
        handleRemoveLink,
        handlePlatformChange,
        sendData
    } = useCustomizeContext();

    const [copied, setCopied] = useState(false);
    const router = useRouter(); // For navigation

    if (error) return <div>{error}</div>;

    function openLink(url: string): void {
        window.open(url, "_blank");
    }

    const handleShareLink = async (): Promise<void> => {
        try {
            // Generate a unique link (e.g., using a user ID or token)
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User ID is not available.");

            const shareableLink = `${window.location.origin}/preview/${userId}`;

            // Copy the link to clipboard
            await navigator.clipboard.writeText(shareableLink);

            // Show confirmation message
            setCopied(true);

            // Hide the confirmation message after 3 seconds
            setTimeout(() => setCopied(false), 3000);
        } catch (error) {
            console.error("Error copying link to clipboard:", error);
        }
    };

    const handleBackToEditor = () => {
        router.push('/'); // Adjust the route as needed
    };

    return (
        <section className='flex justify-center h-screen'>
            <div className='flex flex-col w-full'>
                <div className='bg-blue h-[45%] relative p-[0.7rem] rounded-[0px_0px_32px_32px] '>
                    <div className='flex justify-between w-full pt-[16px] rounded-xl pr-[16px] pb-[16px] pl-[24px] bg-white p-[1rem] mt-[1rem]'>
                        <button
                            onClick={handleBackToEditor}
                            className='text-header-S-M font-bold rounded-md px-[27px] py-[11px] border-[1.2px] border-blue text-blue'
                        >
                            Back to Editor
                        </button>
                        <button
                            onClick={handleShareLink}
                            className='px-[27px] py-[11px] bg-blue rounded-md text-white text-header-S-M'
                        >
                            Share Link
                        </button>
                    </div>
                </div>

                <div className='w-full absolute top-[15%] flex flex-col items-center mt-[4rem] mb-[100rem]'>
                    <div className='px-[36px] py-[30px] text-center flex flex-col gap-[25px] justify-center items-center rounded-lg shadow-md bg-white'>
                        {userData ? (
                            <div className='flex flex-col items-center gap-[2px]'>
                                <Image src={imageURL} alt="Profile" width={100} height={100} className="rounded-full border-[4px] border-[#633CFF]" />
                                <h1 className='text-[32px] text-[#333333] font-[700]'>{`${userData.firstName} ${userData.lastName}`}</h1>
                                <h2 className='text-header-S-M text-[#737373] font-[400]'>{userData.email}</h2>
                            </div>
                        ) : (
                            <p>Loading user data...</p>
                        )}

                        <div className='overflow-y-auto cursor-pointer max-h-[200px] hide-scrollbar'>
                            <div className='p-4 flex flex-col mx-auto w-full gap-2 items-center justify-center'>
                                {links.map((link, index) => (
                                    link.image && (
                                        <Image
                                            key={index}
                                            src={link.image}
                                            alt={link.platform}
                                            width={237}
                                            height={44}
                                            onClick={() => openLink(link.url)}
                                        />
                                    )
                                ))}
                            </div>
                        </div>
                        {copied && (
                            <div className='text-center absolute bottom-1 mt-4 bg-[#333333] text-white flex gap-2 p-3 rounded-lg'>
                                <Image src={linkIcon} alt='' width={20} height={20} />
                                <h1>The link has been copied to your clipboard!</h1>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Preview;
