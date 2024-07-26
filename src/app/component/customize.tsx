"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import start from '../images/Group 273.svg';
import github from '../images/github.svg';
import frontedmentor from '../images/frontendmentor.svg';
import twitter from '../images/mdi_twitter.svg';
import linkedIn from '../images/mdi_linkedin.svg';
import youtube from '../images/ri_youtube-fill.svg';
import facebook from '../images/bi_facebook.svg';
import twitch from '../images/mdi_twitter.svg';
import devto from '../images/skill-icons_devto-dark.svg';
import codewars from '../images/cib_codewars.svg';
import codepen from '../images/ri_codepen-line.svg';
import freecodecamp from '../images/simple-icons_freecodecamp.svg';
import gitlab from '../images/ri_gitlab-fill.svg';
import hashnode from '../images/fa6-brands_hashnode.svg';
import stackoverflow from '../images/cib_stackoverflow.svg';
import chevup from '../images/chevup (2).svg';
import chevd from '../images/chevd.svg';
import linkIcon from '../images/ph_link-bold (1).svg';
import githubImg from '../images/github (2).svg';
import frontendmentorImg from '../images/frontendmentor (2).svg';
import twitterImg from '../images/twitter.svg';
import linkedinImg from '../images/linkedin.svg';
import youtubeImg from '../images/youtube (2).svg';
import facebookImg from '../images/facebook (2).svg';
import twitchImg from '../images/twitch.svg';
import devtoImg from '../images/devto.svg';
import codewarsImg from '../images/codewars.svg';
import codepenImg from '../images/codewars.svg';
import freecodecampImg from '../images/freecodecamp.svg';
import gitlabImg from '../images/gitlab.svg';
import hashnodeImg from '../images/hashnode.svg';
import stackoverflowImg from '../images/stackoverflow.svg';
import { addUser, uploadImage, updateUser, getUser } from "../../../Firebase/firebaseUtils"; // Adjust path as needed
import customize from "../images/preview-section (1).svg";
import profilee from "../images/ph_image (1).svg";
import profileee from "../images/ph_image (3).svg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import Header from "../component/header";
// import { db } from '../firebase'; // Adjust the path as necessary
// import { doc, setDoc, getDocs, collection, DocumentData } from "firebase/firestore";
import { collection, writeBatch, doc, getDoc, getDocs, setDoc, DocumentData, WriteBatch } from "firebase/firestore"; // import firestore
import { db, storage } from "../../../Firebase/initFirebase"; // import firestore
import { link } from 'fs';
import { useCustomizeContext } from '../component/customizeContext';


const CustomizeContext = createContext(null)
interface CustomizeProps {
    activeSection: 'link' | 'profile';
}

const Customize: React.FC<CustomizeProps> = ({ activeSection }) => {
    const {
        showInitialPrompt,
        links,
        modalOpen,
        selectedPlatform,
        linkUrl,
        selectedImages,
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        setLinks,
        image,
        imageURL,
        error,
        uploading,
        userData,
        selectedPlatformImage,
        success,
        modalCont,
        handleAddNewLink,
        handleRemoveLink,
        handlePlatformChange,
        handleImageClick,
        handleUrlChange,
        validateLink,
        toggleModal,
        handleSave1,
        sendData,
        handleImageChange,
        openModalId,
        setOpenModalId
    } = useCustomizeContext();

    function openLink(url: string): void {
        if (url) {
            window.open(url, '_blank');
        }
    }

    return (
        <section className='pt-0 pr-6 pb-6 pl-6'>
            <div className='grid md:grid-cols-2 gap-3'>
                <div className='p-[15px] '>
                    {activeSection === "link" ? (
                        <div className='bg-white p-[4rem] rounded-md flex  justify-center min-h-[700px] items-center '>
                            <div className='relative'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" viewBox="0 0 308 632" fill="none">
                                    <path d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z" stroke="#737373" />
                                </svg>
                                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-[1%] left-[3%]" width="286" height="612" viewBox="0 0 286 612" fill="none">
                                    <path d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z" fill="white" stroke="#737373" />
                                </svg>
                                {/* <div className='absolute top-[40%] cursor-pointer left-0 p-4 flex flex-col mx-auto w-full  gap-2 items-center justify-center'>
                                    {links.map((link, index) => (
                                        <Image key={index} src={link.image} alt={link.platform} width={237} height={44} onClick={() => openLink(link.url)} />
                                    ))}
                                </div> */}
                                <div className='overflow-y-auto cursor-pointer max-h-[300px] hide-scrollbar'>
                                    <div className='absolute top-[40%] left-0 p-4 flex flex-col mx-auto w-full gap-2 items-center justify-center'>
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

                            </div>
                        </div>
                    )
                        : (
                            <div className="bg-white p-[4rem] rounded-md flex justify-center min-h-[700px] items-center">
                                <div className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="308" height="632" viewBox="0 0 308 632" fill="none">
                                        <path d="M1 54.5C1 24.9528 24.9528 1 54.5 1H253.5C283.047 1 307 24.9528 307 54.5V577.5C307 607.047 283.047 631 253.5 631H54.5C24.9528 631 1 607.047 1 577.5V54.5Z" stroke="#737373" />
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-[1%] left-[3%]" width="286" height="612" viewBox="0 0 286 612" fill="none">
                                        <path d="M1 45.5C1 20.9233 20.9233 1 45.5 1H69.5C75.8513 1 81 6.14873 81 12.5C81 20.5081 87.4919 27 95.5 27H190.5C198.508 27 205 20.5081 205 12.5C205 6.14873 210.149 1 216.5 1H240.5C265.077 1 285 20.9233 285 45.5V566.5C285 591.077 265.077 611 240.5 611H45.5C20.9233 611 1 591.077 1 566.5V45.5Z" fill="white" stroke="#737373" />
                                    </svg>
                                    {userData && (
                                        <div className="absolute top-12 text-center flex flex-col mx-auto w-full items-center justify-center gap-[]">
                                            <Image src={imageURL} alt="Profile" width={100} height={100} className="rounded-full border-[4px] border-[#633CFF]  " />
                                            <h1 className="text-[18px] font-[600] text-gray-600">{`${userData.firstName} ${userData.lastName}`}</h1>
                                            {userData.email && (
                                                <h2 className="text-[14px] font-[400] text-gray-200">{userData.email}</h2>
                                            )}
                                        </div>
                                    )}
                                    <div className='overflow-y-auto cursor-pointer max-h-[300px] hide-scrollbar '>
                                        <div className='absolute top-[40%] left-0 p-4 flex flex-col mx-auto w-full gap-2 items-center justify-center'>
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


                                </div>
                            </div>
                        )}
                </div>
                <div className='p-[15px] bg-white-- md:w-full'>
                    {activeSection === "profile" ? (
                        <div className="bg-white p-[40px] rounded-md flex flex-col min-h-full justify-between w-full">
                            <h1 className="text-header-M font-[700] text-gray-600">Profile Details</h1>
                            <h2 className="text-[14px] font-[400] text-gray-200">
                                Add your details to create a personal touch to your profile.
                            </h2>
                            <div className="flex justify-between w-full items-center p-[2rem] bg-white-- rounded-[12px]">
                                <h2 className="text-header-S-M text-gray-200 font-[400]">Profile picture</h2>
                                <div className="relative flex justify-center items-center gap-[1rem]">
                                    <label
                                        htmlFor="file-upload"
                                        className={`relative ${imageURL === profilee ? "pt-[50px] pr-[30px] pb-[45px] pl-[30px] rounded-[12px]" : ""} bg-purple-50 hover:flex flex-col items-center cursor-pointer`}
                                    >
                                        {imageURL && imageURL !== profilee ? (
                                            <div className="relative">
                                                <Image src={imageURL} alt="Profile" width={200} height={200} className="object-cover rounded-md " />
                                                <div className="absolute inset-0 flex items-center justify-center flex-col bg-black bg-opacity-30 rounded-md">
                                                    <Image src={profileee} alt="" width={60} height={70} />
                                                    <h1 className="text-header-S-M font-[600] text-white">Change image</h1>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col justify-center items-center rounded-[12px]">
                                                <Image src={profilee} alt="" width={60} height={70} />
                                                <h1 className="text-header-S-M font-[600] text-[#633CFF]">+ Upload Image</h1>
                                            </div>
                                        )}
                                        {/* {onClick && <button onClick={onClick}>Change image</button>} */}
                                        <input id="file-upload" type="file" accept="image/png, image/jpeg" onChange={handleImageChange} className="hidden" />
                                    </label>

                                    <h2 className="text-[13px] text-gray-200 font-[400] w-[40%]">
                                        {error || "Image must be below 1024x1024px. Use PNG or JPG format."}
                                    </h2>
                                </div>
                            </div>
                            <div className="flex flex-col gap-4 mt-[0.7rem] bg-white-- rounded-[12px] p-[1.5rem]">
                                <form className="flex flex-col gap-4 mt-[0.7rem]">
                                    <div className="flex justify-between w-full items-center">
                                        <label className="text-header-S-M text-gray-200 w-[240px]">First name*</label>
                                        <input
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="e.g. John"
                                            className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                                        />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <label className="text-header-S-M text-gray-200 w-[240px]">Last name*</label>
                                        <input
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="e.g. Appleseed"
                                            className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                                        />
                                    </div>
                                    <div className="flex justify-between w-full items-center">
                                        <label className="text-header-S-M text-gray-200 w-[240px]">Email</label>
                                        <input
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="e.g. john.appleseed@example.com"
                                            className="px-[16px] py-[12px] w-full rounded-[8px] border-[1.3px] border-[#D9D9D9] bg-white placeholder:text-header-S-M font-[400]"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className='flex w-full justify-end items-end'>
                                <button
                                    className="px-[27px] py-[10px] text-header-S-M rounded-[8px] w-fit flex flex-end bg-[#633CFF] text-white hover:bg-purple-400"
                                    onClick={sendData}
                                    disabled={uploading}
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    )
                        : (
                            <div className='flex flex-col gap-2 bg-white p-[20px] w-auto min-h-full justify-between '>
                                <div>
                                    <div className='flex flex-col gap-2'>
                                        <h1 className='text-[#3D3B48] text-header-M font-bold'>Customize your links</h1>
                                        <h2 className='text-[14px] text-gray-200'>Add/edit/remove links below and then share all your profiles with the world!</h2>
                                        <button
                                            className='px-[27px] py-[10px] text-center hover:bg-purple-50 w-full mt-[0.5rem] text-header-S-M rounded-[8px] border-[1.5px] border-[#633CFF] text-[#633CFF]'
                                            onClick={handleAddNewLink}
                                        >
                                            + Add new link
                                        </button>
                                    </div>


                                    {showInitialPrompt && links.length === 0 ? (
                                        <div className='flex flex-col justify-center items-center mt-[5rem] gap-4 animate-fade-in'>
                                            <Image src={start} alt='Get started' />
                                            <h3 className='text-header-M text-gray-600'>Let&apos;s get you started</h3>
                                            <p className='text-center text-header-S-M'>Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!</p>
                                        </div>
                                    ) : (
                                        <div className='overflow-y-auto max-h-[500px] hide-scrollbar'>
                                            {links.map((link, index) => {
                                                const placeholder = modalCont.find(item => item.platName === link.platform)?.placeholder || '';
                                                return (
                                                    <div key={link.id} className='mt-[1rem] bg-white-- p-[20px] rounded-sm overflow-auto hide-scrollbar'>
                                                        <div className='flex w-full justify-between items-center'>
                                                            <h1 className='text-header-S-M font-[700] text-gray-200'><span className='font-[400] text-header-S-M'>=</span> Link #{index + 1}</h1>
                                                            <button className='text-header-S-M font-[400] text-gray-200' onClick={() => handleRemoveLink(link.id)}>Remove</button>
                                                        </div>
                                                        <form className='flex flex-col gap-1 justify-between'>
                                                            <label className='text-body-S font-[400] text-gray-200'>Platform</label>
                                                            <div className='flex justify-between w-full border-[1.5px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] rounded-[8px] cursor-pointer' onClick={() => toggleModal(link.id)}>
                                                                <div className='flex gap-2 '>
                                                                    <Image src={modalCont.find(item => item.platName === link.platform)?.image || ''} alt={link.platform} width={20} height={20} />
                                                                    <h1>{link.platform}</h1>
                                                                </div>
                                                                <Image src={modalOpen ? chevup : chevd} alt='' width={15} height={15} className='cursor-pointer' />
                                                            </div>
                                                            {openModalId === link.id && (
                                                                <div className='bg-white mt-2 shadow-md rounded-md cursor-pointer '>
                                                                    {modalCont.map((item) => (
                                                                        <div
                                                                            key={item.id}
                                                                            className='flex gap-4 flex-col w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] rounded-[8px] mb-2'
                                                                            onClick={() => {
                                                                                handlePlatformChange(link.id, item.platName);
                                                                            }}
                                                                        >
                                                                            <div className='flex gap-2'>
                                                                                <Image src={item.image} alt={item.platName} width={20} height={20} />
                                                                                <h1>{item.platName}</h1>
                                                                            </div>
                                                                            <hr className='w-full bg-gray-400' />

                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                            <label className='text-body-S font-[400] text-gray-200'>Link</label>
                                                            <div className='relative' key={link.id}>
                                                                <input
                                                                    type='text'
                                                                    value={link.url}
                                                                    onChange={(e) => {
                                                                        const newUrl = e.target.value;
                                                                        const updatedLinks = links.map(l => {
                                                                            if (l.id === link.id) {
                                                                                const error = validateLink(l.platform, newUrl);
                                                                                return { ...l, url: newUrl, error: '' };
                                                                            }
                                                                            return l;
                                                                        });
                                                                        setLinks(updatedLinks);
                                                                    }}
                                                                    className='focus:shadow-faint-blue focus:outline-none p-[2rem] rounded-md w-full border-[1.5px] px-[36px] py-[11px]'
                                                                    placeholder={link.error ? "Please check the URL" : `${placeholder}`}
                                                                />
                                                                <Image src={linkIcon} alt='LinkIcon' className='absolute top-[35%] left-3 transform pointer-events-none' width={16} height={16} />
                                                                {/* <Image src={link.image} alt='LinkIcon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} /> */}
                                                                {link.error && <p className='absolute top-[50%] transform -translate-y-1/2 right-4 text-body-S font-[400] text-red'>{link.error}</p>}
                                                                {/* {error && <p className="text-red">{error}</p>} */}
                                                                {/* {success && <p className="text-green-500">{success}</p>} */}
                                                            </div>
                                                        </form>
                                                    </div>

                                                );
                                            })}

                                        </div>
                                    )}

                                </div>
                                <div className='flex justify-end items-end w-full mt-4'>
                                    <button className='px-[27px] py-[10px] text-header-S-M rounded-[8px] bg-[#633CFF] text-white hover:bg-purple-400' onClick={handleSave1}>Save</button>
                                </div>
                            </div>

                        )}
                </div>
            </div>
        </section >
    );
};

export default Customize;
function commitBatch(batch: WriteBatch) {
    throw new Error('Function not implemented.');
}

