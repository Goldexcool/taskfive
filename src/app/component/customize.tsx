"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import customize from '../images/preview-section (1).svg';
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
import codepenImg from '../images/codepen.svg';
import freecodecampImg from '../images/freecodecamp.svg';
import gitlabImg from '../images/gitlab.svg';
import hashnodeImg from '../images/hashnode.svg';
import stackoverflowImg from '../images/stackoverflow.svg';


interface Link {
    id: number;
    platform: string;
    url: string;
    error?: string;
}

interface Platform {
    id: number;
    platName: string;
    image: any;
    placeholder?: string;
}

interface PlatformImage {
    id: number;
    platName: string;
    image: any;
    url: string;
}

interface CustomizeProps {
    activeSection: "link" | "profile";
}

const Customize: React.FC = () => {
    const [showInitialPrompt, setShowInitialPrompt] = useState<boolean>(true);
    const [links, setLinks] = useState<Link[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('Github');
    const [linkUrl, setLinkUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [platformImages, setPlatformImages] = useState<PlatformImage[]>([]);
    const [selectedImages, setSelectedImages] = useState({});

    const modalCont: Platform[] = [
        { id: 1, platName: "Github", image: github, placeholder: "e.g. https://www.github.com/johnappleseed", },
        { id: 2, platName: "Frontendmentor", image: frontedmentor, placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed" },
        { id: 3, platName: "Twitter", image: twitter, placeholder: "e.g. https://twitter.com/johnappleseed" },
        { id: 4, platName: "LinkedIn", image: linkedIn, placeholder: "e.g. https://www.linkedin.com/in/johnappleseed" },
        { id: 5, platName: "Youtube", image: youtube, placeholder: "e.g. https://www.youtube.com/c/johnappleseed" },
        { id: 6, platName: "Facebook", image: facebook, placeholder: "e.g. https://www.facebook.com/johnappleseed" },
        { id: 7, platName: "Twitch", image: twitch, placeholder: "e.g. https://www.twitch.tv/johnappleseed" },
        { id: 8, platName: "Dev.to", image: devto, placeholder: "e.g. https://www.github.com/johnappleseed" },
        { id: 9, platName: "CodeWars", image: codewars, placeholder: "e.g. https://www.codewars.com/johnappleseed" },
        { id: 10, platName: "CodePen", image: codepen, placeholder: "e.g. https://www.codepen.com/johnappleseed" },
        { id: 11, platName: "FreeCodeCamp", image: freecodecamp, placeholder: "e.g. https://www.freecodecamp.com/johnappleseed" },
        { id: 12, platName: "GitLab", image: gitlab, placeholder: "e.g. https://www.gitlab.com/johnappleseed" },
        { id: 13, platName: "Hashnode", image: hashnode, placeholder: "e.g. https://www.hashnode.com/johnappleseed" },
        { id: 14, platName: "StackOverflow", image: stackoverflow, placeholder: "e.g. https://www.stackoverflow.com/johnappleseed" }
    ];

    const websites = [
        {
          name: "GitHub",
          link: "https://www.github.com/",
          backgroundColor: "#000000",
          image: github,
          textColor: "#FFF",
          previewImage: githubImg,
        },
        {
          name: "Frontend Mentor",
          link: "https://www.frontendmentor.io/",
          backgroundColor: "#fff",
          image: frontedmentor,
          textColor: "#000",
          previewImage: frontendmentorImg,
        },
        {
          name: "Twitter",
          link: "https://www.twitter.com/",
          backgroundColor: "#1DA1F2",
          image: twitter,
          textColor: "#FFF",
          previewImage: twitterImg,
        },
        {
          name: "LinkedIn",
          link: "https://www.linkedin.com/",
          backgroundColor: "#0077B5",
          image: linkedIn,
          textColor: "#FFF",
          previewImage: linkedinImg,
        },
        {
          name: "YouTube",
          link: "https://www.youtube.com/",
          backgroundColor: "#FF0000",
          image: youtube,
          textColor: "#FFF",
          previewImage: youtubeImg,
        },
        {
          name: "Facebook",
          link: "https://www.facebook.com/",
          backgroundColor: "#1877F2",
          image: facebook,
          textColor: "#FFF",
          previewImage: facebookImg,
        },
        {
          name: "Twitch",
          link: "https://www.twitch.tv/",
          backgroundColor: "#EE3FC8",
          image: twitch,
          textColor: "#FFF",
          previewImage: twitchImg,
        },
        {
          name: "Dev.to",
          link: "https://www.dev.to/",
          backgroundColor: "#000000",
          image: devto,
          textColor: "#FFF",
          previewImage: devtoImg,
        },
        {
          name: "Codewars",
          link: "https://www.codewars.com/",
          backgroundColor: "#B1361E",
          image: codewars,
          textColor: "#FFF",
          previewImage: codewarsImg,
        },
        {
          name: "freeCodeCamp",
          link: "https://www.freecodecamp.org/",
          backgroundColor: "#0A0A23",
          image: freecodecamp,
          textColor: "#FFF",
          previewImage: freecodecampImg,
        },
        {
          name: "GitLab",
          link: "https://www.gitlab.com/",
          backgroundColor: "#FC6D26",
          image: gitlab,
          textColor: "#FFF",
          previewImage: gitlabImg,
        },
        {
          name: "Hashnode",
          link: "https://www.hashnode.com/",
          backgroundColor: "#2962FF",
          image: hashnode,
          textColor: "#FFF",
          previewImage: hashnodeImg,
        },
        {
          name: "Stack Overflow",
          link: "https://www.stackoverflow.com/",
          backgroundColor: "#F48024",
          image: stackoverflow,
          textColor: "#FFF",
          previewImage: stackoverflowImg,
        },
      ];

    const handleAddNewLink = (): void => {
        setShowInitialPrompt(false);
        setLinks([...links, { id: links.length + 1, platform: selectedPlatform, url: '' }]);
    };

    const handleRemoveLink = (id: number): void => {
        setLinks(links.filter(link => link.id !== id));
        if (links.length === 1) setShowInitialPrompt(true); // Check if last link is being removed
    };

    const handlePlatformChange = (id: number, newPlatform: string): void => {
        setLinks(links.map(link => link.id === id ? { ...link, platform: newPlatform } : link));
        setOpenModalId(null); // Close modal after selecting a platform
    };

    const handleImageClick = (url: string): void => {
        if (url) {
            window.open(url, '_blank'); // Open the link in a new tab
        }
    };
    const handleUrlChange = (id: any, url: any) => {
        setLinks(links.map(link => link.id === id ? { ...link, url } : link));
    };

    const validateLink = (platform: string, url: string): string => {
        const platformUrls: { [key: string]: string } = {
            'Github': 'github.com/',
            'GitLab': 'gitlab.com/',
            'Frontendmentor': 'frontendmentor.io/',
            // add other platforms here
        };
        const expectedUrl = platformUrls[platform] || '';
        if (!url) {
            return "Link can't be empty";
        } else if (expectedUrl && !url.startsWith(`https://${expectedUrl}`)) {
            return `URL should start with https://${expectedUrl}`;
        } else {
            return '';
        }
    };
    const [openModalId, setOpenModalId] = useState<number | null>(null);
    
    const toggleModal = (id: number): void => {
        setOpenModalId(openModalId === id ? null : id);
    };

    const handleSave = (): void => {
        let hasError = false;
        const updatedLinks = links.map(link => {
            const error = validateLink(link.platform, link.url);
            if (error) hasError = true;
            return { ...link, error };
        });
        setLinks(updatedLinks);
        if (!hasError) {
            console.log('Save successful', links);
        }
    };

    return (
        <section className='pt-0 pr-6 pb-6 pl-6'>
            <div className='grid md:grid-cols-2 gap-3'>
                <div className='bg-white p-[4rem] rounded-md flex justify-center items-center'>
                    <div className='relative'>
                        <Image src={customize} alt='Customize preview' width={307} height={300} />
                        <div className='absolute top-0 left-0 p-4 flex flex-col gap-2'>
                            {platformImages.map(img => (
                                <div
                                    key={img.id}
                                    className='mb-2 cursor-pointer'
                                    onClick={() => handleImageClick(img.url)}
                                >
                                    <Image src={img.image} alt={img.platName} width={237} height={44} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='bg-white p-[40px] rounded-md flex flex-col justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[#3D3B48] text-header-M font-bold'>Customize your links</h1>
                        <h2 className='text-[14px] text-gray-200'>Add/edit/remove links below and then share all your profiles with the world!</h2>
                        <button
                            className='px-[27px] py-[10px] text-center hover:bg-purple-50 w-full mt-[0.5rem] text-header-S-M rounded-[8px] border-[1.5px] border-[#633CFF] text-[#633CFF]'
                            onClick={handleAddNewLink}
                        >
                            + Add new link
                        </button>
                        {showInitialPrompt && links.length === 0 ? (
                            <div className='flex flex-col justify-center items-center mt-[4rem] gap-4 animate-fade-in'>
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
                                            <form className='flex flex-col gap-1'>
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
                                                <div className='relative'>
                                                    <input
                                                        type='text'
                                                        value={link.url}
                                                        onChange={(e) => handleUrlChange(link.id, e.target.value)}
                                                        className='focus:shadow-faint-blue focus:outline-none p-[2rem] rounded-md w-full border-[1.5px] px-[36px] py-[11px]'
                                                        placeholder={placeholder}
                                                    />
                                                    <Image src={linkIcon} alt='LinkIcon' className='absolute top-1/2 left-3 transform -translate-y-1/2 pointer-events-none' width={16} height={16} />
                                                    {link.error && <p className='absolute top-1/2 transform -translate-y-1/2 right-4 text-body-S font-[400] text-red'>{link.error}</p>}
                                                </div>
                                            </form>

                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    <div className='flex justify-end items-end w-full mt-4'>
                        <button className='px-[27px] py-[10px] text-header-S-M rounded-[8px] bg-[#633CFF] text-white hover:bg-purple-400' onClick={handleSave}>Save</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Customize;
