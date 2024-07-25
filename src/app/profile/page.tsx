"use client";
import React, { useState } from "react";
import Image from "next/image";
import { addUser, uploadImage, updateUser } from "../../../Firebase/firebaseUtils"; // Adjust path as needed
import customize from "../images/preview-section (1).svg";
import profilee from "../images/ph_image (1).svg";
import profileee from "../images/ph_image (3).svg";
import Header from "../component/header";
import { collection, doc, setDoc } from "firebase/firestore"; // import firestore
import { db } from "../../../Firebase/initFirebase"; // import firestore

const Profile: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [image, setImage] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(profilee); // Initialize with default image
    const [error, setError] = useState<string>("");
    const [uploading, setUploading] = useState<boolean>(false);

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

    const sendData = async () => {
        if (!firstName || !lastName) {
            setError("First name and Last name are required.");
            return;
        }

        try {
            setUploading(true);
            // Add user and get userId
            const userId = await addUser({ firstName, lastName, email });

            // Reference to the user document
            const userDocRef = doc(db, "users", userId);

            // Set user document
            await setDoc(userDocRef, {
                firstName,
                lastName,
                email,
                ...(imageURL && { imageURL }), // Conditionally add imageURL if it exists
            });

            console.log("User created with ID:", userId); // For debugging

            if (image) {
                const uploadedImageURL = await uploadImage(image, userId);
                await updateUser(userId, { imageURL: uploadedImageURL });
                setImageURL(uploadedImageURL);
            }

            // Clear form and display success message
            setFirstName("");
            setLastName("");
            setEmail("");
            setImage(null);
            setImageURL(profilee); // Reset to default image
            setError("");
            console.log("Profile saved successfully!");
        } catch (error) {
            console.error("Error saving profile:", error);
            setError("Error saving profile. Please try again.");
        } finally {
            setUploading(false);
        }
    }

    return (
        <main>
            <Header />
            <section className="pt-0 pr-6 pb-6 pl-6">
                <div className="grid md:grid-cols-2 gap-3">
                    <div className="bg-white p-[4rem] rounded-md flex justify-center items-center">
                        <div className="relative">
                            <Image src={customize} alt="Customize preview" width={307} height={300} />
                        </div>
                    </div>
                    <div className="bg-white p-[40px] rounded-md flex flex-col justify-between">
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
                                        <div className="flex flex-col justify-center items-center">
                                            <Image src={profilee} alt="" width={60} height={70} />
                                            <h1 className="text-header-S-M font-[600] text-[#633CFF]">+ Upload Image</h1>
                                        </div>
                                    )}
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
                            <button
                                className="px-[27px] py-[10px] text-header-S-M rounded-[8px] bg-[#633CFF] text-white hover:bg-purple-400"
                                onClick={sendData}
                                disabled={uploading}
                            >
                                {uploading ? 'Uploading...' : 'Save'}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Profile;
