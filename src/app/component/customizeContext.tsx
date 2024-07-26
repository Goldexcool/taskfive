"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { collection, writeBatch, doc, getDoc, getDocs, setDoc, DocumentData, WriteBatch, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../Firebase/initFirebase"; // Adjust path as needed
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addUser, uploadImage, updateUser, getUser } from "../../../Firebase/firebaseUtils";
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
import profilee from "../images/ph_image (1).svg";
import profileee from "../images/ph_image (3).svg";
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

interface Link {
    id: any;
    platform: string;
    url: string;
    error?: string;
    image?: any;
}

interface Platform {
    id: number;
    platName: string;
    image: any;
    placeholder?: string;
    image01?: any | null;
}
interface PlatformImage {
    id: number;
    platName: string;
    image: any;
    url: string;
}

interface CustomizeContextType {
    showInitialPrompt: boolean;
    links: Link[];
    setLinks: React.Dispatch<React.SetStateAction<Link[]>>;
    modalOpen: boolean;
    selectedPlatform: string;
    linkUrl: string;
    selectedImages: { [key: string]: any };
    firstName: string;
    setFirstName: React.Dispatch<React.SetStateAction<string>>;
    lastName: string;
    setLastName: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
    image: any | null;
    imageURL: any | null;
    error: string;
    uploading: boolean;
    userData: any;
    selectedPlatformImage: string;
    success: string;
    modalCont: Platform[];
    handleAddNewLink: () => void;
    handleRemoveLink: (id: number) => void;
    handlePlatformChange: (linkId: number, platformName: string) => void;
    handleImageClick: (url: string) => void;
    handleUrlChange: (id: any, url: any) => void;
    validateLink: (platform: string, url: string) => string;
    toggleModal: (id: number) => void;
    handleSave1: () => void;
    sendData: () => void;
    handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    openModalId: number | null;
    setOpenModalId: React.Dispatch<React.SetStateAction<number | null>>;
}

const CustomizeContext = createContext<CustomizeContextType | undefined>(undefined);

export const CustomizeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showInitialPrompt, setShowInitialPrompt] = useState<boolean>(true);
    const [links, setLinks] = useState<Link[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedPlatform, setSelectedPlatform] = useState<string>('Github');
    const [linkUrl, setLinkUrl] = useState<string>('');
    type PlatformImage = {
        id: number;
        image: any;
    };
    
    const [platformImages, setPlatformImages] = useState<PlatformImage[]>([]);
    const [selectedImages, setSelectedImages] = useState({});
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<any | null>(profilee); // Initialize with default image
    const [error, setError] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);
    const [userData, setUserData] = useState<any>(null);
    const [selectedPlatformImage, setSelectedPlatformImage] = useState('');
    const [success, setSuccess] = useState<string>('');

    const modalCont: Platform[] = [
        { id: 1, platName: "Github", image: github, image01: githubImg, placeholder: "e.g. https://www.github.com/johnappleseed", },
        { id: 2, platName: "Frontendmentor", image: frontedmentor, image01: frontendmentorImg, placeholder: "e.g. https://www.frontendmentor.io/profile/johnappleseed" },
        { id: 3, platName: "Twitter", image: twitter, image01: twitterImg, placeholder: "e.g. https://twitter.com/johnappleseed" },
        { id: 4, platName: "LinkedIn", image: linkedIn, image01: linkedinImg, placeholder: "e.g. https://www.linkedin.com/in/johnappleseed" },
        { id: 5, platName: "Youtube", image: youtube, image01: youtubeImg, placeholder: "e.g. https://www.youtube.com/c/johnappleseed" },
        { id: 6, platName: "Facebook", image: facebook, image01: facebookImg, placeholder: "e.g. https://www.facebook.com/johnappleseed" },
        { id: 7, platName: "Twitch", image: twitch, image01: twitchImg, placeholder: "e.g. https://www.twitch.tv/johnappleseed" },
        { id: 8, platName: "Dev.to", image: devto, image01: devtoImg, placeholder: "e.g. https://www.github.com/johnappleseed" },
        { id: 9, platName: "CodeWars", image: codewars, image01: codewarsImg, placeholder: "e.g. https://www.codewars.com/johnappleseed" },
        { id: 10, platName: "CodePen", image: codepen, image01: codepenImg, placeholder: "e.g. https://www.codepen.com/johnappleseed" },
        { id: 11, platName: "FreeCodeCamp", image: freecodecamp, image01: freecodecampImg, placeholder: "e.g. https://www.freecodecamp.com/johnappleseed" },
        { id: 12, platName: "GitLab", image: gitlab, image01: gitlabImg, placeholder: "e.g. https://www.gitlab.com/johnappleseed" },
        { id: 13, platName: "Hashnode", image: hashnode, image01: hashnode, placeholder: "e.g. https://www.hashnode.com/johnappleseed" },
        { id: 14, platName: "StackOverflow", image: stackoverflow, image01: stackoverflowImg, placeholder: "e.g. https://www.stackoverflow.com/johnappleseed" }
    ];

    const handleAddNewLink = (): void => {
        setShowInitialPrompt(false);
        setLinks([
            ...links,
            {
                id: links.length + 1,
                platform: 'Github',
                url: '',
                image: '', 
            }
        ]);
    };

    const handleRemoveLink = async (id: number): Promise<void> => {
        setLinks(prevLinks => {
            const updatedLinks = prevLinks.filter(link => link.id !== id);
            if (updatedLinks.length === 0) setShowInitialPrompt(true);
            return updatedLinks;
        });
    
        // Update database
        try {
            const userId = localStorage.getItem("userId");
            if (!userId) throw new Error("User ID is not available.");
    
            const linkDocRef = doc(db, `users/${userId}/links`, id.toString());
            await deleteDoc(linkDocRef);
        } catch (error) {
            console.error("Error removing link:", error);
            setError("Error removing link. Please try again.");
        }
    };
    

    const handlePlatformChange = (linkId: number, platformName: string) => {
        const selectedPlatform = modalCont.find(item => item.platName === platformName);
        const platformImage = selectedPlatform ? selectedPlatform.image01 : '';
    
        setLinks(links.map(link =>
            link.id === linkId ? { ...link, platform: platformName, image: platformImage } : link
        ));
        setOpenModalId(null);
    };
    

    const handleImageClick = (url: string): void => {
        if (url) {
            window.open(url, '_blank');
        }
    };
    const handleUrlChange = (id: any, url: any) => {
        setLinks(links.map(link => link.id === id ? { ...link, url } : link));
    };

    const validateLink = (platform: string, url: string): string => {
        const platformUrls: { [key: string]: string } = {
            'Github': 'github.com/',
            'GitLab': 'gitlab.com/',
            'Frontendmentor': 'www.frontendmentor.io/',
            'Twitter': 'x.com/',
            'LinkedIn': 'linkedin.com/',
            'Youtube': 'www.youtube.com/',
            'Facebook': 'facebook.com/',
            'Twitch': 'twitch.tv/',
            'Dev.to': 'dev.to/',
            'CodeWars': 'codewars.com/',
            'CodePen': 'codepen.io/',
            'FreeCodeCamp': 'freecodecamp.org/',
            'Hashnode': 'hashnode.com/',
            'StackOverflow': 'stackoverflow.com/'

        };
        const expectedUrl = platformUrls[platform] || '';
        if (!url) {
            return "Link can't be empty";
        } else if (expectedUrl && !url.startsWith(`https://${expectedUrl}`)) {
            // return `URL should start with https://${expectedUrl}`;
            return "Please check the URL"
        } else {
            return '';
        }
    };
    const [openModalId, setOpenModalId] = useState<number | null>(null);

    const toggleModal = (id: number): void => {
        setOpenModalId(openModalId === id ? null : id);
    };

    const handleSave1 = async (): Promise<void> => {
        let hasError = false;
    
        // Validate links
        const updatedLinks = links.map(link => {
            const error = validateLink(link.platform, link.url);
            if (error) hasError = true;
            return { ...link, error };
        });
        setLinks(updatedLinks);
    
        if (!hasError) {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) throw new Error("User ID is not available.");
    
                const batch = writeBatch(db);
                for (const link of updatedLinks) {
                    const linkDocRef = doc(db, `users/${userId}/links`, link.id.toString());
                    batch.set(linkDocRef, {
                        url: link.url,
                        platform: link.platform,
                        image: link.image
                    });
                }
    
                await batch.commit();
    
                setSuccess("Links saved successfully.");
                setError("");
            } catch (error) {
                console.error("Error saving links:", error);
                setError("Error saving links. Please try again.");
                setSuccess("");
            }
        } else {
            setError("There are validation errors. Please fix them before saving.");
            setSuccess("");
        }
    };
    
    
    

    const sendData = async () => {
        if (!firstName || !lastName || !email) {
            setError("First name, last name, and email are required.");
            return;
        }
    
        try {
            setUploading(true);
    
            // Add user and get userId
            const userId = await addUser({ firstName, lastName, email });
    
            // Store userId in local storage
            localStorage.setItem("userId", userId);
    
            // Reference to the user document
            const userDocRef = doc(db, "users", userId);
    
            // Determine the uploaded image URL
            let uploadedImageURL = profilee;
            if (image) {
                uploadedImageURL = await uploadImage(image, userId);
            }
    
            // Set user document with imageURL
            await setDoc(userDocRef, {
                firstName,
                lastName,
                email,
                imageURL: uploadedImageURL, // Save the image URL
            });
    
            // Fetch user data
            const user = await getUser(userId);
            setUserData(user);
            setImageURL(uploadedImageURL); // Update state with the new image URL
    
            setFirstName("");
            setLastName("");
            setEmail("");
            setImage(null);
            setError("");
            setSuccess("Profile saved successfully.");
    
            // Save links after saving the profile
            handleSave1();
        } catch (error) {
            console.error("Error saving profile:", error);
            setError("Error saving profile. Please try again.");
        } finally {
            setUploading(false);
        }
    };
    

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const userId = localStorage.getItem("userId");
                if (!userId) {
                    throw new Error("User ID is not available.");
                }
    
                const linksCollectionRef = collection(db, `users/${userId}/links`);
                const linkDocs = await getDocs(linksCollectionRef);
    
                const fetchedLinks: Link[] = [];
                linkDocs.forEach(doc => {
                    const data = doc.data() as DocumentData;
                    fetchedLinks.push({
                        id: parseInt(doc.id, 10), // Ensure ID is a number
                        url: data.url,
                        platform: data.platform,
                        image: data.image // Ensure you include the image URL
                    });
                });
    
                setLinks(fetchedLinks);
            } catch (error) {
                console.error("Error fetching links:", error);
            }
        };
    
        fetchLinks();
    }, []);
    
    


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];
            if (
                selectedImage.size <= 1024 * 1024 &&
                (selectedImage.type === "image/png" || selectedImage.type === "image/jpeg")
            ) {
                setImage(selectedImage);
                setError("");
                const reader = new FileReader();
                reader.onloadend = () => setImageURL(reader.result as string);
                reader.readAsDataURL(selectedImage);
            } else {
                setError("Image must be below 1024x1024px and in PNG or JPG format.");
            }
        }
    };

    const uploadImage = async (image: any, userId: any) => {
        const storageRef = ref(storage, `user-images/${userId}`);
        await uploadBytes(storageRef, image);
        const uploadedImageURL = await getDownloadURL(storageRef);
        return uploadedImageURL;
    };

    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            if (userId) {
                const userDocRef = doc(db, "users", userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const user = userDoc.data();
                    setUserData(user);
                    setImageURL(user.imageURL || profilee); 
                }
            }
        };
    
        fetchUserData();
    }, []);
    

     
    const openLink = (url: any) => {
     window.open(url, '_blank');
    };


    return (
        <CustomizeContext.Provider
            value={{
                showInitialPrompt,
                links,
                setLinks,
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
                setOpenModalId,
            }}
        >
            {children}
        </CustomizeContext.Provider>
        
    );
};

export const useCustomizeContext = (): CustomizeContextType => {
    const context = useContext(CustomizeContext);
    if (!context) {
        throw new Error("useCustomizeContext must be used within a CustomizeProvider");
    }
    return context;
};
function commitBatch(batch: WriteBatch) {
    throw new Error('Function not implemented.');
}